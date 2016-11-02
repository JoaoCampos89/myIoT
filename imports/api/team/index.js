import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import Player from '../player';
//import generateFixtures from './fixtures.js';
/**
 * this collection is necessary because can exist
 */


const Team = new Mongo.Collection("team");

Team.helpers({
  getPlayers:function(){
    return Player.find({teamId:this._id});
  },
  /*getUsers: function(){
    var players = Player.find({teamId:this._id});


  }*/

});

//Player.generateFixtures = generateFixtures;







export default Team;
