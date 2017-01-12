var Home = require('./views/home');
var Menu = require('./views/menu');
var Video = require('./views/video');
var Stats = require('./views/stats');
var Lightbox = require('./views/lightbox');
var isMobile = require('./libs/isMobile');
var Salvattore = require('salvattore');

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g,
  escape: /\{\{\-(.+?)\}\}/g,
  evaluate: /\<\%(.+?)\%\>/gim
};


var Main = Backbone.View.extend({

  home: null,
  menu: null,
  stats: null,

  currentVideo: null,
  currentLightbox: null,

  currentSection: 0,

  offsets: [],

  events: {
    'click .navs li': 'anchor',
    'click #burger': 'toggleMenu',
    'click #videos li': 'newVideo',
    'click #news .wrap': 'newLightbox',
    'mouseenter #news .wrap': 'wow',
  },

  initialize: function(params) {

  },

  toggleMenu: function() {

    this.$el.find('#fixed-menu').toggleClass('open');
    this.$el.find('#burger').toggleClass('is-active');
    return this;
  },

  anchor: function(e) {

    var section = this.$el.find(e.currentTarget).attr('anchor');
    $('html, body').animate( { scrollTop: $('#'+section).offset().top }, 750 );
    if (isMobile) this.toggleMenu();
    return false;
  },

  initSections: function() {

    var that = this;

    var sections = ['home', 'videos', 'stats', 'team', 'news'];

    sections.forEach(function(section, id) {

      var top = that.$el.find('#'+sections[id]).offset().top;
      that.offsets.push(top);
    });

    return this;
  },

  currentPage: 0,

  scroll: _.throttle(function() {

    var that = this;
    var st = $(window).scrollTop();
    var perfect = $(window).height() / 2;

    var offset = this.offsets[this.currentPage]

    if (st > offset - perfect) {

      this.$el.find("section[data-offset="+this.currentPage+"]").addClass('loaded');
      this.$el.find('#fixed-menu li.current').removeClass('current');
      this.$el.find("#fixed-menu li[data-scroll="+this.currentPage+"]").addClass('current');
      this.currentPage++;

    } else if (st < this.offsets[this.currentPage - 1] - perfect) {

      this.$el.find('#fixed-menu li.current').removeClass('current');
      this.$el.find("#fixed-menu li[data-scroll="+(this.currentPage-2)+"]").addClass('current');
      this.currentPage--;
    }

    if (this.currentPage > 1) this.$el.find('#fixed-menu').show(0).addClass('locked');
    else {
      this.$el.find('#fixed-menu').removeClass('locked open').hide(0);
      this.$el.find('#burger').removeClass('is-active');
    }

    return this;
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

  initMenu: function() {

    this.menu = new Menu({el: $('body')});
    this.menu.render();
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

    return q.fcall(function(){

      return [
        that.initSections(),
        that.initHome(),
        that.initMenu()
      ]
    })
    .all()
    .delay(200)
    .then(function() {

      that.$el.addClass('ready');
      return that.initStats();
    });

  },

});

var View = new Main({el: $('body')});
View.render();

