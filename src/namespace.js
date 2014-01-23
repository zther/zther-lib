/*global window: false */
var zther = zther || {};
	zther.namespace = function(string){
		'use strict';
		
		var parts = string.split('.'),
			parent = window,
			currentPart = '';

			for(var i = 0, length = parts.length; i < length; i++) {
				currentPart = parts[i];
				parent[currentPart] = parent[currentPart] || {};
				parent = parent[currentPart];
			}

		return parent;
	};