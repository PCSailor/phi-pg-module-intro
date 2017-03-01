$(document).ready(function(){
  console.log('jquery was correctly sourced!');
  getBookData();
  function getBookData() {  // NOTE: called from below on DB response success, runs Ajax.get going to app.js.
    $.ajax({
      type: 'GET',  // NOTE: Relates to SELECT in SQL
      url: '/books',  // NOTE: requests /books & looks in app.js.
      success: function(response) { // NOTE: success function called on response from books.js/router.get/res.send(result.rows)
        console.log('response', response);
        $('#bookShelf').empty();  // NOTE: clears the entire <div>
        for (var i = 0; i < response.length; i++) {  // NOTE: Puts the entire object back in the <div>
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
      success: function(response){ // NOTE: After button is clicked & response comes back from book.js/router.post/res.sendStatus(201), then calls function
        console.log(response);
        getBookData(); // NOTE: on DB response success, function getBookData is called running Ajax.get going to app.js.
      }
    });
  });
});
