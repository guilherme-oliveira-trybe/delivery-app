import axios from 'axios';
import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const handleRemove = (indexToRemove) => {
    console.log(indexToRemove);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = axios.get('http://localhost:3001/user');
      const userFilter = data.filter(({ role }) => role !== 'administrator');
      setUsers(userFilter);
    };
    fetchUsers();
  }, []);

  const dateTest = 'admin_manage__element-user-table';

  return (
    <section>
      { users.length === 0 ? (
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
                <td data-testid={ `${dateTest}-item-number-${index}` }>{ index + 1 }</td>
                <td data-testid={ `${dateTest}-name-${index}` }>{ user.name }</td>
                <td data-testid={ `${dateTest}-email-${index}` }>{ user.email }</td>
                <td data-testid={ `${dateTest}-role-${index}` }>{ user.role }</td>
                <td>
                  <button
                    data-testid={ `${dateTest}-remove-${index}` }
                    type="button"
                    onClick={ () => handleRemove(index) }
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
  );
}

// UserTable.propTypes = {};
