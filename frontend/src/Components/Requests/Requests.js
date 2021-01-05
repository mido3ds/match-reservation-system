import CardsArea from '../CardsArea/CardsArea'
import RequestsHeader from './RequestsHeader/RequestsHeader'

function Requests() {
    const cards = []
    for(var i = 0; i < 37; i++) {
        cards.push({id : i}) 
    }

  return (
    <div className="flex-container-col">
        <RequestsHeader />
        <CardsArea custom_cards={cards} cardIdentifier="request"/> 
    </div>
  );

}

export default Requests;