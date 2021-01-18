import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import { NotificationManager } from 'react-notifications';
import CardsArea from '../CardsArea/CardsArea';
import StadiumHeader from './StadiumHeader/StadiumHeader';
import StadiumForm from './StadiumForm/StadiumForm';
import { authToken, logout } from '../../Auth';

const api = new DefaultApi();

function Stadiums({ setLoggedIn }) {
  const [stateCounter, setStateCount] = useState(0);
  let refresh = () => setStateCount(stateCounter + 1);
  
  const [hasNext, setHasNext] = useState(false);
  const [stadiums, setStadiums] = useState([]);
  const [page, setPage] = useState(1);

  let getStadiums = async () => {
    try {
      const resp = await api.getStadiums(page);
      setHasNext(resp.data.has_next);
      setStadiums(resp.data.stadiums.map((stadium, i) => {
        stadium.id = i;
        stadium.removeCard = refresh;
        return stadium;
      }));
    } catch (err) {
      console.error(err.message);
      if (!err.response && err.request) NotificationManager.error('Connection error');
      else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }

  useEffect(() => {
    getStadiums();
    // eslint-disable-next-line
  }, [page, stateCounter]);

  async function submitStadium(stadium) {
    try {
      await api.submitStadium(authToken(), stadium);
      NotificationManager.success('Stadium added successfully');
      window.$("#StadiumFormModal").modal('hide')
      refresh();
    } catch (err) {
      console.error(err.message);
      if (!err.response && err.request) NotificationManager.error('Connection error');
      else if (err?.response?.data?.noUser) {
        logout();
        setLoggedIn(false);
        NotificationManager.error('Session ended, please login again');
      }
      else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }


  return (
    <div className="flex-container-column-vcenter-hcenter">
      <StadiumForm onSubmit = {submitStadium} />
      <StadiumHeader />
      <CardsArea cards={stadiums} hasNext={hasNext} cardIdentifier="stadium" onSetPage={setPage} />
    </div>
  );
}

export default Stadiums;