var nearbyBtn = document.getElementById('nearby');
var resultsObj = {};
var placeResult = {};

function Filter (data) {
  function constructor() { }
  constructor.prototype.getAllObjects = function () {
    return data;
  };
  constructor.prototype.getObject = function (i) {
    return data[i];
  };
  constructor.prototype.displayAllCategories = function () {
    return _.chain(_(data).pluck('types')).flatten().uniq().value();
  };
  constructor.prototype.getObjectCategories = function (i) {
    return data[i]['types'];
  };
  constructor.prototype.getByCategory = function (category) {
    var outputArr = [];
    for (var i in data){
      if (_.contains(data[i]['types'], category)) {
        outputArr.push(data[i]);
      }
    }
    return outputArr;
  };
  return new constructor();
};

function detailHandler(ref){
  var request = {
    reference: ref
  };

  service = new google.maps.places.PlacesService(map);
  service.getDetails(request, callback);

  function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      refreshView('detail', renderDetailView(place), false);
    }
  }
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
  refreshView('results', renderListView(), false)
}



function _invokeListListeners(){
  $('.more-info').click(function(){
    var ref = $(this).attr('data-ref');
    detailHandler(ref);
  })
}


$('#nearby').click(function(){
  nearbySearch(clientLoc);
})




  /*******  Instantiate PushMenu to build out the left-drawer menu system. setTimeout() to ensure that the
  drawer items from views.js exist before building the menu out. Probably a better solution -DAP-  ******/



