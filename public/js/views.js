"use strict";function refreshView(a,b,c){_spID(a).innerHTML=c?JSON.stringify(b):b,_invokeListListeners()}var renderListView=function(){var a=resultsObj.displayAllCategories(),b="";for(var c in a){var d=resultsObj.getByCategory(a[c]);b+='<li class="top-level"><input type="radio" name="filterList" id="'+a[c]+'" />\n                <label for="'+a[c]+'" data-counter="'+d.length+'">'+a[c]+"</label>",b+='<div class="mp-level"><ul class="sub-menu">',_.each(d,function(a){var c=a.name.replace(/\s+/g,"");b+='<li><input class="switch" type="checkbox" id="'+c+'" value="'+c+'" /><label for="'+c+'">'+a.name+'</label><button data-ref="'+a.reference+'" class="more-info" type="button">i</button></li>'}),b+="</ul></div></li>"}return b},testObj={},renderDetailView=function(a){console.log(a),testObj=a;var b="Name"+a.name+"Rating"+a.rating+"Address"+a.formatted_address;return b},map=document.getElementById("map-canvas");map.addEventListener("mousemove",function(a){a.stopPropagation()},!1);var snapper=new Snap({element:document.getElementById("content"),addBodyClasses:!0,hyperextensible:!1});snapper.on("start",function(){$("body").hasClass("snapjs-left")?$("body").hasClass("snapjs-left")&&$("nav.mp-level").removeClass("out"):$("nav.mp-level").addClass("out")}),$("input:radio").prop("checked",!1)&&(console.log("filter checked"),$(this).change(function(){$(".mp-level.out").addClass("buried"),$('.mp-level .top-level input[type="radio"]:checked ~ .mp-level .sub-menu').addClass("active"),$(".block").removeClass("hidden")})),$("input[name=filterList]").change("checked",function(){$(".block").removeClass("hidden")}),$(".block").click(function(){$(this).addClass("hidden")}),document.getElementById("open-left").addEventListener("click",function(){"left"==snapper.state().state?snapper.close():snapper.open("left")});