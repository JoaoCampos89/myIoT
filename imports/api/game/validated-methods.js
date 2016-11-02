import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ValidationError}from 'meteor/mdg:validation-error'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Roles} from 'meteor/alanning:roles';
import Game from './collection.js';
import Team from '../team';
import {Meteor} from 'meteor/meteor';
import Timeline from '../timeline';
import _ from 'underscore';

export const createGame = new ValidatedMethod({
  name: 'game.createGame',
  validate: new SimpleSchema({
    //maxPlayers:{type: Number},
    name: { type: String },
    type: { type: String },
    room: { type: String }
  }).validator(),
  run({ type, room, name }) {

    if(this.userId){
            const _id = Game.insert({ targetGroupId: room, name:name, gameTypeId: type, createdBy:this.userId, createdAt: new Date.now()});
            if(_id){
                Timeline.insert({message:'A game was added to the system', type: 'createGame', id:_id, userId: this.userId, at: new Date.now()});
                return _id;
            }
    }
      else {
        throw new ValidationError([
            {
              name: 'server',
              type: 'NOT_ALLOWED',
              description : "Sorry you have to be super-admin to do this thing."
            }
          ]);
      }
  }
});

export const createGameTerminal = new ValidatedMethod({
  name: 'game.createGameTerminal',
  validate: new SimpleSchema({
    //maxPlayers:{type: Number},
    gameTypeId: { type: String },
    roomId: { type: String },
    type: { type: String,
            allowedValues: ["individual", "team"] }
  }).validator(),
  run({ type, roomId,  gameTypeId}) {

    if(this.userId){
                var option = {};
                    option[type] = 1;

                const _id = Game.insert({ targetGroupId: roomId, option, gameTypeId: gameTypeId, createdBy:this.userId, createdAt: new Date().getTime()});
                return {_id:_id, option:type};

    }
      else {
        throw new ValidationError([
            {
              name: 'server',
              type: 'NOT_ALLOWED',
              description : "Sorry you have to be super-admin to do this thing."
            }
          ]);
      }
  }
});





export const addPlayersToGame = new ValidatedMethod({
  name: 'game.addPlayersToGame',
  validate: new SimpleSchema({
    players: { type: [String] },
    id: { type: String }

  }).validator(),
  run({ players, id}) {

    if(this.userId){
            players = _.map(players,function(player,index){
              if(index == 0){
                return {id:player, active:true};
              }else{
                return {id:player}
              }
            });
            return Game.update({_id:id},{$set:{"players":players}});
    }
      else {
        throw new ValidationError([
            {
              name: 'server',
              type: 'NOT_ALLOWED',
              description : "Sorry you have to be super-admin to do this thing."
            }
          ]);
      }
  }
});



export const addTeamToGame = new ValidatedMethod({
  name: 'game.addTeamToGame',
  validate: new SimpleSchema({
    teamName: { type: String },
    id: { type: String }
  }).validator(),
  run({ teamName, id}) {

    if(this.userId){
            var teamId = Team.insert({name:teamName, createdBy:this.userId, createdAt:new Date().getTime()});
            var  team = {id:teamId};
            return Game.update({_id:id},{$push:{"teams":team}});
    }
      else {
        throw new ValidationError([
            {
              name: 'server',
              type: 'NOT_ALLOWED',
              description : "Sorry you have to be super-admin to do this thing."
            }
          ]);
      }
  }
});
