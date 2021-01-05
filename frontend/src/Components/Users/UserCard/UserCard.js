
import './UserCard.css';
import ManagerImage from "../../../images/manager.png";
import FanImage from "../../../images/fan.png";
import Delete from "../../../images/delete2.png";

function UserCard({card}) {
  return (
    <div className="user-card flex-container-col-centered">
    <img alt="remove-user-icon" className ="remove-icon" src={Delete}/>
        <div className="role-badge">
            <img alt="role-bage" src={FanImage}/>
        </div>
        <p className="user-name"> Ahmed Afifi </p>
        <p className="user-username"> @ahmed_afifi98 </p>
        
        <div className="flex-container-centered">
          <div className="address-area">
            <img alt="address-icon" src="https://www.flaticon.com/svg/static/icons/svg/1076/1076323.svg"/>
            <span> Egypt, Cairo, El-Mokattam </span>
          </div>
          <div className="email-area">
            <img alt="email-icon" src="https://www.flaticon.com/svg/static/icons/svg/732/732200.svg"/>
            <span> Ahmed.Afifi98@eng-st.cu.ed.eg </span>
          </div>
          <div className="flex-container-row-centered">
            <div className="gender-area">
              <img alt="gender-icon" src="https://www.flaticon.com/svg/static/icons/svg/3939/3939800.svg"/>
              <span> Male </span>
            </div>
            <div className="birthdate-area">
              <img alt="birthdate-icon" src="https://www.flaticon.com/svg/static/icons/svg/3078/3078971.svg"/>
              <span> 5 jan 2021 </span>
            </div>
          </div>
        </div>
    </div>
  );
}

export default UserCard;