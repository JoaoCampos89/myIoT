import './index.html';

import {Template} from 'meteor/templating';
import {createRule} from '/imports/api/rule/validated-methods';
//import {FlowRouter} from 'meteor/kadira:flow-router';

const templateName = 'adminRuleCreatePage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  validatedMethod: function(){
    return createRule;
  },
  route:function(){
    return 'adminRulePage';
  }
});




Template[templateName].onRendered(function(){

});
