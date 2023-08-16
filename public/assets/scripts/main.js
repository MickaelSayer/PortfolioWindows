$(document).ready(function() {
    $(window).on('resize', function(event) {
        if ($(window).width() > 849) {
            $('.gestion-app.active').click();

            event.stopPropagation();
        }
    });

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

    const html_content_app = $('main .gestion-app span').html();
    let currentRotation = 0;
    var titleGestionApp = $('main .gestion-app').attr('title');
    $('.gestion-app').click(function() {
        if ($(this).hasClass('active')) {
            var spansWithContent = $('main .box-app span:not(:empty)');
            spansWithContent.removeClass('active');
            spansWithContent.empty();
            $('main .box-app span.box').css('transform', '');

            currentRotation = 0;
            box_app.css('transform', 'perspective(1000px) rotateY(' + currentRotation + 'deg)');
        } else {
            var activeSections = $('section.windows.active');
            var emptySpans = $('main .box-app span:empty');
            $.each(activeSections, function(index, elt_windows) {
                var elt_windows_clone = $(elt_windows).clone();
                if (index < emptySpans.length) {
                    $(emptySpans[index]).append(elt_windows_clone);
                    $(emptySpans[index]).addClass('active');
                }
            });

            var deg_windows_open = $('main .box-app span.box.active').last().data('rotate');
            $('main .box-app span.box.active').css('transform', 'rotateY(calc(var(--i) * ' + deg_windows_open + 'deg)) translateZ(240px)');
        }

        $(this).toggleClass('active');
        
        $('main .gestion-app span').html(html_content_app);
        $('main .gestion-app').attr('title', titleGestionApp);
        if ($(this).hasClass('active')) {
            $('main .gestion-app span').html('<i class="fa-solid fa-xmark fa-xl" style="color: #ffffff;"></i> <span class="text">Fermer</span>');
            $('main .gestion-app').attr('title', 'Fermer le gestionnaire d\'application');
        }

        $('main .gestion-app .counter').html($('main .box-app span.box.active').length + '/5');

        var activeBoxCount = $('main .box-app span.box.active').length;
        $('.btn-rotate-left').toggleClass('hide', activeBoxCount < 2);
        $('.btn-rotate-right').toggleClass('hide', activeBoxCount < 2);
        $('.no-content').toggleClass('show', activeBoxCount === 0);

        $('.container-open-app').toggleClass('active');
        $('header .logo-windows').toggleClass('hide');
    });

    const box_app = $('main .container-open-app .box-app');
    const btn_rotate_left = $('.btn-rotate-left');
    const btn_rotate_right = $('.btn-rotate-right');

    function rotateBox(degrees) {
        currentRotation += degrees;
        box_app.css('transform', 'perspective(1000px) rotateY(' + currentRotation + 'deg)');
    }

    btn_rotate_left.click(function() {
        var deg_windows_open = $('main .box-app span.box.active').last().data('rotate');
        rotateBox(deg_windows_open);
    });
    btn_rotate_right.click(function() {
        var deg_windows_open = $('main .box-app span.box.active').last().data('rotate');
        rotateBox(deg_windows_open * -1);
    });
});
