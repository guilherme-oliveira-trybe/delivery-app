const sinon = require('sinon');
const chai = require('chai');
// import * as jwt from 'jsonwebtoken';
const chaiHttp =require('chai-http');
const { User } = require('../../database/models');
const { loginMock, userMock } = require('../mocks/userMocks');

const app  = require('../../api/app');

chai.use(chaiHttp);

const { expect } = chai;

// const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDUwNDc4MCwiZXhwIjoxNjY0NTkxMTgwfQ.lYN2ImWYl-ejFGAMEClZzcFS6I3Bx4PX2lfS47v9rus';

// mock do jwt
// sinon.stub(jwt, 'verify').callsFake(() => {
//   return Promise.resolve({ success: 'Token is valid' });
// });

describe('Rota /login', () => {
  describe('Request POST', () => {
    before(() => sinon.stub(User, 'findOne').resolves({ dataValues: userMock }));
    after(() => (User.findOne).restore());

    it('Successfully', async () => {
      const result = await chai.request(app).post('/login').send(loginMock);
      expect(result.status).to.be.equal(200);
      expect(result.body).to.have.property('token');
    });
  });
});
