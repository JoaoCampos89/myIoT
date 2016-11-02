import './index.css';
import './index.html';

import {Template} from 'meteor/templating';
import GameType from '/imports/api/gameType';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveVar} from 'meteor/reactive-var';
import {createGameTerminal} from '/imports/api/game/validated-methods.js';

const templateName = 'gameTerminalIndexPage';

Template[templateName].onCreated(function(){
    const instance = this;
    instance.gameTypeId = new ReactiveVar(false);
    instance.type = new ReactiveVar(false);
});

Template[templateName].helpers({
  gameTypes: function(){
    return GameType.find({});
  },
  equalChoose: function(type, gameTypeId){
    const instance = Template.instance();
    return (instance.gameTypeId.get() === gameTypeId && instance.type.get()===type) ? "selected" : "";
  }
})


Template[templateName].events({
  "click .js-choose-game": function(event, instance){
    event.preventDefault();
    instance.gameTypeId.set(event.currentTarget.dataset.id);
    instance.type.set(event.currentTarget.dataset.type);
  },

  "click .js-create-game": function(event, instance){
    event.preventDefault();
    const gameTypeId = instance.gameTypeId.get();
    const type = instance.type.get();
    const roomId = FlowRouter.getParam("id");
    let data = {};
    data.gameTypeId = gameTypeId;
    data.type = type;
    data.roomId = roomId;
    createGameTerminal.call(data, function(errors,result){
        if(errors){
          console.log(errors);
        }
        if (result){
          if(result.option === "individual"){
            console.log(result.option === "individual");
            FlowRouter.go("gameTerminalMountIndividualPage",{id:FlowRouter.getParam("id"), gameId:result._id});
          }
          else {
            FlowRouter.go("gameTerminalMountTeamsPage",{id:FlowRouter.getParam("id"), gameId:result._id});
          }

        }
    });


  }
});

Template[templateName].onRendered(function(){

});
