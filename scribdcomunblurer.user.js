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

function get_link_from_json(json_url) {
  /*--- Get the json file file which contains the link to the image, then parse
        it with a regexp to get the link. Not really guaranteed to work on each
        scribd file...
  */
  foo = $.getJSON(json_url);
  var img_regexp = /orig\=\\\"(.*?)\\\"/g;
  var match = img_regexp.exec(foo.responseText);
  if (match) {
    return match[1];
  }
  else {
    return "";
  }
}

function ButtonClickAction (zEvent) {
  //--- Get the images the ugly way: by parsing the source of the scripts.
  a = document.getElementsByClassName("outer_page_container")[0];
  b = a.getElementsByClassName("script");

  img_assets = [];
  for(var i=0; i<b.length;i++){
    asset = get_asset(b[i]);
    if (asset != ""){
      img_assets.push(asset);
    }
  }

  img_links = [];
  for(var i=0; i<img_assets.length; i++){
    link = get_link_from_json(img_assets[i]);
    if (link != ""){
      img_links.push(link);
    }
  }

  //--- Get a pdf from all the img links
}
