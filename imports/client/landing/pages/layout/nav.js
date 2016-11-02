import './nav.html';
import {Template} from 'meteor/templating';
import {AccountsTemplates} from 'meteor/useraccounts:core';



Template.navBarPage.events({
  "click .nav.logout": function(event, template) {
    event.preventDefault();
    AccountsTemplates.logout();
  }
});
