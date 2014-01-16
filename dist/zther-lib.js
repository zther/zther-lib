/* zther.util main */

// Base function.
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


// Version.
zther.util.RatioUtil.VERSION = '0.0.0';


/* zther.util main */

// Base function.
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


// Version.
zther.util.NumberUtil.VERSION = '0.0.0';
