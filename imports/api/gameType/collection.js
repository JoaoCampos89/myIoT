import {Mongo} from 'meteor/mongo';
import generateFixtures from './fixtures.js';
// collection game
const GameType = new Mongo.Collection("gametype");

GameType.generateFixtures = generateFixtures;



export default  GameType;

// allowing all the commands in mongo
/*GameType.allow({
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
