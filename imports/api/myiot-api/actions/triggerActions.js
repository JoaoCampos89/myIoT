import Action from './action.js';
import Rule from '../../rule';
import _ from 'underscore';


export default function(ruleId){
  const rule = Rule.findOne(ruleId);
 _.each(rule.actions, function(ruleAction){
   Action[ruleAction.type](ruleAction);
 });



  return "Action in progress";


}
