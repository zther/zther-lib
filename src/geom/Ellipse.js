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