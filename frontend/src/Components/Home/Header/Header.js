import '../../Header/Header.css';
import logo from "../../../images/epl-logo.png";

function Header() {

  return (
    
    <div className="header">
      <img className="header-image" alt="header" src={logo} width="100" height="50"/>
      <div className="text-block">
        <h1> Welcome To EPL Website </h1>
        <p> Here you can reserve your tickets and follow your favorite matches </p>
      </div>
    </div>
  );
}

export default Header;