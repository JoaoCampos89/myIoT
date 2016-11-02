//const gwType						= 'Ethernet';
//const gwAddress						= '10.0.1.99';
//const gwPort						= 9999;
// declare singletone MySensors
//
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import MySensors from './mysensors.js';
import Target from '../target/collection.js';
import fs from 'fs';
import path from 'path';
import requestify from 'requestify';
import gw from './gateway.js';
import {check} from 'meteor/check';
import _ from 'underscore';
//export MySensors.collections;
//var NodeIdToReboot = 1;
// create required mySensors collections

//Target.insert({status:true});
var db = {};
Meteor.startup(function(){
  /*MySensors.collections['node'].update({
                            'id': NodeIdToReboot
                            }, {
                              $set: {
                                'reboot': 1
                      }});*/
});

// descomentar

const gwType = 'Serial';
const gwPort = 'COM22';
//const gwPort = '/dev/ttyAMA0';
const gwBaud = 115200;



const dbAddress						= '127.0.0.1';
const dbPort						= 27017;
const dbName						= 'MySensorsDb';


const fwSketches					= [ ];
const fwDefaultType 				= 0xFFFF; // index of hex file from array above (0xFFFF

const FIRMWARE_BLOCK_SIZE			= 16;
const BROADCAST_ADDRESS				= 255;
const NODE_SENSOR_ID				= 255;

const C_PRESENTATION				= 0;
const C_SET							= 1;
const C_REQ							= 2;
const C_INTERNAL					= 3;
const C_STREAM						= 4;

/*const V_TEMP						= 0;
const V_HUM							= 1;
const V_LIGHT						= 2;
const V_DIMMER						= 3;
const V_PRESSURE					= 4;
const V_FORECAST					= 5;
const V_RAIN						= 6;
const V_RAINRATE					= 7;
const V_WIND						= 8;
const V_GUST						= 9;
const V_DIRECTION					= 10;
const V_UV							= 11;
const V_WEIGHT						= 12;
const V_DISTANCE					= 13;
const V_IMPEDANCE					= 14;
const V_ARMED						= 15;
const V_TRIPPED						= 16;
const V_WATT						= 17;
const V_KWH							= 18;
const V_SCENE_ON					= 19;
const V_SCENE_OFF					= 20;
const V_HEATER						= 21;
const V_HEATER_SW					= 22;
const V_LIGHT_LEVEL					= 23;
const V_VAR1						= 24;
const V_VAR2						= 25;
const V_VAR3						= 26;
const V_VAR4						= 27;
const V_VAR5						= 28;
const V_UP							= 29;
const V_DOWN						= 30;
const V_STOP						= 31;
const V_IR_SEND						= 32;
const V_IR_RECEIVE					= 33;
const V_FLOW						= 34;
const V_VOLUME						= 35;
const V_LOCK_STATUS					= 36;*/

const I_BATTERY_LEVEL				= 0;
const I_TIME						= 1;
const I_VERSION						= 2;
const I_ID_REQUEST					= 3;
const I_ID_RESPONSE					= 4;
const I_INCLUSION_MODE				= 5;
const I_CONFIG						= 6;
const I_PING						= 7;
const I_PING_ACK					= 8;
const I_LOG_MESSAGE					= 9;
const I_CHILDREN					= 10;
const I_SKETCH_NAME					= 11;
const I_SKETCH_VERSION				= 12;
const I_REBOOT						= 13;
const I_GATEWAY_READY	= 14;
const I_REQUEST_SIGNING	= 15;
const I_GET_NONCE =	16;
const I_GET_NONCE_RESPONSE = 17;
const I_HEARTBEAT	= 18;
const I_PRESENTATION =	19;
const I_DISCOVER = 20;
const I_DISCOVER_RESPONSE	= 21;
const I_HEARTBEAT_RESPONSE	= 22;
const I_LOCKED	= 23;
//const I_PING =	24;
const I_PONG =	25;
const I_REGISTRATION_REQUEST =	26;
const I_REGISTRATION_RESPONSE =	27;
const I_DEBUG	=28;




