import './RequestsHeader.css';
import UsersImage from "../../../images/requests.webp";

function RequestsHeader() {
  return (
      <div className="requests-header">
          <img className="requests-header-image" alt="requests-header" src={UsersImage}/>
          <div className="requests-text-block">
            <h1> Requests </h1>
          </div>
      </div>
  );
}

export default RequestsHeader;