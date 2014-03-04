var nearbyBtn = document.getElementById('nearby');
var resultsObj = {};

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

nearbyBtn.addEventListener('click', function (e) {
  nearbySearch(clientLoc);
  /*******  Instantiate PushMenu to build out the left-drawer menu system. setTimeout() to ensure that the
  drawer items from views.js exist before building the menu out. Probably a better solution -DAP-  ******/
  setTimeout(function(){
    /*  Removing this functionality for now...
    $(function(){
      $('input[type=checkbox]').change(function() {
        if ($(this).is(':checked')) {
          console.log('checked');
          $(this).closest("li").appendTo("#queued");
        } else {
          console.log('!checked');
        }
      });
    });*/
  }, 600);
}, false);
