import Game from './collection.js';
//import './methods.js';
import _ from 'underscore';
import GameType from '../gameType/index.js';
import generateFixtures from './fixtures.js';
Game.generateFixtures = generateFixtures;
Game.helpers({
  activePlayer:function(){
    return _.findWhere(this.players,{active:true});
  },
  nextPlayer:function(){
    if(this.players.length === 1){
      return this.players[0];
    }

    var activePlayer = _.findWhere(this.players,{active:true});
    var nextPlayerIndex = _.findIndex(this.players, activePlayer)+1;
    if(nextPlayerIndex>this.players.length){
      return this.players[this.players.length];
    }else{
      return this.players[nextPlayerIndex];
    }
  },
  lastPlayer:function(){
      var activePlayer = _.findWhere(this.players,{active:true});
      console.log(activePlayer);
      var nextPlayerIndex = _.findIndex(this.players, activePlayer)+1;
      console.log(nextPlayerIndex);
      console.log(this.players.length);
        if(nextPlayerIndex>=this.players.length-1){
          return true;
        }else{
          return false;
        }
  },
  gameType:function(){
     return GameType.findOne({_id:this.gameTypeId});
  }

});
export default Game;
