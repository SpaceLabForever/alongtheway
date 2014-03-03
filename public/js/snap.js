(function(a,b){"use strict";var c=c||function(c){var d={element:null,dragger:null,disable:"none",addBodyClasses:!0,hyperextensible:!0,resistance:.5,flickThreshold:50,transitionSpeed:.3,easing:"ease",maxPosition:340,minPosition:-340,tapToClose:!0,touchToDrag:!0,slideIntent:40,minDragDistance:5},e={simpleStates:{opening:null,towards:null,hyperExtending:null,halfway:null,flick:null,translation:{absolute:0,relative:0,sinceDirectionChange:0,percentage:0}}},f={},g={hasTouch:"ontouchstart"in b.documentElement||a.navigator.msPointerEnabled,eventType:function(a){var b={down:g.hasTouch?"touchstart":"mousedown",move:g.hasTouch?"touchmove":"mousemove",up:g.hasTouch?"touchend":"mouseup",out:g.hasTouch?"touchcancel":"mouseout"};return b[a]},page:function(a,b){return g.hasTouch&&b.touches.length&&b.touches[0]?b.touches[0]["page"+a]:b["page"+a]},klass:{has:function(a,b){return-1!==a.className.indexOf(b)},add:function(a,b){!g.klass.has(a,b)&&d.addBodyClasses&&(a.className+=" "+b)},remove:function(a,b){d.addBodyClasses&&(a.className=a.className.replace(b,"").replace(/^\s+|\s+$/g,""))}},dispatchEvent:function(a){return"function"==typeof f[a]?f[a].call():void 0},vendor:function(){var a,c=b.createElement("div"),d="webkit Moz O ms".split(" ");for(a in d)if("undefined"!=typeof c.style[d[a]+"Transition"])return d[a]},transitionCallback:function(){return"Moz"===e.vendor||"ms"===e.vendor?"transitionend":e.vendor+"TransitionEnd"},canTransform:function(){return"undefined"!=typeof d.element.style[e.vendor+"Transform"]},deepExtend:function(a,b){var c;for(c in b)b[c]&&b[c].constructor&&b[c].constructor===Object?(a[c]=a[c]||{},g.deepExtend(a[c],b[c])):a[c]=b[c];return a},angleOfDrag:function(a,b){var c,d;return d=Math.atan2(-(e.startDragY-b),e.startDragX-a),0>d&&(d+=2*Math.PI),c=Math.floor(d*(180/Math.PI)-180),0>c&&c>-180&&(c=360-Math.abs(c)),Math.abs(c)},events:{addEvent:function(a,b,c){return a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):void 0},removeEvent:function(a,b,c){return a.addEventListener?a.removeEventListener(b,c,!1):a.attachEvent?a.detachEvent("on"+b,c):void 0},prevent:function(a){a.preventDefault?a.preventDefault():a.returnValue=!1}},parentUntil:function(a,b){for(var c="string"==typeof b;a.parentNode;){if(c&&a.getAttribute&&a.getAttribute(b))return a;if(!c&&a===b)return a;a=a.parentNode}return null}},h={translate:{get:{matrix:function(b){if(g.canTransform()){var c=a.getComputedStyle(d.element)[e.vendor+"Transform"].match(/\((.*)\)/),f=8;return c?(c=c[1].split(","),16===c.length&&(b+=f),parseInt(c[b],10)):0}return parseInt(d.element.style.left,10)}},easeCallback:function(){d.element.style[e.vendor+"Transition"]="",e.translation=h.translate.get.matrix(4),e.easing=!1,clearInterval(e.animatingInterval),0===e.easingTo&&(g.klass.remove(b.body,"snapjs-right"),g.klass.remove(b.body,"snapjs-left")),g.dispatchEvent("animated"),g.events.removeEvent(d.element,g.transitionCallback(),h.translate.easeCallback)},easeTo:function(a){g.canTransform()?(e.easing=!0,e.easingTo=a,d.element.style[e.vendor+"Transition"]="all "+d.transitionSpeed+"s "+d.easing,e.animatingInterval=setInterval(function(){g.dispatchEvent("animating")},1),g.events.addEvent(d.element,g.transitionCallback(),h.translate.easeCallback),h.translate.x(a)):(e.translation=a,h.translate.x(a)),0===a&&(d.element.style[e.vendor+"Transform"]="")},x:function(c){if(!("left"===d.disable&&c>0||"right"===d.disable&&0>c))if(d.hyperextensible||(c===d.maxPosition||c>d.maxPosition?c=d.maxPosition:(c===d.minPosition||c<d.minPosition)&&(c=d.minPosition)),c=parseInt(c,10),isNaN(c)&&(c=0),g.canTransform()){var f="translate3d("+c+"px, 0,0)";d.element.style[e.vendor+"Transform"]=f}else d.element.style.width=(a.innerWidth||b.documentElement.clientWidth)+"px",d.element.style.left=c+"px",d.element.style.right=""}},drag:{listen:function(){e.translation=0,e.easing=!1,g.events.addEvent(d.element,g.eventType("down"),h.drag.startDrag),g.events.addEvent(d.element,g.eventType("move"),h.drag.dragging),g.events.addEvent(d.element,g.eventType("up"),h.drag.endDrag)},stopListening:function(){g.events.removeEvent(d.element,g.eventType("down"),h.drag.startDrag),g.events.removeEvent(d.element,g.eventType("move"),h.drag.dragging),g.events.removeEvent(d.element,g.eventType("up"),h.drag.endDrag)},startDrag:function(a){var b=a.target?a.target:a.srcElement,c=g.parentUntil(b,"data-snap-ignore");if(c)return void g.dispatchEvent("ignore");if(d.dragger){var f=g.parentUntil(b,d.dragger);if(!f&&e.translation!==d.minPosition&&e.translation!==d.maxPosition)return}g.dispatchEvent("start"),d.element.style[e.vendor+"Transition"]="",e.isDragging=!0,e.hasIntent=null,e.intentChecked=!1,e.startDragX=g.page("X",a),e.startDragY=g.page("Y",a),e.dragWatchers={current:0,last:0,hold:0,state:""},e.simpleStates={opening:null,towards:null,hyperExtending:null,halfway:null,flick:null,translation:{absolute:0,relative:0,sinceDirectionChange:0,percentage:0}}},dragging:function(a){if(e.isDragging&&d.touchToDrag){var c,f=g.page("X",a),i=g.page("Y",a),j=e.translation,k=h.translate.get.matrix(4),l=f-e.startDragX,m=k>0,n=l;if(e.intentChecked&&!e.hasIntent)return;if(d.addBodyClasses&&(k>0?(g.klass.add(b.body,"snapjs-left"),g.klass.remove(b.body,"snapjs-right")):0>k&&(g.klass.add(b.body,"snapjs-right"),g.klass.remove(b.body,"snapjs-left"))),e.hasIntent===!1||null===e.hasIntent){var o=g.angleOfDrag(f,i),p=o>=0&&o<=d.slideIntent||360>=o&&o>360-d.slideIntent,q=o>=180&&o<=180+d.slideIntent||180>=o&&o>=180-d.slideIntent;e.hasIntent=q||p?!0:!1,e.intentChecked=!0}if(d.minDragDistance>=Math.abs(f-e.startDragX)||e.hasIntent===!1)return;g.events.prevent(a),g.dispatchEvent("drag"),e.dragWatchers.current=f,e.dragWatchers.last>f?("left"!==e.dragWatchers.state&&(e.dragWatchers.state="left",e.dragWatchers.hold=f),e.dragWatchers.last=f):e.dragWatchers.last<f&&("right"!==e.dragWatchers.state&&(e.dragWatchers.state="right",e.dragWatchers.hold=f),e.dragWatchers.last=f),m?(d.maxPosition<k&&(c=(k-d.maxPosition)*d.resistance,n=l-c),e.simpleStates={opening:"left",towards:e.dragWatchers.state,hyperExtending:d.maxPosition<k,halfway:k>d.maxPosition/2,flick:Math.abs(e.dragWatchers.current-e.dragWatchers.hold)>d.flickThreshold,translation:{absolute:k,relative:l,sinceDirectionChange:e.dragWatchers.current-e.dragWatchers.hold,percentage:k/d.maxPosition*100}}):(d.minPosition>k&&(c=(k-d.minPosition)*d.resistance,n=l-c),e.simpleStates={opening:"right",towards:e.dragWatchers.state,hyperExtending:d.minPosition>k,halfway:k<d.minPosition/2,flick:Math.abs(e.dragWatchers.current-e.dragWatchers.hold)>d.flickThreshold,translation:{absolute:k,relative:l,sinceDirectionChange:e.dragWatchers.current-e.dragWatchers.hold,percentage:k/d.minPosition*100}}),h.translate.x(n+j)}},endDrag:function(a){if(e.isDragging){g.dispatchEvent("end");var b=h.translate.get.matrix(4);if(0===e.dragWatchers.current&&0!==b&&d.tapToClose)return g.dispatchEvent("close"),g.events.prevent(a),h.translate.easeTo(0),e.isDragging=!1,void(e.startDragX=0);"left"===e.simpleStates.opening?e.simpleStates.halfway||e.simpleStates.hyperExtending||e.simpleStates.flick?e.simpleStates.flick&&"left"===e.simpleStates.towards?h.translate.easeTo(0):(e.simpleStates.flick&&"right"===e.simpleStates.towards||e.simpleStates.halfway||e.simpleStates.hyperExtending)&&h.translate.easeTo(d.maxPosition):h.translate.easeTo(0):"right"===e.simpleStates.opening&&(e.simpleStates.halfway||e.simpleStates.hyperExtending||e.simpleStates.flick?e.simpleStates.flick&&"right"===e.simpleStates.towards?h.translate.easeTo(0):(e.simpleStates.flick&&"left"===e.simpleStates.towards||e.simpleStates.halfway||e.simpleStates.hyperExtending)&&h.translate.easeTo(d.minPosition):h.translate.easeTo(0)),e.isDragging=!1,e.startDragX=g.page("X",a)}}}},i=function(a){a.element&&(g.deepExtend(d,a),e.vendor=g.vendor(),h.drag.listen())};this.open=function(a){g.dispatchEvent("open"),g.klass.remove(b.body,"snapjs-expand-left"),g.klass.remove(b.body,"snapjs-expand-right"),"left"===a?(e.simpleStates.opening="left",e.simpleStates.towards="right",g.klass.add(b.body,"snapjs-left"),g.klass.remove(b.body,"snapjs-right"),h.translate.easeTo(d.maxPosition)):"right"===a&&(e.simpleStates.opening="right",e.simpleStates.towards="left",g.klass.remove(b.body,"snapjs-left"),g.klass.add(b.body,"snapjs-right"),h.translate.easeTo(d.minPosition))},this.close=function(){g.dispatchEvent("close"),h.translate.easeTo(0)},this.expand=function(c){var d=a.innerWidth||b.documentElement.clientWidth;"left"===c?(g.dispatchEvent("expandLeft"),g.klass.add(b.body,"snapjs-expand-left"),g.klass.remove(b.body,"snapjs-expand-right")):(g.dispatchEvent("expandRight"),g.klass.add(b.body,"snapjs-expand-right"),g.klass.remove(b.body,"snapjs-expand-left"),d*=-1),h.translate.easeTo(d)},this.on=function(a,b){return f[a]=b,this},this.off=function(a){f[a]&&(f[a]=!1)},this.enable=function(){g.dispatchEvent("enable"),h.drag.listen()},this.disable=function(){g.dispatchEvent("disable"),h.drag.stopListening()},this.settings=function(a){g.deepExtend(d,a)},this.state=function(){var a,b=h.translate.get.matrix(4);return a=b===d.maxPosition?"left":b===d.minPosition?"right":"closed",{state:a,info:e.simpleStates}},i(c)};"undefined"!=typeof module&&module.exports&&(module.exports=c),"undefined"==typeof ender&&(this.Snap=c),"function"==typeof define&&define.amd&&define("snap",[],function(){return c})}).call(this,window,document);