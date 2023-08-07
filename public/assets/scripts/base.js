/** Affichage de l'heure pour la barre des tâches */
function actualiserHorloge() {
    var date = new Date();
    var heure = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var heureActuelle = heure + ":" + minutes;
    $("header .horloge .heure").text(heureActuelle);
}

$(document).ready(function() {
    /** Constantes pour les sélecteurs */
    const navLink = $('.nav-link');
    const logoWindows = $('.logo-windows');
    const taskItems = $('.navbar .task');
    const windowsSections = $('section.windows');
    const discordButton = $('#discord');
    const iconSliderLeftItems = $('section.windows .icon-slider-left');

    /** Actualisation de l'heure */
    setInterval(actualiserHorloge, 1000);
    actualiserHorloge();

    /** Ouverture du menu navigation */
    logoWindows.on('click', function () {
        navLink.toggleClass('open-nav');
        $(this).toggleClass('active');
    });

    /** Fermeture de la navigation */
    $('.open-session').on('click', function () {
        navLink.removeClass('open-nav');
        logoWindows.removeClass('active');
    });

    $('nav .sidebar-left ul li').on('click', function () {
        const data_link = $(this).data('link');
        const windowsElement = $(`section.windows.${data_link}`);
        const isMaxSize = windowsElement.data('full-size') === 'max';

        // Gère l'élément windows quand il est en grande taille
        if (isMaxSize) {
            windowsElement.addClass('full-size');
        }

        // Gère l'affichage du menu dans la barre des tâches
        taskItems.removeClass('selected');
        $(`.navbar #${data_link}`).addClass('selected');

        // Gère la visibilité en premier plan de l'élément windows
        windowsSections.css('z-index', '1')
        windowsElement.addClass('active').css('z-index', '2');

        // Fermeture de la navigation avec le bouton windows navigation
        navLink.removeClass('open-nav');

        // Gère l'ouverture du menu dans la barre des tâches
        $(`#${data_link}`).addClass('active');
    });

    $('section.windows .close').on('click', function() {
        const windowsElement = $(this).parents('section.windows');
        const data_link = windowsElement.data('link');

        // À la fermeture, réinitialise la taille de l'élément windows
        windowsElement.data('full-size', 'min');

        // Fermeture de l'élément windows
        windowsElement.removeClass('active');

        // Suppression du mode plein écran de l'élément windows
        windowsElement.removeClass('full-size');

        // Fermeture du menu de la barre des tâches
        $(`.navbar #${data_link}`).removeClass('active selected');

        // Passage de l'élément windows en arrière-plan
        windowsElement.css('z-index', '1');

        // Gère l'affichage du bouton qui gère la taille de la fenêtre
        windowsElement.find('.size .extends').addClass('active');
        windowsElement.find('.size .narrow').removeClass('active');
    });

    $('section.windows .minus').on('click', function() {
        const windowsElement = $(this).parents('section.windows');
        const data_link = windowsElement.data('link');

        // Gère la fermeture de la page et réinitialise la taille de l'élément windows
        windowsElement.removeClass('active full-size');

        // Réinitialise le menu de la barre des tâches pour qu'il ne soit plus sélectionné
        $(`.navbar #${data_link}`).removeClass('selected');
    });

    $('section.windows .size').on('click', function() {
        const windowsElement = $(this).parents('section.windows');
        const data_link = windowsElement.data('link');
        const isMinSize = windowsElement.data('full-size') === 'min';

        // Gère l'agrandissement de l'élément windows si elle avait une taille max
        windowsElement.data('full-size', isMinSize ? 'max' : 'min');

        // Gère l'affichage du bouton agrandir et réduire
        windowsElement.find('.size .extends, .size .narrow').toggleClass('active');

        // Gère l'agrandissement de l'élément windows
        windowsElement.toggleClass('full-size');
    });

    taskItems.on('click', function() {
        const elt_id = $(this).attr('id');
        const windowsElement = windowsSections.filter('.' + elt_id);

        // Ouverture de l'élément windows
        windowsElement.addClass('active');

        // Gère l'affichage de l'élément windows si la tâche est sélectionnée
        if ($(this).hasClass('selected')) {
            windowsElement.removeClass('active');
            taskItems.removeClass('selected');
            return;
        }

        // Lors du clic sur la tâche et si la page était en full size, l'élément windows garde sa taille
        if (windowsElement.data('full-size') === 'max') {
            windowsElement.addClass('full-size');
        }

        // Reinitialise l'affichage en premier plan pour tous les éléments windows
        windowsSections.css('z-index', '1');

        // Passage en premier plan de l'élément windows sélectionné
        windowsElement.css('z-index', '2');

        // Suppression de l'effet visuel de la tâche sélectionnée pour toutes les tâches
        taskItems.removeClass('selected');

        // Ajout de l'effet visuel de la tâche sélectionnée à la tâche actuelle
        $(this).addClass('selected');
    });

    $(document).on('click', function(event) {
        if (navLink.hasClass('open-nav') && !navLink.is(event.target) && !logoWindows.is(event.target) && navLink.has(event.target).length === 0) {
            navLink.removeClass('open-nav');
            logoWindows.removeClass('active');
        }
    });

    discordButton.click(function () {
        // Récupère la valeur de l'attribut 'data-discord' ou utilise une chaîne vide par défaut
        var discord = $(this).data('discord') || '';
    
        // Copie la valeur dans le presse-papiers de l'utilisateur en utilisant l'API Clipboard
        navigator.clipboard.writeText(discord)
          .then(() => {
            // Affiche "copié" dans l'élément span à l'intérieur de l'élément #discord
            $('#discord span').text('copié');
    
            // Rétablit le texte "Discord" après 200 millisecondes
            setTimeout(() => {
                $('#discord span').text('Discord');
            }, 200);
          })
    });

    iconSliderLeftItems.on('click', function () {
        // Sélectionne l'élément cliqué avec la classe 'icon-slider-left'
        var iconSliderLeft = $(this);
    
        // Ajoute ou supprime la classe 'active' sur l'élément cliqué et sur son élément parent
        iconSliderLeft.toggleClass('active').parents('.container-sildebar-left').children('ul').toggleClass('active');
    });

    $('header .container-left .icon-extends').on('click', function() {
        $('.icon-app').toggleClass('active');
        $(this).children('i').toggleClass('active');
    });

    $('header .container-left .icon-extends-right').on('click', function() {
        $('.container-right').toggleClass('active');
        $(this).children('i').toggleClass('active');
    });

    $('section.windows .extends-sidebar ').on('click', function() {
        const data_link = $(this).parents('section.windows').data('link');

        $('section.windows.' + data_link + ' .container-content').toggleClass('active');
    });
});
