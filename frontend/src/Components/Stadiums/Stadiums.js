import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import CardsArea from '../CardsArea/CardsArea';
import StadiumHeader from './StadiumHeader/StadiumHeader';

const api = new DefaultApi();

function Stadiums() {
  const [hasNext, setHasNext] = useState(false);
  const [stadiums, setStadiums] = useState([]);
  const [page, setPage] = useState(1);

  let removeStadium = (id) => {
    setStadiums(stadiums => {
      return stadiums.filter(stadium => { return stadium.id != id })
    });
  } 

  useEffect(async () => {
    const resp = await api.getStadiums(page);
    if (resp.status == 200) {
      setHasNext(resp.data.has_next);
      setStadiums(resp.data.stadiums.map((stadium, i) => { 
        stadium.id = i;
        stadium.removeCard = () => { removeStadium(i); }; 
        return stadium; 
      }));
    } else {
      console.error(`api.getStadiums returned ${resp.status}`);
    }
  }, [page]);

  return (
    <div className="flex-container-column-vcenter-hcenter">
      <StadiumHeader />
      <CardsArea cards={stadiums} hasNext={hasNext} cardIdentifier="stadium" onSetPage={setPage} />
    </div>
  );
}

export default Stadiums;