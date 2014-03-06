"use strict";function refreshView(a,b,c){_spID(a).innerHTML=c?JSON.stringify(b):b,_invokeListListeners()}var map=document.getElementById("map-canvas");map.addEventListener("mousemove",function(a){a.stopPropagation()},!1);var snapper=new Snap({element:document.getElementById("content"),addBodyClasses:!0,hyperextensible:!1});snapper.on("start",function(){$("body").hasClass("snapjs-left")?$("body").hasClass("snapjs-left")&&$("nav.push-menu").removeClass("out"):$("nav.push-menu").addClass("out")}),document.getElementById("open-left").addEventListener("click",function(){"left"==snapper.state().state?snapper.close():snapper.open("left")});var renderListView=function(a){var b=new Filter(a);console.log(b.getAllObjects());var c=b.displayAllCategories(),d="";for(var e in c){var f=b.getByCategory(c[e]),g=c[e].split("_").join(" ");d+='<li class="top-level '+c[e]+'"><input type="radio" name="filterList" id="'+c[e]+'" />\n                <label class="button" for="'+c[e]+'" data-counter="'+f.length+'">'+g+"</label>",d+='<div class="filter-level"><ul data-category="'+c[e]+'" class="sub-menu">',_.each(f,function(a){var b=a.name.replace(/\s+/g,"");d+='<li><input class="switch" data-category="'+c[e]+'" type="checkbox" id="'+c[e]+"-"+b+'" value="'+b+'" /><label for="'+c[e]+"-"+b+'">'+a.name+'<button data-ref="'+a.reference+'" class="more-info" type="button">i</button></li></label>'}),d+="</ul></div></li>"}return d},renderDetailView=function(a){console.log(a);var b="";if(b+='<div class="detail"><div class="col1"><span class="name">'+a.name+"</span></div>",b+="undefined"!=typeof a.rating?'<div class="rating"><div class="rating-bar" style="width: '+100*a.rating/5+'%">'+a.rating+"</div></div>":"",b+='<div class="col1"><span class="address">'+a.adr_address+"</span></div>",b+='<div class="col1 reviews">',"undefined"!=typeof a.reviews)for(var c=0;c<a.reviews.length;c++)b+='<div class="review"><span class="rating-label">Rating: '+a.reviews[c].rating+"</span><p>"+a.reviews[c].text+'</p><span class="reviewer">Reviewed by: '+a.reviews[c].author_name+"</span></div>";return b+="</div>"};