const S_DOOR						= 0;
const S_MOTION						= 1;
const S_SMOKE						= 2;
const S_LIGHT						= 3;
const S_DIMMER						= 4;
const S_COVER						= 5;
const S_TEMP						= 6;
const S_HUM							= 7;
const S_BARO						= 8;
const S_WIND						= 9;
const S_RAIN						= 10;
const S_UV							= 11;
const S_WEIGHT						= 12;
const S_POWER						= 13;
const S_HEATER						= 14;
const S_DISTANCE					= 15;
const S_LIGHT_LEVEL					= 16;
const S_ARDUINO_NODE				= 17;
const S_ARDUINO_REPEATER_NODE		= 18;
const  S_LOCK						= 19;
const  S_IR							= 20;
const  S_WATER						= 21;
const  S_AIR_QUALITY				= 22;

const ST_FIRMWARE_CONFIG_REQUEST	= 0;
const ST_FIRMWARE_CONFIG_RESPONSE	= 1;
const ST_FIRMWARE_REQUEST			= 2;
const ST_FIRMWARE_RESPONSE			= 3;
const ST_SOUND						= 4;
const ST_IMAGE						= 5;

const P_STRING						= 0;
const P_BYTE						= 1;
const P_INT16						= 2;
const P_UINT16						= 3;
const P_LONG32						= 4;
const P_ULONG32						= 5;
const P_CUSTOM						= 6;





var appendedString="";

function crcUpdate(old, value) {
	var c = old ^ value;
	for (var i = 0; i < 8; ++i) {
		if ((c & 1) > 0)
			c = ((c >> 1) ^ 0xA001);
		else
			c = (c >> 1);
	}
	return c;
}

function pullWord(arr, pos) {
	return arr[pos] + 256 * arr[pos + 1];
}

function pushWord(arr, val) {
	arr.push(val & 0x00FF);
	arr.push((val  >> 8) & 0x00FF);
}

function pushDWord(arr, val) {
	arr.push(val & 0x000000FF);
	arr.push((val  >> 8) & 0x000000FF);
	arr.push((val  >> 16) & 0x000000FF);
	arr.push((val  >> 24) & 0x000000FF);
}



function sendNextAvailableSensorId(db, gw) {
  var gateway = MySensors.collections['gateway'].findOne({id:"ipsc"});
  console.log(gateway);
  if(gateway){
    console.log("I am here");
      var id;
      if(gateway.totalNodes){
        id = gateway.totalNodes+1;
      }else {
        id = 1;
      }
    if (id < 255) {
      console.log("I am here again");
     var gatewayId =  MySensors.collections['gateway'].update({id:"ipsc"},{$push:{"nodes":{"id":id,sensor:[]}},$inc:{"totalNodes":1}});
     if(gatewayId){
       var destination = BROADCAST_ADDRESS;
       var sensor = NODE_SENSOR_ID;
       var command = C_INTERNAL;
       var acknowledge = 0; // no ack
       var type = I_ID_RESPONSE;
       var payload = id;
       var td = encode(destination, sensor, command, acknowledge, type, payload);
       console.log('-> ' + td.toString());
       gw.write(td);
     }
    }

  }

	// var results = MySensors.collections['node'].find({
	// 		$query: { },
	// 		$orderby: {
	// 			'id': 1
	// 		}
	// 	}).fetch();
  //
  //   if(results){
  //     id = 1;
	// 		for (var i = 0; i < results.length; i++)
	// 			if (results[i].id > i + 1) {
	// 				id = i + 1;
	// 				break;
	// 			}
	// 		if (id < 255) {
	// 			var nodeId = MySensors.collections['node'].insert({
	// 				'id': id
	// 			});
  //         console.log("saved a node");
  //
  //         if(nodeId){
  //           var destination = BROADCAST_ADDRESS;
  //           var sensor = NODE_SENSOR_ID;
  //           var command = C_INTERNAL;
  //           var acknowledge = 0; // no ack
  //           var type = I_ID_RESPONSE;
  //           var payload = id;
  //           var td = encode(destination, sensor, command, acknowledge, type, payload);
  //           console.log('-> ' + td.toString());
  //           gw.write(td);
  //       }



		// 	}
    // }

}



function saveSketchName(sender, payload, db) {

    console.log("saving sketch Name "+payload+ "from"+ sender);
    var gateway = MySensors.collections['gateway'].findOne({id:"ipsc","nodes.id":sender});


  MySensors.collections['gateway'].update({id:"ipsc","nodes.id":sender},{$set:{"nodes.$.sketchName":payload}});
  // if(gateway){
  //   MySensors.collections['gateway'].update({id:"ipsc","nodes.id":sender},{$set:{"nodes.$.sketchName":payload}});
  // }else{
  //   MySensors.collections['gateway'].update({id:"ipsc"}, {$push:{nodes:{id:sender,sketchName:payload}},$inc:{"totalNodes":1}});
  // }
}

