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

    verticalTree();
    horizontalTree();
    radialTree();

    function verticalTree() {

      const treeLayout = d3.layout.tree();
      treeLayout.size([_width, _height]).children(function(d) { return d.values; });

      // 선 생성기
      const linkGenerator = d3.svg.diagonal();

      const treeG = d3.select('#vDiv')
        .append('svg')
        .attr('id', 'vSvg')
        .attr('width', _originWidth)
        .attr('height', _originHeight)
        .append('g')
        .attr('class', 'treeG')
        .attr('transform', 'translate(' + _margin.left + ', ' + _margin.top + ')');

      treeG.selectAll('g.nodeG')
        .data(treeLayout(packableTweets))
        .enter()
        .append('g')
        .attr('class', 'nodeG')
        // 각 노드의 XY 좌표를 계산
        .attr('transform', function(d) { return 'translate(' + parseInt(d.x) + ', ' + parseInt(d.y) + ')'; });

      treeG.selectAll('g.nodeG')
        .append('circle')
        .attr('class', 'circle')
        .attr('r', 10)
        .style('fill', function(d) { return depthColorScale(d.depth); })
        .style('stroke', 'white')
        .style('stroke-width', '2px');

      treeG.selectAll('g.nodeG')
        .append('text')
        .attr('class', 'text')
        .text(function(d) { return d.id || d.key || d.content; });

      // 선을 그림
      treeG.selectAll('path')
        .data(treeLayout.links(treeLayout(packableTweets)))
        .enter()
        .insert('path', 'g')
        .attr('d', linkGenerator)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', '2px');

      // zoom 컴포넌트
      const treeZoom = d3.behavior.zoom();
      treeZoom.on('zoom', zoomed);
      d3.select('#vSvg').call(treeZoom);

      function zoomed() {
        // Zoom 컴포넌트의 translate 속성을 가져온다.
        const zoomTranslate = treeZoom.translate();
        d3.select(this).select('g.treeG')
          .attr('transform', 'translate(' + zoomTranslate[0] + ', ' + zoomTranslate[1] + ')');
      }

    }

    function horizontalTree() {

      const treeLayout = d3.layout.tree();
      treeLayout.size([_width, _height]).children(function(d) { return d.values; });

      // 선 생성기
      const linkGenerator = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; }); /// projection 으로 방향 변경

      const treeG = d3.select('#hDiv')
        .append('svg')
        .attr('id', 'hSvg')
        .attr('width', _originWidth)
        .attr('height', _originHeight)
        .append('g')
        .attr('class', 'treeG')
        .attr('transform', 'translate(' + _margin.left + ', ' + _margin.top + ')');

      treeG.selectAll('g.nodeG')
        .data(treeLayout(packableTweets))
        .enter()
        .append('g')
        .attr('class', 'nodeG')
        // 각 노드의 XY 좌표를 계산
        .attr('transform', function(d) { return 'translate(' + parseInt(d.y) + ', ' + parseInt(d.x) + ')'; });

      treeG.selectAll('g.nodeG')
        .append('circle')
        .attr('class', 'circle')
        .attr('r', 10)
        .style('fill', function(d) { return depthColorScale(d.depth); })
        .style('stroke', 'white')
        .style('stroke-width', '2px');

      treeG.selectAll('g.nodeG')
        .append('text')
        .attr('class', 'text')
        .text(function(d) { return d.id || d.key || d.content; });

      // 선을 그림
      treeG.selectAll('path')
        .data(treeLayout.links(treeLayout(packableTweets)))
        .enter()
        .insert('path', 'g')
        .attr('d', linkGenerator)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', '2px');

      // zoom 컴포넌트
      const treeZoom = d3.behavior.zoom();
      treeZoom.on('zoom', zoomed);
      d3.select('#hSvg').call(treeZoom);

      function zoomed() {
        // Zoom 컴포넌트의 translate 속성을 가져온다.
        const zoomTranslate = treeZoom.translate();
        d3.select(this).select('g.treeG')
          .attr('transform', 'translate(' + zoomTranslate[0] + ', ' + zoomTranslate[1] + ')');
      }

    }

    function radialTree() {

      const treeLayout = d3.layout.tree();
      treeLayout.size([200, 200]).children(function(d) { return d.values; });

      // 선 생성기
      const linkGenerator = d3.svg.diagonal.radial().projection(function(d) { return [d.y, d.x / 180 * Math.PI]; }); /// projection 으로 방향 변경

      const treeG = d3.select('#rDiv')
        .append('svg')
        .attr('id', 'rSvg')
        .attr('width', _originWidth)
        .attr('height', _originHeight)
        .append('g')
        .attr('class', 'treeG')
        .attr('transform', 'translate(' + _margin.left + ', ' + _margin.top + ')');

      treeG.selectAll('g.nodeG')
        .data(treeLayout(packableTweets))
        .enter()
        .append('g')
        .attr('class', 'nodeG')
        // 각 노드의 XY 좌표를 계산
        .attr('transform', function (d) {
          return 'rotate(' + (d.x - 90) + ')translate(' + d.y + ')';
        });

      treeG.selectAll('g.nodeG')
        .append('circle')
        .attr('class', 'circle')
        .attr('r', 10)
        .style('fill', function(d) { return depthColorScale(d.depth); })
        .style('stroke', 'white')
        .style('stroke-width', '2px');

      treeG.selectAll('g.nodeG')
        .append('text')
        .attr('class', 'text')
        .text(function(d) { return d.id || d.key || d.content; });

      // 선을 그림
      treeG.selectAll('path')
        .data(treeLayout.links(treeLayout(packableTweets)))
        .enter()
        .insert('path', 'g')
        .attr('d', linkGenerator)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', '2px');

      // zoom 컴포넌트
      const treeZoom = d3.behavior.zoom();
      treeZoom.on('zoom', zoomed);
      d3.select('#rSvg').call(treeZoom);

      function zoomed() {
        // Zoom 컴포넌트의 translate 속성을 가져온다.
        const zoomTranslate = treeZoom.translate();
        d3.select(this).select('g.treeG')
          .attr('transform', 'translate(' + zoomTranslate[0] + ', ' + zoomTranslate[1] + ')');
      }

    }

  }

  return {
    init: init
  }

})();


document.addEventListener('DOMContentLoaded', function () {
  main.init();
});