import './layout.html';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

Template.gameLayoutPage.onCreated(function() {
  var template = this;
  template.autorun(function() {
    template.subscribe("admin.loggedUsers");
  });
});



Template.gameLayoutPage.helpers({
  isAdmin: function() {
    var user = Meteor.users.findOne({
      "_id": Meteor.userId()
    });
    console.log(user);
    if (user)
      return user.admin;
    else {
      return false;
    }
  },
  loggedUsers: function() {
    return Meteor.users.find({
      "services.resume": {
        $exists: true,
        $ne: null
      }
    });
  },
  page: function(){
    console.log(Template.instance().currentData());
  }

});
