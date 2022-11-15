import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import usersLogin from './mocks/usersInfo.mock';
import { userCustomerAccess } from './mocks/users.mock';
import allProducts from './mocks/products.mock';
import API from '../services/api';

// Data-TestIds (Login)
const INPUT_LOGIN_EMAIL = 'common_login__input-email';
const INPUT_LOGIN_PASSWORD = 'common_login__input-password';
const INVALID_LOGIN_ALERT = 'login__input_invalid_login_alert';
const LOGIN_BUTTON = 'common_login__button-login';
const REGISTER_BUTTON = 'common_login__button-register';

// Data-TestIds (NavBar)
const NAVBAR_PRODUCTS = 'customer_products__element-navbar-link-products';
const NAVBAR_ORDERS = 'customer_products__element-navbar-link-orders';
const NAVBAR_USER_NAME = 'customer_products__element-navbar-user-full-name';
const NAVBAR_LOGOUT = 'customer_products__element-navbar-link-logout';

// Data-TestIds


const ARRAY_LOGIN_FIXED_ELEMENTS = [
  INPUT_LOGIN_EMAIL,
  INPUT_LOGIN_PASSWORD,
  LOGIN_BUTTON,
  REGISTER_BUTTON,
];

const ARRAY_CUSTOMER_NAVBAR = [
  NAVBAR_PRODUCTS,
  NAVBAR_ORDERS,
  NAVBAR_USER_NAME,
  NAVBAR_LOGOUT,
];


describe('Teste da Rota do Cliente', () => {
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
    userEvent.type(emailInput, usersLogin[2].email);
    userEvent.type(passwordInput, usersLogin[2].senha);

    expect(screen.queryByTestId(INVALID_LOGIN_ALERT)).not.toBeInTheDocument();
    expect(loginButton).toBeEnabled();
  });

  it('Realiza o login do cliente', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({ data: userCustomerAccess });
    jest.spyOn(API, 'get').mockResolvedValue({ data: allProducts });

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);
    userEvent.type(emailInput, usersLogin[2].email);
    userEvent.type(passwordInput, usersLogin[2].senha);

    expect(screen.queryByTestId(INVALID_LOGIN_ALERT)).not.toBeInTheDocument();
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);

    await waitFor(() => expect(screen
      .getByTestId(NAVBAR_USER_NAME)).toBeInTheDocument());

    expect(history.location.pathname).toBe('/customer/products');
    const customerName = screen.getByTestId(NAVBAR_USER_NAME);
    expect(customerName).toBeInTheDocument();
    expect(customerName.innerHTML).toBe('Cliente Zé Birita');
    userEvent.click(screen.getByTestId(NAVBAR_LOGOUT));
  });

  it('Avalia a renderização da navbar e a funcionalidade de logout', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({ data: userCustomerAccess });
    jest.spyOn(API, 'get').mockResolvedValue({ data: allProducts });

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);
    userEvent.type(emailInput, usersLogin[2].email);
    userEvent.type(passwordInput, usersLogin[2].senha);

    expect(screen.queryByTestId(INVALID_LOGIN_ALERT)).not.toBeInTheDocument();
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);

    await waitFor(() => expect(screen
      .getByTestId(NAVBAR_USER_NAME)).toBeInTheDocument());

    expect(history.location.pathname).toBe('/customer/products');

    ARRAY_CUSTOMER_NAVBAR.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId(NAVBAR_LOGOUT));    
    expect(history.location.pathname).toBe('/login');
  });

  
});
