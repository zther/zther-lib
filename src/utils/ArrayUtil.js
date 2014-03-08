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
