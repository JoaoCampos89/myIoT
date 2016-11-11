import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ValidationError}from 'meteor/mdg:validation-error'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Roles} from 'meteor/alanning:roles';
import SensorGroup from './index.js';
import {Gateway} from '../mysensors-hardware/gateway-db';
import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import Timeline from '../timeline';
import validatedError from './validated-error.js';
/**
 * [createSensorGroup creates a target group]
 * @type {ValidatedMethod}
 */
export const createSensorGroup = new ValidatedMethod({
  name: 'SensorGroup.create',
  validate: new SimpleSchema({
    //maxPlayers:{type: Number},
    name: { type: String },
    id: { type: String, optional:true },
  }).validator(),
  run({ name, id}) {

    if(this.userId){
            if(id){
              SensorGroup.update({_id:id}, {$set: {name:name, updatedBy:this.userId, updatedAt: new Date.now()}});
              Timeline.insert({message:'A room was updated to the system', id: id, type: 'updateRoom', userId: this.userId, at: new Date.now()});
              return id;
            }else{
            const _id = SensorGroup.insert({ name:name, createdBy:this.userId, createdAt: new Date.now()});
            if(_id){
                Timeline.insert({message:'A room was added to the system', id:_id, type: 'createRoom', userId: this.userId, at: new Date.now()});
                return _id;
            }
          }
    }
      else {
          validatedError.server();
      }
  }
});
/**
 * [removeNodeFromSensorGroup removes a node from SensorGroup]
 * @type {ValidatedMethod}
 */
export const removeNodeFromSensorGroup = new ValidatedMethod({
  name: 'SensorGroup.removeNode',
  validate: new SimpleSchema({
    //maxPlayers:{type: Number},
    nodeId: { type: Number},
    gatewayId: { type: String },
    SensorGroupId: {type: String}
  }).validator(),
  run({ nodeId, gatewayId, SensorGroupId }) {

    if(this.userId){
      SensorGroup.update({_id:SensorGroupId,"nodes.gatewayId":gatewayId,"nodes.id":nodeId},{$pull:{"nodes":{id:nodeId,gatewayId:gatewayId}}});
      Gateway.update({_id:gatewayId,"nodes.id":nodeId},{$unset:{"nodes.$.SensorGroupId": 1}});
      return true;
    }
      else {
          validatedError.server();
      }
  }
});


/**
 * [addNodeToSensorGroup add node to the group]
 * @type {ValidatedMethod}
 */
export const addNodeToSensorGroup = new ValidatedMethod({
  name: 'SensorGroup.addNode',
  validate: new SimpleSchema({
    //maxPlayers:{type: Number},
    nodeId: { type: Number },
    gatewayId: { type: String },
    SensorGroupId: {type: String}
  }).validator(),
  run({ nodeId, gatewayId, SensorGroupId}) {

    if(this.userId){
           SensorGroup.update({_id:SensorGroupId},{$push:{"nodes":{id:nodeId, gatewayId:gatewayId}}});
           Gateway.update({_id:gatewayId,"nodes.id":nodeId},{$set:{"nodes.$.SensorGroupId": SensorGroupId}});
           return true;
    }
      else {
          validatedError.server();
      }
  }
});

/**
 * [createSensorGroup creates a target group]
 * @type {ValidatedMethod}
 */
export const removeSensorGroup = new ValidatedMethod({
  name: 'SensorGroup.remove',
  validate: new SimpleSchema({
    //maxPlayers:{type: Number},
    id: { type: String },
  }).validator(),
  run({ id }) {

    if(this.userId){

            SensorGroup.remove({_id: id});
    }
      else {
        validatedError.server();
      }
  }
});
