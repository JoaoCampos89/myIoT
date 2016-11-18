import {Meteor} from 'meteor/meteor';





import '../../api/accounts';
//import '../../api/game/index.js';
//import '../../api/game/validated-methods.js';
import '../../api/user';
import '/imports//api/myiot-api';
import '/imports/api/timer/validated-methods';
import '/imports/api/user-sensor/validated-methods';
import '/imports/api/rule/validated-methods';
//import '../../api/mysensors/index.js';
//import '../../api/mysensors-api/validated-methods';
import '/imports/api/mysensors-hardware/validated-methods';
import Sensor from '/imports/api/mysensors-hardware/sensor-db';
import Gateway from '/imports/api/mysensors-hardware/gateway-db';
import {protocol} from '/imports/api/myiot-api';
import _ from 'underscore';
//import '../../api/targetGroup/validated-methods.js';
//import MySensors from '../../api/mysensors/mysensors.js';
//import Player from '../../api/player';
//import TargetGroup from '../../api/targetGroup';
//import {Gateway, initializeGateway} from '../../api/mysensors-hardware';
//import GameType from '../../api/gameType';
//import Game from '../../api/game';
//import '../client/accounts/index.js';

function subTypefromTypeSensor(type){
  const subTypes= [];
  const sensorType =  _.findWhere(protocol['C_PRESENTATION'],{value:type});
  protocol['SENSORS'][sensorType.name].forEach(function(subType){
      const sub =    _.findWhere(protocol['C_SET'],{name:subType});
      console.log(sub);
      subTypes.push({name:subType, type:subType, value:0, previousValue:0});

  })
  return subTypes;
}


//var generateFixtures = true;
/*
Meteor.startup(function() {
  if(Sensor.find({}).count() === 0){
    const gateway = Gateway.find().fetch();
    console.log(gateway);
    gateway[0].nodes.forEach(function(node){
              node.sensor.forEach(function(sensor){
                  console.log(sensor);
                    const subTypes = subTypefromTypeSensor(sensor.type);
                    const sensorType =  _.findWhere(protocol['C_PRESENTATION'],{value:sensor.type});
                    Sensor.insert({gatewayId:gateway[0]._id, nodeId:node.id, type:sensor.type, name:sensorType.name, id:sensor.id, subTypes });
              });
    });
  }



});
*/
