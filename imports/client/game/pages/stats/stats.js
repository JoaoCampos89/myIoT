import './stats.css';
import './stats.html';

import {Template} from 'meteor/templating';

Template.gameStatsPage.helpers({
  counter: function() {
    var counter = [0, 1, 2, 3, 4];
    return counter;
  }

});
