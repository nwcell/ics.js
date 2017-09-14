/* global saveAs, Blob, BlobBuilder, console */
/* exported ics */

var ics = function(uidDomain, prodId) {
  'use strict';

  if (navigator.userAgent.indexOf('MSIE') > -1 && navigator.userAgent.indexOf('MSIE 10') == -1) {
    console.log('Unsupported Browser');
    return;
  }

  if (typeof uidDomain === 'undefined') { uidDomain = 'default'; }
  if (typeof prodId === 'undefined') { prodId = 'Calendar'; }

  var SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
  var calendarEvents = [];
  var calendarStart = [
    'BEGIN:VCALENDAR',
    'PRODID:' + prodId,
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
    'addEvent': function(subject, description, location, begin, stop, rule) {
      // I'm not in the mood to make these optional... So they are all required
      if (typeof subject === 'undefined' ||
        typeof description === 'undefined' ||
        typeof location === 'undefined' ||
        typeof begin === 'undefined' ||
        typeof stop === 'undefined'
      ) {
        return false;
      }

      // validate rule
      if (rule) {
        if (!rule.rule) {
          if (rule.freq !== 'YEARLY' && rule.freq !== 'MONTHLY' && rule.freq !== 'WEEKLY' && rule.freq !== 'DAILY') {
            throw "Recurrence rule frequency must be provided and be one of the following: 'YEARLY', 'MONTHLY', 'WEEKLY', or 'DAILY'";
          }

          if (rule.until) {
            if (isNaN(Date.parse(rule.until))) {
              throw "Recurrence rule 'until' must be a valid date string";
            }
          }

          if (rule.interval) {
            if (isNaN(parseInt(rule.interval))) {
              throw "Recurrence rule 'interval' must be an integer";
            }
          }

          if (rule.count) {
            if (isNaN(parseInt(rule.count))) {
              throw "Recurrence rule 'count' must be an integer";
            }
          }

          if (typeof rule.byday !== 'undefined') {
            if ((Object.prototype.toString.call(rule.byday) !== '[object Array]')) {
              throw "Recurrence rule 'byday' must be an array";
            }

            if (rule.byday.length > 7) {
              throw "Recurrence rule 'byday' array must not be longer than the 7 days in a week";
            }

            // Filter any possible repeats
            rule.byday = rule.byday.filter(function(elem, pos) {
              return rule.byday.indexOf(elem) == pos;
            });

            for (var d in rule.byday) {
              if (BYDAY_VALUES.indexOf(rule.byday[d]) < 0) {
                throw "Recurrence rule 'byday' values must include only the following: 'SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'";
              }
            }
          }
        }
      }

      //TODO add time and time zone? use moment to format?
      var start_date = new Date(begin);
      var end_date = new Date(stop);
      var now_date = new Date();

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
      var end_seconds = ("00" + (end_date.getMinutes().toString())).slice(-2);

      var now_year = ("0000" + (now_date.getFullYear().toString())).slice(-4);
      var now_month = ("00" + ((now_date.getMonth() + 1).toString())).slice(-2);
      var now_day = ("00" + ((now_date.getDate()).toString())).slice(-2);
      var now_hours = ("00" + (now_date.getHours().toString())).slice(-2);
      var now_minutes = ("00" + (now_date.getMinutes().toString())).slice(-2);
      var now_seconds = ("00" + (now_date.getMinutes().toString())).slice(-2);

      // Since some calendars don't add 0 second events, we need to remove time if there is none...
      var start_time = '';
      var end_time = '';
      if (start_hours + start_minutes + start_seconds + end_hours + end_minutes + end_seconds != 0) {
        start_time = 'T' + start_hours + start_minutes + start_seconds;
        end_time = 'T' + end_hours + end_minutes + end_seconds;
      }
      var now_time = 'T' + now_hours + now_minutes + now_seconds;

      var start = start_year + start_month + start_day + start_time;
      var end = end_year + end_month + end_day + end_time;
      var now = now_year + now_month + now_day + now_time;

      // recurrence rule vars
      var ruleString;
      if (rule) {
        if (rule.rule) {
          ruleString = rule.rule;
        } else {
          ruleString = 'rule:FREQ=' + rule.freq;

          if (rule.until) {
            var uDate = new Date(Date.parse(rule.until)).toISOString();
            ruleString += ';UNTIL=' + uDate.substring(0, uDate.length - 13).replace(/[-]/g, '') + '000000Z';
          }

          if (rule.interval) {
            ruleString += ';INTERVAL=' + rule.interval;
          }

          if (rule.count) {
            ruleString += ';COUNT=' + rule.count;
          }

          if (rule.byday && rule.byday.length > 0) {
            ruleString += ';BYDAY=' + rule.byday.join(',');
          }
        }
      }

      var stamp = new Date().toISOString();

      var calendarEvent = [
        'BEGIN:VEVENT',
        'UID:' + calendarEvents.length + "@" + uidDomain,
        'CLASS:PUBLIC',
        'DESCRIPTION:' + description,
        'DTSTAMP;VALUE=DATE-TIME:' + now,
        'DTSTART;VALUE=DATE-TIME:' + start,
        'DTEND;VALUE=DATE-TIME:' + end,
        'LOCATION:' + location,
        'SUMMARY;LANGUAGE=en-us:' + subject,
        'TRANSP:TRANSPARENT',
        'END:VEVENT'
      ];

      if (ruleString) {
        calendarEvent.splice(4, 0, ruleString);
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
    },

    /**
     * Build and return the ical contents
     */
    'build': function() {
      if (calendarEvents.length < 1) {
        return false;
      }

      var calendar = calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;

      return calendar;
    }
  };
};
