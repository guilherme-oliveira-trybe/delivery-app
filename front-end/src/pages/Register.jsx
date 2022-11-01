import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InvalidRegister from '../components/InvalidRegister';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAble, setIsAble] = useState(false);
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

  const handleClick = () => {
    history.push('/customer/products');
  };

  useEffect(() => {
    console.log(name, email, password);
    verifyButton({ name, email, password });
  });

  return (
    <div>
      <h2>Cadastro</h2>
      <form>
        <label htmlFor="register-name">
          Nome
          <input
            name="name"
            type="text"
            placeholder="Seu Nome"
            id="register-name"
            data-testid="common_register__input-name"
            onChange={ (e) => handleChange(e.target) }
          />
        </label>
        <label htmlFor="register-email">
          Email
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
          Senha
          <input
            name="password"
            type="password"
            placeholder="*********"
            id="register-password"
            data-testid="common_register__input-password"
            onChange={ (e) => handleChange(e.target) }
          />
        </label>
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ !isAble }
          onClick={ handleClick }
        >
          Cadastrar
        </button>
      </form>
      <InvalidRegister />
    </div>
  );
}

export default Register;
