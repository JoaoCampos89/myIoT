import './index.html';

import {Template} from 'meteor/templating';



const templateName = 'selectComponent';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  selectedField: function(value, field){
   return value === field ? 'selected' : null;
  //  return 'selected';
}})


Template[templateName].events({
  'change select': function(event, instance){
      instance.data.selected.set(instance.$('select').val());
  }
});

Template[templateName].onRendered(function(){

});
