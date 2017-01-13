webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_, Backbone, $, q) {var Home = __webpack_require__(9);
	var Menu = __webpack_require__(12);
	var Video = __webpack_require__(13);
	var Stats = __webpack_require__(14);
	var Lightbox = __webpack_require__(16);
	var isMobile = __webpack_require__(10);
	var Salvattore = __webpack_require__(17);

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

	    this.offsets = [];

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

	    if (isMobile) return this;
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

	    $(window).resize(this.initSections.bind(this));
	    $(window).scroll(this.scroll.bind(this));

	    return q.fcall(function(){

	      return [
	        that.initSections(),
	        that.initHome(),
	        that.initMenu()
	      ]
	    })
	    .all()
	    .delay(1000)
	    .then(function() {

	      that.$el.removeClass('loading');
	      return that;
	    })
	    .delay(200)
	    .then(function() {

	      that.$el.find('#loader').remove();
	      that.$el.addClass('ready');
	      return that.initStats();
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

	/* WEBPACK VAR INJECTION */(function(Backbone, _, $) {var isMobile = __webpack_require__(10);
	var isTrash = __webpack_require__(11);

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



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2), __webpack_require__(4)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(a){ return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))}(navigator.userAgent||navigator.vendor||window.opera);


/***/ },
/* 11 */
/***/ function(module, exports) {

	
	module.exports = function() {

	  return /MSIE 10/i.test(navigator.userAgent) ||
	    /MSIE 9/i.test(navigator.userAgent) ||
	    /rv:11.0/i.test(navigator.userAgent) ||
	    /Edge\/12./i.test(navigator.userAgent);

	}()


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone, _, $) {var isMobile = __webpack_require__(10);

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



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2), __webpack_require__(4)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone, _, $) {
	module.exports = Backbone.View.extend({

	  events: {
	    'click .close': 'close'
	  },

	  initialize: function(params) {

	    this.tpl = _.template($('#tpl-video-popup').html());
	    this.url = params.url;
	  },

	  render: function() {


	    this.$el.html(this.tpl({
	      url: this.url
	    }));

	    $('#videos').append(this.$el);

	    return this.show();
	  },

	  setUrl: function(url) {

	    this.url = url;
	    this.$el.find('iframe').attr('src', this.url);
	    return this.show();
	  },

	  show: function() {

	    this.$el.show(0).find('.veil').addClass('ready');
	  },

	  close: function() {

	    this.$el.find('.veil').removeClass('ready');
	    this.$el.find('iframe').attr('src','');
	    this.$el.hide(0);
	    $('body').removeClass('modal-open');
	  },

	  reset: function() {

	    //this.undelegateEvents();
	    this.remove();
	  }

	})



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2), __webpack_require__(4)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone, _, $) {var stats = __webpack_require__(15);

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



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2), __webpack_require__(4)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = {

	  seasons: {

	    2012: {

	      games: {

	        total: 35,
	        l1: 32,
	        coupe: 3,
	      },

	      actions: {

	        total: 11,
	        goals: 10,
	        passes: 1
	      }
	    },

	    2013: {

	      games: {

	        total: 41,
	        l1: 31,
	        c1: 6,
	        coupe: 4,
	      },

	      actions: {

	        total: 14,
	        goals: 10,
	        passes: 4
	      }
	    },

	    2014: {

	      games: {

	        total: 38,
	        l1: 36,
	        coupe: 2,
	      },

	      actions: {

	        total: 9,
	        goals: 5,
	        passes: 4
	      }
	    },

	    2015: {

	      games: {

	        total: 38,
	        l1: 16,
	        pl: 13,
	        coupe: 9,
	      },

	      actions: {

	        total: 8,
	        goals: 5,
	        passes: 3
	      }
	    },

	    2016: {

	      games: {

	        total: 21,
	        l1: 19,
	        coupe: 2,
	      },

	      actions: {

	        total: 9,
	        goals: 5,
	        passes: 4
	      }
	    },

	  }

	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone, _, $) {
	module.exports = Backbone.View.extend({

	  events: {
	    'click .close': 'close'
	  },

	  initialize: function(params) {

	    this.tpl = _.template($('#tpl-img-popup').html());
	    this.url = params.url;
	  },

	  render: function() {


	    this.$el.html(this.tpl({
	      url: this.url
	    }));

	    $('#news').append(this.$el);

	    return this.show();
	  },

	  setUrl: function(url) {

	    this.url = url;
	    this.$el.find('img').attr('src', this.url);
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

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Salvattore 1.0.9 by @rnmp and @ppold
	 * https://github.com/rnmp/salvattore
	 */
	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory();
	  } else {
	    root.salvattore = factory();
	  }
	}(this, function() {
	/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

	if (!window.matchMedia) {
	    window.matchMedia = function() {
	        "use strict";

	        // For browsers that support matchMedium api such as IE 9 and webkit
	        var styleMedia = (window.styleMedia || window.media);

	        // For those that don't support matchMedium
	        if (!styleMedia) {
	            var style       = document.createElement('style'),
	                script      = document.getElementsByTagName('script')[0],
	                info        = null;

	            style.type  = 'text/css';
	            style.id    = 'matchmediajs-test';

	            script.parentNode.insertBefore(style, script);

	            // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
	            info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

	            styleMedia = {
	                matchMedium: function(media) {
	                    var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

	                    // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
	                    if (style.styleSheet) {
	                        style.styleSheet.cssText = text;
	                    } else {
	                        style.textContent = text;
	                    }

	                    // Test if media query is true or false
	                    return info.width === '1px';
	                }
	            };
	        }

	        return function(media) {
	            return {
	                matches: styleMedia.matchMedium(media || 'all'),
	                media: media || 'all'
	            };
	        };
	    }();
	}

	/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
	(function(){
	    "use strict";

	    // Bail out for browsers that have addListener support
	    if (window.matchMedia && window.matchMedia('all').addListener) {
	        return false;
	    }

	    var localMatchMedia = window.matchMedia,
	        hasMediaQueries = localMatchMedia('only all').matches,
	        isListening     = false,
	        timeoutID       = 0,    // setTimeout for debouncing 'handleChange'
	        queries         = [],   // Contains each 'mql' and associated 'listeners' if 'addListener' is used
	        handleChange    = function(evt) {
	            // Debounce
	            clearTimeout(timeoutID);

	            timeoutID = setTimeout(function() {
	                for (var i = 0, il = queries.length; i < il; i++) {
	                    var mql         = queries[i].mql,
	                        listeners   = queries[i].listeners || [],
	                        matches     = localMatchMedia(mql.media).matches;

	                    // Update mql.matches value and call listeners
	                    // Fire listeners only if transitioning to or from matched state
	                    if (matches !== mql.matches) {
	                        mql.matches = matches;

	                        for (var j = 0, jl = listeners.length; j < jl; j++) {
	                            listeners[j].call(window, mql);
	                        }
	                    }
	                }
	            }, 30);
	        };

	    window.matchMedia = function(media) {
	        var mql         = localMatchMedia(media),
	            listeners   = [],
	            index       = 0;

	        mql.addListener = function(listener) {
	            // Changes would not occur to css media type so return now (Affects IE <= 8)
	            if (!hasMediaQueries) {
	                return;
	            }

	            // Set up 'resize' listener for browsers that support CSS3 media queries (Not for IE <= 8)
	            // There should only ever be 1 resize listener running for performance
	            if (!isListening) {
	                isListening = true;
	                window.addEventListener('resize', handleChange, true);
	            }

	            // Push object only if it has not been pushed already
	            if (index === 0) {
	                index = queries.push({
	                    mql         : mql,
	                    listeners   : listeners
	                });
	            }

	            listeners.push(listener);
	        };

	        mql.removeListener = function(listener) {
	            for (var i = 0, il = listeners.length; i < il; i++){
	                if (listeners[i] === listener){
	                    listeners.splice(i, 1);
	                }
	            }
	        };

	        return mql;
	    };
	}());

	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

	// MIT license

	(function() {
	    "use strict";

	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
	            window[vendors[x]+'CancelRequestAnimationFrame'];
	    }

	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };

	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());

	// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent

	if (typeof window.CustomEvent !== "function") {
	  (function() {
	    "use strict";
	    function CustomEvent(event, params) {
	      params = params || { bubbles: false, cancelable: false, detail: undefined };
	      var evt = document.createEvent('CustomEvent');
	      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	      return evt;
	     }

	    CustomEvent.prototype = window.Event.prototype;

	    window.CustomEvent = CustomEvent;
	  })();
	}

	/* jshint laxcomma: true */
	var salvattore = (function (global, document, undefined) {
	"use strict";

	var self = {},
	    grids = [],
	    mediaRules = [],
	    mediaQueries = [],
	    add_to_dataset = function(element, key, value) {
	      // uses dataset function or a fallback for <ie10
	      if (element.dataset) {
	        element.dataset[key] = value;
	      } else {
	        element.setAttribute("data-" + key, value);
	      }
	      return;
	    };

	self.obtainGridSettings = function obtainGridSettings(element) {
	  // returns the number of columns and the classes a column should have,
	  // from computing the style of the ::before pseudo-element of the grid.

	  var computedStyle = global.getComputedStyle(element, ":before")
	    , content = computedStyle.getPropertyValue("content").slice(1, -1)
	    , matchResult = content.match(/^\s*(\d+)(?:\s?\.(.+))?\s*$/)
	    , numberOfColumns = 1
	    , columnClasses = []
	  ;

	  if (matchResult) {
	    numberOfColumns = matchResult[1];
	    columnClasses = matchResult[2];
	    columnClasses = columnClasses? columnClasses.split(".") : ["column"];
	  } else {
	    matchResult = content.match(/^\s*\.(.+)\s+(\d+)\s*$/);
	    if (matchResult) {
	      columnClasses = matchResult[1];
	      numberOfColumns = matchResult[2];
	      if (numberOfColumns) {
	            numberOfColumns = numberOfColumns.split(".");
	      }
	    }
	  }

	  return {
	    numberOfColumns: numberOfColumns,
	    columnClasses: columnClasses
	  };
	};


	self.addColumns = function addColumns(grid, items) {
	  // from the settings obtained, it creates columns with
	  // the configured classes and adds to them a list of items.

	  var settings = self.obtainGridSettings(grid)
	    , numberOfColumns = settings.numberOfColumns
	    , columnClasses = settings.columnClasses
	    , columnsItems = new Array(+numberOfColumns)
	    , columnsFragment = document.createDocumentFragment()
	    , i = numberOfColumns
	    , selector
	  ;

	  while (i-- !== 0) {
	    selector = "[data-columns] > *:nth-child(" + numberOfColumns + "n-" + i + ")";
	    columnsItems.push(items.querySelectorAll(selector));
	  }

	  columnsItems.forEach(function append_to_grid_fragment(rows) {
	    var column = document.createElement("div")
	      , rowsFragment = document.createDocumentFragment()
	    ;

	    column.className = columnClasses.join(" ");

	    Array.prototype.forEach.call(rows, function append_to_column(row) {
	      rowsFragment.appendChild(row);
	    });
	    column.appendChild(rowsFragment);
	    columnsFragment.appendChild(column);
	  });

	  grid.appendChild(columnsFragment);
	  add_to_dataset(grid, 'columns', numberOfColumns);
	};


	self.removeColumns = function removeColumns(grid) {
	  // removes all the columns from a grid, and returns a list
	  // of items sorted by the ordering of columns.

	  var range = document.createRange();
	  range.selectNodeContents(grid);

	  var columns = Array.prototype.filter.call(range.extractContents().childNodes, function filter_elements(node) {
	    return node instanceof global.HTMLElement;
	  });

	  var numberOfColumns = columns.length
	    , numberOfRowsInFirstColumn = columns[0].childNodes.length
	    , sortedRows = new Array(numberOfRowsInFirstColumn * numberOfColumns)
	  ;

	  Array.prototype.forEach.call(columns, function iterate_columns(column, columnIndex) {
	    Array.prototype.forEach.call(column.children, function iterate_rows(row, rowIndex) {
	      sortedRows[rowIndex * numberOfColumns + columnIndex] = row;
	    });
	  });

	  var container = document.createElement("div");
	  add_to_dataset(container, 'columns', 0);

	  sortedRows.filter(function filter_non_null(child) {
	    return !!child;
	  }).forEach(function append_row(child) {
	    container.appendChild(child);
	  });

	  return container;
	};


	self.recreateColumns = function recreateColumns(grid) {
	  // removes all the columns from the grid, and adds them again,
	  // it is used when the number of columns change.

	  global.requestAnimationFrame(function render_after_css_mediaQueryChange() {
	    self.addColumns(grid, self.removeColumns(grid));
	    var columnsChange = new CustomEvent("columnsChange");
	    grid.dispatchEvent(columnsChange);
	  });
	};


	self.mediaQueryChange = function mediaQueryChange(mql) {
	  // recreates the columns when a media query matches the current state
	  // of the browser.

	  if (mql.matches) {
	    Array.prototype.forEach.call(grids, self.recreateColumns);
	  }
	};


	self.getCSSRules = function getCSSRules(stylesheet) {
	  // returns a list of css rules from a stylesheet

	  var cssRules;
	  try {
	    cssRules = stylesheet.sheet.cssRules || stylesheet.sheet.rules;
	  } catch (e) {
	    return [];
	  }

	  return cssRules || [];
	};


	self.getStylesheets = function getStylesheets() {
	  // returns a list of all the styles in the document (that are accessible).

	  var inlineStyleBlocks = Array.prototype.slice.call(document.querySelectorAll("style"));
	  inlineStyleBlocks.forEach(function(stylesheet, idx) {
	    if (stylesheet.type !== 'text/css' && stylesheet.type !== '') {
	      inlineStyleBlocks.splice(idx, 1);
	    }
	  });

	  return Array.prototype.concat.call(
	    inlineStyleBlocks,
	    Array.prototype.slice.call(document.querySelectorAll("link[rel='stylesheet']"))
	  );
	};


	self.mediaRuleHasColumnsSelector = function mediaRuleHasColumnsSelector(rules) {
	  // checks if a media query css rule has in its contents a selector that
	  // styles the grid.

	  var i, rule;

	  try {
	    i = rules.length;
	  }
	  catch (e) {
	    i = 0;
	  }

	  while (i--) {
	    rule = rules[i];
	    if (rule.selectorText && rule.selectorText.match(/\[data-columns\](.*)::?before$/)) {
	      return true;
	    }
	  }

	  return false;
	};


	self.scanMediaQueries = function scanMediaQueries() {
	  // scans all the stylesheets for selectors that style grids,
	  // if the matchMedia API is supported.

	  var newMediaRules = [];

	  if (!global.matchMedia) {
	    return;
	  }

	  self.getStylesheets().forEach(function extract_rules(stylesheet) {
	    Array.prototype.forEach.call(self.getCSSRules(stylesheet), function filter_by_column_selector(rule) {
	      // rule.media throws an 'not implemented error' in ie9 for import rules occasionally
	      try {
	        if (rule.media && rule.cssRules && self.mediaRuleHasColumnsSelector(rule.cssRules)) {
	          newMediaRules.push(rule);
	        }
	      } catch (e) {}
	    });
	  });

	  // remove matchMedia listeners from the old rules
	  var oldRules = mediaRules.filter(function (el) {
	      return newMediaRules.indexOf(el) === -1;
	  });
	  mediaQueries.filter(function (el) {
	    return oldRules.indexOf(el.rule) !== -1;
	  }).forEach(function (el) {
	      el.mql.removeListener(self.mediaQueryChange);
	  });
	  mediaQueries = mediaQueries.filter(function (el) {
	    return oldRules.indexOf(el.rule) === -1;
	  });

	  // add matchMedia listeners to the new rules
	  newMediaRules.filter(function (el) {
	    return mediaRules.indexOf(el) == -1;
	  }).forEach(function (rule) {
	      var mql = global.matchMedia(rule.media.mediaText);
	      mql.addListener(self.mediaQueryChange);
	      mediaQueries.push({rule: rule, mql:mql});
	  });

	  // swap mediaRules with the new set
	  mediaRules.length = 0;
	  mediaRules = newMediaRules;
	};


	self.rescanMediaQueries = function rescanMediaQueries() {
	    self.scanMediaQueries();
	    Array.prototype.forEach.call(grids, self.recreateColumns);
	};


	self.nextElementColumnIndex = function nextElementColumnIndex(grid, fragments) {
	  // returns the index of the column where the given element must be added.

	  var children = grid.children
	    , m = children.length
	    , lowestRowCount = 0
	    , child
	    , currentRowCount
	    , i
	    , index = 0
	  ;
	  for (i = 0; i < m; i++) {
	    child = children[i];
	    currentRowCount = child.children.length + (fragments[i].children || fragments[i].childNodes).length;
	  if(lowestRowCount === 0) {
	    lowestRowCount = currentRowCount;
	  }
	    if(currentRowCount < lowestRowCount) {
	      index = i;
	      lowestRowCount = currentRowCount;
	    }
	  }

	  return index;
	};


	self.createFragmentsList = function createFragmentsList(quantity) {
	  // returns a list of fragments

	  var fragments = new Array(quantity)
	    , i = 0
	  ;

	  while (i !== quantity) {
	    fragments[i] = document.createDocumentFragment();
	    i++;
	  }

	  return fragments;
	};


	self.appendElements = function appendElements(grid, elements) {
	  // adds a list of elements to the end of a grid

	  var columns = grid.children
	    , numberOfColumns = columns.length
	    , fragments = self.createFragmentsList(numberOfColumns)
	  ;

	  Array.prototype.forEach.call(elements, function append_to_next_fragment(element) {
	    var columnIndex = self.nextElementColumnIndex(grid, fragments);
	    fragments[columnIndex].appendChild(element);
	  });

	  Array.prototype.forEach.call(columns, function insert_column(column, index) {
	    column.appendChild(fragments[index]);
	  });
	};


	self.prependElements = function prependElements(grid, elements) {
	  // adds a list of elements to the start of a grid

	  var columns = grid.children
	    , numberOfColumns = columns.length
	    , fragments = self.createFragmentsList(numberOfColumns)
	    , columnIndex = numberOfColumns - 1
	  ;

	  elements.forEach(function append_to_next_fragment(element) {
	    var fragment = fragments[columnIndex];
	    fragment.insertBefore(element, fragment.firstChild);
	    if (columnIndex === 0) {
	      columnIndex = numberOfColumns - 1;
	    } else {
	      columnIndex--;
	    }
	  });

	  Array.prototype.forEach.call(columns, function insert_column(column, index) {
	    column.insertBefore(fragments[index], column.firstChild);
	  });

	  // populates a fragment with n columns till the right
	  var fragment = document.createDocumentFragment()
	    , numberOfColumnsToExtract = elements.length % numberOfColumns
	  ;

	  while (numberOfColumnsToExtract-- !== 0) {
	    fragment.appendChild(grid.lastChild);
	  }

	  // adds the fragment to the left
	  grid.insertBefore(fragment, grid.firstChild);
	};


	self.registerGrid = function registerGrid (grid) {
	  if (global.getComputedStyle(grid).display === "none") {
	    return;
	  }

	  // retrieve the list of items from the grid itself
	  var range = document.createRange();
	  range.selectNodeContents(grid);

	  var items = document.createElement("div");
	  items.appendChild(range.extractContents());


	  add_to_dataset(items, 'columns', 0);
	  self.addColumns(grid, items);
	  grids.push(grid);
	};


	self.init = function init() {
	  // adds required CSS rule to hide 'content' based
	  // configuration.

	  var css = document.createElement("style");
	  css.innerHTML = "[data-columns]::before{display:block;visibility:hidden;position:absolute;font-size:1px;}";
	  document.head.appendChild(css);

	  // scans all the grids in the document and generates
	  // columns from their configuration.

	  var gridElements = document.querySelectorAll("[data-columns]");
	  Array.prototype.forEach.call(gridElements, self.registerGrid);
	  self.scanMediaQueries();
	};

	self.init();

	return {
	  appendElements: self.appendElements,
	  prependElements: self.prependElements,
	  registerGrid: self.registerGrid,
	  recreateColumns: self.recreateColumns,
	  rescanMediaQueries: self.rescanMediaQueries,
	  init: self.init,

	  // maintains backwards compatibility with underscore style method names
	  append_elements: self.appendElements,
	  prepend_elements: self.prependElements,
	  register_grid: self.registerGrid,
	  recreate_columns: self.recreateColumns,
	  rescan_media_queries: self.rescanMediaQueries
	};

	})(window, window.document);

	return salvattore;
	}));


/***/ }
]);