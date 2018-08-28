(function(){
  'use strict';

  /*** START UP ***/
  $(document).ready(function(){
      // UA detector
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
    // Query Generate
    var shareFB = 'http://www.facebook.com/share.php?u=' + location.href;
    var shareTwitter = 'http://twitter.com/share?url=' + location.href + '&text=' + $('#title>h1').text();
    $('a.twitter').attr('href', shareTwitter);
    $('a.facebook').attr('href', shareFB);
  });

  /*** Window Resize ***/
  $(window).on('resize', function(){
    currentCheck();
  });

  /*** Page Transition ***/
  $(document).on('click','a[href^=#]',function(){
    // Actions
    $('a').removeClass('active');
    $(this).addClass('active');
    $('#page_pr, #page_aboutus, #page_recruit, #page_contact').css('display','none');
    $(this.hash).css('display','block');
    currentCheck();
    // Smooth Jump
    var offsetY = -60;
    var time = 500;
    var target = $(this.hash);
    if (!target.length) return ;
    var targetY = target.offset().top + offsetY;
    $('html,body').animate({scrollTop: targetY}, time, 'swing');
    window.history.pushState(null, null, this.hash);
    return false;
  });

  /*** Scroll Action ***/
  $(window).scroll(function(){
    currentCheck();
  });

  /*** Hover for iOS device ***/
  $('*').on('touchstart',function(){
    $(this).addClass("hover");
  }).on('touchend',function(){
    $(this).removeClass("hover");
  });

})();


function currentCheck() {
  /*
  var scrollY = $(window).scrollTop();
  if(scrollY >= window.innerHeight/2){
    $('#menu, #main').addClass('fixed');

  } else {
    $('#menu, #main').removeClass('fixed');
  }
  */
}
