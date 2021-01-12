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
    <div className="container register-field border border-dark">
      <span className="display-4">Create Account</span>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <Form.Group className="col-md-6" size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-md-6" size="lg" controlId="firstname">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              
              type="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-md-6" size="lg" controlId="lastname">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-md-6" size="lg" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option selected value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-md-6" size="lg" controlId="birthday">
            <div className="container pr-0 mr-0">
              <Form.Label className="row">Birthday</Form.Label>
              <DatePicker className="row form-control pr=0 mr-0" selected={birthday} onChange={date => setBirthday(date)} />
            </div>
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="col-md-6" size="lg" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              />
          </Form.Group>
          <Form.Group className="col-md-6" size="lg" controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option selected value="fan">Fan</option>
              <option value="manager">Manager</option>
            </Form.Control>
          </Form.Group>
        </div>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;