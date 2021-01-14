import { Link } from "react-router-dom";
import { DefaultApi } from '../../../api';
import { authToken } from '../../../Auth';
import ConfirmationModal  from '../../ConfirmationModal/ConfirmationModal';
import Delete from "../../../images/delete.png";
import Edit from "../../../images/edit.png";
import Logo1 from "../../../images/teams_logos_60x60/15.png";
import Logo2 from "../../../images/teams_logos_60x60/7.png";
import './MatchCard.css';

const api = new DefaultApi();

function MatchCard({ card }) {
  const {removeCard, ...match} = card;

  let deleteMatch = async () => {
    // match.id -> frontend card id
    // match.uuid -> actual id of the match
    const resp = await api.deleteMatch(authToken(), match.uuid);
    if (resp.status == 200) {
      alert('Match deleted successfully!');
      removeCard();
    } else {
      alert('A problem occurred during deleting the match.');
      console.error(`api.deleteMatch returned ${resp.status}`);
    }
  }

  return (
      <div className='match-card-container'>
        <div className="match-card">
          <img alt="edit-icon" className="edit" src={Edit} />    
          <img alt="delete-icon" className="delete" src={Delete} data-toggle="modal" data-target={'#deleteModal' + match.id}/>
          <ConfirmationModal id={'deleteModal' + match.id} 
                            text={ 'Are you sure you want to delete this match?'}
                            onOK={ deleteMatch } />
          <Link className="noHover" to={{ pathname: `/match-reservation/${ match.id }`, state: { } }}>
            <div className='flex-container-row-hcenter'>
              <div className="upper-area flex-container-row-hcenter" >
                <div className="home-team" >
                  <img alt="Logo" src={Logo1} />
                  <p> { match.homeTeam } </p>
                </div>
                <div className="date-time" >
                  <p className="time"> 23:15  </p>
                  <p className="date"> 5 jan 2021 </p>
                </div>
                <div className="away-team" >
                  <img alt="Logo" src={Logo2} />
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