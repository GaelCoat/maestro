var isMobile = require('../libs/isMobile');

module.exports = Backbone.View.extend({

  events: {},

  initialize: function(params) {

  },

  renderWeb: function() {

    var tpl = _.template($('#tpl-menu-web').html());

    this.$el.prepend(tpl());
    return this;
  },

  renderMobile: function() {

    var tpl = _.template($('#tpl-menu-mobile').html());

    this.$el.prepend(tpl());
    return this;
  },

  render: function() {

    if (isMobile) return this.renderMobile();
    else return this.renderWeb();
    return this;
  },

})


