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
                assert.strictEqual(cal.calendar(), 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\n\r\nEND:VCALENDAR', 'calendar does not match');
            });
        });
    });
    describe('Add 1 Event', function () {
        describe('Calendar Events Array', function () {
            it('should have one event', function () {
                cal.addEvent('Christmas', 'Christian holiday celebrating the birth of Jesus Christ', 'Bethlehem', '12/25/2013', '12/25/2013');
                assert.isArray(cal.events(), 'calendarEvents not an array');
                assert.lengthOf(cal.events(), '1');
                assert.strictEqual(cal.events()[0], 'BEGIN:VEVENT\r\nCLASS:PUBLIC\r\nDESCRIPTION:Christian holiday celebrating the birth of Jesus Christ\r\nDTSTART;VALUE=DATE:20131225\r\nDTEND;VALUE=DATE:20131225\r\nLOCATION:Bethlehem\r\nSUMMARY;LANGUAGE=en-us:Christmas\r\nTRANSP:TRANSPARENT\r\nEND:VEVENT');
            });
        });
        describe('Calendar String', function () {
            it('should have one event', function () {
                assert.strictEqual(cal.calendar(), 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nCLASS:PUBLIC\r\nDESCRIPTION:Christian holiday celebrating the birth of Jesus Christ\r\nDTSTART;VALUE=DATE:20131225\r\nDTEND;VALUE=DATE:20131225\r\nLOCATION:Bethlehem\r\nSUMMARY;LANGUAGE=en-us:Christmas\r\nTRANSP:TRANSPARENT\r\nEND:VEVENT\r\nEND:VCALENDAR', 'calendar does not match');
            });
        });
        describe('Calendar String of Single Digit Months', function () {
            it('should have one event', function () {
                cal.addEvent('Easter', 'Christian holiday celebrating the resurrection of Jesus Christ', 'Jerusalem', '04/20/2014', '04/20/2014');
                assert.strictEqual(cal.events()[1], 'BEGIN:VEVENT\r\nCLASS:PUBLIC\r\nDESCRIPTION:Christian holiday celebrating the resurrection of Jesus Christ\r\nDTSTART;VALUE=DATE:20140420\r\nDTEND;VALUE=DATE:20140420\r\nLOCATION:Jerusalem\r\nSUMMARY;LANGUAGE=en-us:Easter\r\nTRANSP:TRANSPARENT\r\nEND:VEVENT');
            });
        });
        describe('Calendar String of Single Digit Day', function () {
            it('should have one event', function () {
                cal.addEvent('April Fools Day', 'What isn\'t is', 'America', '4/1/2014', '4/1/2014');
                assert.strictEqual(cal.events()[2], 'BEGIN:VEVENT\r\nCLASS:PUBLIC\r\nDESCRIPTION:What isn\'t is\r\nDTSTART;VALUE=DATE:20140401\r\nDTEND;VALUE=DATE:20140401\r\nLOCATION:America\r\nSUMMARY;LANGUAGE=en-us:April Fools Day\r\nTRANSP:TRANSPARENT\r\nEND:VEVENT');
            });
        });
    });
    describe('Issues #8 validation', function () {
        describe('Event with Times that are different', function () {
            it('should have times even if the start and end time are both exactly on the hour.', function () {
                cal.addEvent('Boxing Day', 'Did your boss give you a present today?', 'Commonwealth nations', '12/26/2014 12:00:00 AM', '12/26/2014 11:00:00 PM');
                assert.strictEqual(cal.events()[3], 'BEGIN:VEVENT\r\nCLASS:PUBLIC\r\nDESCRIPTION:Did your boss give you a present today?\r\nDTSTART;VALUE=DATE:20141226T000000\r\nDTEND;VALUE=DATE:20141226T230000\r\nLOCATION:Commonwealth nations\r\nSUMMARY;LANGUAGE=en-us:Boxing Day\r\nTRANSP:TRANSPARENT\r\nEND:VEVENT');
            });
        });
        describe('Event with Times that are the SAME', function () {
            it('should have NO times since the start date/time is the same as the end date/time', function () {
                cal.addEvent('Boxing Day', 'Did your boss give you a present today?', 'Commonwealth nations', '12/26/2014 12:00:00 AM', '12/26/2014 12:00:00 AM');
                assert.strictEqual(cal.events()[4], 'BEGIN:VEVENT\r\nCLASS:PUBLIC\r\nDESCRIPTION:Did your boss give you a present today?\r\nDTSTART;VALUE=DATE:20141226\r\nDTEND;VALUE=DATE:20141226\r\nLOCATION:Commonwealth nations\r\nSUMMARY;LANGUAGE=en-us:Boxing Day\r\nTRANSP:TRANSPARENT\r\nEND:VEVENT');
            });
        });
    });
})();
