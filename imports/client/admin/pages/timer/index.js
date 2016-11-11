import './index.css';
import './index.html';
import './_form';
import './edit';
import './create';

import {Template} from 'meteor/templating';
import Gateway from '/imports/api/mysensors-hardware/gateway-db';
import {FlowRouter} from 'meteor/kadira:flow-router';
//import {setupGateway, activateSystem} from '/imports/api/mysensors-hardware/validated-methods';
const templateName = 'adminTimerPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  gateways: function(){
    return Gateway.find({});
  }
})


Template[templateName].events({
  "click .js-add-gateway": function(){
        FlowRouter.go("adminGatewayCreatePage");
  },
  "click .js-edit-gateway": function(event){
        const id = event.currentTarget.dataset.id;
        FlowRouter.go("adminGatewayEditPage",{id: id});
  },
  "click .js-initialize-gateway": function(event){
        const id = event.currentTarget.dataset.id;
    //    setupGateway.call({gatewayId: id});
  },
  "click .js-start-gateway": function(event){
        const id = event.currentTarget.dataset.id;
    //    activateSystem.call({gatewayId: id});
  },
});

Template[templateName].onRendered(function(){

});
