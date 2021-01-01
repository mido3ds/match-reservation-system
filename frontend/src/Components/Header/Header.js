import './Header.css';
import Ball from "../../../images/ball.jpg";

function Header() {

  return (
      <div class="header">
          <img className="header-image" alt="header" src={Ball}/>
          <div className="text-block">
            <h1> Matches </h1>
          </div>
          <div  className="button-area">
            <button type="button" className="add-button btn btn-primary"> Add </button>
          </div>
      </div>
  );

}

export default Header;