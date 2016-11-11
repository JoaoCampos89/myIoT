import './select2.html';
import 'select2';
import {Template} from 'meteor/templating';

var templateName = 'select2Component';

Template[templateName].events({
  "click .js-select2": function(event, template){
    if('clickCallback' in template.data){
        template.data.callback(this);
      }else{
        console.log("Not have clickCallback(this), context:"+ this);
      }
  }
});

Template[templateName].onRendered(function(){
  var instance = this;
  var select2Options = instance.data.select2Options||{};
  instance.autorun(function(){
    instance.$(".js-select2").select2(select2Options);
  });

});
