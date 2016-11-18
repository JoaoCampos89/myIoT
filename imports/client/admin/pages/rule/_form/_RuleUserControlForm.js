import './_RuleUserControlForm.html';

import {Template} from 'meteor/templating';
//import {createTargetGroup} from '/imports/api/targetGroup/validated-methods.js';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveVar} from 'meteor/reactive-var';
import {ValidationError} from 'meteor/mdg:validation-error';
import _ from 'underscore';
import {TAPi18n} from 'meteor/tap:i18n';
import Gateway from '/imports/api/mysensors-hardware/gateway-db';
import Sensor from '/imports/api/mysensors-hardware/sensor-db';
import protocol from '/imports/api/myiot-api/protocol';

const templateName = '_RuleUserControlForm';

Template[templateName].onCreated(function(){
  const instance = this;
  instance.control = new ReactiveVar(null);
});

Template[templateName].helpers({
  compoundName: function(name, middle, last){
    return name+middle+last;
  },

  equal: function(value,value2){
    return value===value2;
  },
  controls: function(){
    return Sensor.find({type:'user-control'}).map(function(sensor){return {value:sensor._id, name:sensor.controlId}});
  },

  controlConditions:function(){
    const instance = Template.instance();
    const control = Sensor.findOne(instance.control.get()).control;
    return protocol['USERSENSORS'][control].map(function(element){return {value:element, name:element} });
  },
  control: function(){
    const instance = Template.instance();
    return Sensor.findOne(instance.control.get()).control;
  }

});

Template[templateName].events({
  "click .js-select-control": function(event, instance){
    // changes parent context
        const index = instance.data.model.index;
        const context = instance.data.parentContext.get();
        context[index].control = instance.$('.js-select-control').val();
        instance.control.set(context[index].control);
        instance.data.parentContext.set(context);
  },





})
