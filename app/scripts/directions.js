$('#dirs').click(function () {
  var dest = $('#dest').val();
  if (!dest) {
    alert('Please enter a destination');
  } else {
    getDirections(clientLoc, dest);
  }
});

function getDirections (origin, dest) {
  var client = new google.maps.LatLng(clientLoc.d,clientLoc.e);
  var service = new google.maps.DirectionsService();
  var options = {
    origin: client,
    destination: dest,
    travelMode: 'WALKING'
  };

  service.route(options, function (result, status) {
    var render = new google.maps.DirectionsRenderer();
    render.setMap(map);
    render.setDirections(result);
    console.log(result);
    getPOIs(result);
  });
}

function getPOIs (route) {
  var points = route.routes[0].overview_path;
  console.log(points);
}
