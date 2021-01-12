import { useEffect, useState } from 'react';
import { DefaultApi } from '../../api';
import CardsArea from '../CardsArea/CardsArea';
import MatchesHeader from './MatchesHeader/MatchesHeader';

const api = new DefaultApi();

function Matches() {
  const cards = []
  for (var i = 0; i < 50; i++) {
    cards.push({ id: i })
  }

  const [matches, setMatches] = useState(cards);
  const [page, setPage] = useState(1);

  useEffect(async () => {
    const resp = await api.getMatches(page)
    if (resp.status == 200) {
      setMatches(resp.data.map((x, i) => { x.id = i; return x; }));
    } else {
      console.error(`api.getMatches returned ${resp.status}`);
    }
  }, [page]);

  return (
    <div className="flex-container-column-vcenter-hcenter">
      <MatchesHeader />
      <CardsArea cards={matches} cardIdentifier="match" onSetPage={setPage} />
    </div>
  );
}

export default Matches;