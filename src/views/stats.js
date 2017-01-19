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

    console.log(stats.seasons);

    _.forEach(stats.seasons, function(data, year) {

      var season = $('<li>');
      season.attr('id', year);
      season.click(that.slide.bind(that));

      if (year === 'national') {
        season.text('Sél. Nationale');
        that.$el.find('ul.seasons').append(season);
        return that.renderSeason(data, year);
      }

      season.text(year);
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

    if (year === 'national') {
      this.$el.find('ul.data').append(el);
      return this;
    }

    this.$el.find('ul.data').prepend(el);

    return this;
  },

  render: function() {

    return this.renderSeasons();
  },



})


