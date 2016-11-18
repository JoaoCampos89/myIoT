/* eslint-env mocha */

import { assert } from 'meteor/practicalmeteor:chai';
import checkCondition from './checkCondition.js'
import {Meteor} from 'meteor/meteor';

//import {checkAllRules} from '../index.js';
//import Rule from '../../../rule';
//import {Sensor} from '../../../mysensors-hardware';

if(Meteor.isServer){

describe("My IOT API section", function(){
    describe("Testing Checking condition function", function(){
        it("equal condition returns true", function(){
            const args = {
                type: '=',
                previousValue:100,
                value: 50,
                threshold:50
            };
            const result = checkCondition(args);
            assert.equal(result,true);
        });
        it("less condition returns true", function(){
          const args = {
              type: '<',
              previousValue:100,
              value: 40,
              threshold:50
          };
          const result = checkCondition(args);
          assert.equal(result,true);
        });
        it("less equal condition returns true", function(){
          const args = {
              type: '<=',
              previousValue:100,
              value: 50,
              threshold:50
          };
          const result = checkCondition(args);
          assert.equal(result,true);

        });
        it("great condition returns true", function(){
          const args = {
              type: '<=',
              previousValue:100,
              value: 70,
              threshold:50
          };
          const result = checkCondition(args);
          assert.equal(result,true);

        });
        it("great equal condition returns true", function(){
          const args = {
              type: '<=',
              previousValue:100,
              value: 50,
              threshold:50
          };
          const result = checkCondition(args);
          assert.equal(result,true);

        });
        it("risingEdge condition returns true", function(){
          const args = {
              type: '<=',
              previousValue:110,
              value: 50,
              threshold:50
          };
          const result = checkCondition(args);
          assert.equal(result,true);

        });
        it("fallingEdge condition returns true", function(){
          const args = {
              type: '<=',
              previousValue:110,
              value: 50,
              threshold:50
          };
          const result = checkCondition(args);
          assert.equal(result,true);

        });
        it("not match condition returns false", function(){
          const args = {
              type: ' ',
              previousValue:100,
              value: 50,
              threshold:50
          };
          const result = checkCondition(args);
          assert.equal(result, false);

        });
    });
});
}
