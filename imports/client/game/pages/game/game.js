import './game.html';
import swal from 'sweetalert';
import '/node_modules/sweetalert/dist/sweetalert.css';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {ReactiveVar} from 'meteor/reactive-var';
import {Meteor} from 'meteor/meteor';
import Game from '/imports/api/game/collection.js';
import MySensors from '/imports/api/mysensors/mysensors.js';
import _ from 'underscore';
import moment from 'moment';
// necessary to format the minutes and seconds
import 'moment-duration-format';

Template.gamePage.onCreated(function() {
  var template = this;
  template.timeCounter = new ReactiveDict();
  template.timeCounter.set('time', 10);
  template.game = new ReactiveDict();
  template.game.set('init', new Date().getTime());
  template.gameStatus = new ReactiveVar(false);
  template.configuredGame = new ReactiveVar(false);
  template.autorun(function() {
    template.subscribe('game.targets');
    template.subscribe('game.gameActive');
  });
});
/**
 * return all targets
 * @method helpers
 * @param  {[type]} {               targets: function( [description]
 * @return {[type]}   [description]
 */

Template.gamePage.helpers({
  /*time: function() {
    var game = Game.findOne({
      players: Meteor.userId(),
      active: true
    });
    var time = _.map(Game.shots, function(shot) {
      if (shot.playerId === Meteor.userId())
        return shot.time;
    });
    return time;
  },*/
  systemStatus:function(){
    return MySensors.collections['settings'].findOne({id:'mysensors'}).status;
  },
  gameStatus:function(){
    var instance = Template.instance();
    return instance.gameStatus.get();
  },
  targetOptions:function(){

    return { status:'green'
            };
  },
  nodes: function() {
    return MySensors.collections['node'].find({});
  },
  game: function() {
    return Game.findOne({
      players: Meteor.userId,
      active: true
    });
  },
  values: function(){
    return MySensors.collections['value'].find({});
  },
  shotTime: function(value){
    var template = Template.instance();
    return convertDuration(moment.duration(value-template.game.get('init')));
  },
  timer: function() {
    var template = Template.instance();
    var duration = moment.duration(template.timeCounter.get('time'), 'seconds');
    return convertDuration(duration);
  },
  configuredGame: function() {
    var template = Template.instance();
    return template.configuredGame.get();
  }


});
var interval = {};

Template.gamePage.events({
  // start game and start counter in client, this counter is not reliable
/*  "click #startGame": function(event, template) {
    Meteor.call("startGame", function(error, result) {
      if (error) {
        console.log("error", error);
      }
      if (result) {
        template.timeCounter.set('time', 10);
      //  interval = Meteor.setInterval(timeLeft(template), 1000);
      }
    });
  },*/
  "click .js-start-game": function(event, template){
      event.preventDefault();
      if(template.gameStatus.get()){
        Meteor.call("mysensors.gameStatus", false, function(error, result){
          if(error){
            console.log("error", error);
          }
          if(result){
             template.gameStatus.set(true);
          }
        });
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
            Meteor.call("mysensors.gameStatus", true, function(error, result){
              if(error){
                console.log("error", error);
              }
              if(result){
                console.log("result"+ result);

                 template.gameStatus.set(true);
                 template.game.set('init', result);
                 template.timeCounter.set('time', 10);
                 interval = Meteor.setInterval(function(){timeLeft(template)}, 1000);
              }
            });

      },3000);
    }
  },
  "click .js-activate-system": function(event, template){

        Meteor.call("mysensors.activateSystem", function(error, result){
          if(error){
            console.log("error", error);
          }
        });
  },
  "click .js-remove-values": function(event, template){
    Meteor.call("mysensors.removevalues", function(error, result){
      if(error){
        console.log("error", error);
      }
    });
  }

});

var timeLeft = function(template) {
  var clock = template.timeCounter.get('time');
  if (clock > 0) {
    clock--;
    template.timeCounter.set('time', clock);
    return true;
    //return console.log(clock);
  } else {
    // if time expired stop the game
    Meteor.call("mysensors.gameStatus", false, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
         template.gameStatus.set(false);
         template.game.set('end', result);

      }
    });
    console.log("That's All Folks");
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
