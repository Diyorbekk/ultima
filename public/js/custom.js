$(function () {
    "use strict";

    // Preloader
    var loader = $(".loader");
    var wHeight = $(window).height();
    var wWidth = $(window).width();
    var o = 0;
    loader.css({
        top: wHeight / 2 - 2.5,
        left: wWidth / 2 - 200
    })
    do {
        loader.animate({
            width: o
        }, 10)
        o += 3;
    } while (o <= 400)
    if (o === 402) {
        loader.animate({
            left: 0,
            width: '100%'
        })
        loader.animate({
            top: '0',
            height: '100vh'
        })
    }
    setTimeout(function () {
        $(".loader-wrapper").fadeOut('fast');
        (loader).fadeOut('fast');
    }, 3500);



    // Close navbar-collapse when a  clicked
    $(".navbar-nav .dropdown-item a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    // Sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    //  YouTubePopUp
    $("a.vid").YouTubePopUp();

});

// Preloader page


// Accordion Box
/*if ($(".accordion-box").length) {
    $(".accordion-box").on("click", ".acc-btn", function () {
        var outerBox = $(this).parents(".accordion-box");
        var target = $(this).parents(".accordion");

        if ($(this).next(".acc-content").is(":visible")) {
            //return false;
            $(this).removeClass("active");
            $(this).next(".acc-content").slideUp(300);
            $(outerBox).children(".accordion").removeClass("active-block");
        } else {
            $(outerBox).find(".accordion .acc-btn").removeClass("active");
            $(this).addClass("active");
            $(outerBox).children(".accordion").removeClass("active-block");
            $(outerBox).find(".accordion").children(".acc-content").slideUp(300);
            target.addClass("active-block");
            $(this).next(".acc-content").slideDown(300);
        }
    });
}*/


$(document).ready(function () {
    Pace.on('done', function() {
        $('#preloader').delay(500).fadeOut(800);
    });
    // Main footer
    var footer = $("footer").outerHeight();
    $("main").css("marginBottom", footer);


    // Navbar scrolling background
    var wind = $(window);

    wind.on("scroll", function () {
        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            logo = $(".navbar .logo> img");
        if (bodyScroll > 100) {
            navbar.addClass("nav-scroll");
        } else {
            navbar.removeClass("nav-scroll");
        }
    });

    // Close navbar-collapse when a  clicked
    $(".navbar-nav .dropdown-item a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    // Sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
});

// ScrollIt
$.scrollIt({
    upKey: 38,                // key code to navigate to the next section
    downKey: 40,              // key code to navigate to the previous section
    easing: 'swing',          // the easing function for animation
    scrollTime: 600,          // how long (in ms) the animation takes
    activeClass: 'active',    // class given to the active nav element
    onPageChange: null,       // function(pageIndex) that is called when page is changed
    topOffset: -90            // offste (in px) for fixed top navigation
});

$.scrollActive({
    upKey: 38,                // key code to navigate to the next section
    downKey: 40,              // key code to navigate to the previous section
    easing: 'swing',          // the easing function for animation
    scrollTime: 600,          // how long (in ms) the animation takes
    activeClass: 'fadeInUp animated',    // class given to the active nav element
    onPageChange: null,       // function(pageIndex) that is called when page is changed
    topOffset: -300            // offste (in px) for fixed top navigation
});

