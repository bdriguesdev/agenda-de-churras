const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
const app = require('../index');

chai.use(chaiHttp);
chai.should();

let token;
const participantIds = [];
let churrascoId;

describe('Participant', () => {

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

    describe('POST /participant', () => {

        before(done => {
            chai.request(app)
            .post('/churrasco')
            .set('Authorization', token)
            .send({
                title: 'Churrasco',
                description: 'Um belo churrasco.',
                date: '2031-10-10',
                foodPrice: 10,
                foodAndDrinkPrice: 20
            })
            .end((err, res) => {
                churrascoId = res.body.churrasco._id;
                done();
            });
        });

        it('should create a participant', done => {
            chai.request(app)
                .post('/participant')
                .set('Authorization', token)
                .send({
                    name: 'Rodrigo Silva',
                    value: 20,
                    churrascoId
                })
                .end((err, res) => {
                    participantIds.push(res.body.participant._id);
                    expect(err).to.be.null;
                    expect(res).to.have.status(201)
                    done();
                });
        });
    });

    describe('DELETE /participant', () => {

        before(done => {
            chai.request(app)
                .post('/participant')
                .set('Authorization', token)
                .send({
                    name: 'Rodrigo Silva',
                    value: 20,
                    churrascoId
                })
                .end((err, res) => {
                    participantIds.push(res.body.participant._id);
                    done();
                });
        });

        it('should delete multiple participants record', done => {
            chai.request(app)
                .delete(`/participant`)
                .set('Authorization', token)
                .send({
                    ids: participantIds,
                    churrascoId
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});