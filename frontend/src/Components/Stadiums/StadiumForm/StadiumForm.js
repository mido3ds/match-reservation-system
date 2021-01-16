import { useState } from "react";
import { DefaultApi } from '../../../api';
import { NotificationManager } from 'react-notifications';
import './StadiumForm.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const api = new DefaultApi();
const schema = yup.object().shape({
  name: yup.string()
    .required('Required field.')
    .matches(/^[aA-zZ\s]+$/, 'Must contain letters and spaces only.')
    .min(5, 'Must be at least 5 characters'),
  city: yup.string()
    .required('Required field.')
    .matches(/^[aA-zZ\s]+$/, 'Must contain letters and spaces only.')
});

function StadiumForm({onSubmit}) {
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) });

  return (
    <div className="tickets-form">
      <div className="modal fade" id="StadiumFormModal" tabIndex="-1" role="dialog">
        <div className="vertical-alignment-helper ">
          <div className="modal-dialog vertical-align-center" role="document">
            <form className="stadium-form-area modal-content" onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-header">
                <h1 className="stadium-form-title"> Add Stadium </h1>
              </div>
              <div className="stadiums-form-body modal-body flex-container-column">
                <div className="stadium-name-area">
                  <span className="stadium-input-label"> Name </span>
                  <input type="text" name="name" className="form-control stadium-input-text-area"
                    id="StadiumNameInput" ref={register}>
                  </input>
                  <p className='error-message'>{errors.name?.message}</p>
                </div>
                <div className="pin-area">
                  <span className="stadium-input-label"> City </span>
                  <input type="text" name="city" className="form-control stadium-input-text-area"
                    id="StadiumCityInput" ref={register}>
                  </input>
                  <p className='error-message'>{errors.city?.message}</p>
                </div>
                <div className="stadium-form-modal-buttons-area">
                  <button type="submit" className="btn stadium-form-modal-save-btn"> Add Stadium </button>
                  <button type="button" className="btn stadium-form-modal-close-btn" data-dismiss="modal"> Close </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StadiumForm;