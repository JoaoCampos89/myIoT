/**
 * [saveValue game logic come here]
 * @param  {[type]} sender  [description]
 * @param  {[type]} sensor  [description]
 * @param  {[type]} type    [description]
 * @param  {[type]} payload [description]
 * @param  {[type]} db      [description]
 * @return {[type]}         [description]
 */

//import Game from '../game';
//import GameType from '../gameType';
//import TargetGroup from '../targetGroup';
//import gw from '../gateway.js';
import {protocol} from '../mysensors-hardware';
//import Gateway from '../gateway';
import _ from 'underscore';
//var deviceId = 'ipsc';
import {Sensor, Value} from '../mysensors-hardware';
import {checkAllRules} from './rules';

/**
 * [saveValue this functions receives all data from nodes in gateway, monkey patch this function to add the respective behaviour for your
 * implementation]
 * @param  {[type]} sender  [description]
 * @param  {[type]} sensor  [description]
 * @param  {[type]} type    [description]
 * @param  {[type]} payload [description]
 * @param  {[type]} db      [description]
 * @return {[type]}         [description]
 */
export default function saveValue(sender, sensor, type, payload, gw) {
  const gatewayId = gw.gatewayId;
  //Gateway.update({_id: gw.deviceId, "nodes.id":sender}, {$set:{"nodes.$."});
  const timestamp =  new Date.getTime();
  Sensor.update({gatewayId:gatewayId, nodeId:sender, "subTypes.subType":type}, {$set:{"subTypes.$.value": payload, "subTypes.$.timestamp": timestamp}});
  Value.update({gatewayId:gatewayId, subType:type}, {$push:{values:{value:payload, timestamp:timestamp}}});
  const sensorId = Sensor.findOne({gatewayId:gatewayId, nodeId:sender, "subTypes.subType":type});
  checkAllRules(sensorId, type);


  console.log("sensor" + sensor+ "type: "+ type);
  if(type ==  protocol['C_SET']['subType'].V_CUSTOM){
  console.log('payload received: '+payload.toString()+'from '+ sender.toString() );
}

	/*var cn = "Value-" + sender.toString() + "-" + sensor.toString();
  if(!(cn in MySensors.collections)){
        MySensors.collections[cn] = new Mongo.Collection(cn);
    }
    if(type == 48 && sender.toString()=='1'){
         //console.log(Target);
          Target.update({targetId:1},{$set:{status:true}});
        //  console.log('teste');
        //
    }*/

  /*  MySensors.collections[cn].insert({
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

*/


}
