import './ConfirmationModal.css';

function ConfirmationModal() {

  return (
    <div className="confirmation">
      <div class="modal fade" id="ConfirmationModal" tabindex="-1" role="dialog">
        <div class="vertical-alignment-helper ">
          <div class="modal-dialog vertical-align-center" role="document">
            <div className="confirmation-area modal-content">
              <div className="modal-header">
                <h1 className="confirmation-title"> Are You Sure? </h1>
              </div>
              <div class="confirmation-body modal-body flex-container-column">
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum  </p>
                <div class="confirmation-modal-buttons-area">
                  <button type="button" class="btn confirmation-modal-ok-btn" > Ok </button>
                  <button type="button" class="btn confirmation-modal-cancel-btn" data-dismiss="modal"> Cancel </button>
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