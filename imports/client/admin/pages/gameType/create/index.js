import './index.html';

import {Template} from 'meteor/templating';
import {createTargetGroup} from '/imports/api/targetGroup/validated-methods.js';
import {FlowRouter} from 'meteor/kadira:flow-router';

const templateName = 'adminGameTypeCreatePage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({

})


Template[templateName].events({
  "submit form": function(event,template){
    var roomName = template.$("#roomName").val();
    console.log("submitted form");
    createTargetGroup.call({name:roomName}, function(error, result){
      if(error){
        console.log("error");
      }
      if(result._id){
        FlowRouter.go("adminGameTypePage")
      }
    });
  }

});

Template[templateName].onRendered(function(){

});
