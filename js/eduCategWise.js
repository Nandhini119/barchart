let margin2 = {
        top: 70,
        right: 20,
        bottom: 110,
        left: 150
    };
let width2 = 600 - margin2.left - margin2.right;
let height2 = 550 - margin2.top - margin2.bottom;

let x = d3.scale.ordinal().rangeRoundBands([0, width2], 0.12);

let y = d3.scale.linear().rangeRound([height2, 0]);

let xAxis2 = d3.svg.axis()
    .scale(x)
    .orient('bottom');
//  .ticks(4);

let yAxis2 = d3.svg.axis()
    .scale(y)
    .orient('left');
// .ticks(10);
//  appending the graph in particular div
let svg1 = d3.select('#area1').append('svg')
    .attr('width', width2 + margin2.left + margin2.right)
    .attr('height', height2 + margin2.top + margin2.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin2.left + ', ' + margin2.top + ')');
d3.json('../test/json/eduCategWise.json', function(error, data) {
            data.forEach(function(d) {
                d.date = +d.date;
                d.value = +d.value;
                // scale the range of the data
                x.domain(data.map(function(d2) {
                    return d2.key;
                }));
                y.domain([0, d3.max(data, function(p1) {
                    return p1.value;
                })]);
            });
            // add axis to the graph
            svg1.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0, ' + height2 + ')')
                .call(xAxis2)
                .selectAll('text')
                .style('text-anchor', 'end')
                .attr('dx', '-1em')
                .attr('dy', '.85em')
                .attr('transform', 'rotate(-50)');
                    svg1.append('g')
                    .attr('class', 'y axis')
                    .call(yAxis2)
                    .append('text')
                    .attr('transform', 'rotate(-90)')
                        .attr('y', 5)
                        .attr('dy', '.75em')
                        .style('text-anchor', 'end')
                        .text('Population');
                        // Add bar chart
                        svg1.selectAll('bar')
                        .data(data)
                        .enter().append('rect')
                        .attr('class', 'bar')
                        .attr('x', function(d) {
                            return x(d.key);
                        })
                        .attr('width', 60)
                        .attr('y', function(d) {
                            return y(d.value);
                        })
                        .attr('height', function(d) {
                            return height2 - y(d.value);
                        });
                        //  Adding text to axis
                        svg1.append('text')
                        .attr('x', width2 / 2)
                        .attr('y', 0 - margin2.top / 2)
                        .attr('margin.left', '20em')
                        .attr('dy', '.35em')
                        .attr('text-anchor', 'middle')
                        .style('font-size', '16px')
                        .style('text-decoration', 'underline');
                    });
                    