import './index.html';

import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor';
import {removeUser} from '/imports/api/user/validated-methods.js';
const templateName = 'adminUsersManagementRemovePage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  model: function(){
    var user = Meteor.users.findOne(FlowRouter.getParam("id"));
    return {
              name: user.username,
              prefix: "Usuário"

            }

  },
  validatedMethod:function(){
    return removeUser;
  }
})


Template[templateName].events({

});

Template[templateName].onRendered(function(){

});
