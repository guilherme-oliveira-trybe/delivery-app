import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import usersLogin from './mocks/usersInfo.mock';
import { allUsers } from './mocks/users.mock';
import API from '../services/api';

// Data-TestIds (Login)
const INPUT_LOGIN_EMAIL = 'common_login__input-email';
const INPUT_LOGIN_PASSWORD = 'common_login__input-password';
const INVALID_LOGIN_ALERT = 'login__input_invalid_login_alert';
const LOGIN_BUTTON = 'common_login__button-login';
const REGISTER_BUTTON = 'common_login__button-register';

// Data-TestIds (NavBar)
const NAVBAR_ADMIN_NAME = "customer_products__element-navbar-user-full-name";

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

const ARRAY_ADMIN_FORM_ELEMENTS = [
  ADMIN_INPUT_NAME,
  ADMIN_INPUT_EMAIL,
  ADMIN_INPUT_PASSWORD,
  ADMIN_INPUT_ROLE,
  ADMIN_BUTTON_REGISTER,
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

    jest.spyOn(API, 'get').mockResolvedValue({ data: [...allUsers] });

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, 'adm@deliveryapp.com');
    userEvent.type(passwordInput, '--adm2@21!!--');

    expect(screen.queryByTestId(INVALID_LOGIN_ALERT)).not.toBeInTheDocument();
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);

    await waitFor(() =>
      expect(screen.getByTestId(ADMIN_INPUT_NAME)).toBeInTheDocument()
    );

    expect(history.location.pathname).toBe('/admin/manage');

    const adminName = screen.getByTestId(NAVBAR_ADMIN_NAME);
    expect(adminName).toBeInTheDocument();
    expect(adminName.innerHTML).toBe('Delivery App Admin');
  });

  it('Avalia a renderização dos usuários cadastrados na tela da pessoa administradora', async () => {
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
      data: [...allUsers],
    });

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, 'adm@deliveryapp.com');
    userEvent.type(passwordInput, '--adm2@21!!--');
    userEvent.click(loginButton);

    await waitFor(() =>
      expect(screen.getByTestId(ADMIN_INPUT_NAME)).toBeInTheDocument()
    );

    expect(history.location.pathname).toBe('/admin/manage');

    allUsers.filter((item) => item.role !== 'administrator').forEach((_, index) => {
      expect(screen.getByTestId(`${ADMIN_TABLE_ITEM}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${ADMIN_TABLE_NAME}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${ADMIN_TABLE_EMAIL}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${ADMIN_TABLE_ROLE}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${ADMIN_TABLE_REMOVE}${index}`)).toBeInTheDocument();
    });
  });

  it('Avalia a renderização do formulário para cadastro de novo usuário', async () => {
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
      data: [...allUsers],
    });

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, 'adm@deliveryapp.com');
    userEvent.type(passwordInput, '--adm2@21!!--');
    userEvent.click(loginButton);

    await waitFor(() =>
      expect(screen.getByTestId(ADMIN_INPUT_NAME)).toBeInTheDocument()
    );

    expect(history.location.pathname).toBe('/admin/manage');

    ARRAY_ADMIN_FORM_ELEMENTS.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });



    it('Avalia a criação de um novo usuário', async () => {
      jest.spyOn(API, 'post').mockImplementationOnce({
        data: {
          id: 1,
          name: 'Delivery App Admin',
          email: 'adm@deliveryapp.com',
          role: 'administrator',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwib…TE5fQ.RGmLTRoW4j4ud5kQ940XbfpT9zWvRiJTQEFeuPLIR58',
        },
      }).mockImplementationOnce({
        data: {},
      });
  
      jest.spyOn(API, 'get').mockResolvedValue({
        data: [...allUsers],
      });
  
      const { history } = renderWithRouter(<App />);
  
      const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
      const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
      const loginButton = screen.getByTestId(LOGIN_BUTTON);
  
      userEvent.type(emailInput, 'adm@deliveryapp.com');
      userEvent.type(passwordInput, '--adm2@21!!--');
      userEvent.click(loginButton);
  
      await waitFor(() =>
        expect(screen.getByTestId(ADMIN_INPUT_NAME)).toBeInTheDocument()
      );
  
      expect(history.location.pathname).toBe('/admin/manage');


      const newUserNameInput = screen.getByTestId(ADMIN_INPUT_NAME);
      const newUserEmailInput = screen.getByTestId(ADMIN_INPUT_EMAIL);
      const newUserPasswordInput = screen.getByTestId(ADMIN_INPUT_PASSWORD);
      const newUserRoleInput = screen.getByTestId(ADMIN_INPUT_ROLE);

      const newUser = {
        name: 'Maria Biritinha',
        email: 'maria_biritinha@gmail.com',
        password: '$bmiarriitai1n2h3a$',
        role: 'customer',
        roleOption: 'Cliente',
      }
  
      userEvent.type(newUserNameInput, newUser.name);
      userEvent.type(newUserEmailInput, newUser.email);
      userEvent.type(newUserPasswordInput, newUser.password);
      userEvent.selectOptions(newUserRoleInput, [newUser.roleOption]);
    
    });
  });

  
















  it('Avalia a renderização dos usuários na tela da pessoa administradora', async () => {
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
      data: [...allUsers],
    });

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, 'adm@deliveryapp.com');
    userEvent.type(passwordInput, '--adm2@21!!--');
    userEvent.click(loginButton);

    await waitFor(() =>
      expect(screen.getByTestId(ADMIN_INPUT_NAME)).toBeInTheDocument()
    );

    expect(history.location.pathname).toBe('/admin/manage');

    allUsers.filter((item) => item.role !== 'administrator').forEach((_, index) => {
      expect(screen.getByTestId(`${ADMIN_TABLE_ITEM}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${ADMIN_TABLE_NAME}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${ADMIN_TABLE_EMAIL}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${ADMIN_TABLE_ROLE}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${ADMIN_TABLE_REMOVE}${index}`)).toBeInTheDocument();
    });
  });
});
