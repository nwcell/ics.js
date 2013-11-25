// Demo
var cal = ics();
cal.addEvent('Christmas', 'Christian holiday celebrating the birth of Jesus Christ', 'Bethlehem', '12/25/2013', '12/25/2013');
cal.addEvent('Christmas', 'Christian holiday celebrating the birth of Jesus Christ', 'Bethlehem', '12/25/2014', '12/25/2014');
console.log('Events\n' + cal.events());
console.log('Calendar\n' + cal.calendar());