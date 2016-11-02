import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {AccountsTemplates} from 'meteor/useraccounts:core';

// all routes for game
var gameRoutes = FlowRouter.group({
  prefix: '/game-terminal',
  name: 'gameTerminal',
  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ]
});

// game layout page
var layoutPage = 'gameTerminalLayoutPage';

var prefix = "gameTerminal";
//var gameLayoutPage = "gameLayoutPage";
// game sidebarPage
var sideBarPage = prefix + "SideBarPage";


gameRoutes.route('/', {
  name: prefix +"Page",
  action: function() {
    return BlazeLayout.render('layoutPage', {
      //sideBar: sideBarPage,
      main: prefix + 'Page'
    });
  }
});



// handling /game route
gameRoutes.route('/room/:id', {
  name: prefix +"IndexPage",
  action: function() {
    return BlazeLayout.render(layoutPage, {
    //  sideBar: sideBarPage,
      main: prefix + 'IndexPage'
    });
  }
});

gameRoutes.route('/room/:id/mount-team/:gameId', {
  name: prefix +"MountTeamsPage",
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      main: prefix + 'MountTeamsPage'
    });
  }
});

gameRoutes.route('/room/:id/mount-individual/:gameId', {
  name: prefix +"MountIndividualPage",
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
      main: prefix + 'MountIndividualPage'
    });
  }
});

gameRoutes.route('/room/:id/game/:gameId/play-individual', {
  name: prefix +"PlayIndividualPage",
  action: function() {
    return BlazeLayout.render(layoutPage, {
    //  sideBar: sideBarPage,
      main: prefix + 'PlayIndividualPage'
    });
  }
});


// handling /game/waiting-room
/*gameRoutes.route('/create', {
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

*/
