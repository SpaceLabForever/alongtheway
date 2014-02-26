var nearbyBtn = document.getElementById('nearby');
var resultsObj = {};

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

var Filter = function(data){
  function constructor(){};
  constructor.prototype.categoryFilter = function(){ return _(data).pluck('types') }
  return new constructor();
}


function nearbyHandler (data) {
  resultsObj = new Filter(data);
  var names = _(data).pluck('name').map(function (val) {
    return val;
  });
  for (var name in names) {
    console.log(names[name]);
  }
}


nearbyBtn.addEventListener('click', function (e) {
  nearbySearch(clientLoc, options);
  refreshView('results', 'asdf', false)
}, false);
