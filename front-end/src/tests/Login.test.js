import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import URLS from './mocks/urls';

describe('Testes da tela de Login', () => {

  it('Testa se a tela de login é renderizada na rota esperada', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).not.toBe('/');
    expect(pathname).toBe('/login');
  })

  it('Testa existência dos elementos básicos da tela de Login', () => {
    renderWithRouter(<App />);
    const loginLogo = screen.getByTestId('login_logo');
    const loginTitle = screen.getByTestId('login_title');
    const loginInputEmail = screen.getByTestId('common_login__input-email');
    const loginInputPassword = screen.getByTestId('common_login__input-password');
    const logInButton = screen.getByTestId('common_login__button-login');
    const signUpButton = screen.getByTestId('common_login__button-register');
  
    expect(loginLogo).toBeInTheDocument();
    expect(loginTitle).toBeInTheDocument();
    expect(loginInputEmail).toBeInTheDocument();
    expect(loginInputPassword).toBeInTheDocument();
    expect(logInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  })

  it('Testa se botão de se registrar redireciona o usuário para a rota esperada', () => {
    const { history } = renderWithRouter(<App />);

    const signUpButton = screen.getByTestId('common_login__button-register');
    userEvent.click(signUpButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/register');
  })

  it('Testa se alerta é renderizado na tela ao fornecer email/senha inválidos', () => {
    renderWithRouter(<App />);
    const loginInputEmail = screen.getByTestId('common_login__input-email');
    const loginInputPassword = screen.getByTestId('common_login__input-password');

    const invalidInputEmail = 'invalid.email.co';
    const invalidInputPassword = '1234';

    userEvent.type(loginInputEmail, invalidInputEmail);
    userEvent.type(loginInputPassword, invalidInputPassword);

    const logInButton = screen.getByTestId('common_login__button-login');
    const invalidInputAlert = screen.getByTestId('login__input_invalid_login_alert');
  
    expect(logInButton).toBeDisabled();
    expect(invalidInputAlert).toBeInTheDocument();
  });

  it('Testa se botão de login é habilitado após fornecer email/senha válidos', () => {
    renderWithRouter(<App />);
    const loginInputEmail = screen.getByTestId('common_login__input-email');
    const loginInputPassword = screen.getByTestId('common_login__input-password');

    const validInputEmail = 'test@test.com';
    const validInputPassword = '123456';

    userEvent.type(loginInputEmail, validInputEmail);

    const validInputAlert = screen.getByTestId('login__input_invalid_login_alert');

    userEvent.type(loginInputPassword, validInputPassword);

    const logInButton = screen.getByTestId('common_login__button-login');
    
    expect(logInButton).not.toBeDisabled();
    expect(validInputAlert).not.toBeInTheDocument();
  })

  it('Testa se mensagem de erro é renderizada na tela ao fornecer dados de um usuário não-registrado', async () => {
    const { history } = renderWithRouter(<App />);

    const loginInputEmail = screen.getByTestId('common_login__input-email');
    const loginInputPassword = screen.getByTestId('common_login__input-password');

    const invalidUserEmail = 'test@test.com';
    const invalidUserPassword = '123456';

    userEvent.type(loginInputEmail, invalidUserEmail);
    userEvent.type(loginInputPassword, invalidUserPassword);

    const logInButton = screen.getByTestId('common_login__button-login');

    userEvent.click(logInButton);

    await waitFor(() => {
      const failedLoginMsg = screen.getByTestId('common_login__element-invalid-email');
      expect(failedLoginMsg).toBeInTheDocument();
    });

    const { location: { pathname } } = history;
    expect(pathname).toBe('/login');
  });
});