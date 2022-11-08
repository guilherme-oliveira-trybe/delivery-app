// import React from 'react';
// import {
//   screen,
//   waitForElement,
//   waitForElementToBeRemoved,
// } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from '../renderWithRouter';
// import App from '../App';
import URLS from './mocks/urls';

expect.extend({
  validURL: (received, validator) => {
    if (validator[received]) return { message: () => 'URL mockada', pass: true };
    return { message: () => 'URL não mockada', pass: false };
  },
});

describe('Teste da Tela de Login', () => {
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
