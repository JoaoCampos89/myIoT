Template.nextPlayerComponent.helpers({
  nextPlayers: function() {
    var template = Template.instance();
    template.data.data.shift();
    return template.data.data;
  },
  currentPlayer: function() {
    var template = Template.instance();
    return template.data.data[0];
  },
  currentPlayerUserImage: function() {
    var template = Template.instance();
    return {
      width: "103",
      height: "103"
    };
  },
  nextPlayerUserImage: function() {
    var template = Template.instance();
    return {
      width: "50",
      height: "50"
    };
  },


});


Template.nextPlayerComponent.onRendered(function() {
  var template = this;

});
