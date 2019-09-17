$(function() {

  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html =   
      `<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${user.name}</p>
          <div class="user-search-add chat-group-user__btn chat-group-user__btn--add"data-user-id=${user.id} data-user-name=${user.name}>追加</div>
       </div>`
     search_list.append(html);
  }     
  function appendNoUser(user) {
    var html = 
      `<div class="chat-group-user clearfix">${user}</div>`
     search_list.append(html);
  }
  
  var members = $(".chat-group-users")
  
  function addUser(id, name) {
    var html = 
      `<div class="chat-group-user clearfix " id="chat-group-user-${id}">
        <input name='group[user_ids][]' type=hidden value=${id}>
          <p class="chat-group-user__name">${name}</p>
          <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
       </div>`
    members.append(html);
  }



  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })  

    .done(function(user) {
      $("#user-search-result").empty();
      if (user.length !== 0) {
        user.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはありません");
      } 
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    })  
  });
  $(document).on("click", ".user-search-add", function() {
    var userId = $(this).data("user-id")
    var userName = $(this).data("user-name")
    $(this).parent().remove()
    addUser(userId, userName)
  
  });
  $(document).on("click", ".user-search-remove", function() {
    $(this).parent().remove();
  });
});
