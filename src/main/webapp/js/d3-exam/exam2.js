const main = (function() {

  const _defaultOptions = {
    svgId: '#layer',
    controllerId: '#controller',
    circleColor: 'orange'
  }

  function init() {
    loadWorldcupData();
  }

  function loadWorldcupData() {
    d3.csv('/resources/sample-data/worldcup.csv', function(data) { render(data); })
  }

  function render(csvData) {

    console.log(csvData);

    d3.select(_defaultOptions.svgId)
      .append('g')
      .attr('id', 'teamG')
      .attr('transform', 'translate(50, 150)')
      .selectAll('g')
      .data(csvData)
      .enter()
      .append('g')
      .attr('class', 'overallG')
      .attr('transform', function(d, i) {
        return 'translate(' + (i * 80) + ', 0)';
      });

    const teamG = d3.selectAll('g.overallG');
    createCircle(teamG);
    createText(teamG);
    createNationImages();
    createControlPanel(teamG, csvData);
    createMouseEvents(teamG);
    createModal()

  }

  function createCircle(teamG) {
    teamG.append('circle')
      .attr('r', 0)
      .transition()
      .delay(function(d, i) { return i * 200 })
      .duration(500)
      .attr('r', 70)
      .transition()
      .duration(500)
      .attr('r', 20);
  }

  function createText(teamG) {
    teamG.append('text')
      .style('text-anchor', 'middle')
      .attr('y', 50)
      .text(function(d) { return d.team; });
  }

  function createNationImages() {
    d3.select(_defaultOptions.svgId)
      .selectAll('g.overallG')
      .insert('image', 'text')
      .attr('xlink:href', function(d) {
        return '/resources/images/' + d.team + '.png';
      })
      .attr('width', '45px')
      .attr('height', '20px')
      .attr('x', '-22') // 중앙 으로 위치
      .attr('y', '-10');
  }

  function createControlPanel(teamG, csvData) {

    const dataKeys = d3.keys(csvData[0]).filter(function(d) {
      return d !== 'team' && d !== 'region';
    });

    d3.select(_defaultOptions.controllerId)
      .selectAll('button.teams')
      .data(dataKeys)
      .enter()
      .append('button')
      .on('click', clickEvent)
      .html(function(d) { return d; });

    function clickEvent(key) {
      const maxValue = d3.max(csvData, function(d) { return parseFloat(d[key]); });
      // quantize 스케일은 수치형 데이터를 최대 3개의 범주로 분류한다.
      const colorQuantize = d3.scale.quantize().domain([0, maxValue]).range(colorbrewer.Reds[3]);
      const radiusScale = d3.scale.linear().domain([0, maxValue]).range([5, 20]);

      teamG.select('circle')
        .transition()
        .duration(500)
        .style('fill', function(d) { return colorQuantize(d[key]); })
        .attr('r', function(d) { return radiusScale(d[key]); });
    }

  }

  function createMouseEvents(teamG) {

    teamG.on('mouseover', highlightRegion);
    teamG.on('mouseout', unHighlightRegion);
    teamG.on('click', clickTeamG)


    function highlightRegion(d, i) {

      const highlightColor = d3.rgb(_defaultOptions.circleColor);

      d3.select(this)
        .select('text')
        .attr('y', -50)
        .classed('active', true);

      d3.select(_defaultOptions.svgId)
        .selectAll('circle')
        .style('fill', function(p) {
          return d.region === p.region ? highlightColor.darker(.75) : highlightColor.brighter(.25);
        });

      // Text 가 뒤로 숨는 문제 해결
      this.parentElement.appendChild(this);
    }

    function unHighlightRegion(d, i) {

      d3.select(this)
        .select('text')
        .attr('y', 50)
        .classed('active', false);

      d3.select(_defaultOptions.svgId)
        .selectAll('circle')
        .style('fill', _defaultOptions.circleColor);
    }

    function clickTeamG(d) {
      console.log(d);
      d3.select('#modal')
        .selectAll('td.data')
        .data(d3.values(d))
        .html(function(d) { return d; });
    }

  }

  function createModal() {
    d3.text('/resources/html/modal.html', function(d) {
      d3.select('body')
        .append('div')
        .attr('id', 'modal')
        .html(d);
    });
  }

  // _________________________________________ RETURN
  return {
    init: init
  }
})();


document.addEventListener('DOMContentLoaded', function() {
  main.init();
});