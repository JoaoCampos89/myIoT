import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {AccountsTemplates} from 'meteor/useraccounts:core';
import {Roles} from 'meteor/alanning:roles';
import {Meteor} from 'meteor/meteor';
import s from 'underscore.string';
import _ from 'underscore';
import {TAPi18n} from 'meteor/tap:i18n';



const adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [AccountsTemplates.ensureSignedIn]
});

/**
 * Check if user is admin or player and redirects according
 * @param  {[type]} context  [description]
 * @param  {[type]} redirect [description]
 * @return {[type]}          [description]
 *
 * TODO currently this implementation not work. Try to identify where is the problem
 */
function checkAdmin(context, redirect) {
  console.log("Meteor userd Id " + Meteor.userId());
  console.log("roles is false: " + Roles.userIsInRole(Meteor.userId(),['super-admin','admin'],'admin'));
  if (!Roles.userIsInRole(Meteor.userId(),['super-admin','admin'],'admin')) {
    if (Roles.userIsInRole(Meteor.userId(), ['see-game', 'play-game'], 'player')) {
      redirect('/game');
      return;
    }
    console.log("I am here");
    redirect('/');
    return;
  }


}


// admin layout page
const layoutPage = 'adminLayoutPage';
// admin sidebarPage
const sideBarPage = "adminSideBarPage";

//var adminLayoutPage = "adminLayoutPage";
// specific routes first and they are not override
adminRoutes.route('/', {
  name: "dashboard",
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
    //  main: adminLayoutPage,
      page: 'adminDashboardPage'

    });
  },
  title: "Dashboard",
});

adminRoutes.layoutPage = layoutPage;
adminRoutes.sideBarPage = sideBarPage;



adminRoutes.routesArray = [{
    path: "",
    name: "dashboard",
    title: "Dashboard",
    symbol: "fa fa-tachometer"
  }];

// array of all routes
/*adminRoutes.routesArray = [{
    path: "",
    name: "dashboard",
    title: "Dashboard"

  }, {
    path: "target-group",
    name: "dashboard.target-group",
    title: "Salas"
  }, {
    path: "sensors",
    name: "dashboard.sensors",
    title: "Sensores"
  }, {
    path: "timeline",
    name: "dashboard.timeline",
    title: "Linha do Tempo"
  }, {
    path: "synchronize",
    name: "dashboard.synchronize",
    title: "Sincronizar"
  }, {
    path: "users-management",
    name: "dashboard.users-management",
    title: "User Admin"
  }, {
    path: "booking",
    name: "dashboard.booking",
    title: "Booking"
  },
  {
   path: "game-type",
   name: "dashboard.game-type",
   title: "Tipos de Jogo"
 },
 {
  path: "gateway",
  name: "dashboard.gateway",
  title: "Gateway"
},
];

adminRoutes.layoutPage = layoutPage;
adminRoutes.sideBarPage = sideBarPage;

_.each(_.filter(adminRoutes.routesArray, function(route) {
  return route.name !== "dashboard";
}), function(route) {
  // handling /admin/rooms
  adminRoutes.route('/' + route.path, {
    name: route.name,
    action: function() {
      return BlazeLayout.render(layoutPage, {
        sideBar: sideBarPage,
    //    main: adminLayoutPage,
        page: 'admin' + s.classify(route.path) + 'Page'
      });
    },
    parent: "dashboard",
    title: route.title
  });
});


adminRoutes.route('/adminUsersManagementViewPage/:id', {
  name: "adminUsersManagementViewPage",
  action: function() {
    return BlazeLayout.render(layoutPage, {
      sideBar: sideBarPage,
  //    main: adminLayoutPage,
      page: 'adminUsersManagementViewPage'
    });
  },
  parent: "dashboard.users-management",
  title: "View User"
});*/

export default adminRoutes
