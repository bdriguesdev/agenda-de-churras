const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
require('./db.js');
const app = require('../index.js'); 

chai.use(chaiHttp);
chai.should();

describe('User', () => {

    describe('POST /user', () => {

        it("should create an user", done => {
            chai.request(app)
                .post('/user')
                .send({
                    email: "bruno@email.com",
                    password: "password",
                    firstName: "Bruno",
                    lastName: "Rodrigues"
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    done();
                });
        });
    });

    describe("POST /user/login", () => {

        it("should create a token", done => {
            chai.request(app)
                .post('/user/login')
                .send({
                    email: "bruno@email.com",
                    password: "password"
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    done();
                });
        });
    });
});
