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
    <a href="javascript:download_ics('demo', 'Demo Event', 'This is an awesome demo event', 'Sexy Land, AK', '8/7/2013', '8/9/2013')">Demo</a>

Dependencies
------------
The tool uses 2 libraries from the following projects:
* [FileSaver.js](https://github.com/eligrey/FileSaver.js)
* [Blob.js](https://github.com/eligrey/Blob.js)

I've compressed them and included them into the source for the normal file.  Other variations are available in the repo.

If you want IE to allow for either opening documents as well as saving documents, you can use my fork of FileSaver.js (https://github.com/nwcell/FileSaver.js)

Supported Browsers
------------------

| Browser        | Constructs as | Filenames    | Size       | Dependancies |
| -------------- | ------------- | ------------ | ---------- | ------------ |
| Firefox 20+    | Blob          | Yes          | 800MiB/per | [FileSaver.js](https://github.com/eligrey/FileSaver.js) |
| Firefox ≤ 19   | data: URI     | No           |            | [FileSaver.js](https://github.com/eligrey/FileSaver.js), [Blob.js](https://github.com/eligrey/Blob.js) |
| Chrome         | Blob          | Yes          | 345MiB/per | [FileSaver.js](https://github.com/eligrey/FileSaver.js) |
| Chrome for Android v28+ | Blob      | Yes          |            | [FileSaver.js](https://github.com/eligrey/FileSaver.js) |
| IE 10+         | Blob          | Yes          | 600MiB/per | [FileSaver.js](https://github.com/eligrey/FileSaver.js)         |
| Opera Next     | Blob          | Yes          |            | [FileSaver.js](https://github.com/eligrey/FileSaver.js) |
| Opera < 15     | data: URI     | No           |            | [FileSaver.js](https://github.com/eligrey/FileSaver.js), [Blob.js](https://github.com/eligrey/Blob.js) |
| Safari ≤ 6     | data: URI     | No           |            | [FileSaver.js](https://github.com/eligrey/FileSaver.js), [Blob.js](https://github.com/eligrey/Blob.js) |
