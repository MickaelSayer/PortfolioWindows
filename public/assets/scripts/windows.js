const mediaQuery1139 = window.matchMedia("(max-width: 1139px)");
const mediaQuery848 = window.matchMedia("(max-width: 848px)");

/**
 * Détermine le nombre de films à faire défiler en fonction de la taille de l'écran.
 * @returns {number} - Le nombre de films à faire défiler.
 */
function movieScrollingNumbers() {
    if (mediaQuery848.matches) {
        return 1;
    } else if (mediaQuery1139.matches) {
        return 3;
    } else {
        return 4;
    }
}

/**
 * Réinitialise le slider Netflix Loisirs.
 * @returns {Array} - Un tableau vide représentant les distances du slider.
 */
function resetNetflixLoisirsSlider() {
    const sliderFilmDist = [];

    $('section.windows .container-folder.netflix-loisirs .list-netflix-loisirs').css('transform', 'translateX(0px)');
    $('section.windows .container-folder.netflix-loisirs .before-netflix-loisirs').addClass('inactive');
    $('section.windows .container-folder.netflix-loisirs .next-netflix-loisirs').removeClass('inactive');

    return sliderFilmDist;
}

const folderOpen = [];
const pathOpen = [];
const folderSelected = [];

/**
 * Réinitialise l'état des fenêtres ouvertes.
 * @param {*} currentWindows - La fenêtre actuelle à réinitialiser.
 */
function resetWindowsOpen(currentWindows) {
    const windowsNameExpected = [
        'presentation',
        'diplome',
        'experience',
        'langage',
        'projet'
    ];

    if (typeof currentWindows === 'string' && windowsNameExpected.includes(currentWindows)) {
        const windowsOpen = $('section.windows.' + currentWindows);
        windowsOpen.find('.container-folder.open').removeClass('open');
        windowsOpen.find('.arrrow-before.active').removeClass('active');
        windowsOpen.find('.fil-ariane .address-before.active').removeClass('active');
        windowsOpen.find('.path-address').html(currentWindows + '/');
        windowsOpen.find('.container-icon.selected').removeClass('selected');
        windowsOpen.find('.container-content.active').removeClass('active');
        windowsOpen.find('.container-sildebar-left ul.active').removeClass('active');
        windowsOpen.find('.container-content .icon-slider-left:not("active")').addClass('active');

        folderOpen[currentWindows] = [];
        pathOpen[currentWindows] = [];
        folderSelected[currentWindows] = [];
    }
}

/**
 * Réinitialise l'affichage du calendrier d'expérience dans une fenêtre ouverte.
 * @param {*} windowsOpen - La fenêtre ouverte contenant le calendrier.
 */
function resetExperienceCalendar(windowsOpen) {
    $(windowsOpen).find('.content-notif.expand-notif').removeClass('expand-notif');
    $(windowsOpen).find('.number-day.event-formation.inactive').removeClass('inactive');
}

