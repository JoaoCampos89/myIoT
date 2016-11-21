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
    type:{type:String, allowedValues:["trigger", "scheduled"]},
    time:{type:Number},
    duration:{type:Number},
    timeInit: {type: Date, optional:true},
    timeFinal: {type: Date, optional:true},
    //playerId: {type: String}
    //  status:{type:Boolean}
  }).validator(),
  //run({ name, timer, type, _id, time,  timeInit, timeFinal})
  run(data) {

      //console.log(data);
    if(this.userId){

      if(data._id){
      //  return Timer.update({_id:_id},{$set: {name:name, timer: timer, type: type, time:time,
        //  updatedBy: this.userId, timeInit:timeInit, timeFinal:timeFinal, updatedAt: new Date()}});
              data.updatedBy = this.userId;
              data.updatedAt = new Date();
              return Timer.update({_id: data._id}, data);
      }else{
        //return Timer.insert({name: name, timer: timer, type: type, time: time,
        //   timeInit: timeInit, timeFinal: timeFinal, createdBy: this.userId, createdAt: new Date()});
          data.createdBy = this.userId;
          data.createdAt = new Date();
        return Timer.insert(data)
      }

    }
      else {
        validatedError.server();
      }
  }
})
