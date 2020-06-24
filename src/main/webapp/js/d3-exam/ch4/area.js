const main = (function() {

  function init() {
    d3.csv('/resources/sample-data/movies.csv', render)
  }

  function render(data) {

    const xScale = d3.scale.linear().domain([1, 10]).range([20, 470]);
    const yScale = d3.scale.linear().domain([-100, 100]).range([470, 20]);
    const xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickSize(470).ticks(10);
    const yAxis = d3.svg.axis().scale(yScale).orient('right').tickSize(470).ticks(10);

    d3.select('svg')
      .append('g')
      .attr('id', 'xAxis')
      .call(xAxis);

    d3.select('svg')
      .append('g')
      .attr('id', 'yAxis')
      .call(yAxis);

    // 영화 6편에 해당하는 색상
    const fillScale = d3.scale.linear().domain([0, 5]).range(['lightgray', 'black']);
    let n = 0;
    for (let x in data[0]) {
      if (x !== 'day') {
        const movieArea = d3.svg.area()
          .x(function(d) { return xScale(d.day); })
          .y(function(d) { return yScale(alternatingStacking(d, x, 'top', n))})
          .y0(function(d) { return yScale( alternatingStacking(d, x, 'bottom', n)); }) // 영역의 아래쪽 모습 결정
          .interpolate('basis');

        d3.select('svg')
          .append('path')
          .style('id', x + 'Area')
          .attr('d', movieArea(data))
          .attr('fill', fillScale(n))
          .attr('stroke', 'none')
          .attr('stroke-width', 2)
          .style('opacity', .5);

        n++;
      }
    }
  }

  function simpleStacking(incomingData, key) {
    let newHeight = 0;
    for(let x in incomingData) {
      if (x !== 'day') {
        newHeight += parseInt(incomingData[x]);
        if(x === key) {
          break;
        }
      }
    }
    return newHeight;
  }

  function alternatingStacking(incomingData, key, topBottom, n) {
    let newHeight = 0;
    let skip = true;
    for (let x in incomingData) {
      if (x !== 'day') {
        // 첫번째 영화(중앙에 위치)는 무시하고, 위아래로 번갈아 출력하므로 하나 건너 하나씩 무시.
        if (x === 'movie1' || !skip) {
          newHeight += parseInt(incomingData[x]);
          // 기준선이 되는 영화에 도달하면 멈춘다.
          if (x === key) break;
          if (!skip) {
            skip = true;
          } else {
            n%2 === 0 ? skip = false : skip = true;
          }
        } else {
          skip = false;
        }
      }
    }
    // 스트림 그래프에서 아래쪽 영역의 높이는 음수고, 위쪽 영역의 높이는 양수다.
    if (topBottom === 'bottom') {
      newHeight = -newHeight;
    }
    if (n > 1 && n % 2 === 1 && topBottom === 'bottom') {
      newHeight = 0;
    }
    if (n > 1 && n % 2 === 0 && topBottom === 'top') {
      newHeight = 0;
    }
    return newHeight;
  }

  return {
    init: init
  }
  
})();


document.addEventListener('DOMContentLoaded', function() {
  main.init();
});