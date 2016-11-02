import './index.css';
import './index.html';
import './create';
import './edit';
import './_form';

import {Template} from 'meteor/templating';
import TargetGroup from '/imports/api/targetGroup';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveVar} from 'meteor/reactive-var';
import {Gateway} from '/imports/api/mysensors-hardware';
import {Modal} from 'meteor/peppelg:bootstrap-3-modal';

import {removeNodeFromTargetGroup, addNodeToTargetGroup, removeTargetGroup} from '/imports/api/targetGroup/validated-methods.js';

const templateName = 'adminTargetGroupPage';

Template[templateName].onCreated(function(){
  const instance = this;
  instance.draggedGateway = new ReactiveVar(false);
  instance.draggedNode = new ReactiveVar(false);
  instance.draggedTargetGroup = new ReactiveVar(false);
});

Template[templateName].helpers({
  rooms: function(){
    return TargetGroup.find({});
  },
  gateways:function(targetGroupId){
    //console.log(Gateway.find({"nodes.targetGroupId":targetGroupId}));
    return Gateway.find({"nodes.targetGroupId":targetGroupId});
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
        FlowRouter.go("adminTargetGroupCreatePage");
  },
  // drag single node with room
  "drag .js-room-node": function(event, template){
    template.draggedNode.set(event.currentTarget.dataset.node);
    template.draggedGateway.set(event.currentTarget.dataset.gateway);
    template.draggedTargetGroup.set(event.currentTarget.dataset.targetgroup);
    console.log(event.currentTarget.dataset.targetGroup);
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
    data.targetGroupId = template.draggedTargetGroup.get();
    removeNodeFromTargetGroup.call(data);
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
    data.targetGroupId = event.currentTarget.dataset.targetgroup;
    addNodeToTargetGroup.call(data);


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
    FlowRouter.go("adminTargetGroupEditPage",{id:_id});

  },
  "click .js-remove-room": function(event){
    const modalContext = {};
    const model = {};
    const _id =  event.currentTarget.dataset.id;
    const room = TargetGroup.findOne({_id:_id});
    model.prefix = 'sala';
    model.name = room.name;
    model._id = _id;
    modalContext.model = model;

    modalContext.validatedMethod = removeTargetGroup;
    modalContext.route = "adminTargetGroupPage";
    Modal.show("removeModalComponent", modalContext);
  }


});

Template[templateName].onRendered(function(){

});
