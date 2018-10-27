'use strict';
const env = require('node-env-file');
env('.env');


let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should(),
    expect = chai.expect;

chai.use(chaiHttp);

let lib = require('../lib/cases');

describe('Projects', function () {
    this.timeout(3000);
    this.slow(1000); // To tweak what’s considered “slow” (Red- slow, Yellow - reasonable else None)

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

    //describe.only - Exclusive tests (allows you to run only specific suite)

    describe('- Projects/Engagement', () => {

        //it.only - Exclusive tests (allows you to run only specific test case)

        it('It should get project/engagement list (/project/engagement/list/0)', (done) => {
            let path = `${process.env.BASE}/project/engagement/list/0`;

            chai
                .request(process.env.HOST)
                .post(path)
                //.set('content-type', 'application/json').
                .set('Authorization', process.env.ACCESS_TOKEN)
                .end((err, res) => {
                    /* if (err) {
                        done(err)
                    } else {
                        //console.log(Object.keys(res));
                        //console.log(typeof (res.body));

                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    } */

                    lib.testCase1(res);
                    done();
                });
        });


        it('It should get project (NAP) details (/project/details/view/0)', (done) => {
            let path = `${process.env.BASE}/project/details/view/0`;

            chai
                .request(process.env.HOST)
                .post(path)
                .set('Authorization', process.env.ACCESS_TOKEN)
                .send({
                    projectCode: process.env.PROJECT_CODE
                })
                .end((err, res) => {
                    lib.testCase1(res);
                    done();
                });
        });


        it('It should get engagement (NAP) details (/engagement/details/0)', (done) => {
            let path = `${process.env.BASE}/platform/engagement/details/0`;

            chai
                .request(process.env.HOST)
                .post(path)
                .set('Authorization', process.env.ACCESS_TOKEN)
                .send({
                    engagementDetailCode: process.env.ENGAGEMENT_CODE
                })
                .end((err, res) => {
                    //res.body.should.have.property('appcode').eql(50003);
                    //expect(res.body.appcode).to.be.a('string').that.includes('50003', '50005');
                    lib.testCase1(res);
                    done();
                });
        });

    });


});