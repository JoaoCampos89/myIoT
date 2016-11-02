//import Sensor from '../../mysensors-hardware';
import Rule from '../../rule';
import _ from 'underscore';
import {Sensor} from '../../mysensors-hardware';
import checkCondition from './checkCondition.js';
import triggerActions from '../actions';
// this is intended to cache already evaluated rules, in case if rules have rules inside and already checked can
// be returned by the cache
const rulesCache = [];

export default function (sensorId, type){
  // find all rules related to this;
  const rules = Rule.find({"conectors.conditions.sensorId": sensorId, "conectors.conditions.type": type}).fetch();
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


function checkRule(rule, sensorId, type){

const result = _.every(rule.conectors, function(conector){
                    switch (conector.type) {
                      case 'and':{
                        _.every(conector.conditions, function(condition){
                                  if(condition.type == "rule"){
                                    let cachedRule =   _.findWhere(rulesCache,{id:rule._id});
                                    if(!cachedRule){
                                      // check if rule have sensorId attached, if not fetch previous evaluated value
                                      let  findRule =  Rule.findOne({_id:rule._id, "conectors.conditions.sensorId": sensorId, "conectors.conditions.type": type});
                                      if(!findRule){
                                        // check if rule was previosly evaluated if not evaluate
                                        let findRule = Rule.findOne(rule.id);
                                        if(findRule.result === true){
                                          let entry = {};
                                          entry.result = true;
                                          entry.id = rule.id;
                                          rulesCache.push(entry);
                                          return true;
                                        }
                                        if(findRule.result === false){
                                          let entry = {};
                                          entry.result = false;
                                          entry.id = rule.id;
                                          rulesCache.push(entry);
                                          return false;
                                        }
                                        checkRule(Rule.findOne(rule.id), sensorId, type);
                                      }
                                      // if rule not evaluated check rule
                                      checkRule(Rule.findOne(rule.id), sensorId, type);
                                      return true;
                                    }else{
                                      return cachedRule.result;
                                    }
                                  }
                                  const subType = Sensor.findOne({_id:sensorId}).getType();

                                  checkCondition(condition.type, subType.previousValue, subType.value, condition.treshold);

                          });

                        break;}
                        case 'or':{
                          _.some(conector.conditions, function(condition){
                                    if(condition.type == "rule"){
                                      let cachedRule =   _.findWhere(rulesCache,{id:rule._id});
                                      if(!cachedRule){
                                        // check if rule have sensorId attached, if not fetch previous evaluated value
                                        let  findRule =  Rule.findOne({_id:rule._id, "conectors.conditions.sensorId": sensorId, "conectors.conditions.type": type});
                                        if(!findRule){
                                          // check if rule was previosly evaluated if not evaluate
                                          let findRule = Rule.findOne(rule.id);
                                          if(findRule.result === true){
                                            let entry = {};
                                            entry.result = true;
                                            entry.id = rule.id;
                                            rulesCache.push(entry);
                                            return true;
                                          }
                                          if(findRule.result === false){
                                            let entry = {};
                                            entry.result = false;
                                            entry.id = rule.id;
                                            rulesCache.push(entry);
                                            return false;
                                          }
                                          checkRule(Rule.findOne(rule.id), sensorId, type);
                                        }
                                        // if rule not evaluated check rule
                                        checkRule(Rule.findOne(rule.id), sensorId, type);
                                        return true;
                                      }else{
                                        return cachedRule.result;
                                      }
                                    }
                                    const subType = Sensor.findOne({_id:sensorId}).getType();

                                    checkCondition(condition.type, subType.previousValue, subType.value, condition.treshold);
                            });
                          break;
                        }
                      default:

                    }
                  });

    const entry = {};
    entry.id = rule.id;
    entry.result = result;
    rulesCache.push(entry);
}
