import {ValidatedMethod} from 'meteor/mdg:validated-method';
//import {ValidationError}from 'meteor/mdg:validation-error'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Roles} from 'meteor/alanning:roles';

import Timer from '/imports/api/timer';
//import GameType from '../gameType/index.js';

import _ from 'underscore';
import {Meteor} from 'meteor/meteor';
import validatedError from './validated-error.js';


export default  new ValidatedMethod({
  name: 'timer.create',
  validate: new SimpleSchema({
    _id: {type:String, optional:true},
    name:{type:String},
    timer:{type:String, allowedValues:["interval", "timeout"]},
    type:{type:String},
    time:{type:Number},
    delay:{type:Number},
    //playerId: {type: String}
  //  status:{type:Boolean}
  }).validator(),
  run({ name, timer, type, _id, time, delay}) {

    if(this.userId){

      if(_id){
        return Timer.update({_id:_id},{$set: {name:name, timer: timer, type: type, time:time, delay:delay, updatedBy: this.userId, updatedAt: new Date()}});
      }else{
        return Timer.insert({name:name, timer:timer, type: type, time:time, delay:delay, createdBy: this.userId, createdAt: new Date()});
      }

    }
      else {
        validatedError.server();
      }
  }
})
