import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import { authToken, logout } from '../../Auth';
import { NotificationManager } from 'react-notifications';
import CardsArea from '../CardsArea/CardsArea';
import RequestsHeader from './RequestsHeader/RequestsHeader';

const api = new DefaultApi();

function Requests({ setLoggedIn }) {
  const [stateCounter, setStateCount] = useState(0);
  let refresh = () => {
    setStateCount(stateCounter + 1);
  }

  const [hasNext, setHasNext] = useState(false);
  const [requestedManagers, setRequestedManagers] = useState([]);
  const [page, setPage] = useState(1);


  let getManagersRequests = async () => {
    try {
      const resp = await api.getManagersRequests(authToken(), page);
      setHasNext(resp.data.has_next);
      setRequestedManagers(resp.data.requestedManagers.map((requestedManager, i) => {
        requestedManager.id = i;
        requestedManager.removeCard = refresh;
        return requestedManager; 
      }));
    } catch(err) {
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

  useEffect(() => {
    getManagersRequests();
    // eslint-disable-next-line
  }, [page, stateCounter]);

  return (
    <div className="flex-container-col">
      <RequestsHeader />
      <CardsArea cards={requestedManagers} hasNext={hasNext} cardIdentifier="request" onSetPage={setPage} />
    </div>
  );
}

export default Requests;