'use strict';
const env = require('node-env-file');
env('.env');


let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should(),
    expect = chai.expect;

chai.use(chaiHttp);

describe('iMPP', function () {
    this.timeout(5000); // How long to wait for a response (ms)

    /*     beforeEach(done => {
            done();
        }); */

    describe('- All Projects/Engagement', () => {
        it('It should get project/engagement list', (done) => {
            let path = process.env.BASE + '/project/engagement/list/0';

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

                    res.should.have.status(200);
                    expect(res.body.appcode).to.be.oneOf([50003, 50005]);
                    res.body.should.be.a('object');
                    done();
                });
        });


        it('It should get project (NAP) details', (done) => {
            let path = process.env.BASE + '/project/details/view/0';

            chai
                .request(process.env.HOST)
                .post(path)
                .set('Authorization', process.env.ACCESS_TOKEN)
                .send({
                    projectCode: "PC-r1xJ08EGX7"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.appcode).to.be.oneOf([50003, 50005]);
                    res.body.should.be.a('object');
                    done();
                });
        });


        it('It should get engagement (NAP) details', (done) => {
            let path = process.env.BASE + '/platform/engagement/details/0';

            chai
                .request(process.env.HOST)
                .post(path)
                .set('Authorization', process.env.ACCESS_TOKEN)
                .send({
                    engagementDetailCode: "EC-Hyk08EM7m"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.have.property('appcode').eql(50003);
                    //expect(res.body.appcode).to.be.a('string').that.includes('50003', '50005');
                    expect(res.body.appcode).to.be.oneOf([50003, 50005]);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });





});
