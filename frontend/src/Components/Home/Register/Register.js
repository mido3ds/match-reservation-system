import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";

import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("male");
  const [birthday, setBirthday] = useState(new Date());
  const [role, setRole] = useState("fan");
  
  function validateForm() {
    // TODO perform proper validation
    return (
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      address.length > 0 &&
      city.length > 0 &&
      firstname.length > 0 &&
      lastname.length > 0
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="signup-card register-field border border-dark">
      <div className="signup-label">Sign Up</div>
      <hr></hr>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <Form.Group className="col-md-6" size="lg" controlId="username">
            <Form.Label className="input-label">Username</Form.Label>
            <Form.Control className = "register-input-text-area"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-md-6" size="lg" controlId="firstname">
            <Form.Label className="input-label">Firstname</Form.Label>
            <Form.Control className = "register-input-text-area"
              type="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg" controlId="email">
            <Form.Label className="input-label">Email</Form.Label>
            <Form.Control className = "register-input-text-area"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-md-6" size="lg" controlId="lastname">
            <Form.Label className="input-label">Lastname</Form.Label>
            <Form.Control className = "register-input-text-area"
              type="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg" controlId="password">
            <Form.Label className="input-label">Password</Form.Label>
            <Form.Control className = "register-input-text-area"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-md-6" size="lg" controlId="gender">
            <Form.Label className="input-label">Gender</Form.Label>
            
            <Form.Control className="register-drop-down-button" as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option selected value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg" controlId="address">
            <Form.Label className="input-label">Address</Form.Label>
            <Form.Control className = "register-input-text-area"
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-md-6" size="lg" controlId="birthday">
            <div className="container pr-0 mr-0">
              <Form.Label className="row input-label">Birthday</Form.Label>
              <DatePicker className="row register-date-time-picker form-control pr=0 mr-0" selected={birthday} onChange={date => setBirthday(date)} />
            </div>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg" controlId="city">
            <Form.Label className="input-label">City</Form.Label>
            <Form.Control className = "register-input-text-area"
              type="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              />
          </Form.Group>
          <Form.Group className="col-md-6" size="lg" controlId="role">
            <Form.Label className="input-label">Role</Form.Label>
            <Form.Control className="register-drop-down-button" as="select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option selected value="fan">Fan</option>
              <option value="manager">Manager</option>
            </Form.Control>
          </Form.Group>
        </div>
        <Button className ="user-submit-button" block size="lg" type="submit" disabled={!validateForm()}>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
