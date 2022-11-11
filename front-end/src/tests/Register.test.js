import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// Data-TestIds
const INPUT_REGISTER_NAME = 'common_register__input-name';
const INPUT_REGISTER_EMAIL = 'common_register__input-email';
const INPUT_REGISTER_PASSWORD = 'common_register__input-password';
const REGISTER_BUTTON = 'common_register__button-registe';
// const INVALID_REGISTER_EMAIL = 'common_register__element-invalid_register';

const ARRAY_REGISTER_FIXED_ELEMENTS = [
  INPUT_REGISTER_NAME,
  INPUT_REGISTER_EMAIL,
  INPUT_REGISTER_PASSWORD,
  REGISTER_BUTTON,
  INPUT_REGISTER_EMAIL,
];

describe('Teste da Tela de Registro', () => {
  it('Verifica se todos os componentes da tela de Registro estão presentes', async () => {
    renderWithRouter(<App />);
    ARRAY_REGISTER_FIXED_ELEMENTS.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });
});
