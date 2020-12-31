import './Matches.css';
import CardsArea from '../CardsArea/CardsArea'
import Header from './Header/Header'

function Matches() {
    const cards = []
    for(var i = 0; i < 50; i++) {
        cards.push({id : i}) 
    }

  return (
    <div className="flex-container-col">
        <Header />
        <CardsArea custom_cards={cards} cardIdentifier="match"/> 
    </div>
    
  );

}

export default Matches;