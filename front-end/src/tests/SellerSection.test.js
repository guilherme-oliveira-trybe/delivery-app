import React from 'react';
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import usersLogin from './mocks/usersInfo.mock';
import { userSellerAccess } from './mocks/users.mock';
import API from '../services/api';
import { firstOrderDetails, orderDispatchPatch, orderPreparingPatch, ordersMock } from './mocks/orders.mock';
import replaceHelper from '../services/replaceHelper';
import SellerOrders from '../pages/SellerOrders';

// Data-TestIds (Login)
const INPUT_LOGIN_EMAIL = 'common_login__input-email';
const INPUT_LOGIN_PASSWORD = 'common_login__input-password';
const INVALID_LOGIN_ALERT = 'login__input_invalid_login_alert';
const LOGIN_BUTTON = 'common_login__button-login';
const REGISTER_BUTTON = 'common_login__button-register';

// Data-TestIds (Seller)
const NAVBAR_SELLER_NAME = 'customer_products__element-navbar-user-full-name';
const NAVBAR_SELLER_LOGOUT = 'customer_products__element-navbar-link-logout';

// Data-TestIds (SellerOrders)
const SELLER_ORDER_ID = 'seller_orders__element-order-id-';
const SELLER_ORDER_DELIVERY_STATUS = 'seller_orders__element-delivery-status-';
const SELLER_ORDER_DATE = 'seller_orders__element-order-date-';
const SELLER_ORDER_PRICE = 'seller_orders__element-card-price-';
const SELLER_ORDER_ADDRESS = 'seller_orders__element-card-address-';

// Data-TestIds (SellerOrdersDetails)
const SELLER_ORDER_DETAILS_LABEL =
  'seller_order_details__element-order-details-label';
const SELLER_ORDER_DETAILS_ID = `${SELLER_ORDER_DETAILS_LABEL}-order-id`;
const SELLER_ORDER_DETAILS_DATE = `${SELLER_ORDER_DETAILS_LABEL}-order-date`;
const SELLER_ORDER_DETAILS_STATUS = `${SELLER_ORDER_DETAILS_LABEL}-delivery-status`;
const SELLER_ORDER_DETAILS_BUTTON_PREPARING =
  'seller_order_details__button-preparing-check';
const SELLER_ORDER_DETAILS_BUTTON_DISPATCH =
  'seller_order_details__button-dispatch-check';

