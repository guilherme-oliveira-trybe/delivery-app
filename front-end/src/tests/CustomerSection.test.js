import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import usersLogin from './mocks/usersInfo.mock';
import { allUsersSellers, userCustomerAccess } from './mocks/users.mock';
import allProducts from './mocks/products.mock';
import cartShop from './mocks/cart.mock';
import { saleCreated, saleWithAllInfo, saleWithAllInfoDelivery } from './mocks/sale.mock';
import { orderDisplay } from './mocks/orders.mock';
import API from '../services/api';
import replaceHelper from '../services/replaceHelper';

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

// Data-TestIds (Product)
const CUSTOMER_PRODUCTS_BUTTON_CART = 'customer_products__button-cart';
const CUSTOMER_PRODUCTS_BUTTON_VALUE = 'customer_products__checkout-bottom-value';

// Data-TestIds (ProductCard)
const CUSTOMER_PRODUCTS_PRICE = 'customer_products__element-card-price-';
const CUSTOMER_PRODUCTS_IMAGE = 'customer_products__img-card-bg-image-';
const CUSTOMER_PRODUCTS_TITLE = 'customer_products__element-card-title-';
const CUSTOMER_PRODUCTS_ADD_ITEM = 'customer_products__button-card-add-item-';
const CUSTOMER_PRODUCTS_INPUT_QUANTITY = 'customer_products__input-card-quantity-';
const CUSTOMER_PRODUCTS_RM_ITEM = 'customer_products__button-card-rm-item-';

// Data-TestIds (CheckoutTable)
const CUSTOMER_TABLE = 'customer_checkout__element-order-table';
const CUSTOMER_TABLE_ITEM = `${CUSTOMER_TABLE}-item-number-`;
const CUSTOMER_TABLE_NAME = `${CUSTOMER_TABLE}-name-`;
const CUSTOMER_TABLE_QUANTITY = `${CUSTOMER_TABLE}-quantity-`;
const CUSTOMER_TABLE_UNIT_PRICE = `${CUSTOMER_TABLE}-unit-price-`;
const CUSTOMER_TABLE_SUB_TOTAL = `${CUSTOMER_TABLE}-sub-total-`;
const CUSTOMER_TABLE_REMOVE = `${CUSTOMER_TABLE}-remove-`;
const CUSTOMER_TABLE_TOTAL = 'customer_checkout__element-order-total-price';

// Data-TestIds (CheckoutTable)
const CUSTOMER_CHECKOUT_SELECT_SELLER = 'customer_checkout__select-seller';
const CUSTOMER_CHECKOUT_INPUT_ADDRESS = 'customer_checkout__input-address';
const CUSTOMER_CHECKOUT_INPUT_ADDRESS_NUMBER = 'customer_checkout__input-address-number';
const CUSTOMER_CHECKOUT_BUTTON_SUBMIT = 'customer_checkout__button-submit-order';

// Data-TestIds (OrderCard)
const CUSTOMER_ORDER_ID = 'customer_orders__element-order-id-';
const CUSTOMER_ORDER_DELIVERY_STATUS = 'customer_orders__element-delivery-status-';
const CUSTOMER_ORDER_ORDER_DATE = 'customer_orders__element-order-date-';
const CUSTOMER_ORDER_CARD_PRICE = 'customer_orders__element-card-price-';

