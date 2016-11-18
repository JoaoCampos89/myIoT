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



export default  new ValidatedMethod({
    name: 'mySensors-api.startGame',
    validate: new SimpleSchema({
      gameId: {type: String},
      //playerId: {type: String}
    //  status:{type:Boolean}
    }).validator(),
    run({ gameId}) {

      if(this.userId){
          //  var deviceId = 'ipsc';
            var game = Game.findOne({_id:gameId});
            var gameType = game.gameType();
            if(game.finish){
              throw new ValidationError([
                  {
                    name: 'server',
                    type: 'ALREADY FINISH',
                    description : "Sorry! This game has terminated."
                  }
                ]);

            }
            var timeInit = new Date().getTime();
            // if game not active, active all nodes in room and start game
            if(!game.active){



                  //var timeInit = new Date.getTime();

                  //Gateway.update({id:"ipsc"},{$set:{"activegameid":gameId}});
                  var targetGroupId = Game.findOne(gameId).targetGroupId;
                  var targets = TargetGroup.findOne(targetGroupId).nodes;
                  // TODO define if only is allowed one gateway for each room or if is necessary to search for each gateway
                  var gateway = Gateway.findOne({_id:targets[0].gatewayId});
                if(Meteor.isServer){
                  _.each(targets, function(target){
                    // find if nodes in gateway are active, if active initiate message to initiate game

                      var  node = _.findWhere(gateway.nodes,{id:target.id});
                      console.log("node" + node);
                      // active all nodes in target Group for game initiation
                      // node must be active for this game to be activated
                      // TODO implement logic of game saque rápido here

                          if(node&&node.id!=0){
                            writeToGateway(gateway._id, node.id, 16, protocol['C_SET'].value, 0, protocol['C_SET']['subType'].V_VAR1, Number(1));

                          }

                  });
                  }
                  Game.update({_id:gameId, "players.active":true},{$set:{active: true, gatewayId:gateway._id,
                      "players.$.game.init":timeInit, playing:true}});



            }else{
              Game.update({_id:gameId, "players.active":true},{$set:{"players.$.game.init":timeInit, playing:true, round: 1}});
            }
            if(Meteor.isServer){
              // timeout to stop game or to pass for another player
              Meteor.setTimeout(function(){
                  var timeFinal = new Date().getTime();
                  Game.update({_id:gameId, "players.active":true},{$set:{"players.$.active":false, "players.$.played":true,
                  timer:0,"players.$.game.final":timeFinal, playing:false}});
                  var gameUpdated = Game.findOne({_id:gameId});
                  var nextPlayer = gameUpdated.nextPlayer();
                  console.log(gameUpdated.lastPlayer());
                  if(gameUpdated.lastPlayer()&&nextPlayer.played){
                    // stop game and all targets
                    Game.update({_id:gameId},{$set:{"active":false, "finish":true, playing:false}});
                    var targetGroupId = Game.findOne(gameId).targetGroupId;
                    var targets = TargetGroup.findOne(targetGroupId).nodes;
                    var gateway = Gateway.findOne({_id:targets[0].gatewayId});
                    _.each(targets,function(target){
                      // find if nodes in gateway are active, if active initiate message to initiate game
                      var  node = _.findWhere(gateway.nodes,{id:target.id});
                      console.log("node" + node);
                      // active all nodes in target Group for game initiation
                      // node must be active for this game to be activated

                        if(node&&node.id!=0){
                          writeToGateway(gateway._id, node.id, 16, protocol['C_SET'].value, 0, protocol['C_SET']['subType'].V_VAR1, Number(0));
                        }

                    });




                  }else{
                    Game.update({_id:gameId,"players.id": nextPlayer.id},{$set:{"players.$.active":true}});
                  }
              }, gameType.time);
            }

            return true;

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
})
