'use strict';
/******  Setting the useCapture to false and stopping the
propagaiton of the event bubbling on the #map-canvas to ensure touch
events on the map will not interfere with the app interface drawers and vice versa.  ******/

var map = document.getElementById('map-canvas');
map.addEventListener('mousemove', function(event){
  event.stopPropagation();
},  false  );

/*******
 Enable Snap.js Menu for left and right drawers.  ******/
var snapper = new Snap({
  element: document.getElementById('content'),
  addBodyClasses: true,
  hyperextensible: false
});

snapper.on('start', function(){
  if (!$('body').hasClass('snapjs-left')) {
    $('nav.push-menu').addClass('out');
  } else if ($('body').hasClass('snapjs-left')) {
    $('nav.push-menu').removeClass('out');
  }
});

document.getElementById('open-left').addEventListener('click', function(){
  if( snapper.state().state == 'left' ){
    snapper.close();
  } else {
    snapper.open('left');
  }
});

var renderListView = function (data) {
  var resultsObj = new Filter(data);
  console.log(resultsObj.getAllObjects());
  var catList = resultsObj.displayAllCategories();
  var _T_list =  '';
  for (var i in catList) {
    var listResults = resultsObj.getByCategory(catList[i]);
    var spaceIt = catList[i].split('_').join(' ');
    _T_list += '<li class="top-level ' + catList[i] + '"><input type="radio" name="filterList" id="' + catList[i] + '" />
                <label class="button" for="' + catList[i] + '" data-counter="' + listResults.length + '">' + spaceIt + '</label>';
    _T_list += '<div class="filter-level"><ul data-category="' + catList[i] + '" class="sub-menu">';
    _.each(listResults, function(val){
      var prettyName = val['name'].replace(/\s+/g,"");
      _T_list += '<li><input class="switch" data-category="' + catList[i] + '" type="checkbox" id="' + catList[i] + '-' +  prettyName + '" value="' + prettyName + '" />' + '<label class="marquee" for="' + catList[i] + '-' + prettyName + '">' +
                 val['name'] + '</label><button data-ref="' + val['reference'] + '" class="more-info" type="button">i</button></li>';
    });
    _T_list += '</ul></div></li>';
  }
  return _T_list;
};

var renderDetailView = function (place) {
  var testObj = place;
  var _T_detail = '';
}

var renderDetailView = function(place){
  console.log(place);
  var testObj = place;
  var _T_detail = '';
  _T_detail += '<div class="detail"><div class="col1"><span class="name">' + place.name + '</span></div>';
  _T_detail += ( typeof place.rating != 'undefined' ? '<div class="rating">' + '<div class="rating-bar" style="width: '+100*place.rating/5+'%">'+place.rating+'</div></div>': '');
  _T_detail += '<div class="col1"><span class="address">' + place.adr_address + '</span></div>';
  _T_detail += '<div class="col1 reviews">';

  if( typeof place.reviews != 'undefined' ){
    for(var i=0; i<place.reviews.length; i++){
      _T_detail += '<div class="review"><span class="rating-label">Rating: ' + place.reviews[i]['rating'] + '</span><p>' + place.reviews[i]['text'] + '</p>' + '<span class="reviewer">Reviewed by: ' + place.reviews[i]['author_name'] + '</span></div>';
    }
  }

  _T_detail += '</div>'

  return _T_detail;
}

function refreshView(id, viewOutput, stringify){
  stringify ? (_spID(id).innerHTML = JSON.stringify(viewOutput)) : (_spID(id).innerHTML = viewOutput);
  _invokeListListeners();
}
