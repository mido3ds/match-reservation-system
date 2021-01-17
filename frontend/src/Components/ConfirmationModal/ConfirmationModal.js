import './ConfirmationModal.css';
import { useRef } from 'react'


function ConfirmationModal({ id, text, onOK }) {
  return (
    <div className="confirmation">
      <div className="modal fade" id={ id } tabIndex="-1" role="dialog" aria-labelledby={ id } aria-hidden="true" >
        <div className="vertical-alignment-helper ">
          <div className="modal-dialog vertical-align-center" role="document">
            <div className="confirmation-area modal-content">
              <div className="modal-header">
                <h1 className="confirmation-title"> Are You Sure? </h1>
              </div>
              <div className="confirmation-body modal-body flex-container-column">
                <p> { text }  </p>
                <div className="confirmation-modal-buttons-area">
                  <button type="button" className="btn confirmation-modal-ok-btn" data-dismiss="modal" onClick={onOK}> Ok </button>
                  <button type="button" className="btn confirmation-modal-cancel-btn" data-toggle="modal" data-target={"#" + id}> Cancel </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;