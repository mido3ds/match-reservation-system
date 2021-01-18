import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import { DefaultApi } from '../../api';
import { NotificationManager } from 'react-notifications';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { authToken, logout, userType } from "../../Auth";

import "./EditProfile.css";

const api = new DefaultApi();

const minYearsOld = 10;
const maxYearsOld = 130;

const minBirthDate = new Date();
minBirthDate.setFullYear( minBirthDate.getFullYear() - maxYearsOld );

const maxBirthDate = new Date();
maxBirthDate.setFullYear( maxBirthDate.getFullYear() - minYearsOld );

const schema = yup.object().shape({
  password: yup.string().max(255).test(
      'min5',
      'This must be at least 5 characters long',
      value => (value.trim().length > 0 ? value.length >= 5 : true)
    )
,
  firstName: yup.string().max(20).test(
      'min3',
      'This must be at least 3 characters long',
      value => (value.trim().length > 0 ? value.length >= 3 : true)
    )
,
  lastName: yup.string().max(20).test(
      'min3',
      'This must be at least 3 characters long',
      value => (value.trim().length > 0 ? value.length >= 3 : true)
    )
,
  birthDate: yup.date()
    .min(minBirthDate,`You have to be atmost ${maxYearsOld} years old`)
    .max(maxBirthDate, `You have to be atleast ${minYearsOld} years old`).required()
,
  gender: yup.string().oneOf(['male', 'female']).required()
,
  city: yup.string().max(15).test(
      'min3',
      'This must be at least 3 characters long',
      value => (value.trim().length > 0 ? value.length >= 3 : true)
    )
,
  address: yup.string().max(200)
,
  role: yup.string().oneOf(['fan', 'manager', 'admin']).required()
});


function EditProfile() {
  const { register, handleSubmit, errors, setValue, trigger, clearErrors } = useForm(
    { resolver: yupResolver(schema) }
  );

  let history = useHistory();

  const [birthDate, setBirthDate] = useState(maxBirthDate);

  register('birthDate');

  let fillForm = (user) => {
    // Fill fields
    setValue('firstName', user?.firstName? user.firstName : ''); 
    setValue('lastName', user?.lastName? user.lastName : ''); 
    setValue('password', '');
    setValue('gender', user?.gender? user.gender : 'male'); 
    setValue('address', user?.address);
    let birthDay = new Date(user.birthDate);
    setBirthDate(user?.birthDate? birthDay : maxBirthDate);
    // trigger('birthDate');
    setValue('city', user?.city? user.city : '');
    setValue('role', user?.role? user.role : 'fan');
    clearErrors();
  }

  useEffect(() => {
    setValue('birthDate', birthDate);
    trigger('birthDate');
  // eslint-disable-next-line
  }, [birthDate]);

  let resetForm = () => {
    // Reset fields
    setValue('firstName', '');
    setValue('lastName', '');
    setValue('password', '');
    setValue('gender', 'male');
    setValue('address', '');
    setBirthDate(maxBirthDate);
    setValue('city', '');
    setValue('role', 'fan');
    clearErrors();
  }

  async function getUser() {
    try {
      const resp = await api.getMyInfo(authToken());
      fillForm(resp.data)
    } catch(err) {
      console.error(err.message);
      if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
      resetForm();
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  let onSubmit = async (editedUser) => {
    try {
      const resp = await api.editUser(authToken(), editedUser);
      NotificationManager.success(resp?.data?.msg);
      await setTimeout(500);
      if (resp?.data?.logout) {
        logout();
        history.push('/');
        resetForm();
      }
      else
      {
        fillForm(resp?.data?.user);
      }
    } catch(err) {
      NotificationManager.error(err.message);
      if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }

  return (
    <div className="edit-profile-card edit-profile-field border border-dark">
      <div className="edit-profile-label">Edit Profile</div>
      <hr></hr>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <Form.Group size="lg" className="col-md-6">
            <Form.Label className="edit-profile-input-label">First Name</Form.Label>
            <Form.Control className = "edit-profile-input-text-area" name="firstName" ref={register}/>
            <p className="err-edit-profile">{errors.firstName?.message}</p>
          </Form.Group>
          <Form.Group className="col-md-6" size="lg">
            <Form.Label className="edit-profile-input-label">Last Name</Form.Label>
            <Form.Control className = "edit-profile-input-text-area" name="lastName" ref={register}/>
            <p className="err-edit-profile">{errors.lastName?.message}</p>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg">
            <Form.Label className="edit-profile-input-label">Password</Form.Label>
            <Form.Control className = "edit-profile-input-text-area" type="password" name="password" ref={register} />
            <p className="err-edit-profile">{errors.password?.message}</p>
          </Form.Group>
          <Form.Group className="col-md-6" size="lg">
            <Form.Label className="edit-profile-input-label">Gender</Form.Label>

            <Form.Control className="edit-profile-drop-down-button" as="select" name="gender" ref={register} defaultValue="male">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
            <p className="err-edit-profile">{errors.gender?.message}</p>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg">
            <Form.Label className="edit-profile-input-label">Address</Form.Label>
            <Form.Control className = "edit-profile-input-text-area" name="address" ref={register}/>
            <p className="err-edit-profile">{errors.address?.message}</p>
          </Form.Group>
          <Form.Group className="col-md-6" size="lg">
            <div className="container pr-0 mr-0">
              <Form.Label className="row edit-profile-input-label">Birth Date</Form.Label>
              <DatePicker className="row edit-profile-date-time-picker form-control pr=0 mr-0"
                selected={birthDate}
                minDate={minBirthDate}
                maxDate={maxBirthDate}
                onChange={setBirthDate}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <p className="err-edit-profile">{errors.birthDate?.message}</p>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg">
            <Form.Label className="edit-profile-input-label">City</Form.Label>
            <Form.Control className = "edit-profile-input-text-area"
              name="city"
              ref={register}
            />
            <p className="err-edit-profile">{errors.city?.message}</p>
          </Form.Group>
          {
          userType() === 'admin'?
          <Form.Group className="col-md-6" size="lg">
            <Form.Label className="edit-profile-input-label">Role</Form.Label>
            <Form.Control className="edit-profile-drop-down-button" as="select" name="role" ref={register} defaultValue="admin">
              <option value="admin">Admin</option>
            </Form.Control>
            <p className="err-edit-profile">{errors.role?.message}</p>
          </Form.Group>
          :
          <Form.Group className="col-md-6" size="lg">
            <Form.Label className="edit-profile-input-label">Role</Form.Label>
            <Form.Control className="edit-profile-drop-down-button" as="select" name="role" ref={register} defaultValue="fan">
              <option value="fan">Fan</option>
              <option value="manager">Manager</option>
            </Form.Control>
            <p className="err-edit-profile">{errors.role?.message}</p>
          </Form.Group>
          }
        </div>
        <Button className ="user-submit-button" block size="lg" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EditProfile;
