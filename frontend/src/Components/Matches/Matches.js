import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import { NotificationManager } from 'react-notifications';
import { authToken } from '../../Auth';
import MatchForm from './MatchForm/MatchForm';
import CardsArea from '../CardsArea/CardsArea';
import MatchesHeader from './MatchesHeader/MatchesHeader';

const api = new DefaultApi();

function Matches() {
  const [stateCounter, setStateCount] = useState(0);
  let refresh = () => setStateCount(stateCounter + 1);
  
  const initialMatchModalProps = {
    show: false,
    title: '',
    submit: '',
    defaultValue: undefined,
    edit: false
  };

  const [matchModalProps, setMatchModalProps] = useState(initialMatchModalProps);
  let showAddMatchModal = () => {
    setMatchModalProps({
      show: true,
      title: 'Add Match',
      submit: addMatch,
      defaultValue: undefined,
      edit: false
    });
    window.$('#MatchFormModal').modal('show');
  }

  let showEditMatchModal = (match) => {
    setMatchModalProps({
      show: true,
      title: 'Edit Match',
      submit: editedMatch => editMatch(match.uuid, editedMatch),
      defaultValue: match,
      edit: true
    });
    window.$('#MatchFormModal').modal('show');
  }

  let hideModal = () => {
    setMatchModalProps(initialMatchModalProps);
    window.$('#MatchFormModal').modal('hide')
  };

  let addMatch = async (match) => {
    try {
      const resp = await api.submitMatch(authToken(), match);
      refresh();
      NotificationManager.success(resp.data.msg);
      return true;
    } catch(err) {
      console.error(err.message);
      if (!err.response && err.request) NotificationManager.error('Connection error');
      else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
      return false;
    }
  }

  let editMatch = async (uuid, editedMatch) => {
    // match.id -> frontend card id
    // match.uuid -> actual id of the match
    try {
      const resp = await api.editMatch(authToken(), uuid, editedMatch);
      refresh();
      NotificationManager.success(resp.data.msg);
      return true;
    } catch(err) {
      console.error(err.message);
      if (!err.response && err.request) NotificationManager.error('Connection error');
      else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
      return false;
    }
  }

  const [hasNext, setHasNext] = useState(false);
  const [matches, setMatches] = useState([]);
  const [page, setPage] = useState(1);

  let getMatches = async () => {
    try {
      const resp = await api.getMatches(page);
      await setTimeout(500);
      setHasNext(resp.data.has_next);
      setMatches(resp.data.matches.map((match, i) => { 
        match.id = i;
        match.removeCard = refresh;
        match.showEditModal = () => { showEditMatchModal(match) }
        return match; 
      }));
    } catch(err) {
      console.error(err.message);
      if (!err.response && err.request) NotificationManager.error('Connection error');
      else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }

  useEffect(() => {
    getMatches();
    // eslint-disable-next-line
  }, [page, stateCounter]);

  return (
    <div className="flex-container-column-vcenter-hcenter">
      <MatchesHeader showAddMatchModal={showAddMatchModal}/>
      <CardsArea cards={matches} hasNext={hasNext} cardIdentifier="match" onSetPage={setPage} />
      <MatchForm show={matchModalProps.show} 
                 title={matchModalProps.title} 
                 submit={matchModalProps.submit} 
                 defaultValues={matchModalProps.defaultValue}
                 edit={matchModalProps.edit}
                 hide={hideModal}/>        
    </div>
  );
}

export default Matches;