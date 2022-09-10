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

    $('.event-ctrl-views').each(function() {
        if ($(window).width() < 1200) {
            if ($('.event-ctrl-views a.active').attr('data-viewclass') == 'event-photos-view-3' || $('.event-ctrl-views a.active').attr('data-viewclass') == 'event-photos-view-4') {
                $('.event-ctrl-views a.active').removeClass('active');
                $('.event-ctrl-views a').eq(0).addClass('active');
            }
        }
    });

    $('.event-ctrl-views a.active').each(function(e) {
        var curLink = $(this);
        $('.event-photos').removeClass($('.event-ctrl-views a.active').attr('data-viewclass'));
        $('.event-ctrl-views a.active').removeClass('active');
        curLink.addClass('active');
        $('.event-photos').addClass(curLink.attr('data-viewclass'));
        $grid.masonry('layout');
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
                                            '<div class="window-photo-slider-list-item-header" data-download="' + curGalleryItem.find('.event-photos-item-download').attr('href') + '">' +
                                                '<a href="' + curGalleryItem.find('.event-photos-item-favorite').attr('href') + '" class="window-photo-item-favorite' + favoriteActive + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favorite"></use></svg><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favorite-active"></use></svg></a>' +
                                                '<a href="' + curGalleryItem.find('.event-photos-item-email').attr('href') + '" class="window-photo-item-email window-link"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-email"></use></svg></a>' +
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
            $('.window-photo-download').attr('href', $('.window-photo-slider-list-item').eq(currentSlide).find('.window-photo-slider-list-item-header').attr('data-download'));
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
        var curLimit = 0;
        if (curSlider.find('.filter-slider-limit').length == 1 && (Number(curSlider.find('.filter-slider-max').html()) >= Number(curSlider.find('.filter-slider-limit').html()))) {
            curLimit = [0, Number(curSlider.find('.filter-slider-max').html()) - Number(curSlider.find('.filter-slider-limit').html())];
        }
        noUiSlider.create(curRange, {
            start: [curStartFrom, curStartTo],
            connect: true,
            padding: curLimit,
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
        curRange.noUiSlider.on('set', function(values, handle) {
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
            $('html, body').animate({'scrollTop': $('.filter').offset().top - $('header').outerHeight()});
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

    $('body').on('click', '.window-link', function(e) {
        if ($(this).hasClass('form-files-list-item-edit')) {
            $('.form-files-list-item-edit.editable').removeClass('editable');
            $(this).addClass('editable');
        }
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').on('click', '.form-files-list-item-remove', function(e) {
        var curLink = $(this);
        var curFiles = curLink.parents().filter('.form-files');
        $.ajax({
            type: 'GET',
            url: curLink.attr('href'),
            dataType: 'json',
            cache: false
        }).done(function(data) {
            curLink.parent().remove();
            if (curFiles.find('.form-files-list-item-progress, .form-files-list-item').length == 0) {
                curFiles.removeClass('full');
            }
            formFilesSort(curFiles);
        });
        e.preventDefault();
    });

    $('body').on('click', '.form-files-list-item-cancel', function(e) {
        var curLink = $(this);
        var curFiles = curLink.parents().filter('.form-files');
        curLink.parent().remove();
        if (curFiles.find('.form-files-list-item-progress, .form-files-list-item').length == 0) {
            curFiles.removeClass('full');
        }
        formFilesSort(curFiles);
        e.preventDefault();
    });

    $(document).bind('drop dragover', function (e) {
        e.preventDefault();
    });

    $(document).bind('dragover', function (e) {
        var dropZones = $('.form-files-dropzone'),
            timeout = window.dropZoneTimeout;
        if (timeout) {
            clearTimeout(timeout);
        } else {
            dropZones.addClass('in');
        }
        var hoveredDropZone = $(e.target).closest(dropZones);
        dropZones.not(hoveredDropZone).removeClass('hover');
        hoveredDropZone.addClass('hover');
        window.dropZoneTimeout = setTimeout(function () {
            window.dropZoneTimeout = null;
            dropZones.removeClass('in hover');
        }, 100);
    });

    $('body').on('click', '.form-files-dropzone', function(e) {
        var curLink = $(this);
        var curFiles = $(this).parents().filter('.form-files');
        curFiles.find('.form-files-input input').click();
        e.preventDefault();
    });

    $.validator.addMethod('inputDate',
        function(curDate, element) {
            if (this.optional(element) && curDate == '') {
                return true;
            } else {
                if (curDate.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
                    return true;
                } else {
                    $.validator.messages['inputDate'] = 'Дата введена некорректно';
                    return false;
                }
            }
        },
        ''
    );

    $.validator.addMethod('inputTime',
        function(curTime, element) {
            if (this.optional(element) && curTime == '') {
                return true;
            } else {
                if (curTime.match(/^[0-9]{2}\:[0-9]{2}$/)) {
                    return true;
                } else {
                    $.validator.messages['inputTime'] = 'Время введено некорректно';
                    return false;
                }
            }
        },
        ''
    );

    $('body').on('focus', '.form-input input, .form-input textarea', function() {
        $(this).parent().addClass('focus');
    });

    $('body').on('blur', '.form-input input, .form-input textarea', function() {
        $(this).parent().removeClass('focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        } else {
            $(this).parent().removeClass('full');
        }
    });

    $('body').on('input', '.form-input textarea', function() {
        this.style.height = (this.scrollHeight) + 'px';
    });

	$('body').on('click', '.form-input-clear', function(e) {
		$(this).parent().find('input').val('').trigger('change').trigger('blur');
		e.preventDefault();
	});

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.view-password', function(e) {
        var curField = $(this).parent();
        curField.toggleClass('viewed');
        if (curField.hasClass('viewed')) {
            curField.find('input').attr('type', 'text');
        } else {
            curField.find('input').attr('type', 'password');
        }
        e.preventDefault();
    });

    $('body').on('click', '.btn-print', function(e) {
        window.print();
        e.preventDefault();
    });

    $('.tabs').each(function() {
        var curTabs = $(this);
        var newHTML = '<ul>';
        curTabs.find('.tabs-content').each(function() {
            var curTab = $(this);
            newHTML += '<li><a href="#">' + curTab.attr('data-title') + '</a></li>';
            if (curTabs.hasClass('tabs-with-titles')) {
                curTab.wrapInner('<div class="tabs-content-inner"></div>')
                curTab.prepend('<div class="tabs-content-title"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#tabs-content-title"></use></svg>' + curTab.attr('data-title') + '</div>');
            }
        });
        newHTML += '</ul>';
        curTabs.find('.tabs-menu').html(newHTML);
        curTabs.find('.tabs-menu li').eq(0).addClass('active');
    });

    $('body').on('click', '.tabs-menu a', function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            var curTabs = curItem.parents().filter('.tabs');
            curTabs.find('.tabs-menu li.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = curTabs.find('.tabs-menu li').index(curItem);
            curTabs.find('.tabs-content.active').removeClass('active');
            curTabs.find('.tabs-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $('.lk-events-header .btn-filter').click(function(e) {
        $('html').toggleClass('lk-events-filter-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if (
            $(e.target).parents().filter('.lk-events-header-ctrl').length == 0 &&
            $(e.target).parents().filter('.datepicker--cell').length == 0 && !$(e.target).hasClass('datepicker--cell') &&
            $(e.target).parents().filter('.datepicker--cells').length == 0 && !$(e.target).hasClass('datepicker--cells') &&
            $(e.target).parents().filter('.datepicker--day-name').length == 0 && !$(e.target).hasClass('datepicker--day-name') &&
            $(e.target).parents().filter('.datepicker--days-names').length == 0 && !$(e.target).hasClass('datepicker--days-names') &&
            $(e.target).parents().filter('.datepicker--days').length == 0 && !$(e.target).hasClass('datepicker--days') &&
            $(e.target).parents().filter('.datepicker--content').length == 0 && !$(e.target).hasClass('datepicker--content') &&
            $(e.target).parents().filter('.datepicker--nav-action').length == 0 && !$(e.target).hasClass('datepicker--nav-action') &&
            $(e.target).parents().filter('.datepicker--nav-title').length == 0 && !$(e.target).hasClass('datepicker--nav-title') &&
            $(e.target).parents().filter('.datepicker--nav').length == 0 && !$(e.target).hasClass('datepicker--nav') &&
            $(e.target).parents().filter('.datepicker--pointer').length == 0 && !$(e.target).hasClass('datepicker--pointer') &&
            $(e.target).parents().filter('.datepicker').length == 0 && !$(e.target).hasClass('datepicker')
        ) {
            $('html').removeClass('lk-events-filter-open');
        }
    });

    $('.lk-events-header-filter-tags-current').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.lk-events-header-filter-tags').length == 0) {
            $('.lk-events-header-filter-tags').removeClass('open');
        }
    });

    $('.lk-events-header-filter-tags-list input').change(function() {
        var newHTML = '';
        $('.lk-events-header-filter-tags-list input:checked').each(function() {
            newHTML += '<div class="lk-events-header-filter-tags-selected-item">#' + $(this).parent().find('span').html() + '</div>';
        });
        $('.lk-events-header-filter-tags-selected').html(newHTML);
    });

    $('.lk-events-header-filter-tags-list').each(function() {
        var newHTML = '';
        $('.lk-events-header-filter-tags-list input:checked').each(function() {
            newHTML += '<div class="lk-events-header-filter-tags-selected-item">#' + $(this).parent().find('span').html() + '</div>';
        });
        $('.lk-events-header-filter-tags-selected').html(newHTML);
    });

    $('.lk-events-header-filter-reset button').click(function(e) {
        $('.form-input input').val('');
        $('.lk-events-header-filter-tags-list input').prop('checked', false);
        $('.lk-events-header-filter-tags-selected').html('');
        e.preventDefault();
    });

    $('.form-files').each(function() {
        var curFiles = $(this);
        curFiles.find('.form-files-list').sortable({
            handle: '.form-files-list-item-move',
            stop: function(event, ui) {
                formFilesSort(curFiles);
            }
        });
    });

    $('.lk-events-header-filter form').each(function() {
        var curForm = $(this);
        var validator = curForm.validate();
        if (validator) {
            validator.destroy();
        }
        curForm.find('.form-input input').attr('autocomplete', 'off');
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                var curOption = 0;
                curForm.find('.form-input input').each(function() {
                    if ($(this).val() != '') {
                        curOption++;
                    }
                });
                curOption += curForm.find('.lk-events-header-filter-tags-list input:checked').length;
                $('.btn-filter span').remove();
                if (curOption > 0) {
                    $('.btn-filter').append('<span>' + curOption + '</span>');
                }
                updateLKEvents();
            }
        });
    });

    $('.lk-events-wrap .page-size-select-item label input').change(function() {
        updateLKEvents();
    });

    $('body').on('click', '.lk-events-wrap .paging .pager a', function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.paging .pager a.active').removeClass('active');
            curLink.addClass('active');
            updateLKEvents();
            $('html, body').animate({'scrollTop': $('.lk-events-header').offset().top - $('header').outerHeight()});
        }
        e.preventDefault();
    });

    $('body').on('click', '.lk-events-item-photos-item', function(e) {
        var curLink = $(this);
        var curItem = curLink;
        var curGallery = curItem.parents().filter('.lk-events-item-photos');
        var curIndex = curGallery.find('.lk-events-item-photos-item').index(curItem);

        $('.wrapper').data('curScroll', $(window).scrollTop());
        $('html').addClass('window-photo-open');

        var windowHTML =    '<div class="window-photo">';

        windowHTML +=           '<div class="window-photo-preview">' +
                                    '<div class="window-photo-preview-inner">' +
                                        '<div class="window-photo-preview-list">';

        var galleryLength = curGallery.find('.lk-events-item-photos-item').length;
        for (var i = 0; i < galleryLength; i++) {
            var curTitle = '';
            var curGalleryItem = curGallery.find('.lk-events-item-photos-item').eq(i);
            windowHTML +=                   '<div class="window-photo-preview-list-item"><a href="#" style="' + curGalleryItem.find('.lk-events-item-photos-item-inner').attr('style') + '"></a></div>';
        }
        windowHTML +=                   '</div>' +
                                    '</div>' +
                                '</div>';

        windowHTML +=           '<a href="#" class="window-photo-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-close"></use></svg></a>';

        windowHTML +=           '<div class="window-photo-slider">' +
                                    '<div class="window-photo-slider-list">';

        for (var i = 0; i < galleryLength; i++) {
            var curGalleryItem = curGallery.find('.lk-events-item-photos-item').eq(i);
            windowHTML +=               '<div class="window-photo-slider-list-item">' +
                                            '<div class="window-photo-slider-list-item-inner"><img src="' + pathTemplate + 'images/loading.gif" data-src="' + curGalleryItem.attr('href') + '" alt="" /></div>' +
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
            var curHeight = $('.window-photo').height();
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

function updateLKEvents() {
    $('.lk-events-wrap').addClass('loading');
    var curForm = $('.lk-events-header-filter form');
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
        $('.lk-events').html($(html).find('.lk-events').html())
        $('.paging .pager').html($(html).find('.pager').html())
        $('.lk-events-wrap').removeClass('loading');
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

$(window).on('load resize', function() {
    $('.window-photo').each(function() {
        var curMaxHeight = 0;
        $('.window-photo-slider-list-item').each(function() {
            var curWindowItem = $(this);
            var curHeight = $('.window-photo').height() - curWindowItem.find('.window-photo-slider-list-item-data').outerHeight() - curWindowItem.find('.window-photo-slider-list-item-header').outerHeight();
            if (curMaxHeight < curHeight) {
                curMaxHeight = curHeight;
            }
            curWindowItem.find('.window-photo-slider-list-item-inner').css({'height': curHeight + 'px', 'line-height': curHeight + 'px'});
        });

        $('.window-photo-slider-list .slick-prev, .window-photo-slider-list .slick-next').css({'top': curMaxHeight / 2 + $('.window-photo-slider-list-item-header').eq(0).height()});
    });

    $('.filter-tags').each(function() {
        $('.filter-tags-list label').addClass('hidden');
        $('.filter-tags').removeClass('open');
        $('.filter-tags-more').removeClass('visible');
        var isOut = false;
        $('.filter-tags-list label').each(function() {
            if (!isOut) {
                var curLabel = $(this);
                curLabel.removeClass('hidden');
                if ($('.filter-tags').outerHeight() > curLabel.outerHeight(true) * 2) {
                    curLabel.addClass('hidden');
                    curLabel.prev().addClass('hidden');
                    $('.filter-tags-more').addClass('visible');
                    isOut = true;
                }
            }
        });
    });

});

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
    } else {
        $('.window').append('<div class="window-loading"></div>')
        $('.window-container').addClass('window-container-preload');
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }

        window.setTimeout(function() {
            $('.window-container-preload').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));
        });

        $(window).trigger('resize');
    });
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $(window).scrollTop($('.wrapper').data('curScroll'));
    }
}

