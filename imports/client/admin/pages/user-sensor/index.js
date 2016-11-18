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
      controls: function(){
          return  Sensor.find({type:"user-control"});
      }
})


Template[templateName].events({
  "click .js-add-user-sensor": function(){
        FlowRouter.go("adminUserSensorCreatePage");
  },
  "click .js-edit-user-sensor": function(event){
        const id = event.currentTarget.dataset.id;
        FlowRouter.go("adminUserSensorEditPage",{id: id});
  },
});

Template[templateName].onRendered(function(){

});
