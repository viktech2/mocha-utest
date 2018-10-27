'use strict';
const env = require('node-env-file');
env('.env');


let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should(),
    expect = chai.expect;

chai.use(chaiHttp);

let lib = require('../lib/cases');


describe('Jobs', function () {
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

    describe('- Job list', () => {

        it('It should get job list (/engagement/job/list/0)', (done) => {
            let path = `${process.env.BASE}/platform/engagement/job/list/0`;

            chai
                .request(process.env.HOST)
                .post(path)
                .set('Authorization', process.env.ACCESS_TOKEN)
                .send({
                    engagementDetailsCode: process.env.ENGAGEMENT_CODE
                })
                .end((err, res) => {
                    lib.testCase1(res);
                    done();
                });
        });
    });


});