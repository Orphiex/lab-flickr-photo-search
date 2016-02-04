// YOUR CODE HERE
$(document).ready(function(){

  var $displayDestination = $('div#images');
  var tagsRequest;
  var tagsMode;

  var bindSearchButton = function(){
    $('#search').on('click', function (e) {
      e.preventDefault();
      tagsRequest = $('input.form-control').val();
      tagsMode = $('.filter-option').text();
      getPictures(tagsRequest, tagsMode);
    });
  };

  var getPictures = function(tags, mode){
    $.ajax({
      url: "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
      method: 'GET',
      data: {
        format: 'json',
        tags: tags,
        tagmode: mode
      },
      dataType: 'jsonp',
      success: function(response, status) {
        $displayDestination.empty();
        var images = response.items;
        images.forEach(function(elem, index){
          console.log(elem);
          console.log(index);
          displayPictures(elem, index);
        });
      },
      error: function(response, status) {
        console.log(response);
        console.log(status);
      }
    });
  };

  function displayPictures(elem, index){
    var $newPicture = ('<div><img src="'+elem.media.m+'"></div>');
    $displayDestination.append($newPicture);
  }

  var init = function(){
    bindSearchButton();
  };

  init();

});
