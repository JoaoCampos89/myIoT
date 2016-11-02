//import './index.css';
import './nodes.html';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {ReactiveDict} from 'meteor/reactive-dict';
import MySensors from '../../../../api/mysensors/mysensors.js';
import Gateway from '../../../../api/mysensors/gateway/index.js';
import protocol from '../../../../api/mysensors/protocol.js';
import '../../../../api/mysensors/protocol.js';
//import _ from 'underscore'

const templateName = "mySensorsNodesPage";

Template[templateName].onCreated(function(){
  var instance = this;
  instance.state = new ReactiveDict();
});

Template[templateName].helpers({
  nodes: function(){
      return  Gateway.findOne({id:"ipsc"}).nodes;
  },
  isGateway: function(node){
      return node === 0;
  },
  isGatewayReady: function(){
      return MySensors.collections['settings'].findOne({id:'mysensors'}).gatewayready;
  }
});

Template[templateName].events({
  "click .js-request-heartbeat": function(event, template){
    var requestHeartbeat = {};
      requestHeartbeat.destination = Number(this.id);
      requestHeartbeat.sensor = 255;
      requestHeartbeat.command = protocol['C_INTERNAL'].value;
      requestHeartbeat.type = protocol['C_INTERNAL']['subType']['I_HEARTBEAT'];
      requestHeartbeat.acknowledge = 0;
      requestHeartbeat.payload = "";
     Meteor.call('mysensors.command', requestHeartbeat);
  }
});
