const main = (function () {

  const _margin = {
    top : 15,
    right : 25,
    bottom : 15,
    left : 25
  };
  const _originWidth = 960;
  const _originHeight = 500;
  const _width = 960 - _margin.left - _margin.right;
  const _height = 500 - _margin.top - _margin.bottom;

  function init() {
    d3.json('/resources/sample-data/tweets.json', function(err, data) { render(data.tweets); });
  }

  function render(tweets) {

    const nestedTweets = d3.nest().key(function(el) { return el.user; }).entries(tweets);
    // 루트 객체 안에 넣는다.
    const packableTweets = {id: 'All Tweets', values: nestedTweets};
    const depthColorScale = d3.scale.category10([0, 1, 2]);

    const packLayout = d3.layout.pack();
    packLayout.size([_width, _height])
      .children(function(d) { return d.values; }) // 자식요소 읽어옴
      .value(function(d) { return d.retweets.length + d.favorites.length + 1; }); // 단말 노드의 크기를 결정할 때 1을 반환

    const groupG = d3.select('#svgDiv')
      .append('svg')
      .attr('width', _originWidth)
      .attr('height', _originHeight)
      .append('g')
      .attr('class', 'groupG')
      .attr('transform', 'translate(' + _margin.left + ', ' + _margin.top + ')');

    groupG.selectAll('circle')
      .data(packLayout(packableTweets))
      .enter()
      .append('circle')
      .attr('r', function(d) { return  d.r - (d.depth * 10); })
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .style('fill', function(d) { return depthColorScale(d.depth); })
      .style('stroke', 'black')
      .style('stroke', '2px');

  }

  return {
    init: init
  }

})();


document.addEventListener('DOMContentLoaded', function () {
  main.init();
});