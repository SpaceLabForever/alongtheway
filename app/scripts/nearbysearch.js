'use strict';

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
}

function detailHandler(ref){
  var request = {
    reference: ref
  };

  var service = new google.maps.places.PlacesService(map);
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
    console.log(_.uniq(names[name]));
  }

  refreshView('results', renderListView(), false);
}

function _invokeListListeners(){
  $('.more-info').click(function(){
    var ref = $(this).attr('data-ref');
    detailHandler(ref);
  });

  /****** Probably a better solution -DAP-  ******/
  $('.top-level input:radio').change(function() {
    $('.top-level > label').addClass('fadeOut');
    $('.back-button').removeClass('hidden');
  });

  $('.back-button').click(function(){
    $('.top-level > input:radio').prop('checked', false);
    $('.top-level > label').removeClass('fadeOut');
    $(this).addClass('hidden');
    //need to add something to recalculate count based on how many listitems after populating the queue
    //refreshList();
  });


  var moveLi = function(el) {

    if(!el){
      $('.switch:checkbox').change(function() {
        var category = $('[data-category=' + $(this).data('category') + ']');
        $(this).parent().appendTo('#queued');
        moveLi($(this));
        return false;
      });
    } else {
    $(el).unbind('change').change(function() {
      var category = $('[data-category=' + $(this).data('category') + ']');
      var moveTo = ('.sub-menu' + category);
      $(this).parent().appendTo(moveTo);
       moveLi($(this));
      return false;
      });
    }
  };
  moveLi(null);
  /*
  $('.sub-menu .switch').click(function() {
    console.log($(this));
    $(this).closest('li').appendTo('#queued');
  });

  $('#queued .switch').click(function() {
    console.log($(this).data('category'));
    var moveTo = $;
    $(this).closest('li').appendTo(moveTo);
  });*/
}
$('#nearby').click(function(){
  nearbySearch(clientLoc);
});
