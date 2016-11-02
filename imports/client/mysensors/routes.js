import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {AccountsTemplates} from 'meteor/useraccounts:core';

// all routes for game
var groupRoutes = FlowRouter.group({
  prefix: '/mysensors',
  name: 'mysensors',
  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ]
});

// game layout page
var layoutPage = 'mySensorsLayoutPage';

//var groupLayoutPage = "mySensorsLayoutPage";
// game sidebarPage
var sideBarPage = "mySensorsSideBarPage";





// handling /game route
groupRoutes.route('/', {
  name:'mySensorsIndexPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      //main: groupLayoutPage,
      page: 'mySensorsIndexPage'
    });
  },
  triggersEnter: [function(context, redirect) {
    console.log('running /game trigger');
  }]
});

// handling /game/waiting-room
groupRoutes.route('/nodes', {
  name: 'mySensorsNodesPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      //main: groupLayoutPage,
      page: 'mySensorsNodesPage'
    });
  }
});
/*
// handling /game/stats
groupRoutes.route('/nodes/:node', {
  name: 'mySensorsNodesPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      main: groupLayoutPage,
      page: 'mySensorsNodesPage'
    });
  }
});


// handling /game/stats
groupRoutes.route('/messages', {
  name: 'mySensorsMessagesPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      main: groupLayoutPage,
      page: 'mySensorsMessagesPage'
    });
  }
});

// handling /game/stats
groupRoutes.route('/messages/:node/:sensor', {
  name: 'mySensorsMessagesNodeSensorPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      main: groupLayoutPage,
      page: 'mySensorsMessagesNodeSensorPage'
    });
  }
});
*/
