const main = (function() {

  let _xExtent;
  let _yExtent;
  let _xScale;
  let _yScale;
  let _xAxis;
  let _yAxis;
  let _line;
  
  function init() {
    d3.csv('/resources/sample-data/tweetdata.csv', render)
  }

  function render(data) {

    const svg = d3.select('svg');
    
    setScale(data);
    appendXAxis(svg);
    appendYAxis(svg);
    appendGroupG(svg, data);
    appendCircle();
    appendText();
    appendLine(svg, data);
    
  }
  
  function setScale(data) {
    _xExtent = d3.extent(data, function(d) { return parseInt(d.day); });
    _yExtent = d3.extent(data, function(d) { return parseInt(d.retweets); });
    _xScale = d3.scale.linear().domain(_xExtent).range([10, 500]);
    _yScale = d3.scale.linear().domain(_yExtent).range([500, 10]);
  }
  
  function appendXAxis(svg) {
    _xAxis = d3.svg.axis().scale(_xScale).orient('bottom').tickSize(500).ticks(10);
    svg.append('g')
      .attr('id', 'xAxisG')
      .call(_xAxis);
  }
  
  
  function appendYAxis(svg) {
    _yAxis = d3.svg.axis().scale(_yScale).orient('right').tickSize(500).ticks(10);
    svg.append('g')
      .attr('id', 'yAxisG')
      .call(_yAxis);
  }
  
  // Circle과 Text를 가지고 있는 그룹 생성
  function appendGroupG(svg, data) {
    svg.selectAll('g.group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'group')
      .attr('transform', function(d) {
        return 'translate(' + _xScale(parseInt(d.day)) + ', ' + _yScale(parseInt(d.retweets)) + ')';
      });
  }
  
  function appendCircle() {
    d3.selectAll('g.group')
      .append('circle')
      .attr('class', 'circle.retweets')
      .attr('r', 3)
      .attr('fill', 'red')
      .on('mouseover', function(d) {
        const g = this.parentNode;
        const text = g.querySelector('text'); 
        text.style.opacity = 1;
        const circle = g.querySelector('circle');
        circle.setAttribute('fill', 'green');
        circle.style.opacity = 1;
      })
      .on('mouseout', function(d) {
        const g = this.parentNode;
        const text = g.querySelector('text'); 
        text.style.opacity = 0;
        const circle = g.querySelector('circle');
        circle.setAttribute('fill', 'red');
        circle.style.opacity = 0;
      })
      .transition()
      .duration(500)
      .attr('r', 6)
      .style('opacity', 0);
      
  }
  
  function appendText() {
    d3.selectAll('g.group')
      .append('text')
      .attr('class', 'text.retweets')
      .attr('font-size', '13px bold')
      .attr('x', 10)
      .attr('y', 5)
      .style('opacity', 0)
      .style('fill', 'blue')
      .text(function(d) { return d.retweets; });
  }
  
  function appendLine(svg, data) {
    _line = d3.svg.line()
      .x(function(d) { return _xScale(d.day); })
      .y(function(d) { return _yScale(d.retweets); });
    
//    _line.interpolate('basis');
        
    svg.append('path')
      .attr('d', _line(data))
      .attr('stroke', 'red')
      .attr('stroke-width', 0)
      .transition()
      .delay(function(d, i) { return i * 200; })
      .duration(1000)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 3);
  }
  
  

  // _________________________________________ RETURN
  return {
    init : init
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  main.init();
});