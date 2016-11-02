import './index.css';
import './index.html';
import './create';

import {Template} from 'meteor/templating';
import GameType from '/imports/api/gameType';
import {FlowRouter} from 'meteor/kadira:flow-router';

const templateName = 'adminGameTypePage';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({
  games: function(){
    return GameType.find({});
  }
})


Template[templateName].events({
  "click .js-add-game": function(){
        FlowRouter.go("adminGameTypeCreatePage");
  }
});

Template[templateName].onRendered(function(){

});
