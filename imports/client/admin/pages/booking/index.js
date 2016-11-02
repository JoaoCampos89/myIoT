import './index.html';
import {Template} from 'meteor/templating';
import Calendar from '/imports/api/calendar';
import {Modal} from 'meteor/peppelg:bootstrap-3-modal';
import './modal';

Template.adminBookingPage.onCreated(function() {
  var template = this;
  //TODO implement subscribe
/*  template.autorun(function() {
    template.subscribe("admin.booking.room", {
      id: 1
    });
  });
*/

});

/*Template.adminBookingPage.helpers({
  calendarOptions: {
    // Standard fullcalendar options
    height: 700,
    hiddenDays: [0],
    slotDuration: '01:00:00',
    minTime: '08:00:00',
    maxTime: '19:00:00',
    lang: 'pt-Br',
    // Function providing events reactive computation for fullcalendar plugin
    events: function(start, end, timezone, callback) {
      //console.log(start);
      //console.log(end);
      //console.log(timezone);
      var events = [];
      // Get only events from one document of the Calendars collection
      // events is a field of the Calendars collection document
      var calendar = Calendar.findOne({
        room: 1
      });
      // events need to be an array of subDocuments:
      // each event field named as fullcalendar Event Object property is automatically used by fullcalendar
      if (calendar && calendar.events) {
        calendar.events.forEach(function(event) {
          eventDetails = {};
          for (key in event)
            eventDetails[key] = event[key];
          events.push(eventDetails);
        });
      }
      callback(events);
    },
    // Optional: id of the calendar
    id: "calendar1",
    // Optional: Additional classes to apply to the calendar
    addedClasses: "col-md-8",
    // Optional: Additional functions to apply after each reactive events computation
    autoruns: [
      function() {
        console.log("user defined autorun function executed!");
      }
    ]
  },
});
*/


Template.adminBookingPage.onRendered(function() {


  var template = this;
  template.$('#myCalendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    defaultDate: new Date().getTime(),
    selectable: true,
    selectHelper: true,
    select: function(start, end) {
      console.log("selected");
      Modal.show('adminBookingCreateEventModal',{startEvent:start,endEvent:end});


      /*var title = prompt('Event Title:');
      var eventData;
      if (title) {
        eventData = {
          title: title,
          start: start,
          end: end
        };
        template.$('#myCalendar').fullCalendar('renderEvent',
          eventData, true); // stick? = true
      }
      template.$('#myCalendar').fullCalendar('unselect');*/
    },
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: function(start, end, timezone, callback) {
      //console.log(start);
      //console.log(end);
      //console.log(timezone);
      var events = [];
      // Get only events from one document of the Calendars collection
      // events is a field of the Calendars collection document
      var calendar = Calendar.findOne({
        room: 1
      });

      // events need to be an array of subDocuments:
      // each event field named as fullcalendar Event Object property is automatically used by fullcalendar
      if (calendar && calendar.events) {
        /*  calendar.events.forEach(function(event) {
            eventDetails = {};
            for (key in event) {
              eventDetails[key] = event[key];
            }
            events.push(eventDetails);
          });*/
        events = calendar.events;
      }


      callback(events);
    },
    eventClick: function(event, element) {

      event.title = "CLICKED!";

      template.$('#myCalendar').fullCalendar('updateEvent', event);

    }
  });

  template.autorun(function() {
    template.$("#myCalendar").fullCalendar('refetchEvents');

    /*  events = Calendar.findOne({
        room: 1
      }).events;

      template.$('#myCalendar').fullCalendar({
        events: [events]
      });*/
  });


});
