$(function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img src= ${ message.image }>` : "";
    var html = 
      `<div class="message">
        <div class="upper-message">
          <p class="upper-message__username">
            ${message.user_name}
          </p>
          <p class="upper-message__date">
            ${message.date}
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
}); 