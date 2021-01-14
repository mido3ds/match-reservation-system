import CardsArea from '../CardsArea/CardsArea';
import TicketsHeader from './TicketsHeader/TicketsHeader';

function Tickets() {
  const cards = []
  for (var i = 0; i < 50; i++) {
    cards.push({ id: i })
  }
    return (
    <div className="flex-container-column-vcenter-hcenter">
      <TicketsHeader />
      <CardsArea cards={cards} cardIdentifier="ticket" />
    </div>
  );
}

export default Tickets;