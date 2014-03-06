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
    nearbyDirectionsSearch(getPOIs(result));
    marker.setVisible(false);
  });
}

/* Pick out random points along the route and perform
nearby searches on them, putting the results in the drawer */

function getPOIs (route) {
  var points = route.routes[0].overview_path,
      numPOIs = points.length / 4,
      POIs = [],
      results = [];
  //console.log(points);
  for (var i = 0; i <= numPOIs; i++) {
    POIs.push(points[Math.floor(Math.random()*points.length)]);
  }
  POIs = _.map(POIs, function (poi) { return getLatLng(poi); });
  //console.log(POIs);
  return POIs;
}

/* Run a radius search and return a list of place objects
when the client location is received */

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
    //console.log(results);
    //nearbyHandler(results);
    refreshView('results', renderListView(results), false);
  });
}

/* Make multiple nearby searches on an array of points 
and return a data object with the results */

function nearbyDirectionsSearch (points) {
  var options = {
    location: {},
    radius: '500',
    types: []
  };
  var nearbyResults = [];
  var service = new google.maps.places.PlacesService(map);
  for (var i = points.length - 1; i >= 0; i--) {
    console.log(points[i].d);
    console.log(points[i].e);
    options.location = getLatLng(points[i]);
    service.nearbySearch(options, function (results, status) {
      console.log('Processing results...');
      for (var j = results.length - 1; j >= 0; j--) {
        var id = results[j].id;
        var dupe = false;
        for (var n = nearbyResults.length - 1; n >= 0; n--) {
          if (nearbyResults[n]) {
            if (nearbyResults[n].id === id) {
              dupe = true;
            }
          }
        };
        if (!dupe) {
          nearbyResults.push(results[j]);
        }
      };
      //nearbyResults = _.union(nearbyResults, results);
      console.log(nearbyResults);
      refreshView('results', renderListView(nearbyResults), false);
    });
  };
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
