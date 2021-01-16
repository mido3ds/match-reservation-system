import './TicketsForm.css';

function TicketsForm({onReserve}) {
 
  return (
    <div className="tickets-form">
      <div className="modal fade" id="TicketsModal" tabIndex="-1" role="dialog">
        <div className="vertical-alignment-helper ">
          <div className="modal-dialog vertical-align-center" role="document">
            <div className="tickets-form-area modal-content">
              <div className="modal-header">
                <h1 className="tickets-form-title"> Tickets Purchasing: </h1>
              </div>
              <div className="tickets-form-body modal-body flex-container-column">
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
                <div className="tickets-form-modal-buttons-area">
                  <button type="button" className="btn tickets-form-modal-purchase-btn" onClick={onReserve}> Purchase </button>
                  <button type="button" className="btn tickets-form-modal-cancel-btn" data-dismiss="modal"> Cancel </button>
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