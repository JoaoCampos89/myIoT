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
  selectedType: function(){
    return Template.instance().type;
  },
  optionsTimer: function(){
    return [{
      value: 'interval',
      name: 'Interval'
        },{
      value: 'timeout',
      name: 'Timeout'
        }
      ];
    },
  optionsType: function(){
      return [{
        value: 'trigger',
        name: 'Trigger'
      },
      {
        value: 'scheduled',
        name: 'Scheduled'
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
    model.name = instance.$("#name").val() ? instance.$("#name").val(): null;
    model.type = instance.$("#type").val() ? instance.$("#type").val(): null;
    model.timer = instance.$("#timer").val() ? instance.$("#timer").val(): null;
    model._id = instance.$("#_id").val() ? instance.$("#_id").val(): null;
    model.time = instance.$("#time").val() ? instance.$("#time").val(): null;
    model.delay = instance.$("#delay").val() ? instance.$("#delay").val(): null;
    model.time = Number(model.time);
    model.delay = Number(model.delay);
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
  'change #type': function(event, instance){
        instance.type.set(instance.$("#type").val());

  }

});

Template[templateName].onRendered(function(){

});
