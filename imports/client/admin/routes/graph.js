import adminRoutes from './routes.js';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import s from 'underscore.string';


const routeName = "graph";

adminRoutes.routesArray.push({
 path: routeName,
 name: "dashboard."+ routeName,
 title: s.titleize(s.humanize(routeName)),
 symbol: "fa fa-line-chart"
});


adminRoutes.route('/'+ routeName, {
  name: "admin"+s.classify(routeName)+"Page",
  action: function() {
    return BlazeLayout.render(adminRoutes.layoutPage, {
      sideBar: adminRoutes.sideBarPage,
  //    main: adminLayoutPage,
      page: "admin"+s.classify(routeName)+"Page",
    });
  },
  parent: "dashboard",
  title: s.titleize(s.humanize(routeName))
});




adminRoutes.route('/'+ routeName+'/criar-'+ routeName, {
  name: "admin"+s.classify(routeName)+"CreatePage",
  action: function() {
    return BlazeLayout.render(adminRoutes.layoutPage, {
      sideBar: adminRoutes.sideBarPage,
  //    main: adminLayoutPage,
      page: "admin"+s.classify(routeName)+"CreatePage"
    });
  },
  parent: "admin"+s.classify(routeName)+"Page",
  title: "Criar "+ s.titleize(s.humanize(routeName))
});

adminRoutes.route('/'+ routeName+'/editar-'+ routeName+'/:id', {
  name: "admin"+s.classify(routeName)+"EditPage",
  action: function() {
    return BlazeLayout.render(adminRoutes.layoutPage, {
      sideBar: adminRoutes.sideBarPage,
  //    main: adminLayoutPage,
      page: "admin"+s.classify(routeName)+"EditPage"
    });
  },
  parent: "admin"+s.classify(routeName)+"Page",
  title: "Editar "+ s.titleize(s.humanize(routeName))
});
