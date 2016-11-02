import './index.html';

import {Template} from 'meteor/templating';
import {createTargetGroup} from '/imports/api/targetGroup/validated-methods.js';
import TargetGroup from '/imports/api/targetGroup';
import {FlowRouter} from 'meteor/kadira:flow-router';

const templateName = 'adminTargetGroupEditPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({

});


Template[templateName].helpers({
  validatedMethod: function(){
    return createTargetGroup;
  },
  route:function(){
    return 'adminTargetGroupPage';
  },
  model: function(){
  //  console.log(Gateway.findOne({_id:FlowRouter.getParam("id")}));
    return TargetGroup.findOne({_id:FlowRouter.getParam("id")});
  }
});

Template[templateName].onRendered(function(){

});
