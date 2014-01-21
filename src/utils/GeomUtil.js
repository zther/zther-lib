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