import './index.html';

import {Template} from 'meteor/templating';
import {createSensorGroup} from '/imports/api/sensor-group/validated-methods.js';


const templateName = 'adminSensorGroupCreatePage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  validatedMethod: function(){
    return createSensorGroup;
  },
  route: function(){
    return "adminSensorGroupPage";
  }
})


Template[templateName].events({

});

Template[templateName].onRendered(function(){

});
