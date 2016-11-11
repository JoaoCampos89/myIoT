import adminRoutes from './routes.js';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';


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
  parent: "dashboard.gateway",
  title: "Criar Gateway"
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
  parent: "dashboard.gateway",
  title: "Editar Gateway"
});
