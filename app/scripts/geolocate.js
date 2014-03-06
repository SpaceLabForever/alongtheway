  'use strict';


function _spID(id){
  var object = {};
  object = document.getElementById(id);
  return object;
}

function _spCL(class){
  var object = {};
  object = document.getElementsByClassName(class);
  return object;
}

var map, marker, clientLoc, outputData;
// Try HTML5 geolocation
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    clientLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

     var options = {
      location: {},
      radius: '500',
      types: []
    };
    nearbySearch(clientLoc, options);
    console.log("map loaded");

    marker = new google.maps.Marker({
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: clientLoc,
      visible: true
    });

    google.maps.event.addListener(marker, 'click', toggleBounce);

    google.maps.event.addListener(marker, 'click', function(event){
      console.log("marker clicked!");
    }, true);
    //event at the end of a marker drag
    google.maps.event.addListener(marker, "dragend", function(event) {
      clientLoc = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
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

}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function () {
  initialize();
  $('#dest').focus();
});

$('#dest').keyup(function (e) {
  if (e.keyCode === 13) {
    $('#dirs').click();
  }
});
