function actualiserHorloge() {
    var date = new Date();
    var heure = date.getHours();
    var minutes = date.getMinutes();

    heure = (heure < 10) ? "0" + heure : heure;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    var heureActuelle = heure + ":" + minutes;

    // Mettre à jour le contenu de l'élément avec l'heure actuelle
    $("header .horloge .heure").text(heureActuelle);
}


$(document).ready(function() {
  // Mettre à jour l'heure toutes les secondes (1000 millisecondes)
  setInterval(actualiserHorloge, 1000);

  // Appeler la fonction une première fois pour éviter un délai initial
  actualiserHorloge();
});