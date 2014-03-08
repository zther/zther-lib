/*

 JS Signals <http://millermedeiros.github.com/js-signals/>
 Released under the MIT license
 Author: Miller Medeiros
 Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
*/
(function(i){function h(a,b,c,d,e){this._listener=b;this._isOnce=c;this.context=d;this._signal=a;this._priority=e||0}function g(a,b){if(typeof a!=="function")throw Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}",b));}function e(){this._bindings=[];this._prevParams=null;var a=this;this.dispatch=function(){e.prototype.dispatch.apply(a,arguments)}}h.prototype={active:!0,params:null,execute:function(a){var b;this.active&&this._listener&&(a=this.params?this.params.concat(a):
a,b=this._listener.apply(this.context,a),this._isOnce&&this.detach());return b},detach:function(){return this.isBound()?this._signal.remove(this._listener,this.context):null},isBound:function(){return!!this._signal&&!!this._listener},isOnce:function(){return this._isOnce},getListener:function(){return this._listener},getSignal:function(){return this._signal},_destroy:function(){delete this._signal;delete this._listener;delete this.context},toString:function(){return"[SignalBinding isOnce:"+this._isOnce+
", isBound:"+this.isBound()+", active:"+this.active+"]"}};e.prototype={VERSION:"1.0.0",memorize:!1,_shouldPropagate:!0,active:!0,_registerListener:function(a,b,c,d){var e=this._indexOfListener(a,c);if(e!==-1){if(a=this._bindings[e],a.isOnce()!==b)throw Error("You cannot add"+(b?"":"Once")+"() then add"+(!b?"":"Once")+"() the same listener without removing the relationship first.");}else a=new h(this,a,b,c,d),this._addBinding(a);this.memorize&&this._prevParams&&a.execute(this._prevParams);return a},
_addBinding:function(a){var b=this._bindings.length;do--b;while(this._bindings[b]&&a._priority<=this._bindings[b]._priority);this._bindings.splice(b+1,0,a)},_indexOfListener:function(a,b){for(var c=this._bindings.length,d;c--;)if(d=this._bindings[c],d._listener===a&&d.context===b)return c;return-1},has:function(a,b){return this._indexOfListener(a,b)!==-1},add:function(a,b,c){g(a,"add");return this._registerListener(a,!1,b,c)},addOnce:function(a,b,c){g(a,"addOnce");return this._registerListener(a,
!0,b,c)},remove:function(a,b){g(a,"remove");var c=this._indexOfListener(a,b);c!==-1&&(this._bindings[c]._destroy(),this._bindings.splice(c,1));return a},removeAll:function(){for(var a=this._bindings.length;a--;)this._bindings[a]._destroy();this._bindings.length=0},getNumListeners:function(){return this._bindings.length},halt:function(){this._shouldPropagate=!1},dispatch:function(a){if(this.active){var b=Array.prototype.slice.call(arguments),c=this._bindings.length,d;if(this.memorize)this._prevParams=
b;if(c){d=this._bindings.slice();this._shouldPropagate=!0;do c--;while(d[c]&&this._shouldPropagate&&d[c].execute(b)!==!1)}}},forget:function(){this._prevParams=null},dispose:function(){this.removeAll();delete this._bindings;delete this._prevParams},toString:function(){return"[Signal active:"+this.active+" numListeners:"+this.getNumListeners()+"]"}};var f=e;f.Signal=e;typeof define==="function"&&define.amd?define(function(){return f}):typeof module!=="undefined"&&module.exports?module.exports=f:i.signals=
f})(this);

