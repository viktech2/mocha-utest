'use strict';

let chai = require('chai');
let should = chai.should(),
    expect = chai.expect;

const cases = {};


cases.testCase1 = function (res) {
    //res.should.have.status(200);
    expect(res).have.status(200);
    //res.should.be.json
    expect(res).to.be.json;
    //res.body.should.be.a('object');
    expect(res.body).to.be.an('object');
    expect(res.body.appcode).to.be.oneOf([50003, 50005]);
}


module.exports = cases;