VCS-Maker.js
============

A browser firendly VCS file generator written entirely in javascript!!!!!!

Now you can make calendar friendly files client-side.  It outputs VCS files, so the files are compatible with all modern calendar software (Outlook, Apple Calendar, Google, etc.)

How To Use
-------
Simply use the function...

    download_vcs(filename, subject, description, location, begin, end);
    
`begin` and `end` need to be formatted in a way that is friendly to `Date()`

Dependancies
---
The tool uses 2 libraries from the following projects:
* FileSaver.js (https://github.com/eligrey/FileSaver.js)
* Blob.js (https://github.com/eligrey/Blob.js)

I've compressed them and included them into the source for the normal file.  Other variations are available in the repo.

If you want IE to allow for either opening documents as well as saving documents, you can use my fork of FileSaver.js (https://github.com/nwcell/FileSaver.js)
