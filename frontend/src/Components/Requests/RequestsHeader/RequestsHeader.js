import './RequestsHeader.css';
import UsersImage from "../../../images/requests.png";

function RequestsHeader() {
  return (
      <div class="requests-header">
          <img className="requests-header-image" alt="requests-header" src={UsersImage}/>
          <div className="requests-text-block">
            <h1> Requests </h1>
          </div>
      </div>
  );
}

export default RequestsHeader;