var zther = zther || {};
	zther.geom =  zther.geom || {};
	zther.geom.Ellipse = function(x,y,width,height) {
		"use strict";

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		/**
			The center of the ellipse.
		*/
		Object.defineProperty(this,"center",{
			get: function() {
				return new zther.geom.Point(this.x + this.width * 0.5, this.y + this.height * 0.5);
			},
			set: function(value) {
				if(value instanceof zther.geom.Point ){
					this.x = value.x - this.width * 0.5;
					this.y = value.y - this.height * 0.5;
				}else{
					throw "argument must be of type zther.geom.Point";
				}
			}
		});
         
        /**
            The size of the ellipse, expressed as a Point object with the values of the width and height properties.
        */
        Object.defineProperty(this,"size",{
			get: function() {
				return new zther.geom.Point(this.width, this.height);
			}
        });
         
        /**
            The circumference of the ellipse.
             
            @usageNote Calculating the circumference of an ellipse is difficult; this is an approximation but should be accurate for most cases.
        */
        Object.defineProperty(this,"perimeter",{
			get: function() {
				return (Math.sqrt(0.5 * (Math.pow(this.width, 2) + Math.pow(this.height, 2))) * Math.PI * 2) * 0.5;
			}
        });
         
        /**
            The area of the ellipse.
        */
        Object.defineProperty(this,"area",{
			get: function() {
				return Math.PI * (this.width * 0.5) * (this.height * 0.5);
			}
        });
         
        /**
            Finds the <code>x</code>, <code>y</code> position of the degree along the circumference of the ellipse.
             
            @param degree: Number representing a degree on the ellipse.
            @return A Point object.
            @usageNote <code>degree</code> can be over 360 or even negitive numbers; minding <code>0 = 360 = 720</code>, <code>540 = 180</code>, <code>-90 = 270</code>, etc.
        */
        this.getPointOfDegree = function(degree) {
            var radian  = (degree - 90) * (Math.PI / 180);
            var xRadius = this.width * 0.5;
            var yRadius = this.height * 0.5;
             
            return new zther.geom.Point(this.x + xRadius + Math.cos(radian) * xRadius, this.y + yRadius + Math.sin(radian) * yRadius);
        };
         
        /**
            Finds if a point is contained inside of the ellipse perimeter.
             
            @param point: A Point object.
            @return Returns <code>true</code> if shape's area contains point; otherwise <code>false</code>.
        */
        this.containsPoint = function(point) {
            var xRadius = this.width * 0.5;
            var yRadius = this.height * 0.5;
            var xTar    = point.x - this.x - xRadius;
            var yTar    = point.y - this.y - yRadius;
            
            return Math.pow(xTar / xRadius, 2) + Math.pow(yTar / yRadius, 2) <= 1;
        };
         
        /**
            Determines if the Ellipse specified in the <code>ellipse</code> parameter is equal to this Ellipse object.
             
            @param ellipse: An Ellipse object.
            @return Returns <code>true</code> if object is equal to this Ellipse; otherwise <code>false</code>.
        */
        this.equals = function(ellipse) {
            return this.x == ellipse.x && this.y == ellipse.y && this.width == ellipse.width && this.height == ellipse.height;
        };
         
        /**
            @return A new Ellipse object with the same values as this Ellipse.
        */
        this.clone = function() {
            return new zther.geom.Ellipse(this.x, this.y, this.width, this.height);
        };
	};

var zther = zther || {};
	zther.geom =  zther.geom || {};
	zther.geom.Point = function(x,y) {
		"use strict";

		this.x = x;
		this.y = y;
	};

var zther = zther || {};
	zther.geom =  zther.geom || {};
	zther.geom.Polygon = function(points) {
		"use strict";

		function Segment(a, b)
		{
		        this.a = a;
		        this.b = b;
		}

		function checkIntersection(segment1, segment2)
		{
			var ccw = function(a, b, c) {
				return (c.y-a.y)*(b.x-a.x) > (b.y-a.y)*(c.x-a.x);
			};
			return ccw(segment1.a,segment2.a,segment2.b) != ccw(segment1.b,segment2.a,segment2.b) && ccw(segment1.a,segment1.b,segment2.a) != ccw(segment1.a,segment1.b,segment2.b);
		}

		this.vertices = (points[0] instanceof zther.geom.Point) ? points: points.map(function(a){return new zther.geom.Point(a[0],a[1]);});

		this.sides = [];

		for (var i = 0; i < this.vertices.length; i++){
			this.sides[i] = (i == this.vertices.length - 1) ? new Segment(this.vertices[i], this.vertices[0]) : new Segment(this.vertices[i], this.vertices[i+1]);
		}

		this.containsPoint = function(point){

			var intersections = 0;
			var outsidePoint = new zther.geom.Point(
									Math.min.apply(Math,this.vertices.map(function(o){return o.x;})) - 1,
									Math.min.apply(Math,this.vertices.map(function(o){return o.y;})) - 1);

			var ray = new Segment(point, outsidePoint);

			for (i = 0; i < this.sides.length; i++) {

				if (checkIntersection(ray, this.sides[i])){
					intersections ++;
				}
			}

			return (intersections % 2);
		};
	};

var zther = zther || {};
	zther.geom =  zther.geom || {};
	zther.geom.Rectangle = function(x,y,width,height) {
		"use strict";

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.contains = function(x,y){
			return this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y;
		};

		this.containsPoint = function(p){
			if( p instanceof zther.geom.Point ){
				return this.contains(p.x, p.y);
			}else{
				throw "zther.geom.Rectangle.containsPoint() method requires instance of zther.geom.Point";
			}
		};
	};

var zther = zther || {};
	zther.geom =  zther.geom || {};
	zther.geom.Square = function(points) {
		"use strict";

		var A = 0;
		var B = 0;
		var C = 0;
		var D = 0;

		this.points = [];

		if(points[0] instanceof zther.geom.Point && points.length == 4){
			this.points = points;
			A = points[0];
			B = points[1];
			C = points[2];
			D = points[3];

		}else{
			throw "zther.geom.Square requires for points";
		}

		function triangleArea(a,b,p){
			return (p.x*b.y-b.x*p.y)-(p.x*a.y-a.x*p.y)+(b.x*a.y-a.x*b.y);
		}

		this.containsPoint = function(P){

			if (triangleArea(A,B,P)>0 || triangleArea(B,C,P)>0 || triangleArea(C,D,P)>0 || triangleArea(D,A,P)>0) {
				return false;
			}

			return true;
		};
	};

