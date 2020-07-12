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
    d3.csv('/resources/sample-data/movies.csv', function(err, data) { render(data); });
  }

  function render(incData) {

    const xScale = d3.scale.linear().domain([1, 10]).range([0, _width]);
    const yScale = d3.scale.linear().domain([0, 70]).range([_height, 0]);
    const heightScale = d3.scale.linear().domain([0, 70]).range([0, _height]);
    const movieColors = d3.scale.category10(['movie1', 'movie2', 'movie3', 'movie4', 'movie5', 'movie6']);
    // const stackArea = d3.svg.area().interpolate('basis')
    //   .x(function(d) { return xScale(d.x); })
    //   .y0(function(d) { return yScale(d.y0); })
    //   .y1(function(d) { return yScale(d.y0 + d.y); });

    let stackData = [];
    for (let x in incData[0]) {
      // day 열은 지나친다. 이 열은 x값으로 사용한다.
      if (x !== 'day') {
        const newMovieObject = {name: x, values: []};
        for (let y in incData) {
          // 날짜에 해당하는 x 좌표와 그날 영화가 벌어들인 수익에 해당하는 y 좌표를 담은 객체들을 values 배열에 넣는다.
          newMovieObject.values.push({
            x: parseInt(incData[y]['day']),
            y: parseInt(incData[y][x])
          });
        }
        stackData.push(newMovieObject);
      }
    }

    console.log(stackData)
    const stackLayout = d3.layout.stack()
      // .offset('silhouette')
      // .order('inside-out')
      .values(function(d) { return d.values; });

    const xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickSize(_width).ticks(10);
    const yAxis = d3.svg.axis().scale(yScale).orient('right').tickSize(_height).ticks(8).tickSubdivide(true);

    const groupG = d3.select('#svgDiv').append('svg')
      .attr('id', 'svg')
      .attr('width', _originWidth)
      .attr('height', _originHeight)
      .append('g')
      .attr('class', 'groupG')
      .attr('transform', 'translate(' + _margin.left + ', ' + _margin.top + ')');

    groupG.append('g')
      .attr('class', 'x axis')
      .call(xAxis);

    groupG.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    groupG.selectAll('g.bar')
      .data(stackLayout(stackData))
      .enter()
      .append('g')
      .attr('class', 'bar')
      .each(function(d) {
        d3.select(this).selectAll('rect')
          .data(d.values)
          .enter()
          .append('rect')
          .attr('x', function(p) { return xScale(p.x) - 15; })
          .attr('y', function(p) { return yScale(p.y + p.y0); })
          .attr('height', function(p) { return heightScale(p.y); })
          .attr('width', 30)
          .style('fill', movieColors(d.name));
      });

  }

  return {
    init: init
  }

})();


document.addEventListener('DOMContentLoaded', function () {
  main.init();
});