
$(function() {
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
          appendUserToSearchList(user);
        });
      }
      else {
        appendNoUserToSearchList("一致するユーザーはありません");
      } 
    })
  });
});