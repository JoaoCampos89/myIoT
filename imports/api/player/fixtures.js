import {Meteor} from 'meteor/meteor';

export default function generateFixtures(){
  var users = Meteor.users.find({}).fetch();
  this.insert({name:'Mario', userId: users[5]._id});
  this.insert({name:'João',  userId: users[0]._id});
  this.insert({name:'Huilman', userId: users[7]._id});

}
