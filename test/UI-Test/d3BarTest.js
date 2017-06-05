describe('the svg', function () {
	let svg = document.getElementsByTagName('svg');
	it('svg creation', function () {
		expect(svg.length)
			.to.equal(3);
	});
	it('svg have rectangles for bar chart', function () {
		expect(document.getElementsByTagName('rect'))
			.to.not.be.null;
	});
	function getsvg()
	{
	    return d3.select('svg');
	}

});