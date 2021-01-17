import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { DefaultApi } from '../../../api';
import { NotificationManager } from 'react-notifications';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { setUserType, setAuthToken } from "../../../Auth";

import "./LoginCard.css"

const api = new DefaultApi();

const schema = yup.object().shape({
  username: yup.string().min(5).max(50).required(),
  password: yup.string().min(5).max(255).required()
});

function LoginCard(props) {
  let { state } = useLocation();
  let history = useHistory();

  const [isRedirected, setIsRedirected] = useState(false);
  const [redirectTo, setRedirectTo] = useState('/');

  const { register, handleSubmit, errors } = useForm(
    { resolver: yupResolver(schema) }
  );

  // useEffect with an empty array as a second parameter resembles componentDidMount in class components
  useEffect(() => {
    if (state?.from) {
      // We arrived at the home page as a result of an authorization indirection
      NotificationManager.warning("Please log in or create an account to be able access this page");
      setRedirectTo(state.from);
      setIsRedirected(true);
    }
  }, [state]);

  let toggleNavbar = () => {
    var navbar = window.$(".page-navbar")[0];
    var text =  window.$(".brand-text")[0];
    var logo =  window.$(".brand-logo")[0];
    var buttons =  window.$(".navbar-button-area")[0];
    var editButton =  window.$(".edit-profile-button")[0];
    var logOutButton =  window.$(".log-out-profile-button")[0];
    navbar.classList.add("is-active");
    text.classList.add("is-active");
    logo.classList.add("is-active");
    buttons?.classList.add("is-active");
    editButton?.classList.add("is-active");
    logOutButton?.classList.add("is-active");
}

  let onSubmit = async (user) => {
    try {
      const resp = await api.login({username: user.username, password: user.password});
      NotificationManager.success(resp?.data?.msg);
      await setTimeout(500);
      setUserType(resp.data.userType);
      setAuthToken(resp.data.authToken);
      if (isRedirected) history.push(redirectTo);
      props.userType(resp.data.userType);
      props.login(true);
      toggleNavbar()
    } catch(err) {
      console.error(err.message);
      if (!err.response && err.request) NotificationManager.error('Connection error');
      else if (err.response?.data?.err) NotificationManager.error(err.response.data.err);
    }
  }

  return (
    <div className="login-card border border-dark">
      <div className="login-label">Login</div>
      <hr></hr>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group size="lg" controlId="username">
          <Form.Label className="input-label">Username</Form.Label>
          <Form.Control className = "login-input-text-area" name ="username" ref={register} />
          <p className="err-login">{errors.username?.message}</p>
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label className="input-label">Password</Form.Label>
          <Form.Control className = "login-input-text-area" type="password" name ="password" ref={register}/>
          <p className="err-login">{errors.password?.message}</p>
        </Form.Group>
        <Button className = "login-button" block size="lg" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginCard;