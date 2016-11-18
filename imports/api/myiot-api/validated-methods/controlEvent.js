import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ValidationError}from 'meteor/mdg:validation-error'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Roles} from 'meteor/alanning:roles';
//import Game from '../../game/index.js';
//import TargetGroup from '../../targetGroup/index.js';
import {Gateway} from '../../mysensors-hardware';
//import GameType from '../gameType/index.js';
import {protocol} from '../../mysensors-hardware';
import _ from 'underscore';
import {Meteor} from 'meteor/meteor';
// calling meteor is server because gw not work client side
if(Meteor.isServer){
  import {writeToGateway} from '../../mysensors-hardware';
}



export default  new ValidatedMethod({
    name: 'mySensors-api.controlEvent',
    validate: new SimpleSchema({
      sensorId: {type: String},
      sensorSubTypeId: {type: String},
      value: {type: Number},
      //playerId: {type: String}
    //  status:{type:Boolean}
    }).validator(),
    run({ sensorId, sensorSubTypeId}) {

      if(this.userId){
        Sensor.update(sensorId,{$set:{value:value}});
        checkAllRules(sensorId, sensorSubTypeId);

      }
        else {
          throw new ValidationError([
              {
                name: 'server',
                type: 'NOT_ALLOWED',
                description : "Sorry you have to be super-admin to do this thing."
              }
            ]);
        }
    }
})
