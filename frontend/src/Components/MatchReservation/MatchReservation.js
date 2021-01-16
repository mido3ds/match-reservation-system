import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DefaultApi } from '../../api';
import { NotificationManager } from 'react-notifications';
import MatchReservationHeader from './MatchReservationHeader/MatchReservationHeader';
import MatchReservationSeats from './MatchReservationSeats/MatchReservationSeats';
import { authToken } from '../../Auth';

const api = new DefaultApi();

function MatchReservation() {
  let { match_id: matchID } = useParams();
  let { state } = useLocation();

  const[match, setMatch] = useState();
  
  let getMatch = async () => {
    try {
      const resp = await api.getMatch(matchID);
      setMatch(resp.data);
    } catch(err) {
      console.error(err.message);
      if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  };

  useEffect(async () => {
    if (state?.match) {
      setMatch(state.match);
    } else {
      getMatch();
    }
  }, []);

  return (
    <>
    {
      match ?
      <div className="flex-container-column-vcenter-hcenter">
        <MatchReservationHeader match={match}/>
        <MatchReservationSeats match={match}/>
      </div>
      : <div/>
     }
    </>
  );
}

export default MatchReservation;