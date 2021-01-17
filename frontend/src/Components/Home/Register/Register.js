import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import { DefaultApi } from '../../../api';
import { NotificationManager } from 'react-notifications';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { setUserType, setAuthToken } from "../../../Auth";

import "./Register.css";

const api = new DefaultApi();

const minYearsOld = 10;
const maxYearsOld = 130;

const minBirthDate = new Date();
minBirthDate.setFullYear( minBirthDate.getFullYear() - maxYearsOld );

const maxBirthDate = new Date();
maxBirthDate.setFullYear( maxBirthDate.getFullYear() - minYearsOld );

const schema = yup.object().shape({
  username: yup.string().min(5).max(50).required().matches(/^[A-Za-z]\S*$/, 'username must start with a letter and not have spaces.'),
  password: yup.string().min(5).max(255).required(),
  firstName: yup.string().min(3).max(20).required(),
  lastName: yup.string().min(3).max(20).required(),
  birthDate: yup.date().required()
    .min(minBirthDate,`You have to be atmost ${maxYearsOld} years old`)
    .max(maxBirthDate, `You have to be atleast ${minYearsOld} years old`),
  gender: yup.string().oneOf(['male', 'female']).required(),
  city: yup.string().min(3).max(15).required(),
  address: yup.string().max(200),
  email: yup.string().min(5).max(255).required().email(),
  role: yup.string().oneOf(['fan', 'manager']).required()
});


function Register(props) {
  const { register, handleSubmit, errors, setValue, trigger, clearErrors } = useForm(
    { resolver: yupResolver(schema) }
  );

  const [birthDate, setBirthDate] = useState(maxBirthDate);

  register('birthDate');

  useEffect(() => {
    setValue('birthDate', birthDate);
    trigger('birthDate');
  // eslint-disable-next-line
  }, [birthDate]);

  let resetForm = () => {
    // Reset fields
    setValue('username', '');
    setValue('firstName', ''); 
    setValue('email', '');
    setValue('lastName', ''); 
    setValue('password', '');
    setValue('gender', 'male'); 
    setValue('address', '');
    setBirthDate(maxBirthDate);
    setValue('city', '');
    setValue('role', 'fan'); 
    clearErrors();
  }

  let onSubmit = async (user) => {
    console.log(user);
    try {
      const resp = await api.signup(user);
      NotificationManager.success(resp.data.msg);
      resetForm();
      await setTimeout(500);
      if (resp.data.authToken) {
        setAuthToken(resp.data.authToken);
        props.login(true);
      }
      if (resp.data.userType) {
        setUserType(resp.data.userType);
        props.userType(resp.data.userType);
      }
    } catch(err) {
      NotificationManager.error(err.message);
      if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }

  return (
    <div className="signup-card register-field border border-dark">
      <div className="signup-label">Sign Up</div>
      <hr></hr>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <Form.Group size="lg" className="col-md-6" controlId="username">
            <Form.Label className="input-label">Username</Form.Label>
            <Form.Control className = "register-input-text-area" name="username" ref={register}/>
            <p className="err-register">{errors.username?.message}</p>
          </Form.Group>
          <Form.Group size="lg" className="col-md-6" controlId="firstName">
            <Form.Label className="input-label">First Name</Form.Label>
            <Form.Control className = "register-input-text-area" name="firstName" ref={register}/>
            <p className="err-register">{errors.firstName?.message}</p>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg">
            <Form.Label className="input-label">Email</Form.Label>
            <Form.Control className = "register-input-text-area" name="email" ref={register}/>
            <p className="err-register" onClick={()=>console.log(errors)}>{errors.email?.message}</p>
          </Form.Group>
          <Form.Group className="col-md-6" size="lg" controlId="lastName">
            <Form.Label className="input-label">Last Name</Form.Label>
            <Form.Control className = "register-input-text-area" name="lastName" ref={register}/>
            <p className="err-register">{errors.lastName?.message}</p>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg" controlId="password">
            <Form.Label className="input-label">Password</Form.Label>
            <Form.Control className = "register-input-text-area" type="password" name="password" ref={register} />
            <p className="err-register">{errors.password?.message}</p>
          </Form.Group>
          <Form.Group className="col-md-6" size="lg" controlId="gender">
            <Form.Label className="input-label">Gender</Form.Label>

            <Form.Control className="register-drop-down-button" as="select" name="gender" ref={register}>
              <option selected value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
            <p className="err-register">{errors.gender?.message}</p>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg" controlId="address">
            <Form.Label className="input-label">Address</Form.Label>
            <Form.Control className = "register-input-text-area" name="address" ref={register}/>
            <p className="err-register">{errors.address?.message}</p>
          </Form.Group>
          <Form.Group className="col-md-6" size="lg" controlId="birthDate">
            <div className="container pr-0 mr-0">
              <Form.Label className="row input-label">Birth Date</Form.Label>
              <DatePicker className="row register-date-time-picker form-control pr=0 mr-0"
                selected={birthDate}
                minDate={minBirthDate}
                maxDate={maxBirthDate}
                onChange={setBirthDate}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <p className="err-register">{errors.birthDate?.message}</p>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg" controlId="city">
            <Form.Label className="input-label">City</Form.Label>
            <Form.Control className = "register-input-text-area"
              name="city"
              ref={register}
            />
            <p className="err-register">{errors.city?.message}</p>
          </Form.Group>
          <Form.Group className="col-md-6" size="lg" controlId="role">
            <Form.Label className="input-label">Role</Form.Label>
            <Form.Control className="register-drop-down-button" as="select" name="role" ref={register}>
              <option selected value="fan">Fan</option>
              <option value="manager">Manager</option>
            </Form.Control>
            <p className="err-register">{errors.role?.message}</p>
          </Form.Group>
        </div>
        <Button className ="user-submit-button" block size="lg" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
