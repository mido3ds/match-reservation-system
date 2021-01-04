import './UsersHeader.css';
import UsersImage from "../../../images/users.jpg";

function UsersHeader() {
  return (
      <div class="users-header">
          <img className="users-header-image" alt="users-header" src={UsersImage}/>
          <div className="users-text-block">
            <h1> Users </h1>
          </div>
          <div  className="users-button-area">
            <button type="button" className="users-requests-button btn btn-primary"> Requests </button>
          </div>
      </div>
  );
}

export default UsersHeader;