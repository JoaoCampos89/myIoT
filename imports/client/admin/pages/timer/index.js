import './index.css';
import './index.html';
import './_form';
import './edit';
import './create';

import {Template} from 'meteor/templating';
import Timer from '/imports/api/timer';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Modal} from 'meteor/peppelg:bootstrap-3-modal';
import moment from 'moment';
//import {setupGateway, activateSystem} from '/imports/api/mysensors-hardware/validated-methods';
const templateName = 'adminTimerPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  timers: function(){
    return Timer.find({});
  },
  prettyDate: function(value){
    //moment.locale('pt-br');
    return moment(value).format('LLL')
  }
})


Template[templateName].events({
  "click .js-add-timer": function(){
        FlowRouter.go("adminTimerCreatePage");
  },
  "click .js-edit-timer": function(event){
        const id = event.currentTarget.dataset.id;
        FlowRouter.go("adminTimerEditPage",{id: id});
  },
  "click .js-remove-timer": function(event){
    const modalContext = {};
    const model = {};
    const _id =  event.currentTarget.dataset.id;
    const timer = Timer.findOne({_id:_id});
    model.prefix = 'Timer';
    model.name = timer.name;
    model._id = _id;
    modalContext.model = model;

    //modalContext.validatedMethod = removeSensorGroup;
    modalContext.route = "adminTimerPage";
    Modal.show("removeModalComponent", modalContext);
  }
});

Template[templateName].onRendered(function(){

});
