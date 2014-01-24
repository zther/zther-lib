/*global signals */
var zther = zther || {};
	zther.time =  zther.time || {};
	zther.time.Tick = function(delay, repeatCount, args){
		"use strict";

		var _delay = delay;
		var _repeatCount = repeatCount;
		var _currentCount = 0;
		var _ticked = new signals.Signal();
		var _args = args;
		var _interval;

		Object.defineProperty(this,"arguments",{
			get: function() {
				return _args;
			},
			set: function(value) {
				_args = value;
			}
		});

		Object.defineProperty(this,"ticked",{
			get: function() {
				return _ticked;
			}
		});

		Object.defineProperty(this,"repeatCount",{
			get: function() {
				return _repeatCount;
			},
			set: function(value) {
				_repeatCount = value;
			}
		});

		Object.defineProperty(this,"delay",{
			get: function() {
				return _delay;
			},
			set: function(value) {
				_delay = value;
			}
		});

		this.destroy = function() {
			_ticked.dispose();
		};

		this.start = function(){
			_interval = setInterval(function(){
				timerHandler(this);
			}, _delay);
		};

		this.stop = function(){
			clearInterval(_interval);
		};

		function timerHandler(self) {
			_ticked.dispatch(_args);

			if(_repeatCount){
				_currentCount++;
				if(_currentCount == _repeatCount){
					self.stop();
				}
			}
		}

	};