function saveSketchVersion(sender, payload, db) {
  // var gateway = MySensors.collections['gateway'].findOne({id:"ipsc","nodes.id":sender});
  // if(gateway){
  //   MySensors.collections['gateway'].update({id:"ipsc","nodes.id":sender},{$set:{"nodes.$.sketchVersion":payload}});
  // }else{
  //   MySensors.collections['gateway'].update({id:"ipsc"}, {$push:{nodes:{id:sender,sketchVersion:payload}},$inc:{"totalNodes":1}});
  // }

  console.log("saving sketch Version" + payload+ "from"+sender);
  MySensors.collections['gateway'].update({id:"ipsc","nodes.id":sender},{$set:{"nodes.$.sketchVersion":payload}});
}



function decode(msg) {
	var msgs = msg.toString().split(";");
  var rsender = '';
	rsender = +msgs[0];
	rsensor = +msgs[1];
	rcommand = +msgs[2];
	rtype = +msgs[3];
	var pl = msgs[4].trim();
	rpayload = [];
	for (var i = 0; i < pl.length; i+=2) {
		var b = parseInt(pl.substring(i, i + 2), 16);
		rpayload.push(b);
	}
}


function encode(destination, sensor, command, acknowledge, type, payload) {
	var msg = destination.toString(10) + ";" + sensor.toString(10) + ";" + command.toString(10) + ";" + acknowledge.toString(10) + ";" + type.toString(10) + ";";
	if (command == 4) {
		for (var i = 0; i < payload.length; i++) {
			if (payload[i] < 16)
				msg += "0";
			msg += payload[i].toString(16);
		}
	} else {
		msg += payload;
	}
	msg += '\n';
	return msg.toString();
}

gw.encode = encode;



/**
 * [saveProtocol save protocolo in node collection]
 * @method saveProtocol
 * @param  {[type]}     sender  [description]
 * @param  {[type]}     payload [description]
 * @param  {[type]}     db      [description]
 * @return {[type]}             [description]
 */

function saveProtocol(sender, payload, db) {
    /*MySensors.collections['node'].update({
          'id': sender
        }, {
          $set: {
            'protocol': payload
          }
    },  {upsert:true});
*/
    console.log("saving protocol" + payload+ "from sender" + sender);
    var gateway = MySensors.collections['gateway'].findOne({id:"ipsc","nodes.id":sender});
    if(gateway){
      MySensors.collections['gateway'].update({id:"ipsc","nodes.id":sender},{$set:{"nodes.$.protocol":payload}});
    }else{
      MySensors.collections['gateway'].update({id:"ipsc"}, {$push:{nodes:{id:sender,protocol:payload,sensor:[]}},$inc:{"totalNodes":1}});
    }



}

function saveSensor(sender, sensor, type, db) {
/*  MySensors.collections['node'].update({
          'id': sender
        }, {
          $addToSet: {
            sensor: type
          }
        });*/
        //  var gateway = MySensors.collections['gateway'].findOne({id:"ipsc","nodes.id":sender});
        //  if(gateway){
        //    if(gateway.nodes.sensor){
        //      //console.log(gateway);
        //       MySensors.collections['gateway'].update({id:"ipsc","nodes.id":sender},{$addToSet:{"nodes.$.sensor":{id:sensor,type:type}}});
        //     }else{
        //     //  console.log(gateway);
        //       MySensors.collections['gateway'].update({id:"ipsc","nodes.id":sender},{$addToSet:{"nodes.$.sensor":{id:sensor,type:type}}});
        //     }
        //  }else{
        //    MySensors.collections['gateway'].update({id:"ipsc"}, {$push:{nodes:{id:sender,sensor:[{id:sensor,type:type}]},$inc:{"totalNodes":1}}});
        //  }

           MySensors.collections['gateway'].update({id:"ipsc","nodes.id":sender},{$addToSet:{"nodes.$.sensor":{id:sensor,type:type}}});
  //MySensors.collections['gateway'].update({id:"ipsc","nodes.id":sender},{$addToSet:{"nodes.$.sensor":{id:sensor,type:type}}});
  //console.log("saving type" + type+ "sensor"+sensor+"sender"+sender);

}

