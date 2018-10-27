'use strict';
const env = require('node-env-file');
env('.env');


let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should(),
    expect = chai.expect;

chai.use(chaiHttp);

let lib = require('../lib/cases');

describe('Flow', function () {
    this.timeout(500);

    beforeEach(done => {
        chai
            .request(process.env.HOST)
            .get('/')
            .end((err, res) => {
                if (err) return done(err);
                expect(res).have.status(200);
                done();
            });
    });

    describe('- Engagement Flowlist', () => {

        it('It should get engagement flow list (/engagement/flow/list/0)', (done) => {
            let path = `${process.env.BASE}/platform/engagement/flow/list/0`;

            chai
                .request(process.env.HOST)
                .post(path)
                .set('Authorization', process.env.ACCESS_TOKEN)
                .send({
                    engageDetailCode: process.env.ENGAGEMENT_CODE
                })
                .end((err, res) => {
                    lib.testCase1(res);
                    done();
                });
        });

        it('It should get flow details (/engagement/flow/get/0)', (done) => {
            let path = `${process.env.BASE}/platform/engagement/flow/get/0`;

            chai
                .request(process.env.HOST)
                .post(path)
                .set('Authorization', process.env.ACCESS_TOKEN)
                .send({
                    flowCode: process.env.FLOW_CODE
                })
                .end((err, res) => {
                    lib.testCase1(res);
                    done();
                });

        });
    });


});