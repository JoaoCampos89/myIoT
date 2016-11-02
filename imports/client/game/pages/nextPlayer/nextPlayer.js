import './nextPlayer.css';
import './nextPlayer.html';
import {Template} from 'meteor/templating';


Template.gameNextPlayerPage.helpers({
  tournamentBracket: function() {
    return {
      nome: 0
    };
  },
  nextPlayers: function() {
    return [{
      name: "Mario"
    }, {
      name: "viado"
    }];
  },
  currentPlayer: function() {
    return {
      name: "Mario",
      location: "no rabo"
    };
  },
});


Template.gameNextPlayerPage.events({
  "click .btn.btn-default.terminateGame": function(event, template) {
    alert("jogo terminado");
  }
});
