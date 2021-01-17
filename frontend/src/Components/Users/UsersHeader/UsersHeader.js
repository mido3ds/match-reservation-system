import { Link } from "react-router-dom";
import UsersImage from "../../../images/users.webp";
import './UsersHeader.css';

function UsersHeader() {
  return (
    <div className="users-header">
      <img className="users-header-image" alt="users-header" src={UsersImage} />
      <div className="users-text-block">
        <h1> Users </h1>
      </div>
      <div className="users-button-area">
        <Link to='/management-requests'>
          <button type="button" className="requests-button btn btn-primary"> Requests </button>
        </Link>
      </div>
    </div>
  );
}

export default UsersHeader;