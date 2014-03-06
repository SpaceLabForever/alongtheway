/* When 'GO' is clicked, get route from the client's
current location to the destination entered */

$('#dirs').click(function () {
  var dest = $('#dest').val();
  if (!dest) {
    alert('Please enter a destination');
  } else {
    getDirections(clientLoc, dest);
  }
});

/* Overlay a route on the map and call functions to
make nearby searches along that route */

function getDirections (origin, dest) {
  var client = getLatLng(clientLoc),
      service = new google.maps.DirectionsService(),
      options = {
        origin: client,
        destination: dest,
        travelMode: 'DRIVING'
      };
  service.route(options, function (result, status) {
    var render = new google.maps.DirectionsRenderer();
    render.setMap(map);
    render.setDirections(result);
    getPOIs(result);
    marker.setVisible(false);
  });
}

/* Pick out random points along the route and perform
nearby searches on them, putting the results in the drawer */

function getPOIs (route) {
  var points = route.routes[0].overview_path,
      numPOIs = points.length / 4,
      POIs = [];
  console.log(points);
  for (var i = 0; i <= numPOIs; i++) {
    POIs.push(points[Math.floor(Math.random()*points.length)]);
  }
  POIs = _.map(POIs, function (poi) { return getLatLng(poi); });
  console.log(POIs);
}

/* Run a radius search and return a list of place objects */

function nearbySearch (clientLoc, options) {
  var options = {
    location: {},
    radius: '500',
    types: []
  },
  service = new google.maps.places.PlacesService(map),
  client = getLatLng(clientLoc);
  options.location = client;
  service.nearbySearch(options, function (results, status) {
    console.log(results);
    nearbyHandler(results);
  });
}

/* Pluck out the names of a list of place objects and
and return a list of names

function nearbyHandler (data) {
  resultsObj = new Filter(data);
  refreshView('results', renderListView(), false);
  return _(data).pluck('name').map(function (val) { return val; });
}
*/
/* Utility function to transform places object into
LatLng object */

function getLatLng (place) {
  return new google.maps.LatLng(place.d,place.e);
}
