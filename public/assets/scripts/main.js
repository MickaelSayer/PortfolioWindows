$(document).ready(function() {
    const gestionApp = $('main .gestion-app');
    const containerGestionApp = $('main .container-gestion-app');
    const contentGestionWindows = $('main .content-gestion-windows');
    const discordButton = $('#discord');
    const discordButtonSpan = discordButton.find('span');
    const arrowRight = containerGestionApp.find('.arrow-right');
    const arrowLeft = containerGestionApp.find('.arrow-left');
    const windows = contentGestionWindows.find('.windows');

    const textGestionApp = gestionApp.html();

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

    gestionApp.on('click', function() {
        const initialWindows = contentGestionWindows.find('.windows.initial');

        gestionApp.html(textGestionApp);
        gestionApp.toggleClass('active');
        containerGestionApp.toggleClass('active');
        $('header').toggleClass('inactive');

        const hasWindows = windows.length > 0;
        containerGestionApp.find('span').toggle(!hasWindows);
        arrowLeft.add(arrowRight).toggle(hasWindows);

        arrowRight.toggleClass('inactive', initialWindows.next('.windows').length === 0);
        arrowLeft.toggleClass('inactive', initialWindows.prev('.windows').length === 0);
    });

    containerGestionApp.find('.arrow-right, .arrow-left').on('click', function() {
        const initialWindows = contentGestionWindows.find('.windows.initial');
        const isArrowRight = $(this).hasClass('arrow-right');
        const directionClass = isArrowRight ? 'right' : 'left';
        const oppositeDirectionClass = isArrowRight ? 'left' : 'right';

        initialWindows.removeClass('initial').addClass(directionClass);
        initialWindows[isArrowRight ? 'next' : 'prev']('.windows').removeClass(oppositeDirectionClass).addClass('initial');

        $(this).removeClass('inactive');

        const checkArrows = function() {
            arrowRight.toggleClass('inactive', initialWindows.next('.windows').length === 0);
            arrowLeft.toggleClass('inactive', initialWindows.prev('.windows').length === 0);
        };

        if (initialWindows.hasClass('initial')) {
            checkArrows();
        } else {
            $.each(windows, function(_, value) {
                if ($(value).hasClass('initial') && ($(value)[isArrowRight ? 'next' : 'prev']('.windows').length === 0)) {
                    $(isArrowRight ? arrowRight : arrowLeft).addClass('inactive');
                }
            });
        }
    });
});
