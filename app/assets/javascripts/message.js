$(function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img src= ${ message.image }>` : "";
    var html = 
      `<div class="message" data-message-id="${message.id}">
        <div class="upper-message">
          <p class="upper-message__username">
            ${message.user_name}
          </p>
          <p class="upper-message__date">
            ${message.created_at}
          </p>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${content}
          </p>
            ${image}
          </div>
       </div>`
      return html;
  } 
  // メッセージ送信の非同期化
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })  
    .done(function(data){
      var html =  buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight },"fasts");
      $("form")[0].reset();
      $('.submit__btn').prop('disabled',false);
    }).fail(function(data){
      window.alert('メッセージを入力してください')
    })
  })
  // 自動更新
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $(".message").last().data('message-id');
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildHTML(message)
            $('.messages').append(insertHTML);
            $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight })
          })
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        })
      }
      else {
        clearInterval(reloadMessages);
      }
     }
    setInterval(reloadMessages, 10000);
}); 