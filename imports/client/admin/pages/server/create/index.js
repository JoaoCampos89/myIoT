import './index.html';

import {Template} from 'meteor/templating';
import {createGateway} from '/imports/api/mysensors-hardware/validated-methods';
//import {FlowRouter} from 'meteor/kadira:flow-router';

const templateName = 'adminServerCreatePage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  validatedMethod: function(){
    return createGateway;
  },
  route:function(){
    return 'adminServerPage';
  }
});




Template[templateName].onRendered(function(){

});
