let margin1 = {
        top: 50,
        right: 20,
        bottom: 110,
        left: 150
    };
let width1 = 600 - margin1.left - margin1.right;
let height1 = 550 - margin1.top - margin1.bottom;
let x1 = d3.scale.ordinal().rangeRoundBands([0, width1], 0.12);
let y1 = d3.scale.linear().rangeRound([height1, 0]);
let xAxis1 = d3.svg.axis()
    .scale(x1)
    .orient('bottom');
let yAxis1 = d3.svg.axis()
    .scale(y1)
    .orient('left');
// appending the graph in particular div
let svg = d3.select('#area2').append('svg')
    .attr('width', width1 + margin1.left + margin1.right)
    .attr('height', height1 + margin1.top + margin1.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin1.left + ', ' + margin1.top + ')');
d3.json('../test/json/ageWiseLiterateDistribution.json', function(error, data) {
            data.forEach(function(d) {
                d.date = +d.date;
                d.value = +d.value;
                // scale the range of the data
                x1.domain(data.map(function(d1) {
                    return d1.key;
                }));
                y1.domain([0, d3.max(data, function(p) {
                    return p.value;
                })]);
            });
            // add axis
            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0, ' + height1 + ')')
                .call(xAxis1)
                .selectAll('text')
                .style('text-anchor', 'end')
                .attr('dx', '-2em')
                .attr('dy', '-.85em')
                .attr('transform', 'rotate(-50)');
                 svg.append('g')
                 .attr('class', 'y axis')
                 .call(yAxis1)
                 .append('text')
                 .attr('transform', 'rotate(-90)')
                 .attr('y', 5)
                 .attr('dy', '.75em')
                 .style('text-anchor', 'end')
                 .text('Population');
                        // Add bar chart
                  svg.selectAll('bar')
                 .data(data)
                 .enter().append('rect')
                 .attr('class', 'bar')
                 .attr('x', function(d) {
                  return x1(d.key);
                  })
                 .attr('width', 60)
                 .attr('y', function(d) {
                  return y1(d.value);
                  })
                 .attr('height', function(d) {
                  return height1 - y1(d.value);
                  });
                // Adding text to axis 
                  svg.append('text')
                 .attr('x', width / 2)
                 .attr('y', 0 - margin1.top / 2)
                 .attr('margin.left', '20em')
                 .attr('dy', '.35em')
                 .attr('text-anchor', 'middle')
                 .style('font-size', '16px')
                 .style('text-decoration', 'underline');
                  });
                  