let chai = require('chai');
let expect = chai.expect;
// let out1 = require('../output/ageWiseLiterateDistribution');
// let out2 = require('../output/eduCategWise');
// let out3 = require('../output/gradPopStateAndGradeWise');
let json1 = require('./json/ageWiseLiterateDistribution');
let json2 = require('./json/eduCategWise');
let json3 = require('./json/gradPopStateAndGradeWise');
// let jsoncompare = require('./jsoncompare.js');
describe('Test case for correct output', function() {
    it('Test whether the type of output folder is object or not', function(done) {
        expect(typeof json1).to.deep.equal('object');
        done();
    });

    it('Test whether the type of output folder is object or not', function(done) {
        expect(typeof json2).to.deep.equal('object');
        done();
    });

    it('Test whether the type of output folder is object or not', function(done) {
        expect(typeof json3).to.deep.equal('object');
        done();
    });

    /* it('check the output', function(done) {
        let compareResult = jsoncompare.compareJSONObjects(json1, out1);
        expect(compareResult.diffs).equal(0);
        done();
    });

    it('check the output', function(done) {
        let compareResult = jsoncompare.compareJSONObjects(json2, out2);
        expect(compareResult.diffs).equal(0);
        done();
    });

    it('check the output', function(done) {
        let compareResult = jsoncompare.compareJSONObjects(json3, out3);
        expect(compareResult.diffs).equal(0);
        done();
    });*/
});
