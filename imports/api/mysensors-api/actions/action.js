import {Meteor} from 'meteor/meteor';
import {writeToGateway} from '../../mysensors-hardware';
import timerHandles from './timerHandles.js';
import _ from 'underscore';
const Action = {};


/**
 * [setTimeout description]
 * @param {[type]} msg       [description]
 * @param {[type]} time      [description]
 * @param {[type]} gatewayId [description]
 * TODO insert post rule
 */
Action.setTimeout =  function(msg, time, gatewayId){
 const handle  = {};
 const id =  Meteor.setTimeout(function(){
        Action.writeToGateway(gatewayId, msg);
  }, time);
  handle.type = 'timeout';
  handle.id = id;
  timerHandles.push(handle);

}

Action.setInterval = function(msg, time, gatewayId){
  const handle  = {};
  const id = Meteor.setInterval(function(){
    Action.writeToGateway(gatewayId, msg);
  }, time);
  handle.type = 'interval';
  handle.id = id;
  timerHandles.push(handle);
}



Action.clearTimer = function({id, type}){
  const handle = _.findWhere(timerHandles,{id:id, type:type});
  if(type == 'interval'){
    Meteor.clearInterval(handle.id);
  }
  if(type == 'timeout'){
    Meteor.clearTimeout(handle.timeout);
  }
}
Action.beforeWrite = function(){

}

Action.writeToGateway = function({gatewayId, destination, sensor, command, acknowledge, type, payload}){
  Action.beforeWrite();
  writeToGateway(gatewayId, destination, sensor, command, acknowledge, type, payload);
  Action.afterWrite();
}

Action.sendSms = function(){


}




Action.afterWrite = function(){


}
