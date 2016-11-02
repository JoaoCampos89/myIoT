import MySensors from './mysensors.js';
import encode from './encode.js';
import rfReceived from './api/rfReceived.js';
import {sendTime} from './api/functions.js';
import protocol from './protocol.js';
//import SerialPort from 'serialport';
/**
 *  Gateway hardware
 *
 *
 */

import {Meteor} from 'meteor/meteor';

var gw;
const gwType = 'Serial';
const gwPort = 'COM8';
//const gwAddress						= '192.168.1.2';
//const gwPort						= 5003;
//const gwPort = '/dev/ttyAMA0';
const gwBaud = 115200;


if(gwType === "Serial"){
  var SerialPort = require('serialport');
  //var ReadLine = SerialPort.parsers.ReadLine;
gw = new SerialPort(gwPort, { baudrate: gwBaud, parser: SerialPort.parsers.readline("\n"), autopen:true });
// gw = new SerialPort(gwPort, { baudrate: gwBaud });
//  var parser = gw.pipe(ReadLine({delimiter: '\r\n'}));
  //parser.on('data', console.log);
}
else {
  gw = require('net').Socket();
  gw.setEncoding('ascii');
  gw.connect(gwPort, gwAddress);
  gw.port = gwPort;
  gw.address =  gwAddress;

  MySensors.collections['settings'].update({id:'mysensors'},{$set:{status:true}});
  gw.status = true;
  gw.isOpen = function(){
    return this.status;
  }
  gw.close = function(callback){
    gw.end();
    gw.on('close',callback);
  };
}
var db = {};
gw.status = false;
gw.type = gwType;
gw.encode = encode;

if (gwType == 'Ethernet') {


  gw.on('connect', Meteor.bindEnvironment(function() {
    MySensors.collections['settings'].update({id:'mysensors'},{
      $set:{status:true}
    });
    console.log('connected to serial gateway at ' + gwPort);

  }));

}else if (gwType == 'Serial') {
  //var SerialPort = require('serialport').SerialPort;
  //gw = new SerialPort(gwPort, { baudrate: gwBaud });
  //gw.open();
  //gw.status = false;
  gw.on('open', Meteor.bindEnvironment( function() {
    MySensors.collections['settings'].update({id:'mysensors'},{
      $set:{status:true}
    });
    console.log('connected to serial gateway at ' + gwPort);
  }));
} else {
  throw new Error('unknown Gateway type');
}

gw.on('data',Meteor.bindEnvironment( function(rd) {
  gw.status = true;
//  console.log(rd.toString());
  //console.log("I am here");
  //
//  appendData(rd.toString(), db, gw);
  rfReceived(rd.toString(), db, gw);
})).on('end', Meteor.bindEnvironment(function() {
    gw.status = false;
  console.log('disconnected from gateway');
  MySensors.collections['settings'].update({id:'mysensors'},{
    $set:{status:false,gatewayready:false}
  });
})).on('error',Meteor.bindEnvironment( function() {
    gw.status = false;
  console.log('connection error - trying to reconnect');
  //gw.open();
  MySensors.collections['settings'].update({id:'mysensors'},{
    $set:{status:false,gatewayready:false}
  });
  //gw.open();
}));

Meteor.setInterval(function() {
  if(gw.status){
    sendTime(protocol['BROADCAST_ADDRESS'], protocol['NODE_SENSOR_ID'], gw);
  }
}, 5*60*1000);


export default gw;
