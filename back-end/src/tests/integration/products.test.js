const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');
const chaiHttp =require('chai-http');
const { Product } = require('../../database/models');
const { allProductsMock, productMock } = require('../mocks/productsMocks');

const app  = require('../../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDUwNDc4MCwiZXhwIjoxNjY0NTkxMTgwfQ.lYN2ImWYl-ejFGAMEClZzcFS6I3Bx4PX2lfS47v9rus';

describe('ProductsRoute', () => {
  describe('Rota /products', () => {
    describe('Request GET', () => {
      before(() => {
        sinon.stub(jwt, 'verify').resolves();
        sinon.stub(Product, 'findAll').resolves(allProductsMock);
      });
  
      after(() => {
        (Product.findAll).restore();
        (jwt.verify).restore();
      });
  
      it('Successfully found', async () => {
        const result = await chai.request(app)
        .get('/products')
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(200);
        expect(result.body).to.deep.equal({ products: allProductsMock });
      });
    });
  });

  describe('Rota /products/:id', () => {
    describe('Request GET', () => {
      before(() => {
        sinon.stub(jwt, 'verify').resolves();
        sinon.stub(Product, 'findAll').onCall(0).resolves(productMock).onCall(1).resolves(null);
      });
  
      after(() => {
        (Product.findAll).restore();
        (jwt.verify).restore();
      });

      it('Successfully found', async () => {
        const result = await chai.request(app)
        .get(`/products/${productMock.id}`)
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(200);
        expect(result.body).to.deep.equal({ product: productMock});
      });

      it('Failure', async () => {
        const result = await chai.request(app)
        .get(`/products/${productMock.id}`)
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(404);
        expect(result.body).to.deep.equal({ message: 'Can\'t find product' });
      });
    });
  });
});