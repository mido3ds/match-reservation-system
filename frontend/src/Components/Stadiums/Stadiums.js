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
    try {
      const resp = await api.getStadiums(page);
      setHasNext(resp.data.has_next);
      setStadiums(resp.data.stadiums.map((stadium, i) => { 
        stadium.id = i;
        stadium.removeCard = () => { removeStadium(i); }; 
        return stadium; 
      }));
    } catch(err) {
      console.error(err.message);
      if (err.response.data.err) console.error(err.response.data.err);
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