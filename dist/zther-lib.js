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

			console.log('the points', A.x, B.x, C.x, D.x);

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