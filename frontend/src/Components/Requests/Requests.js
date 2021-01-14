import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import { authToken } from '../../Auth';
import CardsArea from '../CardsArea/CardsArea';
import RequestsHeader from './RequestsHeader/RequestsHeader';

const api = new DefaultApi();

function Requests() {
  const [hasNext, setHasNext] = useState(false);
  const [requestedManagers, setRequestedManagers] = useState([]);
  const [page, setPage] = useState(1);

  let removeRequest = (id) => {
    setRequestedManagers(requestedManagers => {
      return requestedManagers.filter(requestedManager => { return requestedManager.id != id })
    });
  } 

  useEffect(async () => {
    const resp = await api.getManagersRequests(authToken(), page);
    if (resp.status == 200) {
      setHasNext(resp.data.has_next);
      setRequestedManagers(resp.data.requestedManagers.map((requestedManager, i) => {
        requestedManager.id = i;
        requestedManager.removeCard = () => { removeRequest(i); };
        return requestedManager; 
      }));
    } else {
      console.error(`api.getManagersRequests returned ${resp.status}`);
    }
  }, [page]);

  return (
    <div className="flex-container-col">
      <RequestsHeader />
      <CardsArea cards={requestedManagers} hasNext={hasNext} cardIdentifier="request" onSetPage={setPage} />
    </div>
  );
}

export default Requests;