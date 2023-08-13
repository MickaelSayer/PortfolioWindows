$(document).ready(function() {
    const logoWindows = $('.logo-windows');
    const navLink = $('.nav-link');
    const windowsSections = $('section.windows');
    const taskItems = $('.navbar .task');

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
        windowsSections.css('z-index', '1');
        windowsElement.addClass('active').css('z-index', '2');

        // Fermeture de la navigation avec le bouton windows navigation
        navLink.removeClass('open-nav');

        // Gère l'ouverture du menu dans la barre des tâches
        $(`#${data_link}`).addClass('active');
    });

    $(document).on('click', function(event) {
        if (navLink.hasClass('open-nav') && !navLink.is(event.target) && !logoWindows.is(event.target) && navLink.has(event.target).length === 0) {
            navLink.removeClass('open-nav');
            logoWindows.removeClass('active');
        }
    });

    $('header .container-left .icon-extends').on('click', function() {
        $('.icon-app').toggleClass('active');
        $(this).children('i').toggleClass('active');
    });

    $('header .container-left .icon-extends-right').on('click', function() {
        $('.container-right').toggleClass('active');
        $(this).children('i').toggleClass('active');
    });

    $('header .navbar-responsive').on('click', function() {
        $('header').toggleClass('active');

        $('main .icon-app-responsive').toggleClass('active');

        setTimeout(function() {
            $('main .container-bureau').toggleClass('innactive');
        }, 100);
    });

    $('main .nav-app li').on('click', function() {
        const data_link = $(this).data('link');
        const windowsElement = $(`section.windows.${data_link}`);
        const itemCopy = windowsElement.clone();

        // Gère la visibilité en premier plan de l'élément windows
        windowsSections.css('z-index', '1');
        windowsElement.addClass('active').css('z-index', '2');

        // Fermeture de la navigation avec le bouton windows navigation
        $('main .icon-app-responsive').removeClass('active');

        // Ajout des fenétres windows à la gestion des applications
        if (elt_gestion_windows.length == 0) {
            elt_gestion_content.append(itemCopy);
        }
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
});