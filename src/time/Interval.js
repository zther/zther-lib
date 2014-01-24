var zther = zther || {};
	zther.time =  zther.time || {};
	zther.time.Interval = {
		setInterval : function(delay, args) {
			"use strict";
			return new zther.time.Tick(delay, 0, args);
		},
		setTimeout : function(delay, args) {
			"use strict";
			return new zther.time.Tick(delay, 1, args);
		}
	};