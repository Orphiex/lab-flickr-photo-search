// YOUR CODE HERE
$(document).ready(function(){

  var $images = $('div#images');
  var results;
  var tagsRequest;
  var tagsMode;

  var bindSearchButton = function(){
    $('#search').on('click', function (e) {
      e.preventDefault();
      triggerGetPictures();
    });
  };

  var bindInputField = function(){
    $('input.form-control').on('submit', function (e) {
      e.preventDefault();
      triggerGetPictures();
    });
  };

  var triggerGetPictures = function(){
    tagsRequest = $('input.form-control').val();
    tagsMode = $('.filter-option').text();
    getPictures(tagsRequest, tagsMode);
  }

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
        $images.empty();
        results = response.items;
        results.forEach(function(elem, index){
          displayPictures(elem, index);
          bindPictures();
        });
      },
      error: function(response, status) {
        console.log(response);
        console.log(status);
      }
    });
  };


  function displayPictures(elem, index){
    var $newPicture = ('<div class="col-xs-3" data-id="'+index+'"data-author="'+elem.author+'" data-title="'+elem.title+'" data-date="'+elem.date_taken+'" data-tags="'+elem.tags+'"><img class="thumbnail" src="'+elem.media.m+'"></div>');
    var createRow = '<div class="row"></div>';
    if (index % 4 === 0) {
      $images.append(createRow);
    }
    $('#images > .row:last').append($newPicture);
  }

  function bindPictures(){
    $(".thumbnail").off().on("click", function(){
      var author=$(this).parent().data("author");
      var title=$(this).parent().data("title");
      var dateTaken=$(this).parent().data("date");
      var tags=$(this).parent().data("tags");
      var picture=$(this).context.currentSrc;
      fillModal(author, title, dateTaken, tags, picture);
      $("#info-modal").modal("show");
    });
    $(".close").on("click", function(){
      $(".modal-body").empty();
    });
  }

  function fillModal(author, title, dateTaken, tags, picture){
    var leftCol = "<div class=\"col-xs-6 pull-left\"><img src=\""+picture+"\"</div>"
    var rightCol = "<div class=\"col-xs-6 pull-right\"><strong>Title: </strong>"+title+"<br><strong>Author: </strong>"+author+"<br><strong>Date Taken: </strong>"+dateTaken+"<br><strong>Tags: </strong>"+tags+"</div>"
    $(".modal-body").append(leftCol).append(rightCol);
  }

  var init = function(){
    bindSearchButton();
  };

  init();

});
