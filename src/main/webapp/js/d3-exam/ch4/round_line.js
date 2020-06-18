const main = (function() {

  const _dataColor = {
    tweet: 'darkred',
    retweets: 'orange',
    favorites: 'green'
  }
  let _xScale;
  let _yScale;
  let _xAxis;
  let _yAxis;

  function init() {
    d3.csv('/resources/sample-data/tweetdata.csv', render)
  }

  function render(data) {
    _xScale = d3.scale.linear().domain([1, 10.5]).range([20, 480]);
    _yScale = d3.scale.linear().domain([0, 35]).range([480, 20]);
    createAxises();
    createCircle(data);
    createRoundLine(data);
  }


  function createAxises() {
    // 날짜를 표현 하도록 X축 눈금을 설정
    _xAxis = d3.svg.axis().scale(_xScale).orient('bottom').tickSize(480).tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    d3.select('svg')
      .append('g')
      .attr('id', 'xAxisG')
      .call(_xAxis);

    _yAxis = d3.svg.axis().scale(_yScale).orient('right').ticks(10).tickSize(480);
    d3.select('svg')
      .append('g')
      .attr('id', 'yAxisG')
      .call(_yAxis);
  }

  function createCircle(data) {
    // Tweets
    d3.select('svg')
      .selectAll('circle.tweets')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'tweets')
      .attr('r', 5)
      .attr('cx', function(d) { return _xScale(d.day); })
      .attr('cy', function(d) { return _yScale(d.tweets); })
      .style('fill', _dataColor.tweet);

    // Retweets
    d3.select('svg')
      .selectAll('circle.retweets')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'retweets')
      .attr('r', 5)
      .attr('cx', function(d) { return _xScale(d.day); })
      .attr('cy', function(d) { return _yScale(d.retweets); })
      .style('fill', _dataColor.retweets);

    // Favorites
    d3.select('svg')
      .selectAll('circle.favorites')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'favorites')
      .attr('r', 5)
      .attr('cx', function(d) { return _xScale(d.day); })
      .attr('cy', function(d) { return _yScale(d.favorites); })
      .style('fill', _dataColor.favorites);
  }

  function createRoundLine(data) {
    // Tweets
    const tweetLine = d3.svg.line()
      .x(function(d) { return _xScale(d.day); })
      .y(function(d) { return _yScale(d.tweets); });
    tweetLine.interpolate('cardinal');
    d3.select('svg')
      .append('path')
      .attr('d', tweetLine(data))
      .attr('fill', 'none')
      .attr('stroke', _dataColor.tweet)
      .attr('stroke-width', 2);

    // Retweets
    const retweetsLine = d3.svg.line()
      .x(function(d) { return _xScale(d.day); })
      .y(function(d) { return _yScale(d.retweets); });
    retweetsLine.interpolate('basis');
    d3.select('svg')
      .append('path')
      .attr('d', retweetsLine(data))
      .attr('fill', 'none')
      .attr('stroke', _dataColor.retweets)
      .attr('stroke-width', 3);

    // Favorites
    const favLine = d3.svg.line()
      .x(function(d) { return _xScale(d.day); })
      .y(function(d) { return _yScale(d.favorites); });
    favLine.interpolate('step-before');
    d3.select('svg')
      .append('path')
      .attr('d', favLine(data))
      .attr('fill', 'none')
      .attr('stroke', _dataColor.favorites)
      .attr('stroke-width', 2);
  }


  return {
    init: init
  }
  
})();


document.addEventListener('DOMContentLoaded', function() {
  main.init();
});