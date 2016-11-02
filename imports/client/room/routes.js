import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {AccountsTemplates} from 'meteor/useraccounts:core';

// all routes for game
var gameRoutes = FlowRouter.group({
  prefix: '/game',
  name: 'game',
  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ]
});

// game layout page
var layoutPage = 'layoutPage';

//var gameLayoutPage = "gameLayoutPage";
// game sidebarPage
var sideBarPage = "gameSideBarPage";


// handling /game route
gameRoutes.route('/', {
  name: "gameIndexPage",
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      main: 'gameIndexPage'
    });
  }
});

// handling /game/waiting-room
gameRoutes.route('/create', {
  name: 'gameCreatePage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      main: 'gameCreatePage'
    });
  }
});



// handling /game/waiting-room
gameRoutes.route('/waiting-room/:roomName', {
  name: 'gameWaitingRoomPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      main: 'gameWaitingRoomPage'
    });
  }
});

// handling /game/stats
gameRoutes.route('/stats', {
  name: 'gameStatsPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      main:  'gameStatsPage'

    });
  }
});


// handling /game/stats
gameRoutes.route('/next-player', {
  name: 'gameNextPlayerPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      main: 'gameNextPlayerPage'
    });
  }
});


// handling /game/stats
gameRoutes.route('/waiting-players/:id', {
  name: 'gameWaitingPlayersPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      main: 'gameWaitingPlayersPage'
    });
  }
});

// handling /game/stats
gameRoutes.route('/play/:id', {
  name: 'gamePlayPage',
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      main: 'gamePlayPage'
    });
  }
});
