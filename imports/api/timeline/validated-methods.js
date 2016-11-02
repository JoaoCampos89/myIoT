import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ValidationError}from 'meteor/mdg:validation-error'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Roles} from 'meteor/alanning:roles';
import Timeline from './index.js';
import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
/**
 * [createNotification  creates a target group]
 * @type {ValidatedMethod}
 */
export const createTimeEntry = new ValidatedMethod({
  name: 'timeline.createTimeEntry',
  validate: new SimpleSchema({
    //maxPlayers:{type: Number},
    action: { type: String },
    description: {type: String}
  }).validator(),
  run({ action, description }) {

    if(this.userId){
            return Timeline.insert({ description:description, action:action, createdBy:this.userId, createdAt: new Date.getTime()});
    }
      else {
        throw new ValidationError([
            {
              name: 'server',
              type: 'NOT_ALLOWED',
              description : "Sorry you have to be super-admin to do this thing."
            }
          ]);
      }
  }
});
