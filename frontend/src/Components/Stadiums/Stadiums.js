import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import CardsArea from '../CardsArea/CardsArea';
import StadiumHeader from './StadiumHeader/StadiumHeader';

const api = new DefaultApi();

function Stadiums() {
  const cards = []
  for (var i = 0; i < 4; i++) {
    cards.push({ id: i, name: "Name", city: "city" })
  }

  const [stadiums, setStadiums] = useState(cards);
  const [page, setPage] = useState(1);

  useEffect(async () => {
    const resp = await api.getStadiums(page);
    if (resp.status == 200) {
      setStadiums(resp.data.map((x, i) => { x.id = i; return x; }));
    } else {
      console.error(`api.getStadiums returned ${resp.status}`);
    }
  }, [page]);

  return (
    <div className="flex-container-column-vcenter-hcenter">
      <StadiumHeader />
      <CardsArea cards={stadiums} cardIdentifier="stadium" onSetPage={setPage} />
    </div>
  );
}

export default Stadiums;