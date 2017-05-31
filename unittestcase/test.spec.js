let chai = require('chai');
let expect = chai.expect;
let file_1 = require('../output/Literacy_All_states_json');
let file_2 = require('../output/Literacy_Ratio_India_json');
let file_3 = require('../output/Literacy_Ratio_NE_states_json');
let index = require('../index.js');
const obj1 = [{
	'content': 'Female_illiterate ',
	'value': 2006042540
}, {
	'content': 'Male_illiterate ',
	'value': 1467605536
}, {
	'content': 'Female_literate ',
	'value': 2142395044
}, {
	'content': 'Male_literate ',
	'value': 2898465844
}];
const obj2 = [{
	'content': 'Female_illiterate',
	'value': 31672776
}, {
	'content': 'Male_illiterate',
	'value': 26658564
}, {
	'content': 'Female_literate',
	'value': 54320640
}, {
	'content': 'Male_literate',
	'value': 60747976
}];
const obj3 = [{
	'State_Name': 'JAMMU & KASHMIR',
	'Literate': 42210616,
	'Illiterate': 36974072
}, {
	'State_Name': 'HIMACHAL PRADESH',
	'Literate': 37523988,
	'Illiterate': 15390956
}, {
	'State_Name': 'PUNJAB',
	'Literate': 134913172,
	'Illiterate': 82382328
}, {
	'State_Name': 'CHANDIGARH',
	'Literate': 4804960,
	'Illiterate': 1805872
}, {
	'State_Name': 'UTTARAKHAND',
	'Literate': 44136036,
	'Illiterate': 22422160
}, {
	'State_Name': 'HARYANA',
	'Literate': 101319492,
	'Illiterate': 61449736
}, {
	'State_Name': 'NCT OF DELHI',
	'Literate': 74169376,
	'Illiterate': 26730096
}, {
	'State_Name': 'RAJASTHAN',
	'Literate': 273950860,
	'Illiterate': 257764412
}, {
	'State_Name': 'UTTAR PRADESH',
	'Literate': 715170508,
	'Illiterate': 593981428
}, {
	'State_Name': 'BIHAR',
	'Literate': 293061068,
	'Illiterate': 338183516
}, {
	'State_Name': 'SIKKIM',
	'Literate': 3775240,
	'Illiterate': 1482688
}, {
	'State_Name': 'ARUNACHAL PRADESH',
	'Literate': 9270096,
	'Illiterate': 7686664
}, {
	'State_Name': 'NAGALAND',
	'Literate': 19361424,
	'Illiterate': 9084260
}, {
	'State_Name': 'MANIPUR',
	'Literate': 17232680,
	'Illiterate': 9367496
}, {
	'State_Name': 'MIZORAM',
	'Literate': 13019976,
	'Illiterate': 3816844
}, {
	'State_Name': 'TRIPURA',
	'Literate': 26826884,
	'Illiterate': 9729556
}, {
	'State_Name': 'MEGHALAYA',
	'Literate': 25582316,
	'Illiterate': 17163832
}, {
	'State_Name': 'ASSAM',
	'Literate': 123434340,
	'Illiterate': 74776268
}, {
	'State_Name': 'WEST BENGAL',
	'Literate': 435657340,
	'Illiterate': 250569796
}, {
	'State_Name': 'JHARKHAND',
	'Literate': 144365572,
	'Illiterate': 139155196
}, {
	'State_Name': 'ODISHA',
	'Literate': 209202856,
	'Illiterate': 160044644
}, {
	'State_Name': 'CHHATTISGARH',
	'Literate': 131986964,
	'Illiterate': 103359880
}, {
	'State_Name': 'MADHYA PRADESH',
	'Literate': 323258400,
	'Illiterate': 287158084
}, {
	'State_Name': 'GUJARAT',
	'Literate': 254650152,
	'Illiterate': 143008068
}, {
	'State_Name': 'DAMAN & DIU',
	'Literate': 943356,
	'Illiterate': 287476
}, {
	'State_Name': 'DADRA & NAGAR HAVELI',
	'Literate': 2064168,
	'Illiterate': 1527668
}, {
	'State_Name': 'MAHARASHTRA',
	'Literate': 508291108,
	'Illiterate': 226639556
}, {
	'State_Name': 'ANDHRA PRADESH',
	'Literate': 324758872,
	'Illiterate': 251118048
}, {
	'State_Name': 'KARNATAKA',
	'Literate': 261537376,
	'Illiterate': 159531560
}, {
	'State_Name': 'GOA',
	'Literate': 6166964,
	'Illiterate': 1763904
}, {
	'State_Name': 'LAKSHADWEEP',
	'Literate': 805124,
	'Illiterate': 186208
}, {
	'State_Name': 'KERALA',
	'Literate': 145771404,
	'Illiterate': 30145784
}, {
	'State_Name': 'TAMIL NADU',
	'Literate': 324787596,
	'Illiterate': 146598228
}, {
	'State_Name': 'PUDUCHERRY',
	'Literate': 5449584,
	'Illiterate': 1898128
}, {
	'State_Name': 'ANDAMAN & NICOBAR ISLANDS',
	'Literate': 1401020,
	'Illiterate': 463664
}];
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
	it('Matches the desired output of a as per given input test case', function (done) {
		expect(index.a)
			.to.deep.equal(obj1);
		done();
	});
	it('Matches the desired output of b as per given input test case', function (done) {
		expect(index.b)
			.to.deep.equal(obj2);
		done();
	});
	it('Matches the desired output of C as per given input test case', function (done) {
		expect(index.c)
			.to.deep.equal(obj3);
		done();
	});
});