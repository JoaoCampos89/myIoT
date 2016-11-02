/* eslint-env mocha */
import { resetDatabase } from 'meteor/xolvio:cleaner';
import {startGame} from './validated-methods.js';
import {Meteor} from 'meteor/meteor';
import {chai,assert} from 'meteor/practicalmeteor:chai';
import {ValidationError}from 'meteor/mdg:validation-error'
import Gateway from './gateway/index.js';

import TargetGroup from '../targetGroup/index.js';
import Player from '../player';
import '../user';

// running my sensors tests only server-side
if (Meteor.isServer){

import gw from '../gw.js';
//Meteor.users.createDummyUsers();
// TODO define how to test all Hardware
describe('Mysensors Hardware test', function () {

  describe("Testing auto register nodes to gateway",function(){
        before(function () {

          Gateway.remove({});
          // wait 2 minutes to system register all nodes  
          this.setTimeout(120000);
        });
        it('start game method not allow users without login', function(){



        });
        it("start game method not initiate if game finish", function(){


        });


      })
});

}
