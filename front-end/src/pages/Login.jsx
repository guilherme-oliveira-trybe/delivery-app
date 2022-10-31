import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// require('dotenv').config();

// const {
//   REACT_APP_HOSTNAME,
//   REACT_APP_BACKEND_PORT,
// } = process.env;

// [TO-DO]: [Iasmin] resolver problema ao utilizar variáveis de ambiente no Front;
// const loginURL = `http://${REACT_APP_HOSTNAME}:${REACT_APP_BACKEND_PORT}/login`;
const loginURL = 'http://localhost:3001/login';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  const [failedLogin, setFailedLogin] = useState(false);

  const emailValidation = (value) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return !regex.test(value);
  };

  const passwordValidation = (value) => {
    const minLength = 6;
    return (value.length < minLength);
  };

  return (
    <div>
      <h2>NOSSA_LOGO</h2>
      <h1>NOME_DO_APP</h1>

      <form>
        <input
          type="email"
          id="inputEmail"
          placeholder="Email"
          data-testid="common_login__input-email"
          value={ email }
          onChange={ ({ target: { value } }) => {
            setEmail(value);
            setErrorEmail(emailValidation(value));
          } }
        />
        <input
          type="password"
          id="inputPassword"
          placeholder="Password"
          data-testid="common_login__input-password"
          value={ password }
          onChange={ ({ target: { value } }) => {
            setPassword(value);
            setErrorPassword(passwordValidation(value));
          } }
        />
        {!!((errorEmail || errorPassword)) && (
          <p data-testid="login__input_invalid_login_alert">
            * Please, provide a valid email and password *
          </p>)}

        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ !!((errorEmail || errorPassword)) }
          onClick={ async () => {
            setFailedLogin(true);
            const response = await axios.post(loginURL);
            const result = await response.json();
            console.log(result.message);
          } }
        >
          Log In
        </button>

        <Link to="/register">
          <button
            type="button"
            data-testid="common_login__button-register"
          >
            Sign Up
          </button>
        </Link>
      </form>
      { failedLogin && (
        <p data-testid="common_login__element-invalid-email">
          Login attempt failed. User not found.
        </p>
      )}
    </div>
  );
}
