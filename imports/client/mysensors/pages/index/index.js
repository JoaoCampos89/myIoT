import './index.css';
import './index.html';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {ReactiveDict} from 'meteor/reactive-dict';
import MySensors from '../../../../api/mysensors/mysensors.js';
//import '../../../../api/mysensors/protocol.js';
import _ from 'underscore'
import Gateway from '../../../../api/mysensors/gateway/index.js';
import protocol from '../../../../api/mysensors/protocol.js';


const templateName = "mySensorsIndexPage";

Template[templateName].onCreated(function(){
  var instance = this;
  instance.command = new ReactiveDict();
  instance.command.set("type","C_PRESENTATION");
  instance.command.set("node",0);
//  console.log(MySensors.collections['node'].find().fetch());
  //console.log(MySensors.collections['gateway'].find().fetch());
});


Template[templateName].helpers({
  titles:function(){
    return ['nodes','sensors','types','subTypes','payload'];
  },
  types: function(){
          return protocol['commands'];
  },
  subtypes: function(){
    return _.keys(protocol[Template.instance().command.get("type")]['subType']);
  },
  nodes: function(){
    //console.log(MySensors.collections['gateway'].findOne({id:"ipsc"}));
    return Gateway.findOne({id:"ipsc"}).nodes;
  },
  sensors:function(){
    //return MySensors.collections['node'].findOne({id:Template.instance().command.get("node")}).sensor;
    return _.findWhere(Gateway.findOne({id:"ipsc"}).nodes,{id:Template.instance().command.get("node")}).sensor;
  },
  settings:function(){
    return MySensors.collections['settings'].findOne({id:'mysensors'});
  },
  messages:function(){
    return MySensors.collections['message'].find({});
  }
});

Template[templateName].events({
  "change .js-type-changed": function(event, instance){
    instance.command.set("type", event.currentTarget.value);
  },
  "change .js-node-changed": function(event, instance){
    instance.command.set("node", Number(event.currentTarget.value));
  },
  "click .js-remove-messages": function(){
      Meteor.call("mysensors.removemessages");
  },
  "click .js-activate-system": function(){
        Meteor.call("mysensors.activateSystem", function(error, result){
          if(error){
            console.log("error", error);
          }
        });
  }
});
