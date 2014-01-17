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