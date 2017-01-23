var isMobile = require('../libs/isMobile');
var isTrash = require('../libs/isTrash');
var Repulse = require('../libs/repulse');

module.exports = Backbone.View.extend({

  events: {},

  initialize: function(params) {

  },

  render: function() {

    if (isMobile) {
      this.$el.find('#dots').remove();
      return this;
    }

    this.$el.find(".repulsed.slow").repulse({ offset: 0.8 });
    this.$el.find(".repulsed.medium").repulse({ offset: 2 });
    this.$el.find(".repulsed.fast").repulse({ offset: 4 });


    return this;
  },

})


