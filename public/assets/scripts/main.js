$(document).ready(function () {
    const discordButton = $('#discord');
    const discordButtonSpan = discordButton.find('span');
    discordButton.click(function () {
        const discord = $(this).data('discord') || '';

        navigator.clipboard.writeText(discord)
            .then(() => {
                discordButtonSpan.text('copié');

                setTimeout(() => {
                    discordButtonSpan.text('Discord');
                }, 200);
            });
    });

    $('main .gestion-app').on('click', function () {
        $(this).addClass('active');
        $('header .logo-windows').addClass('display');
        $('main .content-gestion-app').addClass('active');
        $('main .inactive-windows-button').addClass('inactive');

        const containerWindows = $('main .content-gestion-app .container-windows-open');
        const windowsActive = $('section.windows.active');
        $.each(windowsActive, function (index, value) {
            let windowsLink = $(value).data('link');
            let windowsFocus = $(value).css('z-index');
            let windowsTitle = $(value).find('.windows-name h1').text();

            $(containerWindows[index]).removeClass('focus');
            if(windowsFocus == 2) {
                $(containerWindows[index]).addClass('focus');
            }
            $(containerWindows[index]).find('.title-windows').html(windowsTitle);
            $(containerWindows[index]).addClass('open');
            $(containerWindows[index]).data('windows', windowsLink);
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
                if ($(windowsActive[index]).length === 0) {
                    $(value).removeClass('open');
                    $(value).find('.title-windows').html('');
                    $(value).data('link', '');
                }
            });
        }
    });

    $('main .content-gestion-app .gestion-app-close').on('click', function() {
        $('main .gestion-app').removeClass('active');
        $('header .logo-windows').removeClass('display');
        $('main .content-gestion-app').removeClass('active');
        $('main .inactive-windows-button').removeClass('inactive');
    });

    $('main .content-gestion-app .close-all').on('click', function() {
        const windowsActive = $('section.windows.active');
        if (!$(this).hasClass('inactive')) {
            windowsActive.find('.close').click();
            $('main .content-gestion-app .gestion-app-close').click();
        }
    });

    $('main .content-gestion-app .close-all').on('mouseenter', function() {
        $('main .container-windows-open.open').addClass('delete');
    });

    $('main .content-gestion-app .close-all').on('mouseleave', function() {
        $('main .container-windows-open.open').removeClass('delete');
    });

    $('main .container-windows-open .close-app').on('click', function() {
        const parent = $(this).parent();
        const dataWindowsDelete = parent.data('windows');
        
        parent.find('.title-windows').html('');
        parent.removeClass('open');
        parent.data('windows', '');
        
        $('section.windows.' + dataWindowsDelete + '.active').find('.close').click();
        if ($('main .container-windows-open.open').length === 0) {
            $('main .content-gestion-app .no-content').removeClass('inactive');
            $('main .content-gestion-app .close-all').addClass('inactive');
            $('main .content-gestion-app .gestion-app-close').click();
        }
    });

    $('main .container-windows-open .close-app').on('mouseenter', function() {
        const parent = $(this).parent();

        parent.addClass('delete');
        parent.find('.eyes').addClass('inactive');
    });

    $('main .container-windows-open .close-app').on('mouseleave', function() {
        const parent = $(this).parent();

        parent.removeClass('delete');
        parent.find('.eyes').removeClass('inactive');
    });

    $('main .container-windows-open').on('click', function(event) {
        if (!$(event.target).closest('.close-app').length) {
            $('.navbar .task').removeClass('selected');
            $('.navbar #' + $(this).data('windows')).addClass('selected');

            $('section.windows').css('z-index', '1');
            $('section.windows.' + $(this).data('windows')).css('z-index', '2');
            $('main .gestion-app-close').click();
        }
    });

    const windowsParamTitle = $('main .container-windows-open').attr('title');
    $('main .container-windows-open').on('mouseenter', function() {
        if ($(this).hasClass('focus')) {
            $(this).attr('title', 'Fenêtre affichée');
        }
        $(this).find('.eyes').removeClass('inactive');
    });

    $('main .container-windows-open').on('mouseleave', function() {
        if ($(this).hasClass('focus')) {
            $(this).attr('title', windowsParamTitle);
        }

        $(this).find('.eyes').addClass('inactive');
    });

    $('main .inactive-windows-button').on('click', function() {
        $(this).toggleClass('active');

        $('header .logo-windows').removeClass('transparent');
        $('main .gestion-app').removeClass('transparent');
        if ($(this).hasClass('active')) {
            $('header .logo-windows').addClass('transparent');
            $('main .gestion-app').addClass('transparent');
        }
    });
});
