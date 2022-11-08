import * as sinon from 'sinon';
import * as chai from 'chai';
// import * as jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';

// import { app } from '../app';

chai.use(chaiHttp);

// const { expect } = chai;

// const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDUwNDc4MCwiZXhwIjoxNjY0NTkxMTgwfQ.lYN2ImWYl-ejFGAMEClZzcFS6I3Bx4PX2lfS47v9rus';

// mock do jwt
// sinon.stub(jwt, 'verify').callsFake(() => {
//   return Promise.resolve({ success: 'Token is valid' });
// });

describe('Rota /user e /login', () => {
  describe('Rota POST /', () => {
    before(async () => sinon.stub(UserModel.prototype, 'findOne').resolves(ADMIN_USER_OBJECT));
    after(() => (UserModel.prototype.findOne).restore());

    it('Caso de sucesso', async () => {
      // const result = await chai.request(app).post('/login').send({
      //   email: 'admin@admin.com',
      //   password: 'secret_admin',
      // });
      // expect(result.status).to.be.equal(200);
      // expect(result.body).to.have.property('token');
    });
  });
});
