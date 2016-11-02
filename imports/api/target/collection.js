
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
const Target = new Mongo.Collection("target");

export default Target;



Target.allow({
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
Target.schema = new SimpleSchema({
  targetId: {
    type: Number,
    label: "Target Id"
  },
  status:{
    type: Boolean,
    label: 'hit'
  }
});


//Target.attachSchema(Target.schema);
