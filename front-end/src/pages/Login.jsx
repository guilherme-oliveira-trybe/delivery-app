import { Link } from 'react-router-dom';

export default function Login() {
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
          // onChange={ handleChange }
        />
        <input
          type="password"
          id="inputPassword"
          placeholder="Password"
          data-testid="common_login__input-password"
          // onChange={ handleChange }
        />
        <p data-testid="login__input_invalid_login_alert">
          * Mensagem de erro em caso de dados inválidos *
        </p>
        <Link to="/products">
          <button
            type="submit"
            data-testid="common_login__button-login"
            // disabled={ loginValidation() }
          >
            Log In
          </button>
        </Link>
        <Link to="/register">
          <button
            type="button"
            data-testid="common_login__button-register"
          >
            Sign Up
          </button>
        </Link>
      </form>
    </div>
  );
}
