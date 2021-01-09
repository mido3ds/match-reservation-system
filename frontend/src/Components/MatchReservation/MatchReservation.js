import { useLocation, useParams } from "react-router-dom";
import MatchReservationHeader from './MatchReservationHeader/MatchReservationHeader';
import MatchReservationSeats from './MatchReservationSeats/MatchReservationSeats';

function MatchReservation() {
  let { match_id } = useParams();
  let { state } = useLocation();
  if (state && state.card) {
    // Extract match info from the passed card
  } else {
    // No passed card (link was accessed directly), fetch the match info from the server
  }
  return (
    <div className="flex-container-column-vcenter-hcenter">
      <MatchReservationHeader />
      <MatchReservationSeats />
    </div>
  );
}

export default MatchReservation;