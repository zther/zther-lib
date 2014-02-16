(function(){
    "use strict";

    var zther = zther || {};
        zther.util =  zther.util || {};
        zther.util.DateUtil = {
/**
            Determines the difference between two dates.
             
            @param startDate: The starting date.
            @param endDate: The ending date.
            @return Returns the difference in milliseconds between the two dates.
            @example
                <code>
                    trace(ConversionUtil.millisecondsToDays(DateUtil.getTimeBetween(new Date(2007, 0, 1), new Date(2007, 0, 11)))); // Traces 10
                </code>
                */
                getTimeBetween : function(startDate, endDate) {
                    return endDate.getTime() - startDate.getTime();
                },

        /**
            Determines the time remaining until a certain date.
             
            @param startDate: The starting date.
            @param endDate: The ending date.
            @return Returns an Object with the properties <code>days</code>, <code>hours</code>, <code>minutes</code>, <code>seconds</code> and <code>milliseconds</code> defined as numbers.
            @example
                <code>
                    var countdown = DateUtil.getCountdownUntil(new Date(2006, 11, 31, 21, 36), new Date(2007, 0, 1));
                    trace("There are " + countdown.hours + " hours and " + countdown.minutes + " minutes until the new year!");
                </code>
                */
                getCountdownUntil : function(startDate, endDate) {
                    var daysUntil   = zther.util.ConversionUtil.millisecondsToDays(zther.util.DateUtil.getTimeBetween(startDate, endDate));
                    var hoursUntil  = zther.util.ConversionUtil.daysToHours(daysUntil % 1);
                    var minsUntil   = zther.util.ConversionUtil.hoursToMinutes(hoursUntil % 1);
                    var secsUntil   = zther.util.ConversionUtil.minutesToSeconds(minsUntil % 1);
                    var milliUntil  = zther.util.ConversionUtil.secondsToMilliseconds(secsUntil % 1);

                    return {
                        days:         parseInt(daysUntil,10),
                        hours:        parseInt(hoursUntil,10),
                        minutes:      parseInt(minsUntil,10),
                        seconds:      parseInt(secsUntil,10),
                        milliseconds: parseInt(milliUntil,10)};
                    }
    };
})();