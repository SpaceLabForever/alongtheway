function initialize(){var a={zoom:15};map=new google.maps.Map(document.getElementById("map-canvas"),a),navigator.geolocation?navigator.geolocation.getCurrentPosition(function(a){clientLoc=new google.maps.LatLng(a.coords.latitude,a.coords.longitude);new google.maps.InfoWindow({map:map,position:clientLoc,content:"You are here"});map.setCenter(clientLoc)},function(){handleNoGeolocation(!0)}):handleNoGeolocation(!1)}function handleNoGeolocation(a){var b;b=a?"Error: The Geolocation service failed.":"Error: Your browser doesn't support geolocation.";{var c={map:map,position:new google.maps.LatLng(60,105),content:b};new google.maps.InfoWindow(c)}map.setCenter(c.position)}var map,clientLoc,outputData;google.maps.event.addDomListener(window,"load",initialize),$(document).ready(function(){initialize()});