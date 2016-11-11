import './index.css';
import './index.html';
import './_form';
import './edit';
import './create';

import {Template} from 'meteor/templating';
import Gateway from '/imports/api/mysensors-hardware/gateway-db';
import {FlowRouter} from 'meteor/kadira:flow-router';
//import {setupGateway, activateSystem} from '/imports/api/mysensors-hardware/validated-methods';
const templateName = 'adminRulePage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  gateways: function(){
    return Gateway.find({});
  }
})


Template[templateName].events({
  "click .js-add-rule": function(){
        FlowRouter.go("adminRuleCreatePage");
  },
  "click .js-edit-rule": function(event){
        const id = event.currentTarget.dataset.id;
        FlowRouter.go("adminRuleEditPage",{id: id});
      }

});

Template[templateName].onRendered(function(){

});
