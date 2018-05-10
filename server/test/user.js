const server   = require('../server');
const User     = require('../app/models/user');
const chai     = require('chai');
const chaiHttp = require('chai-http');

const should 	 = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => {  //Before each test we empty the database
    User.remove({}, (err) => { 
      done();         
    });     
  });

  describe('/POST users', () => {
    it('it should post a user', (done) => {
      const user = {
        firstName:            'Guilherme',
        lastName:             'Vargas',
        email:                'guilherme.alves.vargas@gmail.com',
        password:             '123456',
        passwordConfirmation: '123456'
      };

      chai.request(server)
        .post('/users/signup')
        .send(user)
        .end((err, res) =>{ 
          res.should.have.status(201);
          done();
        });
    });
  });

  describe('/POST users', () => {
    it('it should not post a user without required attributes', (done) => {
      const user = {
        firstName:            'Guilherme',
        lastName:             'Vargas',
        // email:                'guilherme.alves.vargas@gmail.com', required field
        password:             '123456',
        passwordConfirmation: '123456'
      };

      chai.request(server)
        .post('/users/signup')
        .send(user)
        .end((err, res) =>{ 
          res.should.have.status(400);
          done();
        });
    });
  });

});