import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ValidationError}from 'meteor/mdg:validation-error'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Roles} from 'meteor/alanning:roles';
//import Game from '../../game/index.js';
//import TargetGroup from '../../targetGroup/index.js';
import {Gateway} from '../../mysensors-hardware';
//import GameType from '../gameType/index.js';
import {protocol} from '../../mysensors-hardware';
import _ from 'underscore';
import {Meteor} from 'meteor/meteor';
// calling meteor is server because gw not work client side
if(Meteor.isServer){
  import {writeToGateway} from '../../mysensors-hardware';
}







//export const gameStatus = function(){};
//export const startGame = function(){};

export const gameStatus = new ValidatedMethod({
  name: 'mySensors-api.gameStatus',
  validate: new SimpleSchema({
    gameId: {type: String},
    status: {type: Boolean }
  }).validator(),
  run({ gameId, status }) {

    if(this.userId){
      if(Meteor.isServer){
            Game.update({_id:gameId},{$set:{status: status}});
            var targetGroupId = Game.findOne(gameId).targetGroupId;
            var nodes = TargetGroup.findOne(targetGroupId);

            _.each(nodes,function(node){
              var msg =  gw.encode(node, 1, 2, 0, 10, Number(status));
              gw.write(msg);
            });
          }
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
