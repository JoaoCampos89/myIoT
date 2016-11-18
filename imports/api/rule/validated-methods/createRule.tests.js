import {Random} from 'meteor/random'
/* eslint-env mocha */

import { assert } from 'meteor/practicalmeteor:chai';

import ruleFixture from './data.tests.js'
import createRule from './createRule.js';

import _ from 'underscore';

//import {checkAllRules} from '../index.js';
//import Rule from '../../../rule';
//import {Sensor} from '../../../mysensors-hardware';


let sensor1Id, sensor2Id, gatewayId;
describe("Rules create validated method", function(){
    describe("Testing creating", function(){
      before(function(){

        //sensorId = Sensor.insert(entry);

      })

      it('only makes the list public if you made it private', function() {
        // rule is created with proper conectors
        const context = { userId: Random.id()  };
        const args = ruleFixture;

        createRule._execute(context, args);

      });


    });
});
