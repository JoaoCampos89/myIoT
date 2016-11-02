import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {AccountsTemplates} from 'meteor/useraccounts:core';


var sideBarPage = 'navBarPage';
var layoutPage = 'layoutPage';
// handling /game route
FlowRouter.route('/', {
  name: "indexPage",
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: "",
      main: 'indexPage'
    });
  },
  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ]
});
