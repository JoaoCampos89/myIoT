import {Meteor} from 'meteor/meteor';
import MySensors from '../mysensors.js';
import {check} from 'meteor/check';
Meteor.publish("mysensors.settings", function(){
    return MySensors.collections['settings'].find({'id':'mysensors'});
});

Meteor.publish("mysensors.nodes", function(){
    return MySensors.collections['node'].find();
});

Meteor.publish("mysensors.target.values", function(sensor){
    check(sensor, String);
    return MySensors.collections['Value-'+sensor+'-10'].find({});
});
