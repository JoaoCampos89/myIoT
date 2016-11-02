Template.recentUserComponent.helpers({
 sqrButton: function(){
    var template = Template.instance();

    return template.data.recentUsers;
  }


});

Template.recentUserComponent.onRendered(function(){


var template = this;
//template.$("p").calendar();


});
