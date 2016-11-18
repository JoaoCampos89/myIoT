import './index.html';
import '../../../../components';
import {Template} from 'meteor/templating';
//import {createTargetGroup} from '/imports/api/targetGroup/validated-methods.js';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveVar} from 'meteor/reactive-var';
import {ValidationError} from 'meteor/mdg:validation-error';
import _ from 'underscore';
import {TAPi18n} from 'meteor/tap:i18n';

const templateName = 'adminUserSensorCreateEditForm';


Template[templateName].onCreated(function(){

  const instance = this;
  instance.errors = new ReactiveVar({});
  instance.control = new ReactiveVar({});
});

Template[templateName].helpers({
  error:function(field){
    const instance = Template.instance();
    return instance.errors.get()[field] ? instance.errors.get()[field] : null;
  },
  selected: function(value, field){
   return value === field ? 'selected' : null;
  //  return 'selected';
},

selectedControl: function(){
  return Template.instance().type;
},
optionsType: function(){
  return [{
            value: 'U_BUTTON',
            name: 'Button'
          },{
            value: 'U_SLIDER',
            name: 'Slider'
          },
          {
            value: 'U_TEXT',
            name: 'Text'
          },
          {
            value: 'U_SELECT',
            name: 'Select'
          },
          {
            value: 'U_RADIO',
            name: 'Radio'
          }
    ];

}


});


Template[templateName].events({
  "submit form": function(event, instance){
    event.preventDefault();
    const data = instance.data;
  //  console.log(data);
    const model = {};
    model.control = instance.$("#control").val() ? instance.$("#control").val(): null;
    model.controlId = instance.$("#controlId").val() ? instance.$("#controlId").val(): null;
    instance.errors.set({});

    data.validatedMethod.call(model, function(error, result){

      if(error){
        if (ValidationError.is(error)) {
          error.details.forEach(function(fieldError) {
            /*console.log(instance.errors.get());
            const errors = instance.errors.get();
            const err = {};
            err[fieldError.name] = fieldError.type;
            errors.push(err);*/
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
  },
  'change #control': function(event, instance){
        instance.type.set(instance.$("#control").val());

  }

});

Template[templateName].onRendered(function(){

});
