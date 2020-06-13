const main = (function() {

  let _scatterData;
  let _layerId;
  let _xExtent;
  let _yExtent;
  let _xMax;
  let _yMax;
  let _xScale;
  let _yScale;
  let _xAxi;
  let _yAxis;
  
  
  function init() {
    setDefaultVariables();
    render();
  }
  
  function setDefaultVariables() {
    
    _scatterData = [
      {friends: 5, salary: 22000},
      {friends: 3, salary: 18000},
      {friends: 10, salary: 88000},
      {friends: 0, salary: 180000},
      {friends: 27, salary: 56000},
      {friends: 8, salary: 74000},
    ];
    
    _layerId = '#layer';
    
//    _xExtent = d3.extent(_scatterData, function(d) { return d.salary; });
//    _yExtent = d3.extent(_scatterData, function(d) { return d.friends; });
    
    _xMax = d3.max(_scatterData, function(d) { return d.salary; });
    _yMax = d3.max(_scatterData, function(d) { return d.friends; });
    
    _xScale = d3.scale.linear().domain([0, _xMax]).range([0, 500]);
    _yScale = d3.scale.linear().domain([0, _yMax]).range([0, 500]);
    
    _xAxis = d3.svg.axis().scale(_xScale).orient('bottom').tickSize(500).ticks(4);
    _yAxis = d3.svg.axis().scale(_yScale).orient('right').tickSize(500).ticks(16);
    
  };
  
  function render() {
        
    createAxies();
    
    d3.select(_layerId)
      .select('svg')
      .selectAll('circle')
      .data(_scatterData)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', function(d, i) { return _xScale(d.salary); })
      .attr('cy', function(d) { return _yScale(d.friends); });
    
  }
  
  
  function createAxies() {

    d3.select(_layerId)
      .select('svg')
      .append('g')
      .attr('id', 'xAxisG')
      .call(_xAxis);
    // 위의 코드는 xAxis(d3.select('_layerId').select('svg').append('g').attr('id', 'xAxisG'); 과 동일함.
    
    
    d3.select(_layerId)
      .select('svg')
      .append('g')
      .attr('id', 'yAxisG')
      .call(_yAxis);
   
    
    // X 축을 아래로 위치 변경
//    d3.selectAll('#xAxisG').attr('transform', 'translate(0, 500)');
//    d3.selectAll('#yAxisG').attr('transform', 'translate(500, 0)');
    
    
  }
  
    
  
  // ______________RETURN
  return {
    init: init
  }
  
})();


document.addEventListener('DOMContentLoaded', function() {
  main.init();
});