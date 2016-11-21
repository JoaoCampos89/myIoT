import './index.css';
import './index.html';
import './_form';
import './edit';
import './create';

import {Template} from 'meteor/templating';
import Rule from '/imports/api/rule';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Modal} from 'meteor/peppelg:bootstrap-3-modal';
//import {setupGateway, activateSystem} from '/imports/api/mysensors-hardware/validated-methods';
const templateName = 'adminRulePage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  rules: function(){
    return Rule.find({});
  }
})


Template[templateName].events({
  "click .js-add-rule": function(){
        FlowRouter.go("adminRuleCreatePage");
  },

    "click .js-edit-rule": function(event){
          const id = event.currentTarget.dataset.id;
          FlowRouter.go("adminRuleEditPage",{id: id});
    },
    "click .js-remove-rule": function(event){
      const modalContext = {};
      const model = {};
      const _id =  event.currentTarget.dataset.id;
      const rule = Rule.findOne({_id:_id});
      model.prefix = 'Rule: ';
      model.name = rule.name;
      model._id = _id;
      modalContext.model = model;

      //modalContext.validatedMethod = removeSensorGroup;
      modalContext.route = "adminRulePage";
      Modal.show("removeModalComponent", modalContext);
    }
});

Template[templateName].onRendered(function(){

});
