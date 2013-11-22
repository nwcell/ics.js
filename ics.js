/* global saveAs */
/* global Blob */
/* global BlobBuilder */
/* global console */
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

	return {
		/**
		 * Returns events array
		 * @return {array} Events
		 */
		'events' : function () {
			return calendarEvents;
		},

		/**
		 * Returns calendar
		 * @return {string} Calendar in iCalendar format
		 */
		'calendar' : function () {
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
		'addEvent' : function (subject, description, location, begin, stop) {
			//TODO add time and time zone? use moment to format?
			var start_date = new Date(begin);
			var end_date = new Date(stop);

			var start_year = ('0000' + (start_date.getFullYear().toString())).slice(-4);
			var start_month = ('00' + (start_date.getMonth().toString())).slice(-2);
			var start_day = ('00' + (start_date.getDate().toString())).slice(-2);
			var start = start_year + (Number(start_month)+1) + start_day;

			var end_year = ('0000' + (end_date.getFullYear().toString())).slice(-4);
			var end_month = ('00' + (end_date.getMonth().toString())).slice(-2);
			var end_day = ('00' + (end_date.getDate().toString())).slice(-2);
			var end = end_year + (Number(end_month)+1) + end_day;

			var calendarEvent = [
				'BEGIN:VEVENT',
				'CLASS:PUBLIC',
				'DESCRIPTION:'+description,
				'DTSTART;VALUE=DATE:'+start,
				'DTEND;VALUE=DATE:'+end,
				'LOCATION:'+location,
				'SUMMARY;LANGUAGE=en-us:'+subject,
				'TRANSP:TRANSPARENT',
				'END:VEVENT'
			].join(SEPARATOR);

			calendarEvents.push(calendarEvent);
		},

		/**
		 * Download calendar using the saveAs function from filesave.js
		 * @param  {string} filename Filename
		 * @param  {string} ext      Extention
		 */
		'download' : function (filename, ext) {
			ext = (typeof ext !== 'undefined') ? ext : '.ics';
			filename = (typeof filename !== 'undefined') ? filename : 'calendar';
			var calendar = calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;

			var blob;
			if (navigator.userAgent.indexOf('MSIE 10') === -1) { // chrome or firefox
				blob = new Blob([calendar]);
			}
			else  { // ie
				var bb = new BlobBuilder();
				bb.append(calendar);
				blob = bb.getBlob('text/x-vCalendar;charset=' + document.characterSet);
			}
			saveAs(blob, filename+ext);
		}
	};
};
