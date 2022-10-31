import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  console.log('ola');
  return (
    <div>
      <h1>Login</h1>
      <button
        data-testid="common_login__button-register"
        type="button"
        onClick={ () => history.push('/register') }
      >
        Ainda não tenho conta
      </button>
    </div>
  );
}
