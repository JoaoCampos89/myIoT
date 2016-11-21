import '../select';
import './index.html';



import {Template} from 'meteor/templating';



const templateName = 'formGroupComponent';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  equal: function(type, value){
    return type === value;
  },
  processDateTime: function(value){
    //console.log(value);
    if(value){
      return value.toISOString().slice(0,-1);
    }
      return;
  },
  processDate: function(value){
    //console.log(value);
    if(value){
      return value.toISOString().slice(0, 10);
    }
      return;
  }
})
