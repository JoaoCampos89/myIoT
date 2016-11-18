import adminRoutes from './routes.js';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import s from 'underscore.string';


const routeName = "node";

adminRoutes.routesArray.push({
 path: routeName,
 name: "dashboard."+ routeName,
 title: s.titleize(s.humanize(routeName))
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
