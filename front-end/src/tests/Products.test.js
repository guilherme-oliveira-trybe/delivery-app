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
// const navbarLinkProducts = 'customer_products__element-navbar-link-products';
// const navbarLinkOrders = 'customer_products__element-navbar-link-orders';
// const navbarUserFullName = 'customer_products__element-navbar-user-full-name';
// const navbarLinkLogout = 'customer_products__element-navbar-link-logout';
// const cardTitleId = 'customer_products__element-card-title-<id>';
// const cardPriceId = 'customer_products__element-card-price-<id>';
// const cardBgImageId = 'customer_products__img-card-bg-image-<id>';
// const cardAddItemId = 'customer_products__button-card-add-item-<id>';
// const cardRmItemId = 'customer_products__button-card-rm-item-<id>';
// const cardQuantityId = 'customer_products__input-card-quantity-<id>';
// const checkoutBottomValue = 'customer_products__checkout-bottom-value';

describe('Teste da Tela de Products', () => {
  it('Testa se a tela de products é renderizada na rota esperada', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({
      data: {
        ...validUser,
        token:
        // eslint-disable-next-line max-len
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      },
    });

    jest.spyOn(API, 'get').mockResolvedValue({
      data: allProducts,
    });

    const { history } = renderWithRouter(<App />);

    const loginInputEmail = screen.getByTestId('common_login__input-email');
    const loginInputPassword = screen.getByTestId('common_login__input-password');
    const logInButton = screen.getByTestId('common_login__button-login');

    userEvent.type(loginInputEmail, usersLogin[2].email);
    userEvent.type(loginInputPassword, usersLogin[2].senha);
    userEvent.click(logInButton);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).not.toBe('/login');
      expect(pathname).toBe('/customer/products');
    });
  });
});
