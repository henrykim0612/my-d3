const main = (function () {

  const _margin = {
    top : 20,
    right : 20,
    bottom : 100,
    left : 40
  };
  
  const _originWidth = 960;
  const _originHeight = 500;
  const _width = 960 - _margin.left - _margin.right;
  const _height = 500 - _margin.top - _margin.bottom;

  function init() {

    const sampleData = [
      {date: '26-Mar-12', value: 606.98},
      {date: '27-Mar-12', value: 614.48},
      {date: '28-Mar-12', value: 617.62},
      {date: '29-Mar-12', value: 609.86},
      {date: '30-Mar-12', value: 599.55},
      {date: '2-Apr-12', value: 618.63},
      {date: '3-Apr-12', value: 629.32},
      {date: '4-Apr-12', value: 624.31},
      {date: '5-Apr-12', value: 633.68},
      {date: '9-Apr-12', value: 636.23},
      {date: '10-Apr-12', value: 628.44},
      {date: '11-Apr-12', value: 626.20},
      {date: '12-Apr-12', value: 622.77},
      {date: '13-Apr-12', value: 605.23},
      {date: '16-Apr-12', value: 580.13},
      {date: '17-Apr-12', value: 543.70},
      {date: '18-Apr-12', value: 443.34},
      {date: '19-Apr-12', value: 345.44},
      {date: '20-Apr-12', value: 234.98},
      {date: '23-Apr-12', value: 166.70},
      {date: '24-Apr-12', value: 130.28},
      {date: '25-Apr-12', value: 99.00},
      {date: '26-Apr-12', value: 89.70},
      {date: '27-Apr-12', value: 67.00},
      {date: '30-Apr-12', value: 53.98},
      {date: '1-May-12', value: 58.13}
    ];

    // 시간 포맷 변경
    const parseDate = d3.time.format("%d-%b-%y").parse;
    sampleData.forEach(function(el) {
      el.date = parseDate(el.date);
      el.value = parseFloat(el.value);
    });

    render(sampleData);

  }
  
  function render(data) {

    const xScale = d3.scale.ordinal().domain(data.map(function(el) { return el.date; })).rangeRoundBands([0, _width], .1);
    const yScale = d3.scale.linear().domain([0, d3.max(data, function(d) { return d.value; })]).range([_height, 0]);

    const xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(d3.time.format('%Y-%m-%d'));
    const yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(10);

    const groupG = d3.select('#svgDiv')
      .append('svg')
      .attr('width', _originWidth)
      .attr('height', _originHeight)
      .append('g')
      .attr('transform', 'translate(' + _margin.left + ', ' + _margin.top + ')');

    // X Axis
    groupG.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + _height + ')')
      .call(xAxis)
      .selectAll('text') // text 태그의 위취를 변경시킴
      .style('text-anchor', 'end')
      .attr("dx", "-.8em")
      // .attr("dy", "-.15em")
      .attr("transform", "rotate(-45)" );

    // Y Axis
    groupG.append('g')
      .attr('class', 'y axis')
      .call(yAxis)

    const barG = groupG.selectAll('g.barG')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'barG');

    barG.append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return xScale(d.date); })
      .attr('y', function(d) { return yScale(d.value); })
      .attr('width', xScale.rangeBand())
      .attr('height', function(d) { return _height - yScale(d.value); })
  }

  return {
    init: init
  }

})();


document.addEventListener('DOMContentLoaded', function () {
  main.init();
});