"use strict";function Filter(a){function b(){}return b.prototype.getAllObjects=function(){return a},b.prototype.getObject=function(b){return a[b]},b.prototype.displayAllCategories=function(){return _.chain(_(a).pluck("types")).flatten().uniq().value()},b.prototype.getObjectCategories=function(b){return a[b].types},b.prototype.getByCategory=function(b){var c=[];for(var d in a)_.contains(a[d].types,b)&&c.push(a[d]);return c},new b}function detailHandler(a){function b(a,b){b==google.maps.places.PlacesServiceStatus.OK&&refreshView("detail",renderDetailView(a),!1)}var c={reference:a},d=new google.maps.places.PlacesService(map);d.getDetails(c,b)}function _invokeListListeners(){$(".more-info").click(function(){var a=$(this).attr("data-ref");detailHandler(a),snapper.close(),$("#detail").toggleClass("hidden")}),$(".top-level input:radio").change(function(){$(".top-level > label").addClass("fadeOut"),$(".back-button").removeClass("hidden")}),$(".back-button").click(function(){console.log("back button clicked!"),$(".top-level > input:radio").prop("checked",!1),$(".top-level > label").removeClass("fadeOut"),$(this).addClass("hidden")}),$(".switch:checkbox").click(function(){var a="[data-category="+$(this).data("category")+"]";$(this).is(":checked")?(console.log("checked"),console.log($(this).data("category")),$(this).closest("li").appendTo("#queued")):$(this).is(":checked")||(console.log($(this).data("category")),console.log("not checked"),$(this).closest("li").appendTo(".sub-menu"+a))})}var nearbyBtn=document.getElementById("nearby"),resultsObj={},placeResult={};$("#nearby").click(function(){nearbySearch(clientLoc)});