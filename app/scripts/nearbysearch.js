var nearbyBtn = document.getElementById('nearby');
var resultsObj = {};


var Filter = function(data){

  function constructor(){};

  constructor.prototype.getAllObjects = function(){
    return data;
  }

  constructor.prototype.getObject = function(i){
    return data[i];
  }

  constructor.prototype.displayAllCategories = function(){
    return _.chain(_(data).pluck('types')).flatten().uniq().value();
  }

  constructor.prototype.getCategories = function(i){
    return data[i]['types'];
  }

  constructor.prototype.getByCategory = function(){

  }

  return new constructor();
}

//var resCatList = resultsObj.categoryFilter();


var options = {
  location: {},
  radius: '500',
  types: []
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
  console.log(data);
  var names = _(data).pluck('name').map(function (val) {
    return val;
  });
  for (var name in names) {
    console.log(names[name]);
  }
  refreshView('results', resultsObj.displayAllCategories(), false)
}

nearbyBtn.addEventListener('click', function (e) {
  nearbySearch(clientLoc, options);
}, false);

