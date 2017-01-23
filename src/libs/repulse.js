(function( $ ){

  var $window = $(window);

  var mousePos = { x: -1, y: -1 };
  var windowHeight = $window.height();
  var windowWidth = $window.width();

  $window.resize(function(){

    windowHeight = $window.height();
    windowWidth = $window.width();
  });

  $.fn.repulse = function (params) {

    // Default settings
    var settings = $.extend({
      offset: 2,
      container: window,
      fps: 50,
    }, params );

    // Global variables
    var $this = $(this);

    var update = _.throttle(function() {

      $this.each(function(){

        var transX = mousePos.x * (settings.offset / 100);
        var transY = mousePos.y * (settings.offset / 100);

        $(this).css({
          'transform': 'translate3d('+transX+'px,'+transY+'px, 0px)',
          '-webkit-transform': 'translate3d('+transX+'px,'+transY+'px, 0px)'
        });
      });

    }, 1000/settings.fps);

    $(settings.container).mousemove(function(e) {

      mousePos.x = (e.pageX || e.clientX) - (windowWidth/2);
      mousePos.y = (e.pageY || e.clientY) - (windowHeight/2);
      return update();
    });
  };

})(jQuery);
