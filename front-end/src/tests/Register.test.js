import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// Data-TestIds
// const LOGIN_BUTTON = 'common_login__button-login';
const INPUT_REGISTER_NAME = 'common_register__input-name';
const INPUT_REGISTER_EMAIL = 'common_register__input-email';
const INPUT_REGISTER_PASSWORD = 'common_register__input-password';
const REGISTER_BUTTON = 'common_register__button-register';
const INVALID_REGISTER_EMAIL = 'common_register__element-invalid_register';

const ARRAY_REGISTER_FIXED_ELEMENTS = [
  INPUT_REGISTER_NAME,
  INPUT_REGISTER_EMAIL,
  INPUT_REGISTER_PASSWORD,
  REGISTER_BUTTON,
  INPUT_REGISTER_EMAIL,
];

describe('Teste da Tela de Registro', () => {
  it('Verifica se todos os componentes da tela de Registro estão presentes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/register');

    ARRAY_REGISTER_FIXED_ELEMENTS.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });

  it('Verifica o Botão de Usuário Inválido', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/register');

    const name = screen.getByTestId(INPUT_REGISTER_NAME);
    const emailRegister = screen.getByTestId(INPUT_REGISTER_EMAIL);
    const password = screen.getByTestId(INPUT_REGISTER_PASSWORD);

    userEvent.type(emailRegister, 'teste.com');
    userEvent.type(name, 'teste');
    userEvent.type(password, '123');

    expect(screen.getByTestId(INVALID_REGISTER_EMAIL)).toBeInTheDocument();

    // ARRAY_REGISTER_FIXED_ELEMENTS.forEach((dataTestId) => {
    //   expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    // });
  });

  // it('Realiza o Cadastro da Pessoa Usuária', async () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/register');

  //   // ARRAY_REGISTER_FIXED_ELEMENTS.forEach((dataTestId) => {
  //   //   expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  //   // });
  // });
});
