import './index.css';
import './index.html';
import {Session} from 'meteor/session';
import {Template} from 'meteor/templating';
import {addPlayersToGame} from '/imports/api/game/validated-methods.js';
import {ReactiveVar} from 'meteor/reactive-var';
import Player from '/imports/api/player';
import _ from 'underscore';
const templateName = 'gameTerminalMountIndividualPage';

import {FlowRouter} from 'meteor/kadira:flow-router';

Template[templateName].onCreated(function(){
  const instance = this;
  instance.players = new ReactiveVar(false);
});

Template[templateName].helpers({
  players:function(){
    const playerIds = Template.instance().players.get();
    return Player.find({_id:{$in:playerIds}});
  }

})


Template[templateName].events({
  "drop .js-individual-box":function(event, instance){
    event.preventDefault();
    const playersArray = instance.players.get();
    if(_.isArray(playersArray)){
      playersArray.push(Session.get("draggedPlayerId"));
      instance.players.set(_.uniq(playersArray));
    }else{
      instance.players.set([Session.get("draggedPlayerId")]);
    }




  },
  "dragover .js-individual-box": function(event){
    event.preventDefault();
  },
  "click .js-go-game": function(event, instance){
    event.preventDefault();
    const data  = {};
    data.players = instance.players.get();
    data.id = FlowRouter.getParam("gameId");
    addPlayersToGame.call(data,function(errors, result){
      console.log(errors);
      if(result){
        console.log(result);
          FlowRouter.go("gameTerminalPlayIndividualPage",{id:FlowRouter.getParam("id"),gameId:FlowRouter.getParam("gameId")});
      }
    });
  },
});

Template[templateName].onRendered(function(){

});
