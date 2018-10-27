'use strict';
const env = require('node-env-file');
env('.env');


let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should(),
    expect = chai.expect;

chai.use(chaiHttp);

let lib = require('../lib/cases');

describe('Tasks', function () {
    this.timeout(3000);

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

    describe('- Task Processor list', () => {

        it('It should get task processor list (/engagement/flow/taskprocessor/0)', (done) => {
            let path = `${process.env.BASE}/platform/engagement/flow/taskprocessor/0`;

            chai
                .request(process.env.HOST)
                .post(path)
                .set('Authorization', process.env.ACCESS_TOKEN)
                .end((err, res) => {
                    lib.testCase1(res);
                    done();
                });
        });
    });


});