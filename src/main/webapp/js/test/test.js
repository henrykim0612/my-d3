var globalData;
const main = (function() {

  function init() {
    d3.csv('/resources/sample-data/tweetdata.csv', render)
  }

  function render(data) {
    globalData = data;
    xScale = d3.scale.linear().domain([0, 11]).range([20, 500]);
    yScale = d3.scale.linear().domain([0, 33]).range([500, 20]);
    
    const xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickSize(500).tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const yAxis = d3.svg.axis().scale(yScale).orient('right').ticks(10).tickSize(500);
    
    const svg = d3.select('svg');
    
    svg.append('g')
      .attr('id', 'xAxisG')
      .call(xAxis);
    
    svg.append('g')
      .attr('id', 'yAxisG')
      .call(yAxis);
    
   
    svg.selectAll('g.groupG')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'groupG')
      .attr('transform', function(d) {
        return 'translate(' + xScale(d.day) + ', ' + yScale(d.retweets) + ')'
      });
    
    const groupG = svg.selectAll('g.groupG');
   
    groupG.append('circle')
      .attr('class', 'retweets')
      .attr('r', 5)
      .style('fill', 'orange')
      .on('mouseover', function(d) {
        const g = this.parentNode;
        const text = g.querySelector('text.retweets');
        text.style.opacity = 1;
      })
      .on('mouseout', function(d) {
        const g = this.parentNode;
        const text = g.querySelector('text.retweets');
        text.style.opacity = 0;
      });
    
    groupG.append('text')
      .attr('class', 'retweets')
      .attr('font-size', '15px')
      .attr('x', 10)
      .attr('y', 5)
      .style('opacity', 0)
      .text(function(d) { return d.retweets; });
    
    
    const line = d3.svg.line()
      .x(function(d) { return xScale(d.day); })
      .y(function(d) { return yScale(d.retweets); });
    
    svg.append('path')
      .attr('d', line(data))
      .attr('fill', 'none')
      .attr('stroke', 'orange')
      .attr('stroke-width', 2);
    
    
    
    
  }

  // _________________________________________ RETURN
  return {
    init : init
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  main.init();
});