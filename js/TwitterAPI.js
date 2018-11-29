"use strict";

//Los requests AJAX usan un proxy para solucionar el problema Cross-Domain.

//Primero se obtienen los tweets de la API REST, y luego se obtienen los datos necesarios
//para consultar otra api de twitter la cual me retorna el codigo embebido de cada tweet
//para insertarlo en el DOM.

//Por ultimo ejecuto una función de la API Javascript de Twitter para renderizarlos y darles el
//estilo original de twitter.

$(document).ready(function(){

  let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.twitter.com/1.1/search/tweets.json?q=games",
    "method": "GET",
    "headers": {
      "Authorization": "OAuth oauth_consumer_key=\"QvTWMzUCLQw4JVHt2A60norP5\",oauth_token=\"1060767256634888192-V1R3K41C3zuwFfSbIzw6qu5tuJuY1y\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1543463621\",oauth_nonce=\"8qKfBqwiMwz\",oauth_version=\"1.0\",oauth_signature=\"53pyPQDTg0Y1DzDoZwNDeH1VtBk%3D\"",
      "cache-control": "no-cache",
      "Postman-Token": "33075e11-ffc3-4734-85f4-3755d517dbcc"
    }
  }


  $.ajax(settings).done(function (response) {
    let tweets = [];
    response.statuses.forEach(function(status){

      tweets.push({
        "id" : status.id_str,
        "user" : status.user.screen_name
      });

    });

    tweets.forEach(function(tweet){
      $.ajax({
        "url": "https://publish.twitter.com/oembed?url=https://twitter.com/"+tweet.user+"/status/"+tweet.id+"&omit_script=true",
        success: function(result){
          $("#tweetsBox").append(result.html);
        }
      });
    });
  });


  $( document ).ajaxComplete(function() {
    console.log("ajaxComplete");
    twttr.ready(
      function(twttr){
        twttr.widgets.load();
      }
    );

    $('blockquote').attr('data-theme', 'light');
    $('blockquote').attr('data-cards', 'hidden');
    $('blockquote').attr('data-conversation', 'none');
  });

});
