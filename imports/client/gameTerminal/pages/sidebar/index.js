import './sidebar.html';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import _ from 'underscore';
import Player from '/imports/api/player';


const templateName = "gameTerminalSideBarPage";

Template[templateName].onCreated(function() {
  var template = this;
  var roomName = FlowRouter.getParam("roomName");

  template.autorun(function() {
    template.subscribe("game.userOnline");
    template.subscribe("game.room", roomName);
  });
});



Template[templateName].helpers({
  players: function() {
    return Player.find({});
  }

});

Template[templateName].events({
  "dragover .js-sidebar-players": function(event){
    event.preventDefault();
  },
  "drag .js-sidebar-players": function(event){
    event.preventDefault();
    Session.set("draggedPlayerId", event.target.dataset.id);


    //console.log(event.target.dataset.id);
  //  console.log( event);
  //  event.originalEvent.dataTransfer.setData("id", event.target.dataset.id);
    //console.log(event);
  },
});