function formFilesSort(curFiles) {
    var results = [];
    for (var i = 0; i < curFiles.find('.form-files-list-item').length; i++) {
        var curItem = curFiles.find('.form-files-list-item').eq(i);
        results.push(curItem.attr('data-id'));
    }
    curFiles.find('.form-files-sort').val(JSON.stringify(results));
}

function initForm(curForm) {
    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-input input:focus, .form-input textarea:focus').each(function() {
        $(this).trigger('focus');
    });

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
    });

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 20
        }

        if ($(window).width() > 1119) {
            options['dropdownAutoWidth'] = false;
        }

        if (curSelect.parents().filter('.window').length == 1) {
            options['dropdownParent'] = $('.window-content');
        }

        curSelect.select2(options);

        curSelect.parent().find('.select2-container').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.parent().find('.select2-selection').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.on('select2:select', function(e) {
            $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
            if (typeof curSelect.attr('multiple') !== 'undefined') {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full-multiple');
            }
            curSelect.parent().find('select.error').removeClass('error');
            curSelect.parent().find('label.error').remove();
        });

        curSelect.on('select2:unselect', function(e) {
            if (curSelect.find('option:selected').length == 0) {
                curSelect.parent().find('.select2-container').removeClass('select2-container--full select2-container--full-multiple');
            }
        });

        if (curSelect.val() != '' && curSelect.val() !== null) {
            curSelect.trigger({type: 'select2:select'})
            curSelect.parent().find('.select2-container').addClass('select2-container--full');
            if (typeof curSelect.attr('multiple') !== 'undefined') {
                curSelect.parent().find('.select2-container').addClass('select2-container--full-multiple');
            }
        }
    });

    curForm.find('.form-files').each(function() {
        var curFiles = $(this);
        var curInput = curFiles.find('.form-files-input input');

        if (curFiles.find('.form-files-list .form-files-list-item').length > 0) {
            curFiles.addClass('full');
            formFilesSort(curFiles);
        }

        var uploadURL = curInput.attr('data-uploadurl');
        var uploadFiles = curInput.attr('data-uploadfiles');
        var removeURL = curInput.attr('data-removeurl');
        curInput.fileupload({
            url: uploadURL,
            dataType: 'json',
            dropZone: curFiles.find('.form-files-dropzone'),
            pasteZone: curFiles.find('.form-files-dropzone'),
            add: function(e, data) {
                data.context = curFiles.find('.form-files-list').append('<div class="form-files-list-item-progress" data-id=""><div class="progress"><div class="progress-inner"></div></div><div class="form-files-list-item-move"></div><span class="form-files-list-item-cancel"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#file-remove"></use></svg></span></div>');
                data.submit();
                curFiles.addClass('full');
                formFilesSort(curFiles);
            },
            done: function(e, data) {
                curFiles.find('.form-files-list-item-progress').eq(0).remove();
                if (data.result.status == 'success') {
                    var svgID = '#file-remove';
                    if (curFiles.hasClass('form-files-cover')) {
                        svgID = '#file-remove-cover';
                    }
                    curFiles.find('.form-files-list').append('<div class="form-files-list-item" data-id="' + data.result.id + '" style="background-image:url(\'' + data.result.url + '\')"><div class="form-files-list-item-move"></div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg' + svgID + '"></use></svg></a><a href="' + data.result.urledit + '" class="form-files-list-item-edit window-link"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#file-edit"></use></svg></a></div>');
                } else {
                    curFiles.find('.form-files-list').append('<div class="form-files-list-item error" data-id=""><div class="form-files-list-item-move"></div><div class="form-files-list-item-name">' + data.result.text + '</div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#file-remove"></use></svg></a></div>');
                }
                curFiles.addClass('full');
                formFilesSort(curFiles);
            },
            progress: function(e, data){
                var progress = parseInt(data.loaded / data.total * 100, 10);
                data.context.find('.progress-inner').css(
                    'width', progress + '%'
                );
            }
        });
    });

    curForm.find('.form-input-date input').mask('00.00.0000');
    curForm.find('.form-input-date input').attr('autocomplete', 'off');
    curForm.find('.form-input-date input').addClass('inputDate');

    curForm.find('.form-input-date input').on('keyup', function() {
        var curValue = $(this).val();
        if (curValue.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
            var isCorrectDate = true;
            var userDate = new Date(curValue.substr(6, 4), Number(curValue.substr(3, 2)) - 1, Number(curValue.substr(0, 2)));
            if ($(this).attr('min')) {
                var minDateStr = $(this).attr('min');
                var minDate = new Date(minDateStr.substr(6, 4), Number(minDateStr.substr(3, 2)) - 1, Number(minDateStr.substr(0, 2)));
                if (userDate < minDate) {
                    isCorrectDate = false;
                }
            }
            if ($(this).attr('max')) {
                var maxDateStr = $(this).attr('max');
                var maxDate = new Date(maxDateStr.substr(6, 4), Number(maxDateStr.substr(3, 2)) - 1, Number(maxDateStr.substr(0, 2)));
                if (userDate > maxDate) {
                    isCorrectDate = false;
                }
            }
            if (isCorrectDate) {
                var myDatepicker = $(this).data('datepicker');
                if (myDatepicker) {
                    var curValueArray = curValue.split('.');
                    myDatepicker.selectDate(new Date(Number(curValueArray[2]), Number(curValueArray[1]) - 1, Number(curValueArray[0])));
                    myDatepicker.show();
                    $(this).focus();
                }
            } else {
                $(this).addClass('error');
                return false;
            }
        }
    });

    curForm.find('.form-input-date input').each(function() {
        var minDateText = $(this).attr('min');
        var minDate = null;
        if (typeof (minDateText) != 'undefined') {
            var minDateArray = minDateText.split('.');
            minDate = new Date(Number(minDateArray[2]), Number(minDateArray[1]) - 1, Number(minDateArray[0]));
        }
        var maxDateText = $(this).attr('max');
        var maxDate = null;
        if (typeof (maxDateText) != 'undefined') {
            var maxDateArray = maxDateText.split('.');
            maxDate = new Date(Number(maxDateArray[2]), Number(maxDateArray[1]) - 1, Number(maxDateArray[0]));
        }
        if ($(this).hasClass('maxDate1Year')) {
            var curDate = new Date();
            curDate.setFullYear(curDate.getFullYear() + 1);
            curDate.setDate(curDate.getDate() - 1);
            maxDate = curDate;
            var maxDay = curDate.getDate();
            if (maxDay < 10) {
                maxDay = '0' + maxDay
            }
            var maxMonth = curDate.getMonth() + 1;
            if (maxMonth < 10) {
                maxMonth = '0' + maxMonth
            }
            $(this).attr('max', maxDay + '.' + maxMonth + '.' + curDate.getFullYear());
        }
        var startDate = new Date();
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
            }
        }
        $(this).datepicker({
            language: 'ru',
            prevHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59L11.1249 12L15.7049 7.41Z" /></svg>',
            nextHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z" /></svg>',
            minDate: minDate,
            maxDate: maxDate,
            startDate: startDate,
            toggleSelected: false,
            autoClose: true
        });
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
                $(this).data('datepicker').selectDate(startDate);
            }
        }
    });

    curForm.find('.form-input-time input').mask('00:00');
    curForm.find('.form-input-time input').attr('autocomplete', 'off');
    curForm.find('.form-input-time input').addClass('inputTime');

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);
            if (curForm.hasClass('ajax-form')) {
                if (curForm.hasClass('recaptcha-form')) {
                    grecaptcha.ready(function() {
                        grecaptcha.execute('6LdHSvgcAAAAAHfkqTliNRLNbN8n4oSa0UJfMCU3', {action: 'submit'}).then(function(token) {
                            $.ajax({
                                type: 'POST',
                                url: curForm.attr('data-captchaurl'),
                                dataType: 'json',
                                data: 'recaptcha_response=' + token,
                                cache: false
                            }).fail(function(jqXHR, textStatus, errorThrown) {
                                alert('Сервис временно недоступен, попробуйте позже.' + textStatus);
                                curForm.removeClass('loading');
                            }).done(function(data) {
                                if (data.status) {
                                    curForm.addClass('loading');
                                    var formData = new FormData(form);

                                    $.ajax({
                                        type: 'POST',
                                        url: curForm.attr('action'),
                                        processData: false,
                                        contentType: false,
                                        dataType: 'json',
                                        data: formData,
                                        cache: false
                                    }).done(function(data) {
                                        if (data.status) {
                                            curForm.append('<div class="message message-success"><div class="message-title">' + data.title + '</div><div class="message-text">' + data.message + '</div></div>');
                                        } else {
                                            curForm.append('<div class="message message-error"><div class="message-title">' + data.title + '</div><div class="message-text">' + data.message + '</div></div>');
                                        }
                                        curForm.removeClass('loading');
                                    });
                                } else {
                                    alert('Не пройдена проверка Google reCAPTCHA v3.');
                                    curForm.removeClass('loading');
                                }
                            });
                        });
                    });
                } else {
                    curForm.addClass('loading');
                    var formData = new FormData(form);

                    $.ajax({
                        type: 'POST',
                        url: curForm.attr('action'),
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        data: formData,
                        cache: false
                    }).done(function(data) {
                        curForm.find('.message').remove();
                        if (curForm.parent().hasClass('window-photoedit')) {
                            if (data.status) {
                                $('.form-files-list-item-edit.editable').addClass('edited');
                                $('.form-files-list-item-edit.editable').removeClass('editable');
                                windowClose();
                            } else {
                                curForm.append('<div class="message message-error"><div class="message-title">' + data.title + '</div><div class="message-text">' + data.message + '</div></div>');
                            }
                        } else {
                            if (data.status) {
                                curForm.append('<div class="message message-success"><div class="message-title">' + data.title + '</div><div class="message-text">' + data.message + '</div></div>');
                            } else {
                                curForm.append('<div class="message message-error"><div class="message-title">' + data.title + '</div><div class="message-text">' + data.message + '</div></div>');
                            }
                        }
                        curForm.removeClass('loading');
                    });
                }
            } else if (curForm.hasClass('window-form')) {
                if (curForm.hasClass('recaptcha-form')) {
                    curForm.addClass('loading');
                    grecaptcha.ready(function() {
                        grecaptcha.execute('6LdHSvgcAAAAAHfkqTliNRLNbN8n4oSa0UJfMCU3', {action: 'submit'}).then(function(token) {
                            $.ajax({
                                type: 'POST',
                                url: curForm.attr('data-captchaurl'),
                                dataType: 'json',
                                data: 'recaptcha_response=' + token,
                                cache: false
                            }).fail(function(jqXHR, textStatus, errorThrown) {
                                alert('Сервис временно недоступен, попробуйте позже.' + textStatus);
                                curForm.removeClass('loading');
                            }).done(function(data) {
                                if (data.status) {
                                    var formData = new FormData(form);

                                    if (curForm.find('[type=file]').length != 0) {
                                        var file = curForm.find('[type=file]')[0].files[0];
                                        formData.append('file', file);
                                    }

                                    windowOpen(curForm.attr('action'), formData);
                                } else {
                                    alert('Не пройдена проверка Google reCAPTCHA v3.');
                                }
                                curForm.removeClass('loading');
                            });
                        });
                    });
                } else {
                    var formData = new FormData(form);

                    if (curForm.find('[type=file]').length != 0) {
                        var file = curForm.find('[type=file]')[0].files[0];
                        formData.append('file', file);
                    }

                    windowOpen(curForm.attr('action'), formData);
                }
            } else if (curForm.hasClass('recaptcha-form')) {
                grecaptcha.ready(function() {
                    grecaptcha.execute('6LdHSvgcAAAAAHfkqTliNRLNbN8n4oSa0UJfMCU3', {action: 'submit'}).then(function(token) {
                        $.ajax({
                            type: 'POST',
                            url: curForm.attr('data-captchaurl'),
                            dataType: 'json',
                            data: 'recaptcha_response=' + token,
                            cache: false
                        }).fail(function(jqXHR, textStatus, errorThrown) {
                            alert('Сервис временно недоступен, попробуйте позже.' + textStatus);
                        }).done(function(data) {
                            if (data.status) {
                                form.submit();
                            } else {
                                alert('Не пройдена проверка Google reCAPTCHA v3.');
                            }
                        });
                    });
                });
            } else {
                form.submit();
            }
        }
    });
}

$(window).on('load resize scroll', function() {

    var windowScroll = $(window).scrollTop();
    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    if ($('.up-link').length == 1) {
        if (windowScroll > windowHeight) {
            $('.up-link').addClass('visible');
        } else {
            $('.up-link').removeClass('visible');
        }

        var curOffset = 50;
        if ($(window).width() > 1799) {
            curOffset = 0;
        }
        if (windowScroll + windowHeight > $('footer').offset().top + curOffset) {
            $('.up-link').css({'margin-bottom': (windowScroll + windowHeight) - $('footer').offset().top - curOffset});
        } else {
            $('.up-link').css({'margin-bottom': 0});
        }
    }

    if (windowScroll > 0) {
        $('html').addClass('header-fixed');
    } else {
        $('html').removeClass('header-fixed');
    }

});