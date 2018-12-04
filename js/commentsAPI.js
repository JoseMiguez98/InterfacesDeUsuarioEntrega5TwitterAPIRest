//Comments and username API : https://jsonplaceholder.typicode.com/comments
//Photos API : http://www.splashbase.co/api/v1/images/latest?images_only=true

"use strict";

$(document).ready(function() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://jsonplaceholder.typicode.com/comments",
    "method": "GET",
    "headers": {
      "cache-control": "no-cache",
      "Postman-Token": "49da9ac3-2650-46fa-ac6c-558895c14613"
    }
  }

  $.ajax(settings).done(function (response) {
    for (let i = 0; i < 9; i++) {
      $(".commentsList").append("<div class='col-sm-12 commentBox'><div class='panel panel-white post panel-shadow'><div class='post-heading'><div class='pull-left image'><img src='http://bootdey.com/img/Content/user_1.jpg' class='img-circle avatar' alt='user profile image'></div><div class='pull-left meta'><div class='title h5'><a href='#'><b>"+response[i].email+"</b></a></div></div></div><div class='post-description'><p>"+response[i].body+"</p></div></div></div>");
    }
  });
});
