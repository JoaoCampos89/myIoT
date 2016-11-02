import {Meteor} from 'meteor/meteor';
import MySensors from './mysensors.js';
import gw from './gateway.js';
import {check} from 'meteor/check';
import {Roles} from 'meteor/alanning:roles';
import protocol from './protocol.js';

/**
 * [command method]
 * @method command
 * @param  {[type]} {destination [description]
 * @param  {[type]} sensor       [description]
 * @param  {[type]} command      [description]
 * @param  {[type]} acknowledge  [description]
 * @param  {[type]} type         [description]
 * @param  {[type]} payload}     [description]
 * @return {[type]}              [description]
 */
export function command({destination, sensor, command, acknowledge, type, payload}){
  // checking all protocol data
  check(destination, Number);
  check(sensor, Number);
  check(command, Number);
  check(acknowledge, Number);
  check(type, Number);
  check(payload, String);
  var gatewayready =  MySensors.collections['settings'].findOne({id:'mysensors'}).gatewayready;
  if(!gatewayready)
    throw new Meteor.Error(500, "gateway not ready");
  // user roles when prototyping is finish
  // Roles.userIsInRole(this.userId, ['view-secrets','admin'], group)
  if(gw.isOpen()){

    var msg =  gw.encode(destination, sensor, command, acknowledge, type, payload);
    gw.write(msg, Meteor.bindEnvironment(function(error){
          if (error)
            throw new Meteor.Error(500, "could not write message");
    }));
  }else{
    throw new Meteor.Error(500, "serial not open");
  }
}

/**
 * [activateSystem activate serial port]
 * @method activateSystem
 * @return {[boolean]}       [if system open, returns true]
 */
export function activateSystem(){
        //check(status,Boolean);
        console.log(gw.isOpen());

        if(gw.isOpen()){
          gw.close(Meteor.bindEnvironment(function(error){
              if(error){
                console.log(error);
                throw new  Meteor.Error(404, "gateway not closed");
              }
              MySensors.collections['settings'].update({id:'mysensors'},{$set:{status:false,gatewayready:false}});

          }));
        }else{
          var errorCallback = function(error){
            if(error){
             throw new  Meteor.Error(404, "gateway not open");
            }
              MySensors.collections['settings'].update({id:'mysensors'},{$set:{status:true}});
              return true;
          }

          if(gw.type === 'Serial'){
            gw.open(Meteor.bindEnvironment(errorCallback));
          }else if (gw.type === 'Ethernet') {
            gw.connect(gw.address, gw.port);
          }
        }
  }
/**
 * [gameStatus Initiate game in destination sensor]
 * @method gameStatus
 * @param  {[Boolean]}   status [description]
 * @param  {[Number]}   destination [description]
 * @return {[Date]}          [return Date when message arrived]
 */
export function gameStatus({status, destination}){
  check(status, Boolean);
  check(destination, Number);
  var payload = '';
  if (status)
    payload = true;
    else {
    payload = false
  }
  var command = protocol['C_SET'].value;
  var acknowledge = 1; // no ack
  var type = protocol['C_SET']['subType']['V_VAR1'];
  var sensor = 23;
//  var destination = 2;
  var td = gw.encode(destination, sensor, command, acknowledge, type, payload);
  console.log('-> ' + td.toString());
  gw.write(td, Meteor.bindEnvironment(function(error){
    if(error){
        throw new Meteor.Error(500, "serial error");
    }

  }));
  return new Date().getTime();
}





// register all methods in Meteor global
Meteor.methods({
  'mysensors.activateSystem': activateSystem,
  'mysensors.removevalues': function(){
    MySensors.collections['value'].remove({});
  },
  // send commands if user is admin only
  'mysensors.command': command,
  // set game true
  'mysensors.gameStatus': gameStatus,
  'mysensors.removemessages':function(){
      MySensors.collections['message'].remove({});
  }
});
