const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');
const chaiHttp =require('chai-http');
const { User } = require('../../database/models');
const { 
  loginMock, userMock, userRegisterBodyMock, userRegisterByAdmMock, admRegisterBodyMock, allUsersMock, loginWrongPasswordMock
} = require('../mocks/userMocks');

const app  = require('../../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDUwNDc4MCwiZXhwIjoxNjY0NTkxMTgwfQ.lYN2ImWYl-ejFGAMEClZzcFS6I3Bx4PX2lfS47v9rus';

describe('UserRoute', () => {
  describe('Rota /login', () => {
    describe('Request POST', () => {
      before(() => {
        sinon.stub(User, 'findOne')
        .onCall(0).resolves({ dataValues: userMock })
        .onCall(1).resolves({ dataValues: userMock })
        .onCall(2).resolves(null)
      });

      after(() => (User.findOne).restore());
  
      it('Successfully login', async () => {
        const result = await chai.request(app).post('/login').send(loginMock);
        expect(result.status).to.be.equal(200);
        expect(result.body).to.have.property('token');
      });

      it('Wrong Password', async () => {
        const result = await chai.request(app).post('/login').send(loginWrongPasswordMock);
        expect(result.status).to.be.equal(404);
        expect(result.body).to.deep.equal({ error: 'User not found' });
      });

      it('Failure', async () => {
        const result = await chai.request(app).post('/login').send(loginMock);
        expect(result.status).to.be.equal(404);
        expect(result.body).to.deep.equal({ error: 'User not found' });
      });
    });
  });
  
  describe('Rota /register', () => {
    describe('Request POST', () => {
      before(() => {
        sinon.stub(User, 'findOne').onCall(0).resolves(undefined).onCall(1).resolves(userMock);
        sinon.stub(User, 'create').resolves(userMock);
      });
  
      after(() => {
        (User.findOne).restore();
        (User.create).restore();
      })
  
      it('Successfully created', async () => {
        const result = await chai.request(app).post('/register').send(userRegisterBodyMock);
        expect(result.status).to.be.equal(201);
        expect(result.body).to.deep.equal({ message: 'Created' });
      });

      it('Failure', async () => {
        const result = await chai.request(app).post('/register').send(userRegisterBodyMock);
        expect(result.status).to.be.equal(409);
        expect(result.body).to.deep.equal({ error: 'Conflict' });
      });
    });
  });
  
  describe('Rota /registerAdm', () => {
    describe('Request POST', () => {
      before(() => {
        sinon.stub(jwt, 'verify').onCall(0).returns(userMock).onCall(1).returns(userRegisterByAdmMock).onCall(2).returns(userMock);
        sinon.stub(User, 'findOne').onCall(0).resolves(undefined).onCall(1).resolves(userMock);
        sinon.stub(User, 'create').resolves(userRegisterByAdmMock);
      });
  
      after(() => {
        (User.findOne).restore();
        (User.create).restore();
        (jwt.verify).restore();
      })
  
      it('Successfully created', async () => {
        const result = await chai.request(app)
        .post('/registerAdm')
        .send(admRegisterBodyMock)
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(201);
        expect(result.body).to.deep.equal({ message: 'Created' });
      });

      it('User is not Adm', async () => {
        const result = await chai.request(app)
        .post('/registerAdm')
        .send(admRegisterBodyMock)
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(401);
        expect(result.body).to.deep.equal({ message: 'User is not Adm' });
      });

      it('Failure', async () => {
        const result = await chai.request(app)
        .post('/registerAdm')
        .send(admRegisterBodyMock)
        .set({ 'authorization': `${VALID_TOKEN}` });
        expect(result.status).to.be.equal(409);
        expect(result.body).to.deep.equal({ error: 'Conflict' });
      });
    });
  });
  
  describe('Rota /user', () => {
    describe('Request GET', () => {
      before(() => {
        sinon.stub(User, 'findAll').onCall(0).resolves(allUsersMock).onCall(1).resolves(null);
      });
  
      after(() => {
        (User.findAll).restore();
      })
  
      it('Successfully Found', async () => {
        const result = await chai.request(app).get('/user');
        expect(result.status).to.be.equal(200);
        expect(result.body).to.deep.equal(allUsersMock);
      });

      it('Failure', async () => {
        const result = await chai.request(app).get('/user');
        expect(result.status).to.be.equal(404);
        expect(result.body).to.deep.equal({ message: 'Can\'t find users' });
      });
    });
  });
  
  describe('Rota /user/:id', () => {
    describe('Request GET', () => {
      before(() => {
        sinon.stub(User, 'findAll').onCall(0).resolves(userMock).onCall(1).resolves(null);
      });
  
      after(() => {
        (User.findAll).restore();
      })
  
      it('Successfully found', async () => {
        const result = await chai.request(app).get(`/user/${userMock.id}`);
        expect(result.status).to.be.equal(200);
        expect(result.body).to.deep.equal(userMock);
      });

      it('Failure', async () => {
        const result = await chai.request(app).get(`/user/${userMock.id}`);
        expect(result.status).to.be.equal(404);
        expect(result.body).to.deep.equal({ message: 'Can\'t find user' });
      });
    });
  
    describe('Request DELETE', () => {
      before(() => {
        sinon.stub(User, 'findAll').onCall(0).resolves(userMock).onCall(1).resolves(null);
        sinon.stub(User, 'destroy').resolves();
      });
  
      after(() => {
        (User.findAll).restore();
        (User.destroy).restore();
      })
  
      it('Successfully deleted', async () => {
        const result = await chai.request(app).delete(`/user/${userMock.id}`);
        expect(result.status).to.be.equal(204);
      });

      it('Failure', async () => {
        const result = await chai.request(app).delete(`/user/${userMock.id}`);
        expect(result.status).to.be.equal(404);
        expect(result.body).to.deep.equal({ message: 'User not found' });
      });
    });
  });
  
  describe('Rota /user/role/:role', () => {
    describe('Request GET', () => {
      before(() => {
        sinon.stub(User, 'findAll').onCall(0).resolves(userMock).onCall(1).resolves(null);
      });
  
      after(() => {
        (User.findAll).restore();
      })
  
      it('Successfully found', async () => {
        const result = await chai.request(app).get(`/user/role/${userMock.role}`);
        expect(result.status).to.be.equal(200);
        expect(result.body).to.deep.equal(userMock);
      });

      it('Failure', async () => {
        const result = await chai.request(app).get(`/user/role/${userMock.role}`);
        expect(result.status).to.be.equal(404);
        expect(result.body).to.deep.equal({ message: 'Can\'t find users' });
      });
    });
  });
})
