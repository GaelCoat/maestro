var Home = require('./views/home');
var Video = require('./views/video');

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var Main = Backbone.View.extend({

  home: null,

  currentVideo: null,

  events: {
    'click #videos li': 'newVideo',
  },

  initialize: function(params) {

  },

  scroll: _.throttle(function() {

    var sections = ['home', 'videos', 'stats', 'team', 'news'];
    var st = $(window).scrollTop();
    var vh = $(window).height();
    var current = Math.floor((st+vh*0.6)/vh);

    this.$el.find('#'+sections[current]).addClass('loaded');

  }, 100),

  newVideo: function(e) {


    var id = this.$el.find(e.currentTarget).attr('video-id');

    this.$el.addClass('modal-open');

    if (this.currentVideo) return this.currentVideo.setUrl(id);
    this.currentVideo = new Video({id: id});
    this.currentVideo.render();

    return this;
  },

  initHome: function() {

    this.home = new Home({el: $('#home')});
    this.home.render();
    return this;
  },

  render: function() {

    var that = this;

    $(window).scroll(this.scroll.bind(this));

    return q.fcall(this.initHome.bind(this))
    .then(function() {

      that.$el.addClass('ready');
    });

  },

});

var View = new Main({el: $('body')});
View.render();

