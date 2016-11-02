import './index.css';
import './index.html';
import './component/sensor.js';

import _ from 'underscore';
import {ReactiveVar} from 'meteor/reactive-var';
import {Gateway} from '/imports/api/mysensors-hardware';

const countTypes = [{
  type: "operationalNodes",
  field: "Operacional"
}, {
  type: "nonOperationalNodes",
  field: "Não Operacional"
}, {
  type: "lowBatteryNodes",
  field: "Bateria Baixa"
}, {
  type: "withoutGroupNodes",
  field: "Sem sala"
}];

import {Template} from 'meteor/templating';



const templateName = 'adminSensorsPage';

Template[templateName].onCreated(function(){
      const instance = this;
      instance.gateway = new ReactiveVar(false);
      _.each(countTypes, function(countType) {
        instance[countType.type] = new ReactiveVar(false);
      });
      instance[countTypes[0].type] = new ReactiveVar(true);
      instance.activeSensorType= new ReactiveVar(countTypes[0].type);
});

Template[templateName].helpers({
  counts: function(){
    return countTypes;
  },
  isTypeActive: function(type){
    const instance = Template.instance();
    return instance.activeSensorType.get() === type;
  },
  activeSensorType: function(){
    const instance = Template.instance();
    return instance.activeSensorType.get();
  },
  sensors: function(){
      const instance = Template.instance();
      return Gateway.findOne({_id:instance.gateway.get()})[instance.activeSensorType.get()]();
  },
  countNodes: function(type){
    const instance = Template.instance();
    return Gateway.findOne({_id:instance.gateway.get()})[type]().length || 0;
  },
  gateways: function(){
    return Gateway.find({});
  },
  gatewayId: function(){
    const instance = Template.instance();
    return instance.gateway.get();
  }
})


Template[templateName].events({
  "click .nav.nav-tabs.sensorsTabs>li": function(event, template) {
    /*template.$(".nav.nav-tabs.sensorsTabs>li.active").removeClass(
      "active");
    event.currentTarget.className = "active"; */
    _.each(countTypes, function(countType) {
      template[countType.type].set(false);
    });
    var index = parseInt(event.currentTarget.dataset.index);
    var reactiveVarType = countTypes[index].type;
    template[reactiveVarType].set(true);
    template.activeSensorType.set(reactiveVarType);
    //alert("clicked");

  },
  "change .js-select-gateway": function(event,template){
      template.gateway.set(template.$('.js-select-gateway').val());
      console.log(template.$('.js-select-gateway').val());
  }

});

Template[templateName].onRendered(function(){

});
