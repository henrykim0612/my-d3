const main = (function () {
  
  let _xScale;
  let _yScale;
  let _xAxisDomain;
  
  function init() {
    d3.json('/resources/sample-data/tweets.json', function(err, data) { render(data.tweets); });
  }

  function render(tweets) {
    
    // 데이터를 보기좋게 가공
    const nestedTweets = d3.nest().key(function(d) { return d.user;}).entries(tweets);
    nestedTweets.forEach(function(el) {
      el.numTweets = el.values.length;
      el.numFavorites = d3.sum(el.values, function(d) {return d.favorites.length;});
      el.numRetweets = d3.sum(el.values, function(d) {return d.retweets.length;});
    });
    
    _xAxisDomain = nestedTweets.map(function(el) { return el.key; });
    
    const margin = {top: 100, right: 100, bottom: 100, left: 100}
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    

    _xScale = d3.scale.ordinal().domain(_xAxisDomain).rangePoints([0, 900]);
    const xAxis = d3.svg.axis().scale(_xScale).orient('bottom');
    
    const svg = d3.select('#svg');
    svg
      .append('g')
      .attr('class', 'barG')
      .attr('transform', 'translate(480, 250)'); // 중앙으로
    
    svg
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', 'translate(30, 450)')
      .call(xAxis);
    
    
    change(nestedTweets);
    
  }
  
  function change(data, key) {
    
    const yAxisKey = !!key ? key : 'numTweets';
    const chart = d3.layout.histogram().bins(_xAxisDomain).value(function(d) { return d[yAxisKey]; });
    const chartData = chart(data);
    
    _yScale = d3.scale.linear().domain(d3.extent(data, function(d) { return d[yAxisKey]; })).range([800, 0]);
    
    console.log(chartData);
    d3.select('g.barG')
      .selectAll('rect')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('x', function(d) { return _xScale(d['key']); })
      .attr('y', function(d) { return _yScale(d[yAxisKey]); })
      .attr('width', 50)
      .attr('height', function(d) { return 800 - _yScale(d.y); });
    
  }
  
  

  return {
    init: init
  }

})();


document.addEventListener('DOMContentLoaded', function () {
  main.init();
});