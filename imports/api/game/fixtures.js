import GameType from '../gameType';
import Player from '../player';
//import TargetGroup from '../targetGroup';
import {Meteor} from 'meteor/meteor';


export default function generateFixtures(){
  var users = Meteor.users.find({}).fetch();
  var player1 = Player.findOne({ name:"Mario"});
  var player2 = Player.findOne({ name:"João"});
  console.log(player1);
  var gameType = GameType.findOne({});
  var targetGroup = TargetGroup.findOne({});
  this.insert({
    name: 'jogo',
    gameTypeId: gameType._id,
    targetGroupId: targetGroup._id,
    players:[
      {id:player1._id,active:true},
      {id:player2._id}
    ],
    createdBy:users[0]._id
  }
)



}
