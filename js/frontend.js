(function($) {
    "use strict";
    var $window = $(window);
    var $document = $(document);
    var $body = $('body');

    $.fn.azPopup = function(options) {
        var settings = $.extend({
            cookieTriggerClass: 'setAZPCookie',
            cookieName: 'azpCookie'
        }, options);
        return this.each(function() {
            var self = this,
                    cookieIsSet = document.cookie.indexOf(settings.cookieName) >= 0,
                    currentPath = window.location.pathname,
                    canBeShown = $.inArray(currentPath, settings.hideOnPages) === -1,
                    videoSel = $(self).find('iframe[src*="youtube.com"]'),
                    videoURL = videoSel.attr('src'),
                    pageElements = $('body > *').not('.azPopup, script, style')

            function locationFix(param) {
                if (param === 'center') {
                    $(self).children('.azpWindow').css({
                        'margin': 'auto'
                    });
                } else if ((param === 'bottomCenter') || (param === 'topCenter')) {
                    $(self).children('.azpWindow').css({
                        'margin-left': 'auto',
                        'margin-right': 'auto'
                    });
                } else if ((param === 'right') || (param === 'left')) {
                    $(self).children('.azpWindow').css({
                        'margin-top': 'auto',
                        'margin-bottom': 'auto'
                    });
                }
            }

            var overlaySpeed = 0;
            switch (settings.overlayVisible) {
                case true  :
                    overlaySpeed = parseFloat(settings.overlayAnimationDuration);
                    break;
                case false :
                    overlaySpeed = 0;
                    break;
            }

            function popupStyling() {
                $(self).children('.azpWindow').addClass('animated').css({
                    'box-shadow': settings.popupBoxShadow,
                    'background': settings.popupBackground,
                    '-webkit-animation-duration': settings.popupAnimationDuration + 's',
                    'animation-duration': settings.popupAnimationDuration + 's',
                    '-webkit-animation-delay': overlaySpeed / 2 + 's',
                    'animation-delay': overlaySpeed / 2 + 's'
                });
                if (settings.responsive) {
                    if ($(window).width() <= settings.mobileBreakPoint) {
                        $(self).children('.azpWindow').addClass(settings.mobileLocation).css({
                            'border-radius': settings.mobileRadius,
                            'width': settings.mobileWidth,
                            'height': settings.mobileHeight,
                            'margin': settings.mobileMargin,
                            'padding': settings.mobilePadding
                        })
                        locationFix(settings.mobileLocation);
                    } else {
                        $(self).children('.azpWindow').addClass(settings.popupLocation).css({
                            'border-radius': settings.popupRadius,
                            'width': settings.popupWidth,
                            'height': settings.popupHeight,
                            'margin': settings.popupMargin,
                            'padding': settings.popupPadding
                        })
                        locationFix(settings.popupLocation);
                    }
                } else {
                    $(self).children('.azpWindow').addClass(settings.popupLocation).css({
                        'border-radius': settings.popupRadius,
                        'width': settings.popupWidth,
                        'height': settings.popupHeight,
                        'margin': settings.popupMargin,
                        'padding': settings.popupPadding
                    })
                    locationFix(settings.popupLocation);
                }
            }

            function addEffectClass() {
                $(self).children('.azpOverlay').removeClass('fadeOut').addClass(settings.overlayAnimationEffect);
                $(self).children('.azpWindow').removeClass('fadeOut').addClass(settings.popupAnimationEffect);
            }

            function removeEffectClass() {
                $(self).children('.azpWindow').removeClass(settings.popupAnimationEffect).addClass('fadeOut');
                setTimeout(function() {
                    $(self).children('.azpOverlay').removeClass(settings.overlayAnimationEffect).addClass('fadeOut');
                }, parseFloat(settings.popupAnimationDuration) * 1000 / 2);
            }

            function wrapContent() {
                if (settings.contentAnimation) {
                    if ($(self).find('.azpContent').length === 0) {
                        $(self).children('.azpWindow').children().not('.azpCloseBtn').wrapAll('<div class="azpContent"></div>');
                    }
                }
            }

            function addContentClass() {
                if (settings.contentAnimation) {
                    $(self).find('.azpWindow .azpContent').addClass(settings.contentAnimationEffect + ' ' + 'animated').css({
                        '-webkit-animation-duration': settings.contentAnimationDuration + 's',
                        'animation-duration': settings.contentAnimationDuration + 's',
                        '-webkit-animation-delay': settings.contentAnimationDelay + 's',
                        'animation-delay': settings.contentAnimationDelay + 's'
                    })
                }
            }

            function removeContentClass() {
                if (settings.contentAnimation) {
                    $(self).find('.azpWindow .azpContent').removeClass(settings.contentAnimationEffect);
                }
            }

            function startPageEffects() {
                if (settings.pageAnimationEffect) {
                    pageElements.css({
                        '-webkit-transition-duration': settings.pageAnimationDuration + 's',
                        'transition-duration': settings.pageAnimationDuration + 's'
                    });
                    if (settings.pageAnimationEffect === 'blur') {
                        pageElements.addClass('blurred').css({
                            '-webkit-filter': 'blur' + '(' + settings.pageBlurRadius + ')',
                            'filter': 'blur' + '(' + settings.pageBlurRadius + ')'
                        });
                    } else if (settings.pageAnimationEffect === 'scale') {
                        pageElements.addClass('scaled').css({
                            '-webkit-transform': 'scale' + '(' + settings.pageScaleValue + ')',
                            'transform': 'scale' + '(' + settings.pageScaleValue + ')'
                        });
                    } else if (settings.pageAnimationEffect.indexOf('move') > -1) {
                        var moveDir = settings.pageAnimationEffect;
                        var axis = '';
                        var sign = '';
                        switch (true) {
                            case (moveDir === 'moveUp'):
                                axis = 'Y';
                                sign = '-';
                                break;
                            case (moveDir === 'moveDown'):
                                axis = 'Y';
                                sign = '';
                                break;
                            case (moveDir === 'moveLeft'):
                                axis = 'X';
                                sign = '-';
                                break;
                            case (moveDir === 'moveRight'):
                                axis = 'X';
                                sign = '';
                                break;
                        }
                        pageElements.addClass('moved').css({
                            '-webkit-transform': 'translate' + axis + '(' + sign + '' + parseFloat(settings.pageMoveDistance) + '%)',
                            'transform': 'translate' + axis + '(' + sign + '' + parseFloat(settings.pageMoveDistance) + '%)'
                        });
                    }
                }
            }

            function endPageEffects() {
                if (pageElements.hasClass('blurred') || pageElements.hasClass('scaled') || pageElements.hasClass('moved')) {
                    pageElements.removeClass('blurred scaled moved').css({
                        '-webkit-transform': '',
                        'transform': '',
                        '-webkit-filter': '',
                        'filter': ''
                    });
                }
            }

            function showOverlay() {
                if (settings.overlayVisible) {
                    $(self).prepend('<div class="azpOverlay animated">' + '</div>');
                    if (settings.overlayClosesPopup) {
                        $(self).children('.azpOverlay').addClass('closePopup');
                    }
                    $(self).children('.azpOverlay').css({
                        'background': settings.overlayColor,
                        '-webkit-animation-duration': overlaySpeed + 's',
                        'animation-duration': overlaySpeed + 's'
                    });
                    if (settings.setCookie) {
                        $(self).children('.azpOverlay').addClass(settings.cookieTriggerClass);
                    }
                }
            }

            function appendCloseButton() {
                if (settings.addCloseButton) {
                    $(self).children('.azpWindow').prepend('<div class="azpCloseBtn close closePopup ' + settings.buttonStyle + '">' + '</div>');
                    if (settings.setCookie) {
                        $(self).find('.azpWindow').children('.closePopup').addClass(settings.cookieTriggerClass)
                    }
                }
            }

            function activateESC() {
                if (settings.enableESC) {
                    $(window).off('keydown.azp').on('keydown.azp', function(e) {
                        if (e.keyCode === 27) {
                            disableAZP();
                            if (settings.setCookie) {
                                setAZPCookie();
                            }
                        }
                    });
                }
            }

            function azpOnLoad() {
                if (settings.onAZPLoad !== undefined) {
                    settings.onAZPLoad();
                }
            }

            function azpOnClose() {
                if (settings.onAZPClose !== undefined) {
                    settings.onAZPClose();
                }
            }

            function popupTypes() {
                if (!cookieIsSet && settings.setCookie || !settings.setCookie) {
                    if (settings.popupType === 'delayed') {
                        clearTimeout($(self).data('delay'));
                        var delay = setTimeout(enableAZP, parseFloat(settings.delayTime) * 1000);
                        $(self).data('delay', delay);
                    } else if (settings.popupType === 'exit') {
                        var t = false;
                        $(document).off('mouseleave.azp').on('mouseleave.azp', function(e) {
                            if (e.clientY < 0 && !t) {
                                t = true;
                                enableAZP();
                            }
                        });
                    } else if (settings.popupType === 'scrolled') {
                        var s = false;
                        $(document).off('scroll.azp').on('scroll.azp', function() {
                            var scrollY = $(this).scrollTop();
                            if ((scrollY > settings.scrollTopDistance) && !s) {
                                s = true;
                                enableAZP();
                            }
                        });
                    }
                }
            }

            function videoAutoplay() {
                if ((settings.videoSupport) && (settings.videoAutoPlay)) {
                    if (videoSel.length > 0) {
                        videoSel.attr('src', videoURL + '?autoplay=1');
                    }
                }
            }

            function videoStop() {
                if ((settings.videoSupport) && (settings.videoStopOnClose)) {
                    if (videoSel.length > 0) {
                        videoSel.attr('src', videoURL + '?autoplay=0');
                    }
                }
            }

            function setAZPCookie() {
                var days = settings.cookieDays;
                var CookieDate = new Date();
                CookieDate.setTime(CookieDate.getTime() + (days * 24 * 60 * 60 * 1000));
                var scopeSetting = '';
                switch (settings.cookieScope) {
                    case 'domain':
                        scopeSetting = '/';
                        break;
                    case 'page':
                        scopeSetting = window.location.href;
                        break;
                }
                if (days > 0) {
                    document.cookie = settings.cookieName + '=true; path=' + scopeSetting + '; expires=' + CookieDate.toGMTString();
                } else if (days === 0) {
                    document.cookie = settings.cookieName + '=true; path=' + scopeSetting + ';';
                }
            }

            function cookieTriggers() {
                if (settings.setCookie) {
                    $('.' + settings.cookieTriggerClass).off('click.azp').on('click.azp', function() {
                        setAZPCookie();
                    });
                }
            }

            function autoClosing() {
                if (settings.autoClose) {
                    setTimeout(disableAZP, overlaySpeed * 1000 + settings.autoCloseDelay * 1000);
                    if (settings.setCookie) {
                        setAZPCookie();
                    }
                }
            }

            var views = 0;
            var seconds = 0;
            var clicks = 0;
            var timer = {
                interval: null,
                Start: function() {
                    this.interval = setInterval(function() {
                        seconds += 1;
                    }, 1000);
                },
                Stop: function() {
                    window.clearTimeout(this.interval);
                }
            }
            function countClicks() {
                $(self).find('.azpWindow .' + settings.callToAction).each(function() {
                    $(this).off('click.azp').on('click.azp', function() {
                        clicks = 1;
                        views = 0;
                    });
                });
            }
            function sendStats(views, clicks, seconds) {
                var statsDATA = {
                    id: $(self).attr('id'),
                    name: settings.modalName,
                    summary: settings.modalSummary,
                    click: clicks,
                    impression: views,
                    time: seconds,
                    isAjax: 1,
                    origin: window.location.origin || window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
                };
                $.ajax({
                    url: settings.ajax,
                    type: 'POST',
                    data: JSON.stringify(statsDATA),
                    dataType: 'text',
                    contentType: 'application/json; charset=utf-8',
                    error: function() {
                    }
                });
            }

            function enableAZP() {
                $(self).addClass('isActive');
                startPageEffects();
                addEffectClass();
                addContentClass();
                azpOnLoad();
                videoAutoplay();
                autoClosing();
                if (settings.enableStats) {
                    timer.Start();
                    views = 1;
                    sendStats(views, clicks, seconds);
                }
            }

            function disableAZP() {
                endPageEffects();
                removeEffectClass();
                removeContentClass();
                azpOnClose();
                videoStop();
                if (settings.enableStats) {
                    timer.Stop();
                    views = 0;
                    sendStats(views, clicks, seconds);
                    clicks = 0;
                    seconds = 0;
                }
                setTimeout(function() {
                    $(self).removeClass('isActive');
                }, (overlaySpeed + parseFloat(settings.popupAnimationDuration)) * 1000);
            }


            if (canBeShown) {
                settings.mobileBreakPoint = parseInt(settings.mobileBreakPoint);
                showOverlay();
                appendCloseButton();
                activateESC();
                if (settings.showOnMobile) {
                    popupTypes();
                } else {
                    if ($(window).width() > settings.mobileBreakPoint) {
                        popupTypes();
                    }
                }
                popupStyling();
                cookieTriggers();
                wrapContent();
                if (settings.enableStats) {
                    countClicks();
                }
                $(self).find('.closePopup').off('click.azp').on('click.azp', function() {
                    disableAZP();
                });
                $('.' + settings.reopenClass).off('click.azp').on('click.azp', function() {
                    enableAZP();
                });
            }

        });
    }
    window.azh = $.extend({}, window.azh);
    azh.parse_query_string = function(a) {
        if (a === "") {
            return {};
        }
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length !== 2) {
                continue;
            }
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    };
    $.QueryString = azh.parse_query_string(window.location.search.substr(1).split('&'));
    var customize = ('azh' in $.QueryString && $.QueryString['azh'] === 'customize');
    $window.on('az-frontend-init', function(event, data) {
        function restore_popup($popup) {
            $popup.find('.azpOverlay').remove();
            $popup.find('.closePopup').remove();
            $popup.find('.azpCloseBtn').remove();
            $popup.find('.azpContent').attr('class', 'azpContent').attr('style', '');
            $popup.find('.azpWindow').attr('class', 'azpWindow').attr('style', '');
        }
        function popup_get_params($popup) {
            var options = {
                // Popup type
                popupType: 'none',
                delayTime: 0,
                scrollTopDistance: 400,
                // Auto closing
                autoClose: false,
                autoCloseDelay: 10000,
                // Popup cookies
                setCookie: false,
                cookieDays: 30,
                cookieTriggerClass: 'setCookie',
                cookieName: 'azpPopup',
                cookieScope: 'domain',
                // Overlay styling
                overlayVisible: false,
                overlayClosesPopup: true,
                overlayColor: 'rgba(0, 0, 0, 0.8)',
                overlayAnimationDuration: '0.4',
                overlayAnimationEffect: 'fadeIn',
                // Background effects
                pageAnimationDuration: '0.4',
                pageAnimationEffect: 'none',
                pageBlurRadius: '1px',
                pageScaleValue: '0.9',
                pageMoveDistance: '30%',
                // Popup styling
                popupWidth: '480px',
                popupHeight: 'auto',
                popupLocation: 'bottomRight',
                popupAnimationDuration: '0.4',
                popupAnimationEffect: 'unFold',
                popupBoxShadow: '0 0 20px rgba(0,0,0,0.4)',
                popupBackground: 'rgba(255, 255, 255, 1)',
                popupRadius: '4px',
                popupMargin: '30px',
                popupPadding: '30px',
                // Animate content
                contentAnimation: true,
                contentAnimationEffect: 'slideBottom',
                contentAnimationDuration: '0.4',
                contentAnimationDelay: '0.4',
                // Close and reopen button
                addCloseButton: true,
                buttonStyle: 'icon',
                enableESC: true,
                reopenClass: 'openAZPPopup',
                // Mobile rules
                showOnMobile: true,
                responsive: true,
                mobileBreakPoint: '480px',
                mobileLocation: 'center',
                mobileWidth: '90%',
                mobileHeight: 'auto',
                mobileRadius: '0px',
                mobileMargin: '0px',
                mobilePadding: '24px',
                onAZPLoad: function() {
                    if (customize) {
                        $popup.detach().appendTo($body);
                    }
                },
                onAZPClose: function() {
                    if (customize) {
                        restore_popup($popup);
                        var options = popup_get_params($popup);
                        options['popupType'] = 'none';
                        $popup.detach().appendTo($popup.data('parent'));
                        $popup.azPopup(options);
                    }
                }
            };
            var data_attributes = {
                // Popup type
                popupType: 'none',
                delayTime: 0,
                scrollTopDistance: 400,
                // Auto closing
                autoClose: false,
                autoCloseDelay: 10000,
                // Popup cookies
                setCookie: false,
                cookieDays: 30,
                cookieTriggerClass: 'setCookie',
                cookieName: 'azpPopup',
                cookieScope: 'domain',
                // Overlay styling
                overlayVisible: false,
                overlayClosesPopup: true,
                overlayColor: 'rgba(0, 0, 0, 0.8)',
                overlayAnimationDuration: '0.4',
                overlayAnimationEffect: 'fadeIn',
                // Background effects
                pageAnimationDuration: '0.4',
                pageAnimationEffect: 'none',
                pageBlurRadius: '1px',
                pageScaleValue: '0.9',
                pageMoveDistance: '30%',
                // Popup styling
                popupWidth: '480px',
                popupHeight: '280px',
                popupLocation: 'bottomRight',
                popupAnimationDuration: '0.4',
                popupAnimationEffect: 'unFold',
                popupBoxShadow: '0 0 20px rgba(0,0,0,0.4)',
                popupBackground: 'rgba(255, 255, 255, 1)',
                popupRadius: '4px',
                popupMargin: '30px',
                popupPadding: '30px',
                // Animate content
                contentAnimation: true,
                contentAnimationEffect: 'slideBottom',
                contentAnimationDuration: '0.4',
                contentAnimationDelay: '0.4',
                // Close and reopen button
                addCloseButton: true,
                buttonStyle: 'icon',
                enableESC: true,
                reopenClass: 'openAZPPopup',
                // Mobile rules
                showOnMobile: true,
                responsive: true,
                mobileBreakPoint: '480px',
                mobileLocation: 'center',
                mobileWidth: '90%',
                mobileHeight: '280px',
                mobileRadius: '0px',
                mobileMargin: '0px',
                mobilePadding: '24px'
            };
            for (var key in data_attributes) {
                if (typeof data_attributes[key] === 'object') {
                    for (var k in data_attributes[key]) {
                        var value = $popup.attr('data-' + key + '-' + k);
                        if (typeof value !== typeof undefined) {
                            if (!options[key]) {
                                options[key] = {};
                            }
                            $popup.removeData((key + '-' + k).toLocaleLowerCase());
                            options[key][k] = $popup.data((key + '-' + k).toLocaleLowerCase());
                            switch (typeof data_attributes[key][k]) {
                                case 'number':
                                    options[key][k] = parseInt(options[key][k], 10);
                                    break;
                                case 'boolean':
                                    if (typeof options[key][k] === 'string') {
                                        options[key][k] = options[key][k] === 'true' ? true : false;
                                    } else {
                                        options[key][k] = options[key][k] ? true : false;
                                    }
                                    break;
                            }
                        }
                    }
                } else {
                    var value = $popup.attr('data-' + key);
                    if (typeof value !== typeof undefined) {
                        $popup.removeData(key.toLocaleLowerCase());
                        options[key] = $popup.data(key.toLocaleLowerCase());
                        switch (typeof data_attributes[key]) {
                            case 'number':
                                options[key] = parseInt(options[key], 10);
                                break;
                            case 'boolean':
                                if (typeof options[key] === 'string') {
                                    options[key] = options[key] === 'true' ? true : false;
                                } else {
                                    options[key] = options[key] ? true : false;
                                }
                                break;
                        }
                    }
                }
            }
            return options;
        }
        var $wrapper = data.wrapper;
        $wrapper.find('.az-popup').each(function() {
            var $popup = $(this);
            $popup.data('parent', $popup.parent());
            if (!customize) {
                $popup.detach().appendTo($body);
            }
            $popup.azPopup(popup_get_params($popup));
            $popup.on('azh-change', function() {
                restore_popup($(this));
                $(this).azPopup(popup_get_params($(this)));
            });
        });
        $window.off('azh-before-save.azp').on('azh-before-save.azp', function(event, data) {
            if (data.action === 'azh_save') {
                $body.find('.az-popup').each(function() {
                    var $popup = $(this);
                    $popup.removeClass('isActive');
                    restore_popup($popup);
                    var options = popup_get_params($popup);
                    options['popupType'] = 'none';
                    $popup.detach().appendTo($popup.data('parent'));
                    $popup.azPopup(options);
                });
            }
        });
    });
}(jQuery));