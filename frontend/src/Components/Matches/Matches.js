import CardsArea from '../CardsArea/CardsArea'
import MatchesHeader from './MatchesHeader/MatchesHeader'


function Matches() {
    const cards = []
    for(var i = 0; i < 50; i++) {
        cards.push({id : i}) 
    }

  return (
    <div className="flex-container-column-vcenter-hcenter">
        <MatchesHeader />
        <CardsArea custom_cards={cards} cardIdentifier="match"/> 
    </div>
    
  );

}

export default Matches;