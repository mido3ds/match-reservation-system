import './MatchReservation.css';
import MatchReservationHeader from './MatchReservationHeader/MatchReservationHeader'

function MatchReservation() {
    const cards = []
    for(var i = 0; i < 37; i++) {
        cards.push({id : i}) 
    }

  return (
    <div className="flex-container-col">
        <MatchReservationHeader />
    </div>
  );

}

export default MatchReservation;