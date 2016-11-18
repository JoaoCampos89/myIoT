
import './node.html';

import {Template} from 'meteor/templating';
import {requestHeartbeat, requestReboot} from "/imports/api/mysensors-hardware/validated-methods";


const templateName = 'adminNodeViewComponent';

Template[templateName].onCreated(function(){

});

Template[templateName].helpers({

})


Template[templateName].events({
 "click .js-request-heartbeat": function(){
   const context = this;
   requestHeartbeat.call({gatewayId:context.gatewayId, nodeId: context.sensor.id});
 },
 "click .js-request-reboot": function(){
    const context = this;
    requestReboot.call({gatewayId:context.gatewayId, nodeId: context.sensor.id});
 },
});

Template[templateName].onRendered(function(){

});
