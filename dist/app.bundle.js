webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_, Backbone, $, q) {var Home = __webpack_require__(9);
	var Video = __webpack_require__(10);

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


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5)))

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone) {
	module.exports = Backbone.View.extend({

	  events: {},

	  initialize: function(params) {

	  },

	  render: function() {

	    return this;
	  },

	})



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone, _, $) {
	module.exports = Backbone.View.extend({

	  events: {
	    'click .close': 'close'
	  },

	  initialize: function(params) {

	    this.tpl = _.template($('#tpl-video-popup').html());
	    this.url = 'http://www.youtube.com/embed/'+params.id;
	  },

	  render: function() {


	    this.$el.html(this.tpl({
	      url: this.url
	    }));

	    $('#videos').append(this.$el);

	    return this.show();
	  },

	  setUrl: function(id) {

	    this.url = 'http://www.youtube.com/embed/'+id;
	    this.$el.find('iframe').attr('src', this.url);
	    return this.show();
	  },

	  show: function() {

	    this.$el.show(0).find('.veil').addClass('ready');
	  },

	  close: function() {

	    this.$el.find('.veil').removeClass('ready');
	    this.$el.hide(0);
	    $('body').removeClass('modal-open');
	  },

	  reset: function() {

	    //this.undelegateEvents();
	    this.remove();
	  }

	})



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2), __webpack_require__(4)))

/***/ }
]);