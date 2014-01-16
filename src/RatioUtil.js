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
