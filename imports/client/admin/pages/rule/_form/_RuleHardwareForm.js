import './_RuleHardwareForm.html';

import {Template} from 'meteor/templating';
//import {createTargetGroup} from '/imports/api/targetGroup/validated-methods.js';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveVar} from 'meteor/reactive-var';
import {ValidationError} from 'meteor/mdg:validation-error';
import _ from 'underscore';
import {TAPi18n} from 'meteor/tap:i18n';
import Gateway from '/imports/api/mysensors-hardware/gateway-db';
import Sensor from '/imports/api/mysensors-hardware/sensor-db';
import {protocol} from '/imports/api/mysensors-hardware';

const templateName = '_RuleHardwareForm';

Template[templateName].onCreated(function(){
  const instance = this;
  instance.gatewayId = new ReactiveVar(null);
});

Template[templateName].helpers({
  compoundName: function(name, middle, last){
    return name+middle+last;
  },

  equal: function(value,value2){
    return value===value2;
  },
  gateways: function(){
    return Gateway.find({}).fetch().map(function(gateway){return {value:gateway._id, name:gateway.name}});
  },
  nodes: function(){
    const gatewayId = Template.instance().data.model.gatewayId;

    return Gateway.findOne(gatewayId).getNodes().map(function(node){ return {value:node.id, name:node.sketchName}});
  },
  sensors: function(){
    const gatewayId = Template.instance().data.model.gatewayId;
    const nodeId = Template.instance().data.model.nodeId;
    return Gateway.findOne(gatewayId).sensorsFromNode(nodeId).map(function(sensor){ return {value:sensor._id, name:sensor.type }});
  },
  subTypes: function(){
    const sensorId = Template.instance().data.model.sensorId;
    const sensorType = Sensor.findOne(sensorId).type;
    return protocol['SENSORS'][sensorType].map(function(sensorType) {return {value:sensorType, name:sensorType }});
  }
});

Template[templateName].events({
  "click .js-select-gateway": function(event, instance){
    // changes parent context
        const index = instance.data.model.index;
        const context = instance.data.parentContext;
        context[index].gateway = instance.$('.js-select-gateway').val();
        instance.data.parentContext.set(context);
  },
  "click .js-select-node": function(event, instance){
    // changes parent context
        const index = instance.data.model.index;
        const context = instance.data.parentContext;
        context[index].node = instance.$('.js-select-node').val();
        instance.data.parentContext.set(context);
  },

  "click .js-select-sensor": function(event, instance){
    // changes parent context
        const index = instance.data.model.index;
        const context = instance.data.parentContext;
        context[index].sensor = instance.$('.js-select-sensor').val();
        instance.data.parentContext.set(context);
  },
  "click .js-select-subType": function(event, instance){
    // changes parent context
        const index = instance.data.model.index;
        const context = instance.data.parentContext;
        context[index].gateway = instance.$('.js-select-subType').val();
        instance.data.parentContext.set(context);
  },




})
