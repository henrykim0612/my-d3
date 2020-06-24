const main = (function() {

  function init() {
    d3.json('/resources/sample-data/tweets.json', function(err, data) { render(data.tweets); });
  }

  function render(tweetsData) {

    const xScale = d3.scale.linear().domain([0, 5]).range([0, 500]);
    const yScale = d3.scale.linear().domain([0, 10]).range([400, 0]);
    const xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(5);
    const histoChart = d3.layout.histogram();

    // 히스토그램 분류할 값 결정
    histoChart.bins([0, 1, 2, 3, 4, 5]).value(function (d) {
      // 데이터 점에서 레이아웃이 분류할 값
      return d.favorites.length;
    });

    // 데이터를 포맷함
    let histoData = histoChart(tweetsData);
    d3.select('svg').selectAll('rect')
      .data(histoData)
      .enter()
      .append('rect')
      .attr('x', function(d) { return xScale(d.x); })
      .attr('y', function(d) { return yScale(d.y); })
      .attr('width', xScale(histoData[0].dx) - 2)
      .attr('height', function(d) {
        // 포맷된 데이터로 막대를 그린다.
        return 400 - yScale(d.y);
      })
      .on('click', retweets);

    d3.select('svg')
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', 'translate(0, 400)')
      .call(xAxis)

    // 막대 아래 중앙에 축 레이블을 놓는다.
    d3.select('g.xAxis').selectAll('text')
      .attr('dx', 50);

    function retweets() {

      histoChart.value(function(d) {
        // 측정하고 있는 값을 변경
        return d.retweets.length;
      });

      histoData = histoChart(tweetsData);

      // 새로운 데이터를 바인딩하고 다시 그림
      d3.selectAll('rect')
        .data(histoData)
        .transition()
        .duration(500)
        .attr('x', function(d) { return xScale(d.x); })
        .attr('y', function(d) { return yScale(d.y); })
        .attr('height', function(d) { return 400 - yScale(d.y); });
    }
  }

  return {
    init: init
  }

})();


document.addEventListener('DOMContentLoaded', function() {
  main.init();
});