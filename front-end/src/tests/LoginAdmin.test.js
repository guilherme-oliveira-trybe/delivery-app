import React from 'react';
import {
  screen,
  waitFor,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import axios from 'axios';
// import { userAdminAcess } from './mocks/users.mock';
import usersLogin from './mocks/usersInfo.mock';
import { allUsers } from './mocks/users.mock';
import API from '../services/api';

// Data-TestIds (Login)
const INPUT_LOGIN_EMAIL = 'common_login__input-email';
const INPUT_LOGIN_PASSWORD = 'common_login__input-password';
const INVALID_LOGIN_ALERT = 'login__input_invalid_login_alert';
const LOGIN_BUTTON = 'common_login__button-login';
const REGISTER_BUTTON = 'common_login__button-register';
const INVALID_LOGIN_EMAIL = 'common_login__element-invalid-email';

// Data-TestIds (UserManager)
const ADMIN_INPUT_NAME = 'admin_manage__input-name';
const ADMIN_INPUT_EMAIL = 'admin_manage__input-email';
const ADMIN_INPUT_PASSWORD = 'admin_manage__input-password';
const ADMIN_INPUT_ROLE = 'admin_manage__select-role';
const ADMIN_BUTTON_REGISTER = 'admin_manage__button-register';
const INVALID_REGISTER_ALERT = 'admin_manage__element-invalid-register';

const ADMIN_TABLE = 'admin_manage__element-user-table';
const ADMIN_TABLE_ITEM = `${ADMIN_TABLE}-item-number-`;
const ADMIN_TABLE_NAME = `${ADMIN_TABLE}-name-`;
const ADMIN_TABLE_EMAIL = `${ADMIN_TABLE}-email-`;
const ADMIN_TABLE_ROLE = `${ADMIN_TABLE}-role-`;
const ADMIN_TABLE_REMOVE = `${ADMIN_TABLE}-remove-`;

const ARRAY_LOGIN_FIXED_ELEMENTS = [
  INPUT_LOGIN_EMAIL,
  INPUT_LOGIN_PASSWORD,
  LOGIN_BUTTON,
  REGISTER_BUTTON,
];

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
    jest.spyOn(API, 'post').mockResolvedValue({
      data: {
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        role: 'administrator',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwib…TE5fQ.RGmLTRoW4j4ud5kQ940XbfpT9zWvRiJTQEFeuPLIR58',
      },
    });

    jest.spyOn(API, 'get').mockResolvedValue({
      data: allUsers,
    });

    const { history, debug } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 'a');
    expect(screen.getByTestId(INVALID_LOGIN_ALERT)).toBeInTheDocument();
    userEvent.type(emailInput, 'dm@deliveryapp.com');
    userEvent.type(passwordInput, '--adm2@21!!--');

    expect(screen.queryByTestId(INVALID_LOGIN_ALERT)).not.toBeInTheDocument();
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);

    await waitFor(() =>
      expect(screen.findByTestId(ADMIN_INPUT_NAME)).toBeInTheDocument()
    );
    console.log(history.location.pathname);
    debug();
  });
});
