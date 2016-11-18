import './sidebar.css';
import './sidebar.html';


import {FlowRouter} from 'meteor/kadira:flow-router';
import _ from 'underscore';
import {Template} from 'meteor/templating';
import adminRoutes  from '../../routes';


Template.adminSideBarPage.helpers({
  routes: function() {

    var routes = _.map(adminRoutes.routesArray, function(route) {
      if(route.name === "dashboard"){
        return {
          path: "/admin",
          name: route.name,
          title: route.title,
          symbol: route.symbol
        };
      }
        else{
          return {
            path: "/admin/" + route.path,
            name: route.name,
            title: route.title,
            symbol: route.symbol
          };
        }
    });

    return routes;
  }

});
