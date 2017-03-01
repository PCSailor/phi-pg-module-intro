$(document).ready(function(){
  console.log('jquery was correctly sourced!');
  getBookData();
  function getBookData() {
    $.ajax({
      type: 'GET',  // NOTE: Relates to SELECT in SQL
      url: '/books',
      success: function(response) {
        console.log('response', response);
        $('#bookShelf').empty();
        for (var i = 0; i < response.length; i++) {
          $('#bookShelf').append('<li>Title: ' + response[i].title + ', Author: ' + response[i].author + '</li>');
        }
      }
    });
  }

  $('#newBookButton').on('click', function(){
    var newBookObject = {};
    newBookObject.title = $('#newBookTitle').val();
    newBookObject.author = $('#newBookAuthor').val();
    $.ajax({
      type: 'POST',  // NOTE: Relates to INSERT in SQL
      url: '/books/new',
      data: newBookObject,
      success: function(response){
        console.log(response);
        getBookData();
      }
    });
  });
});
