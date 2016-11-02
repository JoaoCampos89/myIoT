import './create.html';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import GameType from '/imports/api/gameType';
import TargetGroup from '/imports/api/targetGroup';
import _ from 'underscore';
import 'typeahead.js';
import {createGame} from '/imports/api/game/validated-methods.js';


const templateName = 'gameCreatePage';



Template[templateName].onCreated(function(){
  const instance = this;
  instance.state = new ReactiveDict();
  instance.state.setDefault({gameType:"Tiro Alvo",maxPlayers:1});

});

Template[templateName].helpers({
  gameTypes:function(){
    return GameType.find({});
  },
/*  maxPlayers:function(){
    var gameTypeId = Template.instance().state.get("gameType");
    var gameType = GameType.findOne({_id:gameTypeId});
    console.log(gameType);
    return _(gameType.maxPlayers).times(function(n){ return n+1; });
  },*/
  rooms:function(){
    return TargetGroup.find({});
  },
  getState: function(state){
    return Template.instance().state.get(state);
  }
})


Template[templateName].events({
  "change .js-select-game-type": function(event, template){
    //template.state.set({form:{'${event.currentTarget.name}':event.currentTarget.value}});
    template.state.set("gameType", event.currentTarget.value);

  },
  'click .js-create-game':function(event,template){

      var data = {};
      //data.maxPlayers = Number(template.$('.js-select-max-players').val());
      data.type = template.$('.js-select-game-type').val();
      data.room = template.$('.js-select-room').val();
      data.name = template.$('.js-game-name').val();

      createGame.call(data, function(error, result){
          if(result){
            FlowRouter.go("gameWaitingPlayersPage",{id:result});
          }
        });
  }
});
