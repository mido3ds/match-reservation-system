import Stadium from "../../../images/stadium-background-with-green-grass-pitch-daytime.jpg";
import StadiumForm from '../StadiumForm/StadiumForm';
import './StadiumHeader.css';
import { isLoggedIn, userType } from '../../../Auth';

function AddStadium() {
  return (
    <div>
      <div className="stadiums-button-area">
        <button type="button" className="stadiums-add-button btn btn-primary"
          data-toggle="modal" data-target="#StadiumFormModal"> Add </button>
      </div>
      <StadiumForm title="Add Stadium" />
    </div>
  );
}

function StadiumHeader() {
  return (
    <div className="stadiums-header">
      <img className="stadiums-header-image" alt="stadiums-header" src={Stadium} />
      <div className="stadiums-text-block">
        <h1> Stadiums </h1>
      </div>
      {
        isLoggedIn() && userType() === 'manager' ?
          <AddStadium /> : <div />
      }
    </div>
  );
}

export default StadiumHeader;