function saveValue(sender, sensor, type, payload, db) {
	var cn = "Value-" + sender.toString() + "-" + sensor.toString();
  if(!(cn in MySensors.collections)){
        MySensors.collections[cn] = new Mongo.Collection(cn);
    }
    if(type == 48 && sender.toString()=='1'){
         //console.log(Target);
          Target.update({targetId:1},{$set:{status:true}});
        //  console.log('teste');
        //
    }

    MySensors.collections[cn].insert({
      'timestamp': new Date().getTime(),
      'type': type,
      'value': payload
    });
    if(type == 48){
          MySensors.collections['value'].insert({
            'timestamp': new Date().getTime(),
            'type': type,
            'value': payload,
            'node': sender.toString(),
            'sensor': sensor.toString()
          });
    }




}

function saveBatteryLevel(sender, payload, db) {
	var cn = "BatteryLevel-" + sender.toString();
  if(!(cn in MySensors.collections)){
        MySensors.collections[cn] = new Mongo.Collection(cn);
    }

    MySensors.collections[cn].insert({
      'timestamp': new Date().getTime(),
      'value': payload
    });
}

function sendConfig(destination, gw) {
	var payload = "M";
	var sensor = NODE_SENSOR_ID;
	var command = C_INTERNAL;
	var acknowledge = 0; // no ack
	var type = I_CONFIG;
	var td = encode(destination, sensor, command, acknowledge, type, payload);
	//console.log('-> ' + td.toString());
	gw.write(td);
}



function sendTime(destination, sensor, gw) {
	var payload = new Date().getTime()/1000;
	var command = C_INTERNAL;
	var acknowledge = 0; // no ack
	var type = I_TIME;
	var td = encode(destination, sensor, command, acknowledge, type, payload);
	console.log('-> ' + td.toString());
	gw.write(td);
}



function saveRebootRequest(destination, db) {
/*  MySensors.collections['node'].update({
          'id': destination
              }, {
          $set: {
            'reboot': 1
          }
        });*/
}

function checkRebootRequest(destination, db, gw) {
  //console.log('check reboot: '+ destination);
/*  var result = MySensors.collections['node'].findOne({
          'id': destination
              }
        );
      //  console.log(result);
        if(result){
          if (result.reboot == 1)
           sendRebootMessage(destination,gw);
        }*/


    //
    //

}
/**
 * under test
 * [saveGatewayReady gateway ready to receive messages]
 * @method saveGatewayReady
 * @param  {[type]}         sender  [description]
 * @param  {[type]}         payload [description]
 * @return {[type]}                 [description]
 */
function saveGatewayReady(sender, payload){
  console.log('gateway ready payload:' + payload );
  MySensors.collections['settings'].update({id:'mysensors'},{
    $set:{gatewayready:true}
  });
}

/**
 * [saveHeartbeatResponse description]
 * @method saveHeartbeatResponse
 * @param  {[type]}              sender  [description]
 * @param  {[type]}              payload [description]
 * @return {[type]}                      [description]
 */
function saveHeartbeatResponse(sender, payload){
  MySensors.collections['gateway'].update({id:"ipsc","nodes.id":sender},{
    $set:{"nodes.$.heartbeat":payload}
  });
}

function sendRebootMessage(destination, gw) {
	      var sensor = NODE_SENSOR_ID;
        var command = C_INTERNAL;
        var acknowledge = 0; // no ack
        var type = I_REBOOT;
        var payload = "";
        var td = encode(destination, sensor, command, acknowledge, type, payload);
        console.log('-> ' + td.toString());
        gw.write(td);
}


function appendData(str, db, gw) {
    var pos=0;
    while (str.charAt(pos) != '\n' && pos < str.length) {
        appendedString=appendedString+str.charAt(pos);
        pos++;
    }
    if (str.charAt(pos) == '\n') {
        rfReceived(appendedString.trim(), db, gw);
        appendedString="";
    }
    if (pos < str.length) {
        appendData(str.substr(pos+1,str.length-pos-1), db, gw);
    }
}

