import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
const Timeline = new Mongo.Collection("target");





Timeline.allow({
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

// schema used by Target
Timeline.schema = new SimpleSchema({
  targetId: {
    type: Number,
    label: "Target Id"
  },
  status:{
    type: Boolean,
    label: 'hit'
  }
});





export default Timeline;
