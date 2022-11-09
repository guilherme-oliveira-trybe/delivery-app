const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');
const chaiHttp =require('chai-http');
const { Sales, User, Product, SalesProduct } = require('../../database/models');
const { allSalesMock, salesBodyMock, salesCreatedMock, salesById, customer, seller } = require('../mocks/salesMocks');

const app  = require('../../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDUwNDc4MCwiZXhwIjoxNjY0NTkxMTgwfQ.lYN2ImWYl-ejFGAMEClZzcFS6I3Bx4PX2lfS47v9rus';

describe('SalesRoute', () => {
  describe('Rota /customer/orders', () => {
    describe('Request GET', () => {
      before(() => {
        sinon.stub(jwt, 'verify').resolves();
        sinon.stub(Sales, 'findAll').resolves(allSalesMock);
      });
  
      after(() => {
        (Sales.findAll).restore();
        (jwt.verify).restore();
      })
  
      it('Successfully found', async () => {
        const result = await chai.request(app)
        .get('/customer/orders')
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(200);
        expect(result.body).to.deep.equal(allSalesMock);
      });
    });

    describe('Request Post', () => {
      before(() => {
        sinon.stub(jwt, 'verify').resolves();
        // sinon.stub(User, 'findAll').onCall(0).resolves(customer).onCall(1).resolves(seller);
        // sinon.stub(Product, 'findAll').resolves();
        sinon.stub(Sales, 'create').resolves({ dataValues: salesCreatedMock });
        sinon.stub(SalesProduct, 'bulkCreate').resolves();
      });
  
      after(() => {
        (jwt.verify).restore();
        // (User.findAll).restore();
        // (Product.findAll).restore();
        (Sales.create).restore();
        (SalesProduct.bulkCreate).restore();
      })

      it('Successfully created', async () => {
        const result = await chai.request(app)
        .post('/customer/orders')
        .send(salesBodyMock)
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(201);
        expect(result.body).to.deep.equal(salesCreatedMock);
      });
    })
  });

  describe('Rota /customer/orders/:id', () => {
    describe('Request GET', () => {
      before(() => {
        sinon.stub(jwt, 'verify').resolves();
        sinon.stub(Sales, 'findByPk').resolves(salesById);
      });
  
      after(() => {
        (Sales.findByPk).restore();
        (jwt.verify).restore();
      })

      it('Successfully found', async () => {
        const result = await chai.request(app)
        .get(`/customer/orders/${salesCreatedMock.id}`)
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(200);
        expect(result.body).to.deep.equal([salesById]);
      });
    })
  })
});