import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import usersLogin from './mocks/usersInfo.mock';
import { userSellerAccess } from './mocks/users.mock';
import API from '../services/api';
import { ordersMock } from './mocks/orders.mock';
// import { act } from 'react-dom/test-utils';

// Data-TestIds (Login)
const INPUT_LOGIN_EMAIL = 'common_login__input-email';
const INPUT_LOGIN_PASSWORD = 'common_login__input-password';
const INVALID_LOGIN_ALERT = 'login__input_invalid_login_alert';
const LOGIN_BUTTON = 'common_login__button-login';
const REGISTER_BUTTON = 'common_login__button-register';

// Data-TestIds (Seller)
const NAVBAR_SELLER_NAME = 'customer_products__element-navbar-user-full-name';

// Data-TestIds (UserManager)


const ARRAY_LOGIN_FIXED_ELEMENTS = [
  INPUT_LOGIN_EMAIL,
  INPUT_LOGIN_PASSWORD,
  LOGIN_BUTTON,
  REGISTER_BUTTON,
];

describe('Teste da Rota do Vendendora', () => {
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

    userEvent.type(emailInput, usersLogin[1].email);
    userEvent.type(passwordInput, usersLogin[1].senha);
    expect(screen.queryByTestId(INVALID_LOGIN_ALERT)).not.toBeInTheDocument();
    expect(loginButton).toBeEnabled();
  });

  it('Realiza o login da pessoa vendedora', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({
      data: userSellerAccess,
    });

    jest.spyOn(API, 'get').mockResolvedValue({ data: ordersMock }); // corrigir

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);
    
    userEvent.type(emailInput, usersLogin[1].email);
    userEvent.type(passwordInput, usersLogin[1].senha);
    userEvent.click(loginButton);

    await waitFor(() => expect(screen
      .getByTestId(NAVBAR_SELLER_NAME)).toBeInTheDocument());

    expect(history.location.pathname).toBe('/seller/orders');
    
    const adminName = screen.getByTestId(NAVBAR_SELLER_NAME);
    expect(adminName).toBeInTheDocument();
    expect(adminName.innerHTML).toBe('Fulana Pereira');
  });

 
});
