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