import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ValidationError}from 'meteor/mdg:validation-error'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Roles} from 'meteor/alanning:roles';

import {Meteor} from 'meteor/meteor';


export const  removeUser = new ValidatedMethod({
  name: 'user.remove',
  validate: new SimpleSchema({
    //maxPlayers:{type: Number},
    _id: { type: String },
  }).validator(),
  run({ _id }) {

    if(Roles.userIsInRole(this.userId,['super-admin','admin'],'admin')){
            return Meteor.users.remove(_id);
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
