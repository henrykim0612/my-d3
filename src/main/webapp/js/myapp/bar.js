const main = (function () {

  function init() {
    d3.json('/resources/sample-data/tweets.json', function(err, data) { render(data.tweets); });
  }

  function render(tweets) {

  }
  

  return {
    init: init,
    change: change
  }

})();


document.addEventListener('DOMContentLoaded', function () {
  main.init();
});