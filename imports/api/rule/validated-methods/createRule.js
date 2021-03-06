import {ValidatedMethod} from 'meteor/mdg:validated-method';
//import {ValidationError}from 'meteor/mdg:validation-error'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Roles} from 'meteor/alanning:roles';

//import GameType from '../gameType/index.js';
import {protocol} from '/imports/api/myiot-api/protocol';
import Rule from '../index.js';
import _ from 'underscore';
import {Meteor} from 'meteor/meteor';
import validatedError from './validated-error.js';
import {transformRules} from './transformData.js';





export default  new ValidatedMethod({
  name: 'rule.create-rule',
  validate: new SimpleSchema({
        _id: {type:String, optional:true},
        name: {type: String},
        rules: {type: [Object], blackbox:true},
        actions: {type: [Object], blackbox:true},

    }).validator(),
  run({_id,rules, actions, name}) {

    if(this.userId){
      if(_id){
        return  Rule.update({_id:_id},{ $set: {name:name, rules:rules, actions:actions, updatedBy:this.userId, updatedAt: new Date()}});
      }else{
        return Rule.insert({name:name, rules:rules, actions:actions, createdBy:this.userId, createdAt: new Date()});
      }

    }
      else {
        validatedError.server();
      }
  }
})
