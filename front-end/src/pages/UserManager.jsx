import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import UserTable from '../components/UserTable';

export default function UserManager() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userRole, setUserRole] = useState('');
  const [isAble, setIsAble] = useState(false);

  const handleChange = (e) => {
    if (e.name === 'name') setName(e.value);
    if (e.name === 'email') setEmail(e.value);
    if (e.name === 'password') setPassword(e.value);
    // if (e.name === 'userRole') setUserRole(e.value);
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
    console.log(name, email, password);
    verifyButton({ name, email, password });
  });

  return (
    <div>
      <h1>UserManager</h1>
      <NavBar />
      <form>
        <label htmlFor="register-name">
          Nome
          <input
            name="name"
            type="text"
            placeholder="Seu Nome"
            id="register-name"
            data-testid="admin_manage__input-name"
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
            data-testid="admin_manage__input-email"
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
            data-testid="admin_manage__input-password"
            onChange={ (e) => handleChange(e.target) }
          />
        </label>
        <label htmlFor="select-role">
          Tipo
          <select id="select-role">
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor</option>
          </select>
        </label>
        <button
          type="button"
          data-testid="admin_manage__button-register"
          disabled={ !isAble }
          onClick={ async () => {
            try {
              await registerAttempt({ name, email, password });
            } catch (error) {
              console.log(error);
            }
          } }
        >
          Cadastrar
        </button>
        <UserTable />
      </form>
    </div>
  );
}
