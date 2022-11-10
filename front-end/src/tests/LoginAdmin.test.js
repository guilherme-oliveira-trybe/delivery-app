import React from 'react';
import {
  act,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import URLS from './mocks/urls';
import { userAdmin, usersLogin } from './mocks/users.mock';

// Data-TestIds
const INPUT_LOGIN_EMAIL = 'common_login__input-email';
const INPUT_LOGIN_PASSWORD = 'common_login__input-password';
const INVALID_LOGIN_ALERT = 'login__input_invalid_login_alert';
const LOGIN_BUTTON = 'common_login__button-login';
const REGISTER_BUTTON = 'common_login__button-register';
const INVALID_LOGIN_EMAIL = 'common_login__element-invalid-email';

const ARRAY_LOGIN_FIXED_ELEMENTS = [
  INPUT_LOGIN_EMAIL,
  INPUT_LOGIN_PASSWORD,
  LOGIN_BUTTON,
  REGISTER_BUTTON,
];

expect.extend({
  validURL: (received, validator) => {
    if (validator[received]) {
      return { message: () => 'URL mockada', pass: true };
    }
    return { message: () => 'URL não mockada', pass: false };
  },
});

describe('Teste da Tela de Login', () => {
  it('Verifica se os componentes iniciais da tela de Login estão na tela', async () => {
    renderWithRouter(<App />);
    ARRAY_LOGIN_FIXED_ELEMENTS.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });

  it('Avalia o comportamento do formulário de login', async () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 't');
    expect(screen.getByTestId(INVALID_LOGIN_ALERT)).toBeInTheDocument();
    userEvent.type(emailInput, usersLogin[0].email);
    userEvent.type(passwordInput, usersLogin[0].senha);
    
    expect(screen.queryByTestId(INVALID_LOGIN_ALERT)).not.toBeInTheDocument();
    expect(loginButton).toBeEnabled();
  });

  it('Realiza o login da pessoa administradora', async () => {
    // const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(async (URL) => ({
    //     json: async () => URLS[URL] || expect(URL).validURL(URLS),
    //   }));
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(userAdmin) }))
    
    const { history, debug } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 't');
    expect(screen.getByTestId(INVALID_LOGIN_ALERT)).toBeInTheDocument();
    userEvent.type(emailInput, usersLogin[0].email);
    userEvent.type(passwordInput, usersLogin[0].senha);
    
    expect(screen.queryByTestId(INVALID_LOGIN_ALERT)).not.toBeInTheDocument();
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);

    // act(() => {
    //   jest.advanceTimersByTime(10000);
    // });

    debug();
    
    await waitFor(() => expect(fetchMock).toBeCalled())
    console.log(history.location.pathname);
    
    await waitForElementToBeRemoved(() => screen.findByTestId(INPUT_LOGIN_EMAIL))

    

  });
});

  
