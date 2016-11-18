import './index.html';

import {Template} from 'meteor/templating';
import {createTimer} from '/imports/api/timer/validated-methods';
//import {FlowRouter} from 'meteor/kadira:flow-router';

const templateName = 'adminTimerCreatePage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  validatedMethod: function(){
    return createTimer;
  },
  route:function(){
    return 'adminTimerPage';
  }
});




Template[templateName].onRendered(function(){

});
