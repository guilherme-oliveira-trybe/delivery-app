import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import usersLogin from './mocks/usersInfo.mock';
import {
  allUsers,
  userAdminAccess,
  newUser,
  userSeller,
} from './mocks/users.mock';
import API from '../services/api';
import { act } from 'react-dom/test-utils';

// Data-TestIds (Login)
const INPUT_LOGIN_EMAIL = 'common_login__input-email';
const INPUT_LOGIN_PASSWORD = 'common_login__input-password';
const INVALID_LOGIN_ALERT = 'login__input_invalid_login_alert';
const LOGIN_BUTTON = 'common_login__button-login';
const REGISTER_BUTTON = 'common_login__button-register';
const ADMIN_ALERT_ERRO_CREATE_USER = "admin_manage__element-invalid-register";

// Data-TestIds (NavBar)
const NAVBAR_ADMIN_NAME = 'customer_products__element-navbar-user-full-name';

// Data-TestIds (UserManager)
const ADMIN_INPUT_NAME = 'admin_manage__input-name';
const ADMIN_INPUT_EMAIL = 'admin_manage__input-email';
const ADMIN_INPUT_PASSWORD = 'admin_manage__input-password';
const ADMIN_INPUT_ROLE = 'admin_manage__select-role';
const ADMIN_BUTTON_REGISTER = 'admin_manage__button-register';

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

