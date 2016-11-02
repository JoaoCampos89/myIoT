import './index.html';

import {Template} from 'meteor/templating';
import {createTargetGroup} from '/imports/api/targetGroup/validated-methods.js';


const templateName = 'adminTargetGroupCreatePage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  validatedMethod: function(){
    return createTargetGroup;
  },
  route: function(){
    return "adminTargetGroupPage";
  }
})


Template[templateName].events({

});

Template[templateName].onRendered(function(){

});
