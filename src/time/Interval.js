var zther = zther || {};
	zther.time =  zther.time || {};
	zther.time.Interval = {
		setInterval : function(callback, delay, args) {
			"use strict";
			return new zther.time.Tick(callback, delay, 0, args, true);
		},
		setTimeout : function(callback, delay, args) {
			"use strict";
			return new zther.time.Tick(callback, delay, 1, args, true);
		}
	};