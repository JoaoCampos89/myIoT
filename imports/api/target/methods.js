import check from 'meteor/check';

/**
 * [assignTargetToNode assigns target to node]
 * @param  {[type]} nodeId [description]
 * @return {[type]}        [description]
 */
export function assignTargetToNode({nodeId}){
  check(nodeId, Number);


}
