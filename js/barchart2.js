var margin2 = {
		top: 70,
		right: 20,
		bottom: 110,
		left: 150
	},
	width2 = 700 - margin2.left - margin2.right,
	height2 = 550 - margin2.top - margin2.bottom;

var x = d3.scale.ordinal()
	.rangeRoundBands([0, width2], .12);

var y = d3.scale.linear()
	.rangeRound([height2, 0]);

var xAxis2 = d3.svg.axis()
	.scale(x)
	.orient('bottom');

var yAxis2 = d3.svg.axis()
	.scale(y)
	.orient('left');

var svg1 = d3.select('#chart2')
	.append('svg')
	.attr('width', width2 + margin2.left + margin2.right)
	.attr('height', height2 + margin2.top + margin2.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')');

d3.json('../output/Literacy_Ratio_NE_states_json.json', function (a, b) {
	b.forEach(function (a) {
		a.date = +a.date;
		a.value = +a.value;
		x.domain(b.map(function (a) {
			return a.content;
		}));
		y.domain([0, d3.max(b, function (a) {
			return a.value;
		})]);
	});
	var c = svg1.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height2 + ')')
		.call(xAxis2)
		.selectAll('text')
		.style('text-anchor', 'end')
		.attr('dx', '3em')
		.attr('dy', '.85em');
	var d = svg1.append('g')
		.attr('class', 'y axis')
		.call(yAxis2)
		.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 5)
		.attr('dy', '.75em')
		.style('text-anchor', 'end')
		.text('Population');
	var e = svg1.selectAll('bar')
		.data(b)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('x', function (a) {
			return x(a.content);
		})
		.attr('width', 85)
		.attr('y', function (a) {
			return y(a.value);
		})
		.attr('height', function (a) {
			return height2 - y(a.value);
		});
	var f = svg1.append('text')
		.attr('x', width2 / 2)
		.attr('y', 0 - margin2.top / 2)
		.attr('margin.left', '20em')
		.attr('dy', '.35em')
		.attr('text-anchor', 'middle')
		.style('font-size', '16px')
		.style('text-decoration', 'underline')
		.text('Ratio of male and female literate and illiterate of North Eastern States');
});