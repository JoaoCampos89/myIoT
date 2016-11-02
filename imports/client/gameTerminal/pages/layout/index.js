import './layout.html';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Gateway} from '/imports/api/mysensors-hardware';
import TargetGroup from '/imports/api/targetGroup';
const templateName = "gameTerminalLayoutPage";
import _ from 'underscore';

Template[templateName].onCreated(function() {
  var template = this;
  template.autorun(function() {
    template.subscribe("admin.loggedUsers");
  });
});



Template[templateName].helpers({
  isAdmin: function() {
    var user = Meteor.users.findOne({
      "_id": Meteor.userId()
    });
    console.log(user);
    if (user)
      return user.admin;
    else {
      return false;
    }
  },
  loggedUsers: function() {
    return Meteor.users.find({
      "services.resume": {
        $exists: true,
        $ne: null
      }
    });
  },
  gatewayActive: function(){
    const nodes =  TargetGroup.findOne({_id:FlowRouter.getParam("id")}).nodes;
    const gatewaysId =  _.map(nodes, function(node){
        return node.gatewayId;
      });
      console.log(nodes);
    const gateways = Gateway.find({_id:{$in:gatewaysId}}).fetch();

    return _.reduce(gateways, function(memo,gateway){return memo&&gateway.status},1);

  }


});
