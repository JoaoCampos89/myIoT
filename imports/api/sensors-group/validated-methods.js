import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ValidationError}from 'meteor/mdg:validation-error'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Roles} from 'meteor/alanning:roles';
import TargetGroup from './index.js';
import {Gateway} from '../mysensors-hardware';
import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import Timeline from '../timeline';
/**
 * [createTargetGroup creates a target group]
 * @type {ValidatedMethod}
 */
export const createTargetGroup = new ValidatedMethod({
  name: 'targetGroup.create',
  validate: new SimpleSchema({
    //maxPlayers:{type: Number},
    name: { type: String },
    id: { type: String, optional:true },
  }).validator(),
  run({ name, id}) {

    if(this.userId){
            if(id){
              TargetGroup.update({_id:id}, {$set: {name:name, updatedBy:this.userId, updatedAt: new Date.now()}});
              Timeline.insert({message:'A room was updated to the system', id: id, type: 'updateRoom', userId: this.userId, at: new Date.now()});
              return id;
            }else{
            const _id = TargetGroup.insert({ name:name, createdBy:this.userId, createdAt: new Date.now()});
            if(_id){
                Timeline.insert({message:'A room was added to the system', id:_id, type: 'createRoom', userId: this.userId, at: new Date.now()});
                return _id;
            }
          }
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
});
/**
 * [removeNodeFromTargetGroup removes a node from TargetGroup]
 * @type {ValidatedMethod}
 */
export const removeNodeFromTargetGroup = new ValidatedMethod({
  name: 'targetGroup.removeNode',
  validate: new SimpleSchema({
    //maxPlayers:{type: Number},
    nodeId: { type: Number},
    gatewayId: { type: String },
    targetGroupId: {type: String}
  }).validator(),
  run({ nodeId, gatewayId, targetGroupId }) {

    if(this.userId){
      TargetGroup.update({_id:targetGroupId,"nodes.gatewayId":gatewayId,"nodes.id":nodeId},{$pull:{"nodes":{id:nodeId,gatewayId:gatewayId}}});
      Gateway.update({_id:gatewayId,"nodes.id":nodeId},{$unset:{"nodes.$.targetGroupId": 1}});
      return true;
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
});


/**
 * [addNodeToTargetGroup add node to the group]
 * @type {ValidatedMethod}
 */
export const addNodeToTargetGroup = new ValidatedMethod({
  name: 'targetGroup.addNode',
  validate: new SimpleSchema({
    //maxPlayers:{type: Number},
    nodeId: { type: Number },
    gatewayId: { type: String },
    targetGroupId: {type: String}
  }).validator(),
  run({ nodeId, gatewayId, targetGroupId}) {

    if(this.userId){
           TargetGroup.update({_id:targetGroupId},{$push:{"nodes":{id:nodeId, gatewayId:gatewayId}}});
           Gateway.update({_id:gatewayId,"nodes.id":nodeId},{$set:{"nodes.$.targetGroupId": targetGroupId}});
           return true;
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
});

/**
 * [createTargetGroup creates a target group]
 * @type {ValidatedMethod}
 */
export const removeTargetGroup = new ValidatedMethod({
  name: 'targetGroup.remove',
  validate: new SimpleSchema({
    //maxPlayers:{type: Number},
    id: { type: String },
  }).validator(),
  run({ id }) {

    if(this.userId){

            TargetGroup.remove({_id: id});
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
});
