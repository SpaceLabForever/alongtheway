"use strict";function _spID(a){var b={};return b=document.getElementById(a)}function refreshView(a,b,c){_spID(a).innerHTML=c?JSON.stringify(b):b}var renderView=function(){var a=resultsObj.displayAllCategories(),b="";for(var c in a){var d=resultsObj.getByCategory(a[c]);b+='<li class="icon icon-arrow-left"><a href="#" data-counter="'+d.length+'">'+a[c]+'</a><div class="mp-level">',b+='<ul class="sub-menu">',_.each(d,function(a){b+='<li><a href="#" style="color: #fff; font-size: 20rem;">'+a.name+"</a></li>"}),b+="</ul></div></li>"}return b},map=document.getElementById("map-canvas");map.addEventListener("mousemove",function(a){a.stopPropagation()},!1);var snapper=new Snap({element:document.getElementById("content"),hyperextensible:!1});document.getElementById("open-left").addEventListener("click",function(){"left"==snapper.state().state?snapper.close():snapper.open("left")});