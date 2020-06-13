const main = (function() {
  
  let _xScale;
  let _yScale;
  let _xAxis;
  let _yAxis;
  
  function init() {
    d3.csv('/resources/sample-data/boxplot.csv', render)
  }
  
 
  // 일주일 내내 방문자 변동 차트
  function render(data) {
        
    _xScale = d3.scale.linear().domain([1, 8]).range([20, 470]);
    // 일주일 내내 방문자의 변동이 그리 많지 않으므로, 나이의 중앙값을 산포도로 그려 차트를 만듬. Y축을 뒤집음 이게 더 타당하다 함..
    _yScale = d3.scale.linear().domain([0, 100]).range([480, 20]);

    
    _xAxis = d3.svg.axis().scale(_xScale).orient('bottom').tickSize(-470).tickValues([1, 2, 3, 4, 5, 6, 7]); // 숫자로 표현된 요일에 대응하도록 눈금값을 구체적으로 지정함.
    d3.select('svg')
      .append('g')
      .attr('transform', 'translate(0, 470)')
      .attr('id', 'xAxisG')
      .call(_xAxis);
//    // 사용자 주의를 혼란스럽게 하므로 가장자리 눈금은 감춘다.
//    d3.select('#AxisG > path.domain')
//      .style('display', 'none');
      
    
    _yAxis = d3.svg.axis().scale(_yScale).orient('right').tickSize(-470).ticks(8);
    d3.select('svg')
      .append('g')
      .attr('transform', 'translate(470, 0)')
      .attr('id', 'yAxisG')
      .call(_yAxis);
    
    
    d3.select('svg')
      .selectAll('circle.median')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'tweets')
      .attr('r', 5)
      .attr('cx', function(d) { return _xScale(d.day); })
      .attr('cy', function(d) { return _yScale(d.median); })
      .style('fill', 'darkgray');
    
    // 박스플롯 생성
    d3.select('svg')
      .selectAll('g.box')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'box')
      .attr('transform', function(d) {
        return 'translate(' + _xScale(d.day) + ', ' + _yScale(d.median) + ')';
      })
      .each(function(d, i) { // g 태그 안에 자식태그들 생성
        
        d3.select(this)
        .append('rect')
        .attr('width', 20)
        .attr('x', -10)
        // 사각형 높이는 q1 - q3 이므로 세로 위치를 중앙값과 높은 값(q3)의 차이만큼 위로 올린다.
        .attr('y', _yScale(d.q3) - _yScale(d.median))
        .attr('height', _yScale(d.q1) - _yScale(d.q3))
        .style('fill', 'white')
        .style('stroke', 'black');
        
        // 최솟값에서 최댓값으로 선을 그림
        d3.select(this)
          .append('line')
          .attr('class', 'range')
          .attr('x1', 0)
          .attr('x2', 0)
          .attr('y1', _yScale(d.max) - _yScale(d.median))
          .attr('y2', _yScale(d.min) - _yScale(d.median))
          .style('stroke', 'black')
          .style('stroke-width', '4px');
        
        // 최소-최대선의 꼭대기에 가로로 놓인 선
        d3.select(this)
          .append('line')
          .attr('class', 'max')
          .attr('x1', -10)
          .attr('x2', 10)
          .attr('y1', _yScale(d.max) - _yScale(d.median))
          .attr('y2', _yScale(d.max) - _yScale(d.median))
          .style('stroke', 'black')
          .style('stroke-width', '4px');
        
        // 최소-최대선의 바닥에 가로로 놓은 선
        d3.select(this)
          .append('line')
          .attr('class', 'min')
          .attr('x1', -10)
          .attr('x2', 10)
          .attr('y1', _yScale(d.min) - _yScale(d.median))
          .attr('y2', _yScale(d.min) - _yScale(d.median))
          .style('stroke', 'black')
          .style('stroke-width', '4px');
        
        // 사각형의 중심이 중앙값에 놓이도록 위치 조정
        d3.select(this)
          .append('rect')
          .attr('class', 'range')
          .attr('width', 20)
          .attr('x', -10)
          .attr('y', _yScale(d.q1) - _yScale(d.q3))
          .style('fill', 'white')
          .style('stroke', 'black')
          .style('stroke-width', '2px');
        
        // 부모 요소인 <g> 요소의 중심이 중앙값에 놓여 있으므로, 중앙값 선은 이동할 필요가 없다
        d3.select(this)
          .append('line')
          .attr('x1', -10)
          .attr('x2', 10)
          .attr('y1', 0)
          .attr('y2', 0)
          .style('stroke', 'darkgray')
          .style('stroke-width', '4px');
        
        
        
      });
        
    
  }
  
    
  // ______________RETURN
  return {
    init: init
  }
  
})();


document.addEventListener('DOMContentLoaded', function() {
  main.init();
});