describe('Teste da Rota do Administrador', () => {
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

    userEvent.type(emailInput, 'a');
    expect(screen.getByTestId(INVALID_LOGIN_ALERT)).toBeInTheDocument();
    userEvent.type(emailInput, usersLogin[0].email);
    userEvent.type(passwordInput, usersLogin[0].senha);

    expect(screen.queryByTestId(INVALID_LOGIN_ALERT)).not.toBeInTheDocument();
    expect(loginButton).toBeEnabled();
  });

  it('Realiza o login da pessoa administradora', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({
      data: userAdminAccess,
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

    await waitFor(() => expect(screen
      .getByTestId(ADMIN_INPUT_NAME)).toBeInTheDocument());

    expect(history.location.pathname).toBe('/admin/manage');
    const adminName = screen.getByTestId(NAVBAR_ADMIN_NAME);
    expect(adminName).toBeInTheDocument();
    expect(adminName.innerHTML).toBe('Delivery App Admin');
  });

  it('Avalia a renderização dos usuários cadastrados na tela da pessoa administradora', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({
      data: userAdminAccess,
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

    await waitFor(() => expect(screen
      .getByTestId(ADMIN_INPUT_NAME)).toBeInTheDocument());

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
      data: userAdminAccess,
    });

    jest.spyOn(API, 'get').mockResolvedValue({ data: [...allUsers] });

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, 'adm@deliveryapp.com');
    userEvent.type(passwordInput, '--adm2@21!!--');
    userEvent.click(loginButton);

    await waitFor(() => expect(screen
      .getByTestId(ADMIN_INPUT_NAME)).toBeInTheDocument());

    expect(history.location.pathname).toBe('/admin/manage');

    ARRAY_ADMIN_FORM_ELEMENTS.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });

  it('Avalia o comportamento da validação do formulário', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({
      data: userAdminAccess,
    });

    jest.spyOn(API, 'get').mockResolvedValue({ data: [...allUsers] });

    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, 'adm@deliveryapp.com');
    userEvent.type(passwordInput, '--adm2@21!!--');
    userEvent.click(loginButton);

    await waitFor(() => expect(screen
      .getByTestId(ADMIN_INPUT_NAME)).toBeInTheDocument());

    const newUserNameInput = screen.getByTestId(ADMIN_INPUT_NAME);
    const newUserEmailInput = screen.getByTestId(ADMIN_INPUT_EMAIL);
    const newUserPasswordInput = screen.getByTestId(ADMIN_INPUT_PASSWORD);
    const newUserRoleInput = screen.getByTestId(ADMIN_INPUT_ROLE);
    const newUserButton = screen.getByTestId(ADMIN_BUTTON_REGISTER);

    userEvent.type(newUserNameInput, newUser.name);
    userEvent.type(newUserEmailInput, newUser.email);
    userEvent.type(newUserPasswordInput, 'senha');
    expect(newUserButton).toBeDisabled();

    userEvent.type(newUserPasswordInput, newUser.password);
    userEvent.selectOptions(newUserRoleInput, [newUser.role]);
    expect(newUserButton).toBeEnabled();
  });

  it('Avalia a criação de um novo usuário', async () => {
    jest
      .spyOn(API, 'post')
      .mockResolvedValueOnce({
        data: userAdminAccess,
      })
      .mockResolvedValue({
        data: {
          id: 1,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        },
      });

    jest.spyOn(API, 'get')
      .mockResolvedValueOnce({ data: [...allUsers] })
      .mockResolvedValue({ data: [...allUsers, newUser] });

    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, 'adm@deliveryapp.com');
    userEvent.type(passwordInput, '--adm2@21!!--');
    userEvent.click(loginButton);

    await waitFor(() =>
      expect(screen.getByTestId(ADMIN_INPUT_NAME)).toBeInTheDocument()
    );

    const newUserNameInput = screen.getByTestId(ADMIN_INPUT_NAME);
    const newUserEmailInput = screen.getByTestId(ADMIN_INPUT_EMAIL);
    const newUserPasswordInput = screen.getByTestId(ADMIN_INPUT_PASSWORD);
    const newUserRoleInput = screen.getByTestId(ADMIN_INPUT_ROLE);
    const newUserButton = screen.getByTestId(ADMIN_BUTTON_REGISTER);

    act(() => {
      userEvent.type(newUserNameInput, newUser.name);
      userEvent.type(newUserEmailInput, newUser.email);
      userEvent.type(newUserPasswordInput, newUser.password);
      userEvent.selectOptions(newUserRoleInput, [newUser.role]);
      userEvent.click(newUserButton);
    });

    expect(screen.getByText(newUser.name)).toBeInTheDocument();
    expect(screen.getByText(newUser.email)).toBeInTheDocument();
  });

  it('Avalia a renderização do alerta para usuário já exixtente', async () => {
    jest
      .spyOn(API, 'post')
      .mockResolvedValueOnce({
        data: userAdminAccess,
      })
      .mockRejectedValue(() => {
        throw new Error('Criação invélida de novo usuário')
      });

    jest.spyOn(API, 'get')
      .mockResolvedValue({ data: [...allUsers] });

    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, 'adm@deliveryapp.com');
    userEvent.type(passwordInput, '--adm2@21!!--');
    userEvent.click(loginButton);

    await waitFor(() => expect(screen
      .getByTestId(ADMIN_INPUT_NAME)).toBeInTheDocument());

    const newUserNameInput = screen.getByTestId(ADMIN_INPUT_NAME);
    const newUserEmailInput = screen.getByTestId(ADMIN_INPUT_EMAIL);
    const newUserPasswordInput = screen.getByTestId(ADMIN_INPUT_PASSWORD);
    const newUserRoleInput = screen.getByTestId(ADMIN_INPUT_ROLE);
    const newUserButton = screen.getByTestId(ADMIN_BUTTON_REGISTER);


    userEvent.type(newUserNameInput, userSeller.name);
    userEvent.type(newUserEmailInput, userSeller.email);
    userEvent.type(newUserPasswordInput, userSeller.password);
    userEvent.selectOptions(newUserRoleInput, [userSeller.role]);
    userEvent.click(newUserButton);

    await waitFor(() => expect(screen.getByTestId(ADMIN_ALERT_ERRO_CREATE_USER)).toBeInTheDocument());

  });

  it('Avalia o comportamento de deletar um usuário - cliente', async () => {
    const userRemove = allUsers.filter((user) => user.id !== 3);
    jest
      .spyOn(API, 'post')
      .mockResolvedValue({
        data: userAdminAccess,
      });

    jest.spyOn(API, 'delete').mockResolvedValue({ data: [] });

    jest.spyOn(API, 'get')
      .mockResolvedValueOnce({ data: [...allUsers] })
      .mockResolvedValueOnce({ data: [...allUsers] })
      .mockResolvedValue({ data: [...userRemove] });

    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, 'adm@deliveryapp.com');
    userEvent.type(passwordInput, '--adm2@21!!--');
    userEvent.click(loginButton);

    await waitFor(() =>
      expect(screen.getByTestId(ADMIN_INPUT_NAME)).toBeInTheDocument()
    );

    const customerToRemove = screen.getByTestId('admin_manage__element-user-table-remove-1');
    userEvent.click(customerToRemove);

    await waitForElementToBeRemoved(() => expect(screen.getByText('Cliente Zé Birita')));

    expect(screen.queryByText('Cliente Zé Birita')).not.toBeInTheDocument();
  });
});