const CUSTOMER_ORDER_DELIVERY_CHECK = 'customer_order_details__button-delivery-check';

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
  afterEach(() => {
    localStorage.clear();
  });

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

  it('Avalia a renderização dos produtos', async () => {
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

    allProducts.products.forEach((_, number) => {
      const index = number + 1;
      expect(screen.getByTestId(`${CUSTOMER_PRODUCTS_PRICE}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${CUSTOMER_PRODUCTS_IMAGE}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${CUSTOMER_PRODUCTS_TITLE}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${CUSTOMER_PRODUCTS_ADD_ITEM}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${CUSTOMER_PRODUCTS_INPUT_QUANTITY}${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${CUSTOMER_PRODUCTS_RM_ITEM}${index}`)).toBeInTheDocument();
    });

    const buttonCart = screen.getByTestId(CUSTOMER_PRODUCTS_BUTTON_CART);
    const buttonValue = screen.getByTestId(CUSTOMER_PRODUCTS_BUTTON_VALUE);
    expect(buttonCart).toBeInTheDocument();
    expect(buttonValue).toBeInTheDocument();

  });

  it('Avalia a adição de produtos ao carrinho de compras', async () => {
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


    // Produto 1 (adiciona 3)
    expect(screen.getByTestId(`${CUSTOMER_PRODUCTS_RM_ITEM}1`)).toBeDisabled();
    userEvent.click(screen.getByTestId(`${CUSTOMER_PRODUCTS_ADD_ITEM}1`));
    userEvent.click(screen.getByTestId(`${CUSTOMER_PRODUCTS_ADD_ITEM}1`));
    userEvent.click(screen.getByTestId(`${CUSTOMER_PRODUCTS_ADD_ITEM}1`));
    expect(screen.getByTestId(`${CUSTOMER_PRODUCTS_RM_ITEM}1`)).toBeEnabled();

    // Produto 2 (adiciona 2 e remove 1)
    userEvent.click(screen.getByTestId(`${CUSTOMER_PRODUCTS_ADD_ITEM}2`));
    userEvent.click(screen.getByTestId(`${CUSTOMER_PRODUCTS_ADD_ITEM}2`));
    userEvent.click(screen.getByTestId(`${CUSTOMER_PRODUCTS_RM_ITEM}2`));


    // Produto 3 (utilizando o input)
    userEvent.type(screen.getByTestId(`${CUSTOMER_PRODUCTS_INPUT_QUANTITY}3`), '1');

    const buttonValue = screen.getByTestId(CUSTOMER_PRODUCTS_BUTTON_VALUE);
    const totalCart = cartShop.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0);
    expect(buttonValue.innerHTML).toBe(replaceHelper(totalCart.toFixed(2)));
  });

  it('Avalia a renderização da tela de checkout', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({ data: userCustomerAccess });
    jest.spyOn(API, 'get')
    .mockResolvedValueOnce({ data: allProducts })
    .mockResolvedValueOnce({ data: allUsersSellers });

    const { history } = renderWithRouter(<App />);
  
    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);
    userEvent.type(emailInput, usersLogin[2].email);
    userEvent.type(passwordInput, usersLogin[2].senha);
    userEvent.click(loginButton);
    
    await waitFor(() => expect(screen
      .getByTestId(NAVBAR_USER_NAME)).toBeInTheDocument());
      
    expect(history.location.pathname).toBe('/customer/products');

    userEvent.click(screen.getByTestId(`${CUSTOMER_PRODUCTS_ADD_ITEM}1`));
    localStorage.setItem('carrinho', JSON.stringify(cartShop));
    userEvent.click(screen.getByTestId(CUSTOMER_PRODUCTS_BUTTON_VALUE));
    expect(history.location.pathname).toBe('/customer/checkout');

    const totalCheckout = screen.getByTestId(CUSTOMER_TABLE_TOTAL);
    const totalCart = cartShop
      .reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0);
    expect(totalCheckout.innerHTML).toBe(`Total: R$${replaceHelper(totalCart.toFixed(2))}`);

    expect(screen.getByTestId(CUSTOMER_CHECKOUT_SELECT_SELLER)).toBeInTheDocument();
    expect(screen.getByTestId(CUSTOMER_CHECKOUT_INPUT_ADDRESS)).toBeInTheDocument();
    expect(screen.getByTestId(CUSTOMER_CHECKOUT_INPUT_ADDRESS_NUMBER)).toBeInTheDocument();
    expect(screen.getByTestId(CUSTOMER_CHECKOUT_BUTTON_SUBMIT)).toBeInTheDocument();

    // esta com erro de act - CORRIGIR
  });

  it('Avalia criação de nova venda', async () => {
    jest.spyOn(API, 'post')
      .mockResolvedValueOnce({ data: userCustomerAccess })
      .mockResolvedValueOnce({ data: saleCreated });
    jest.spyOn(API, 'get')
      .mockResolvedValueOnce({ data: allProducts })
      .mockResolvedValueOnce({ data: allUsersSellers })
      .mockResolvedValue({ data: saleWithAllInfo });
      
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);
    userEvent.type(emailInput, usersLogin[2].email);
    userEvent.type(passwordInput, usersLogin[2].senha);
    userEvent.click(loginButton);
    
    await waitFor(() => expect(screen
      .getByTestId(NAVBAR_USER_NAME)).toBeInTheDocument());
      
    expect(history.location.pathname).toBe('/customer/products');
    
    userEvent.click(screen.getByTestId(`${CUSTOMER_PRODUCTS_ADD_ITEM}1`));
    localStorage.setItem('carrinho', JSON.stringify(cartShop));
    userEvent.click(screen.getByTestId(CUSTOMER_PRODUCTS_BUTTON_VALUE));
    expect(history.location.pathname).toBe('/customer/checkout');
    
    const formInputAddress =  screen.getByTestId(CUSTOMER_CHECKOUT_INPUT_ADDRESS);
    const formInputAddressNumber =  screen.getByTestId(CUSTOMER_CHECKOUT_INPUT_ADDRESS_NUMBER);
    const formSelectSeller =  screen.getByTestId(CUSTOMER_CHECKOUT_SELECT_SELLER);
    const buttonCreateSale =  screen.getByTestId(CUSTOMER_CHECKOUT_BUTTON_SUBMIT);

    await waitFor(() => expect(screen.getByText(allUsersSellers[0].name)).toBeInTheDocument());
    
    userEvent.type(formInputAddress, 'Rua Teste');
    userEvent.type(formInputAddressNumber, '123');
    userEvent.selectOptions(formSelectSeller, allUsersSellers[0].name);
    userEvent.click(buttonCreateSale);

    await waitForElementToBeRemoved(() => screen.getByTestId(CUSTOMER_CHECKOUT_BUTTON_SUBMIT));

    expect(history.location.pathname).toBe('/customer/orders/1');
  });

  // Tem a tela de orderDetails

  it('Avalia a renderização de todos os pedidos do usuário', async () => {
    jest.spyOn(API, 'post').mockResolvedValue({ data: userCustomerAccess });
    jest.spyOn(API, 'get')
      .mockResolvedValueOnce({ data: allProducts })
      .mockResolvedValue({ data: orderDisplay });

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
    userEvent.click(screen.getByTestId(NAVBAR_ORDERS));

    expect(history.location.pathname).toBe('/customer/orders');
    
    await waitFor(() => expect(screen.getByTestId(`${CUSTOMER_ORDER_ID}1`)).toBeInTheDocument());

    orderDisplay.forEach((_, index) => {
      expect(screen.getByTestId(`${CUSTOMER_ORDER_ID}${index + 1}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${CUSTOMER_ORDER_DELIVERY_STATUS}${index + 1}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${CUSTOMER_ORDER_ORDER_DATE}${index + 1}`)).toBeInTheDocument();
      expect(screen.getByTestId(`${CUSTOMER_ORDER_CARD_PRICE}${index + 1}`)).toBeInTheDocument();
    });
  });

  // it('Avalia a mudança no status do pedido para Entregue', async () => {
  //   jest.spyOn(API, 'post').mockResolvedValue({ data: userCustomerAccess });
  //   jest.spyOn(API, 'get')
  //     .mockResolvedValueOnce({ data: allProducts })
  //     .mockResolvedValueOnce({ data: orderDisplay })
  //     .mockResolvedValue({ data: saleWithAllInfo });
  //   jest.spyOn(API, 'patch').mockResolvedValue({ data: saleWithAllInfoDelivery });

  //   const { history, debug } = renderWithRouter(<App />);

  //   const emailInput = screen.getByTestId(INPUT_LOGIN_EMAIL);
  //   const passwordInput = screen.getByTestId(INPUT_LOGIN_PASSWORD);
  //   const loginButton = screen.getByTestId(LOGIN_BUTTON);
  //   userEvent.type(emailInput, usersLogin[2].email);
  //   userEvent.type(passwordInput, usersLogin[2].senha);

  //   expect(screen.queryByTestId(INVALID_LOGIN_ALERT)).not.toBeInTheDocument();
  //   expect(loginButton).toBeEnabled();
  //   userEvent.click(loginButton);

  //   await waitFor(() => expect(screen
  //     .getByTestId(NAVBAR_USER_NAME)).toBeInTheDocument());

  //   expect(history.location.pathname).toBe('/customer/products');
  //   userEvent.click(screen.getByTestId(NAVBAR_ORDERS));

  //   expect(history.location.pathname).toBe('/customer/orders');
    
  //   await waitFor(() => expect(screen.getByTestId(`${CUSTOMER_ORDER_ID}1`)).toBeInTheDocument());

  //   userEvent.click(screen.getByTestId(`${CUSTOMER_ORDER_ID}1`));

  //   const deliveryButton = screen.getByTestId(CUSTOMER_ORDER_DELIVERY_CHECK);

  //   userEvent.click(deliveryButton);

  //   await waitFor(() => expect(deliveryButton.innerHTML).toBe('Entregue'));
  // });


});
