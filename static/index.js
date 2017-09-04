var Carousel = function(wrapper, num_states, delay) {

  var state = 0;
  var timeout = null;

  var update_state = function() {

    var prev = (state-1+num_states) % num_states;
    var cur = state % num_states;
    var next = (state+1) % num_states;

    var prev_pane = wrapper.find('.pane-' + prev);
    var cur_pane = wrapper.find('.pane-' + cur);
    var next_pane = wrapper.find('.pane-' + next);

    state = (state + 1) % num_states;

    prev_pane.removeClass('perform');
    prev_pane.addClass('exit');

    cur_pane.removeClass('init');
    cur_pane.addClass('perform');

    next_pane.removeClass('exit');
    next_pane.addClass('init');

  };

  var rotate = function() {
    update_state();
    timeout = setTimeout(rotate, delay)
  };

  this.start = rotate;
}

function submit_form() {
  let body = {
    email: $('#email').val(),
    fname: $('#fname').val(),
    lname: $('#lname').val(),
    org: $('#org').val(),
    role: $('#role').val(),
    campaign: $('#campaign').val(),
    needs: $('#needs').val()
  };
  $.ajax({
    'url': 'https://aventamedia.com/mail',
    'data': body,
    'dataType': 'json',
    'method': 'POST',
    'error': function(){console.log('error');},
    'success': function(){console.log('success');}
  });
  console.log(body);
}

$(document).ready(function(){
  var num_states = 3;
  var duration = 5000;
  var carousel = new Carousel($('#carousel'), num_states, duration);
  carousel.start();

  $('.button').on('mouseout', function(e){
    $(e.target).removeClass('clicked');
  });
  $('.button').on('mouseup', function(e){
    $(e.target).removeClass('clicked');
  });
  $('.button').on('mousedown', function(e){
    $(e.target).addClass('clicked');
  });

  $('.button').on('click', function(e){
    $(document.body).addClass('noscroll');
    $('.form-pane-form').addClass('active');
    $('.thanks').removeClass('active');
    $('.overlayer').addClass('active');
  })

  $('.form-pane-close').on('click', function(e) {
    $(document.body).removeClass('noscroll');
    $('.overlayer').removeClass('active');
  });

  $('.form-pane-button').on('click', function(e) {
    $('.form-pane-form').removeClass('active');
    $('.thanks').addClass('active');
    submit_form();
  });
});     

