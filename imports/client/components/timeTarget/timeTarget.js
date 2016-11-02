import './timeTarget.css';
import './timeTarget.html';
import '../roundProgressChart/roundProgressChart.js';
import {Template} from 'meteor/templating';


Template.timeTargetComponent.helpers({
  timelineEntries: function() {
    var template = Template.instance();

    return template.data.time;
  }


});

Template.timeTargetComponent.onRendered(function() {


  var template = this;
  //template.$("p").calendar();



});
