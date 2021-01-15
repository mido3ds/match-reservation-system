import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import CardsArea from '../CardsArea/CardsArea';
import MatchesHeader from './MatchesHeader/MatchesHeader';

const api = new DefaultApi();

function Matches() {
  const [hasNext, setHasNext] = useState(false);
  const [matches, setMatches] = useState([]);
  const [page, setPage] = useState(1);

  let removeMatch = (id) => {
    setMatches(matches => {
      return matches.filter(match => { return match.id !== id })
    });
  } 

  useEffect(async () => {
    try {
      const resp = await api.getMatches(page);
      setHasNext(resp.data.has_next);
      setMatches(resp.data.matches.map((match, i) => { 
        match.id = i;
        match.removeCard = () => { removeMatch(i); };
        return match; 
      }));
    } catch(err) {
      console.error(err.message);
      if (err.response?.data?.err) console.error(err.response.data.err);
    }
  }, [page]);

  return (
    <div className="flex-container-column-vcenter-hcenter">
      <MatchesHeader/>
      <CardsArea cards={matches} hasNext={hasNext} cardIdentifier="match" onSetPage={setPage} />
    </div>
  );
}

export default Matches;