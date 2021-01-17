import './TicketsForm.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const digitsOnly = (value) => /^\d+$/.test(value)

const schema = yup.object().shape({
  creditCardNumber: yup.string()
    .required('Required field.')
    .test('Digits only', 'The field should have digits only', digitsOnly)
    .length(16, 'Must be 16 digits'),
  pin: yup.string()
    .required('Required field.')
    .test('Digits only', 'The field should have digits only', digitsOnly)
    .length(4, 'Must be 4 digits')
});

function TicketsForm({onSubmit, totalPrice}) {
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) });

  return (
    <div className="tickets-form">
      <div className="modal fade" id="TicketsModal" tabIndex="-1" role="dialog">
        <div className="vertical-alignment-helper ">
          <div className="modal-dialog vertical-align-center" role="document">
            <form className="tickets-form-area modal-content" onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-header">
                <h1 className="tickets-form-title"> Tickets Purchasing: </h1>
              </div>
              <div className="tickets-form-body modal-body flex-container-column">
                <div className="credit-card-area">
                    <span className="tickets-input-label"> Credit Card </span>
                    <input type="text" name="creditCardNumber" className="form-control tickets-input-text-area"
                           id="CreditCardInput" ref={register}>    
                    </input>
                    <p className='error-message'>{errors.creditCardNumber?.message}</p>
                </div>
                <div className="pin-area">
                    <span className="tickets-input-label"> PIN </span>
                    <input type="password" className="form-control tickets-input-text-area"
                           id="PINInput" name="pin" ref={register}>
                    </input>
                    <p className='error-message'>{errors.pin?.message}</p>
                </div>
                <h2> Total Price: {totalPrice}$ </h2>
                <div className="tickets-form-modal-buttons-area">
                  <button type="submit" className="btn tickets-form-modal-purchase-btn"> Purchase </button>
                  <button type="button" className="btn tickets-form-modal-cancel-btn" data-dismiss="modal"> Cancel </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketsForm;