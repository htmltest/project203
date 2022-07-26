$(document).ready(function() {

    $('.header-search-link').click(function(e) {
        $('html').addClass('header-search-open');
        e.preventDefault();
    });

    $('.header-search-close').click(function(e) {
        $('html').removeClass('header-search-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('header').length == 0) {
            $('html').removeClass('header-search-open');
        }
    });

    $('.welcome-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnFocus: false,
        pauseOnHover: false,
        arrows: false,
        dots: true,
        adaptiveHeight: true
    });

    $('.filter-tags').each(function() {
        if ($('.filter-tags-list label').length > 16) {
            $('.filter-tags-more').addClass('visible');
        }
    });

    $('.filter-tags-more a').click(function(e) {
        $(this).parent().parent().toggleClass('open');
        e.preventDefault();
    });

    $('.page-size-select-current').click(function() {
        $(this).parent().toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.page-size-select').length == 0) {
            $('.page-size-select').removeClass('open');
        }
    });

    $('.page-size-select-item label input').change(function() {
        var curSelect = $(this).parents().filter('.page-size');
        var curText = '';
        curSelect.find('.page-size-select-item label input:checked').each(function() {
            curText = $(this).parent().find('span').html();
        });
        curSelect.find('.page-size-select-current span').html(curText);
        $('.page-size-select').removeClass('open');
    });

    $('.event-ctrl-views a').click(function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.event-ctrl-views a.active').removeClass('active');
            curLink.addClass('active');
        }
        e.preventDefault();
    });

});