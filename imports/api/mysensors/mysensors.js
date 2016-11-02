import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
//import gw from './gateway.js';

const MySensors = {};

MySensors.collections = {};

MySensors.collections['node'] =  new Mongo.Collection("node");
MySensors.collections['firmware'] =  new Mongo.Collection("firmware");
MySensors.collections['settings'] =  new Mongo.Collection("mysensorssettings");
MySensors.collections['value'] =  new Mongo.Collection("value");
MySensors.collections['message'] =  new Mongo.Collection("message");
//MySensors.collections['gateway'] =  new Mongo.Collection("gateway");
// log all messages to the client
MySensors.log = false;
//if(MySensors.collections['gateway'].find({}).count()==0){
//  MySensors.collections['gateway'].insert({id:"ipsc"});
//}
//

Meteor.startup(function(){

});

export default MySensors;
