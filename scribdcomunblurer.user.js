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
zNode.setAttribute('id', 'my_new_shiny_button');
document.getElementsByClassName('toolbar_left_actions')[0].appendChild(zNode);
//--- Activate button
document.getElementById('my_new_shiny_button').addEventListener (
  "click", ButtonClickAction, false
);
function ButtonClickAction (zEvent) {
    //--- Get the images the ugly way.
    a = document.getElementsByClassName("outer_page_container")[0];
    b = a.getElementsByClassName("script");
    function get_asset(inner_html) {
      /*--- Here we will use some regex to extract the url of the the asset
            which will give us our image link.
      */
      ;
    }
    img_assets = [];
    for(var i=0; i<b.length;i++){
      asset = get_asset(b[i]);
      if (asset != ""){
        img_assets.push("asset");
      }
    }

    //--- Get a pdf from all the img links
}
