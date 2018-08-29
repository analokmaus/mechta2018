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
    $('#loader').remove();
    currentCheck();
    $('#larm, #rarm').addClass('active');
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
  $('a.jump').click(function(){
    currentCheck();
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
  // var marginY = $(document).height() - scrollY;
  // var hideY = $(window).height() * 1.25;
  var sectionOffset = [];
  $('article section').each(function(){
    sectionOffset.push($(this).offset().top);
  });
  for (i=1; i<sectionOffset.length; i++) {
    if (sectionOffset[i-1] <= scrollY && sectionOffset[i] > scrollY && scrollY <= sectionOffset[sectionOffset.length - 1]) {
      if ($('.jump').css('display') == 'none') {
        $('.jump').fadeIn(300);
      };
      $('.jump>p').text($('article section').eq(i).find('h1:first').text());
      $('.jump').attr('href', '#' + $('article section').eq(i).attr('id'));
    } else if (scrollY > sectionOffset[sectionOffset.length - 1]) {
      $('.jump').fadeOut(300);
    }
  }
  // console.log(marginY);
}
