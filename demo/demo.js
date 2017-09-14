// Demo
cal = ics();
cal.addEvent('Christmas', 'Christian holiday celebrating the birth of Jesus Christ', 'Bethlehem', '12/25/2013', '12/25/2013');
cal.addEvent('Christmas', 'Christian holiday celebrating the birth of Jesus Christ', 'Bethlehem', '12/25/2014', '12/25/2014');
cal.addEvent('New Years', 'Watch the ball drop!', 'New York', '01/01/2015', '01/01/2015');
cal.addEvent('New Years', 'Watch the ball drop!', 'New York', '01/01/2016', '01/01/2016');

cal_single = ics();
cal_single.addEvent('Best Day', 'This is the best day to demonstrate a single event.', 'New York', '11/12/1987', '11/12/1987');


// You can use this for easy debugging
makelogs = function(obj) {
  console.log('Events Array');
  console.log('=================');
  console.log(obj.events());
  console.log('Calendar With Header');
  console.log('=================');
  console.log(obj.calendar());
}
