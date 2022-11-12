import {
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import API from '../services/api';
import allProducts from './mocks/products.mock';
import usersLogin from './mocks/usersInfo.mock';
import validUser from './mocks/validUser';

// Data-TestIds-Products
const navbarLinkProducts = 'customer_products__element-navbar-link-products';
const navbarLinkOrders = 'customer_products__element-navbar-link-orders';
const navbarUserFullName = 'customer_products__element-navbar-user-full-name';
const navbarLinkLogout = 'customer_products__element-navbar-link-logout';
const cardTitleId = 'customer_products__element-card-title-';
const cardPriceId = 'customer_products__element-card-price-';
const cardBgImageId = 'customer_products__img-card-bg-image-';
const cardAddItemId = 'customer_products__button-card-add-item-';
const cardRmItemId = 'customer_products__button-card-rm-item-';
const cardQuantityId = 'customer_products__input-card-quantity-';
const checkoutBottomValue = 'customer_products__checkout-bottom-value';

// Data-TestIds-Login
const inputEmail = 'common_login__input-email';
const inputPassword = 'common_login__input-password';
const buttonLogin = 'common_login__button-login';

describe('Teste da Tela de Products', () => {
  it('Testa se a tela de products é renderizada na rota esperada', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({
      data: {
        ...validUser,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      },
    });

    jest.spyOn(API, 'get').mockResolvedValue({
      data: allProducts,
    });

    const { history } = renderWithRouter(<App />);

    const loginInputEmail = screen.getByTestId(inputEmail);
    const loginInputPassword = screen.getByTestId(inputPassword);
    const logInButton = screen.getByTestId(buttonLogin);

    userEvent.type(loginInputEmail, usersLogin[2].email);
    userEvent.type(loginInputPassword, usersLogin[2].senha);
    userEvent.click(logInButton);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).not.toBe('/login');
      expect(pathname).toBe('/customer/products');
    });
    const logoutButton = screen.getByTestId(navbarLinkLogout);
    userEvent.click(logoutButton);
  });

  it('Testa se a tela de products é renderizada com a navbar', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({
      data: {
        ...validUser,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      },
    });

    jest.spyOn(API, 'get').mockResolvedValue({
      data: allProducts,
    });

    renderWithRouter(<App />);

    const loginInputEmail = screen.getByTestId(inputEmail);
    const loginInputPassword = screen.getByTestId(inputPassword);
    const logInButton = screen.getByTestId(buttonLogin);

    userEvent.type(loginInputEmail, usersLogin[2].email);
    userEvent.type(loginInputPassword, usersLogin[2].senha);
    userEvent.click(logInButton);

    await waitFor(() => {
      expect(screen.getByTestId(navbarLinkProducts)).toBeInTheDocument();
      expect(screen.getByTestId(navbarLinkOrders)).toBeInTheDocument();
      expect(screen.getByTestId(navbarUserFullName)).toBeInTheDocument();
      expect(screen.getByTestId(navbarLinkLogout)).toBeInTheDocument();
    });
    const logoutButton = screen.getByTestId(navbarLinkLogout);
    userEvent.click(logoutButton);
  });

  it('Testa se os cards com os produtos estão na tela', () => {
    jest.spyOn(API, 'post').mockResolvedValue({
      data: {
        ...validUser,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      },
    });

    jest.spyOn(API, 'get').mockResolvedValue({
      data: allProducts,
    });

    renderWithRouter(<App />);

    const loginInputEmail = screen.getByTestId(inputEmail);
    const loginInputPassword = screen.getByTestId(inputPassword);
    const logInButton = screen.getByTestId(buttonLogin);

    userEvent.type(loginInputEmail, usersLogin[2].email);
    userEvent.type(loginInputPassword, usersLogin[2].senha);
    userEvent.click(logInButton);

    waitFor(() => {
      // const addItem = screen.getByTestId(cardAddItemId);
      // userEvent.click(`${addItem}1`);
      // expect(screen.getByTestId(checkoutBottomValue)).to.deep.equal('2.20');
      allProducts.forEach((_, index) => {
        expect(screen.getByTestId(`${cardTitleId}${index}`)).toBeInTheDocument();
        expect(screen.getByTestId(`${cardPriceId}${index}`)).toBeInTheDocument();
        expect(screen.getByTestId(`${cardBgImageId}${index}`)).toBeInTheDocument();
        expect(screen.getByTestId(`${cardAddItemId}${index}`)).toBeInTheDocument();
        expect(screen.getByTestId(`${cardRmItemId}${index}`)).toBeInTheDocument();
        expect(screen.getByTestId(`${cardQuantityId}${index}`)).toBeInTheDocument();
        expect(screen.getByTestId(checkoutBottomValue)).toBeInTheDocument();
      });
    });
  });

  it('Testa se o botão meus pedidos é redirecionado da forma esperada', () => {
    jest.spyOn(API, 'post').mockResolvedValue({
      data: {
        ...validUser,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      },
    });

    jest.spyOn(API, 'get').mockResolvedValue({
      data: allProducts,
    });

    const { history } = renderWithRouter(<App />);

    const loginInputEmail = screen.getByTestId(inputEmail);
    const loginInputPassword = screen.getByTestId(inputPassword);
    const logInButton = screen.getByTestId(buttonLogin);

    userEvent.type(loginInputEmail, usersLogin[2].email);
    userEvent.type(loginInputPassword, usersLogin[2].senha);
    userEvent.click(logInButton);

    waitFor(() => {
      const { location: { pathname } } = history;
      userEvent.click(screen.getByTestId(navbarLinkOrders));
      expect(pathname).not.toBe('/customer/products');
      expect(pathname).toBe('/customer/orders');
    });
  });
});
