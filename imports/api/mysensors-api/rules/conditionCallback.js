import _ from 'underscore';
import rulesCache from './rulesCache';
import Rule from '../../rule';
import checkCondition from './checkCondition.js';
import checkRule from './checkRule.js';
import {Sensor} from '../../mysensors-hardware';


export default function(condition){
      const context = this;
    //  console.log(rulesCache);
           if(condition.type == "rule"){
             let cachedRule =   _.findWhere(rulesCache,{id:condition.ruleId});
             if(!cachedRule){
               // check if rule have sensorId attached, if not fetch previous evaluated value
               // TODO find if rule have evaluated sensor if not fetch previous value
               let  findRule =  Rule.findOne({_id:condition.ruleId, "conectors.conditions.sensorId": context.sensorId, "conectors.conditions.sensorSubType": context.type});
               if(!findRule){
                 // check if rule was previosly evaluated if not evaluate
                 let findRule = Rule.findOne(condition.ruleId);
                 //console.log(context.rule);
                 if("result" in findRule){
                     if(findRule.result === true){
                       let entry = {};
                       entry.result = true;
                       entry.id = context.rule.id;
                       rulesCache.push(entry);
                       return true;
                     }
                     if(findRule.result === false){
                       let entry = {};
                       entry.result = false;
                       entry.id = context.rule.id;
                       rulesCache.push(entry);
                       return false;
                     }
                  }else{
                   checkRule(Rule.findOne(condition.ruleId));
                 }

               }
               // if rule not evaluated check rule
               checkRule(Rule.findOne(context.rule._id));
               return true;
             }else{
               return cachedRule.result;
             }
           }
           const subType = Sensor.findOne({_id:condition.sensorId}).getType(condition.sensorSubType);
         //  console.log(condition);
         //  console.log(subType);
         //  console.log(checkCondition(condition.type, subType.previousValue, subType.value, condition.threshold));
           return checkCondition(condition.type, subType.previousValue, subType.value, condition.threshold);
}
