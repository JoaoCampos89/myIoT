import './index.html';

import {Template} from 'meteor/templating';
import {createGateway} from '/imports/api/mysensors-hardware/validated-methods';
import Gateway from '/imports/api/mysensors-hardware/gateway-db';
import {FlowRouter} from 'meteor/kadira:flow-router';
import Rule from '/imports/api/rule';
const templateName = 'adminRuleEditPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({

});


Template[templateName].helpers({
  validatedMethod: function(){
    return createGateway;
  },
  route:function(){
    return 'adminRulePage';
  },
  gateway: function(){
  //  console.log(Gateway.findOne({_id:FlowRouter.getParam("id")}));
    return Gateway.findOne({_id:FlowRouter.getParam("id")});
  },
  context:function(){
    const actions = {};
    const rules = [];
      if(FlowRouter.getParam("id")){
        const r =   Rule.findOne(FlowRouter.getParam("id"));
        r.conectors.forEach(function(conector, index){
                rules.push({sensorId:conector.conditions[0].sensorId,subTypeId:conector.conditions[0].sensorSubType,conector:null});
                rules.push({sensorId:conector.conditions[1].sensorId,subTypeId:conector.conditions[1].sensorSubType,conector:conector.type});
            })




      }

      return {actions:actions,rules:rules};
  }
});

Template[templateName].onRendered(function(){

});
