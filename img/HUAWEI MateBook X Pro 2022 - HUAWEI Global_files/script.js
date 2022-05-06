$(function () {
  var viewportHeight = window.innerHeight,
    viewportWidth = window.innerWidth,
    aspectRatio = viewportWidth / viewportHeight;
  var navHeight = $('#second-navigation-v4').height();

  // 100vh hack
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
  window.addEventListener('resize', function () {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  });
  var $winHeight = window.innerHeight;
  var $winWidth = window.innerWidth;

  var aspectRatioScale = $winWidth / $winHeight;
  var aspectRatio = window.matchMedia("(max-aspect-ratio: 1/1)").matches;
  // ispad
  function isPad () {
    if (window.innerWidth / window.innerHeight <= 0.75 && window.innerWidth <= 1200 && window.innerWidth >= 640) {
      return true;
    }
    return false;
  }
  var aspect = window.innerWidth / window.innerHeight;
  var isPortrait = window.matchMedia("(max-aspect-ratio: 1/1)").matches;

  //  browsers
  var userAgentInfo = navigator.userAgent.toLowerCase();
  var isIE = userAgentInfo.indexOf("msie") > -1;
  var isIE11 = !!window.ActiveXObject ? !!window.ActiveXObject : "ActiveXObject" in window;
  var isEdge = userAgentInfo.indexOf("edge") > -1;
  var isIE11NEdge = isIE11 || isEdge;
  var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  var safari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  var ipad = navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/i);
  // platforms
  var isWeChat = userAgentInfo.indexOf("micromessenger") > -1;
  var isUC = userAgentInfo.indexOf("ucbrowser") > -1;
  var isIphone = userAgentInfo.indexOf("iphone") > -1;
  var isIpad = userAgentInfo.indexOf("ipad") > -1;
  var isAndroid = userAgentInfo.indexOf("android") > -1;
  // portrait devices
  var isPadPortrait = (isPortrait && window.innerWidth <= 1200 && window.innerWidth >= 640) || false;
  var isPhonePortrait = (isPortrait && window.innerWidth <= 639) || false;
  var isMobPortrait = (isPadPortrait || isPhonePortrait) || false
  // isMobile
  function isMobile () {
    if (window.innerWidth <= 768 || isPad()) {
      return true;
    }
    return false;
  }
  // isHuawei 734
  function isHuawei2 () {
    if (window.innerWidth <= 740 && window.innerWidth >= 730) {
      return true;
    }
    return false;
  }
  // isHuawei2 677
  function isHuawei () {
    if (window.innerWidth == 677) {
      return true;
    }
    return false;
  }
  // custom video
  function customVideos () {
    $(".custom-video").each(function (i, e) {
      isMobPortrait ? e.setAttribute("poster", e.getAttribute("data-poster-mb")) : e.setAttribute("poster", e.getAttribute("data-poster"));
      $(e).find("source").each(function (i, ele) {
        if (isUC || isIE11NEdge) {
          return false;
        }
        isMobPortrait ? ele.setAttribute("src", ele.getAttribute("data-src-mb")) : ele.setAttribute("src", ele.getAttribute("data-src"))

      });
      setTimeout(function () {
        !isUC && !isWeChat && e.load()
      }, 500)
    });
  }
  var windowWidth = $(window).width();
  $(window).on("resize", function () {
    if ($(window).width() != windowWidth) {
      customVideos();
    }
  });
  customVideos();

  function getExplorer () {
    var isUCN = navigator.userAgent.indexOf("UCBrowser") > -1;
    if (isUCN) {
      return 'uc';
    }
  }
  getExplorer();
  getExplorerY();
  if (getExplorer() == 'uc' || getExplorerY() == 'WX') {
    $('.custom-video').addClass('hidden-uc');
  } else {
    $('.uc-img').addClass('hidden-uc');
  }
  if (getExplorerY() == 'uc' || getExplorerY() == 'WX') {
    $('.video-swiper').addClass('hidden-uc');
  } else {
    $('.uc-img').addClass('hidden-uc');
  }


  $('.morgan-en .idVideo').on('click', function (e) {
    e.preventDefault();
    $(this).initH5player({
      'path': '',
      'target': 'fancybox',
      'autostart': true,
      'afterClose': function () {
        // playVideo4.removeClass('active');
      },
    });
  });


  // wechat video popup
  isWeChat && isMobPortrait && $('.video_wechatPopBtn').show()
  // footnote

  var $winWidth = window.innerWidth
  // reset a
  var aLink = '';
  $('a[data-b-href]').each(function () {
    aLink = $(this).attr('data-b-href');
    $(this).attr('href', aLink);
  });
  // wx
  var userAgentInfo = navigator.userAgent.toLowerCase();
  var isWeixin = userAgentInfo.indexOf("micromessenger") != -1;
  if (isWeixin) {
    $.getScript("//res.wx.qq.com/open/js/jweixin-1.2.0.js", function (response, status) {
      if (status == 'success') {
        $.getScript("//consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/store/js/cbgwechatv1.js", function (r, s) {
          if (s == 'success') {
            var wxShare = setInterval(function () {
              if (typeof (WechatShare) != "undefined") {
                WechatShare({
                  url: window.location.href,
                  img: 'https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/pc/matebook-x-pro-2022/imgs01/wx_share_en.jpg',
                  title: $(document).attr('title'),
                  descript: document.querySelector('meta[name=\"description\"]').getAttribute('content')
                }, function () {
                  alert('Thanks for sharing.');
                });
                clearInterval(wxShare)
              }
            }, 150)
          }
        });
      }
    });
  }
  // notes jump
  $("sup span").on("click", function (e) {
    e.stopPropagation();
    var notesDOM = $("#notesList"),
      top = notesDOM.offset().top - 110,
      index = $(this).attr("data-id") - 1,
      noteHeight = 0;
    if ($winWidth <= 640 || ($winWidth < 1200 && aspectRatio < 1)) {
      top = notesDOM.find("li").eq(index).offset().top - 110;
      $(window).scrollTop(top);
    } else {
      if ($winWidth <= 1366 && aspectRatio > 1) {
        noteHeight = 120;
      }
      if ($winWidth <= 1024 || ($winWidth < 1200 && aspectRatio > 1)) {
        var noteList = [].slice.call(notesDOM.find("li"));
        for (let i = 0; i < index; i++) {
          noteHeight += noteList[i].offsetHeight;
        }
      }
      top = notesDOM.find("li").eq(index).offset().top - 150;
      $(window).scrollTop(top);
    }
    notesDOM.find("li").removeClass("current");
    notesDOM.find("li").eq(index).addClass("current");
  });
  // toTop
  $(window).scroll(function () {
    var htop = $(this).scrollTop();
    if (htop < 10) {
      $('.cbg-backtotop').find('a').eq(0).addClass('hidden');
    } else {
      $('.cbg-backtotop').css('display', 'block');
      $('.cbg-backtotop').find('a').removeClass('hidden');
    }
  });
  $('.cbg-icon-backtotop').off().click(function () {
    $('html,body').animate({
      scrollTop: 0
    }, 800);
  });

  var controller = new ScrollMagic.Controller();

  // s5
  if (!isIE11NEdge) {
    new ScrollMagic.Scene({
      triggerHook: 0,
      triggerElement: '#s5-trigger',
      duration: 0,
    })
      .setClassToggle(".morgan-s5 .s5-right .img-cover", "active")
      .addTo(controller)
  }

  setTimeout(function () {
    $('.morgan-s6 #pagination-connect .swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
    $('.morgan-s10 #s10-connect .swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active')
    $('.morgan-s11 #s11-connect .swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
    $('.morgan-s12 #s12-connect .swiper-pagination-bullet-active').removeClass('swiper-pagination-bullet-active');
    }, 0)
  //s6
  var connectSpan = $('.morgan-s6 #pagination-connect span');
  var windowWidth = $(document.body).width(), scrollleftSet6 = 0.4 * windowWidth, marginInitLeft6 = 0.083 * windowWidth, left6 = scrollleftSet6,
  s6Connect = $("#pagination-connect");
  var connectSpanArr = []
  for (var i = 0; i < connectSpan.length; i++) {
    connectSpanArr.push({ text: connectSpan.eq(i).data('text'), buttonname: connectSpan.eq(i).data('buttonname'), productname: connectSpan.eq(i).data('productname') })
  }
  var mySwipers6Flg = false;
  var mySwipers6 = new Swiper('.morgan-s6 #swiper-connect-bg', {
    autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },

    speed: 700,
    effect: 'fade',
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.morgan-s6 #pagination-connect',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"' + " data-buttonname=\"" + connectSpanArr[index].buttonname + "\"" + " data-productname=\"" + connectSpanArr[index].productname + "\"" + '>' + connectSpanArr[index].text + '</span>';
      },
  },
  on: {
    paginationUpdate: function (swiper) {
      var activeIndex = 0;
      $(".morgan-s6 #pagination-connect .swiper-pagination-bullet").each(function (index, element) {
        if ($(element).hasClass("swiper-pagination-bullet-active")) {
          activeIndex = index;
        }
      })
      var totalDom6 = $(".morgan-s6 #pagination-connect .swiper-pagination-bullet").length - 1;
      if (isMobPortrait || isHuawei2() || isHuawei()) {
        var currentActiveDomPosition6 = $("#pagination-connect .swiper-pagination-bullet-active").offset().left;
        var lastDom6 = $($(".morgan-s6 #pagination-connect .swiper-pagination-bullet")[totalDom6]),
          lastDomPosition6 = lastDom6.offset().left, lastDomWidth6 = lastDom6.outerWidth(true);
        var moveLastDomWidth6 = lastDomWidth6 - (windowWidth - lastDomPosition6) + marginInitLeft6;
        if (activeIndex != 0) {
          var moveDistent6 = currentActiveDomPosition6 - scrollleftSet6;
          if (activeIndex == totalDom6) {
            left6 -= moveLastDomWidth6;
          } else if (moveLastDomWidth6 < moveDistent6) {
            left6 -= moveLastDomWidth6;
          } else {
            left6 -= (currentActiveDomPosition6 - scrollleftSet6);
          }
        } else {
          left6 = marginInitLeft6
        }

        if (left6 > marginInitLeft6) {
          left6 = marginInitLeft6
        }
        s6Connect.animate({
          marginLeft: left6
        }, 600)
      }
    },

  },
  })

  mySwipers6.autoplay.stop();
  new ScrollMagic.Scene({
    triggerHook: 0.5,
    triggerElement: '#s6-trigger',
    duration: '200%',
  })
    .on('progress', function (event) {
      if (event.progress > 0 && event.progress < 1) {
        if (!mySwipers6Flg) {
          $($('.morgan-s6 #pagination-connect .swiper-pagination-bullet')[0]).addClass('swiper-pagination-bullet-active');
          mySwipers6.autoplay.start();
          mySwipers6Flg = true;
        }
      }
    })
    .addTo(controller)
  //s10
  var connectSpanS10 = $('.morgan-s10 #s10-connect span')
  var connectSpanArrS10 = []

  for (var i = 0; i < connectSpanS10.length; i++) {
    connectSpanArrS10.push({ text: connectSpanS10.eq(i).data('text'), buttonname: connectSpanS10.eq(i).data('buttonname'), productname: connectSpanS10.eq(i).data('productname') })
  }

  var mySwipers10Flg = false;
  var mySwipers10Text = new Swiper('.morgan-s10 #s10-connect-text', {
    speed: 100,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
  })
  var s10ActiveIntex = 0;
  var translateValue = 0;
  var windowWidth = $(document.body).width(), scrollleftSet10 = 0.4 * windowWidth, marginInitLeft10 = 0.083 * windowWidth, left10 = scrollleftSet10,
    s10Connect = $("#s10-connect");
  var mySwipers10 = new Swiper('.morgan-s10 #s10-connect-bg', {

    autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    speed: 700,
    effect: 'fade',
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.morgan-s10 #s10-connect',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"' + " data-buttonname=\"" + connectSpanArrS10[index].buttonname+ "\"" + " data-productname=\"" + connectSpanArrS10[index].productname + "\"" + '>' + connectSpanArrS10[index].text + '</span>';
      },
    },
    on: {
      "slideChange": function () {
        if (mySwipers10Text.realIndex !== this.realIndex) {
          mySwipers10Text.slideTo(this.realIndex)
        }
      },
      paginationUpdate: function (swiper) {
        var activeIndex = 0;
        $(".morgan-s10 #s10-connect .swiper-pagination-bullet").each(function (index, element) {
          if ($(element).hasClass("swiper-pagination-bullet-active")) {
            activeIndex = index;
          }
        })
        var totalDom10 = $(".morgan-s10 #s10-connect .swiper-pagination-bullet").length - 1;
        if (isMobPortrait || isHuawei2() || isHuawei()) {
          var currentActiveDomPosition10 = $("#s10-connect .swiper-pagination-bullet-active").position().left;
          var lastDom10 = $($(".morgan-s10 #s10-connect .swiper-pagination-bullet")[totalDom10]),
            lastDomPosition10 = lastDom10.position().left, lastDomWidth10 = lastDom10.outerWidth(true);
          var moveLastDomWidth10 = lastDomWidth10 - (windowWidth - lastDomPosition10) + marginInitLeft10;
          if (activeIndex != 0) {
            var moveDistent10 = currentActiveDomPosition10 - scrollleftSet10;
            if (activeIndex == totalDom10) {
              left10 -= moveLastDomWidth10;
            } else if (moveLastDomWidth10 < moveDistent10) {
              left10 -= moveLastDomWidth10;
            } else {
              left10 -= (currentActiveDomPosition10 - scrollleftSet10);
            }
          } else {
            left10 = marginInitLeft10
          }

          if (left10 > marginInitLeft10) {
            left10 = marginInitLeft10
          }
          s10Connect.animate({
            marginLeft: left10
          }, 600)
        }
      },

    },

  })

  mySwipers10.autoplay.stop();
  new ScrollMagic.Scene({
    triggerHook: 0.5,
    triggerElement: '#s10-trigger',
    duration: '200%',
  })
    .on('progress', function (event) {
      if (event.progress > 0 && event.progress < 1) {
        if (!mySwipers10Flg) {
          $($('.morgan-s10 #s10-connect .swiper-pagination-bullet')[0]).addClass('swiper-pagination-bullet-active');
          mySwipers10.autoplay.start();
          mySwipers10Flg = true;
        }
      }
    })
    .addTo(controller)



  //s11
  var connectSpanS11 = $('.morgan-s11 #s11-connect span')
  var connectSpanArrS11 = []
  for (var i = 0; i < connectSpanS11.length; i++) {
    connectSpanArrS11.push({ text: connectSpanS11.eq(i).data('text'), buttonname: connectSpanS11.eq(i).data('buttonname'), productname: connectSpanS11.eq(i).data('productname') })
  }

  var mySwipers11Flg = false;
  var windowWidth = $(document.body).width(), scrollleftSet11 = 0.4 * windowWidth, marginInitLeft11 = 0.083 * windowWidth, left11 = scrollleftSet11,
  s11Connect = $("#s11-connect");
  var mySwipers11 = new Swiper('.morgan-s11 #s11-connect-bg', {
    autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    speed: 700,
    effect: 'fade',
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.morgan-s11 #s11-connect',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"' + " data-buttonname=\"" + connectSpanArrS11[index].buttonname + "\"" + " data-productname=\"" + connectSpanArrS11[index].productname + "\"" + '>' + connectSpanArrS11[index].text + '</span>';
      },
    },
    on: {
      paginationUpdate: function (swiper) {
        var activeIndex = 0;
        $(".morgan-s11 #s11-connect .swiper-pagination-bullet").each(function (index, element) {
          if ($(element).hasClass("swiper-pagination-bullet-active")) {
            activeIndex = index;
          }
        })
        var totalDom11 = $(".morgan-s11 #s11-connect .swiper-pagination-bullet").length - 1;
        if (isMobPortrait || isHuawei2() || isHuawei()) {
          var currentActiveDomPosition11 = $("#s11-connect .swiper-pagination-bullet-active").position().left;
          var lastDom11 = $($(".morgan-s11 #s11-connect .swiper-pagination-bullet")[totalDom11]),
            lastDomPosition11 = lastDom11.position().left, lastDomWidth11 = lastDom11.outerWidth(true);
          var moveLastDomWidth11 = lastDomWidth11 - (windowWidth - lastDomPosition11) + marginInitLeft11;
          if (activeIndex != 0) {
            var moveDistent11 = currentActiveDomPosition11 - scrollleftSet11;
            if (activeIndex == totalDom11) {
              left11 -= moveLastDomWidth11;
            } else if (moveLastDomWidth11 < moveDistent11) {
              left11 -= moveLastDomWidth11;
            } else {
              left11 -= (currentActiveDomPosition11 - scrollleftSet11);
            }
          } else {
            left11 = marginInitLeft11
          }

          if (left11 > marginInitLeft11) {
            left11 = marginInitLeft11
          }
          s11Connect.animate({
            marginLeft: left11
          }, 600)
        }
      },

    },
  })
  mySwipers11.autoplay.stop();
  new ScrollMagic.Scene({
    triggerHook: 0.5,
    triggerElement: '#s11-trigger',
    duration: '200%',
  })
    .on('progress', function (event) {
      if (event.progress > 0 && event.progress < 1) {
        if (!mySwipers11Flg) {
          $($('.morgan-s11 #s11-connect .swiper-pagination-bullet')[0]).addClass('swiper-pagination-bullet-active');
          mySwipers11.autoplay.start();
          mySwipers11Flg = true;
        }
      }
    })
    .addTo(controller)

  //s12
  var connectSpanS12 = $('.morgan-s12 #s12-connect span')
  var connectSpanArrS12 = []
  for (var i = 0; i < connectSpanS12.length; i++) {
    connectSpanArrS12.push({ text: connectSpanS12.eq(i).data('text'), buttonname: connectSpanS12.eq(i).data('buttonname'), productname: connectSpanS12.eq(i).data('productname') })
  }
  var windowWidth = $(document.body).width(), scrollleftSet = 0.4 * windowWidth, marginInitLeft = 0.083 * windowWidth, left = marginInitLeft,
    s12Connect = $("#s12-connect");
  var mySwipers12Flg = false;
  var mySwipers12 = new Swiper('.morgan-s12 #s12-connect-bg', {
    autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    speed: 700,
    effect: 'fade',
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.morgan-s12 #s12-connect',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"' + " data-buttonname=\"" + connectSpanArrS12[index].buttonname+ "\"" + " data-productname=\"" + connectSpanArrS12[index].productname + '">' + connectSpanArrS12[index].text + '</span>';
      },
    },
    on: {
      paginationUpdate: function (swiper) {
        var activeIndex = 0;
        var totalDom = $(".morgan-s12 #s12-connect .swiper-pagination-bullet").length - 1;
        $(".morgan-s12 #s12-connect .swiper-pagination-bullet").each(function (index, element) {
          if ($(element).hasClass("swiper-pagination-bullet-active")) {
            activeIndex = index;
          }
        })
        if (isMobPortrait || isHuawei2() || isHuawei()) {
          var currentActiveDomPosition = $("#s12-connect .swiper-pagination-bullet-active").position().left;
          var lastDom = $($(".morgan-s12 #s12-connect .swiper-pagination-bullet")[totalDom]),
            lastDomPosition = lastDom.position().left, lastDomWidth = lastDom.outerWidth(true);
          var moveLastDomWidth = lastDomWidth - (windowWidth - lastDomPosition) + marginInitLeft;
          if (activeIndex != 0) {
            var moveDistent = currentActiveDomPosition - scrollleftSet;
            if (activeIndex == totalDom) {
              left -= moveLastDomWidth;
            } else if (moveLastDomWidth < moveDistent) {
              left -= moveLastDomWidth;
            } else {
              left -= (currentActiveDomPosition - scrollleftSet);
            }
          } else {
            left = 0.083 * windowWidth
          }

          if (left > 0.083 * windowWidth) {
            left = 0.083 * windowWidth
          }

          s12Connect.animate({
            marginLeft: left
          }, 600)
        }

      },
    },
  })

  mySwipers12.autoplay.stop();
  new ScrollMagic.Scene({
    triggerHook: 0.5,
    triggerElement: '#s12-trigger',
    duration: '200%',
  })
    .on('progress', function (event) {
      if (event.progress > 0 && event.progress < 1) {
        if (!mySwipers12Flg) {
          $($('.morgan-s12 #s12-connect .swiper-pagination-bullet')[0]).addClass('swiper-pagination-bullet-active');
          mySwipers12.autoplay.start();
          mySwipers12Flg = true;
        }
      }
    })
    .addTo(controller)


  //s13
  function layout () {
    if (viewportWidth < 1024 && aspectRatio < 1) {
      return 'mob'
    } else if (viewportWidth < 1200 && aspectRatio > 1.1) {
      return 'pad'
    } else if (viewportWidth >= 1200 && aspectRatio > 1) {
      return 'pc'
    } else if (viewportWidth > 600 && aspectRatio > 1 && aspectRatio < 1.1) {
      return 'matex'
    }
  }


  function getExplorerY () {
    var userAgentY = navigator.userAgent.toLowerCase();
    var isIEY = userAgentY.indexOf("compatible") > -1 && userAgentY.indexOf("mise") > -1;
    var isEdgeY = userAgentY.indexOf('edge') > -1;
    var isIE11Y = userAgentY.indexOf('trident') > -1 && userAgentY.indexOf('rv:11.0') > -1;
    var isUCY = userAgentY.indexOf("ucbrowser") > -1
    var isHWY = userAgentY.indexOf("huaweibrowser") > -1
    var isFFY = userAgentY.indexOf("firefox") > -1
    var isEdgeNewY = userAgentY.indexOf('edg') > -1
    var isSafariY = (userAgentY.indexOf('safari') > -1 || userAgentY.indexOf('iphone') > -1) && (userAgentY.indexOf('chrome') == -1)
    if (userAgentY.match(/MicroMessenger/i) == 'micromessenger') {
      return 'WX'
    }

    if (isEdgeY) {
      return 'Edge';
    } else if (isIE11Y) {
      return 'ie';
    } else if (isUCY) {
      return 'uc'
    } else if (isHWY) {
      return 'hw'
    } else if (isFFY) {
      return 'ff'
    } else if (isEdgeNewY) {
      return 'EdgeNew'
    } else if (isSafariY) {
      return 'Safari'
    }
  }
  $('.video-swiper').each(function () {
    if (layout() == 'mob' || layout() == 'matex') {
      $(this).attr('poster', $(this).data('poster-m'))
      $(this).find('source').attr('src', $(this).find('source').data('src-m'))
    } else {
      $(this).attr('poster', $(this).data('poster-p'))
      $(this).find('source').attr('src', $(this).find('source').data('src-p'))
    }
    if (getExplorerY() == 'uc' || getExplorerY() == 'WX' || getExplorerY() == 'Edge' || getExplorerY() == 'ie') {
      $(this).attr('poster', $(this).data('poster-wx'))
      $(this).find('source').attr('src', '')
      return
    }
    $(this).trigger('load')
  })
  //s13
  var connectSpanS13 = $('.morgan-s13 #s13-connect span')
  var connectSpanArrS13 = []
  for (var i = 0; i < connectSpanS13.length; i++) {
    connectSpanArrS13.push({ text: connectSpanS13.eq(i).data('text'), buttonname: connectSpanS13.eq(i).data('buttonname'), productname: connectSpanS13.eq(i).data('productname') })
  }
  var mySwipers13Text = new Swiper('.morgan-s13 #s13-connect-text', {
    speed: 700,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
  })
  var mySwipers13TextMob = new Swiper('.morgan-s13 #s13-connect-text-mob', {
    speed: 700,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
  })
  var mySwipers13Right = new Swiper('.morgan-s13 #s13-connect-right', {
    speed: 700,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    on: {
      init: function (swiper) {
        if (getExplorerY() == 'WX' || getExplorerY() == 'uc' || getExplorerY() == 'Edge' || getExplorerY() == 'ie') {
          this.params.autoplay.disableOnInteraction = false
        }
        if (!mySwipers13Flg) {
          return;
        }
        var video = $('#s13-connect-right .swiper-slide-active').find('video');
        setTimeout(function () {
          video.trigger('play');
        }, 200);
      },
      transitionStart: function (swiper) {
        if (!mySwipers13Flg) {
          return;
        }
        var videoRightS = $('#s13-connect-right .swiper-slide');
        videoRightS.each(function () {
          if (!$(this).hasClass('swiper-slide-active')) {
            $(this).find('video').trigger('pause');
          }
        });
      },
      transitionEnd: function (swiper) {
        if (!mySwipers13Flg) {
          return;
        }
        var videoRightEnd = $('#s13-connect-right .swiper-slide');
        videoRightEnd.each(function () {
          if (!$(this).hasClass('swiper-slide-active')) {
            $(this).find('video').trigger('pause');
          }
        });
        var videoRightE = $('#s13-connect-right .swiper-slide-active').find('video')
        setTimeout(function () {
          videoRightE[0].currentTime = 0
          videoRightE.trigger('play')
        }, 200)
      },
    }
  })
  s13Connect = $("#s13-connect");
  var draggableFlg = true;
  var windowWidth = $(document.body).width(), marginInit13 = 0, left13 = 0;
  var leftDragLenght = 0;
  
  var windowWidth = $(document.body).width(), scrollleftSet13 = 0.4 * windowWidth, marginInitLeft13 = 0.083 * windowWidth, left13 = marginInitLeft13;
  var activeIndex13 = 0;
  var s13ConnectWidth = 0;
  var mySwipers13 = new Swiper('.morgan-s13 #s13-connect-bg', {
    autoplay: isUC || isWeChat || getExplorerY() == 'Edge' || getExplorerY() == 'ie' ? {
      delay: 3000,
    } : false,
    speed: 700,
    effect: 'fade',
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.morgan-s13 #s13-connect',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"' + " data-buttonname=\"" + connectSpanArrS13[index].buttonname+ "\"" + " data-productname=\"" + connectSpanArrS13[index].productname + '">' + connectSpanArrS13[index].text + '</span>';
      },
    },
    on: {
      init: function (swiper) {
        if (getExplorerY() == 'WX' || getExplorerY() == 'uc' || getExplorerY() == 'Edge' || getExplorerY() == 'ie') {
          this.params.autoplay.disableOnInteraction = false
        }
        if (!mySwipers13Flg) {
          return;
        }
        var video = $('#s13-connect-bg .swiper-slide-active').find('video');
        setTimeout(function () {
          video.trigger('play');
        }, 200);
        video.on('ended', function () {
          mySwipers13.slideNext();
        })
      },
      transitionStart: function (swiper) {
        if (!mySwipers13Flg) {
          return;
        }
        var videoS = $('#s13-connect-bg .swiper-slide');
        videoS.each(function () {
          if (!$(this).hasClass('swiper-slide-active')) {
            $(this).find('video').trigger('pause');
          }
        });
        mySwipers13Text.slideTo(this.realIndex);
        mySwipers13Right.slideTo(this.realIndex);
        mySwipers13TextMob.slideTo(this.realIndex);
      },
      transitionEnd: function (swiper) {
        if (!mySwipers13Flg) {
          return;
        }
        var videoEnd = $('#s13-connect-bg .swiper-slide');
        videoEnd.each(function () {
          if (!$(this).hasClass('swiper-slide-active')) {
            $(this).find('video').trigger('pause');
          }
        });
        var video = $('#s13-connect-bg .swiper-slide-active').find('video');
        setTimeout(function () {
          video[0].currentTime = 0;
          video.trigger('play');
          video.on('ended', function () {
            mySwipers13.slideNext();
          })
        }, 200)
      },
      paginationUpdate: function (swiper) {
        if (isMobPortrait || isHuawei2() || isHuawei()) {
          draggableFlg = false;
          var totalDom13 = $(".morgan-s13 #s13-connect .swiper-pagination-bullet").length - 1;
          $(".morgan-s13 #s13-connect .swiper-pagination-bullet").each(function (index, element) {
            if ($(element).hasClass("swiper-pagination-bullet-active")) {
              activeIndex13 = index;
            }
          })
          var currentActiveDomPosition13 = $("#s13-connect .swiper-pagination-bullet-active").position().left;
          var lastDomPosition13 = $($(".morgan-s13 #s13-connect .swiper-pagination-bullet")[totalDom13]).position().left;
          var lastDomWidth = $($(".morgan-s13 #s13-connect .swiper-pagination-bullet")[totalDom13]).outerWidth(true);
          if (s13ConnectWidth === 0) {
            s13ConnectWidth = s13Connect.outerWidth(true);
          }
          

          if (currentActiveDomPosition13 - scrollleftSet13 >= 0) {
            if (lastDomPosition13 + lastDomWidth > windowWidth) {
              if ((currentActiveDomPosition13 - scrollleftSet13) > Math.abs(lastDomPosition13 - windowWidth + lastDomWidth + marginInitLeft13)) {
                left13 = -Math.abs( lastDomPosition13 - windowWidth + lastDomWidth + marginInitLeft13)  + left13
              } else {
                if (totalDom13 == activeIndex13) {
                  left13 = -Math.abs(currentActiveDomPosition13 - scrollleftSet13) + left13 - (marginInitLeft13/2) ;
                } else {
                  left13 = -Math.abs(currentActiveDomPosition13 - scrollleftSet13) + left13;
                }
                
              }
            } else {
              if (activeIndex13 == totalDom13) {
                left13 -= marginInitLeft13 / 2 ;
              }
            }
          } else {
            if (Math.abs(currentActiveDomPosition13 - scrollleftSet13) > Math.abs(left13)) {
              left13 = marginInitLeft13;
            } else {
              left13 = Math.abs(currentActiveDomPosition13 - scrollleftSet13) - Math.abs(left13)
            }
          }
          if (windowWidth < s13ConnectWidth) {
            s13Connect.animate({
              marginLeft: left13
            }, 600)
          }
          draggableFlg = true;
        }
      },
    },
  })
  var mySwipers13Flg = false;
  new ScrollMagic.Scene({
    triggerHook: 0.5,
    triggerElement: '#s13-trigger',
    duration: '200%',
  })
    .on('progress', function (event) {
      if (event.progress > 0 && event.progress !== 1 && !mySwipers13Flg) {
        if (getExplorerY() == 'WX' || getExplorerY() == 'uc' || getExplorerY() == 'Edge' || getExplorerY() == 'ie') {
          mySwipers13Flg = true;
          mySwipers13.autoplay.start();
        } else {
          mySwipers13Flg = true;
          var video = $('#s13-connect-right .swiper-slide-active').find('video');
          setTimeout(function () {
            video.trigger('play');
          }, 200);

          var video1 = $('#s13-connect-bg .swiper-slide-active').find('video');
          setTimeout(function () {
            video1.trigger('play');
          }, 200);
          video1.on('ended', function () {
            mySwipers13.slideNext();
          })
        }
      }
    })
    .addTo(controller)
  if (getExplorerY() == 'WX' || getExplorerY() == 'uc' || getExplorerY() == 'Edge' || getExplorerY() == 'ie') {
    mySwipers13.autoplay.stop();
  }
  //s9
  //video 1
  var triggerHookDepth = isPhonePortrait ? 0.9 : isPadPortrait ? 1 : 0.6
  var offsetDepth = isMobPortrait && '20' || '-37'
  if (isMobPortrait || isHuawei()) {
    var l = new Array;
    var elementPreLoad = document.getElementById("morgan-sVideo-kv-img-mob");
    var pathPrefix = $("#morgan-sVideo-kv-img-mob").attr("data-img-path");
    for (var v = 0; v < 150; v++) {
      var img = new Image();
      img.onload = function () { };
      img.onerror = function () { };
      img.src = pathPrefix + v + ".jpg";
      l[v] = img;
    }
    $("#morgan-sVideo-kv-img-mob").attr("src", pathPrefix + "0.jpg");
    var o = {
      curImg: 0
    };
    var morgansVideoKVAnimation = new TimelineMax()
      .add([
        TweenMax.to(o, 1, {
          curImg: l.length - 1,
          roundProps: "curImg",
          immediateRender: true,
          ease: Linear.easeNone,
          onUpdate: function () {
            elementPreLoad.src = l[o.curImg].src;
          }
        })
      ])

      .add([
        TweenMax.to('.morgan-s9 .common-desc', 0.5, { opacity: 1 })
      ])
    new ScrollMagic.Scene({
      triggerElement: "#morgan-s9-trigger",
      duration: '350%',
      triggerHook: triggerHookDepth,
      offset: offsetDepth
    })
      .setPin('.morgan-sVideo-kv')
      .setTween(morgansVideoKVAnimation)
      .addTo(controller)

  }
  else {
    if (!isIE11NEdge) {
      var videoL = new Array;
      var elementPreLoad = document.getElementById("morgan-sVideo-kv-img");
      var pathPrefix = $("#morgan-sVideo-kv-img").attr("data-img-path");
      for (var v = 0; v < 150; v++) {
        var img = new Image();
        img.onload = function () { };
        img.onerror = function () { };
        img.src = pathPrefix + v + ".jpg";
        videoL[v] = img;
      }
      $("#morgan-sVideo-kv-img").attr("src", pathPrefix + "0.jpg");
      var o1 = {
        curImg: 0
      };


      var morgansVideoKVAnimation = new TimelineMax()
        .add([
          TweenMax.to(o1, 1, {
            curImg: videoL.length - 1,
            roundProps: "curImg",
            immediateRender: true,
            ease: Linear.easeNone,
            onUpdate: function () {
              elementPreLoad.src = videoL[o1.curImg].src;
            }
          })
        ])

        .add([
          TweenMax.to('.morgan-s9 .common-desc', 0.5, { opacity: 1 })
        ])


      new ScrollMagic.Scene({
        triggerElement: "#morgan-s9-trigger",
        duration: '350%',
        triggerHook: triggerHookDepth,
        offset: offsetDepth
      })
        .setPin('.morgan-sVideo-kv')
        .setTween(morgansVideoKVAnimation)
        .addTo(controller)
    } else {
      var pathPrefix = $("#morgan-sVideo-kv-img").attr("data-img-path");
      $("#morgan-sVideo-kv-img").attr("src", pathPrefix + "149.jpg");
    }

  }


  //s16
  let s16VideoHand = $('.morgan-s16-video-hand');
  let s16Video = $('.morgan-s16-video-container .morgan-s16-video');
  let s16ActiveAudio = document.querySelectorAll('.morgan-s16-video-text audio');
  let audioTime = 0;

  $('.morgan-s16-video .morgan-s16-video-control').on('click', function () {
    let _this = $(this).parent().index();
    let thisAudio = $('.noise__audio').eq(_this);
    $(this).toggleClass('active-show');
    audioTime = thisAudio[0].currentTime;
    if ($(this).hasClass('active-show')) {
      $(this).parent().find('.morgan-s16-video-content').addClass('show-gif');
      thisAudio.attr('src', thisAudio.attr('data-audio-quite'));
    } else {
      $(this).parent().find('.morgan-s16-video-content').removeClass('show-gif');
      thisAudio.attr('src', thisAudio.attr('data-audio-noise'));
    }

    if (isiOS || safari || ipad) {
      thisAudio[0].addEventListener('canplay', function () {
        s16ActiveAudio[_this].currentTime = audioTime;

      })
    } else {
      $(s16ActiveAudio[_this]).on('loadedmetadata', function () {
        s16ActiveAudio[_this].currentTime = audioTime;
      })
    }
    s16ActiveAudio[_this].play();
  })


  $('.morgan-s16-video-text').on('click', function () {
    let _this = $(this).index();
    s16Video.find('.morgan-s16-video-control').removeClass('active-show');
    s16Video.find('.morgan-s16-video-content').removeClass('show-gif');
    if ($('.morgan-s16-video-hand').length > 0) {
      s16VideoHand.remove();
    }
    $('.morgan-s16-audio audio').trigger('pause');
    $(this).toggleClass('active').siblings().removeClass('active');
    s16Video.eq(_this).toggleClass('active').siblings().removeClass('active');
    s16ActiveAudio[_this].setAttribute('src', s16ActiveAudio[_this].getAttribute('data-audio-noise'));



    if (isIE11 || isEdge) {
      $(s16ActiveAudio[_this]).on('loadedmetadata', function () {
        audioTime = 0;
        s16ActiveAudio[_this].currentTime = 0;
      })
    } else {
      audioTime = 0;
      s16ActiveAudio[_this].currentTime = 0;
    }
    if (!$('.morgan-s16-video').eq(_this).is(':hidden')) {
      s16ActiveAudio[_this].play();
      s16ActiveAudio[_this].addEventListener('ended', function () {
        $('.morgan-s16-video-text').removeClass('active');
        $('.morgan-s16-video').removeClass('active');
        s16ActiveAudio[_this].pause();
      })
    }
    if (isIE11 || isEdge) {
      $(s16ActiveAudio[_this]).off('loadedmetadata');
    }
  })

  $('.morgan-s16-video-text,.morgan-s16-video-control').on('click', function () {
    $buttonName = $(this).attr('data-buttonname');
    $productMktName = $(this).attr('data-productname');
    dataLayer.push({
      'event': 'productBtnClicks',
      'buttonName': $buttonName,
      '$productMktName': $productMktName,
    })
  })
  setTimeout(function(){
    var divWidth = 0;
    $('.morgan-s16-video-text-content .morgan-s16-video-text').each(function (i, e) {
      divWidth += $(this).outerWidth(true);
    })
    $(".morgan-s16-video-text-content").width(divWidth);
  }
  ,0)     
  $('.swiper-ga').bind('click', function (event) {
    $buttonName = $(event.target).attr('data-buttonname');
    $productMktName = $(event.target).attr('data-productname');
    dataLayer.push({
      'event': 'productBtnClicks',
      'buttonName': $buttonName,
      '$productMktName': $productMktName,
    })
  })
  // s17
  if (!isIE11NEdge) {
    var triggerHookDepth = isPhonePortrait ? 0.9 : isPadPortrait ? 1 : 0.55
    var offsetDepth = isMobPortrait && '20' || '-37'
    var s17Anim = new TimelineMax()
      .addLabel("t1")
      .add(TweenMax.to([".s17-img-icons"], 0.2, {
        "transform": "scale(0)"
      }), 't1')
      .addLabel("t2")
      .add(TweenMax.to([".s17-img-logo"], 0.2, { "transform": isMobPortrait || isHuawei() ? "translate(-156%, -342%) scale(0.29)" : "translate(-190.5%, -149%) scale(0.1)" }), 't2')

      .add(TweenMax.to([".s17-img-bg"], 0.2, { "transform": "translate(-50%,-50%) scale(1)" }), 't2')
      .addLabel("t3")
      .add(TweenMax.to([".s17-img-logo"], 0.2, { "transform": isMobPortrait || isHuawei() ? "translate(-156%, -342%) scale(0.29)" : "translate(-190.5%, -149%) scale(0.1)" }), 't3')

      .add(TweenMax.to([".s17-img-bg"], 0.2, { "transform": "translate(-50%,-50%) scale(1)" }), 't3')

    var s1Scene = new ScrollMagic.Scene({
      triggerElement: "#s17-trigger",
      triggerHook: triggerHookDepth,
      duration: '200%',
      offset: offsetDepth
    })
      .setPin('.s17-con')
      .setTween(s17Anim)
      .addTo(controller)
  }

  // s20
  if (!isIE11NEdge) {
    new ScrollMagic.Scene({
      triggerHook: 0.8,
      triggerElement: '#s20-trigger',
      duration: 0,
    })
      .setClassToggle(".morgan-s20 .img-cover", "active")
      .addTo(controller)
  }


  // s21
  var sec21Hook = 0.5;
  if ($winWidth < 640 || ($winWidth < 1200 && aspectRatio) || aspectRatio) {
    sec21Hook = 0.6;
  }
  var timeLineSec23Text = new ScrollMagic.Scene({ triggerElement: "#s21-trigger", triggerHook: sec21Hook })
    .setClassToggle('.morgan-s21 .s21-text', 'active')
    .addTo(controller);

  if (isIE || isIE11 || isEdge) {
    timeLineSec23Text.destroy(true);
  }


  function isHuaweiScreen2 () {
    if (window.innerWidth <= 700 && window.innerWidth >= 640) {
      return true;
    }
    return false;
  }

  $('body').on('click', '.heart-item', function () {
    var id = $(this).data('href');
    var top = $(this).data('top') + 0;
    if (id[0] === '#' && id.length > 1) {
      if (isMobPortrait || isHuaweiScreen2()) {
        $('html, body').animate({
          scrollTop: $(id).offset().top - 110 - top
        }, 0);
      } else {
        $('html, body').animate({
          scrollTop: $(id).offset().top - 80 - top
        }, 0);
      }

    }

    dataLayer.push({
      'event': 'productBannerBtnClicks',
      'buttonName': $(this).attr('data-buttonname'),
      'pageName': $(this).attr('data-pagename'),
      'bannerName': $(this).attr('data-bannername'),
      'bannerPosition': 'mid',
    })
  });

  $('.link-ga').on('click', function () {
    $buttonName = $(this).attr('data-buttonname');
    $pageName = $(this).attr('data-pagename');
    $bannerName = $(this).attr('data-bannername');
    $bannerPosition = $(this).attr('data-bannerpos');
    dataLayer.push({
      'event': 'productBannerBtnClicks',
      'buttonName': $buttonName,
      'pageName': $pageName,
      'bannerName': $bannerName,
      'bannerPosition': $bannerPosition,
    })
  })

  // $('.buy-btn').on('click', function () {
  //   $buttonName = $(this).attr('data-buttonname');
  //   dataLayer.push({
  //     'event': 'productBannerBtnClicks',
  //     'buttonName': $buttonName,
  //   })
  // })
  $(window).bind('resize',function() {
    if (isMobPortrait || isHuawei() || isHuawei2()) {
    } else {
      var windowWidth = document.documentElement.clientWidth;
      var leftImageHeight = document.getElementsByClassName('kv-left')[0].offsetHeight;
      var leftDivWihth = leftImageHeight * 450 / 425;
  
      var rightDivWidth = document.getElementsByClassName('kv-right')[0].offsetWidth;
      var right = (windowWidth - leftDivWihth * 0.81 - rightDivWidth) / 2;
      document.getElementsByClassName('kv-right')[0].style.right = right + "px";
      document.getElementsByClassName('kv-right')[0].style.opacity = 1;
    }
  });
});
var isPortrait2 = window.matchMedia("(max-aspect-ratio: 1/1)").matches;
// portrait devices
var isPadPortrait2 = (isPortrait2 && window.innerWidth <= 1200 && window.innerWidth >= 640) || false;
var isPhonePortrait2 = (isPortrait2 && window.innerWidth <= 639) || false;
var isMobPortrait2 = (isPadPortrait2 || isPhonePortrait2) || false
// isHuawei 734
function isHuawei2js () {
  if (window.innerWidth == 734) {
    return true;
  }
  return false;
}
// isHuawei2 677
function isHuaweijs () {
  if (window.innerWidth == 677) {
    return true;
  }
  return false;
}

if (isMobPortrait2 || isHuaweijs() || isHuawei2js()) {
} else {
  setTimeout(function () {
    var windowWidth = document.documentElement.clientWidth;
  var leftImageHeight = document.getElementsByClassName('kv-left')[0].offsetHeight;
  var leftDivWihth = leftImageHeight * 450 / 425;

  var rightDivWidth = document.getElementsByClassName('kv-right')[0].offsetWidth;
  var right = (windowWidth - leftDivWihth * 0.81 - rightDivWidth) / 2;
  document.getElementsByClassName('kv-right')[0].style.right = right + "px";
  document.getElementsByClassName('kv-right')[0].style.opacity = 1;
  }, 0)
}

