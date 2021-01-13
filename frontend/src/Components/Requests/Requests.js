import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import { authToken } from '../../Auth';
import CardsArea from '../CardsArea/CardsArea';
import RequestsHeader from './RequestsHeader/RequestsHeader';

const api = new DefaultApi();

function Requests() {
  const cards = []
  for (var i = 0; i < 37; i++) {
    cards.push({ id: i })
  }

  const [requests, setRequests] = useState(cards);
  const [page, setPage] = useState(1);

  useEffect(async () => {
    const resp = await api.getManagersRequests(authToken(), page);
    if (resp.status == 200) {
      setRequests(resp.data.map((x, i) => { x.id = i; return x; }));
    } else {
      console.error(`api.getManagersRequests returned ${resp.status}`);
    }
  }, [page]);

  return (
    <div className="flex-container-col">
      <RequestsHeader />
      <CardsArea cards={requests} cardIdentifier="request" onSetPage={setPage} />
    </div>
  );
}

export default Requests;