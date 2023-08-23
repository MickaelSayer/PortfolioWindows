$(document).ready(function() {
    // Fonction de fermeture de fenêtre
    $('section.windows .close').on('click', function() {
        const windowsElement = $(this).parents('section.windows');
        const dataLink = windowsElement.data('link');
        windowsElement.data('full-size', 'min');
        windowsElement.removeClass('active full-size');
        $(`.navbar #${dataLink}`).removeClass('active selected');

        if (windowsElement.css('z-index') == 2) {
            windowsElement.css('z-index', '1');

            var windowsPrevVoid = windowsElement.prev('section.windows.active').length == 0;
            var windowsNextVoid = windowsElement.next('section.windows.active').length == 0;

            if (!windowsPrevVoid && windowsNextVoid) {
                windowsElement.prev('section.windows.active').css('z-index', '2');
            } else if(!windowsNextVoid && windowsPrevVoid) {
                windowsElement.next('section.windows.active').css('z-index', '2');
            } else if(!windowsPrevVoid && !windowsNextVoid) {
                windowsElement.next('section.windows.active').css('z-index', '2');
            } else if(windowsPrevVoid && windowsNextVoid) {
                $('section.windows.active').last().css('z-index', '2');
            }
        }

        windowsElement.find('.size .extends').addClass('active');
        windowsElement.find('.size .narrow').removeClass('active');

        $.each($('nav .sidebar-left ul li'), function (index, value) { 
            if ($(value).data('link') === dataLink) {
                $(value).removeClass('open');
            }
        });
    });

    // Fonction pour réduire la fenêtre à l'icône de la barre des tâches
    $('section.windows .minus').on('click', function() {
        const windowsElement = $(this).parents('section.windows');
        const dataLink = windowsElement.data('link');

        windowsElement.removeClass('active full-size');
        $(`.navbar #${dataLink}`).removeClass('selected');
    });

    // Fonction pour gérer la taille de la fenêtre (agrandir/réduire)
    $('section.windows .size').on('click', function() {
        const windowsElement = $(this).parents('section.windows');
        const isMinSize = windowsElement.data('full-size') === 'min';

        windowsElement.data('full-size', isMinSize ? 'max' : 'min');
        windowsElement.find('.size .extends, .size .narrow').toggleClass('active');
        windowsElement.toggleClass('full-size');
    });

    // Fonction pour afficher/cacher une barre latérale
    $('section.windows .icon-slider-left').on('click', function() {
        const iconSliderLeft = $(this);
        iconSliderLeft.toggleClass('active').parents('.container-sildebar-left').children('ul').toggleClass('active');
    });

    // Fonction pour afficher/cacher le contenu de la barre latérale
    $('section.windows .extends-sidebar').on('click', function() {
        const dataLink = $(this).parents('section.windows').data('link');
        $(`section.windows.${dataLink} .container-content`).toggleClass('active');
        $('section.windows .tools').toggleClass('inactive');
    });

    $('section.windows .tools .menu-extends').on('click', function() {
        $('section.windows .content-menu').toggleClass('active');
        $('section.windows .tools').toggleClass('active');
        $('section.windows .extends-sidebar').toggleClass('inactive');
    });
});
