Template.syncComponent.helpers({
  active:function(){
    var template = Template.instance();
  }
});

Template.syncComponent.onRendered(function(){

  var template = this;

});


Template.syncComponent.events({
  "click .upload-btn": function(event, template){
    $(event.currentTarget).next('.upload-files').fadeToggle();
    $('.message').fadeOut();
    $('.notification').fadeOut();
  }
});
