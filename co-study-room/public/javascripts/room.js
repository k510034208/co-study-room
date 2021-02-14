var socket = io();

socket.emit('join room', roomid);
/*
        socket.on('chat message', (msgObj) => {
      var $message_wrap = $('<div class="message_wrap">');
      var $message_box = $('<div class="message_box">');
      var $message_author = $('<div class="message_author">').text(msgObj.user_name);
      var $message_msg = $('<div class="message_msg">').text(msgObj.message);
      var $message_time = $('<div class="message_time">').text(msgObj.created_at);
      if (msgObj.user_id == user_id) {
        $message_wrap.addClass('message_mine');
      } else {
        $message_box.append($message_author)
      }
      $message_box.append($message_msg)
      $message_box.append($message_time)
      $message_wrap.append($message_box);
      $message_wrap.appendTo('#messages');

      formatTime();
      $(window).scrollTop(window.outerHeight + 1000);
    });

    $('form').submit(function(e){
      e.preventDefault();
      socket.emit('chat message', {
        room_id: room_id,
        message: $('#message').val()
      });
      $('#message').val('');
      return false;
    });

    function formatTime () {

      $('.message_time').html(function(index, time) {
        if ($(this).hasClass('formatted')) return time;
        $(this).addClass('formatted');
        return moment(parseInt(time)).format('M/D h:mm');
      });
    }
    formatTime();

  },
});
*/