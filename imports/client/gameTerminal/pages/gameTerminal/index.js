import './index.css';
import './index.html';

import {Template} from 'meteor/templating';
import TargetGroup from '/imports/api/targetGroup';
import {FlowRouter} from 'meteor/kadira:flow-router';

const templateName = 'gameTerminalPage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  rooms: function(){
      return TargetGroup.find();
  }
})


Template[templateName].events({
  'click .js-choose-room':function(event){
    const id = event.currentTarget.dataset.id;
    FlowRouter.go("gameTerminalIndexPage", {id: id});
  }
});

Template[templateName].onRendered(function(){

});
