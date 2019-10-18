(function(root, factory) {

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = factory(root, exports);
    }
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      root.Instagram = factory(root, exports);
    });
  } else {
    root.Instagram = factory(root, {});
  }

}(this, function(root, Instagram) {
  'use strict';

  Instagram.getFromProfile = function($username,$callback){
    if (typeof $callback==="undefined") $callback = function(){};

    $username = $username.replace('@','');

    $.ajax({
      method: "GET",
      url: `https://www.instagram.com/${encodeURIComponent($username)}/`
    })
    .done(function(dados) {
      const regex = /"shortcode":"([A-Za-z0-9-_]+)"/mg;
      const str = dados;
      let m;
      var res = [];

      while ((m = regex.exec(str)) !== null) {
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }

          m[1] && res.push(m[1]);
      }
      $callback(res);
    });
  }

  Instagram.getPhotoFromProfile = function($username,$callback){
    if (typeof $callback==="undefined") $callback = function(){};

    $username = $username.replace('@','');

    $.ajax({
      method: "GET",
      url: `https://www.instagram.com/${encodeURIComponent($username)}/`
    })
    .done(function(dados) {
      const regex = /GraphImage.*?"shortcode":"([A-Za-z0-9-_]+)"/mg;
      const str = dados;
      let m;
      var res = [];

      while ((m = regex.exec(str)) !== null) {
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }

          m[1] && res.push(m[1]);
      }
      $callback(res);
    });
  }

  Instagram.getFromHashtag = function($hashtag,$callback){
    if (typeof $callback==="undefined") $callback = function(){};

    $hashtag = $hashtag.replace('#','');

    $.ajax({
      method: "GET",
      url: `https://www.instagram.com/explore/tags/${encodeURIComponent($hashtag)}/`
    })
    .done(function(dados) {
      const regex = /"shortcode":"([A-Za-z0-9-_]+)"/mg;
      const str = dados;
      let m;
      var res = [];

      while ((m = regex.exec(str)) !== null) {
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }

          m[1] && res.push(m[1]);
      }
      $callback(res);
    });
  }

  Instagram.getPhotoFromHashtag = function($hashtag,$callback){
    if (typeof $callback==="undefined") $callback = function(){};

    $hashtag = $hashtag.replace('#','');

    $.ajax({
      method: "GET",
      url: `https://www.instagram.com/explore/tags/${encodeURIComponent($hashtag)}/`
    })
    .done(function(dados) {
      const regex = /GraphImage.*?"shortcode":"([A-Za-z0-9-_]+)"/mg;
      const str = dados;
      let m;
      var res = [];

      while ((m = regex.exec(str)) !== null) {
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }

          m[1] && res.push(m[1]);
      }
      $callback(res);
    });
  }
  Instagram.getPicture = function($id,$callback){
    if (typeof $callback==="undefined") $callback = function(){};

    $.ajax({
      method: "GET",
      url: `https://www.instagram.com/p/${encodeURIComponent($id)}/embed/`
    })
    .done(function(dados) {
      const regex = /img class="EmbeddedMediaImage" src="(.+?)"/m;
      const str = dados;
      let m;
      var res = [];

      res = regex.exec(str);
      res[1] && $callback(res[1]);
    });
  }

  return Instagram;

}));
