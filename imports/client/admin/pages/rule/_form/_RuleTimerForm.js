import './_RuleTimerForm.html';

import {Template} from 'meteor/templating';
//import {createTargetGroup} from '/imports/api/targetGroup/validated-methods.js';

import {ReactiveVar} from 'meteor/reactive-var';
import {ValidationError} from 'meteor/mdg:validation-error';
import _ from 'underscore';
import {TAPi18n} from 'meteor/tap:i18n';

import Timer from '/imports/api/timer';
import protocol from '/imports/api/myiot-api/protocol';

const templateName = '_RuleTimerForm';

Template[templateName].onCreated(function(){
  const instance = this;
  instance.timer = new ReactiveVar(null);
});

Template[templateName].helpers({
  compoundName: function(name, middle, last){
    return name+middle+last;
  },

  equal: function(value,value2){
    return value===value2;
  },
  timers: function(){
    return Timer.find({}).map(function(timer){return {value:timer._id, name:timer.name}});
  },
  timerConditions:function(){
    const instance = Template.instance();
    const timer = Timer.findOne(instance.timer.get()).timer;
    return protocol['ACTIONS']['TIMER'][timer].map(function(element){return {value:element, name:element} });
  },

});

Template[templateName].events({
  "click .js-select-timer": function(event, instance){
    // changes parent context
        const index = instance.data.model.index;
        const context = instance.data.parentContext.get();
        context[index].timer = instance.$('.js-select-timer').val();
        instance.timer.set(context[index].timer);
        instance.data.parentContext.set(context);
  }




})
