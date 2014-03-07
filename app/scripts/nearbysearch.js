'use strict';

var nearbyBtn = document.getElementById('nearby');
var resultsObj = {};
var placeResult = {};

function Filter (data) {
  function Constructor() { }
  Constructor.prototype.getAllObjects = function () {
    return data;
  };
  Constructor.prototype.getObject = function (i) {
    return data[i];
  };
  Constructor.prototype.displayAllCategories = function () {
    return _.chain(_(data).pluck('types')).flatten().uniq().value();
  };
  Constructor.prototype.getObjectCategories = function (i) {
    return data[i].types;
  };
  Constructor.prototype.getByCategory = function (category) {
    var outputArr = [];
    for (var i in data){
      if (_.contains(data[i].types, category)) {
        outputArr.push(data[i]);
      }
    }
    return outputArr;
  };
  return new Constructor();
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

function _invokeListListeners(){
  $('.more-info').click(function(){
    var ref = $(this).attr('data-ref');
    detailHandler(ref);
    snapper.close();
    $('#detail').removeClass('hidden');
  });

  $('.close').click(function(){
    $('#detail').addClass('hidden');
  });

  /****** Probably a better solution -DAP-  ******/
  $('.top-level input:radio').change(function() {
    $('.top-level > label').addClass('fadeOut');
    $('.back-button').removeClass('hidden');
  });

  $('.back-button').click(function(){
    console.log('back button clicked!');
    $('.top-level > input:radio').prop('checked', false);
    $('.top-level > label').removeClass('fadeOut');
    $(this).addClass('hidden');
    //need to add something to recalculate count based on how many listitems after populating the queue
    //refreshList();
  });

  $('.switch:checkbox').click(function() {
    var category = '[data-category=' + $(this).data('category') + ']';
    if($(this).is(':checked')){
      console.log('checked');
      console.log($(this).data('category'));
      $(this).closest('li').appendTo('#queued');
    } else if (!$(this).is(':checked')) {
              console.log($(this).data('category'));

      console.log('not checked');
      $(this).closest('li').appendTo('.sub-menu' + category);
    }

  });
}

$('#nearby').click(function(){
  nearbySearch(clientLoc);
});
