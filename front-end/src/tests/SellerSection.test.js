import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import usersLogin from './mocks/usersInfo.mock';
import { userSellerAccess } from './mocks/users.mock';
import API from '../services/api';
import { ordersMock } from './mocks/orders.mock';

// Data-TestIds (Login)
const INPUT_LOGIN_EMAIL = 'common_login__input-email';
const INPUT_LOGIN_PASSWORD = 'common_login__input-password';
const INVALID_LOGIN_ALERT = 'login__input_invalid_login_alert';
const LOGIN_BUTTON = 'common_login__button-login';
const REGISTER_BUTTON = 'common_login__button-register';

// Data-TestIds (Seller)
const NAVBAR_SELLER_NAME = 'customer_products__element-navbar-user-full-name';

// Data-TestIds (SellerOrders)
const SELLER_ORDER_ID = 'seller_orders__element-order-id-';
const SELLER_ORDER_DELIVERY_STATUS = 'seller_orders__element-delivery-status-';
const SELLER_ORDER_DATE = 'seller_orders__element-order-date-';
const SELLER_ORDER_PRICE = 'seller_orders__element-card-price-';
const SELLER_ORDER_ADDRESS = 'seller_orders__element-card-address-';

// Data-TestIds (SellerOrdersDetails)
const SELLER_ORDER_DETAILS_LABEL = 'seller_order_details__element-order-details-label';
const SELLER_ORDER_DETAILS_ID = `${SELLER_ORDER_DETAILS_LABEL}-order-id`;
const SELLER_ORDER_DETAILS_DATE = `${SELLER_ORDER_DETAILS_LABEL}-order-date`;
const SELLER_ORDER_DETAILS_STATUS = `${SELLER_ORDER_DETAILS_LABEL}-delivery-status`;
const SELLER_ORDER_DETAILS_BUTTON_PREPARING = 'seller_order_details__button-preparing-check';
const SELLER_ORDER_DETAILS_BUTTON_DISPATCH = 'seller_order_details__button-dispatch-check';

const SELLER_ORDER_DETAILS_TABLE = 'seller_order_details__element-order-table';
const SELLER_ORDER_DETAILS_TABLE_ITEM = `${SELLER_ORDER_DETAILS_TABLE}-item-number-`;
const SELLER_ORDER_DETAILS_TABLE_NAME = `${SELLER_ORDER_DETAILS_TABLE}-name-`;
const SELLER_ORDER_DETAILS_TABLE_QUANTITY = `${SELLER_ORDER_DETAILS_TABLE}-quantity-`;
const SELLER_ORDER_DETAILS_TABLE_UNIT_PRICE = `${SELLER_ORDER_DETAILS_TABLE}-unit-price-`;
const SELLER_ORDER_DETAILS_TABLE_SUB_TOTAL = `${SELLER_ORDER_DETAILS_TABLE}-sub-total-`;
const SELLER_ORDER_DETAILS_TABLE_REMOVE = `${SELLER_ORDER_DETAILS_TABLE}-remove-`;
const SELLER_ORDER_DETAILS_TABLE_TOTAL = 'seller_order_details__element-order-total-price';


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
    jest.spyOn(API, 'post').mockResolvedValue({ data: userSellerAccess });
    jest.spyOn(API, 'get').mockResolvedValue({ data: ordersMock });

    const { history, debug } = renderWithRouter(<App />);

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

  it('Avalia a renderização das vendas', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({ data: userSellerAccess });
    jest.spyOn(API, 'get').mockResolvedValue({ data: ordersMock });

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

    ordersMock.forEach((_, number) => {
      const index = number + 1;
      expect(screen.getByTestId(`${SELLER_ORDER_ID}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${SELLER_ORDER_DELIVERY_STATUS}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${SELLER_ORDER_DATE}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${SELLER_ORDER_PRICE}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${SELLER_ORDER_ADDRESS}${index}`)).toBeInTheDocument();
    });
  });

  // it('Avalia a renderização dos detalhes de uma venda', async () => {
  //   jest.spyOn(API, 'post').mockResolvedValue({ data: userSellerAccess });
  //   jest.spyOn(API, 'get')
  //     .mockResolvedValueOnce({ data: ordersMock })
  //     // .mockResolvedValue({ data: [{
  //     //   id: 1,
  //     //   userId: 3,
  //     //   sellerId: 2,
  //     //   totalPrice: '9.70',
  //     //   deliveryAddress: 'Rio um',
  //     //   deliveryNumber: '1',
  //     //   saleDate: '2022-11-14T02:23:35.000Z',
  //     //   status: 'Pendente',
  //     // }] });

  //   const { history, debug } = renderWithRouter(<App />);

  //   const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
  //   const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
  //   const loginButton = screen.getByTestId(LOGIN_BUTTON);
    
  //   userEvent.type(emailInput, usersLogin[1].email);
  //   userEvent.type(passwordInput, usersLogin[1].senha);
  //   userEvent.click(loginButton);

  //   await waitFor(() => expect(screen
  //     .getByTestId(NAVBAR_SELLER_NAME)).toBeInTheDocument());

  //   expect(history.location.pathname).toBe('/seller/orders');
    
  //   const firstOrder = screen.getByTestId(`${SELLER_ORDER_ID}1`);
  //   userEvent.click(firstOrder);

  //   expect(history.location.pathname).toBe('/seller/orders/1');

  //   await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));
  //   debug();
  //   // ARRUMAR - COMPONENTE ESTÁ FAZENDO FETCH CONSTANTES
  // });

});
