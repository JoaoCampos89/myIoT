import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import _ from 'underscore';
import GameType from '../gameType/index.js';
var Game = {};

Game = new Mongo.Collection("game");





export default Game;
// collection game


// allowing all the commands in mongo
/*Game.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
*/
 // game schema
Game.schema = new SimpleSchema({
  roomId:{
    type:[String],
    optional:true
  },
  targets: {
    type:[String],
    optional: true
  },
  date: {
    type: Date
  }
/*  player:{
    type: [Player.schema]
  },
  shoots:{
    type:[shootSchema],
    optional: true,
  }*/
});
/** Proposed schema
*   players: [player]
*   total players
*   type
 *  targetGroupId
 *  shots : [shot]
 *
 *
 *
 * player
 * order
 * userId
 * status:[active,]
 *
 * shot
 * at:
 * userId:
 *
 */
