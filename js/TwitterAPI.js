"use strict";

//Los requests AJAX usan un proxy para solucionar el problema Cross-Domain.

//Primero se obtienen los tweets de la API REST, y luego se obtienen los datos necesarios
//para consultar otra api de twitter la cual me retorna el codigo embebido de cada tweet
//para insertarlo en el DOM.

//Por ultimo ejecuto una función de la API Javascript de Twitter para renderizarlos y darles el
//estilo original de twitter.

$(document).ready(function(){


  $('.loader').bind('ajaxStart',function(){
    $(this).show();
  });

  let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=games",
    "method": "GET",
    "headers": {
      "Authorization": "OAuth oauth_consumer_key=\"nCsoSzp2BoAcBAcybDLNjn72U\",oauth_token=\"1060767256634888192-tbfcVpGrUrYFFmyq4hWLfK9jza6T2O\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1543596342\",oauth_nonce=\"3UNan2FTWVK\",oauth_version=\"1.0\",oauth_signature=\"TLxyQJFsWDcrzQISKuCezHo5mQ0%3D\"",
      "cache-control": "no-cache",
      "Postman-Token": "76541884-b6a0-4c6a-b253-71d569f79100"
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
        "url": "https://cors-anywhere.herokuapp.com/https://publish.twitter.com/oembed?url=https://twitter.com/"+tweet.user+"/status/"+tweet.id+"&omit_script=true",
        success: function(result){
          $("#tweetsBox").append(result.html);
        }
      });
    });
  });


  $( document ).ajaxComplete(function() {
    $('.loader').hide();
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