function rfReceived(data, db, gw) {
	if ((data != null) && (data != "")) {
		console.log("rf-received " +data.toString()+ "length:" + data.length);
		// decoding message
		var datas = data.toString().split(";");
		var sender = +datas[0];
		var sensor = +datas[1];
		var command = +datas[2];
		var ack = +datas[3];
		var type = +datas[4];
    var rawpayload="";
    if (datas[5]) {
          rawpayload = datas[5].trim();
		}
		var payload;
		if (command == C_STREAM) {
			payload = [];
			for (var i = 0; i < rawpayload.length; i+=2)
				payload.push(parseInt(rawpayload.substring(i, i + 2), 16));
		} else {
			payload = rawpayload;
		}
    // activated when logging of messages is needed
    if(MySensors.log&&_.isNumber(command)&&_.isNumber(type)){

        var commandString = _.findKey(MySensors.protocol, function(object){return object.value == command});
        if(_.isString(commandString)){
          var typeString = _.findKey(MySensors.protocol[commandString]['subType'], function(object){return object===type});
          MySensors.collections['message'].insert({command:commandString,sender:sender,sensor:sensor,ack:ack,type:typeString,payload:payload});
        }
    }
  //  console.log("command:" + command);

		// decision on appropriate response
		switch (command) {
		case C_PRESENTATION:
			if (sensor == NODE_SENSOR_ID)
				saveProtocol(sender, payload, db);
			saveSensor(sender, sensor, type, db);
			break;
		case C_SET:
			saveValue(sender, sensor, type, payload, db);
			break;
		case C_REQ:
			break;
		case C_INTERNAL:
			switch (type) {
			case I_BATTERY_LEVEL:
				saveBatteryLevel(sender, payload, db);
				break;
			case I_TIME:
				sendTime(sender, sensor, gw);
				break;
			case I_VERSION:
				break;
			case I_ID_REQUEST:
				sendNextAvailableSensorId(db, gw);
				break;
			case I_ID_RESPONSE:
				break;
			case I_INCLUSION_MODE:
				break;
			case I_CONFIG:
				sendConfig(sender, gw);
				break;
			case I_PING:
				break;
			case I_PING_ACK:
				break;
			case I_LOG_MESSAGE:
				break;
			case I_CHILDREN:
				break;
			case I_SKETCH_NAME:
				saveSketchName(sender, payload, db);
				break;
			case I_SKETCH_VERSION:
				saveSketchVersion(sender, payload, db);
				break;
			case I_REBOOT:
				break;
      case I_GATEWAY_READY:
        saveGatewayReady(sender,payload);
        break;
      case I_HEARTBEAT_RESPONSE:
        saveHeartbeatResponse(sender,payload);
        break;
      }
			break;
		case C_STREAM:
			switch (type) {
					case ST_FIRMWARE_CONFIG_REQUEST:
							var fwtype = pullWord(payload, 0);
							var fwversion = pullWord(payload, 2);
							sendFirmwareConfigResponse(sender, fwtype, fwversion, db, gw);
							break;
					case ST_FIRMWARE_CONFIG_RESPONSE:
							break;
					case ST_FIRMWARE_REQUEST:
							var fwtype = pullWord(payload, 0);
							var fwversion = pullWord(payload, 2);
							var fwblock = pullWord(payload, 4);
							sendFirmwareResponse(sender, fwtype, fwversion, fwblock, db, gw);
							break;
					case ST_FIRMWARE_RESPONSE:
							break;
					case ST_SOUND:
							break;
					case ST_IMAGE:
							break;
			}
			break;
		}
		checkRebootRequest(sender, db, gw);
	}
}
	// ToDo : check for new hex files / only load if new / get type and version from filename
	for (var i = 0; i < fwSketches.length; i++)
		loadFirmware(i, 1, fwSketches[i], db);


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
  //  console.log(rd.toString());
    //console.log("I am here");
    //
  //  appendData(rd.toString(), db, gw);
    rfReceived(rd.toString(), db, gw);
  })).on('end', Meteor.bindEnvironment(function() {
    console.log('disconnected from gateway');
    MySensors.collections['settings'].update({id:'mysensors'},{
      $set:{status:false,gatewayready:false}
    });
  })).on('error',Meteor.bindEnvironment( function() {
    console.log('connection error - trying to reconnect');
    //gw.open();
    MySensors.collections['settings'].update({id:'mysensors'},{
      $set:{status:false,gatewayready:false}
    });
    //gw.open();
  }));









Meteor.setInterval(function() {
  sendTime(BROADCAST_ADDRESS, NODE_SENSOR_ID, gw);
}, 5*60*1000);
