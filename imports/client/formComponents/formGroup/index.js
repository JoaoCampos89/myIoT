import './index.html';
//import '../select';


import {Template} from 'meteor/templating';



const templateName = 'formGroupComponent';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  selected: function(value, field){
   return value === field ? 'selected' : null;
  //  return 'selected';
},
  equal: function(type, value){
  return type === value;
  }
})
