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
        name: {type: String},
        rules: {type: [Object], blackbox:true},
        actions: {type: [Object], blackbox:true},

    }).validator(),
  run({ rules, actions, name}) {

    if(this.userId){

      const conectors =   transformRules(rules)
      Rule.insert({name:name, conectors:conectors})


    }
      else {
        validatedError.server();
      }
  }
})
