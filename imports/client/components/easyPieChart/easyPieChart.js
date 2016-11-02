import './easyPieChart.html';
import EasyPieChart from 'easy-pie-chart';
import {Template} from 'meteor/templating';

var templateName = 'easyPieChartComponent';

Template[templateName].helpers({});

Template[templateName].onRendered(function(){
  var instance = this;

  instance.autorun(function(){
          var easyPieChartOptions = instance.data.easyPieChartOptions|| {
                      animate: false,
                      size:300,
                      barColor: '#f2af32',
                      trackColor: '#e1e1e1',
                      scaleColor: '#cecece'
          };


          var element = instance.find(".easyPieChart");

          new EasyPieChart(element,easyPieChartOptions);
});


});
