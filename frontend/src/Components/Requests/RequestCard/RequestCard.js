import ManagerImage from "../../../images/manager.png";
import './RequestCard.css';

function RequestCard({ card }) {
  return (
    <div className="request-card flex-container-col-centered">
      <img alt="accept-icon" className="accept" src="https://www.flaticon.com/svg/static/icons/svg/58/58679.svg" />
      <img alt="reject-icon" className="reject" src="https://www.flaticon.com/svg/static/icons/svg/58/58253.svg" />
      <div className="role-badge">
        <img alt="role-bage" src={ManagerImage} />
      </div>
      <p className="user-name"> Ahmed Afifi </p>
      <p className="user-username"> @ahmed_afifi98 </p>

      <div className="flex-container-centered">
        <div className="address-area">
          <img alt="address-icon" src="https://www.flaticon.com/svg/static/icons/svg/1076/1076323.svg" />
          <span> Egypt, Cairo, El-Mokattam </span>
        </div>
        <div className="email-area">
          <img alt="email-icon" src="https://www.flaticon.com/svg/static/icons/svg/732/732200.svg" />
          <span> Ahmed.Afifi98@eng-st.cu.ed.eg </span>
        </div>
        <div className="flex-container-row-centered">
          <div className="gender-area">
            <img alt="gender-icon" src="https://www.flaticon.com/svg/static/icons/svg/3939/3939800.svg" />
            <span> Male </span>
          </div>
          <div className="birthdate-area">
            <img alt="birthdate-icon" src="https://www.flaticon.com/svg/static/icons/svg/3078/3078971.svg" />
            <span> 5 jan 2021 </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestCard;