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
    d3.csv('/resources/sample-data/worddata.csv', function(err, data) { render(data); });
  }

  function render(incData) {

    console.log(incData);
    const wordScale = d3.scale.linear().domain([0, 75]).range([10, 160]);
    const randomRotate = d3.scale.linear().domain([0, 1]).range([-20, 20]);
    const keywords = ['layout', 'zoom', 'circle', 'style', 'append', 'attr'];


    
    d3.layout.cloud()
      .size([_width, _height])
      .words(incData) // 데이터 전달
      // .rotate(function () { return randomRotate(Math.random()); })
      .rotate(function (d) { return d.text.length > 5 ? 0 : 90; }) // 5글자 이하의 단어를 90도 회전
      .fontSize(function(d) { return wordScale(d.frequency); }) // 단어의 크기 설정
      .on('end', end)
      .start();
    
    // 초기화 완료되면 이 함수가 처리된 데이터셋을 전달받는다.
    function end(words) {
      const wordG = d3.select('#svgDiv')
        .append('svg')
        .attr('width', _originWidth)
        .attr('height', _originHeight)
        .append('g')
        .attr('id', 'wordG')
        .attr('transform', 'translate(' + (_width / 2) + ', ' + (_height / 2) + ')')
     
     wordG.selectAll('text') 
       .data(words)
       .enter()
       .append('text')
       .style('font-size', function(d) { return d.size + 'px'; })
       .style('fill', function(d) {
         return keywords.indexOf(d.text) > -1 ? 'red' : 'black'; // 키워드 목록에 있는것은 빨간색
       })
       .style('opacity', '.75')
       .style('text-anchor', 'middle')
       .attr('transform', function(d) {
         return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
       })
       .text(function (d) { return d.text; });
    }
  }
  return {
    init: init
  }

})();


document.addEventListener('DOMContentLoaded', function () {
  main.init();
});