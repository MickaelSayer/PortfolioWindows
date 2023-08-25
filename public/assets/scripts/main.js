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

        var containerWindows = $('main .content-gestion-app .container-windows-open');
        var windowsActive = $('section.windows.active');
        $.each(windowsActive, function (index, value) {
            var windowsLink = $(value).data('link');
            var windowsTitle = $(value).find('.content-section h1').text();

            $(containerWindows[index]).find('.title-windows').html(windowsTitle);
            $(containerWindows[index]).addClass('open');
            $(containerWindows[index]).find('.close-app').data('windows', windowsLink);
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
            var containerWindows = $('main .content-gestion-app .container-windows-open');
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
    });

    $('main .content-gestion-app .close-all').on('click', function() {
        var windowsActive = $('section.windows.active');
        if (!$(this).hasClass('inactive')) {
            windowsActive.find('.close').click();
            $('main .content-gestion-app .gestion-app-close').click();
        }
    });

    $('main .content-gestion-app .close-all').on('mouseenter', function() {
        $('main .container-windows-open.open').addClass('delete');
        $('main .container-windows-open.open').find('.title-windows').addClass('delete');
        $('main .container-windows-open.open').find('.close-app').addClass('delete');
    });

    $('main .content-gestion-app .close-all').on('mouseleave', function() {
        $('main .container-windows-open.open').removeClass('delete');
        $('main .container-windows-open.open').find('.title-windows').removeClass('delete');
        $('main .container-windows-open.open').find('.close-app').removeClass('delete');
    });

    $('main .container-windows-open .close-app').on('click', function() {
        var dataWindowsDelete = $(this).data('windows');
        var parent = $(this).parent();
        
        parent.find('.title-windows').html('');
        parent.removeClass('open');
        parent.find('.close-app').data('windows', '');

        $('section.windows.' + dataWindowsDelete + '.active').find('.close').click();
    });

    $('main .container-windows-open .close-app').on('mouseenter', function() {
        var parent = $(this).parent();

        parent.find('.title-windows').addClass('delete');
        parent.addClass('delete');
    });

    $('main .container-windows-open .close-app').on('mouseleave', function() {
        var parent = $(this).parent();

        parent.find('.title-windows').removeClass('delete'),
        parent.removeClass('delete');
    });
});
