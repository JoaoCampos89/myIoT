import './index.html';


import {Template} from 'meteor/templating';
//import {Meteor} from 'meteor/meteor';

import {FlowRouter} from 'meteor/kadira:flow-router';
import {Modal} from 'meteor/peppelg:bootstrap-3-modal';
const templateName = "removeModalComponent";

Template[templateName].onCreated(function(){
  //this.method = Template.currentData().validatedMethod;
  //
  //
  /*var instance = this;
  instance.modalShow = new ReactiveVar(false);

  this.autorun(function(){
    console.log(Template.currentData());
    if(Template.currentData().modalShow){
      instance.modalShow.set(Template.currentData().modalShow.get());
    }

  });*/
  // TODO know how to implement context validation
  /*this.autorun(() => {
    new SimpleSchema({
      validatedMethod: {type: ValidatedMethod, blackbox:true},
      model: {type: Object, optional:true, blackbox: true},
      route: {type: String},
      modalShow: {type: ReactiveVar, blackbox:true}
    }).validate(Template.currentData());

  });*/
});

/*Template[templateName].onRendered(function(){
  var instance = this;
  instance.autorun(function(){
          if(Template.currentData().modalShow){
            Modal.show('removeModalComponent');
          }else{
            Modal.hide('removeModalComponent');
          }

  });
});
*/

Template[templateName].events({
  "click .remove-model": function() {
    var context = this;
    //
    //
    //console.log(template);
    //console.log(Template.currentData());
    //

    context.validatedMethod.call({_id:context.model._id},
      function(error, result) {
          if (error) {
            console.log("error", error);
            Modal.hide('removeModalComponent');

          }
          if (result) {
            FlowRouter.go(context.route);
            Modal.hide('removeModalComponent');

          }
    });

  }
});
/*Template[templateName].helpers({
  model: function() {
    var template = Template.instance();
    console.log(template);
    return template.data.model;
  }
});
*/
