import './index.css';
import './index.html';
//import './_form';
//import './edit';
//import './create';

import {Template} from 'meteor/templating';
//import Timer from '/imports/api/timer';
import {FlowRouter} from 'meteor/kadira:flow-router';
//import {setupGateway, activateSystem} from '/imports/api/mysensors-hardware/validated-methods';
const templateName = 'adminServerPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  servers: function(){
    return "";
  }
})


Template[templateName].events({
  "click .js-add-server": function(){
        FlowRouter.go("adminServerCreatePage");
  },
  "click .js-edit-server": function(event){
        const id = event.currentTarget.dataset.id;
        FlowRouter.go("adminServerEditPage",{id: id});
  }
});

Template[templateName].onRendered(function(){

});
