import Ball from "../../../images/ball.jpg";
import { authToken, isLoggedIn, userType } from '../../../Auth';
import MatchForm from '../MatchForm/MatchForm';
import { DefaultApi } from '../../../api';
import './MatchesHeader.css';

const api = new DefaultApi();

function AddMatches({ reloadCards}) {
  let addMatch = async (match) => {
    try {
      const resp = await api.submitMatch(authToken(), match);
      console.log(resp.data.msgs);
      return { success: true, message: resp.data.msg };
    } catch(err) {
      console.error(err.message);
      if (err.response?.data?.err) {
        console.error(err.response.data.err);
      }
      return { success: false, message: err.response?.data?.err };
    }
  }

  return (
    <div>
      <div className="matches-button-area">
        <button type="button" className="matches-add-button btn btn-primary"
          data-toggle="modal" data-target="#AddMatchFormModal"> Add </button>
      </div>
      <MatchForm title="Add Match" saveChanges={addMatch} id="AddMatchFormModal" />
    </div>
  );
}

function MatchesHeader({ reloadCards }) {
  return (
    <div className="matches-header">
      <img className="matches-header-image" alt="matches-header" src={Ball} />
      <div className="matches-text-block">
        <h1> Matches </h1>
      </div>
      {
        isLoggedIn() && userType() === 'manager' ?
          <AddMatches /> : <div />
      }
    </div>
  );
}

export default MatchesHeader;