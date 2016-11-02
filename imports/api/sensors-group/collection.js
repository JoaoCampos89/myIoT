import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import generateFixtures from './fixtures.js';



const SensorsGroup = new Mongo.Collection("sensorsgroup");

SensorsGroup.generateFixtures = generateFixtures;

/*TargetGroup.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  }
});
*/
SensorsGroup.schema = new SimpleSchema({
  name: {
    type: String
  },
  location: {
    type: String
  }
});

/** Proposed schema
 * name:String
 * targets: [target]
 *
 *
 */
export default SensorsGroup;
