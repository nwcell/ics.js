/*global describe, it, cal, assert */

(function () {
    'use strict';
    describe('Load ics Object', function () {
        describe('Calendar Events Array', function () {
            it('should be an empty array initially', function () {
                assert.isArray(cal.events(), 'calendarEvents not an array');
                assert.lengthOf(cal.events(), '0');
            });
        });
        describe('Calendar String', function () {
            it('should be a string with no events', function () {
                assert.strictEqual(cal.calendar(), 'BEGIN:VCALENDAR\nVERSION:2.0\n\nEND:VCALENDAR', 'calendar does not match');
            });
        });
    });
    describe('Add 1 Event', function () {
        describe('Calendar Events Array', function () {
            it('should have one event', function () {
                cal.addEvent('Christmas', 'Christian holiday celebrating the birth of Jesus Christ', 'Bethlehem', '12/25/2013', '12/25/2013');
                assert.isArray(cal.events(), 'calendarEvents not an array');
                assert.lengthOf(cal.events(), '1');
                assert.strictEqual(cal.events()[0], 'BEGIN:VEVENT\nCLASS:PUBLIC\nDESCRIPTION:Christian holiday celebrating the birth of Jesus Christ\nDTSTART;VALUE=DATE:20131225\nDTEND;VALUE=DATE:20131225\nLOCATION:Bethlehem\nSUMMARY;LANGUAGE=en-us:Christmas\nTRANSP:TRANSPARENT\nEND:VEVENT');
            });
        });
        describe('Calendar String', function () {
            it('should have one event', function () {
                assert.strictEqual(cal.calendar(), 'BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nCLASS:PUBLIC\nDESCRIPTION:Christian holiday celebrating the birth of Jesus Christ\nDTSTART;VALUE=DATE:20131225\nDTEND;VALUE=DATE:20131225\nLOCATION:Bethlehem\nSUMMARY;LANGUAGE=en-us:Christmas\nTRANSP:TRANSPARENT\nEND:VEVENT\nEND:VCALENDAR', 'calendar does not match');
            });
        });
    });
})();
