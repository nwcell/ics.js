/*  VCS-Maker.js  */
download_ics = function(filename, subject, description, location, begin, end, ext) {
	var ext = typeof ext !== 'undefined' ? ext : '.ics';

	if (navigator.userAgent.indexOf('MSIE') > -1 && navigator.userAgent.indexOf('MSIE 10') == -1) {
		console.log('Unsupported Browser');
		return;
	};

	var subject = subject;
	var description = description;
	var address = location;
	var start_date = new Date(begin);
	var end_date = new Date(end);

	var start_year = ("0000" + (start_date.getFullYear().toString())).slice(-4);
	var start_month = ("00" + (start_date.getMonth().toString())).slice(-2);
	var start_day = ("00" + (start_date.getDate().toString())).slice(-2);
	var start = start_year + start_month + start_day;

	var end_year = ("0000" + (end_date.getFullYear().toString())).slice(-4);
	var end_month = ("00" + (end_date.getMonth().toString())).slice(-2);
	var end_day = ("00" + ((end_date.getDate()+1).toString())).slice(-2);
	var end = end_year + end_month + end_day;

	var calendar = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"BEGIN:VEVENT",
		"CLASS:PUBLIC",
		"DESCRIPTION:"+description,
		"DTSTART;VALUE=DATE:"+start,
		"DTEND;VALUE=DATE:"+end,
		"LOCATION:"+address,
		"SUMMARY;LANGUAGE=en-us:"+subject,
		"TRANSP:TRANSPARENT",
		"END:VEVENT",
		"END:VCALENDAR"
	].join('\n');

	if (navigator.userAgent.indexOf('MSIE 10') > -1) { // chrome or firefox
		var blob = new Blob([calendar]);
	}
	else  { // ie
		var bb = new BlobBuilder();
		bb.append(calendar);
		var blob = bb.getBlob("text/x-vCalendar;charset=" + document.characterSet);
	}
	saveAs(blob, filename+ext);
}
