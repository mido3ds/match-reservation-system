import logo from "../../../images/epl-logo.png";
import Ball from "../../../images/ball.jpg";
import './HomeHeader.css';

function HomeHeader() {

  return (
    <div className="header">
      <img className="header-image" alt="header" src={Ball} />
      <div className="text-block">
        <h1> Welcome To EPL Website </h1>
        <p> Here you can reserve your tickets and follow your favorite matches </p>
      </div>
    </div>
  );
}

export default HomeHeader;