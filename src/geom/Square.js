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