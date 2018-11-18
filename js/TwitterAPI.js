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
      "url": "https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=vertical%20scrolling%20game",
      "method": "GET",
      "headers": {
        "Authorization": "OAuth oauth_consumer_key=\"xAq7qnie960MgJuKnv7U9g0jC\",oauth_token=\"1060767256634888192-CpwNVNWKmn5AJRe5zQn3FpyU4TGuyi\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1542515460\",oauth_nonce=\"f5o7xCiTzS4\",oauth_version=\"1.0\",oauth_signature=\"aPZEDrBleM9OCqnzpwE0cr1wxjo%3D\"",
        "cache-control": "no-cache",
        "Postman-Token": "b47e251b-e163-4bda-9706-92e7927a47b2"
      },
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
          "url": "https://cors-anywhere.herokuapp.com/https://publish.twitter.com/oembed?url=https://twitter.com/"+tweet.user+"/status/"+tweet.id+"&omit_script=true",
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
