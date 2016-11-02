/**
 * [saveValue game logic come here]
 * @param  {[type]} sender  [description]
 * @param  {[type]} sensor  [description]
 * @param  {[type]} type    [description]
 * @param  {[type]} payload [description]
 * @param  {[type]} db      [description]
 * @return {[type]}         [description]
 */

import Game from '../../game';
import GameType from '../../gameType';
import TargetGroup from '../../targetGroup';
import gw from '../gateway.js';
import protocol from '../protocol.js';
//import Gateway from '../gateway';
import _ from 'underscore';
var deviceId = 'ipsc';



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
export default function saveValue(sender, sensor, type, payload, db) {
  console.log("sensor" + sensor+ "type: "+ type);
  if(type ==  protocol['C_SET']['subType'].V_CUSTOM){
    console.log('payload received: '+payload.toString()+'from '+ sender.toString() );
// find all games active in device and find if node respective to target group
    const games  = Game.find({deviceid:deviceId, active:true}).fetch();

    _.each(games, function(game){
    //console.log(game);
    //console.log(TargetGroup.findOne({_id:game.targetGroupId}));
    const nodes = TargetGroup.findOne({_id:game.targetGroupId}).nodes;

    const gameType = GameType.findOne({_id:game.gameTypeId});
    _.each(nodes, function(node){
        if(node.nodeId==sender&&game.playing){
          console.log("shot");
          var shot = {};
          shot.timestamp = new Date().getTime();
          shot.playerId = _.findWhere(game.players,{active:true}).id;
          shot.value = payload;
          shot.target = sender;
          Game.update({_id:game._id},{$push:{shots:shot}});
        /*  if(gameType.rules.stopWhenHitted){
            // disable target
            var msg = gw.encode(node, 16, protocol['C_SET'].value, 0, protocol['C_SET']['subType'].V_VAR1, Number(0));
            gw.write(msg);
          }*/
        }
    });
  })

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
