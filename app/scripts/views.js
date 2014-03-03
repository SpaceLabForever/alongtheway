function _spID(id){
  var object = {}
  object = document.getElementById(id);
  return object;
}

var renderView = function(){
    var catList = resultsObj.displayAllCategories();
    var _T_list =  '';
    for(var i in catList){
      var listResults = resultsObj.getByCategory(catList[i]);
      _T_list += '<ul><li><div class="list-counter">'+listResults.length+'</div>'+catList[i]+'s</li><ul>';
      _.each(listResults, function(val){
        _T_list += '<li>'+val['name']+'</li>';
      });
      _T_list += '</ul></ul>';
    }
    return _T_list;
}



function refreshView(id, viewOutput, stringify){
  stringify ? (_spID(id).innerHTML = JSON.stringify(viewOutput)) : (_spID(id).innerHTML = viewOutput);
}




[{categoryName: [place1, place2, place3]}, {categoryName: [place1, place2, place3]}]
