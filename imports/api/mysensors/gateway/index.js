

import {Mongo} from 'meteor/mongo';
import generateFixtures from './fixtures.js';
import _ from 'underscore';

const Gateway  = new Mongo.Collection("gateway");
Gateway.generateFixtures = generateFixtures;

Gateway.helpers({
    operationalNodes:function(){
          var nodes = this.nodes;
          return _.filter(nodes, function(node){return node.operational === true});
    },
    nonOperationNodes: function(){
      var nodes = this.nodes;
      return _.filter(nodes, function(node){return node.operational === false});
    },
    lowBatteryNodes:function(){
      var nodes = this.nodes;
      return _.filter(nodes, function(node){return node.batteryLevel < 20});
    },
    // TODO implement to save a reference of targetGroup in each node when assigned
    withoutGroupNodes:function(){
      var nodes = this.nodes;
      return _.filter(nodes, function(node){return _.isUndefined(node.targetGroupId)});
    }


});




export default Gateway;
