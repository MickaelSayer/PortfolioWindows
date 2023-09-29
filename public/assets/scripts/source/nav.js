/**
 * Applique un style à l'élément passé en argument pour changer l'opacité et l'apparence.
 * @param {*} elt_focus L'élément auquel appliquer les styles.
 */
function addCssOpacity(elt_focus) {
    elt_focus.css({
        'background': 'white',
        'display': 'flex',
        'opacity': '0.3'
    });
    if (elt_focus.hasClass('active')) {
        elt_focus.removeAttr('style');
    }
}

/**
 * Gère la sélection d'un conteneur de la barre de navigation dans l'application.
 * @param {*} __this - L'élément déclencheur de l'événement.
 * @param {*} container - Le conteneur ciblé.
 */
function containerAppNavbarSelected(__this, container) {
    if (!container.hasClass('active')) {
        container.removeAttr('style');
    } else {
        container.css('display', 'none');
    }

    container.toggleClass('active');
    __this.children('i').toggleClass('active');
}

$(document).ready(function () {
    const logoWindows = $('.logo-windows');
    const navLink = $('.nav-link');
    const windowsSections = $('section.windows');
    const taskItems = $('.navbar .task');
    const iconApp = $('header .icon-app');
    const containerRight = $('header .container-right');

    const titleLogoWindows = $('header .logo-windows').attr('title');
    logoWindows.on('click', function (event) {
        navLink.toggleClass('open-nav');
        $(this).toggleClass('active');
        $('nav .nav-header .params').removeClass('active');

        $(this).attr('title', titleLogoWindows);
        if ($(this).hasClass('active')) {
            $(this).attr('title', 'Masquer le menu');
        }

        event.stopPropagation();
    });

    $('.open-session').on('click', function () {
        navLink.removeClass('open-nav');
        logoWindows.removeClass('active');

        logoWindows.attr('title', titleLogoWindows);
    });

    $('nav .sidebar-left ul li').on('click', function () {
        const data_link = $(this).data('link');
        const windowsElement = $('section.windows.' + data_link);
        const isMaxSize = windowsElement.data('full-size') === 'max';

        if (isMaxSize) {
            windowsElement.addClass('full-size');
        }

        taskItems.removeClass('selected');
        $('.navbar #' + data_link).addClass('selected');

        windowsSections.css('z-index', '1');
        windowsElement.addClass('active').css('z-index', '2');

        navLink.removeClass('open-nav');
        logoWindows.removeClass('active');

        $('#' + data_link).addClass('active');

        $(this).addClass('open');
    });

    let titleTaskSelected = "";
    taskItems.on('mouseenter', function () {
        const __this = $(this);
        titleTaskSelected = __this.find('.content-task').attr('title');

        if (__this.hasClass('selected')) {
            __this.find('.content-task').attr('title', 'Réduire la fenêtre');
        }
    });
    taskItems.on('mouseleave', function () {
        const __this = $(this);

        __this.find('.content-task').attr('title', titleTaskSelected);
    });

    let titleNavUl = "";
    $('nav .sidebar-left ul li').on('mouseenter', function () {
        const __this = $(this);
        titleNavUl = __this.attr('title');

        if (__this.hasClass('open')) {
            __this.attr('title', 'Afficher la fenêtre');
        }
    });
    $('nav .sidebar-left ul li').on('mouseleave', function () {
        const __this = $(this);

        __this.attr('title', titleNavUl);
    });

    $(document).on('click', function (event) {
        if (navLink.hasClass('open-nav') && !navLink.is(event.target) && !logoWindows.is(event.target) && navLink.has(event.target).length === 0) {
            navLink.removeClass('open-nav');
            logoWindows.removeClass('active');
        }
    });

    $('header .container-left .icon-extends').on('click', function () {
        containerAppNavbarSelected($(this), iconApp);
    });

    let titleIconExtends = "";
    $('header .container-left .icon-extends').on('mouseenter', function () {
        addCssOpacity(iconApp);

        const __this = $(this);
        titleIconExtends = __this.attr('title');

        if (__this.find('i').hasClass('active')) {
            __this.attr('title', 'Masquer les icônes cachées');
        }
    });
    $('header .container-left .icon-extends').on('mouseleave', function () {
        iconApp.removeAttr('style');

        const __this = $(this);
        __this.attr('title', titleIconExtends);
    });

    $('header .container-left .icon-extends-right').on('click', function () {
        containerAppNavbarSelected($(this), containerRight);
    });

    let titleIconExtendsRigth = "";
    $('header .container-left .icon-extends-right').on('mouseenter', function () {
        addCssOpacity(containerRight);

        const __this = $(this);
        titleIconExtendsRigth = __this.attr('title');

        if (__this.find('i').hasClass('active')) {
            __this.attr('title', 'Masquer les icônes cachées');
        }
    });
    $('header .container-left .icon-extends-right').on('mouseleave', function () {
        containerRight.removeAttr('style');

        const __this = $(this);
        __this.attr('title', titleIconExtendsRigth);
    });

    taskItems.on('click', function () {
        const elt_id = $(this).attr('id');
        const windowsElement = windowsSections.filter('.' + elt_id);

        windowsElement.addClass('active');

        if ($(this).hasClass('selected')) {
            windowsElement.removeClass('active');
            taskItems.removeClass('selected');
            return;
        }

        if (windowsElement.data('full-size') === 'max') {
            windowsElement.addClass('full-size');
        }

        windowsSections.css('z-index', '1');

        windowsElement.css('z-index', '2');

        taskItems.removeClass('selected');

        $(this).addClass('selected');
    });

    $('nav .nav-header .btn-params').on('click', function () {
        $(this).toggleClass('active');
        $('nav .nav-header .params').toggleClass('active');
        $('nav .container-nav').toggleClass('inactive');
        $('header .logo-windows').toggleClass('display');
        $('header .gestion-app').toggleClass('active');
    });

    $('header .gestion-app').on('click', function () {
        $(this).addClass('active');
        $('header .logo-windows').addClass('display');
        $('main .content-gestion-app').addClass('active');

        const containerWindows = $('main .content-gestion-app .container-windows-open');
        const windowsActive = $('section.windows.active');
        $.each(windowsActive, function (index, value) {
            let windowsActiveIndex = parseInt(index, 10);

            let windowsLink = $(value).data('link');
            let windowsFocus = $(value).css('z-index');
            let windowsTitle = $(value).find('.windows-name h1').text();
            
            if (Number.isInteger(windowsActiveIndex) && windowsActiveIndex >= 0 && windowsActiveIndex <= windowsActive.length - 1) {
                $(containerWindows[windowsActiveIndex]).removeClass('focus');
                if (parseInt(windowsFocus, 10) === 2) {
                    $(containerWindows[windowsActiveIndex]).addClass('focus');
                }

                $(containerWindows[windowsActiveIndex]).find('.title-windows').html(windowsTitle);
                $(containerWindows[windowsActiveIndex]).addClass('open');
                $(containerWindows[windowsActiveIndex]).data('windows', windowsLink);
            }
        });

        $('main .content-gestion-app .close-all').removeClass('inactive');
        $('main .content-gestion-app .close-app').removeClass('inactive');
        $('main .content-gestion-app .no-content').addClass('inactive');
        if (windowsActive.length === 0) {
            $('main .content-gestion-app .close-all').addClass('inactive');
            $('main .content-gestion-app .close-app').addClass('inactive');
            $('main .content-gestion-app .no-content').removeClass('inactive');
        }

        if ($(this).hasClass('active')) {
            $.each(containerWindows, function (index, value) {
                let containerWindowsIndex = parseInt(index, 10);

                if (Number.isInteger(containerWindowsIndex) && $(windowsActive[containerWindowsIndex]).length === 0) {
                    $(value).removeClass('open');
                    $(value).find('.title-windows').html('');
                    $(value).data('link', '');
                }
            });
        }
    });
});