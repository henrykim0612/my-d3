const main = (function () {

  let _data;
  let _pieG;

  function init() {
    d3.json('/resources/sample-data/tweets.json', function(err, data) { render(data.tweets); });
  }

  function render(tweets) {

    modifyData(tweets);

    // 메인 그룹
    _pieG = d3.select('svg')
      .append('g')
      .attr('class', 'pieG')
      .attr('transform', 'translate(480, 250)');

    // 아크, 레이블, 라인 생성
    _pieG.append('g').attr('class', 'sliceG');
    _pieG.append('g').attr('class', 'labelG');
    _pieG.append('g').attr('class', 'polylineG');

    change();

  }

  function modifyData(tweets) {
    const nestedTweets = d3.nest().key(function(el) { return el.user; }).entries(tweets);
    nestedTweets.forEach(function(el) {
      el.numTweets = el.values.length;
      el.numFavorites = d3.sum(el.values, function(d) {return d.favorites.length;});
      el.numRetweets = d3.sum(el.values, function(d) {return d.retweets.length;});
    });
    console.log(nestedTweets);
    _data = nestedTweets;
  }

  function change(key) {

    const changingKey = !!key ? key : 'numTweets';

    const pieChart = d3.layout.pie().sort(null).value(function(d) {return d[changingKey];});
    const extent = d3.extent(_data, function(d) {return d[changingKey];});
    const colorScale = d3.scale.category10(extent);
    const radius = 500 / 2;
    const arc = d3.svg.arc().outerRadius(radius * 0.8).innerRadius(radius * 0.4);
    const outerArc = d3.svg.arc().outerRadius(radius * 0.9).innerRadius(radius * 0.9);
    const dataKey = function(d) { return d.data.key; };

    // Slices
    const slice = _pieG.select('g.sliceG')
      .selectAll('path.slice')
      .data(pieChart(_data), dataKey);

    slice
      .enter()
      .append('path')
      .attr('class', 'slice')
      .style('fill', function(d, i) { return colorScale(i); });

    slice
      .transition()
      .duration(1000)
      .attrTween("d", function(d) {
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        };
      })

    slice.exit().remove();

    // Labels
    const text = _pieG.select('g.labelG')
      .selectAll('text.label')
      .data(pieChart(_data.filter(function(d) {
        return d[changingKey] > 0; // 있는것만 화면에 보여지도록
      })), dataKey);

    text
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('dy', '.35em')
      .text(dataKey);

    text
      .transition()
      .duration(1000)
      .attrTween("transform", function(d) {
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          const d2 = interpolate(t);
          const pos = outerArc.centroid(d2);
          pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
          return "translate("+ pos +")";
        };
      })
      .styleTween("text-anchor", function(d){
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          const d2 = interpolate(t);
          return midAngle(d2) < Math.PI ? "start":"end";
        };
      });

    text.exit().remove();

    // PolyLines
    const polyline = _pieG.select('g.polylineG')
      .selectAll('polyline.polyline')
      .data(pieChart(_data.filter(function(d) {
        return d[changingKey] > 0;
      })), dataKey);

    polyline
      .enter()
      .append('polyline')
      .attr('class', 'polyline');

    polyline
      .transition()
      .duration(1000)
      .attrTween("points", function(d){
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          const d2 = interpolate(t);
          const pos = outerArc.centroid(d2);
          pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
          return [arc.centroid(d2), outerArc.centroid(d2), pos];
        };
      });

    polyline.exit().remove();


    function midAngle(d){ // 내부 함수로 존재해야 함
      return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

  }

  return {
    init: init,
    change: change
  }

})();


document.addEventListener('DOMContentLoaded', function () {
  main.init();
});