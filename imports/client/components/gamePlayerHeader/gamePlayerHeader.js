import './gamePlayerHeader.css';
import './gamePlayerHeader.html';
import '../userImage/userImage';
import {Template} from 'meteor/templating';

var templateName = 'gamePlayerHeaderComponent';

Template[templateName].helpers({
  userImage: function(){
    var template = Template.instance();
    return {width:"50",height:"50"};
  },
  gameCompletionChart: function(){
    var template = Template.instance();
    return {percentage:"50",text:"50%"};
  },
  easyPieChart:function(){
    return {animate:1000};
  }
});
Template[templateName].events({
  "click #js-game-start": function(event, template){
    console.log(template.data);
    if('startGame' in template.data){
      template.data.startGame();
    }else{
      console.log('calback startGame is not defined');
    }
  }
});




Template[templateName].onRendered(function(){

  var template = this;


});
