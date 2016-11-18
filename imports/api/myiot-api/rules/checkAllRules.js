//import Sensor from '../../mysensors-hardware';
import Rule from '../../rule';
import _ from 'underscore';
//import {Sensor} from '../../mysensors-hardware';
//import checkCondition from './checkCondition.js';
import triggerActions from '../actions';
import checkRule from './checkRule.js';
import rulesCache from './rulesCache.js';
// this is intended to cache already evaluated rules, in case if rules have rules inside and already checked can
// be returned by the cache


export default function (sensorId, type){
  // find all rules related to this;
  const rules = Rule.find({"conectors.conditions.sensorId": sensorId, "conectors.conditions.sensorSubType": type}).fetch();
  //iterate each rule in database
  _.each(rules, function(rule){
            // recursive check rules
            let cachedRule =   _.findWhere(rulesCache,{id:rule._id});
            if(!cachedRule){
              checkRule(rule, sensorId, type);
            }
    });
    // trigger all actions in rules
      _.each(rulesCache, function(rule){
          if(rule.result){
            triggerActions(rule._id);
          }

      });


    // clear cache
rulesCache.length = 0;

}
