import './sidebar.css';
import './sidebar.html';


import {FlowRouter} from 'meteor/kadira:flow-router';
import _ from 'underscore';
import {Template} from 'meteor/templating';
import adminRoutes  from '../../routes';


Template.adminSideBarPage.helpers({
  routes: function() {

    var routes = _.map(adminRoutes.routesArray, function(route) {
      return {
        path: "/admin/" + route.path,
        name: route.name,
        title: route.title
      };
    });

    return routes;
  }

});
