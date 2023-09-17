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

/**
 * Vérifie si la valeur donnée est présente dans le tableau des noms de fenêtres attendus.
 * @param {*} windowsName - La valeur à vérifier.
 * @returns {boolean} - True si la valeur est présente, sinon False.
 */
function windowsNameExpected(windowsName) {
    const windowsNameExpected = [
        'presentation',
        'diplome',
        'experience',
        'langage',
        'projet'
    ];

    return windowsNameExpected.includes(windowsName);
}

/**
 * Vérifie si la valeur donnée est présente dans le tableau des catégories film et série.
 * @param {*} categorie - La valeur à vérifier.
 * @returns {boolean} - True si la valeur est présente, sinon False.
 */
function categorieNameExpected(categorie) {
    const categorieNameExpected = [
        'Drame',
        'Comédie',
        'Action',
        'Epouvante-horreur'
    ];

    return categorieNameExpected.includes(categorie);
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
