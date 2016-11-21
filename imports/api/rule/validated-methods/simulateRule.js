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
  name: 'rule.simulate-rule',
  validate: new SimpleSchema({
        simulation: {type: [Object], blackbox:true},
    }).validator(),
  run({simulation}) {

    if(this.userId){
        if(simulation.length === 1){
              
        }

    }
      else {
        validatedError.server();
      }
  }
})
