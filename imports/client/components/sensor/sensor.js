Template.sensorComponent.helpers({
 roundProgressChart: function(){
    var template = Template.instance();
    return {  percentage:template.data.sensorData.batteryPercentage,
              text:template.data.sensorData.text};
  }


});

Template.sensorComponent.onRendered(function(){


var template = this;
//template.$("p").calendar();



});
