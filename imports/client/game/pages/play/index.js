import './components/startGame.js';
import './index.html';
import {Template} from 'meteor/templating';
import Player from '/imports/api/player/index.js';
import Game from '/imports/api/game/index.js';
import {FlowRouter} from 'meteor/kadira:flow-router';
import _ from 'underscore';
const templateName = 'gamePlayPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  playerName:function (playerId) {
    return Player.findOne(playerId).name;
  },
  game:function(){
    return Game.findOne({_id:FlowRouter.getParam('id')});
  },
  activePlayer:function(playerActive){
    if(playerActive){
      return 'active';
    }
  },
  shotTime:function(time,playerId){
    var players = Game.findOne({_id:FlowRouter.getParam('id')}).players;
    var player = _.findWhere(players,{id:playerId});
    return  (time - player.game.init)/1000;
  } //,
  /*activePlayerName: function(){
    var playerId =   Game.findOne(FlowRouter.getParam('id')).activePlayer().id;
    return Player.findOne(playerId).name;
  }*/
});


Template[templateName].events({

});

Template[templateName].onRendered(function(){

});
