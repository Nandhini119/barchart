var margin1 = {
		top: 50,
		right: 20,
		bottom: 110,
		left: 150
	},
	width = 700 - margin1.left - margin1.right,
	height = 550 - margin1.top - margin1.bottom;

var x1 = d3.scale.ordinal()
	.rangeRoundBands([0, width], .12);

var y1 = d3.scale.linear()
	.rangeRound([height, 0]);

var xAxis1 = d3.svg.axis()
	.scale(x1)
	.orient('bottom');

var yAxis1 = d3.svg.axis()
	.scale(y1)
	.orient('left');

var svg = d3.select('#chart1')
	.append('svg')
	.attr('width', width + margin1.left + margin1.right)
	.attr('height', height + margin1.top + margin1.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin1.left + ',' + margin1.top + ')');

d3.json('../output/Literacy_Ratio_India_json.json', function (a, b) {
	b.forEach(function (a) {
		a.date = +a.date;
		a.value = +a.value;
		x1.domain(b.map(function (a) {
			return a.content;
		}));
		y1.domain([0, d3.max(b, function (a) {
			return a.value;
		})]);
	});
	var c = svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis1)
		.selectAll('text')
		.style('text-anchor', 'end')
		.attr('dx', '4em')
		.attr('dy', '.85em');
	var d = svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis1)
		.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 5)
		.attr('dy', '.75em')
		.style('text-anchor', 'end')
		.text('Population');
	var e = svg.selectAll('bar')
		.data(b)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('x', function (a) {
			return x1(a.content);
		})
		.attr('width', 85)
		.attr('y', function (a) {
			return y1(a.value);
		})
		.attr('height', function (a) {
			return height - y1(a.value);
		});
	var f = svg.append('text')
		.attr('x', width / 2)
		.attr('y', 0 - margin1.top / 2)
		.attr('margin.left', '20em')
		.attr('dy', '.35em')
		.attr('text-anchor', 'middle')
		.style('font-size', '16px')
		.style('text-decoration', 'underline')
		.text('Ratio of male and female literate and illiterate');
});