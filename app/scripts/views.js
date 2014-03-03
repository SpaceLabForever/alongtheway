'use strict';

function _spID(id){
  var object = {};
  object = document.getElementById(id);
  return object;
}

var renderView = function(){
  var catList = resultsObj.displayAllCategories();
  var _T_list =  '';
  for(var i in catList){
    var listResults = resultsObj.getByCategory(catList[i]);
    _T_list += '<li class="icon icon-arrow-left"><a href="#" data-counter="' + listResults.length + '">' + catList[i] + '</a><div class="mp-level">';
    _T_list += '<ul class="sub-menu">';
    _.each(listResults, function(val){
      _T_list += '<li><a href="#" style="color: #fff; font-size: 20rem;">' + val['name'] + '</a></li>';
    });
    _T_list += '</ul></div></li>';
  }
  return _T_list;
};

function refreshView(id, viewOutput, stringify){
  stringify ? (_spID(id).innerHTML = JSON.stringify(viewOutput)) : (_spID(id).innerHTML = viewOutput);
}

[{categoryName: [place1, place2, place3]}, {categoryName: [place1, place2, place3]}];

/******  Setting the useCapture to false and stopping the
propagaiton of the event bubbling on the #map-canvas to ensure touch
events on the map will not interfere with the app interface drawers and vice versa.  ******/

var map = document.getElementById('map-canvas');

map.addEventListener('mousemove', function(event){
  event.stopPropagation();
}, false );

/******  Enable Snap.js Menu for left and right drawers.  ******/
var snapper = new Snap({
  element: document.getElementById('content'),
  addBodyClasses: true,
  hyperextensible: false
});

document.getElementById('open-left').addEventListener('click', function(){
  if( snapper.state().state == 'left' ){
    snapper.close();
  } else {
    snapper.open('left');
  }
});



