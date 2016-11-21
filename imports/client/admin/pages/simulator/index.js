import './index.css';
import './index.html';
import './_form';
import './edit';
import './create';

import {Template} from 'meteor/templating';
import Gateway from '/imports/api/mysensors-hardware/gateway-db';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveVar} from 'meteor/reactive-var';
import _ from 'underscore';
//import {setupGateway, activateSystem} from '/imports/api/mysensors-hardware/validated-methods';
const templateName = 'adminSimulatorPage';

Template[templateName].onCreated(function(){
  const instance = this;
  instance.actions = new ReactiveVar();
  instance.errors = new ReactiveVar({});
  const actions = [{index:0}];
  instance.actions.set(actions);
});

Template[templateName].helpers({
  compoundName: function(name, middle, last){
    return name+middle+last;
  },

  equal: function(value,value2){
    return value===value2;
  },
  actionsContext: function(){
    return Template.instance().actions;
  },
  actions: function(){
    return Template.instance().actions.get();
  },
})


Template[templateName].events({
  "click .js-action-type": function(event, instance){
      event.preventDefault();
      const index = event.currentTarget.dataset.index;
      const actions = instance.actions.get();
      actions[index].type = instance.$('#actionType'+index).val();
      instance.actions.set(actions);
  },

  "click .js-add-action": function(event, instance){
     event.preventDefault();
      const actions = instance.actions.get();
      _.each(actions,function(action){
          actions[action.index].type = instance.$('#actionType'+action.index).val();
          switch (action.type) {
            case 'hardware':
              actions[action.index].gatewayId = instance.$('#actionGateway'+action.index).val();
              actions[action.index].nodeId = instance.$('#actionNode'+action.index).val();
              actions[action.index].sensorId = instance.$('#actionSensor'+action.index).val();
              actions[action.index].subTypeId = instance.$('#actionSubType'+action.index).val();
              actions[action.index].condition = instance.$('#actionCondition'+action.index).val();
              actions[action.index].value = instance.$('#actionValue'+action.index).val();
              break;
            case 'userControl':
              actions[action.index].control = instance.$('#ruleControl'+action.index).val();
              actions[action.index].condition = instance.$('#ruleCondition'+action.index).val();
            //  actions[action.index].value = instance.$('#actionValue'+action.index).val();
              break;
            case 'timer':
              actions[action.index].timer = instance.$('#actionTimer'+action.index).val();
              actions[action.index].condition = instance.$('#actionCondition'+action.index).val();
              actions[action.index].value = instance.$('#actionValue'+action.index).val();
            break;
            default:

          }

      });
      const lastAction = _.last(actions);
      if(lastAction){
          actions.push({index: lastAction.index+1});
          }
        else {
          actions.push({index: 0});
        }
      instance.actions.set(actions);
  },
  "click .js-send-action": function(event, instance){
      event.preventDefault();
      const actions = instance.actions.get();
    //  actions[index].type = instance.$('#actionType'+index).val();

  },



});

Template[templateName].onRendered(function(){

});
