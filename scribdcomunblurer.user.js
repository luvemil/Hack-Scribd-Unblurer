// ==UserScript==
// @id             Scribd.com Unblurer
// @name           Scribd.com Unblurer
// @namespace      com.scribd.unblurer
// @version        1.0
// @author         Alan Tai
// @description    Unblur Scribd.com document pages
// @include        http://www.scribd.com/doc/*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @homepageURL    https://github.com/ayltai/Hack-Scribd-Unblurer
// @iconURL        http://www.scribd.com/favicon.ico
// @supportURL     https://github.com/ayltai/Hack-Scribd-Unblurer
// @updateURL      https://github.com/ayltai/Hack-Scribd-Unblurer/blob/master/scribdcomunblurer.meta.js
// @downloadURL    https://github.com/ayltai/Hack-Scribd-Unblurer/blob/master/scribdcomunblurer.user.js
// ==/UserScript==
setInterval(function() {
    $('.page-blur-promo-overlay').remove();
    $('.page_missing_explanation_inner').remove();
    $('.autogen_class_views_read2_page_blur_promo').remove();
    $('.outer_page only_ie6_border blurred_page').remove();
    $('.page-blur-promo').removeClass('page-blur-promo');
    $('.absimg').css('opacity', '1.0');
    $('.text_layer').css('color', '#000');
    $('.text_layer').css('text-shadow', '0px 0px 0px #000');
}, 1000);
//--- Create a button. It will be displayed by Scribd's CSS
var zNode = document.createElement('a');
zNode.className = "flat_btn primary_action_btn download_btn";
zNode.innerHTML = "JS fu";
zNode.setAttribute('id', 'my_shiny_new_button');
document.getElementsByClassName('toolbar_left_actions')[0].appendChild(zNode);
//--- Activate button
document.getElementById('my_shiny_new_button').addEventListener (
  "click", ButtonClickAction, false
);

function get_asset(inner_html) {
  /*--- Here we use some regex to extract the url of the the asset
        which will give us our image link.
  */
  var url_regexp = /pageParams.contentUrl \= \"(.*)\"/g;
  var match = url_regexp.exec(inner_html);
  if (match) {
    return match[1];
  }
  else {
    return "";
  }
}

function get_link_from_json(json_url, db) {
  /*--- Get the json file file which contains the link to the image, then parse
        it with a regexp to get the link. Not really guaranteed to work on each
        scribd file...
  */
  return $.ajax({
    url:  json_url,
    dataType: "text",
    success:  function(data){
      var img_regexp = /orig\=\\\"(.*\/images\/(\d+)\-.*?)\\\"/g;
      var match = img_regexp.exec(data);
      if (match && match[2] && !db[match[2].toString()]) {
        db[match[2].toString()] =  match[1];
      }
    }
  });
}

function ButtonClickAction (zEvent) {
  /*--- Get the images the ugly way: by parsing the source of the scripts.
        This method might miss the initial pages, needs to be fixed.
  */
  a = document.getElementsByClassName("outer_page_container")[0];
  b = a.getElementsByTagName("script");

  img_assets = [];
  for(var i=0; i<b.length;i++){
    asset = get_asset(b[i].innerHTML);
    if (asset != ""){
      img_assets.push(asset);
    }
  }

  //--- Get the images already in the page
  var img_links = {};

  var downloads = [];
  for(var i=0; i<img_assets.length; i++){
    /*--- This loop actually uses an ajax call so everything should be changed
          to work asynchronously.
    */
    downloads.push(get_link_from_json(img_assets[i], img_links));
  }

  images = a.getElementsByClassName("absimg");
  for (var i=0; i<images.length; i++){
    x = images[i];
    var img_url_regexp = /(.*\/images\/(\d+)\-.*?)/g;
    var match = img_url_regexp.exec(x.getAttribute("orig"));
    if (match && match[2]){
      img_links[match[2].toString()] = match[1];
    }
  }

  $.when.apply($, downloads).done(function (){
    //--- Get a pdf from all the img links
    console.log(img_links);
  });
}
