import {Mongo} from 'meteor/mongo';


const Calendar = new Mongo.Collection("calendar");


/*Calendar.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  }
});
*/
export default Calendar;
