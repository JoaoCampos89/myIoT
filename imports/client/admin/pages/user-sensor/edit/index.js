import './index.html';

import {Template} from 'meteor/templating';

import Sensor from '/imports/api/mysensors-hardware/sensor-db';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {createUserSensor} from '/imports/api/user-sensor/validated-methods';
const templateName = 'adminUserSensorEditPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({

});


Template[templateName].helpers({
  validatedMethod: function(){
    return createUserSensor;
  },
  route:function(){
    return 'adminUserSensorPage';
  },
  model: function(){
  //  console.log(Gateway.findOne({_id:FlowRouter.getParam("id")}));
    return Sensor.findOne(FlowRouter.getParam("id"));
  }
});

Template[templateName].onRendered(function(){

});