/*global window: false */
var zther = zther || {};
	zther.namespace = function(string){
		'use strict';
		
		var parts = string.split('.'),
			parent = window,
			currentPart = '';

			for(var i = 0, length = parts.length; i < length; i++) {
				currentPart = parts[i];
				parent[currentPart] = parent[currentPart] || {};
				parent = parent[currentPart];
			}

		return parent;
	};

var zther = zther || {};
	zther.time =  zther.time || {};
	zther.time.Interval = {
		setInterval : function(callback, delay, args) {
			"use strict";
			return new zther.time.Tick(callback, delay, 0, args, true);
		},
		setTimeout : function(callback, delay, args) {
			"use strict";
			return new zther.time.Tick(callback, delay, 1, args, true);
		}
	};

/*global signals */
var zther = zther || {};
	zther.time =  zther.time || {};
	zther.time.Tick = function(callback, delay, repeatCount, args, autoStart){
		"use strict";

		var _delay = delay;
		var _repeatCount = repeatCount || 0;
		var _currentCount = 0;
		var _updated = new signals.Signal();
		var _completed = new signals.Signal();
		var _callback = callback || function(){};
		var _args = args || [];
		var _autoStart = autoStart || false;
		var _interval;

		Object.defineProperty(this,"arguments",{
			get: function() {
				return _args;
			},
			set: function(value) {
				_args = value;
			}
		});

		Object.defineProperty(this,"updated",{
			get: function(){ return _updated; }
		});

		Object.defineProperty(this,"completed",{
			get: function(){ return _completed; }
		});

		Object.defineProperty(this,"repeatCount",{
			get: function() {
				return _repeatCount;
			},
			set: function(value) {
				_repeatCount = value;
			}
		});

		Object.defineProperty(this,"delay",{
			get: function() {
				return _delay;
			},
			set: function(value) {
				_delay = value;
			}
		});

		Object.defineProperty(this,"callback",{
			get: function() {
				return _callback;
			},
			set: function(value) {
				_callback = value;
			}
		});

		this.destroy = function() {
			_updated.dispose();
			_completed.dispose();
		};

		this.start = function(){
			var self = this;
			_interval = setInterval(function(){
				timerHandler(self);
			}, _delay);
		};

		this.stop = function(){
			clearInterval(_interval);
		};

		function timerHandler(self) {
			_updated.dispatch(_args);

			if(_repeatCount){
				_currentCount++;
				if(_currentCount == _repeatCount){
					self.stop();
					_completed.dispatch(_args);
					_callback(_args);
				}
			}else{
				_callback(_args);
			}
		}

		if(_autoStart){
			this.start();
		}
	};

var zther = zther || {};
		zther.util =  zther.util || {};
		zther.util.ArrayUtil = {

			sortByKey : function(array, key) {
				"use strict";
				return array.sort(function(a, b) {
					var x = a[key]; var y = b[key];
					return ((x < y) ? -1 : ((x > y) ? 1 : 0));
				});
			}
		};


var zther = zther || {};
	zther.util =  zther.util || {};
	zther.util.GeomUtil = {


		/**
            Takes any degree value and returns the normalized 0-360 degree equivalent.
             
            @param degree: The degree to normalize.
            @return Returns a degree value between <code>0 </code> and <code>360</code>.
            @example
                <code>
                    trace(GeomUtil.normalizeDegree(-90)); // Traces "270"
                    trace(GeomUtil.normalizeDegree(1080)); // Traces "0"
                </code>
        */
        normalizeDegree : function(degree) {
			'use strict';
            degree %= 360;
             
            return (degree < 0) ? degree + 360 : degree;
        }
	};

var zther = zther || {};
	zther.util =  zther.util || {};
	zther.util.NumberUtil = {
		/**
		Determines if the number is even.
		 
		@param value: A number to determine if it is divisible by <code>2</code>.
		@return Returns <code>true</code> if the number is even; otherwise <code>false</code>.
		@example
		    <code>
		        console.log(NumberUtil.isEven(7)); // Traces false
		        console.log(NumberUtil.isEven(12)); // Traces true
		    </code>
		*/
		isEven : function(value) {
			"use strict";
			return (value & 1) === 0;
		}
	};


var zther = zther || {};
	zther.util =  zther.util || {};
	zther.util.RatioUtil = {
		/**
		Determines the ratio of width to height.  
		@param size: The area's width and height expressed as a <code>Rectangle</code>. The <code>Rectangle</code>'s <code>x</code> and <code>y</code> values are ignored.
		*/
		widthToHeight : function(size) {
			"use strict";
			return size.width / size.height;
		},

		/**
		Determines the ratio of height to width.   
		@param size: The area's width and height expressed as a <code>Rectangle</code>. The <code>Rectangle</code>'s <code>x</code> and <code>y</code> values are ignored.
		*/
		heightToWidth : function(size) {
			"use strict";
			return size.height / size.width;
		}
	};
