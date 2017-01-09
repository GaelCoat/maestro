var Home = require('./views/home');
var Video = require('./views/video');
var Stats = require('./views/stats');
var Lightbox = require('./views/lightbox');
var Salvattore = require('salvattore');

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var Main = Backbone.View.extend({

  home: null,
  stats: null,

  currentVideo: null,
  currentLightbox: null,

  events: {
    'click #header li': 'anchor',
    'click #videos li': 'newVideo',
    'click #news .wrap': 'newLightbox',
    'mouseenter #news .wrap': 'wow',
  },

  initialize: function(params) {

  },

  anchor: function(e) {

    var section = this.$el.find(e.currentTarget).attr('anchor');
    this.$el.find('#header li.current').removeClass('current');
    this.$el.find(e.currentTarget).addClass('current');

    $('html, body').animate( { scrollTop: $('#'+section).offset().top }, 750 );
    return false;
  },

  scroll: _.throttle(function() {

    var sections = ['home', 'videos', 'stats', 'team', 'news'];
    var st = $(window).scrollTop();
    var vh = $(window).height();
    var current = Math.floor((st+vh*0.6)/vh);

    this.$el.find('#'+sections[current]).addClass('loaded');

  }, 100),

  wow: function(e) {

    var pos = {x: e.offsetX, y: e.offsetY};
    var damn = $(e.currentTarget).find('.alright');
    damn.css({top: pos.y, left: pos.x});

    return this;
  },

  newVideo: function(e) {


    var url = this.$el.find(e.currentTarget).attr('video-url');

    this.$el.addClass('modal-open');

    if (this.currentVideo) return this.currentVideo.setUrl(url);
    this.currentVideo = new Video({url: url});
    this.currentVideo.render();

    return this;
  },

  newLightbox: function(e) {


    var url = this.$el.find(e.currentTarget).find('img').attr('src');

    this.$el.addClass('modal-open');

    if (this.currentLightbox) return this.currentLightbox.setUrl(url);
    this.currentLightbox = new Lightbox({url: url});
    this.currentLightbox.render();

    return this;
  },

  initHome: function() {

    this.home = new Home({el: $('#home')});
    this.home.render();
    return this;
  },

  initStats: function() {

    this.stats = new Stats({el: $('#stats')});
    this.stats.render();
    return this;
  },

  render: function() {

    var that = this;

    $(window).scroll(this.scroll.bind(this));

    return q.fcall(this.initHome.bind(this))
    .then(function() {

      that.$el.addClass('ready');
      return that.initStats();
    });

  },

});

var View = new Main({el: $('body')});
View.render();

