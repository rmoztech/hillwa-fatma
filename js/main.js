$(document).ready(function () {

    $('.owl-slider').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        rtl: true,
        items: 1,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
    });
 
    $('.owl-clients, .owl-certificates').owlCarousel({
        loop: true,
        nav: true,
        rtl: true,
        dots: false,
        items: 4,
        autoplay: true,
        autoplayTimeout: 3000,
        navText: [
            '<i class="fa-solid fa-chevron-left"></i>',
            '<i class="fa-solid fa-chevron-right"></i>'
        ],
        navContainer: '.member-custom-nav',
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });
    // AOS.init({
    //     duration: 1500,
    //     once: true,
    // });
});

