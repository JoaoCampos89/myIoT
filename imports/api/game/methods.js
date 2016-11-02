import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Game} from '../collection.js';


export function createGame(gameTypeId, roomId) {
  check(gameTypeId, String);
  check(roomId, String);
  var gameType = GameType.findOne({
    _id: gameTypeId
  });
  var room = TargetGroup.findOne({
    _id: roomId
  });

  var usersId = Meteor.users.find({
    "status.online": true
  }, {
    fields: {
      _id: true
    }
  }).fetch();

  if (room && gameType) {

    var gameId = Game.insert({
      players: usersId,
      name: "O JOGO",
      targetGroup: room._id,
      gameTypeId: gameType._id,
      active: false

    });
    return {
      gameId: gameId,
      roomName: room.name

    };

  } else {
    throw new Meteor.Error(500, "Game created denied");
  }
}
//@ToDo think how to insert my sensors values in game when starting the game
//ideia: find all targets in group and start observeChanges
/*var handle;
export function startGame({gameId, targetGroupid}){
   var targets = TargetGroup.find(targetGroupId).fetch().targets;
   Game.observeValues[gameId] = MySensors.collections[value].find({type:48,sensor:{$in:targets}}).observeChanges({
      added: function (id) {

      }
    });


}
*/








Meteor.methods({
  startGame: function({gameId}) {
    check(gameId, String);

  },
  configureGame: function(users) {

  },
  endGame:function(){

  }

});
