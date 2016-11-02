import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import generateFixtures from './fixtures.js';
/**
 * this collection is necessary because can exist
 */


const Player = new Mongo.Collection("player");

Player.helpers({
  user:function(){
    return Meteor.users.findOne(this.userId);
  }

});

Player.generateFixtures = generateFixtures;







export default Player;
