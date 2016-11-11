import './index.css';
import './index.html';
import './create';
import './edit';
import './_form';

import {Template} from 'meteor/templating';
import SensorGroup from '/imports/api/sensor-group';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveVar} from 'meteor/reactive-var';
import {Gateway} from '/imports/api/mysensors-hardware';
import {Modal} from 'meteor/peppelg:bootstrap-3-modal';

import {removeNodeFromSensorGroup, addNodeToSensorGroup, removeSensorGroup} from '/imports/api/sensor-group/validated-methods.js';

const templateName = 'adminSensorGroupPage';

Template[templateName].onCreated(function(){
  const instance = this;
  instance.draggedGateway = new ReactiveVar(false);
  instance.draggedNode = new ReactiveVar(false);
  instance.draggedSensorGroup = new ReactiveVar(false);
});

Template[templateName].helpers({
  rooms: function(){
    return SensorGroup.find({});
  },
  gateways:function(SensorGroupId){
    //console.log(Gateway.find({"nodes.SensorGroupId":SensorGroupId}));
    return Gateway.find({"nodes.SensorGroupId":SensorGroupId});
  },
  sensorsWithoutGroup:function(){
    return Gateway.find();
  }
})
/**
 *
 */

Template[templateName].events({
  "click .js-add-room": function(){
        FlowRouter.go("adminSensorGroupCreatePage");
  },
  // drag single node with room
  "drag .js-room-node": function(event, template){
    template.draggedNode.set(event.currentTarget.dataset.node);
    template.draggedGateway.set(event.currentTarget.dataset.gateway);
    template.draggedSensorGroup.set(event.currentTarget.dataset.SensorGroup);
    console.log(event.currentTarget.dataset.SensorGroup);
  },
  // drag sensor without group
  "drag .js-sensor-without-group": function(event, template){
    template.draggedNode.set(event.currentTarget.dataset.node);
    template.draggedGateway.set(event.currentTarget.dataset.gateway);

  },
  "drop .js-sensors-without-group":function(event, template){
    event.preventDefault();
    let data = {};
    data.nodeId = Number(template.draggedNode.get());
    data.gatewayId = template.draggedGateway.get();
    data.SensorGroupId = template.draggedSensorGroup.get();
    removeNodeFromSensorGroup.call(data);
    //TODO implement remove sensor from room
  //  console.log("context" + this);
    console.log("node" + template.draggedNode.get());
    console.log("gateway" + template.draggedGateway.get());
  },
  "drop .js-room-nodes":function(event, template){
    event.preventDefault();
    let data = {};
    data.nodeId = Number(template.draggedNode.get());
    data.gatewayId = template.draggedGateway.get();
    data.SensorGroupId = event.currentTarget.dataset.SensorGroup;
    addNodeToSensorGroup.call(data);


    //TODO implement add sensor to room

  //  console.log("context" + this);
    console.log("node" + template.draggedNode.get());
    console.log("gateway" + template.draggedGateway.get());
  },
  "dragover .js-sensors-without-group": function(event){
    event.preventDefault();
  },
  "dragover .js-room-nodes": function(event){
    event.preventDefault();
  },
  "click .js-edit-room": function(event){
    const _id =  event.currentTarget.dataset.id;
    FlowRouter.go("adminSensorGroupEditPage",{id:_id});

  },
  "click .js-remove-room": function(event){
    const modalContext = {};
    const model = {};
    const _id =  event.currentTarget.dataset.id;
    const room = SensorGroup.findOne({_id:_id});
    model.prefix = 'sala';
    model.name = room.name;
    model._id = _id;
    modalContext.model = model;

    modalContext.validatedMethod = removeSensorGroup;
    modalContext.route = "adminSensorGroupPage";
    Modal.show("removeModalComponent", modalContext);
  }


});

Template[templateName].onRendered(function(){

});
