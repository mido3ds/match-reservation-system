import { Link } from "react-router-dom";
import { DefaultApi } from '../../../api';
import { isLoggedIn, userType, authToken } from '../../../Auth';
import { NotificationManager } from 'react-notifications';
import ConfirmationModal  from '../../ConfirmationModal/ConfirmationModal';
import Delete from "../../../images/delete.png";
import Edit from "../../../images/edit.png";
import {logos_60x60} from "../../../teams"
import './MatchCard.css';
import Moment from 'react-moment';
import 'moment-timezone';

const api = new DefaultApi();

function MatchCard({ card }) {
  const {removeCard, showEditModal, ...match} = card;

  let oldMatch = () => {
    let today = new Date();
    let matchDate = new Date(match.dateTime)
    return today > matchDate;
  }


  let deleteMatch = async () => {
    // match.id -> frontend card id
    // match.uuid -> actual id of the match
    try {
    const resp = await api.deleteMatch(authToken(), match.uuid);
    NotificationManager.success(resp.data?.msg);
    await setTimeout(500);
    removeCard();
    } catch(err) {
      console.error(err.message);
      if (!err.response && err.request) NotificationManager.error('Connection error');
      else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }

  return (
      <div className='match-card-container'>
        <div className="match-card">
          <span style={{ visibility: isLoggedIn() && userType() === 'manager' ? 'visible': 'hidden'}} >
            { !oldMatch() ? 
            <img alt="edit-icon" className="edit" src={Edit} onClick={ showEditModal }/> 
              : ''}
            <img alt="delete-icon" className={`delete ${oldMatch() ? "first-position" : "second-position"}`} src={Delete} data-toggle="modal" data-target={'#deleteModal' + match.id}/>
            <ConfirmationModal id={'deleteModal' + match.id} 
                              text={ 'Are you sure you want to delete this match?'}
                              onOK={ deleteMatch } /> : ''
          </span> 
          <Link className="noHover" to={{ pathname: `/match-reservation/${ match.uuid }`, state: { match } }}>
            <div className='flex-container-row-hcenter'>
              <div className="upper-area flex-container-row-hcenter" >
                <div className="home-team" >
                  <img alt="Logo" src={logos_60x60[match.homeTeam]} />
                  <p> { match.homeTeam } </p>
                </div>
                <div className="date-time" >
                  <p className="time"> <Moment format="hh:mm" date={match.dateTime} /> </p>
                  <p className="date"> <Moment format="ll" date={match.dateTime} /> </p>
                </div>
                <div className="away-team" >
                  <img alt="Logo" src={logos_60x60[match.awayTeam]} />
                  <p> { match.awayTeam }  </p>
                </div>
              </div>
              <div className="middle-area flex-container-column-hcenter" >
                <span className="stadium">
                  <img alt="stadium-icon" src="https://www.flaticon.com/svg/static/icons/svg/1259/1259792.svg" />
                  <span> { match.venue } </span>
                </span>
                <span className="referee" >
                  <img alt="referee-icon" src="https://www.flaticon.com/svg/static/icons/svg/850/850989.svg" />
                  <span> { match.mainReferee } </span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
  );
}

export default MatchCard;