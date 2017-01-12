var isMobile = require('../libs/isMobile');
var isTrash = require('../libs/isTrash');

module.exports = Backbone.View.extend({

  events: {},

  initialize: function(params) {

  },

  renderImage: function() {

    var tpl = _.template($('#tpl-home-mask').html());

    this.$el.find('ul.cool-shit').after(tpl());
    return this;
  },

  renderVideo: function() {

    var tpl = _.template($('#tpl-home-video').html());

    this.$el.find('ul.cool-shit').after(tpl());
    return this;
  },

  render: function() {

    if (isMobile || isTrash) return this.renderImage();
    else return this.renderVideo();
    return this;
  },

})


