import {ValidatedMethod} from 'meteor/mdg:validated-method';
//import {ValidationError}from 'meteor/mdg:validation-error'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Roles} from 'meteor/alanning:roles';

import Sensor from '/imports/api/mysensors-hardware/sensor-db';
//import GameType from '../gameType/index.js';

import _ from 'underscore';
import {Meteor} from 'meteor/meteor';
import validatedError from './validated-error.js';


export default  new ValidatedMethod({
  name: 'user-sensor.create',
  validate: new SimpleSchema({
    _id: {type:String, optional:true},
    controlId:{type: String},
    control:{type:String, allowedValues:["U_BUTTON", "U_SLIDER", "U_TEXT", "U_SELECT", "U_RADIO"]},
    //playerId: {type: String}
  //  status:{type:Boolean}
  }).validator(),
  run({ _id, controlId, control}) {

    if(this.userId){
        if(_id){
          return Sensor.update({_id:_id},{$set: {controlId:controlId, type:"user-control", control:control, updatedBy:this.userId, updatedAt: new Date()}});
        }else{
          return Sensor.insert({controlId:controlId, type:"user-control", control:control, createdBy:this.userId, createdAt: new Date()});
        }

    }
      else {
        validatedError.server();
      }
  }
})
