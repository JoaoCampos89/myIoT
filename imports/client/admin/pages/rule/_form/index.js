import './index.html';
import './_RuleHardwareForm.js';
import '../../../../components';
import {Template} from 'meteor/templating';
//import {createTargetGroup} from '/imports/api/targetGroup/validated-methods.js';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveVar} from 'meteor/reactive-var';
import {ValidationError} from 'meteor/mdg:validation-error';
import _ from 'underscore';
import {TAPi18n} from 'meteor/tap:i18n';

const templateName = 'adminRuleCreateEditForm';

Template[templateName].onCreated(function(){
    const instance = this;
    instance.errors = new ReactiveVar({});
    instance.rules = new ReactiveVar();
    instance.actions = new ReactiveVar();
    instance.errors = new ReactiveVar({});
    const rules = [{index:0}];
    instance.rules.set(rules);
    const actions = [{index:0}];
    instance.actions.set(actions);
});

Template[templateName].helpers({
  rules:function(){
    return Template.instance().rules.get();
  },
  rulesContext:function(){
    return Template.instance().rules;
  },
  actionsContext: function(){
    return Template.instance().actions;
  },
  actions: function(){
    return Template.instance().actions.get();
  },
  moreThanOneRule:function(index){
    return index != 0;
  },
  equal: function(value, value2){
    return value === value2;
  }
});

Template[templateName].events({
  "click .js-add-rule": function(event,instance){
     event.preventDefault();
      const rules = instance.rules.get();
      _.each(rules,function(rule){
        rules[rule.index].type = instance.$('#ruleType'+rule.index).val();
        switch (rule.type) {
          case 'hardware':
            rules[rule.index].gateway = instance.$('#ruleGateway'+rule.index).val();
            rules[rule.index].sensor = instance.$('#ruleSensor'+rule.index).val();
            rules[rule.index].subType = instance.$('#ruleSubType'+rule.index).val();
            rules[rule.index].condition = instance.$('#ruleCondition'+rule.index).val();
            rules[rule.index].conector = instance.$('#conector'+rule.index).val() ? instance.$('#conector'+rule.index).val(): null;
            rules[rule.index].value = instance.$('#ruleValue'+rule.index).val();
            break;
          case 'userControl':
            rules[rule.index].control = instance.$('#ruleControl'+rule.index).val();
            rules[rule.index].condition = instance.$('#ruleCondition'+rule.index).val();
            rules[rule.index].conector = instance.$('#conector'+rule.index).val() ? instance.$('#conector'+rule.index).val(): null;
            rules[rule.index].value = instance.$('#ruleValue'+rule.index).val();
            break;
          case 'rule':
              rules[rule.index].nestedRuleId = instance.$('#nestedRule'+rule.index).val();
            break;
          default:

        }
      });
      const lastRule = _.last(rules);
      if(lastRule){
          rules.push({index: lastRule.index+1});
          }
        else {
          rules.push({index: 0});
        }
      instance.rules.set(rules);
  },
  "click .js-remove-rule": function(event,instance){
      event.preventDefault();
      const rules = instance.rules.get();
      rules.pop();
      instance.rules.set(rules);
  },
  "click .js-rule-type": function(event, instance){
      event.preventDefault();
      const index = event.currentTarget.dataset.index;
      const rules = instance.rules.get();
      rules[index].type = instance.$('#ruleType'+index).val();
      instance.rules.set(rules);
  },
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
              action[action.index].gateway = instance.$('#actionGateway'+action.index).val();
              actions[action.index].sensor = instance.$('#actionSensor'+action.index).val();
              actions[action.index].subType = instance.$('#actionSubType'+action.index).val();
              actions[action.index].condition = instance.$('#actionCondition'+action.index).val();
              actions[action.index].conector = instance.$('#conector'+action.index).val() ? instance.$('#conector'+action.index).val(): null;
              actions[action.index].value = instance.$('#actionValue'+action.index).val();
              break;
            case 'userControl':
              actions[action.index].control = instance.$('#actionControl'+action.index).val();
              actions[action.index].condition = instance.$('#actionCondition'+action.index).val();
              actions[action.index].conector = instance.$('#conector'+action.index).val() ? instance.$('#conector'+action.index).val(): null;
              actions[action.index].value = instance.$('#actionValue'+action.index).val();
              break;

            default:

          }
          actions[action.index].actuator = instance.$('#actuator'+action.index).val();
          actions[action.index].operator = instance.$('#actuatorOperator'+action.index).val();
          actions[action.index].value = instance.$('#actionValue'+action.index).val();
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
  "click .js-remove-action": function(event, instance){
     event.preventDefault();
      var actions = instance.actions.get();
      actions.pop();
      instance.actions.set(actions);
  },
  "click .js-save-rule": function(event,instance){
     event.preventDefault();
      const data = instance.data;
      const actions = instance.actions.get();
      const rules = instance.rules.get();

      const saveRule = {};
      saveRule.actions = actions;
      saveRule.rules = rules;
      saveRule.ruleName = instance.$('#ruleName').val();
      data.validatedMethod.call(saveRule, function(error, result){

        if(error){
          if (ValidationError.is(error)) {
            error.details.forEach(function(fieldError) {
              const errors = instance.errors.get();
              errors[fieldError.name] = TAPi18n.__(fieldError.type,{field: fieldError.name});
              instance.errors.set(errors);

          });
        //  console.log("error");
        }
      }
        if(result){
          FlowRouter.go(data.route)
        }
      });
  }
});
