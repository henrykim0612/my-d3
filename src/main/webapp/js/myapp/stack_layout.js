const main = (function() {

  const _margin = {
    top : 20,
    right : 20,
    bottom : 30,
    left : 40
  };
  const _originWidth = 960;
  const _originHeight = 500;
  const _width = 960 - _margin.left - _margin.right;
  const _height = 500 - _margin.top - _margin.bottom;

  function init() {
    d3.csv('/resources/sample-data/stack.csv', render);
  }

  function render(csvData) {

    let keys = [];
    for (let key in csvData[0]) {
      if (key !== 'State') keys.push(key);
    }

    // Stack 데이터를 위해서 재가공
    csvData.forEach(function(el) {
      let y0 = 0;
      el.ages = keys.map(function (name) {
        return {name: name, y0: y0, y1: y0 += parseInt(el[name])};
      });
      el.total = el.ages[el.ages.length - 1].y1;
    });
    csvData.sort(function(a, b) { return b.total - a.total; });


    const xScale = d3.scale.ordinal().domain(csvData.map(function (d) { return d['State']; })).rangeRoundBands([0, _width], .1);
    const yScale = d3.scale.linear().domain([0, d3.max(csvData, function (d) { return d.total; })]).rangeRound([_height, 0]);
    const colorScale = d3.scale.category10(keys);
    const xAxis = d3.svg.axis().scale(xScale).orient('bottom');
    const yAxis = d3.svg.axis().scale(yScale).orient('left').tickFormat(d3.format('.2s'));

    const groupG = d3.select('#svgDiv').append('svg')
      .attr('width', _originWidth)
      .attr('height', _originHeight)
      .append('g')
      .attr('class', 'groupG')
      .attr('transform', 'translate(' + _margin.left + ', ' + _margin.top + ')');

    // X Axis
    d3.select('svg').append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(' + _margin.left + ', ' + (_height + _margin.top) + ')')
      .call(xAxis);

    // Y Axis
    d3.select('svg').append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + _margin.left + ', ' + _margin.top + ')')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Population');

    // Data
    const state = groupG.selectAll('g.stateG')
      .data(csvData)
      .enter()
      .append('g')
      .attr('class', 'stateG')
      .attr('transform', function (d) { return 'translate(' + xScale(d['State']) + ', 0)'; });

    state.selectAll('rect')
      .data(function(d) { return d.ages; })
      .enter()
      .append('rect')
      .attr('width', xScale.rangeBand())
      .attr('height', function(d) { return yScale(d.y0) - yScale(d.y1); })
      .attr('y', function(d){ return yScale(d.y1); })
      .style('fill', function(d) { return colorScale(d.name); });

  }
  
  return {
    init: init
  }
  
})()

document.addEventListener('DOMContentLoaded', function() {
  main.init();
});