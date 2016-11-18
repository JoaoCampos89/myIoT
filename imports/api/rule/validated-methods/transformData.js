export function transformRules(rules){

  const conectors = [];
  if(rules.length === 1){
      const conector = {};
    switch (rules[0].type) {
      case 'hardware':
          conector.conditions = [];
          conector.type = "e";
          conector.ruleType = 'hardware';
          conector.conditions.push({sensorId:rules[0].sensorId,sensorSubType:rules[0].subTypeId, type:rules[0].condition, threshold:rules[0].value });
          break;
        default:

      }
        conectors.push(conector);
    return conectors;
  }

  rules.forEach(function(rule, index){
        if(index%2){
          const conector = {};
          conector.conditions = [];
          switch (rule.type) {
            case 'hardware':
              conector.type = rule.conector;
              conector.ruleType = 'hardware';
              conector.conditions.push({sensorId:rules[index-1].sensorId,sensorSubType:rules[index-1].subTypeId, type:rules[index-1].condition, threshold:rules[index-1].value });
              conector.conditions.push({sensorId:rules[index].sensorId,sensorSubType:rules[index].subTypeId, type:rules[index].condition, threshold:rules[index].value });
              break;
            default:

          }

          conectors.push(conector);

        }
  });


  return conectors;
}
