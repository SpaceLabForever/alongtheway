'use strict';

var renderListView = function(){
  var catList = resultsObj.displayAllCategories();
  var _T_list =  '';
  for(var i in catList){
    var listResults = resultsObj.getByCategory(catList[i]);
    _T_list += '<li class="top-level"><input type="radio" name="filterList" id="' + catList[i] + '" />
                <label for="' + catList[i] + '" data-counter="' + listResults.length + '">' +
                catList[i] + '</label>';
    _T_list += '<div class="mp-level"><ul class="sub-menu">';
    _.each(listResults, function(val){
      var prettyName = val['name'].replace(/\s+/g,"");
      _T_list += '<li><input class="switch" type="checkbox" id="' +   prettyName + '" value="' +
                 prettyName + '" />' + '<label for="' + prettyName +'">' + val['name'] + '<button data-ref="' + val['reference'] + '" class="more-info" type="button">i</button></label></li>';
    });
    _T_list += '</ul></div></li>';
  }
  return _T_list;
};

var testObj = {};


var renderDetailView = function(place){
  console.log(place);
  testObj = place;
  var _T_detail = '';

  _T_detail += '<span class="name">' + place.name + '</span>';
  _T_detail += ( typeof place.rating != 'undefined' ? '<div class="rating">' + '<div class="rating-bar" style="background: #000; width: '+100*place.rating/5+'%"></div></div>': '');
  _T_detail += 'Address: ' + place.formatted_address;

  if( typeof place.reviews != 'undefined' ){
    for(var i=0; i<place.reviews.length; i++){
      _T_detail += 'Rating: ' + place.reviews[i]['rating'] + '<p>' + place.reviews[i]['text'] + '</p>' + 'Reviewed by: ' + place.reviews[i]['author_name'];
    }
  }


  return _T_detail;
}

function refreshView(id, viewOutput, stringify){
  stringify ? (_spID(id).innerHTML = JSON.stringify(viewOutput)) : (_spID(id).innerHTML = viewOutput);
  _invokeListListeners();
}

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
    $('nav.mp-level').addClass('out');
  } else if ($('body').hasClass('snapjs-left')) {
    $('nav.mp-level').removeClass('out');
  }
});

// if(snapper.state().state == "closed" {

// }



if ($('input:radio').prop('checked', false)) {
  console.log('filter checked');
  $(this).change(function(){
    $('.mp-level.out').addClass('buried');
    $('.mp-level .top-level input[type="radio"]:checked ~ .mp-level .sub-menu').addClass('active');
    $('.block').removeClass('hidden');
  });
}

$('input[name=filterList]').change('checked', function() {
  $('.block').removeClass('hidden');
});

$('.block').click(function(){
  $(this).addClass('hidden');
  //$('input:radio').prop('checked', false);
});


document.getElementById('open-left').addEventListener('click', function(){
  if( snapper.state().state == 'left' ){
    snapper.close();
  } else {
    snapper.open('left');
  }
});


