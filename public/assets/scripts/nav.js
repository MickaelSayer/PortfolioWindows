function addCssOpacity(elt_focus) {
    elt_focus.css({
        'background' : 'white',
        'display' : 'flex',
        'opacity': '0.3'
    });
    if (elt_focus.hasClass('active')) {
        elt_focus.removeAttr('style');
    }
}

function containerAppNavbarSelected(__this, container) {
    if (!container.hasClass('active')) {
        container.removeAttr('style');
    } else {
        container.css('display', 'none');
    }

    container.toggleClass('active');
    __this.children('i').toggleClass('active');
}

$(document).ready(function() {
    const logoWindows = $('.logo-windows');
    const navLink = $('.nav-link');
    const windowsSections = $('section.windows');
    const taskItems = $('.navbar .task');
    const iconApp = $('header .icon-app');
    const containerRight = $('header .container-right')

    /** Ouverture du menu navigation */
    logoWindows.on('click', function (event) {
        navLink.toggleClass('open-nav');
        $(this).toggleClass('active');
        $('nav .nav-header .params').removeClass('active');
        
        event.stopPropagation();
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
        logoWindows.removeClass('active');

        // Gère l'ouverture du menu dans la barre des tâches
        $(`#${data_link}`).addClass('active');

        $(this).addClass('open');
    });

    $(document).on('click', function(event) {
        if (navLink.hasClass('open-nav') && !navLink.is(event.target) && !logoWindows.is(event.target) && navLink.has(event.target).length === 0) {
            navLink.removeClass('open-nav');
            logoWindows.removeClass('active');
        }
    });

    $('header .container-left .icon-extends').on('click', function() {
        containerAppNavbarSelected($(this), iconApp);
    });

    $('header .container-left .icon-extends').on('mouseenter', function() {
        addCssOpacity(iconApp);
    });

    $('header .container-left .icon-extends').on('mouseleave', function() {
        iconApp.removeAttr('style');
    });

    $('header .container-left .icon-extends-right').on('click', function() {
        containerAppNavbarSelected($(this), containerRight);
    });

    $('header .container-left .icon-extends-right').on('mouseenter', function() {
        addCssOpacity(containerRight);
    });

    $('header .container-left .icon-extends-right').on('mouseleave', function() {
        containerRight.removeAttr('style');
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

    $('nav .nav-header .params').on('click', function() {
        $(this).toggleClass('active');

        $('nav .container-nav').toggleClass('inactive');
    });
});