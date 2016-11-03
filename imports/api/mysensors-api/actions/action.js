import {Meteor} from 'meteor/meteor';
import {writeToGateway} from '../../mysensors-hardware';
import timerHandles from './timerHandles.js';
import _ from 'underscore';
const action = {};


/**
 * [setTimeout description]
 * @param {[type]} msg       [description]
 * @param {[type]} time      [description]
 * @param {[type]} gatewayId [description]
 * TODO insert post rule
 */
action.setTimeout =  function(msg, time, gatewayId){
 const handle  = {};
 const id =  Meteor.setTimeout(function(){
        writeToGateway(gatewayId, msg);
  }, time);
  handle.type = 'timeout';
  handle.id = id;
  timerHandles.push(handle);

}

action.setInterval = function(msg, time){
  const handle  = {};
  const id = Meteor.setInterval(function(){

  }, time);
  handle.type = 'interval';
  handle.id = id;
  timerHandles.push(handle);

}



action.clearTimer = function(id, type){
  const handle = _.findWhere(timerHandles,{id:id, type:type});
  if(type == 'interval'){
    Meteor.clearInterval(handle.id);
  }
  if(type == 'timeout'){
    Meteor.clearTimeout(handle.timeout);
  }




}
