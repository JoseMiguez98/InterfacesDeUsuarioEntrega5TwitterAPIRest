"use strict";

$(document).ready(function(){

  $.ajax({
    url: "home.html",
    context: document.body
  }).done(function(data) {
    $('#contentBody').html(data);

    $('#showGame').on('click',function(){
      $.ajax({
        url: "game.html",
        context: document.body
      }).done(function(data) {
        $('#contentBody').html(data);

        $('#closeIcon').on('click',function(){

          $.ajax({
            url: "home.html",
            context: document.body
          }).done(function(data) {
            $('#contentBody').html(data);
          });
        });
      });
    });
  });

  $( document ).ajaxComplete(function() {
    $('#showGame').on('click',function(){
      $.ajax({
        url: "game.html",
        context: document.body
      }).done(function(data) {
        $('#contentBody').html(data);
      });
    });

    $('#closeIcon').on('click',function(){
      $.ajax({
        url: "home.html",
        context: document.body
      }).done(function(data) {
        $('#contentBody').html(data);
      });
    });

    $('a').on('click', function(e) {
      e.preventDefault();
    });

  });
});
