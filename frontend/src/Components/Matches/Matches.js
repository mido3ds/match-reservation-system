import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import CardsArea from '../CardsArea/CardsArea';
import MatchesHeader from './MatchesHeader/MatchesHeader';

const api = new DefaultApi();

function Matches() {
  const [hasNext, setHasNext] = useState(false);
  const [matches, setMatches] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(async () => {
    const resp = await api.getMatches(page)
    if (resp.status == 200) {
      setHasNext(resp.data.has_next);
      setMatches(resp.data.matches.map((match, i) => { match.id = i; return match; }));
    } else {
      console.error(`api.getMatches returned ${resp.status}`);
    }
  }, [page]);

  return (
    <div className="flex-container-column-vcenter-hcenter">
      <MatchesHeader />
      <CardsArea cards={matches} hasNext={hasNext} cardIdentifier="match" onSetPage={setPage} />
    </div>
  );
}

export default Matches;