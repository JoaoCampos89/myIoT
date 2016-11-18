import adminRoutes from './routes.js';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import s from 'underscore.string';
const routeName = "gateway";

adminRoutes.routesArray.push({
 path: "gateway",
 name: "dashboard.gateway",
 title: "Gateway"
});


adminRoutes.route('/gateway', {
  name: "adminGatewayPage",
  action: function() {
    return BlazeLayout.render(adminRoutes.layoutPage, {
      sideBar: adminRoutes.sideBarPage,
  //    main: adminLayoutPage,
      page: 'adminGatewayPage'
    });
  },
  parent: "dashboard",
  title: "Gateway"
});




adminRoutes.route('/gateway/criar-gateway', {
  name: "adminGatewayCreatePage",
  action: function() {
    return BlazeLayout.render(adminRoutes.layoutPage, {
      sideBar: adminRoutes.sideBarPage,
  //    main: adminLayoutPage,
      page: 'adminGatewayCreatePage'
    });
  },
  title: "Criar Gateway",
  parent: "adminGatewayPage"

});

adminRoutes.route('/gateway/editar-gateway/:id', {
  name: "adminGatewayEditPage",
  action: function() {
    return BlazeLayout.render(adminRoutes.layoutPage, {
      sideBar: adminRoutes.sideBarPage,
  //    main: adminLayoutPage,
      page: 'adminGatewayEditPage'
    });
  },
  parent:  "adminGatewayPage",
  title: "Editar Gateway"
});
