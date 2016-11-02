
Template.weekGameComponent.helpers({
 timelineEntries: function(){
    var template = Template.instance();

    return template.weekGame;
  }


});

Template.weekGameComponent.onRendered(function(){


var template = this;
//template.$("p").calendar();



/*** Earning Circle Stats ***/
$(".earning").easyPieChart({animate:2000});


});
