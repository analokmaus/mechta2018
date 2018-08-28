(function(){
  'use strict';

  /*** START UP ***/
  $(document).ready(function(){
      // $('#jswarning').css('display','none');
      var _ua = (function(u){
        return {
          Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
          || u.indexOf("ipad") != -1
          || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
          || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
          || u.indexOf("kindle") != -1
          || u.indexOf("silk") != -1
          || u.indexOf("playbook") != -1,
          Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
          || u.indexOf("iphone") != -1
          || u.indexOf("ipod") != -1
          || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
          || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
          || u.indexOf("blackberry") != -1
        }
      })(window.navigator.userAgent.toLowerCase());
  });

  $(window).on('load', function() {
    currentCheck();
    $('#larm, #rarm').addClass('active');
    setTimeout(function(){
    },1000);
  });

  /*** Window Resize ***/
  $(window).on('resize', function(){
    currentCheck();
  });

  /*** Scroll Action ***/
  $(window).scroll(function(){
    currentCheck();
  });

  /*** Smooth Scrolling ***/
  $('a[href^="#"]').click(function(){
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });

  /*** Hover for iOS device ***/
  $('*').on('touchstart',function(){
    $(this).addClass("hover");
  }).on('touchend',function(){
    $(this).removeClass("hover");
  });

})();

function moveTo(){
    //var time = 1200;
    var target = $(location.hash);
    if (!target.length)return;
    var targetY = target.offset().top;
    //$('html,body').animate({scrollTop: targetY}, time, 'swing');
    window.scrollTo(0, targetY);
    window.history.pushState(null, null, this.hash);
    return false;
}

function currentCheck() {
  var scrollY = $(window).scrollTop();
  //if(scrollY >= $('.panel.top').offset().top - $('#menu').height()){
  if(scrollY >= window.innerHeight/2){
    $('#menu, #main').addClass('fixed');

  } else {
    $('#menu, #main').removeClass('fixed');
  }
  //console.log(($('.panel.top').offset().top - $('#menu').height()) + '?' + scrollY);
}
