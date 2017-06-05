let margin3 = {top: 70, bottom: 220, left: 110, right: 90}, width3 = 1050 - margin3.left - margin3.right, height3 = 600 - margin3.top - margin3.bottom;
	
let horizontal = d3.scale.ordinal().rangeRoundBands([0, width3], .12), vertical = d3.scale.linear().rangeRound([height3, 0]);
	
let color = d3.scale.category20();

let xaxis = d3.svg.axis().scale(horizontal).orient('bottom');

let yaxis = d3.svg.axis().scale(vertical).orient('left');

let svg2 = d3.select('#chart3').append('svg').attr('width', width3 + margin3.left + margin3.right)
	.attr('height', height3 + margin3.top + margin3.bottom).append('g')
	.attr('transform', 'translate(' + margin3.left + ',' + margin3.top + ')');

d3.json('../output/Literacy_All_states_json.json', function (a, b) {
	b.forEach(function (a) {
		a.State_Name = a.State_Name;
		a.Literate = a.Literate;
		a.Illiterate = a.Illiterate;
	});
	let c = ['Literate', 'Illiterate'];
	let d = c.map(function (a) {
		return b.map(function (b) {
			return {
				x: b.State_Name,
				y: b[a]
			};
		});
	});
	let e = d3.layout.stack()(d);
	horizontal.domain(e[0].map(function (a) {
		return a.x;
	}));
	vertical.domain([0, d3.max(e[e.length - 1], function (a) {
			return a.y0 + a.y;
		})])
		.nice();
	let f = svg2.selectAll('.stack')
		.data(e)
		.enter()
		.append('g')
		.attr('class', 'stack')
		.style('fill', function (a, b) {
			return color(b);
		});
	let g = f.selectAll('rect')
		.data(function (a) {
			return a;
		})
		.enter()
		.append('rect')
		.attr('x', function (a) {
			return horizontal(a.x);
		})
		.attr('y', function (a) {
			return vertical(a.y + a.y0);
		})
		.attr('height', function (a) {
			return vertical(a.y0) - vertical(a.y + a.y0);
		})
		.attr('width', 20);
	let h = svg2.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height3 + ')')
		.call(xaxis)
		.selectAll('text')
		.style('text-anchor', 'end')
		.attr('dx', '-0.5em')
		.attr('dy', '-0.01')
		.attr('transform', 'rotate(-50)');
	let i = svg2.append('g')
		.attr('class', 'y axis')
		.call(yaxis)
		.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 5)
		.attr('dy', '.75em')
		.style('text-anchor', 'end')
		.text('Illiterate,Literate');
	let j=svg2.selectAll('.legend')
		.data(color.domain()
			.slice()
			.reverse())
		.enter()
		.append('g')
		.attr('class', 'legend')
		.attr('transform', function (a, b) {
			return 'translate(0,' + 20 * b + ')';
		});
	j.append('rect')
		.attr('x', width3 - 18)
		.attr('width', 18)
		.attr('height', 18)
		.style('fill', color);
	j.append('text')
		.attr('x', width3 - 24)
		.attr('y', 9)
		.attr('dy', '.35em')
		.style('text-anchor', 'end')
		.text(function (a, b) {
			return c[b];
		});
	let k = svg2.append('text')
		.attr('x', width3 / 2)
		.attr('y',  margin3.top / 2)
		.attr('dy', '.35em')
		.attr('text-anchor', 'middle')
		.style('font-size', '16px')
		.style('text-decoration', 'underline')
		.text('Literate and Illiterate ratio of each states');
});