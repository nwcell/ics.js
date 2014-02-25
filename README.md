ics.js
============

A browser firendly .ics/.vcs file generator written entirely in javascript!!!!!!

Now you can make calendar friendly files client-side.  It outputs .ics files, so the files are compatible with all modern calendar software (Outlook, Apple Calendar, Google, etc.)

How To Use
----------
Simply use the function...

    download_ics(filename, subject, description, location, begin, end);

`begin` and `end` need to be formatted in a way that is friendly to `Date()`


Example
-------
* **[Demo](http://htmlpreview.github.io/?https://github.com/nwcell/ics.js/blob/master/demo/demo.html)**

```
<a href="javascript:download_ics('demo', 'Demo Event', 'This is an awesome demo event. Won't you go to Sexy Land?', 'Sexy Land, AK', 'Tue Feb 25 2014 09:30:00 GMT-0600 (CST)', 'Tue Feb 25 2014 10:30:00 GMT-0600 (CST)')">Demo</a>
```


Dependencies
------------
The tool uses 2 libraries from the following projects:
* [FileSaver.js](https://github.com/eligrey/FileSaver.js)
* [Blob.js](https://github.com/eligrey/Blob.js)

I've compressed them and included them into the source for the normal file.  Other variations are available in the repo.

If you want IE to allow for either opening documents as well as saving documents, you can use my fork of FileSaver.js (https://github.com/nwcell/FileSaver.js)

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
