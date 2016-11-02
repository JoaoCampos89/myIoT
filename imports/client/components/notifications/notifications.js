


Template.notificationsComponent.events({
  "click .notification-btn": function(event, template){
    $('.message').fadeOut();
    $(event.currentTarget).next('.notification').fadeToggle();
  }
});
