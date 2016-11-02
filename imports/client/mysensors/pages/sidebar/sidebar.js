import './sidebar.css';
import './sidebar.html';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';


const templateName  = 'mySensorsSideBarPage';

Template[templateName].helpers({
  routes: function() {
    var routes = [
      {
        name: 'mySensorsIndexPage',
        title: 'MY_SENSORS_INDEX_PAGE'
      },
      {
        name: 'mySensorsNodesPage',
        title: 'MY_SENSORS_NODES_PAGE'
      }
    ];

    return routes;
  }
});
