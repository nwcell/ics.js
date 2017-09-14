ics.js
============

A browser friendly .ics/.vcs file generator written entirely in JavaScript!

Now you can make calendar friendly files client-side.  It outputs .ics files, so the files are compatible with all modern calendar software (Outlook, Apple Calendar, Google, etc.)

How To Use
----------
Simply use invoke the object and use the functions...

	var cal = ics();
	cal.addEvent(subject, description, location, begin, end);
	cal.addEvent(subject, description, location, begin, end); // yes, you can have multiple events :-)
    cal.download(filename);

`begin` and `end` need to be formatted in a way that is friendly to `Date()`


Recurring Events
----------------
Recurring events can be added with the `rrule` object.

`cal.addEvent(subject, description, location, begin, end, rrule)`

The `rrule` object has the following properties:

- `freq` : __Required.__ The frequency of event recurrence. Can be `DAILY`, `WEEKLY`, `MONTHLY`, or `YEARLY`.
- `until` : A date string representing the date on which to end repitition.  Must be friendly to `Date()`
- `count` : Alternative to until.  Repeat the event `count` times.  Must be an integer
- `interval` : The interval of `freq` to recur at.  For example, if `freq` is `WEEKLY` and `interval` is `2`, the event will repeat every 2 weeks.  Must be an integer.
- `byday` : Which days of the week the event is to occur. An array containing any of `SU`, `MO`, `TU`, `WE`, `TH`, `FR`, `SA`.

The four properties described above are not exhaustive of recurrence rule capabilities.  If extra functionality is required, you can set the `rrule.rule` property to a full recurrence rule string.  In this case, none of the four properties described above are necessary.  See [this page](http://www.kanzaki.com/docs/ical/rrule.html) for a description of recurrence rules.


Example
-------
* **[Demo](https://rawgit.com/nwcell/ics.js/master/demo/demo.html)**

```
<script>
	var cal = ics();
	cal.addEvent('Demo Event', 'This is an all day event', 'Nome, AK', '8/7/2013', '8/7/2013');
	cal.addEvent('Demo Event', 'This is thirty minute event', 'Nome, AK', '8/7/2013 5:30 pm', '8/7/2013 6:00 pm');
</script>
<a href="javascript:cal.download()">Demo</a>
```


Dependencies
------------
The tool uses 2 libraries from the following projects:
* [FileSaver.js](https://github.com/eligrey/FileSaver.js)
* [Blob.js](https://github.com/eligrey/Blob.js)

I've compressed them and included them into the source for the normal file.  Other variations are available in the repo.

If you want IE to allow for either opening documents as well as saving documents, you can use my fork of FileSaver.js (https://github.com/nwcell/FileSaver.js)...  Though you honestly are probebly best off using their main.

Supported Browsers
------------------

| Browser        | Dependancies |
| -------------- | ------------ |
| Firefox 20+    | [FileSaver.js](https://github.com/eligrey/FileSaver.js) |
| Firefox ≤ 19   | [FileSaver.js](https://github.com/eligrey/FileSaver.js), [Blob.js](https://github.com/eligrey/Blob.js) |
| Chrome         | [FileSaver.js](https://github.com/eligrey/FileSaver.js) |
| Chrome for Android v28+ | [FileSaver.js](https://github.com/eligrey/FileSaver.js) |
| IE 10+         | [FileSaver.js](https://github.com/eligrey/FileSaver.js)         |
| Opera Next     | [FileSaver.js](https://github.com/eligrey/FileSaver.js) |
| Opera < 15     | [FileSaver.js](https://github.com/eligrey/FileSaver.js), [Blob.js](https://github.com/eligrey/Blob.js) |
| Safari ≤ 6     | [FileSaver.js](https://github.com/eligrey/FileSaver.js), [Blob.js](https://github.com/eligrey/Blob.js) |


Credits
------------------
* [Travis Krause](https://github.com/nwcell): Me
* [Kyle Hornberg](https://github.com/khornberg): Added multi event functionality and made everything a package firendly
