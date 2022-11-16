import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerAttempt } from '../services/api';
import InvalidRegister from '../components/InvalidRegister';
import logo from '../images/logo-drink.gif';
import DeliveryContext from '../context/DeliveryContext';
import './styles/Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAble, setIsAble] = useState(false);
  const { setLocalStorage } = useContext(DeliveryContext);
  const history = useHistory();

  const handleChange = (e) => {
    if (e.name === 'name') setName(e.value);
    if (e.name === 'email') setEmail(e.value);
    if (e.name === 'password') setPassword(e.value);
  };

  const verifyButton = (state) => {
    const { name: n, email: e, password: p } = state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const MIN_LENGTH_NAME = 12;
    const MIN_LENGTH_PASSWORD = 6;
    if (n.length < MIN_LENGTH_NAME) {
      setIsAble(false);
      return;
    }
    if (!regex.test(e)) {
      setIsAble(false);
      return;
    }
    if (p.length < MIN_LENGTH_PASSWORD) {
      setIsAble(false);
      return;
    }
    setIsAble(true);
  };

  useEffect(() => {
    verifyButton({ name, email, password });
  });

  return (
    <div className="register-container">
      <img
        src={ logo }
        alt="app-logo"
        className="logo"
        data-testid="login_logo"
      />
      <h1
        className="register_title"
        data-testid="login_title"
      >
        Maria Delivery

      </h1>
      <form>
        <label htmlFor="register-name">
          {/* Nome */}
          <input
            name="name"
            type="text"
            placeholder="Nome e Sobrenome"
            id="register-name"
            data-testid="common_register__input-name"
            onChange={ (e) => handleChange(e.target) }
          />
        </label>
        <label htmlFor="register-email">
          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="seu-email@site.com.br"
            id="register-email"
            data-testid="common_register__input-email"
            onChange={ (e) => handleChange(e.target) }
          />
        </label>
        <label htmlFor="register-password">
          {/* Senha */}
          <input
            name="password"
            type="password"
            placeholder="*********"
            id="register-password"
            data-testid="common_register__input-password"
            onChange={ (e) => handleChange(e.target) }
          />
        </label>
        {(name.length > 0
          || email.length > 0
          || password.length > 0) && <InvalidRegister />}
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ !isAble }
          onClick={ async () => {
            try {
              const user = await registerAttempt({ name, email, password });
              setLocalStorage('user', user);
              history.push('/customer/products');
            } catch (error) {
              // console.log(error);
              return error;
            }
          } }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Register;
