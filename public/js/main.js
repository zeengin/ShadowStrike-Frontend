document.addEventListener("DOMContentLoaded", function () {

  $(function ($) {

    // preloader
    $(".preloader").delay(300).animate({
      "opacity": "0"
    }, 500, function () {
      $(".preloader").css("display", "none");
    });

    // Sticky Header
    var fixed_top = $(".header-section");
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 50) {
        fixed_top.addClass("animated fadeInDown header-fixed");
      }
      else {
        fixed_top.removeClass("animated fadeInDown header-fixed");
      }
    });

    // Scroll Top
    var ScrollTop = $(".scrollToTop");
    $(window).on('scroll', function () {
      if ($(this).scrollTop() < 600) {
        ScrollTop.removeClass("active");
      } else {
        ScrollTop.addClass("active");
      }
    });
    $('.scrollToTop').on('click', function () {
      $('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    });

    // Header Dropdown Menu
    const mobileSize = window.matchMedia("(max-width: 1199px)");
    function handleMediaScreen(e) {
      if (e.matches) {
        $(".navbar-nav .sub").addClass("dropdown-menu");
        $(".navbar-nav .dropdown").removeClass("show-dropdown");
        $(".navbar-nav .sub").removeClass("sub-menu");

        $(".navbar-nav .dropdown-menu").parent("li").on('click', function (e) {
          if (e.target.className !== "dropdown-item") {
            $(this).find(">.dropdown-menu").toggle(300);
            e.stopPropagation();
          }
        });
      } else {
        $(".navbar-nav .dropdown-menu").parent("li").off("click");
        $("sub-dropdown").off("click");

        $(".navbar-nav .dropdown-menu").show();
        $(".navbar-nav .dropdown").addClass("show-dropdown");
        $(".navbar-nav .sub").addClass("sub-menu");
        $(".navbar-nav .sub").removeClass("dropdown-menu");
      }
    }
    handleMediaScreen(mobileSize);
    mobileSize.addEventListener("change", handleMediaScreen);

    // Custom Tabs
    $(".tablinks button").each(function () {
      var targetTab = $(this).closest(".singletab");
      targetTab.find(".tablinks button").each(function () {
        var navBtn = targetTab.find(".tablinks button");
        navBtn.on('click', function () {
          navBtn.removeClass('active');
          $(this).addClass('active');
          var indexNum = $(this).closest("li").index();
          var tabcontent = targetTab.find(".tabcontents .tabitem");
          $(tabcontent).removeClass('active');
          $(tabcontent).eq(indexNum).addClass('active');
        });
      });
    });

    // Box Style 
    const targetBtn = document.querySelectorAll('.box-style')
    if (targetBtn) {
      targetBtn.forEach((element) => {
        element.addEventListener('mousemove', (e) => {
          const x = e.offsetX + 'px';
          const y = e.offsetY + 'px';
          element.style.setProperty('--x', x);
          element.style.setProperty('--y', y);
        })
      })
    }

    // Btn Movement
    $(".box-style").each(function () {
      var btn_wrapper = $(this).closest(".btn-movement");
      btn_wrapper.find(".box-style").each(function () {
        $(btn_wrapper).on('mousemove', function (event) {
          var mouseX = event.pageX;
          var mouseY = event.pageY;
          var divX = $(btn_wrapper).offset().left + $(btn_wrapper).width() / 2;
          var divY = $(btn_wrapper).offset().top + $(btn_wrapper).height() / 2;
          var distanceX = mouseX - divX;
          var distanceY = mouseY - divY;
          $(btn_wrapper).css({
            transform: 'translate(' + distanceX / 5 + 'px, ' + distanceY / 5 + 'px)',
            transition: 'all 0.8s'
          });
        });
      });
    });

    // Mouse Follower
    const follower = document.querySelector(".mouse-follower .cursor-outline");
    const dot = document.querySelector(".mouse-follower .cursor-dot");
    if (follower, dot) {
      window.addEventListener("mousemove", (e) => {
        follower.animate(
          [
            {
              opacity: 1,
              left: `${e.clientX}px`,
              top: `${e.clientY}px`,
              easing: "ease-in-out"
            }
          ],
          {
            duration: 3000,
            fill: "forwards"
          }
        );
        dot.animate(
          [
            {
              opacity: 1,
              left: `${e.clientX}px`,
              top: `${e.clientY}px`,
              easing: "ease-in-out"
            }
          ],
          {
            duration: 1500,
            fill: "forwards"
          }
        );
      });
    }

    // Mouse Follower Hide Function
    $("a, button").on('mouseenter mouseleave', function () {
      $('.mouse-follower').toggleClass('hide-cursor');
    });
    $(window).on('resize', function () {
      if ($(window).width() < 1199) {
        $('.mouse-follower').addClass('hide-cursor');
      } else {
        $('.mouse-follower').removeClass('hide-cursor');
      }
    });
    if ($(window).width() < 1199) {
      $('.mouse-follower').addClass('hide-cursor');
    } else {
      $('.mouse-follower').removeClass('hide-cursor');
    }

    // Circle Text
    const text = document.querySelector(".text p");
    if (text) {
      text.innerHTML = text.innerText.split('').map(
        (char, i) =>
          `<span style="transform:rotate(${i * 10}deg)">${char}</span>`
      ).join('');
    }

    // counter Item Active Class
    var counterItem = $('.counter-section .single-box');
    $(counterItem).on('mouseenter mouseleave', function () {
      $(counterItem).removeClass('active-area');
      $(this).addClass('active-area');
    });

    // Sidebar Menu Active
    var sidebarBtn = $('.sidebar-wrapper .sidebar-close');
    var changeBtn = $('.sidebar-wrapper .sidebar-close i');
    var sidebarWrapper = $('.sidebar-wrapper');
    $(sidebarBtn).on('click', function () {
      $('.sidebar-wrapper').toggleClass('sidebar-active');
      if (sidebarWrapper.hasClass("sidebar-active")) {
        changeBtn.html("close");
      } else {
        changeBtn.html("menu_open");
      }
    });

    // Sidebar menu mobile active
    $('.mobile-menu').on('click', function () {
      $('.sidebar-wrapper').toggleClass('active-mobile sidebar-active');
      $('.mobile-menu i').toggleClass('menu-active');
      if ($('.mobile-menu i').hasClass("menu-active")) {
        $('.mobile-menu i').html("close");
      } else {
        $('.mobile-menu i').html("menu_open");
      }
    });

    // Header Active
    $('.single-item .cmn-head').on('click', function () {
      $(this).parents('.single-item').toggleClass('active');
      $(this).parents('.single-item').siblings().removeClass('active');
    });

    // Cart Item Remove
    $('.nav-items-wrapper .single-box .end-area').on('click', function () {
      $(this).parents('.single-box').slideToggle();
    });

    // comments-area
    $('.comments-area .reply-btn').on('click', function () {
      $(this).siblings('.comment-form').slideToggle();
    });

    // Social Item Remove
    $('.social-hide-btn').on('click', function () {
      $(this).parents(".single-box").toggleClass('active');
      if ($('.single-box').hasClass("active")) {
        $('.active .social-hide-btn i').html("remove");
      } else {
        $('.social-hide-btn i').html("add");
      }
    });

    // Password Show Hide
    $('.show-hide-pass').on('click', function () {
      var passwordInput = $($(this).siblings(".pass-box input"));
      var icon = $(this);
      if (passwordInput.attr("type") == "password") {
        passwordInput.attr("type", "text");
        icon.html("visibility");
      } else {
        passwordInput.attr("type", "password");
        icon.html("visibility_off");
      }
    });

    // Dropdown Active Remove
    $("section, .close-btn").on('click', function () {
      $('.single-item').removeClass('active');
    });

    // Navbar Active Class 
    var curUrl = $(location).attr('href');
    var terSegments = curUrl.split("/");
    var desired_segment = terSegments[terSegments.length - 1];
    var checkLink = $('.navbar-nav a[href="' + desired_segment + '"]');
    var targetClass = checkLink.addClass('active');
    targetClass.parents(".sub-dropdown").find("button").first().addClass('active');
    targetClass.parents(".show-dropdown").find("button").first().addClass('active');

    var checkLink = $('.sidebar-content .navbar-nav a[href="' + desired_segment + '"]');
    var targetClass = checkLink.addClass('active');
    targetClass.parents(".sub-dropdown").find("button").first().addClass('active');
    targetClass.parents(".show-dropdown").find("button").first().addClass('active');

    // Input Increase
    var minVal = 1, maxVal = 20;
    $(".increaseQty").on('click', function () {
      var $parentElm = $(this).parents(".qtySelector");
      $(this).addClass("clicked");
      setTimeout(function () {
        $(".clicked").removeClass("clicked");
      }, 100);
      var value = $parentElm.find(".qtyValue").val();
      if (value < maxVal) {
        value++;
      }
      $parentElm.find(".qtyValue").val(value);
    });
    $(".decreaseQty").on('click', function () {
      var $parentElm = $(this).parents(".qtySelector");
      $(this).addClass("clicked");
      setTimeout(function () {
        $(".clicked").removeClass("clicked");
      }, 100);
      var value = $parentElm.find(".qtyValue").val();
      if (value > 1) {
        value--;
      }
      $parentElm.find(".qtyValue").val(value);
    });

  });

});

