import './TicketsForm.css';

function TicketsForm() {
 
  return (
    <div className="tickets-form">
      <div class="modal fade" id="TicketsModal" tabindex="-1" role="dialog">
        <div class="vertical-alignment-helper ">
          <div class="modal-dialog vertical-align-center" role="document">
            <div className="tickets-form-area modal-content">
              <div className="modal-header">
                <h1 className="tickets-form-title"> Tickets Purchasing: </h1>
              </div>
              <div class="tickets-form-body modal-body flex-container-column">
                <div className="credit-card-area">
                    <span className="tickets-input-label"> Credit Card </span>
                    <input type="text" className="form-control tickets-input-text-area"
                           id="CreditCardInput"></input>
                </div>
                <div className="pin-area">
                    <span className="tickets-input-label"> PIN </span>
                    <input type="text" className="form-control tickets-input-text-area"
                           id="PINInput"></input>
                </div>
                <h2>Total Price: 15$ </h2>
                <div class="tickets-form-modal-buttons-area">
                  <button type="button" class="btn tickets-form-modal-purchase-btn" data-dismiss="modal"> Purchase </button>
                  <button type="button" class="btn tickets-form-modal-cancel-btn" data-dismiss="modal"> Cancel </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketsForm;