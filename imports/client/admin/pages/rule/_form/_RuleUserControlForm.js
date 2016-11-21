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
    const instance = Template.instance();
      if (instance.data.name === 'rule') {
        return Sensor.find({type:'user-control'})
                .map(function(sensor){return {value:sensor._id, name:sensor.controlId}});
      } else {
        return Sensor.find({type:'user-control', control:{$in:['U_TEXT', 'U_RANGE', 'U_SELECT', 'U_CHECKBOX']}})
          .map(function(sensor){return {value:sensor._id, name:sensor.controlId}});
      }


  },

  controlConditions:function(){
    const instance = Template.instance();

    const control = Sensor.findOne(instance.control.get()).control;
    return protocol['USERSENSORS'][control].map(function(element){return {value:element, name:element} });
  },
  control: function(){
    const instance = Template.instance();
    return Sensor.findOne(instance.control.get()).control;
  },
  valueTypes: function(){
    const userControls = Sensor.find({type:'user-control', control:{$in:['U_TEXT', 'U_RANGE', 'U_SELECT', 'U_CHECKBOX']}}).fetch()
            .map(function(control){return {value:control._id, name: control.controlId}});
    userControls.push({name:"User Defined", value: 'userDefined'});

    return userControls;
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
  "click .js-select-condition": function(event, instance){
    // changes parent context
        const index = instance.data.model.index;
        const context = instance.data.parentContext.get();
        context[index].condition = instance.$('.js-select-condition').val();
        instance.data.parentContext.set(context);
  },
  "click .js-select-valueType": function(event, instance){
    // changes parent context
        const index = instance.data.model.index;
        const context = instance.data.parentContext.get();
        context[index].valueType = instance.$('.js-select-valueType').val();
        instance.data.parentContext.set(context);
  },
  "change .js-change-value": function(event, instance){
    // changes parent context
        const index = instance.data.model.index;
        const context = instance.data.parentContext.get();
        context[index].value = instance.$('.js-change-value').val();
        instance.data.parentContext.set(context);
  }





})
