let csvData;

function createSoccerViz() {
  d3.csv('/resources/sample-data/worldcup.csv', function(data) {
    overallTeamVis(data);
  });
}

function overallTeamVis(incomingData) {

  csvData = incomingData;

  d3.select('svg')
    .append('g')
    .attr('id', 'teamsG')
    .attr('transform', 'translate(50, 300)')
    .selectAll('g')
    .data(incomingData)
    .enter()
    .append('g')
    .attr('class', 'overallG')
    .attr('transform', function(d, i) { return 'translate(' + (i * 50) + ', 0)' });

  // 매번 다시 입력할 필요없이 셀렉션을 변수에 할당
  const teamG = d3.selectAll('g.overallG');

  /*teamG
    .append('circle')
    .attr('r', 20)
    .style('fill', 'pink')
    .style('stroke', 'black')
    .style('stroke-width', '1px');*/

  teamG
    .append('circle')
    .attr('r', 0)
    .transition()
    .delay(function(d, i) { return i * 100; })
    .duration(500)
    .attr('r', 40)
    .transition()
    .duration(500)
    .attr('r', 20);

  teamG
    .append('text')
    .style('text-anchor', 'middle')
    .attr('y', 30)
    .text(function(d) { return d.team; });

  teamG.on('mouseover', highlightRegion);
  teamG.on('mouseout', unHighlight);

  // 컨트롤 패널 기능 추가
  const dataKeys = d3.keys(incomingData[0]).filter(function(el) {
    return el !== 'team' && el !== 'region';
  });

  d3.select('#controls')
    .selectAll('button.teams')
    .data(dataKeys)
    .enter()
    .append('button')
    .on('click', buttonClick)
    .html(function(d) { return d; });

  // 이미지 추가
  d3.selectAll('g.overallG')
    .insert('image', 'text')
    .attr('xlink:href', function(d) {
      return '/resources/images/' + d.team + '.png';
    })
    .attr('width', '45px')
    .attr('height', '20px')
    .attr('x', '-22') // width / 2 -> 중앙값 위치
    .attr('y', '-10'); // height / 2 -> 중앙값 위치

  // 모달
  d3.text('/resources/html/modal.html', function(data) {
    d3.select('body').append('div').attr('id', 'modal').html(data);
  });

  teamG.on('click', teamClick);
  function teamClick(d) {
    console.log(d);
    d3.selectAll('td.data')
      .data(d3.values(d))
      .html(function(p) {
        return p;
      });
  }

  // empty() 활용
  d3.html('/resources/svg/icon.svg', loadSVG);
  /*function loadSVG(svgData) {
    while( !d3.select(svgData).selectAll('path').empty() ) {
      d3.select('svg').node().appendChild( d3.select(svgData).select('path').node() );
    }
    d3.selectAll('path').attr('transform', 'translate(50, 50)');
  }*/
  // 더 향상된 코드
  /*function loadSVG(svgData) {
    d3.select(svgData).selectAll('path').each(function() {
      d3.select('svg').node().appendChild(this);
    });
    d3.selectAll('path').attr('transform', 'translate(50, 50)');
  }*/
  // 축구 공으로 변경
  function loadSVG(svgData) {
    d3.selectAll('g').each(function() {
      const g = this;
      d3.select(svgData).selectAll('path').each(function() {
        g.appendChild(this.cloneNode(true));
      });
    });
    d3.selectAll('g.overallG').each(function(d) {
      d3.select(this).selectAll('path').datum(d);
    });
    const tenColorScale = d3.scale.category10(['UEFA', 'CONMEBOL', 'CAF', 'AFC']);
    d3.selectAll('path')
      .style('fill', function(p) {
        return tenColorScale(!!p ? p.region : 'UEFA');
      })
      .style('stroke', 'black')
      .style('stroke-width', '2px');
  }


  // function buttonClick(dataPoint) {
  //
  //   const maxValue = d3.max(incomingData, function(d) {
  //     return parseFloat(d[dataPoint]);
  //   });
  //
  //   const ybRamp = d3.scale.linear().interpolate(d3.interpolateHcl).domain([0, maxValue]).range(['yellow', 'blue']);
  //   const tenColorScale = d3.scale.category10(['UEFA', 'CONMEBOL', 'CAF', 'AFC']);
  //   const radiusScale = d3.scale.linear().domain([0, maxValue]).range([2, 20]);
  //
  //
  //   d3.selectAll('g.overallG')
  //     .select('circle')
  //     .transition() // 부드럽게
  //     .duration(1000)
  //     .style('fill', function(p) {
  //       return tenColorScale(p.region);
  //     })
  //     .attr('r', function(d) {
  //       return radiusScale(d[dataPoint]);
  //     });
  //
  // }

  function buttonClick(dataPoint) {

    const maxValue = d3.max(incomingData, function(el) {
      return parseFloat(el[dataPoint]);
    });

    // quantize 스케일은 수치형 데이터를 최대 3개의 범주로 분류한다.
    const colorQuantize = d3.scale.quantize().domain([0, maxValue]).range(colorbrewer.Reds[3]);
    const radiusScale = d3.scale.linear().domain([0, maxValue]).range([2, 20]);

    d3.selectAll('g.overallG')
      .select('circle')
      .transition()
      .duration(1000)
      .style('fill', function(p) {
        return colorQuantize(p[dataPoint]);
      })
      .attr('r', function(d) {
        return radiusScale(d[dataPoint])
      });

  }



  // function highlightRegion(d) {
  //   d3.selectAll('g.overallG')
  //     .select('circle')
  //     .style('fill', function(p) {
  //       return p.region === d.region ? 'red' : 'gray';
  //     });
  // }

  // function highlightRegion(d, i) {
  //   d3.select(this)
  //     .select('text')
  //     .classed('active', true)
  //     .attr('y', 10);
  //
  //   d3.selectAll('g.overallG')
  //     .select('circle')
  //     .each(function(p, i) {
  //       p.region === d.region
  //         ? d3.select(this).classed('active', true)
  //         : d3.select(this).classed('inactive', true);
  //     });
  //   this.parentElement.appendChild(this);
  // }

  function highlightRegion(d, i) {
    const teamColor = d3.rgb('pink');
    d3.select(this)
      .select('text')
      .classed('active', true)
      .attr('y', 10);

    d3.selectAll('g.overallG')
      .select('circle')
      .style('fill', function(p) {
        return d.region === p.region ? teamColor.darker(.75) : teamColor.brighter(.5);
      });
    // Text 가 뒤로 숨는 문제 해결
    this.parentElement.appendChild(this);
  }


  // function unHighlight() {
  //   d3.selectAll('g.overallG')
  //     .select('circle')
  //     .style('fill', 'pink');
  // }

  function unHighlight(d, i) {
    d3.selectAll('g.overallG').select('circle').attr('class', '');
    d3.selectAll('g.overallG').select('text').classed('active', false).attr('y', 30);
  }

}




document.addEventListener('DOMContentLoaded', function() {

});