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

var renderListView = function(){
  var catList = resultsObj.displayAllCategories();
  var _T_list =  '';
  for(var i in catList){
    var listResults = resultsObj.getByCategory(catList[i]);
    var spaceIt = catList[i].split("_").join(" ");
    _T_list += '<li class="top-level ' + catList[i] + '"><input type="radio" name="filterList" id="' + catList[i] + '" />
                <label class="button" for="' + catList[i] + '" data-counter="' + listResults.length + '">' + spaceIt + '</label>';
    _T_list += '<div class="filter-level"><ul data-category="' + catList[i] + '" class="sub-menu">';
    _.each(listResults, function(val){
      var prettyName = val['name'].replace(/\s+/g,"");
      _T_list += '<li><input class="switch" data-category="' + catList[i] + '" type="checkbox" id="' + catList[i] + "-"
                  +  prettyName + '" value="' + prettyName + '" />' + '<label for="' + catList[i] + "-" + prettyName +'">'
                  + val['name'] + '</label><button data-ref="' + val['reference']
                  + '" class="more-info" type="button">i</button></li>';
    });
    _T_list += '</ul></div></li>';
  }
  return _T_list;
};

var testObj = {};

var renderDetailView = function(place){
  console.log(place);
  testObj = place;
  var _T_detail =
  'Name' + place.name +
  'Rating' + place.rating +
  'Address' + place.formatted_address;
  //return _T_detail;
}

function refreshView(id, viewOutput, stringify){
  stringify ? (_spID(id).innerHTML = JSON.stringify(viewOutput)) : (_spID(id).innerHTML = viewOutput);
  _invokeListListeners();
}
