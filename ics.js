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
	var start_month = ("00" + ((start_date.getMonth()+1).toString())).slice(-2);
	var start_day = ("00" + (start_date.getDate().toString())).slice(-2);
	var start_hour = ("00" + (start_date.getHours().toString())).slice(-2);
	var start_minute = ("00" + (start_date.getMinutes().toString())).slice(-2);
	var start = start_year + start_month + start_day + "T" + start_hour + start_minute + "00";

	var end_year = ("0000" + (end_date.getFullYear().toString())).slice(-4);
	var end_month = ("00" + ((end_date.getMonth()+1).toString())).slice(-2);
	var end_day = ("00" + ((end_date.getDate()).toString())).slice(-2);
	var end_hour = ("00" + (end_date.getHours().toString())).slice(-2);
	var end_minute = ("00" + (end_date.getMinutes().toString())).slice(-2);
	var end = end_year + end_month + end_day + "T" + end_hour + end_minute + "00";

	var calendar = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"BEGIN:VEVENT",
		"CLASS:PUBLIC",
		"DESCRIPTION:"+description,
		"DTSTART:"+start,
		"DTEND:"+end,
		"LOCATION:"+address,
		"SUMMARY:"+subject,
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
