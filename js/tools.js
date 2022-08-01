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

    var $grid = $('.event-photos').masonry({
        itemSelector: '.event-photos-item',
        gutter: 0,
        percentPosition: true
    });

    $('.event-ctrl-views a').click(function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.event-photos').removeClass($('.event-ctrl-views a.active').attr('data-viewclass'));
            $('.event-ctrl-views a.active').removeClass('active');
            curLink.addClass('active');
            $('.event-photos').addClass(curLink.attr('data-viewclass'));
            $grid.masonry('layout');
        }
        e.preventDefault();
    });

    $('.event-photos img').one('load', function() {
         $grid.masonry('layout');
    });

    function popupCenter(url, title) {
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var left = ((width / 2) - (480 / 2)) + dualScreenLeft;
        var top = ((height / 3) - (360 / 3)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + 480 + ', height=' + 360 + ', top=' + top + ', left=' + left);
        if (window.focus) {
            newWindow.focus();
        }
    }

    $('body').on('click', '.window-photo-social-item-vk', function(e) {
        var curTitle = $(this).attr('data-sharetitle');
        var curUrl = encodeURIComponent($(this).attr('data-sharelink'));

        popupCenter('https://vk.com/share.php?url=' + curUrl + '&description=' + curTitle, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.window-photo-social-item-whatsapp', function(e) {
        var curTitle = $(this).attr('data-sharetitle');
        var curUrl = encodeURIComponent($(this).attr('data-sharelink'));

        popupCenter('whatsapp://send?text=' + curUrl);

        e.preventDefault();
    });

    $('body').on('click', '.window-photo-social-item-tg', function(e) {
        var curTitle = $(this).attr('data-sharetitle');
        var curUrl = encodeURIComponent($(this).attr('data-sharelink'));

        popupCenter('https://t.me/share/url?url=' + curUrl + '&text=' + curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.window-photo-social-item-link', function(e) {
        e.preventDefault();
    });

    $('body').on('click', '.event-photos-item-zoom', function(e) {
        var curLink = $(this);
        var curItem = curLink.parents().filter('.event-photos-item');
        var curGallery = curItem.parents().filter('.event-photos');
        var curIndex = curGallery.find('.event-photos-item').index(curItem);

        $('.wrapper').data('curScroll', $(window).scrollTop());
        $('html').addClass('window-photo-open');

        var windowHTML =    '<div class="window-photo">';

        windowHTML +=           '<div class="window-photo-preview">' +
                                    '<div class="window-photo-preview-inner">' +
                                        '<div class="window-photo-preview-list">';

        var galleryLength = curGallery.find('.event-photos-item').length;
        for (var i = 0; i < galleryLength; i++) {
            var curTitle = '';
            var curGalleryItem = curGallery.find('.event-photos-item').eq(i);
            windowHTML +=                   '<div class="window-photo-preview-list-item"><a href="#" style="' + curGalleryItem.find('.event-photos-item-img').attr('style') + '"></a></div>';
        }
        windowHTML +=                   '</div>' +
                                    '</div>' +
                                '</div>';

        windowHTML +=           '<a href="#" class="window-photo-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-close"></use></svg></a>';
        windowHTML +=           '<a href="#" class="window-photo-download" target="_blank" download><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-download"></use></svg></a>';
        windowHTML +=           '<div class="window-photo-social">';
        windowHTML +=               '<div class="window-photo-social-icon"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share"></use></svg></div>';
        windowHTML +=               '<div class="window-photo-social-window">';
        windowHTML +=                   '<a href="#" class="window-photo-social-item window-photo-social-item-vk" data-sharelink="' + curGalleryItem.find('.window-photo-social-item-vk').attr('data-sharelink') + '" data-sharetitle="' + curGalleryItem.find('.window-photo-social-item-vk').attr('data-sharetitle') + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-vk"></use></svg></a>';
        windowHTML +=                   '<a href="#" class="window-photo-social-item window-photo-social-item-whatsapp" data-sharelink="' + curGalleryItem.find('.window-photo-social-item-whatsapp').attr('data-sharelink') + '" data-sharetitle="' + curGalleryItem.find('.window-photo-social-item-whatsapp').attr('data-sharetitle') + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-whatsapp"></use></svg></a>';
        windowHTML +=                   '<a href="#" class="window-photo-social-item window-photo-social-item-tg" data-sharelink="' + curGalleryItem.find('.window-photo-social-item-tg').attr('data-sharelink') + '" data-sharetitle="' + curGalleryItem.find('.window-photo-social-item-tg').attr('data-sharetitle') + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-tg"></use></svg></a>';
        windowHTML +=               '</div>';
        windowHTML +=           '</div>';

        windowHTML +=           '<div class="window-photo-slider">' +
                                    '<div class="window-photo-slider-list">';

        for (var i = 0; i < galleryLength; i++) {
            var curGalleryItem = curGallery.find('.event-photos-item').eq(i);
            var favoriteActive = '';
            if (curGalleryItem.find('.event-photos-item-favorite').hasClass('active')) {
                favoriteActive = ' active';
            }
            windowHTML +=               '<div class="window-photo-slider-list-item">' +
                                            '<div class="window-photo-slider-list-item-header">' +
                                                '<a href="' + curGalleryItem.find('.event-photos-item-favorite').attr('href') + '" class="window-photo-item-favorite' + favoriteActive + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favorite"></use></svg><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favorite-active"></use></svg></a>' +
                                                '<a href="' + curGalleryItem.find('.event-photos-item-email').attr('href') + '" class="window-photo-item-email"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-email"></use></svg></a>' +
                                                '<a href="' + curGalleryItem.find('.event-photos-item-print').attr('href') + '" class="window-photo-item-print"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-print"></use></svg></a>' +
                                            '</div>' +
                                            '<div class="window-photo-slider-list-item-inner"><img src="' + pathTemplate + 'images/loading.gif" data-src="' + curGalleryItem.find('.event-photos-item-zoom').attr('href') + '" alt="" /></div>' +
                                            '<div class="window-photo-slider-list-item-data"><div class="window-photo-slider-list-item-data-id">' + curGalleryItem.find('.event-photos-item-id').html() + '</div>' + curGalleryItem.find('.event-photos-item-data').html() + '</div>' +
                                        '</div>';
        }
        windowHTML +=               '</div>' +
                                '</div>';

        windowHTML +=       '</div>';

        $('.window-photo').remove();
        $('body').append(windowHTML);

        var curMaxHeight = 0;
        $('.window-photo-slider-list-item').each(function() {
            var curWindowItem = $(this);
            var curHeight = $('.window-photo').height() - curWindowItem.find('.window-photo-slider-list-item-data').outerHeight() - curWindowItem.find('.window-photo-slider-list-item-header').outerHeight();
            if (curMaxHeight < curHeight) {
                curMaxHeight = curHeight;
            }
            curWindowItem.find('.window-photo-slider-list-item-inner').css({'height': curHeight + 'px', 'line-height': curHeight + 'px'});
        });

        if ($(window).width() > 1199) {
            $('.window-photo-preview-inner').mCustomScrollbar({
                axis: 'y',
                scrollButtons: {
                    enable: true
                }
            });
        } else {
            $('.window-photo-preview-inner').mCustomScrollbar({
                axis: 'x',
                scrollButtons: {
                    enable: true
                }
            });
        }

        $('.window-photo-slider-list').slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
            dots: false,
            speed: 250,
            initialSlide: curIndex,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        arrows: false
                    }
                }
            ]
        }).on('setPosition', function(event, slick) {
            var currentSlide = $('.window-photo-slider-list').slick('slickCurrentSlide');
            $('.window-photo-preview-list-item.active').removeClass('active');
            $('.window-photo-preview-list-item').eq(currentSlide).addClass('active');

            $('.window-photo-preview-inner').mCustomScrollbar('scrollTo', $('.window-photo-preview-list-item').eq(currentSlide));
            $('.window-photo-download').attr('href', $('.window-photo-slider-list-item').eq(currentSlide).find('img').attr('data-src'));
            var curIMG = $('.window-photo-slider-list-item').eq(currentSlide).find('img');
            if (curIMG.attr('src') !== curIMG.attr('data-src')) {
                var newIMG = $('<img src="" alt="" style="position:fixed; left:-9999px; top:-9999px" />');
                $('body').append(newIMG);
                newIMG.one('load', function(e) {
                    curIMG.attr('src', curIMG.attr('data-src'));
                    newIMG.remove();
                });
                newIMG.attr('src', curIMG.attr('data-src'));
                window.setTimeout(function() {
                    curIMG.attr('src', curIMG.attr('data-src'));
                    if (newIMG) {
                        newIMG.remove();
                    }
                }, 3000);
            }
        });
        $('.window-photo-slider-list .slick-prev, .window-photo-slider-list .slick-next').css({'top': curMaxHeight / 2 + $('.window-photo-slider-list-item-header').eq(0).height()});

        e.preventDefault();
    });

    $('body').on('click', '.window-photo-preview-list-item a', function(e) {
        var curIndex = $('.window-photo-preview-list-item').index($(this).parent());
        $('.window-photo-slider-list').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('body').on('click', '.window-photo-close', function(e) {
        $('.window-photo').remove();
        $('html').removeClass('window-photo-open');
        $(window).scrollTop($('.wrapper').data('curScroll'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            if ($('.window-photo').length > 0) {
                $('.window-photo-close').trigger('click');
            }
        }
    });

    $('.filter-slider').each(function() {
        var curSlider = $(this);
        var curRange = curSlider.find('.filter-slider-range-inner')[0];
        var curStartFrom = Number(curSlider.find('.filter-slider-min').html());
        if (Number(curSlider.find('.filter-slider-from').val()) !== 0) {
            curStartFrom = Number(curSlider.find('.filter-slider-from').val());
        }
        var curStartTo = Number(curSlider.find('.filter-slider-max').html());
        if (Number(curSlider.find('.filter-slider-to').val()) !== 0) {
            curStartTo = Number(curSlider.find('.filter-slider-to').val());
        }
        noUiSlider.create(curRange, {
            start: [curStartFrom, curStartTo],
            connect: true,
            range: {
                'min': Number(curSlider.find('.filter-slider-min').html()),
                'max': Number(curSlider.find('.filter-slider-max').html())
            },
            step: Number(curSlider.find('.filter-slider-step').html()),
            keyboardSupport: false,
            format: wNumb({
                decimals: 0
            })
        });
        curRange.noUiSlider.on('update', function(values, handle) {
            if (handle == 0) {
                curSlider.find('.filter-slider-from').val(values[handle]);
            } else {
                curSlider.find('.filter-slider-to').val(values[handle]);
            }
        });
        curRange.noUiSlider.on('change', function(values, handle) {
            $('.filter-dates-mobile-item').removeClass('active from to');
            var fromIndex = Number($('.filter-slider-from').val()) - 1;
            var toIndex = Number($('.filter-slider-to').val());
            for (var i = fromIndex; i < toIndex; i++) {
                $('.filter-dates-mobile-item').eq(i).addClass('active');
            }
            $('.filter-dates-mobile-item').eq(fromIndex).addClass('from');
            $('.filter-dates-mobile-item').eq(toIndex - 1).addClass('to');
            updateDatesCurrent();
            updateEvents();
        });

        var fromIndex = Number($('.filter-slider-from').val()) - 1;
        var toIndex = Number($('.filter-slider-to').val());
        for (var i = fromIndex; i < toIndex; i++) {
            $('.filter-dates-mobile-item').eq(i).addClass('active');
        }
        $('.filter-dates-mobile-item').eq(fromIndex).addClass('from');
        $('.filter-dates-mobile-item').eq(toIndex - 1).addClass('to');
        updateDatesCurrent();
    });

    $('.filter-tags-list input').change(function() {
        var curHTML = '';
        $('.filter-tags-list input:checked').each(function() {
            if (curHTML != '') {
                curHTML += ', ';
            }
            curHTML += $(this).parent().find('span').html();
        });
        if (curHTML != '') {
            $('.filter-tags-current span').html(curHTML);
        } else {
            $('.filter-tags-current span').html($('.filter-tags-current span').attr('data-placeholder'));
        }
        updateEvents();
    });

    $('.filter-tags').each(function() {
        var curHTML = '';
        $('.filter-tags-list input:checked').each(function() {
            if (curHTML != '') {
                curHTML += ', ';
            }
            curHTML += $(this).parent().find('span').html();
        });
        if (curHTML != '') {
            $('.filter-tags-current span').html(curHTML);
        } else {
            $('.filter-tags-current span').html($('.filter-tags-current span').attr('data-placeholder'));
        }
    });

    $('.events-wrap .page-size-select-item label input').change(function() {
        updateEvents();
    });

    $('body').on('click', '.events-wrap .paging .pager a', function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.paging .pager a.active').removeClass('active');
            curLink.addClass('active');
            updateEvents();
        }
        e.preventDefault();
    });

    $('.filter-tags-current').click(function() {
        $(this).parent().toggleClass('mobile-open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.filter-tags').length == 0) {
            $('.filter-tags').removeClass('mobile-open');
        }
    });

    $('.filter-dates-current').click(function() {
        $(this).parent().toggleClass('mobile-open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.filter-dates').length == 0) {
            $('.filter-dates').removeClass('mobile-open');
        }
    });

    var isFirstClick = false;
    $('.filter-dates-mobile-item').click(function() {
        if (isFirstClick) {
            isFirstClick = false;
            $(this).addClass('active to');
            var fromIndex = $('.filter-dates-mobile-item').index($('.filter-dates-mobile-item.active.from'));
            var toIndex = $('.filter-dates-mobile-item').index($('.filter-dates-mobile-item.active.to'));
            if (fromIndex > toIndex) {
                var tmpIndex = toIndex;
                toIndex = fromIndex;
                fromIndex = tmpIndex;
                $('.filter-dates-mobile-item').eq(fromIndex).removeClass('to').addClass('from');
                $('.filter-dates-mobile-item').eq(toIndex).removeClass('from').addClass('to');
            }
            for (var i = fromIndex + 1; i < toIndex; i++) {
                $('.filter-dates-mobile-item').eq(i).addClass('active');
            }
            $('.filter-slider-range-inner')[0].noUiSlider.set([fromIndex + 1, toIndex + 1]);
        } else {
            isFirstClick = true;
            $('.filter-dates-mobile-item').removeClass('from to active');
            $(this).addClass('active from');
        }
        updateDatesCurrent();
    });

    $('body').on('click', '.event-photos-item-favorite', function(e) {
        var curLink = $(this);
        $.ajax({
            type: 'POST',
            url: curLink.attr('href'),
            cache: false
        });
        curLink.toggleClass('active');
        e.preventDefault();
    });

    $('body').on('click', '.window-photo-item-favorite', function(e) {
        var curLink = $(this);
        $.ajax({
            type: 'POST',
            url: curLink.attr('href'),
            cache: false
        });
        curLink.toggleClass('active');
        var curIndex = $('.window-photo-item-favorite').index(curLink);
        $('.event-photos-item-favorite').eq(curIndex).toggleClass('active');
        e.preventDefault();
    });

});

function updateEvents() {
    $('.events-wrap').addClass('loading');
    var curForm = $('.filter form');
    var curData = curForm.serialize();
    curData += '&page=' + $('.pager a.active').attr('data-value');
    curData += '&size=' + $('.page-size input:checked').val();
    $.ajax({
        type: 'POST',
        url: curForm.attr('action'),
        dataType: 'html',
        data: curData,
        cache: false
    }).done(function(html) {
        $('.events').html($(html).find('.events').html())
        $('.paging .pager').html($(html).find('.pager').html())
        $('.events-wrap').removeClass('loading');
    });
}

function updateDatesCurrent() {
    if ($('.filter-dates-mobile-item:not(.active)').length == 0) {
        $('.filter-dates-current span').html($('.filter-dates-current span').attr('data-placeholder'));
    } else {
        var curHTML = '';
        $('.filter-dates-mobile-item.from').each(function() {
            curHTML += $(this).html() + ' - ';
        });
        $('.filter-dates-mobile-item.to').each(function() {
            curHTML += $(this).html();
        });
        $('.filter-dates-current span').html(curHTML);
    }
}