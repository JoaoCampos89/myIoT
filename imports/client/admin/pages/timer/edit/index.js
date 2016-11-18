import './index.html';

import {Template} from 'meteor/templating';
import {createTimer} from '/imports/api/timer/validated-methods';
import Timer from '/imports/api/timer';
import {FlowRouter} from 'meteor/kadira:flow-router';

const templateName = 'adminTimerEditPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({

});


Template[templateName].helpers({
  validatedMethod: function(){
    return createTimer;
  },
  route:function(){
    return 'adminTimerPage';
  },
  model: function(){
  //  console.log(Gateway.findOne({_id:FlowRouter.getParam("id")}));
    return Timer.findOne({_id:FlowRouter.getParam("id")});
  }
});

Template[templateName].onRendered(function(){

});
