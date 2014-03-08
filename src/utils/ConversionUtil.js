//(function(){
//	"use strict";

	var zther = zther || {};
		zther.util =  zther.util || {};
		zther.util.ConversionUtil = {

		/**
		Converts bits to bytes.

		@param bits: The number of bits. 
		@return Returns the number of bytes.
		*/
		bitsToBytes : function(bits) {
			"use strict";
			return bits / 8;
		},

		/**
		Converts bits to kilobits.

		@param bits: The number of bits.
		@return Returns the number of kilobits.
		*/
		bitsToKilobits : function(bits) {
			"use strict";
			return bits / 1024;
		},

		/**
		Converts bits to kilobytes.

		@param bits: The number of bits. 
		@return Returns the number of kilobits.
		*/
		bitsToKilobytes : function(bits) {
			"use strict";
			return bits / 8192;
		},

		/**
		Converts bytes to bits.

		@param bytes: The number of bytes.
		@return Returns the number of bits.
		*/
		bytesToBits : function(bytes) {
			"use strict";
			return bytes * 8;
		},

		/**
		Converts bytes to kilobits.

		@param bytes: The number of bytes.
		@return Returns the number of kilobits.
		*/
		bytesToKilobits : function(bytes) {
			"use strict";
			return bytes / 128;
		},

		/**
		Converts bytes to kilobytes.

		@param bytes: The number of bytes.
		@return Returns the number of kilobytes.
		*/
		bytesToKilobytes : function(bytes) {
			"use strict";
			return bytes / 1024;
		},

		/**
		Converts kilobits to bits.

		@param kilobits: The number of kilobits.
		@return Returns the number of bits.
		*/
		kilobitsToBits : function(kilobits) {
			"use strict";
			return kilobits * 1024;
		},

		/**
		Converts kilobits to bytes.

		@param kilobits: The number of kilobits.
		@return Returns the number of bytes.
		*/
		kilobitsToBytes : function(kilobits) {
			"use strict";
			return kilobits * 128;
		},

		/**
		Converts kilobits to kilobytes.

		@param kilobytes: The number of kilobits.
		@return Returns the number of kilobytes.
		*/
		kilobitsToKilobytes : function(kilobits) {
			"use strict";
			return kilobits / 8;
		},

		/**
		Converts kilobytes to bits.

		@param kilobytes: The number of kilobytes.
		@return Returns the number of bits.
		*/
		kilobytesToBits : function(kilobyte) {
			"use strict";
			return kilobyte * 8192;
		},

		/**
		Converts kilobytes to bytes.

		@param kilobytes: The number of kilobytes.
		@return Returns the number of bytes.
		*/
		kilobytesToBytes : function(kilobytes) {
			"use strict";
			return kilobytes * 1024;
		},

		/**
		Converts kilobytes to kilobits.

		@param kilobytes: The number of kilobytes.
		@return Returns the number of kilobits.
		*/
		kilobytesToKilobits : function(kilobytes) {
			"use strict";
			return kilobytes * 8;
		},

		/**
		Converts milliseconds to seconds.

		@param milliseconds: The number of milliseconds.
		@return Returns the number of seconds.
		*/
		millisecondsToSeconds : function(milliseconds) {
			"use strict";
			return milliseconds / 1000;
		},

		/**
		Converts milliseconds to minutes.

		@param milliseconds: The number of milliseconds.
		@return Returns the number of minutes.
		*/
		millisecondsToMinutes : function(milliseconds) {
			"use strict";
			return zther.util.ConversionUtil.secondsToMinutes(zther.util.ConversionUtil.millisecondsToSeconds(milliseconds));
		},

		/**
		Converts milliseconds to hours.

		@param milliseconds: The number of milliseconds.
		@return Returns the number of hours.
		*/
		millisecondsToHours : function(milliseconds) {
			"use strict";
			return zther.util.ConversionUtil.minutesToHours(zther.util.ConversionUtil.millisecondsToMinutes(milliseconds));
		},

		/**
		Converts milliseconds to days.

		@param milliseconds: The number of milliseconds.
		@return Returns the number of days.
		*/
		millisecondsToDays : function(milliseconds) {
			"use strict";
			return zther.util.ConversionUtil.hoursToDays(zther.util.ConversionUtil.millisecondsToHours(milliseconds));
		},

		/**
		Converts seconds to milliseconds.

		@param seconds: The number of seconds.
		@return Returns the number of milliseconds.
		*/
		secondsToMilliseconds : function(seconds) {
			"use strict";
			return seconds * 1000;
		},

		/**
		Converts seconds to minutes.

		@param seconds: The number of seconds.
		@return Returns the number of minutes.
		*/
		secondsToMinutes : function(seconds) {
			"use strict";
			return seconds / 60;
		},

		/**
		Converts seconds to hours.

		@param seconds: The number of seconds.
		@return Returns the number of hours.
		*/
		secondsToHours : function(seconds) {
			"use strict";
			return zther.util.ConversionUtil.minutesToHours(zther.util.ConversionUtil.secondsToMinutes(seconds));
		},

		/**
		Converts seconds to days.

		@param seconds: The number of seconds.
		@return Returns the number of days.
		*/
		secondsToDays : function(seconds) {
			"use strict";
			return zther.util.ConversionUtil.hoursToDays(zther.util.ConversionUtil.secondsToHours(seconds));
		},

		/**
		Converts minutes to milliseconds.

		@param minutes: The number of minutes.
		@return Returns the number of milliseconds.
		*/
		minutesToMilliseconds : function(minutes) {
			"use strict";
			return zther.util.ConversionUtil.secondsToMilliseconds(zther.util.ConversionUtil.minutesToSeconds(minutes));
		},

		/**
		Converts minutes to seconds.

		@param minutes: The number of minutes.
		@return Returns the number of seconds.
		*/
		minutesToSeconds : function(minutes) {
			"use strict";
			return minutes * 60;
		},

		/**
		Converts minutes to hours.

		@param minutes: The number of minutes.
		@return Returns the number of hours.
		*/
		minutesToHours : function(minutes) {
			"use strict";
			return minutes / 60;
		},

		/**
		Converts minutes to days.

		@param minutes: The number of minutes.
		@return Returns the number of days.
		*/
		minutesToDays : function(minutes) {
			"use strict";
			return zther.util.ConversionUtil.hoursToDays(zther.util.ConversionUtil.minutesToHours(minutes));
		},

		/**
		Converts hours to milliseconds.

		@param hours: The number of hours.
		@return Returns the number of milliseconds.
		*/
		hoursToMilliseconds : function(hours) {
			"use strict";
			return zther.util.ConversionUtil.secondsToMilliseconds(zther.util.ConversionUtil.hoursToSeconds(hours));
		},

		/**
		Converts hours to seconds.

		@param hours: The number of hours.
		@return Returns the number of seconds.
		*/
		hoursToSeconds : function(hours) {
			"use strict";
			return zther.util.ConversionUtil.minutesToSeconds(zther.util.ConversionUtil.hoursToMinutes(hours));
		},

		/**
		Converts hours to minutes.

		@param hours: The number of hours.
		@return Returns the number of minutes.
		*/
		hoursToMinutes : function(hours) {
			"use strict";
			return hours * 60;
		},

		/**
		Converts hours to days.

		@param hours: The number of hours.
		@return Returns the number of days.
		*/
		hoursToDays : function(hours) {
			"use strict";
			return hours / 24;
		},

		/**
		Converts days to milliseconds.

		@param days: The number of days.
		@return Returns the number of milliseconds.
		*/
		daysToMilliseconds : function(days) {
			"use strict";
			return zther.util.ConversionUtil.secondsToMilliseconds(zther.util.ConversionUtil.daysToSeconds(days));
		},

		/**
		Converts days to seconds.

		@param days: The number of days.
		@return Returns the number of seconds.
		*/
		daysToSeconds : function(days) {
			"use strict";
			return zther.util.ConversionUtil.minutesToSeconds(zther.util.ConversionUtil.daysToMinutes(days));
		},

		/**
		Converts days to minutes.

		@param days: The number of days.
		@return Returns the number of minutes.
		*/
		daysToMinutes : function(days) {
			"use strict";
			return zther.util.ConversionUtil.hoursToMinutes(zther.util.ConversionUtil.daysToHours(days));
		},
		/**
		Converts days to hours.

		@param days: The number of days.
		@return Returns the number of hours.
		*/
		daysToHours : function(days) {
			"use strict";
			return days * 24;
		},

		/**
		Converts degrees to radians.

		@param degrees: The number of degrees.
		@return Returns the number of radians.
		*/
		degreesToRadians : function(degrees) {
			"use strict";
			return degrees * (Math.PI / 180);
		},

		/**
		Converts radians to degrees.

		@param radians: The number of radians.
		@return Returns the number of degrees.
		*/
		radiansToDegrees : function(radians) {
			"use strict";
			return radians * (180 / Math.PI);
		}
	};
//})();