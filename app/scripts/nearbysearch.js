var nearbyBtn = document.getElementById('nearby');
var resultsObj = {};

var Filter = function(data){
  function constructor(){};
  constructor.prototype.categoryFilter = function(){ return _(data).pluck('types') }
  return new constructor();
}


var options = {
  location: {},
  radius: '500',
  types: ['restaurant']
};

function nearbySearch (clientLoc, options) {
  service = new google.maps.places.PlacesService(map);
  var client = new google.maps.LatLng(clientLoc.d,clientLoc.e);
  options.location = client;
  service.nearbySearch(options, function (results, status) {
    nearbyHandler(results);
  });
}

function nearbyHandler (data) {
  resultsObj = new Filter(data);
  var names = _(data).pluck('name').map(function (val) {
    return val;
  });
  for (var name in names) {
    console.log(names[name]);
  }
  refreshView('results', resultsObj.categoryFilter(), false)
}


nearbyBtn.addEventListener('click', function (e) {
  nearbySearch(clientLoc, options);
}, false);
