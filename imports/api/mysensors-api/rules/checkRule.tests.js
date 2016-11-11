/* eslint-env mocha */

import _ from 'underscore';
import Rule from '../../rule';
import {Sensor} from '../../mysensors-hardware';
import { assert } from 'meteor/practicalmeteor:chai';
import checkRule from './checkRule.js';
import {Meteor} from 'meteor/meteor';
import rulesCache from './rulesCache.js';
//import {checkAllRules} from '../index.js';
//import Rule from '../../../rule';
//import {Sensor} from '../../../mysensors-hardware';

let sensorId;
let ruleId;

describe("Rules Section", function(){
      describe("Testing Check rule function", function(){
            before(function(){
              if(Meteor.isServer){
                Rule.remove({});
                Sensor.remove({});
                let entry = {};
                const subTypes = [];
                const subType = {};
                subType.subType  = "16";
                subType.value = 50;
                subType.previousValue = 50;
                subTypes.push(subType);
                entry.subTypes = subTypes;
                sensorId = Sensor.insert(entry);
                rulesCache.length = 0;


              }
            });
            it("check simple rule  and condition with equal", function(){
                ruleId = Rule.fixtures.generateSimpleAndRule(Rule, sensorId, 50);
                const  rule  = Rule.findOne(ruleId);
                checkRule(rule);
                const result = _.findWhere(rulesCache, {id: rule._id }).result;
                assert.equal(result, true);
                rulesCache.length = 0;
            });
            it("check simple rule  or condition with equal", function(){
                ruleId = Rule.fixtures.generateSimpleOrRule(Rule, sensorId, 50);
                const sensor =  Sensor.findOne({_id:sensorId});
                console.log("sensor "+ sensor.getType("16"));
                const  rule  = Rule.findOne(ruleId);
                checkRule(rule);
                const result = _.findWhere(rulesCache, {id: rule._id }).result;
                assert.equal(result, true);
                rulesCache.length = 0;
            });

            it("check rule with an and condition with equal", function(){
                ruleId = Rule.fixtures.generateAndRule(Rule, sensorId, 50);
                const rule = Rule.findOne(ruleId);
                checkRule(rule);
                const result = _.findWhere(rulesCache, {id: rule._id }).result;
                assert.equal(result, true);
                rulesCache.length = 0;

            });

            it("check rule with or and condition with equal", function(){

                ruleId = Rule.fixtures.generateOrRule(Rule, sensorId, 50);
                const  rule  = Rule.findOne(ruleId);
                checkRule(rule);
                const result = _.findWhere(rulesCache, {id: rule._id }).result;
                assert.equal(result, true);
                  rulesCache.length = 0;
            });
            it("check rule with nested rule and or and condition with equal", function(){

                ruleId = Rule.fixtures.generateNestedRuleWithOrRule(Rule, sensorId, 50);
                const  rule  = Rule.findOne(ruleId);
                const sensor = Sensor.findOne(sensorId);
                checkRule(rule, sensorId, "16");
                console.log(rule);
                console.log(sensor);
                console.log(sensor.getType("16"));
                console.log(rulesCache);
                const result = _.findWhere(rulesCache, {id: rule._id }).result;
                assert.equal(result, true);
                rulesCache.length = 0;
            });



      });
})
