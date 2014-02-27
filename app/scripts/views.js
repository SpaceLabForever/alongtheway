function _spID(id){
  var object = {}
  object = document.getElementById(id);
  return object;
}

var renderView = function(){

    var catList = resultsObj.displayAllCategories();

    var _T_list =  '';

    for(var i in catList){

      _T_list += '<ul><li>Category: '+catList[i]+'s</li><ul>';

      _.each(resultsObj.getByCategory(catList[i]), function(val){
        _T_list += '<li>'+val['name']+'</li>';
      });

      _T_list += '</ul></ul>';

    }

    return _T_list;

}


//"<li>moe</li><li>curly</li><li>larry</li>"

function refreshView(id, viewOutput, stringify){
  stringify ? (_spID(id).innerHTML = JSON.stringify(viewOutput)) : (_spID(id).innerHTML = viewOutput);
}
