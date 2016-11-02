import './view.html';

import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';

const templateName = 'adminUsersManagementViewPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  user: function(){
    return Meteor.users.findOne({_id:FlowRouter.getParam("id")});
  }
})


Template[templateName].events({

});

Template[templateName].onRendered(function(){

});
