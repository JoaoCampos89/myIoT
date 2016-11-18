import './index.html';

import {Template} from 'meteor/templating';
import {createUserSensor} from '/imports/api/user-sensor/validated-methods';
//import {FlowRouter} from 'meteor/kadira:flow-router';

const templateName = 'adminUserSensorCreatePage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  validatedMethod: function(){
    return createUserSensor;
  },
  route:function(){
    return 'adminUserSensorPage';
  }
});




Template[templateName].onRendered(function(){

});
