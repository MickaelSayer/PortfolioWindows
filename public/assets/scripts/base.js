/** Affichage de l'heure pour la barre des tâches */
function actualiserHorloge() {
    var date = new Date();
    var heure = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var heureActuelle = heure + ":" + minutes;

    $("header .horloge .heure").text(heureActuelle);
}

$(document).ready(function() {
    /** Actualisation de l'heure */
    setInterval(actualiserHorloge, 1000);
    actualiserHorloge();
});
