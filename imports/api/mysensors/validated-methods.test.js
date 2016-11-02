/* eslint-env mocha */
import { resetDatabase } from 'meteor/xolvio:cleaner';
import {startGame} from './validated-methods.js';
import {Meteor} from 'meteor/meteor';
import {chai,assert} from 'meteor/practicalmeteor:chai';
import {ValidationError}from 'meteor/mdg:validation-error'
import Game from '../game/index.js';
import GameType from '../gameType/index.js';
import TargetGroup from '../targetGroup/index.js';
import Player from '../player';
import '../user';


//Meteor.users.createDummyUsers();

describe('Mysensors validated methods', function () {

  describe("validated methods",function(){
        before(function () {
          //Meteor.users.remove({});
          try {
          //  Meteor.users.createDummyUsers();
          } catch (e) {
            console.log(e);
          }

          Game.remove({});
          Player.remove({});
          GameType.remove({});
          //Meteor.users.generateFixtures();
          Player.generateFixtures();
          GameType.generateFixtures();
          TargetGroup.generateFixtures();

        });
        it('start game method not allow users without login', function(){

          // using try catch to
          // TODO: Identify the error type
          try {
              startGame._execute({},{gameId:"game"});
          } catch (errors) {
          //  console.log(errors.details[0].type);
            assert.instanceOf(errors, ValidationError);
            assert.equal(errors.details[0].type,"NOT_ALLOWED");
          }
          assert.equal(1,1);

        });
        it("start game method not initiate if game finish", function(){
            var gameTypeId = GameType.findOne({name:"IPSC"});
            Game.insert({_id:"game",finish:true, gameTypeId:gameTypeId});
            var context = {userId: "user"};

            try {
                startGame._execute(context, {gameId:"game"});
            } catch (errors) {
            //  console.log(errors);
              assert.instanceOf(errors, ValidationError);
              assert.equal(errors.details[0].type,"ALREADY FINISH");
            }

        });


      })
});
