import MySensors from '../mysensors.js';
import protocol from '../protocol.js';
import Gateway from '../gateway/index.js';
var deviceId = {id:'ipsc'};

/*if(Gateway.find({id:deviceId}).count()==0){
  Gateway.insert({id:deviceId.id});
}*/


/**
 * [saveHeartbeatResponse description]
 * @method saveHeartbeatResponse
 * @param  {[type]}              sender  [description]
 * @param  {[type]}              payload [description]
 * @return {[type]}                      [description]
 */
export function saveHeartbeatResponse(sender, payload){
  console.log('requestHeartbeat received' + payload);
  Gateway.update({id: deviceId.id,"nodes.id":sender},{
    $set:{"nodes.$.heartbeat":payload}
  });
}

export function sendRebootMessage(destination, gw) {
        var sensor  = protocol['NODE_SENSOR_ID'];
        var command = protocol['C_INTERNAL'].value;
        var acknowledge = 0; // no ack
        var type =  protocol['C_INTERNAL']['subType'].I_REBOOT;
        var payload = "";
        var td = gw.encode(destination, sensor, command, acknowledge, type, payload);
        console.log('-> ' + td.toString());
        gw.write(td);
}

/**
 * under test
 * [saveGatewayReady gateway ready to receive messages]
 * @method saveGatewayReady
 * @param  {[type]}         sender  [description]
 * @param  {[type]}         payload [description]
 * @return {[type]}                 [description]
 */
export function saveGatewayReady(sender, payload){
  console.log('gateway ready payload:' + payload );

  MySensors.collections['settings'].update({id:'mysensors'},{
    $set:{gatewayready:true}
  });
  Gateway.update({id: deviceId.id},{
    $set:{"ready":true}
  });
}

export function checkRebootRequest(destination, db, gw) {
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

export function sendTime(destination, sensor, gw) {
	var payload = new Date().getTime()/1000;
	var command = protocol['C_INTERNAL'].value;
	var acknowledge = 0; // no ack
	var type = protocol['C_INTERNAL']['subType'].I_TIME;
	var td = gw.encode(destination, sensor, command, acknowledge, type, payload);
	console.log('-> ' + td.toString());
	gw.write(td);
}



export function saveRebootRequest(destination, db) {
/*  MySensors.collections['node'].update({
          'id': destination
              }, {
          $set: {
            'reboot': 1
          }
        });*/
}

export function saveBatteryLevel(sender, payload, db) {
	var cn = "BatteryLevel-" + sender.toString();
  if(!(cn in MySensors.collections)){
        MySensors.collections[cn] = new Mongo.Collection(cn);
    }

    MySensors.collections[cn].insert({
      'timestamp': new Date().getTime(),
      'value': payload
    });
}

export function sendConfig(destination, gw) {
	var payload = "M";
	var sensor = protocol['NODE_SENSOR_ID'];
	var command = protocol['C_INTERNAL'].value;
	var acknowledge = 0; // no ack
	var type = protocol['C_INTERNAL']['subType'].I_CONFIG;
	var td = gw.encode(destination, sensor, command, acknowledge, type, payload);
	//console.log('-> ' + td.toString());
	gw.write(td);
}


export function sendNextAvailableSensorId(db, gw) {
  var gateway = Gateway.findOne({id:deviceId.id});
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
     var gatewayId =  Gateway.update({id:deviceId.id},{$push:{"nodes":{"id":id,sensor:[]}},$inc:{"totalNodes":1}});
     if(gatewayId){
       var destination = protocol['BROADCAST_ADDRESS'];
       var sensor = protocol['NODE_SENSOR_ID'];
       var command = protocol['C_INTERNAL'].value;
       var acknowledge = 0; // no ack
       var type = protocol['C_INTERNAL']['subType'].I_ID_RESPONSE;
       var payload = id;
       var td = gw.encode(destination, sensor, command, acknowledge, type, payload);
       console.log('-> ' + td.toString());
       gw.write(td);
     }
    }

  }
}

export function saveProtocol(sender, payload, db) {
    /*MySensors.collections['node'].update({
          'id': sender
        }, {
          $set: {
            'protocol': payload
          }
    },  {upsert:true});
*/
    console.log("saving protocol" + payload+ "from sender" + sender);
    var gateway = Gateway.findOne({id:deviceId.id,"nodes.id":sender});
    if(gateway){
      Gateway.update({id:deviceId.id,"nodes.id":sender},{$set:{"nodes.$.protocol":payload}});
    }else{
      Gateway.update({id:deviceId.id}, {$push:{nodes:{id:sender,protocol:payload,sensor:[]}},$inc:{"totalNodes":1}});
    }



}

export function saveSensor(sender, sensor, type, db) {
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

           Gateway.update({id:deviceId.id,"nodes.id":sender},{$addToSet:{"nodes.$.sensor":{id:sensor,type:type}}});
  //MySensors.collections['gateway'].update({id:"ipsc","nodes.id":sender},{$addToSet:{"nodes.$.sensor":{id:sensor,type:type}}});
  //console.log("saving type" + type+ "sensor"+sensor+"sender"+sender);

}

export function saveSketchName(sender, payload, db) {

    console.log("saving sketch Name "+payload+ "from"+ sender);
    var gateway = Gateway.findOne({id:deviceId.id,"nodes.id":sender});


  Gateway.update({id:deviceId.id,"nodes.id":sender},{$set:{"nodes.$.sketchName":payload}});
  // if(gateway){
  //   MySensors.collections['gateway'].update({id:"ipsc","nodes.id":sender},{$set:{"nodes.$.sketchName":payload}});
  // }else{
  //   MySensors.collections['gateway'].update({id:"ipsc"}, {$push:{nodes:{id:sender,sketchName:payload}},$inc:{"totalNodes":1}});
  // }
}

export function saveSketchVersion(sender, payload, db) {
  // var gateway = MySensors.collections['gateway'].findOne({id:"ipsc","nodes.id":sender});
  // if(gateway){
  //   MySensors.collections['gateway'].update({id:"ipsc","nodes.id":sender},{$set:{"nodes.$.sketchVersion":payload}});
  // }else{
  //   MySensors.collections['gateway'].update({id:"ipsc"}, {$push:{nodes:{id:sender,sketchVersion:payload}},$inc:{"totalNodes":1}});
  // }

  console.log("saving sketch Version" + payload+ "from"+sender);
  Gateway.update({id:deviceId.id,"nodes.id":sender},{$set:{"nodes.$.sketchVersion":payload}});
}
