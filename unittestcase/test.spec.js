let chai = require('chai');
let expect = chai.expect;
let file_1 = require('../output/Literacy_All_states_json');
let file_2 = require('../output/Literacy_Ratio_India_json');
let file_3 = require('../output/Literacy_Ratio_NE_states_json');
let json1 = require('../json/Literacy_All_states_json');
let json2 = require('../json/Literacy_Ratio_India_json');
let json3 = require('../json/Literacy_Ratio_NE_states_json');
let jsondiff = require('../unittestcase/jsondiff.js');
let index = require('../index.js');
describe('Test case for correct output', function () {
	it('Test whether the type of output folder is object or not', function (done) {
		expect(typeof file_1)
			.to.deep.equal('object');
		done();
	});
	it('Test whether the type of output folder is object or not', function (done) {
		expect(typeof file_2)
			.to.deep.equal('object');
		done();
	});
	it('Test whether the type of output folder is object or not', function (done) {
		expect(typeof file_3)
			.to.deep.equal('object');
		done();
	});
    it('check the output', function(done) {
        let compareResult = jsondiff.compareJSONObjects(json1, file_1);
        expect(compareResult.diffs).equal(0);
        done();
    
    });
    it('check the output', function(done) {
        let compareResult = jsondiff.compareJSONObjects(json2, file_2);
        expect(compareResult.diffs).equal(0);
        done();
    
    });
    it('check the output', function(done) {
        let compareResult = jsondiff.compareJSONObjects(json3, file_3);
        expect(compareResult.diffs).equal(0);
        done();
    
    });
});