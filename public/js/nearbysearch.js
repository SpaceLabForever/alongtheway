function nearbySearch(a,b){service=new google.maps.places.PlacesService(map);var c=new google.maps.LatLng(a.d,a.e);b.location=c,service.nearbySearch(b,function(a){nearbyHandler(a)})}function nearbyHandler(a){console.log(a);var b=_(a).pluck("name").map(function(a){return a});console.log(b)}var nearbyBtn=document.getElementById("nearby"),options={location:{},radius:"500",types:["store"]};nearbyBtn.addEventListener("click",function(){nearbySearch(clientLoc,options)},!1);