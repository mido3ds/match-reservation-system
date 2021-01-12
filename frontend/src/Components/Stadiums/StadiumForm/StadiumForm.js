import { useState } from "react";
import { DefaultApi } from '../../../api';
import './StadiumForm.css';
import { authToken, isLoggedIn } from '../../../Auth';

const api = new DefaultApi();

function StadiumForm({ title }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  function submit() {
    // if wrong values show error
    if (name.length == 0 || city.length == 0) {
      setErrMsg("Name and City must not be empty");
    } else {
      (async () => {
        try {
          const resp = await api.submitStadium(authToken, { name, city });
          if (resp.status == 200) {
            console.log('submitted stadium successfully');
            setShowSuccess(true);
            setErrMsg('');
          } else {
            console.error(`api.submitStadium returned code ${resp.status}`);
            setErrMsg(`Failed at submitting, ${resp.data.err}`);
          }
        } catch (e) {
          console.error(`api.submitStadium, ${e}`);
          setErrMsg(`Failed at submitting, ${e}`);
        }
      })()
    }
  }

  return (
    <div className="modal fade" id="StadiumFormModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document"></div>
      <div className="form-area modal-content">
        <div className="modal-header">
          <h1 className=" form-title"> {title} </h1>
        </div>
        <div className="modal-body match-form-modal-body flex-container-row">
          <div className="main-referee-area">
            <span className="info-text"> Name: </span>
            <input type="text" className="form-control input-text-area" value={name}
              onChange={(event) => {
                setName(event.target.value);
                setShowSuccess(false);
              }}
              id="MainRefereeInput"></input>
          </div>
          <div className="secondlinesman-area">
            <span className="info-text"> City: </span>
            <input type="text" className="form-control input-text-area" value={city}
              onChange={(event) => {
                setCity(event.target.value);
                setShowSuccess(false);
              }}
              id="SecondLinesmanInput"></input>
          </div>
          {
            errorMsg.length > 0 ?
              <div class="alert alert-danger" role="alert">
                {errorMsg}
              </div> : <div />
          }
          {
            showSuccess ?
              <div class="alert alert-success" role="alert">
                Submitted Successfully!
              </div> : <div />
          }
          <div className="match-form-buttons-area">
            <button type="button" className="btn match-form-save-btn"
              onClick={submit}> Submit </button>
            <button type="button" className="btn match-form-close-btn"
              onClick={() => { window.$('#StadiumFormModal').modal('hide'); setErrMsg(''); setShowSuccess(false); setCity(''); setName(''); }}>Close</button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default StadiumForm;