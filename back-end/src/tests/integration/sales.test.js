const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');
const chaiHttp =require('chai-http');
const { Sales, SalesProduct } = require('../../database/models');
const { 
  allSalesMock, salesBodyMock, salesCreatedMock, salesById, salesUpdate, saleStatusUpdate
} = require('../mocks/salesMocks');

const app  = require('../../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDUwNDc4MCwiZXhwIjoxNjY0NTkxMTgwfQ.lYN2ImWYl-ejFGAMEClZzcFS6I3Bx4PX2lfS47v9rus';

const INVALID_TOKEN = 'tokenerradodemais'

describe('SalesRoute', () => {
  describe('Rota /customer/orders', () => {
    describe('Request GET', () => {
      before(() => {
        sinon.stub(jwt, 'verify').onCall(0).resolves();
        sinon.stub(Sales, 'findAll').resolves(allSalesMock);
      });
  
      after(() => {
        (jwt.verify).restore();
        (Sales.findAll).restore();
      });
  
      it('Successfully found', async () => {
        const result = await chai.request(app)
        .get('/customer/orders')
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(200);
        expect(result.body).to.deep.equal(allSalesMock);
      });

      it('Failure Token Not Found', async () => {
        const result = await chai.request(app)
        .get('/customer/orders')
        expect(result.status).to.be.equal(401);
        expect(result.body).to.deep.equal({ message: 'Token not found' });
      });
    });

    describe('Request Post', () => {
      before(() => {
        sinon.stub(jwt, 'verify').resolves();
        sinon.stub(Sales, 'create').onCall(0).resolves({ dataValues: salesCreatedMock }).onCall(1).resolves(null);
        sinon.stub(SalesProduct, 'bulkCreate').onCall(0).resolves().onCall(1).resolves(null);
      });
  
      after(() => {
        (jwt.verify).restore();
        (Sales.create).restore();
        (SalesProduct.bulkCreate).restore();
      });

      it('Successfully created', async () => {
        const result = await chai.request(app)
        .post('/customer/orders')
        .send(salesBodyMock)
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(201);
        expect(result.body).to.deep.equal(salesCreatedMock);
      });

      it('Failure', async () => {
        const result = await chai.request(app)
        .post('/customer/orders')
        .send({})
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(404);
        expect(result.body).to.deep.equal({ message: 'Can\'t create sale' });
      });
    });
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
      });

      it('Successfully found', async () => {
        const result = await chai.request(app)
        .get(`/customer/orders/${salesCreatedMock.id}`)
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(200);
        expect(result.body).to.deep.equal([salesById]);
      });
    })

    describe('Request PATCH', () => {
      before(() => {
        sinon.stub(Sales, 'findAll').onCall(0).resolves(salesById).onCall(1).resolves(salesUpdate).onCall(2).resolves(null);
        sinon.stub(Sales, 'update').resolves();
      });
  
      after(() => {
        (Sales.findAll).restore();
        (Sales.update).restore();
      });

      it('Successfully changed', async () => {
        const result = await chai.request(app)
        .patch(`/customer/orders/${salesCreatedMock.id}`)
        .send(saleStatusUpdate)
        expect(result.status).to.be.equal(200);
        expect(result.body).to.deep.equal(salesUpdate);
      });

      it('Failure', async () => {
        const result = await chai.request(app)
        .patch(`/customer/orders/${salesCreatedMock.id, 'Entregue'}`)
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(404);
        expect(result.body).to.deep.equal({ message: 'Can\'t find sale' });
      });
    })
  })

  describe('Rota /seller/orders', () => {
    describe('Request GET', () => {
      before(() => {
        sinon.stub(jwt, 'verify').resolves();
        sinon.stub(Sales, 'findAll').resolves(allSalesMock);
      });
  
      after(() => {
        (Sales.findAll).restore();
        (jwt.verify).restore();
      });
  
      it('Successfully found', async () => {
        const result = await chai.request(app)
        .get('/seller/orders')
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(200);
        expect(result.body).to.deep.equal(allSalesMock);
      });
    });
  });

  describe('Rota /seller/orders/:id', () => {
    describe('Request GET', () => {
      before(() => {
        sinon.stub(jwt, 'verify').resolves();
        sinon.stub(Sales, 'findByPk').resolves(salesById);
      });
  
      after(() => {
        (Sales.findByPk).restore();
        (jwt.verify).restore();
      });

      it('Successfully found', async () => {
        const result = await chai.request(app)
        .get(`/seller/orders/${salesCreatedMock.id}`)
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(200);
        expect(result.body).to.deep.equal([salesById]);
      });
    });
  });
});