import adminRoutes from './routes.js';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';


adminRoutes.route('/game-type/criar-tipo-jogo', {
  name: "adminGameTypeCreatePage",
  action: function() {
    return BlazeLayout.render(adminRoutes.layoutPage, {
      sideBar: adminRoutes.sideBarPage,
  //    main: adminLayoutPage,
      page: 'adminGameTypeCreatePage'
    });
  },
  parent: "dashboard.game-type",
  title: "Criar Tipo de Jogo"
});
