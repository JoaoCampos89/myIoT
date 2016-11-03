import rulesCache from './rulesCache.js';
import _ from 'underscore';
//import Rule from '../../rule';
//import checkCondition from './checkCondition.js';
//import {Sensor} from '../../mysensors-hardware';
import conditionCallback from './conditionCallback.js';


import './checkRule.tests.js';



export default function checkRule(rule, sensorId, type){

const result = _.every(rule.conectors, function(conector){
                  const conditionContext = {};
                  if(sensorId && type){
                      conditionContext.sensorId = sensorId;
                      conditionContext.type = type;
                    }
                  conditionContext.rule = rule;
                    switch (conector.type) {
                      case 'and':{
                       return  _.every(conector.conditions, conditionCallback, conditionContext);
                        }
                      case 'or':{
                        return  _.some(conector.conditions, conditionCallback, conditionContext);
                        }
                      case 'noConector':{

                        break;
                      }
                      default:

                    }
                  });

    const entry = {};
    entry.id = rule._id;
    entry.result = result;
    rulesCache.push(entry);
}
