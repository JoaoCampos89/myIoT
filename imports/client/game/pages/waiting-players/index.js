import './index.html';

import {Template} from 'meteor/templating';
import Player from '/imports/api/player';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {addPlayersToGame} from '/imports/api/game/validated-methods.js';


const templateName = 'gameWaitingPlayersPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  players:function () {
    return Player.find({});
  }
})


Template[templateName].events({
  'click .js-go-game': function(events,template){
      var data = {};
      data.id = FlowRouter.getParam('id');
      data.players = template.$('.js-select-players').val();
      addPlayersToGame.call(data, function(error,result){
        console.log(error);
        if(result){
          FlowRouter.go("gamePlayPage", {id: FlowRouter.getParam('id')});
        }

      })


  }
});
