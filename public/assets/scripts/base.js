/** Affichage de l'heure pour la barre des tâches */
function actualiserHorloge() {
    var date = new Date();
    var heure = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var heureActuelle = heure + ":" + minutes;

    if ($(window).width() > 849) {
        $("header .horloge .heure").text(heureActuelle);
        $("main .horloge-responsive .heure").text('');
    } else {
        $("header .horloge .heure").text('');
        $("main .horloge-responsive .heure").text(heureActuelle);
    }

    $(window).on('resize', function() {
        if ($(window).width() > 849) {
            $("header .horloge .heure").text(heureActuelle);
            $("main .horloge-responsive .heure").text('');
        } else {
            $("header .horloge .heure").text('');
            $("main .horloge-responsive .heure").text(heureActuelle);
        }
    });
}

$(document).ready(function() {
    /** Actualisation de l'heure */
    setInterval(actualiserHorloge, 1000);
    actualiserHorloge();
});
