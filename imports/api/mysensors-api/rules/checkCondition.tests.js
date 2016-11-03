/* eslint-env mocha */

import { assert } from 'meteor/practicalmeteor:chai';
import checkCondition from './checkCondition.js'


//import {checkAllRules} from '../index.js';
//import Rule from '../../../rule';
//import {Sensor} from '../../../mysensors-hardware';



describe("RULES section", function(){
    describe("Testing Checking condition function", function(){
        it("equal condition returns true", function(){
            const result = checkCondition('=', 100, 50, 50);
            assert.equal(result,true);
        });
        it("less condition returns true", function(){
            const result = checkCondition('<', 100, 40, 50);
            assert.equal(result,true);
        });
        it("less equal condition returns true", function(){
            const result = checkCondition('<=', 100, 50, 50);
            assert.equal(result,true);
        });
        it("great condition returns true", function(){
            const result = checkCondition('>', 100, 70, 50);
            assert.equal(result,true);
        });
        it("great equal condition returns true", function(){
            const result = checkCondition('>=', 100, 50, 50);
            assert.equal(result,true);
        });
        it("risingEdge condition returns true", function(){
            const result = checkCondition('risingEdge', 50, 110, 50);
            assert.equal(result,true);
        });
        it("fallingEdge condition returns true", function(){
            const result = checkCondition('fallingEdge', 110, 50, 50);
            assert.equal(result,true);
        });
        it("not match condition returns false", function(){
            const result = checkCondition(' ', 100, 50, 50);
            assert.equal(result,false);
        });
    });
});
