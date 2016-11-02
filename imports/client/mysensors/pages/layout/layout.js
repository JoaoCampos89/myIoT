import './layout.html';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

const templateName  = 'mySensorsLayoutPage';

Template[templateName].onCreated(function() {
  var template = this;
  template.autorun(function() {
    template.subscribe("admin.loggedUsers");
  });
});



Template[templateName].helpers({
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
  }
});