const SELLER_ORDER_DETAILS_TABLE = 'seller_order_details__element-order-table';
const SELLER_ORDER_DETAILS_TABLE_ITEM = `${SELLER_ORDER_DETAILS_TABLE}-item-number-`;
const SELLER_ORDER_DETAILS_TABLE_NAME = `${SELLER_ORDER_DETAILS_TABLE}-name-`;
const SELLER_ORDER_DETAILS_TABLE_QUANTITY = `${SELLER_ORDER_DETAILS_TABLE}-quantity-`;
const SELLER_ORDER_DETAILS_TABLE_UNIT_PRICE = `${SELLER_ORDER_DETAILS_TABLE}-unit-price-`;
const SELLER_ORDER_DETAILS_TABLE_REMOVE_BUTTON = `${SELLER_ORDER_DETAILS_TABLE}-remove-`;
const SELLER_ORDER_DETAILS_TABLE_SUB_TOTAL = `${SELLER_ORDER_DETAILS_TABLE}-sub-total-`;
const SELLER_ORDER_DETAILS_TABLE_TOTAL =
  'seller_order_details__element-order-total-price';

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

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);
    userEvent.type(emailInput, usersLogin[1].email);
    userEvent.type(passwordInput, usersLogin[1].senha);
    userEvent.click(loginButton);

    await waitFor(() =>
      expect(screen.getByTestId(NAVBAR_SELLER_NAME)).toBeInTheDocument()
    );

    expect(history.location.pathname).toBe('/seller/orders');
    const adminName = screen.getByTestId(NAVBAR_SELLER_NAME);
    expect(adminName).toBeInTheDocument();
    expect(adminName.innerHTML).toBe('Fulana Pereira');

    const logoutButton = screen.getByTestId(NAVBAR_SELLER_LOGOUT);
    userEvent.click(logoutButton);

    expect(history.location.pathname).toBe('/login');
    expect(localStorage.getItem('user')).toBeNull();
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

    await waitFor(() =>
      expect(screen.getByTestId(NAVBAR_SELLER_NAME)).toBeInTheDocument()
    );

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

  it('Avalia a renderização dos dados básicos e status de uma venda', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({ data: userSellerAccess });
    jest.spyOn(API, 'get')
      .mockResolvedValueOnce({ data: ordersMock })
      .mockResolvedValue({ data: firstOrderDetails });

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, usersLogin[1].email);
    userEvent.type(passwordInput, usersLogin[1].senha);
    userEvent.click(loginButton);

    await waitFor(() =>
      expect(screen.getByTestId(NAVBAR_SELLER_NAME)).toBeInTheDocument()
    );

    expect(history.location.pathname).toBe('/seller/orders');

    const firstOrder = screen.getByTestId(`${SELLER_ORDER_ID}1`);
    userEvent.click(firstOrder);

    expect(history.location.pathname).toBe('/seller/orders/1');

    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    expect(screen.getByTestId(SELLER_ORDER_DETAILS_ID)).toBeInTheDocument();
    expect(screen.getByTestId(SELLER_ORDER_DETAILS_DATE)).toBeInTheDocument();
    expect(screen.getByTestId(SELLER_ORDER_DETAILS_STATUS)).toBeInTheDocument();
    expect(screen.getByTestId(SELLER_ORDER_DETAILS_BUTTON_PREPARING)).toBeInTheDocument();
    expect(screen.getByTestId(SELLER_ORDER_DETAILS_BUTTON_DISPATCH)).toBeInTheDocument();
  });

  it('Avalia a renderização dos detalhes de uma venda', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({ data: userSellerAccess });
    jest.spyOn(API, 'get')
      .mockResolvedValueOnce({ data: ordersMock })
      .mockResolvedValue({ data: firstOrderDetails });

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, usersLogin[1].email);
    userEvent.type(passwordInput, usersLogin[1].senha);
    userEvent.click(loginButton);

    await waitFor(() =>
      expect(screen.getByTestId(NAVBAR_SELLER_NAME)).toBeInTheDocument()
    );

    expect(history.location.pathname).toBe('/seller/orders');
    const firstOrder = screen.getByTestId(`${SELLER_ORDER_ID}1`);
    userEvent.click(firstOrder);
    expect(history.location.pathname).toBe('/seller/orders/1');

    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    firstOrderDetails[0].products.forEach((_, index) => {
      expect(screen.getByTestId(`${SELLER_ORDER_DETAILS_TABLE_ITEM}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${SELLER_ORDER_DETAILS_TABLE_NAME}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${SELLER_ORDER_DETAILS_TABLE_QUANTITY}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${SELLER_ORDER_DETAILS_TABLE_UNIT_PRICE}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${SELLER_ORDER_DETAILS_TABLE_SUB_TOTAL}${index}`)).toBeInTheDocument();
      expect(screen.queryByTestId(`${SELLER_ORDER_DETAILS_TABLE_REMOVE_BUTTON}${index}`)).not.toBeInTheDocument();
    });

    const totalPriceOrder = screen.getByTestId(
      SELLER_ORDER_DETAILS_TABLE_TOTAL
    );
    expect(totalPriceOrder).toBeInTheDocument();
    const totalPriceMock = firstOrderDetails[0].products.reduce(
      (acc, curr) => acc + Number(curr.price) * Number(curr.SalesProduct.quantity),
      0
    );
    expect(totalPriceOrder.innerHTML).toBe(
      `Total: R$${replaceHelper(totalPriceMock.toFixed(2))}`
    );
  });

  it('Avalia a mudança do status da venda', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({ data: userSellerAccess });
    jest.spyOn(API, 'patch')
      .mockResolvedValueOnce({ data: orderPreparingPatch })
      .mockResolvedValueOnce({ data: orderDispatchPatch });
    jest.spyOn(API, 'get')
      .mockResolvedValueOnce({ data: ordersMock })
      .mockResolvedValue({ data: firstOrderDetails });

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, usersLogin[1].email);
    userEvent.type(passwordInput, usersLogin[1].senha);
    userEvent.click(loginButton);

    await waitFor(() =>
      expect(screen.getByTestId(NAVBAR_SELLER_NAME)).toBeInTheDocument()
    );

    expect(history.location.pathname).toBe('/seller/orders');
    const firstOrder = screen.getByTestId(`${SELLER_ORDER_ID}1`);
    userEvent.click(firstOrder);
    expect(history.location.pathname).toBe('/seller/orders/1');

    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));

    const deliveryStatus = screen.getByTestId(SELLER_ORDER_DETAILS_STATUS);
    const buttonPreparingOrder = screen.getByTestId(SELLER_ORDER_DETAILS_BUTTON_PREPARING);
    const buttonDispatchOrder = screen.getByTestId(SELLER_ORDER_DETAILS_BUTTON_DISPATCH);

    expect(deliveryStatus.innerHTML).toBe('Pendente');
    userEvent.click(buttonPreparingOrder);
    await waitFor(() => expect(deliveryStatus.innerHTML).toBe('Preparando'));
    
    userEvent.click(buttonDispatchOrder);
    await waitFor(() => expect(deliveryStatus.innerHTML).toBe('Em Trânsito'));
  });

  // it('Avalia o redicionamento para login caso do usuário não esteja no localStorage', async () => {
  //   jest.spyOn(API, 'post').mockResolvedValue({ data: userSellerAccess });
  //   jest.spyOn(API, 'get')
  //     .mockResolvedValueOnce({ data: ordersMock })
  //     .mockResolvedValue({ data: firstOrderDetails });

  //   localStorage.clear();
  //   const { history, debug } = renderWithRouter(<SellerOrders />);

  //   expect(history.location.pathname).toBe('/login');

  //   // await waitFor(() =>
  //   //   expect(screen.getByTestId(NAVBAR_SELLER_NAME)).toBeInTheDocument()
  //   // );

  //   // expect(history.location.pathname).toBe('/seller/orders');
  //   debug();



    
  // });
});
