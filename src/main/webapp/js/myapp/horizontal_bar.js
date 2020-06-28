const main = (function () {

  const _margin = {
    top : 15,
    right : 25,
    bottom : 15,
    left : 60
  };
  
  const _originWidth = 960;
  const _originHeight = 500;
  const _width = 960 - _margin.left - _margin.right;
  const _height = 500 - _margin.top - _margin.bottom;
  
  
  function init() {
    
    const sampleData = [
      {
        "name" : "Apples",
        "value" : 20,
      }, {
        "name" : "Bananas",
        "value" : 12,
      }, {
        "name" : "Grapes",
        "value" : 19,
      }, {
        "name" : "Lemons",
        "value" : 5,
      }, {
        "name" : "Limes",
        "value" : 16,
      }, {
        "name" : "Oranges",
        "value" : 26,
      }, {
        "name" : "Pears",
        "value" : 30,
      }
    ];

    // Value가 높은 순으로 정렬
    const sortedData = sampleData.sort(function(a, b) {
      return d3.ascending(a.value, b.value);
    });
    
    render(sortedData);
    
  }
  
  function render(data) {
    
    const maxValue = d3.max(data, function(d) { return d.value; });
    nameArr = data.map(function(d) { return d.name; });
    const xScale = d3.scale.linear().domain([0, maxValue]).range([0, _width]);
    const yScale = d3.scale.ordinal().domain(nameArr).rangeRoundBands([_height, 0], .1);
    const yAxis = d3.svg.axis().scale(yScale).orient('left').tickSize(0);
    const colorScale = d3.scale.category10(nameArr);
    
    const groupG = d3.select('#svgDiv')
      .append('svg')
      .attr('width', _originWidth)
      .attr('height', _originHeight)
      .append('g')
      .attr('id', 'groupG')
      .attr('transform', 'translate(' + _margin.left + ', ' + _margin.top + ')');
      
    
    // Y-Axis 추가
    groupG.append('g')
      .attr('class', 'y axis')
      .call(yAxis);
    
    const barG = groupG.selectAll('.barG')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'barG');
    
    // Rect 추가
    barG.append('rect')
      .attr('class', 'rect')
      .attr('x', 0)
      .attr('y', function(d) { return yScale(d.name); })
      .attr('width', 0)
      .style('fill', function(d) { return colorScale(d.name); })
      .transition()
      .duration(1000)
      .attr('width', function(d) { return xScale(d.value); })
      .attr('height', yScale.rangeBand())
      .style('fill', function(d) { return colorScale(d.name); });
      
    
    // Bar 오른쪽에 Label 추가
    barG.append('text')
      .attr('class', 'label')
      .attr('x', function(d) { return xScale(d.value) + 3; })
      .attr('y', function(d) { return (yScale(d.name) + (yScale.rangeBand() / 2)) + 4; })
      .text(function(d) { return d.value; });
    
  }
  
  

  return {
    init: init
  }

})();


document.addEventListener('DOMContentLoaded', function () {
  main.init();
});