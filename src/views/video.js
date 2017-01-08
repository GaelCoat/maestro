
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