// --- custom plugin
"use strict";
document.addEventListener("DOMContentLoaded", function () {
  
  $(function ($) {

    /* niceSelect */
    if(document.querySelector('select')){
      $("select").niceSelect();
    }

    /* Magnific Popup video */
    if (document.querySelector('.popupvideo') !== null) {
      $('.popupvideo').magnificPopup({
        disableOn: 300,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
      });
    }

    // // game-carousel
    // $(".game-carousel").not('.slick-initialized').slick({
    //   infinite: true,
    //   autoplay: true,
    //   centerMode: false,
    //   centerPadding: "0px 50px",
    //   focusOnSelect: false,
    //   speed: 500,
    //   slidesToShow: 2,
    //   slidesToScroll: 1,
    //   arrows: true,
    //   prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
    //   nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
    //   dots: false,
    //   dotsClass: 'section-dots',
    //   customPaging: function (slider, i) {
    //     var slideNumber = (i + 1),
    //       totalSlides = slider.slideCount;
    //     return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
    //   },
    // });

    // Odometer
    $(".odometer").each(function () {
      $(this).isInViewport(function (status) {
        if (status === "entered") {
          var section = $(this).closest(".counters");
          section.find(".odometer").each(function() {
            $(this).html($(this).attr("data-odometer-final"));
          });
        }
      });
    });

    // team-carousel
    const slidesShowTeam = 4;
    $(".team-carousel").not('.slick-initialized').slick({
      infinite: false,
      autoplay: false,
      centerMode: false,
      centerPadding: "60px",
      focusOnSelect: false,
      speed: 500,
      slidesToShow: slidesShowTeam,
      slidesToScroll: 1,
      arrows: false,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: false,
      dotsClass: 'section-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
        return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            centerPadding: "30px",
            infinite: true,
            autoplay: true,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            arrows: false,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            arrows: false,
          }
        },
      ]
    });
    const teamSlider = $(".team-carousel");
    var scrollCount = null;
    var scroll = null;
    teamSlider.on('wheel', function (e) {
        e.preventDefault();
        clearTimeout(scroll);
        scroll = setTimeout(function () { scrollCount = 0; }, 200);
        if (scrollCount) return 0;
        scrollCount = 1;
        const delta = e.originalEvent.deltaY;
        const sliderElement = $(this);
        const slideCount = sliderElement.slick('getSlick').slideCount;
        const currentSlide = sliderElement.slick('slickCurrentSlide');
        const isLastSlide = currentSlide === slideCount - slidesShowTeam;
        const isFirstSlide = currentSlide === 0;
        if(isLastSlide && delta > 0){
            window.scrollBy(0, 100);
        }else if (isFirstSlide && delta < 0) {
            window.scrollBy(0, -100);
        }else {
            if (delta < 0) {
                sliderElement.slick('slickPrev');
            } else {
                sliderElement.slick('slickNext');
            }
        }
    });

    // services-carousel

    // Other Services-carousel
    $(".other-services-carousel").not('.slick-initialized').slick({
      infinite: true,
      autoplay: true,
      centerMode: false,
      centerPadding: "0",
      focusOnSelect: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style top-right pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style top-right pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: false,
      dotsClass: 'section-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
        return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            arrows: false,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            arrows: false,
          }
        }
      ]
    });

    // related-products-carousel
    $(".related-products-carousel").not('.slick-initialized').slick({
      infinite: true,
      autoplay: true,
      centerMode: true,
      centerPadding: "0",
      focusOnSelect: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style top-right pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style top-right pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: false,
      dotsClass: 'section-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
        return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            arrows: false,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            arrows: false,
          }
        }
      ]
    });

    // shop-carousel
    $(".slider-for").not('.slick-initialized').slick({
      infinite: false,
      autoplay: true,
      centerMode: false,
      centerPadding: "0px 50px",
      focusOnSelect: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav',
      arrows: false,
      prevArrow: "<button type='button' class='arafat-prev cmn-btn pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>chevron_left</i></button>",
      nextArrow: "<button type='button' class='arafat-next cmn-btn pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>chevron_left</i></button>",
      dots: false,
      dotsClass: 'section-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
        return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
      },
    });
    $(".slider-nav").not('.slick-initialized').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      arrows: true,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      centerMode: true,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            arrows: false,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            arrows: false,
          }
        },
      ]
    });

    // testimonials
    $(".testimonials-carousel").not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      fade: true,
      infinite: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      arrows: true,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style bottom-right pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style bottom-right pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: true,
      dotsClass: 'slick-double-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
          return '<div class="dots" title="' + slideNumber + ' of ' + totalSlides + '"></div><a class="progressBar fs-five" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '</span><span class="totalString">' +totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 575,
          settings: {
            arrows: false,
          }
        },
      ]
    });

    // customers
    $(".customers-carousel").not('.slick-initialized').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 700,
      fade: false,
      infinite: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      arrows: false,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style bottom-right pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style bottom-right pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: false,
      dotsClass: 'slick-double-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
          return '<div class="dots" title="' + slideNumber + ' of ' + totalSlides + '"></div><a class="progressBar fs-five" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '</span><span class="totalString">' +totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    });

    // fundamental-carousel
    $(".fundamental-carousel").not('.slick-initialized').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      fade: false,
      infinite: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      arrows: false,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style bottom-right pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style bottom-right pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: false,
      dotsClass: 'slick-double-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
          return '<div class="dots" title="' + slideNumber + ' of ' + totalSlides + '"></div><a class="progressBar fs-five" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '</span><span class="totalString">' +totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    });

    // recently-completed
    $(".recently-completed-carousel").not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      fade: true,
      infinite: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      arrows: false,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style bottom-right pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style bottom-right pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: true,
      dotsClass: 'slick-double-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
          return '<div class="dots" title="' + slideNumber + ' of ' + totalSlides + '"></div><a class="progressBar fs-five" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '</span><span class="totalString">' +totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 575,
          settings: {
            arrows: false,
          }
        },
      ]
    });

    // gaming-character
    $(".gaming-character-carousel").not('.slick-initialized').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      fade: false,
      infinite: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      arrows: true,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style bottom-right pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style bottom-right pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: true,
      dotsClass: 'section-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
        return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          }
        },
      ]
    });

    // gallery
    $(".gallery-carousel").not('.slick-initialized').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: false,
      autoplay: true,
      variableWidth: true,
      autoplaySpeed: 1000,
      fade: false,
      infinite: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      arrows: true,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style bottom-right pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style bottom-right pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: true,
      dotsClass: 'section-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
        return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerMode: true,
          }
        },
      ]
    });

    // our-story
    $(".our-story-carousel").not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      fade: false,
      infinite: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      arrows: true,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style bottom-right pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style bottom-right pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: true,
      dotsClass: 'section-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
        return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
      },
    });

    // ongoing-values
    $(".ongoing-values-carousel").not('.slick-initialized').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      centerMode: true,
      autoplay: true,
      variableWidth: true,
      autoplaySpeed: 1000,
      fade: false,
      infinite: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      arrows: true,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style bottom-right pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style bottom-right pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: true,
      dotsClass: 'section-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
        return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerMode: true,
          }
        },
      ]
    });

    // we-offer-carousel
    $(".we-offer-carousel").not('.slick-initialized').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      centerMode: true,
      autoplay: true,
      variableWidth: true,
      autoplaySpeed: 1000,
      fade: false,
      infinite: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      arrows: false,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style bottom-right pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style bottom-right pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: false,
      dotsClass: 'section-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
        return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerMode: true,
          }
        },
      ]
    });

    // testimonial-character
    $(".testimonial-sec-carousel").not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      fade: false,
      infinite: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      arrows: false,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style bottom-right pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style bottom-right pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: false,
      dotsClass: 'section-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
        return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 575,
          settings: {
            arrows: false,
          }
        },
      ]
    });

    // testimonial-character
    $(".instagram-post-carousel").not('.slick-initialized').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      centerMode: true,
      customPaging: "80px",
      fade: false,
      infinite: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      arrows: false,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style bottom-right pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style bottom-right pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: false,
      dotsClass: 'section-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
        return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    });

    /* Wow js */
    new WOW().init();

  });
  
});