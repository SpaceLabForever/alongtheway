function Filter(a){function b(){}return b.prototype.getAllObjects=function(){return a},b.prototype.getObject=function(b){return a[b]},b.prototype.displayAllCategories=function(){return _.chain(_(a).pluck("types")).flatten().uniq().value()},b.prototype.getObjectCategories=function(b){return a[b].types},b.prototype.getByCategory=function(b){var c=[];for(var d in a)_.contains(a[d].types,b)&&c.push(a[d]);return c},new b}function detailHandler(a){function b(a,b){b==google.maps.places.PlacesServiceStatus.OK&&refreshView("detail",renderDetailView(a),!1)}var c={reference:a};service=new google.maps.places.PlacesService(map),service.getDetails(c,b)}function nearbyHandler(a){resultsObj=new Filter(a),console.log(a);var b=_(a).pluck("name").map(function(a){return a});for(var c in b)console.log(_.uniq(b[c]));refreshView("results",renderListView(),!1)}function _invokeListListeners(){$(".more-info").click(function(){var a=$(this).attr("data-ref");detailHandler(a)}),$(".top-level input:radio").change(function(){$(".top-level > label").addClass("fadeOut"),$(".back-button").removeClass("hidden")}),$(".back-button").click(function(){$(".top-level > input:radio").prop("checked",!1),$(".top-level > label").removeClass("fadeOut"),$(this).addClass("hidden")});var a=function(b){b?$(b).unbind("change").change(function(){var b=".sub-menu input:checkbox"==$(this).parents("ul")[0].id?"#queued":".sub-menu";return $(this).closest("li").appendTo(b),a($(this)),!1}):$(".sub-menu input:checkbox").change(function(){return $(this).closest("li").appendTo("#queued"),a($(this)),!1})};a(null)}var nearbyBtn=document.getElementById("nearby"),resultsObj={},placeResult={};$("#nearby").click(function(){nearbySearch(clientLoc)});