import './roundProgressChart.html';
import EasyPieChart from 'easy-pie-chart';
import {Template} from 'meteor/templating';



Template.roundProgressChartComponent.helpers({});

Template.roundProgressChartComponent.onRendered(function(){
  var easyPieChartOptions = this.data.easyPieChartOptions|| {
              animate: 2000,
              barColor: '#f2af32',
              trackColor: '#e1e1e1',
              scaleColor: '#cecece'
  };

  var element = this.find(".roundProgressChart");
  new EasyPieChart(element,easyPieChartOptions);

});
