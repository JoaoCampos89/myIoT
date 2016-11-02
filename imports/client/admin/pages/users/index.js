import './view.js';
//import './remove';
import './index.html';


import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {Spacebars} from 'meteor/spacebars';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveVar} from 'meteor/reactive-var';
import {removeUser} from '/imports/api/user/validated-methods.js';
import {Modal} from 'meteor/peppelg:bootstrap-3-modal';
const templateName = 'adminUsersManagementPage';

Template[templateName].onCreated(function(){
  var template = this;
  template.autorun(function(){
    template.modalShow = new ReactiveVar(false);
    template.userId = new ReactiveVar(false);
  });
});

Template[templateName].helpers({
  settings: function() {
    return {
      collection: Meteor.users,
      rowsPerPage: 4,
      showFilter: true,
      fields: ['username', {
        //    key: 'resources',
        label: 'Actions',
        fn: function(value, object, key) {
          return new Spacebars.SafeString(
            "<button class='btn btn-danger delete'>Delete</button><button class='btn btn-info view'>View User</button>"
          );
        },
        sortable: false
      }]
    };
  },
  /*modalOptions: function(){
    var instance = Template.instance();
    var user = Meteor.users.findOne(instance.userId.get());
    var username =  user.username  || " ";
    return {
              model:{ name:  username,
                     prefix: "Usuário"
                   },
              validatedMethod:removeUser,
              //modalShow: instance.modalShow.get(),
              route: "dashboard.users-management"
            };


  },

  model: function(){
    var instance = Template.instance();
    var user = Meteor.users.findOne(instance.userId.get());
    //var username =  user.username  || " ";
    return { name:  "teste",
           prefix: "Usuário"
         };

  },
  validatedMethod:function(){
    return {removeUser};
  },
  // pass the template state
  modalShow:function(){
    console.log(Template.instance().modalShow.get());
    var template = Template.instance();
    return ;
  }*/
});


Template[templateName].events({
  'click .reactive-table tbody tr': function(event,template) {
    event.preventDefault();
    console.log("I am her");
    var user = this;
    template.userId.set(user._id);
    // checks if the actual clicked element has the class `delete`
    if (event.target.className == "btn btn-danger delete") {
      //Meteor.users.remove(user._id);
      //
      //lo
     user = Meteor.users.findOne(user._id);
      var modalContext = {};
      modalContext.model =
      {
            _id: user._id,
            name:  user.username,
             prefix: "Usuário"
      };
      modalContext.validatedMethod = removeUser;
      modalContext.route = "adminUsersManagementPage";

      Modal.show('removeModalComponent', modalContext);
    }
    if (event.target.className == "btn btn-info view") {
      //Meteor.users.remove(user._id);
      //
      FlowRouter.go("adminUsersManagementViewPage",{id:user._id});
      //alert(user);
      //console.log(user);
    }
  }
});

Template[templateName].onRendered(function(){

});
