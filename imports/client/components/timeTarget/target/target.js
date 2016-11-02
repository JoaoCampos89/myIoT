Template.targetComponent.helpers({
  create: function() {

  },
  rendered: function() {

  },
  destroyed: function() {

  },
});

Template.targetComponent.events({
  "click .review": function(event, template) {
    console.log(template.$(".review").data("easyPieChart"));
    template.$('.review').easyPieChart({
      barColor: '#003300',
    });
  }
});
/**
 * render easy pie chart
 * @method onRendered
 * @param  {[type]}   function (argument     [description]
 * @return {[type]}            [description]
 */
Template.targetComponent.onRendered(function(argument) {
  var template = this;

  /*** Reviews Circle Stats ***/
  template.$('.review').easyPieChart({
  //  animate: 1000,
    barColor: '#ff0000',
    trackColor: '#e1e1e1',
    scaleColor: '#cecece',
    onStep: function(value) {
      this.$el.find('span').text(~~value);
    }
  });





});
