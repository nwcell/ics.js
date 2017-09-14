/* global saveAs, Blob, BlobBuilder, console */
/* exported ics */

var ics = function() {
    'use strict';

    if (navigator.userAgent.indexOf('MSIE') > -1 && navigator.userAgent.indexOf('MSIE 10') == -1) {
        console.log('Unsupported Browser');
        return;
    }

    var SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
    var calendarEvents = [];
    var calendarStart = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0'
    ].join(SEPARATOR);
    var calendarEnd = SEPARATOR + 'END:VCALENDAR';
    var BYDAY_VALUES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

    return {
        /**
         * Returns events array
         * @return {array} Events
         */
        'events': function() {
            return calendarEvents;
        },

        /**
         * Returns calendar
         * @return {string} Calendar in iCalendar format
         */
        'calendar': function() {
            return calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;
        },

        /**
         * Add event to the calendar
         * @param  {string} subject     Subject/Title of event
         * @param  {string} description Description of event
         * @param  {string} location    Location of event
         * @param  {string} begin       Beginning date of event
         * @param  {string} stop        Ending date of event
         */
        'addEvent': function(subject, description, location, begin, stop, rrule) {
            // I'm not in the mood to make these optional... So they are all required
            if (typeof subject === 'undefined' ||
                typeof description === 'undefined' ||
                typeof location === 'undefined' ||
                typeof begin === 'undefined' ||
                typeof stop === 'undefined'
            ) {
                return false;
            }

            // validate rrule
            if (rrule) {
              if (!rrule.rule) {
                if (rrule.freq !== 'YEARLY' && rrule.freq !== 'MONTHLY' && rrule.freq !== 'WEEKLY' && rrule.freq !== 'DAILY') {
                  throw "Recurrence rule frequency must be provided and be one of the following: 'YEARLY', 'MONTHLY', 'WEEKLY', or 'DAILY'";
                }

                if (rrule.until) {
                  if (isNaN(Date.parse(rrule.until))) {
                    throw "Recurrence rule 'until' must be a valid date string";
                  }
                }

                if (rrule.interval) {
                  if (isNaN(parseInt(rrule.interval))) {
                    throw "Recurrence rule 'interval' must be an integer";
                  }
                }

                if (rrule.count) {
                  if (isNaN(parseInt(rrule.count))) {
                    throw "Recurrence rule 'count' must be an integer";
                  }
                }

                if (typeof rrule.byday !== 'undefined') {
                  if ( (Object.prototype.toString.call(rrule.byday) !== '[object Array]') ) {
                    throw "Recurrence rule 'byday' must be an array";
                  }

                  if (rrule.byday.length > 7) {
                    throw "Recurrence rule 'byday' array must not be longer than the 7 days in a week";
                  }

                  // Filter any possible repeats
                  rrule.byday = rrule.byday.filter(function(elem, pos) {
                    return rrule.byday.indexOf(elem) == pos;
                  });

                  for (var d in rrule.byday) {
                    if (BYDAY_VALUES.indexOf(rrule.byday[d]) < 0) {
                      throw "Recurrence rule 'byday' values must include only the following: 'SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'";
                    }
                  }
                }
              }
            }

            //TODO add time and time zone? use moment to format?
            var start_date = new Date(begin);
            var end_date = new Date(stop);

            var start_year = ("0000" + (start_date.getFullYear().toString())).slice(-4);
            var start_month = ("00" + ((start_date.getMonth() + 1).toString())).slice(-2);
            var start_day = ("00" + ((start_date.getDate()).toString())).slice(-2);
            var start_hours = ("00" + (start_date.getHours().toString())).slice(-2);
            var start_minutes = ("00" + (start_date.getMinutes().toString())).slice(-2);
            var start_seconds = ("00" + (start_date.getSeconds().toString())).slice(-2);

            var end_year = ("0000" + (end_date.getFullYear().toString())).slice(-4);
            var end_month = ("00" + ((end_date.getMonth() + 1).toString())).slice(-2);
            var end_day = ("00" + ((end_date.getDate()).toString())).slice(-2);
            var end_hours = ("00" + (end_date.getHours().toString())).slice(-2);
            var end_minutes = ("00" + (end_date.getMinutes().toString())).slice(-2);
            var end_seconds = ("00" + (end_date.getSeconds().toString())).slice(-2);

            // Since some calendars don't add 0 second events, we need to remove time if there is none...
            var start_time = '';
            var end_time = '';
            if (start_minutes + start_seconds + end_minutes + end_seconds !== 0) {
                start_time = 'T' + start_hours + start_minutes + start_seconds;
                end_time = 'T' + end_hours + end_minutes + end_seconds;
            }

            var start = start_year + start_month + start_day + start_time;
            var end = end_year + end_month + end_day + end_time;

            // recurrence rule vars
            var rruleString;
            if (rrule) {
              if (rrule.rule) {
                rruleString = rrule.rule;
              } else {
                rruleString = 'RRULE:FREQ=' + rrule.freq;

                if (rrule.until) {
                  var uDate = new Date(Date.parse(rrule.until)).toISOString();
                  rruleString += ';UNTIL=' + uDate.substring(0, uDate.length - 13).replace(/[-]/g, '') + '000000Z';
                }

                if (rrule.interval) {
                  rruleString += ';INTERVAL=' + rrule.interval;
                }

                if (rrule.count) {
                  rruleString += ';COUNT=' + rrule.count;
                }

                if (rrule.byday && rrule.byday.length > 0) {
                  rruleString += ';BYDAY=' + rrule.byday.join(',');
                }
              }
            }

            var stamp = new Date().toISOString();

            var calendarEvent = [
                'BEGIN:VEVENT',
                'CLASS:PUBLIC',
                'DESCRIPTION:' + description.replace('\r\n', '\\n'),
                'DTSTART:' + start,
                'DTEND:' + end,
                'DTSTAMP:' + stamp.substring(0, stamp.length - 13).replace(/[-]/g, '') + '000000Z',
                'LOCATION:' + location,
                'SUMMARY;LANGUAGE=en-us:' + subject,
                'TRANSP:TRANSPARENT',
                'END:VEVENT'
            ];

            if (rruleString) {
              calendarEvent.splice(4, 0, rruleString);
            }

            calendarEvent = calendarEvent.join(SEPARATOR);

            calendarEvents.push(calendarEvent);
            return calendarEvent;
        },

        /**
         * Download calendar using the saveAs function from filesave.js
         * @param  {string} filename Filename
         * @param  {string} ext      Extention
         */
        'download': function(filename, ext) {
            if (calendarEvents.length < 1) {
                return false;
            }

            ext = (typeof ext !== 'undefined') ? ext : '.ics';
            filename = (typeof filename !== 'undefined') ? filename : 'calendar';
            var calendar = calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;

            var blob;
            if (navigator.userAgent.indexOf('MSIE 10') === -1) { // chrome or firefox
                blob = new Blob([calendar]);
            } else { // ie
                var bb = new BlobBuilder();
                bb.append(calendar);
                blob = bb.getBlob('text/x-vCalendar;charset=' + document.characterSet);
            }
            saveAs(blob, filename + ext);
            return calendar;
        }
    };
};
