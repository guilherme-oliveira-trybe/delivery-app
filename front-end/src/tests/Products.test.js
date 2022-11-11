// import React from 'react';
// import {
//   screen,
//   waitForElement,
//   waitForElementToBeRemoved,
// } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from '../renderWithRouter';
// import App from '../App';
import API from '../services/api';
import URLS from './mocks/urls';

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

jest.spyOn(API, 'post').mockResolvedValue({
  data: {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    role: 'administrator',
    token:
      // eslint-disable-next-line max-len
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwib…TE5fQ.RGmLTRoW4j4ud5kQ940XbfpT9zWvRiJTQEFeuPLIR58',
  },
});

expect.extend({
  validURL: (received, validator) => {
    if (validator[received]) return { message: () => 'URL mockada', pass: true };
    return { message: () => 'URL não mockada', pass: false };
  },
});

describe('Teste da Tela de Products', () => {
  it('', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch').mockImplementation(async (URL) => (
        { json: async () => URLS[URL] || expect(URL).validURL(URLS) }
      ));
    // const { history } = renderWithRouter(<App />);
    expect(fetchMock).toBeCalled();
    // history.push(DRINKS_PATH);
  });
});
