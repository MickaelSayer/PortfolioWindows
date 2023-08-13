$(document).ready(function() {
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

    const html_content_app = $('.gestion-app').html();
    $('.gestion-app').click(function() {
        $(this).toggleClass('active');

        $(this).html(html_content_app);
        if ($(this).hasClass('active')) {
            $(this).html('<i class="fa-solid fa-xmark fa-xl" style="color: #ffffff;"></i> Fermer');
        }

        $('.container-open-app').toggleClass('active');
        $('header').toggleClass('inactive');

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

        $('main .container-open-app .counter').html($('main .box-app span.box.active').length + ' applications ouvertes');
    });

    const box_app = $('main .container-open-app .box-app');
    const btn_rotate_left = $('.btn-rotate-left');
    const btn_rotate_right = $('.btn-rotate-right');
    let currentRotation = 0;
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
