/*! zther-lib compressed 24-01-2014 */
!function(a){function b(a,b,c,d,e){this._listener=b,this._isOnce=c,this.context=d,this._signal=a,this._priority=e||0}function c(a,b){if("function"!=typeof a)throw Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}",b))}function d(){this._bindings=[],this._prevParams=null;var a=this;this.dispatch=function(){d.prototype.dispatch.apply(a,arguments)}}b.prototype={active:!0,params:null,execute:function(a){var b;return this.active&&this._listener&&(a=this.params?this.params.concat(a):a,b=this._listener.apply(this.context,a),this._isOnce&&this.detach()),b},detach:function(){return this.isBound()?this._signal.remove(this._listener,this.context):null},isBound:function(){return!!this._signal&&!!this._listener},isOnce:function(){return this._isOnce},getListener:function(){return this._listener},getSignal:function(){return this._signal},_destroy:function(){delete this._signal,delete this._listener,delete this.context},toString:function(){return"[SignalBinding isOnce:"+this._isOnce+", isBound:"+this.isBound()+", active:"+this.active+"]"}},d.prototype={VERSION:"1.0.0",memorize:!1,_shouldPropagate:!0,active:!0,_registerListener:function(a,c,d,e){var f=this._indexOfListener(a,d);if(-1!==f){if(a=this._bindings[f],a.isOnce()!==c)throw Error("You cannot add"+(c?"":"Once")+"() then add"+(c?"Once":"")+"() the same listener without removing the relationship first.")}else a=new b(this,a,c,d,e),this._addBinding(a);return this.memorize&&this._prevParams&&a.execute(this._prevParams),a},_addBinding:function(a){var b=this._bindings.length;do--b;while(this._bindings[b]&&a._priority<=this._bindings[b]._priority);this._bindings.splice(b+1,0,a)},_indexOfListener:function(a,b){for(var c,d=this._bindings.length;d--;)if(c=this._bindings[d],c._listener===a&&c.context===b)return d;return-1},has:function(a,b){return-1!==this._indexOfListener(a,b)},add:function(a,b,d){return c(a,"add"),this._registerListener(a,!1,b,d)},addOnce:function(a,b,d){return c(a,"addOnce"),this._registerListener(a,!0,b,d)},remove:function(a,b){c(a,"remove");var d=this._indexOfListener(a,b);return-1!==d&&(this._bindings[d]._destroy(),this._bindings.splice(d,1)),a},removeAll:function(){for(var a=this._bindings.length;a--;)this._bindings[a]._destroy();this._bindings.length=0},getNumListeners:function(){return this._bindings.length},halt:function(){this._shouldPropagate=!1},dispatch:function(){if(this.active){var a,b=Array.prototype.slice.call(arguments),c=this._bindings.length;if(this.memorize&&(this._prevParams=b),c){a=this._bindings.slice(),this._shouldPropagate=!0;do c--;while(a[c]&&this._shouldPropagate&&a[c].execute(b)!==!1)}}},forget:function(){this._prevParams=null},dispose:function(){this.removeAll(),delete this._bindings,delete this._prevParams},toString:function(){return"[Signal active:"+this.active+" numListeners:"+this.getNumListeners()+"]"}};var e=d;e.Signal=d,"function"==typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?module.exports=e:a.signals=e}(this);var zther=zther||{};zther.geom=zther.geom||{},zther.geom.Ellipse=function(a,b,c,d){"use strict";this.x=a,this.y=b,this.width=c,this.height=d,Object.defineProperty(this,"center",{get:function(){return new zther.geom.Point(this.x+.5*this.width,this.y+.5*this.height)},set:function(a){if(!(a instanceof zther.geom.Point))throw"argument must be of type zther.geom.Point";this.x=a.x-.5*this.width,this.y=a.y-.5*this.height}}),Object.defineProperty(this,"size",{get:function(){return new zther.geom.Point(this.width,this.height)}}),Object.defineProperty(this,"perimeter",{get:function(){return Math.sqrt(.5*(Math.pow(this.width,2)+Math.pow(this.height,2)))*Math.PI*2*.5}}),Object.defineProperty(this,"area",{get:function(){return.5*Math.PI*this.width*.5*this.height}}),this.getPointOfDegree=function(a){var b=(a-90)*(Math.PI/180),c=.5*this.width,d=.5*this.height;return new zther.geom.Point(this.x+c+Math.cos(b)*c,this.y+d+Math.sin(b)*d)},this.containsPoint=function(a){var b=.5*this.width,c=.5*this.height,d=a.x-this.x-b,e=a.y-this.y-c;return Math.pow(d/b,2)+Math.pow(e/c,2)<=1},this.equals=function(a){return this.x==a.x&&this.y==a.y&&this.width==a.width&&this.height==a.height},this.clone=function(){return new zther.geom.Ellipse(this.x,this.y,this.width,this.height)}};var zther=zther||{};zther.geom=zther.geom||{},zther.geom.Point=function(a,b){"use strict";this.x=a,this.y=b};var zther=zther||{};zther.geom=zther.geom||{},zther.geom.Polygon=function(a){"use strict";function b(a,b){this.a=a,this.b=b}function c(a,b){var c=function(a,b,c){return(c.y-a.y)*(b.x-a.x)>(b.y-a.y)*(c.x-a.x)};return c(a.a,b.a,b.b)!=c(a.b,b.a,b.b)&&c(a.a,a.b,b.a)!=c(a.a,a.b,b.b)}this.vertices=a[0]instanceof zther.geom.Point?a:a.map(function(a){return new zther.geom.Point(a[0],a[1])}),this.sides=[];for(var d=0;d<this.vertices.length;d++)this.sides[d]=d==this.vertices.length-1?new b(this.vertices[d],this.vertices[0]):new b(this.vertices[d],this.vertices[d+1]);this.containsPoint=function(a){var e=0,f=new zther.geom.Point(Math.min.apply(Math,this.vertices.map(function(a){return a.x}))-1,Math.min.apply(Math,this.vertices.map(function(a){return a.y}))-1),g=new b(a,f);for(d=0;d<this.sides.length;d++)c(g,this.sides[d])&&e++;return e%2}};var zther=zther||{};zther.geom=zther.geom||{},zther.geom.Rectangle=function(a,b,c,d){"use strict";this.x=a,this.y=b,this.width=c,this.height=d,this.contains=function(a,b){return this.x<=a&&this.x+this.width>=a&&this.y<=b&&this.y+this.height>=b},this.containsPoint=function(a){if(a instanceof zther.geom.Point)return this.contains(a.x,a.y);throw"zther.geom.Rectangle.containsPoint() method requires instance of zther.geom.Point"}};var zther=zther||{};zther.geom=zther.geom||{},zther.geom.Square=function(a){"use strict";function b(a,b,c){return c.x*b.y-b.x*c.y-(c.x*a.y-a.x*c.y)+(b.x*a.y-a.x*b.y)}var c=0,d=0,e=0,f=0;if(this.points=[],!(a[0]instanceof zther.geom.Point&&4==a.length))throw"zther.geom.Square requires for points";this.points=a,c=a[0],d=a[1],e=a[2],f=a[3],this.containsPoint=function(a){return b(c,d,a)>0||b(d,e,a)>0||b(e,f,a)>0||b(f,c,a)>0?!1:!0}};var zther=zther||{};zther.namespace=function(a){"use strict";for(var b=a.split("."),c=window,d="",e=0,f=b.length;f>e;e++)d=b[e],c[d]=c[d]||{},c=c[d];return c};var zther=zther||{};zther.time=zther.time||{},zther.time.Interval={setInterval:function(a,b,c){"use strict";return new zther.time.Tick(a,b,0,c,!0)},setTimeout:function(a,b,c){"use strict";return new zther.time.Tick(a,b,1,c,!0)}};var zther=zther||{};zther.time=zther.time||{},zther.time.Tick=function(a,b,c,d,e){"use strict";function f(a){k.dispatch(n),i?(j++,j==i&&(a.stop(),l.dispatch(n),m(n))):m(n)}var g,h=b,i=c||0,j=0,k=new signals.Signal,l=new signals.Signal,m=a||function(){},n=d||[],o=e||!1;Object.defineProperty(this,"arguments",{get:function(){return n},set:function(a){n=a}}),Object.defineProperty(this,"updated",{get:function(){return k}}),Object.defineProperty(this,"completed",{get:function(){return l}}),Object.defineProperty(this,"repeatCount",{get:function(){return i},set:function(a){i=a}}),Object.defineProperty(this,"delay",{get:function(){return h},set:function(a){h=a}}),Object.defineProperty(this,"callback",{get:function(){return m},set:function(a){m=a}}),this.destroy=function(){k.dispose(),l.dispose()},this.start=function(){var a=this;g=setInterval(function(){f(a)},h)},this.stop=function(){clearInterval(g)},o&&this.start()};var zther=zther||{};zther.util=zther.util||{},zther.util.GeomUtil={normalizeDegree:function(a){"use strict";return a%=360,0>a?a+360:a}};var zther=zther||{};zther.util=zther.util||{},zther.util.NumberUtil={isEven:function(a){"use strict";return 0===(1&a)}};var zther=zther||{};zther.util=zther.util||{},zther.util.RatioUtil={widthToHeight:function(a){"use strict";return a.width/a.height},heightToWidth:function(a){"use strict";return a.height/a.width}};