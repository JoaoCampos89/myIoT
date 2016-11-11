import './index.html';
import '../../../../components';
import {Template} from 'meteor/templating';
//import {createTargetGroup} from '/imports/api/targetGroup/validated-methods.js';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveVar} from 'meteor/reactive-var';
import {ValidationError} from 'meteor/mdg:validation-error';
import _ from 'underscore';
import {TAPi18n} from 'meteor/tap:i18n';

const templateName = 'adminTimerCreateEditForm';


Template[templateName].onCreated(function(){

  const instance = this;
  instance.errors = new ReactiveVar({});
  instance.type = new ReactiveVar("Serial");
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
equalType: function(value,value2){
  console.log(value2);
  return Template.instance().type.get() === value;
},
selectedType: function(){
  return Template.instance().type;
},
optionsType: function(){
  return [{
    value: 'Serial',
    name: 'Serial'
  },{
    value: 'Ethernet',
    name: 'Ethernet'
  }
    ];

}


});


Template[templateName].events({
  "submit form": function(event, instance){
    event.preventDefault();
    const data = instance.data;
  //  console.log(data);
    const gateway = {};
    gateway.name = instance.$("#name").val() ? instance.$("#name").val(): null;
    gateway.port = instance.$("#port").val() ? instance.$("#port").val(): null;
    gateway.baud = instance.$("#baud").val() ? instance.$("#baud").val(): null;
    gateway.type = instance.$("#type").val() ? instance.$("#type").val(): null;
    gateway.user = instance.$("#user").val() ? instance.$("#user").val(): null;
    gateway.password = instance.$("#password").val() ? instance.$("#password").val(): null;
    gateway.server = instance.$("#server").val() ? instance.$("#server").val(): null;
    gateway.id = instance.$("#id").val() ? instance.$("#id").val(): null;
    instance.errors.set({});

    data.validatedMethod.call(gateway, function(error, result){

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
  'change #type': function(event, instance){
        instance.type.set(instance.$("#type").val());

  }

});

Template[templateName].onRendered(function(){

});
