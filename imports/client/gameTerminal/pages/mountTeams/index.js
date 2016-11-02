import './index.css';
import './index.html';

import {Template} from 'meteor/templating';
import Game from '/imports/api/game';
import Team from '/imports/api/team';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveVar} from 'meteor/reactive-var';
import {addTeamToGame} from '/imports/api/game/validated-methods.js';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';


const templateName = 'gameTerminalMountTeamsPage';



Template[templateName].onCreated(function(){
    const instance = this;
    instance.createTeam = new ReactiveVar(false);
});

Template[templateName].helpers({
  game: function(){
    return Game.findOne(FlowRouter.getParam("gameId"));
  },
  createTeam:function(){
    const instance =  Template.instance();
    return instance.createTeam.get();
  },
  teams: function(){
    return Team.find({createdBy:Meteor.userId()});

  }
})


Template[templateName].events({
 "click .js-open-form-create-team": function(event, instance){
   event.preventDefault();
   if(instance.createTeam.get()){
        instance.createTeam.set(false);
      }
        else {
          instance.createTeam.set(true);
        }
 },
 "click .js-create-team": function(event, instance){
    event.preventDefault();
    const data = {};
    data.teamName = instance.$("#teamName").val();
    data.id = FlowRouter.getParam("gameId");
    addTeamToGame.call(data)
    instance.createTeam.set(false);
 },
 "drop .js-team-box":function(event, template){
   event.preventDefault();
   console.log(Session.get("draggedPlayerId"));
   console.log("dropped");
 },
 "dragover .js-team-box": function(event){
   event.preventDefault();
 },
});

Template[templateName].onRendered(function(){

});
