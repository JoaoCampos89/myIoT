import './index.html';

import {Template} from 'meteor/templating';
import {createSensorGroup} from '/imports/api/sensor-group/validated-methods.js';
import SensorGroup from '/imports/api/sensor-group';
import {FlowRouter} from 'meteor/kadira:flow-router';

const templateName = 'adminSensorGroupEditPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({

});


Template[templateName].helpers({
  validatedMethod: function(){
    return createSensorGroup;
  },
  route:function(){
    return 'adminSensorGroupPage';
  },
  model: function(){
  //  console.log(Gateway.findOne({_id:FlowRouter.getParam("id")}));
    return SensorGroup.findOne({_id:FlowRouter.getParam("id")});
  }
});

Template[templateName].onRendered(function(){

});
