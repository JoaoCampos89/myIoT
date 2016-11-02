import adminRoutes from './routes.js';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';


adminRoutes.route('/target-group/criar-sala', {
  name: "adminTargetGroupCreatePage",
  action: function() {
    return BlazeLayout.render(adminRoutes.layoutPage, {
      sideBar: adminRoutes.sideBarPage,
  //    main: adminLayoutPage,
      page: 'adminTargetGroupCreatePage'
    });
  },
  parent: "dashboard.target-group",
  title: "Criar Sala"
});

adminRoutes.route('/target-group/editar-sala/:id', {
  name: "adminTargetGroupEditPage",
  action: function() {
    return BlazeLayout.render(adminRoutes.layoutPage, {
      sideBar: adminRoutes.sideBarPage,
  //    main: adminLayoutPage,
      page: 'adminTargetGroupEditPage'
    });
  },
  parent: "dashboard.target-group",
  title: "Editar Sala"
});
