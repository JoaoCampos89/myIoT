import './index.css';
import './index.html';
import './_form';
import './edit';
import './create';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Template} from 'meteor/templating';
import Sensor from '/imports/api/mysensors-hardware/sensor-db';


const templateName = 'adminUserSensorPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
      sensors: function(){
          return  Sensor.find({}).fetch();
      }
})


Template[templateName].events({
  "click .js-add-user-sensor": function(){
        FlowRouter.go("adminUserSensorCreatePage");
  },
});

Template[templateName].onRendered(function(){

});
