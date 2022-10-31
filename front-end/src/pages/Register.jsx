import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import Input from '../components/Input';

export default function Register() {
  // const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidUserMessage, setInvalidUserMessage] = useState(false);
  const NOT_FOUND = 404;
  const registerUser = async () => {
    const { status } = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {},
      body: JSON.stringify({ name, email, password }),
    });

    if (status === NOT_FOUND) {
      setInvalidUserMessage(true);
    } else {
      navigateTo('/customer/products');
    }
  };
  return (
    <div>
      <h1>Cadastro</h1>

      <Input
        testId="common_register__input-name"
        type="text"
        labelText="Name"
        onChange={ setName }
      />

      <Input
        testId="common_register__input-email"
        type="text"
        labelText="Email"
        onChange={ setEmail }
      />

      <Input
        testId="common_register__input-password"
        type="text"
        labelText="Password"
        onChange={ setPassword }
      />

      <button
        data-testid="common_register__button-register"
        type="button"
        onClick={ registerUser }
      >
        Casdatrar
      </button>

      {invalidUserMessage && (
        <p
          data-testid="common_register__element-invalid_register"
        >
          Usuário inválido.
        </p>
      )}
    </div>
  );
}
