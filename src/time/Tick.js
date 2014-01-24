/*global signals */
var zther = zther || {};
	zther.time =  zther.time || {};
	zther.time.Tick = function(callback, delay, repeatCount, args, autoStart){
		"use strict";

		var _delay = delay;
		var _repeatCount = repeatCount || 0;
		var _currentCount = 0;
		var _updated = new signals.Signal();
		var _completed = new signals.Signal();
		var _callback = callback || function(){};
		var _args = args || [];
		var _autoStart = autoStart || false;
		var _interval;

		Object.defineProperty(this,"arguments",{
			get: function() {
				return _args;
			},
			set: function(value) {
				_args = value;
			}
		});

		Object.defineProperty(this,"updated",{
			get: function(){ return _updated; }
		});

		Object.defineProperty(this,"completed",{
			get: function(){ return _completed; }
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

		Object.defineProperty(this,"callback",{
			get: function() {
				return _callback;
			},
			set: function(value) {
				_callback = value;
			}
		});

		this.destroy = function() {
			_updated.dispose();
			_completed.dispose();
		};

		this.start = function(){
			var self = this;
			_interval = setInterval(function(){
				timerHandler(self);
			}, _delay);
		};

		this.stop = function(){
			clearInterval(_interval);
		};

		function timerHandler(self) {
			_updated.dispatch(_args);

			if(_repeatCount){
				_currentCount++;
				if(_currentCount == _repeatCount){
					self.stop();
					_completed.dispatch(_args);
					_callback(_args);
				}
			}else{
				_callback(_args);
			}
		}

		if(_autoStart){
			this.start();
		}
	};