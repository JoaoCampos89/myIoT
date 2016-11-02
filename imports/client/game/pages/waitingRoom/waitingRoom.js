import './waitingRoom.html';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import TargetGroup from '../../../../api/targetGroup/collection.js';
import GameType from '../../../../api/gameType/collection.js';




Template.gameWaitingRoomPage.onCreated(function() {
  var template = this;
  var roomName = FlowRouter.getParam("roomName");
  template.autorun(function() {
    template.subscribe("game.gameTypes");
    template.subscribe("game.room", roomName);
  });
});

Template.gameWaitingRoomPage.helpers({
  gameTypes: function() {
    return GameType.find({});
  },
  roomName: function() {
    var roomName = FlowRouter.getParam("roomName");
    return TargetGroup.findOne({
      name: roomName
    });
  }
});

Template.gameWaitingRoomPage.events({
  "click .game-type-choice": function(event, template) {
    var gameTypeId = this;
    var roomName = FlowRouter.getParam("roomName");
    var room = TargetGroup.findOne({
      name: roomName
    });
    console.log(room._id);
    console.log(gameTypeId);
    Meteor.call("createGame", gameTypeId.toString(), room._id, function(
      error,
      result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        FlowRouter.go("/game/next-player/" + result.roomName);
      }
    });
  }

});
