import './index.html';

import {Template} from 'meteor/templating';
import {createRule} from '/imports/api/rule/validated-methods';
import {FlowRouter} from 'meteor/kadira:flow-router';
import Rule from '/imports/api/rule';
const templateName = 'adminRuleEditPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({

});


Template[templateName].helpers({
  validatedMethod: function(){
    return createRule;
  },
  route:function(){
    return 'adminRulePage';
  },
  model: function(){
  //  console.log(Gateway.findOne({_id:FlowRouter.getParam("id")}));
    return Rule.findOne({_id:FlowRouter.getParam("id")});
  }

});

Template[templateName].onRendered(function(){

});
