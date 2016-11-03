import {Mongo} from 'meteor/mongo';
import fixtures from './fixtures.js'

const Rule = new Mongo.Collection("rule");

Rule.fixtures = fixtures;



export default Rule;
