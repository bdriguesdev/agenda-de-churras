const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
const app = require('../index'); 

chai.use(chaiHttp);
chai.should();

let token;
let churrascoId;

describe("Churrasco", () => {

    before(done => {
        chai.request(app)
            .post('/user/login')
            .send({
                email: "bruno@email.com",
                password: "password"
            })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('POST /churrasco', () => {

        it('should create a churrasco', done => {
            chai.request(app)
                .post('/churrasco')
                .set('Authorization', token)
                .send({
                    title: 'Churrasco',
                    description: 'Um belo churrasco.',
                    date: '2030-10-10',
                    foodPrice: 10,
                    foodAndDrinkPrice: 20
                })
                .end((err, res) => {
                    churrascoId = res.body.churrasco._id;
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    done();
                });
        });
    });

    describe('GET /churrasco/:id', () => {

        it('should get a single churrasco record', done => {
            chai.request(app)
                .get(`/churrasco/${churrascoId}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('GET /churrasco', () => {

        it('should get all churrascos record', done => {
            chai.request(app)
                .get('/churrasco')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('PATCH /churrasco/:id', () => {

        it('should update the churrasco record', done => {
            chai.request(app)
                .patch(`/churrasco/${churrascoId}`)
                .set('Authorization', token)
                .send({
                    title: 'Churras',
                    description: 'Um extraordinário churras.',
                    date: '2030-10-09',
                    foodPrice: 20,
                    foodAndDrinkPrice: 30
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('DELETE /churrasco/:id', () => {

        it('should delete a single churrasco record', done => {
            chai.request(app)
                .delete(`/churrasco/${churrascoId}`)
                .set('Authorization', token)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});