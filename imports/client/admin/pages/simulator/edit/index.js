import './index.html';

import {Template} from 'meteor/templating';
import {createGateway} from '/imports/api/mysensors-hardware/validated-methods';
import Gateway from '/imports/api/mysensors-hardware/gateway-db';
import {FlowRouter} from 'meteor/kadira:flow-router';

const templateName = 'adminSimulatorEditPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({

});


Template[templateName].helpers({
  validatedMethod: function(){
    return createSimulator;
  },
  route:function(){
    return 'adminSimulatorPage';
  },
  gateway: function(){
  //  console.log(Gateway.findOne({_id:FlowRouter.getParam("id")}));
    return Gateway.findOne({_id:FlowRouter.getParam("id")});
  }
});

Template[templateName].onRendered(function(){

});
