'use strict';

var map, marker, clientLoc, outputData;
// Try HTML5 geolocation
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    clientLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var infowindow = new google.maps.Marker({
      map: map,
      position: clientLoc
    });

    map.setCenter(clientLoc);
  }, function() {
    handleNoGeolocation(true);
  });
} else {
  // Browser doesn't support Geolocation
  handleNoGeolocation(false);
}

function initialize() {
  var mapOptions = {
    zoom: 15
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: clientLoc
  });

  google.maps.event.addListener(marker, 'click', toggleBounce);

  google.maps.event.addListener(marker, 'click', function(event){

    console.log("marker clicked!");
  }, true);

  //event at the end of a marker drag
  google.maps.event.addListener(marker, "dragend", function(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
  });

}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);

window.load = function () {
    /****
  Initializing the nearbySearch with the map */
  console.log("map initialized");
  nearbySearch(clientLoc, options);
}
