function getDirections(a,b){var c=getLatLng(clientLoc),d=new google.maps.DirectionsService,e={origin:c,destination:b,travelMode:"DRIVING"};d.route(e,function(a){var b=new google.maps.DirectionsRenderer;b.setMap(map),b.setDirections(a),getPOIs(a),marker.setVisible(!1)})}function getPOIs(a){var b=a.routes[0].overview_path,c=b.length/4,d=[];console.log(b);for(var e=0;c>=e;e++)d.push(b[Math.floor(Math.random()*b.length)]);d=_.map(d,function(a){return getLatLng(a)}),console.log(d)}function nearbySearch(a,b){var b={location:{},radius:"500",types:[]},c=new google.maps.places.PlacesService(map),d=getLatLng(a);b.location=d,c.nearbySearch(b,function(a){console.log(a),nearbyHandler(a)})}function nearbyHandler(a){return resultsObj=new Filter(a),refreshView("results",renderListView(),!1),_(a).pluck("name").map(function(a){return a})}function getLatLng(a){return new google.maps.LatLng(a.d,a.e)}$("#dirs").click(function(){var a=$("#dest").val();a?getDirections(clientLoc,a):alert("Please enter a destination")});