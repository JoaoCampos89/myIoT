import './sidebar.html';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import TargetGroup from '/imports/api/target/collection.js';




Template.gameSideBarPage.onCreated(function() {
  var template = this;
  var roomName = FlowRouter.getParam("roomName");

  template.autorun(function() {
    template.subscribe("game.userOnline");
    template.subscribe("game.room", roomName);
  });
});



Template.gameSideBarPage.helpers({
  onlineUsers: function() {
    var roomName = FlowRouter.getParam("roomName");
    var room = TargetGroup.findOne({
      name: roomName
    });
    console.log(room);
    if (room) {
      var usersName = _.map(Meteor.users.find({
          //    "status.online": true,
          "loggedTargetGroup": room._id
        }).fetch(),
        function(user) {
          return {
            name: user.profile.username
          };
        });
      console.log(usersName);

      return usersName;
    } else {
      return [];
    }


  }

});
