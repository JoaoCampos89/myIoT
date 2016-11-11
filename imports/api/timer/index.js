import {Mongo} from 'meteor/mongo';


const Timer = new Mongo.Collection("timer");
Timer.allow({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  }
});


export default Timer;
