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
