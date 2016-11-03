const fixtures = {};



fixtures.generateAndRule = function(Rule, sensorId, threshold){
  //  const conectors = [];
    const conector = {};
    conector.type = "and";
    conector.conditions = [];
    const condition = {};
    condition.type = '=';
    condition.threshold = threshold;
    condition.sensorId = sensorId ;
    condition.sensorSubType = "16";
    conector.conditions.push(condition);
    conector.conditions.push(condition);
    const entry = {};
    entry.conectors = [conector];
    return Rule.insert(entry);

}

fixtures.generateOrRule = function(Rule, sensorId, threshold){
  //  const conectors = [];
    const conector = {};
    conector.type = "or";
    conector.conditions = [];
    const condition = {};
    condition.type = '=';
    condition.threshold = threshold;
    condition.sensorId = sensorId ;
    condition.sensorSubType = "16";
    conector.conditions.push(condition);
    conector.conditions.push(condition);
    const entry = {};
    entry.conectors = [conector];
    return Rule.insert(entry);

}

fixtures.generateNestedRuleWithOrRule = function(Rule, sensorId, threshold){
  //  const conectors = [];
    let conector = {};
    conector.type = "or";
    conector.conditions = [];
    let condition = {};
    condition.type = '=';
    condition.threshold = threshold;
    condition.sensorId = sensorId ;
    condition.sensorSubType = "16";
    conector.conditions.push(condition);
    conector.conditions.push(condition);
    let entry = {};
    entry.conectors = [conector];
    const ruleId = Rule.insert(entry);
    conector = {};
    conector.type = "or";
    conector.conditions = [];
    condition = {};
    condition.type = '=';
    condition.threshold = threshold;
    condition.sensorId = sensorId ;
    condition.sensorSubType = "16";
    conector.conditions.push(condition);
    condition.type = 'rule';
    condition.ruleId = ruleId;
    conector.conditions.push(condition);
    entry = {};
    entry.conectors = [conector];
    return  Rule.insert(entry);


}

fixtures.generateSimpleOrRule = function(Rule, sensorId, threshold){
  //  const conectors = [];
    const conector = {};
    conector.type = "or";
    conector.conditions = [];
    const condition = {};
    condition.type = '=';
    condition.threshold = threshold;
    condition.sensorId = sensorId ;
    condition.sensorSubType = "16";
    conector.conditions.push(condition);
    const entry = {};
    entry.conectors = [conector];
    return Rule.insert(entry);

}


fixtures.generateSimpleAndRule = function(Rule, sensorId, threshold){
  //  const conectors = [];
    const conector = {};
    conector.type = "and";
    conector.conditions = [];
    const condition = {};
    condition.type = '=';
    condition.threshold = threshold;
    condition.sensorId = sensorId;
    condition.sensorSubType = "16";
    conector.conditions.push(condition);
    const entry = {};
    entry.conectors = [conector];
    return Rule.insert(entry);

}






export default fixtures;
