import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DefaultApi } from '../../api';
import { NotificationManager } from 'react-notifications';
import MatchReservationHeader from './MatchReservationHeader/MatchReservationHeader';
import MatchReservationSeats from './MatchReservationSeats/MatchReservationSeats';
import './MatchReservation.css'
import UsersImage from "../../images/match.webp";
import { useHistory } from "react-router-dom";

const api = new DefaultApi();

function MatchReservation({ loggedIn }) {
  let { match_id: matchID } = useParams();
  let { state } = useLocation();

  const[match, setMatch] = useState();
  // Used for redirection to the error page in case of error (invalid match id) 
  let history = useHistory();

  let getMatch = async () => {
    try {
      const resp = await api.getMatch(matchID);
      setMatch(resp.data);
    } catch(err) {
      console.error(err.message);
      if (!err.response && err.request) NotificationManager.error('Connection error');
      else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
      history.push('/error')
    }
  };

  useEffect(() => {
    if (state?.match) {
      setMatch(state.match);
    } else {
      getMatch();
    }
    // eslint-disable-next-line
  }, [state]);

  return (
    <>
    {
      match ?
      <div className="match-reservation-page flex-container-column-vcenter-hcenter">
        <img className="match-reservation-header-image" alt="match-header" src={UsersImage} />
        <MatchReservationHeader match={match}/>
        {loggedIn? <MatchReservationSeats match={match}/> : <div />}
      </div>
      : <div/>
     }
    </>
  );
}

export default MatchReservation;