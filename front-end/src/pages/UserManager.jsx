import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/AdminNavBar';
import { admRegister, deleteUser } from '../services/api';
import './styles/UserManager.css';

export default function UserManager() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isAble, setIsAble] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failedCreate, setFailedCreate] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('http://localhost:3001/user');
      const userFilter = data.filter((item) => item.role !== 'administrator');
      setUsers(userFilter);
    };
    fetchUsers();
    setLoading(false);
  }, [loading]);

  const dateTest = 'admin_manage__element-user-table';

  const handleChange = (e) => {
    if (e.name === 'name') setName(e.value);
    if (e.name === 'email') setEmail(e.value);
    if (e.name === 'password') setPassword(e.value);
    if (e.name === 'role') setRole(e.value);
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
    <section className="adminContainer">
      <AdminNavBar />
      <form className="adminFormContainer">
        <label htmlFor="register-name">
          Nome
          <input
            name="name"
            type="text"
            placeholder="Nome e Sobrenome"
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
          <select
            id="select-role"
            data-testid="admin_manage__select-role"
            value={ role }
            onChange={ ({ target: { value } }) => setRole(value) }
          >
            <option value="default">Selecionar</option>
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
              setFailedCreate(false);
              await admRegister({ name, email, password, role });
              setLoading(true);
            } catch (error) {
              // console.log(error);
              setFailedCreate(true);
            }
          } }
        >
          Cadastrar
        </button>
      </form>
      <section className="adminTableContainer">
        {loading ? (
          <h3>Carregando...</h3>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Tipo</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={ index }>
                  <td data-testid={ `${dateTest}-item-number-${index}` }>
                    {index + 1}
                  </td>
                  <td data-testid={ `${dateTest}-name-${index}` }>{user.name}</td>
                  <td data-testid={ `${dateTest}-email-${index}` }>
                    {user.email}
                  </td>
                  <td data-testid={ `${dateTest}-role-${index}` }>{user.role}</td>
                  <td>
                    <button
                      data-testid={ `${dateTest}-remove-${index}` }
                      type="button"
                      onClick={ async () => {
                        try {
                          await deleteUser(user.id);
                          setLoading(true);
                        } catch (error) {
                          // console.log(error);
                          return error;
                        }
                      } }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      {failedCreate && (
        <p data-testid="admin_manage__element-invalid-register">
          Usuário já existe.
        </p>
      )}
    </section>
  );
}
