import './startGame.html';

import {Template} from 'meteor/templating';

import swal from 'sweetalert';
import '/node_modules/sweetalert/dist/sweetalert.css';

import {ReactiveDict} from 'meteor/reactive-dict';
import {ReactiveVar} from 'meteor/reactive-var';
import {Meteor} from 'meteor/meteor';
import Game from '/imports/api/game/index.js';
//import MySensors from '/imports/api/mysensors/mysensors.js';
import {startGame} from '/imports/api/mysensors-api/validated-methods'
//import _ from 'underscore';
import moment from 'moment';
import {FlowRouter} from 'meteor/kadira:flow-router';

var interval;
const templateName = 'startGameComponent';

Template[templateName].onCreated(function(){
  var template = this;
  template.timeCounter = new ReactiveDict();
  template.autorun(function(){


    //
  });


  template.game = new ReactiveDict();
  template.game.set('init', new Date().getTime());
  template.gameStatus = new ReactiveVar(false);
});

Template[templateName].helpers({
  gameStatus:function(){
    return Game.findOne({_id:FlowRouter.getParam("gameId")}).playing;

    //return Template.instance().instance.gameStatus.get();
  },
  timer: function() {
    var template = Template.instance();
    var duration = moment.duration(template.timeCounter.get('time'), 'seconds');
    return convertDuration(duration);
  }
})


Template[templateName].events({
  "click .js-start-game": function(event, template){
      event.preventDefault();
      var data = {};
      //data.status = false;
      data.gameId = FlowRouter.getParam("gameId");
      //data.playerId = Game.findOne({_id:FlowRouter.getParam("id")}).activePlayer().id;
      if(template.gameStatus.get()){
        // stop current game
      /*  gameStatus.call(data, function(error, result){
          if(error){
            console.log("error", error);
          }
          if(result){
             template.gameStatus.set(true);
          }
        });*/
      }else{

          Meteor.setTimeout(function(){
             swal({   title: "Jogo Começa",   text: "3",   timer: 700,   showConfirmButton: false });
          },0);
          Meteor.setTimeout(function(){
              swal({   title: "Jogo Começa",   text: "2",   timer: 700,   showConfirmButton: false });
          },1000);
          Meteor.setTimeout(function(){
              swal({   title: "Jogo Começa",   text: "1",   timer: 800,   showConfirmButton: false });
          },2000);
          Meteor.setTimeout(function(){
            //data.status = true;
            startGame.call(data, function(error, result){
              if(error){
                console.log("error", error);
              }
              if(result){
                console.log("result"+ result);
                var game = Game.findOne(FlowRouter.getParam("gameId"));
                if(game){
                  template.timeCounter.set('time', game.gameType().time/1000);

                }
                 //template.gameStatus.set(true);
                 //template.game.set('init', result);
                 //template.timeCounter.set('time', 10);
                 interval = Meteor.setInterval(function(){timeLeft(template)}, 1000);
              }
            });

      },3000);
    }
  }
});

Template[templateName].onRendered(function(){

});


var timeLeft = function(template) {
  var clock = template.timeCounter.get('time');
  if (clock > 0) {
    clock--;
    template.timeCounter.set('time', clock);
    return true;
    //return console.log(clock);
  } else {
      return Meteor.clearInterval(interval);
  }
};




function convertDuration(duration){
  var seconds = duration.seconds();
  var minutes = duration.minutes();
  if (minutes<9){
    minutes='0'+minutes;
  }
  if (seconds<9){
    seconds= '0'+seconds;
  }

  return minutes+':'+seconds;
}
