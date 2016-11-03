import { resetDatabase } from 'meteor/xolvio:cleaner';
import {startGame} from './validated-methods.js';
import {Meteor} from 'meteor/meteor';
import {assert} from 'meteor/practicalmeteor:chai';

describe('Mysensors validated methods', function () {
  beforeEach(function () {
    resetDatabase();
  });
  it('not allow users without login', function(){

      assert.throws(function() {
          startGame._execute();
      }, Meteor.Error, /Lists.methods.makePublic.accessDenied/);



  });

});
