let margin = {
        top: 40,
        bottom: 220,
        left: 100,
        right: 90
    };
let width = 1000 - margin.left - margin.right;
let height = 1500 - margin.top - margin.bottom;
let horizontal = d3.scale.ordinal().rangeRoundBands([0, width], 0.12);
let vertical = d3.scale.linear().rangeRound([height, 0]);
let color1 = d3.scale.category10();
let xAxis = d3.svg.axis()
    .scale(horizontal)
    .orient('bottom');
let yAxis = d3.svg.axis()
    .scale(vertical)
    .orient('left');
let svg2 = d3.select('#area3').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
d3.json('../test/json/gradPopStateAndGradeWise.json', function(err, data) {
    data.forEach(function(d) {
        d.Statename = d.State_Name;
        d.Literate = d.Literate;
        d.Illiterate = d.Illiterate;
    });
    let xData = ['Literate', 'Illiterate'];
    let dataIntermediate = xData.map(function(c) {
        return data.map(function(d) {
            return {
                x: d.State_name,
                y: d[c]
            };
        });
    });
    let dataStackLayout = d3.layout.stack()(dataIntermediate);
    horizontal.domain(dataStackLayout[0].map(function(d) {
        return d.x;
    }));
    vertical.domain([0, d3.max(dataStackLayout[dataStackLayout.length - 1],
            function(d) {
                return d.y0 + d.y;
            })])
        .nice();
    let layer = svg2.selectAll('.stack')
        .data(dataStackLayout)
        .enter().append('g')
        .attr('class', 'stack')

        .style('fill', function(d, i) {
            return color1(i);
        });
    layer.selectAll('rect')
        .data(function(d) {
            return d;
        })
        .enter().append('rect')
        .attr('x', function(d) {
            return horizontal(d.x);
        })
        .attr('y', function(d) {
            return vertical(d.y + d.y0);
        })
        .attr('height', function(d) {
            return vertical(d.y0) - vertical(d.y + d.y0);
        })
        .attr('width', 20);
    // add axis
    svg2.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-0.5em')
        .attr('dy', '-0.01em')
        .attr('transform', 'rotate(-50)');
    svg2.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 5)
        .attr('dy', '.75em')
        .style('text-anchor', 'end')
        .text('Literatecy_rate_statewise');
    let legend = svg2.selectAll('.legend')
        .data(color1.domain().slice().reverse())
        .enter().append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            return 'translate(0, ' + i * 20 + ')';
        });
    legend.append('rect')
        .attr('x', width - 18)
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', color1);
    legend.append('text')
        .attr('x', width - 24)
        .attr('y', 9)
        .attr('dy', '.35em')
        .style('text-anchor', 'end')
        .text(function(d, i) {
            return xData[i];
        });
});
