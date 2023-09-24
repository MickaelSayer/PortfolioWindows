/**
 * Gére l'horloge de la barre des tâches
 */
function actualiserHorloge() {
    const date = new Date();
    const heure = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const heureActuelle = heure + ":" + minutes;

    $("header .horloge .heure").text(heureActuelle);
}

$(document).ready(function () {
    setInterval(actualiserHorloge, 1000);
    actualiserHorloge();

    $(window).on('resize', function (event) {
        if ($(window).width() > 849) {
            if ($('.gestion-app').hasClass('active')) {
                $('.gestion-app-close').click();
            }

            $('nav.nav-link .btn-params.active').click();

            event.stopPropagation();
        }
    });
});
