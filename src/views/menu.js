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
    var social = _.template($('#tpl-social-mobile').html());

    this.$el.prepend(tpl());
    $('#home').append(social());
    return this;
  },

  render: function() {

    if (isMobile) return this.renderMobile();
    else return this.renderWeb();
    return this;
  },

})


