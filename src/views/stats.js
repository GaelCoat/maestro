var stats = require('../libs/stats');

module.exports = Backbone.View.extend({


  initialize: function(params) {

  },

  slide: function(e) {

    var target = this.$el.find(e.currentTarget);
    var offset = target.index() * 100;

    this.$el.find('ul.seasons li').removeClass('current');
    target.addClass('current');

    this.$el.find('ul.data').css({
      "transform": "translate3d(-"+offset+"%, 0, 0)"
    });
  },

  renderSeasons: function() {

    var that = this;

    _.forEach(stats.seasons, function(data, year) {

      var season = $('<li>');
      season.attr('id', year);
      season.text(year);
      season.click(that.slide.bind(that));

      that.$el.find('ul.seasons').prepend(season);
      that.renderSeason(data, year);
    });

    this.$el.find('ul.seasons li:first-child').addClass('current');

    return this;
  },

  renderSeason: function(data, year) {

    var tpl = _.template($('#tpl-stats-data').html());

    var el = tpl({
      data: data,
      year: year
    });

    this.$el.find('ul.data').prepend(el);

    return this;
  },

  render: function() {

    return this.renderSeasons();
  },



})


