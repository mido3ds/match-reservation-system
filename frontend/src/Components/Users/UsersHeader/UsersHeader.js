import './UsersHeader.css';
import { Link } from "react-router-dom";
import UsersImage from "../../../images/users.jpg";

function UsersHeader() {
  return (
      <div class="users-header">
          <img className="users-header-image" alt="users-header" src={UsersImage}/>
          <div className="text-block">
            <h1> Users </h1>
          </div>
          <div  className="users-button-area">
          <Link to='/management-requests'>
            <button type="button" className="requests-button btn btn-primary"> Requests </button>
          </Link>    
          </div>
      </div>
  );
}

export default UsersHeader;