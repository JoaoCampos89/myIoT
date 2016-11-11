import '../select';
import './index.html';



import {Template} from 'meteor/templating';



const templateName = 'formGroupComponent';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  equal: function(type, value){
    return type === value;
  }
})
