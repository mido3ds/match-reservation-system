import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DefaultApi } from '../../api';
import { NotificationManager } from 'react-notifications';
import MatchReservationHeader from './MatchReservationHeader/MatchReservationHeader';

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
      if (!err.response && err.request) NotificationManager.error('Connection error');
      else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  };

  useEffect(() => {
    if (state?.match) {
      setMatch(state.match);
    } else {
      getMatch();
    }
    // eslint-disable-next-line
  }, [state.match]);

  return (
    <>
    {
      match ?
      <div className="flex-container-column-vcenter-hcenter">
        <MatchReservationHeader match={match}/>
      </div>
      : <div/>
     }
    </>
  );
}

export default MatchReservation;