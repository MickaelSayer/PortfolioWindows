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
        $('header').toggleClass('inactive')
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
        rotateBox(72);
    });
    btn_rotate_right.click(function() {
        rotateBox(-72);
    });
});