$(document).ready(function () {
    $('section.windows .close').on('click', function () {
        const windowsElement = $(this).parents('section.windows');
        const dataLink = windowsElement.data('link');
        windowsElement.data('full-size', 'min');
        windowsElement.removeClass('active full-size');
        $(`.navbar #${dataLink}`).removeClass('active selected');

        if (windowsElement.css('z-index') === 2) {
            windowsElement.css('z-index', '1');

            const prevActive = windowsElement.prev('section.windows.active');
            const nextActive = windowsElement.next('section.windows.active');
        
            if (prevActive.length || nextActive.length) {
                (prevActive.length ? prevActive : nextActive).css('z-index', '2');
            }
        }

        windowsElement.find('.size .extends').addClass('active');
        windowsElement.find('.size .narrow').removeClass('active');

        $.each($('nav .sidebar-left ul li'), function (index, value) {
            if ($(value).data('link') === dataLink) {
                $(value).removeClass('open');
            }
        });

        sliderFilmDist = resetNetflixLoisirsSlider();

        resetWindowsOpen(dataLink);

        resetExperienceCalendar(windowsElement);
    });

    $('section.windows .minus').on('click', function () {
        const windowsElement = $(this).parents('section.windows');
        const dataLink = windowsElement.data('link');

        windowsElement.removeClass('active full-size');
        $(`.navbar #${dataLink}`).removeClass('selected');
    });

    $('section.windows .size').on('click', function () {
        const windowsElement = $(this).parents('section.windows');
        const isMinSize = windowsElement.data('full-size') === 'min';

        windowsElement.data('full-size', isMinSize ? 'max' : 'min');
        windowsElement.find('.size .extends, .size .narrow').toggleClass('active');
        windowsElement.toggleClass('full-size');
    });

    $('section.windows .icon-slider-left').on('click', function () {
        const iconSliderLeft = $(this);
        iconSliderLeft.toggleClass('active').parents('.container-sildebar-left').children('ul').toggleClass('active');
    });

    let titleIconSliderLeft = "";
    $('section.windows .icon-slider-left').on('mouseenter', function () {
        const __this = $(this);
        titleIconSliderLeft = __this.attr('title');

        if (!__this.hasClass('active')) {
            __this.attr('title', 'Afficher la liste');
        }
    });
    $('section.windows .icon-slider-left').on('mouseleave', function () {
        const __this = $(this);

        __this.attr('title', titleIconSliderLeft);
    });

    $('section.windows .extends-sidebar').on('click', function () {
        const dataLink = $(this).parents('section.windows').data('link');
        $(`section.windows.${dataLink} .container-content`).toggleClass('active');
        $('section.windows .tools').toggleClass('inactive');
    });

    let titleIconSidebarLeft = "";
    $('section.windows .extends-sidebar').on('mouseenter', function () {
        const __this = $(this);
        titleIconSidebarLeft = __this.attr('title');

        if (__this.parent('.container-content').hasClass('active')) {
            __this.attr('title', 'Masquer le gestionnaire de fichiers');
        }
    });
    $('section.windows .extends-sidebar').on('mouseleave', function () {
        const __this = $(this);

        __this.attr('title', titleIconSidebarLeft);
    });

    $('section.windows .tools .menu-extends').on('click', function () {
        $('section.windows .content-menu').toggleClass('active');
        $('section.windows .tools').toggleClass('active');
        $('section.windows .extends-sidebar').toggleClass('inactive');
    });

    let titleIconMenuExtends = "";
    $('section.windows .tools .menu-extends').on('mouseenter', function () {
        const __this = $(this);
        titleIconMenuExtends = __this.attr('title');

        if (__this.parent('.tools').hasClass('active')) {
            __this.attr('title', 'Masquer la barre des tâches');
        }
    });
    $('section.windows .tools .menu-extends').on('mouseleave', function () {
        const __this = $(this);
        __this.attr('title', titleIconMenuExtends);
    });

    $('section.windows .container-icon').on('click', function () {
        const dataLink = $(this).data('link');
        if (dataLink === 'curriculum') {
            return;
        }
        const windowsOpen = $(this).parents('section.windows');
        const windowsLink = $(this).parents('section.windows').data('link');

        if (!folderOpen[windowsLink]) {
            folderOpen[windowsLink] = [];
        }
        folderOpen[windowsLink].push(windowsOpen.find('.container-folder.' + dataLink));

        const pathAddressElement = windowsOpen.find('.path-address');
        const currentText = pathAddressElement.text();
        const newText = currentText + dataLink + '/';
        pathAddressElement.text(newText);

        if (!pathOpen[windowsLink]) {
            pathOpen[windowsLink] = [];
        }
        pathOpen[windowsLink].push(dataLink);

        windowsOpen.find('.container-folder.' + dataLink).addClass('open');

        $(this).addClass('selected');
        if (!folderSelected[windowsLink]) {
            folderSelected[windowsLink] = [];
        }
        folderSelected[windowsLink].push(dataLink);

        windowsOpen.find('.arrrow-before').addClass('active');
        windowsOpen.find('.address-before').addClass('active');

        $.each(folderSelected[windowsLink], function (index, value) {
            if (!pathOpen[windowsLink].includes(value)) {
                $('.container-icon[data-link="' + value + '"]').removeClass('selected');

                folderSelected[windowsLink].splice(index, 1);
            }
        });
    });

    $('section.windows .arrrow-before, section.windows .fil-ariane .address-before').on('click', function () {
        if ($(this).hasClass('active')) {
            const windowsOpen = $(this).parents('section.windows');
            const windowsLink = $(this).parents('section.windows').data('link');

            const lastFolderOpen = folderOpen[windowsLink][folderOpen[windowsLink].length - 1];
            lastFolderOpen.removeClass('selected');
            if (lastFolderOpen.hasClass('open')) {
                lastFolderOpen.removeClass('open');
                folderOpen[windowsLink].pop(lastFolderOpen);
            }

            $.each(folderSelected[windowsLink], function (index, value) {
                if (!pathOpen[windowsLink].includes(value)) {
                    $('.container-icon[data-link="' + value + '"]').removeClass('selected');
                }
            });

            const lastPath = pathOpen[windowsLink][pathOpen[windowsLink].length - 1];

            const pathFolder = windowsOpen.find('.path-address');
            const pathFolderText = pathFolder.text();
            const newPathFolder = pathFolderText.replace(lastPath + "/", '');
            pathFolder.text(newPathFolder);

            pathOpen[windowsLink].pop(lastPath);
            if (pathOpen[windowsLink].length === 0) {
                windowsOpen.find('.arrrow-before').removeClass('active');
                windowsOpen.find('.address-before').removeClass('active');
            }

            sliderFilmDist = resetNetflixLoisirsSlider();
            resetExperienceCalendar(resetExperienceCalendar);
        }
    });

    let nbrsView;
    $('section.windows .container-icon#film, section.windows .container-icon#serie').on('click', function () {
        const eltContainerFilm = $('.container-folder.netflix-loisirs');
        const eltListFilm = eltContainerFilm.find('.list-netflix-loisirs');

        nbrsView = movieScrollingNumbers();

        $.each(eltListFilm, function (index, value) {
            let nbrsEltFilm = $(value).find('a').length;
            let eltNextFilm = $(value).parents('.container-netflix-loisirs').find('.next-netflix-loisirs');

            if (nbrsEltFilm <= nbrsView) {
                eltNextFilm.addClass('inactive')
            }
        });
    });

    let sliderFilmDist = [];
    $('section.windows .container-folder.netflix-loisirs .next-netflix-loisirs').on('click', function () {
        const eltContainerFilm = $(this).parent('.container-netflix-loisirs');
        const genreContainerFilm = eltContainerFilm.find('.genre-netflix-loisirs').text();
        const eltListFilm = eltContainerFilm.find('.list-netflix-loisirs');
        const nbrstranslateMax = 150 * eltListFilm.find('a').length - (150 * nbrsView);
        const eltBeforeFilm = eltContainerFilm.find('.before-netflix-loisirs');

        if (!sliderFilmDist[genreContainerFilm]) {
            sliderFilmDist[genreContainerFilm] = 0;
        }

        sliderFilmDist[genreContainerFilm] += (150 * nbrsView);
        if (sliderFilmDist[genreContainerFilm] > nbrstranslateMax) {
            sliderFilmDist[genreContainerFilm] = nbrstranslateMax;
        }

        eltListFilm.css('transform', 'translateX(-' + sliderFilmDist[genreContainerFilm] + 'px)');

        if (sliderFilmDist[genreContainerFilm] === nbrstranslateMax) {
            $(this).addClass('inactive');
        }

        eltBeforeFilm.removeClass('inactive');
    });

    $('section.windows .container-folder.netflix-loisirs .before-netflix-loisirs').on('click', function () {
        const eltContainerFilm = $(this).parent('.container-netflix-loisirs');
        const genreContainerFilm = eltContainerFilm.find('.genre-netflix-loisirs').text();
        const eltListFilm = eltContainerFilm.find('.list-netflix-loisirs');
        const eltNextFilm = eltContainerFilm.find('.next-netflix-loisirs');

        sliderFilmDist[genreContainerFilm] -= (150 * nbrsView);
        if (sliderFilmDist[genreContainerFilm] < nbrsView) {
            sliderFilmDist[genreContainerFilm] = 0;
        }

        eltListFilm.css('transform', 'translateX(-' + sliderFilmDist[genreContainerFilm] + 'px)');

        if (sliderFilmDist[genreContainerFilm] === 0) {
            $(this).addClass('inactive');
        }

        eltNextFilm.removeClass('inactive');
    });

    $('section.windows.experience .number-day.event-formation').on('click', function () {
        $(this).parents('.container-calendar').find('.content-notif').addClass('expand-notif');

        $(this).addClass('inactive');
    });

    $('section.windows.experience .closing-notif').on('click', function () {
        $(this).parent('.content-notif').removeClass('expand-notif');
        $(this).parents('.container-calendar').find('.number-day.event-formation.inactive').removeClass('inactive');
    });
})