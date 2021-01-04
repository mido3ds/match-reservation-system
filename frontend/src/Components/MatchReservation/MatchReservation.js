import './MatchReservation.css';
import MatchReservationHeader from './MatchReservationHeader/MatchReservationHeader'
import MatchReservationSeats from './MatchReservationSeats/MatchReservationSeats'

function MatchReservation() {
  
  return (
    <div className="flex-container-column-vcenter-hcenter">
        <MatchReservationHeader />
        <MatchReservationSeats />
    </div>
  );

}

export default MatchReservation;