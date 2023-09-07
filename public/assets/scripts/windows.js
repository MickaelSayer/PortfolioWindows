const mediaQuery1139 = window.matchMedia("(max-width: 1139px)");
const mediaQuery848 = window.matchMedia("(max-width: 848px)");

function movieScrollingNumbers() {
    if (mediaQuery848.matches) {
        return 1;
    } else if (mediaQuery1139.matches) {
        return 3;
    } else {
        return 4;
    }
}

$(document).ready(function () {
    // Fonction de fermeture de fenêtre
    $('section.windows .close').on('click', function () {
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
            } else if (!windowsNextVoid && windowsPrevVoid) {
                windowsElement.next('section.windows.active').css('z-index', '2');
            } else if (!windowsPrevVoid && !windowsNextVoid) {
                windowsElement.next('section.windows.active').css('z-index', '2');
            } else if (windowsPrevVoid && windowsNextVoid) {
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
    $('section.windows .minus').on('click', function () {
        const windowsElement = $(this).parents('section.windows');
        const dataLink = windowsElement.data('link');

        windowsElement.removeClass('active full-size');
        $(`.navbar #${dataLink}`).removeClass('selected');
    });

    // Fonction pour gérer la taille de la fenêtre (agrandir/réduire)
    $('section.windows .size').on('click', function () {
        const windowsElement = $(this).parents('section.windows');
        const isMinSize = windowsElement.data('full-size') === 'min';

        windowsElement.data('full-size', isMinSize ? 'max' : 'min');
        windowsElement.find('.size .extends, .size .narrow').toggleClass('active');
        windowsElement.toggleClass('full-size');
    });

    // Fonction pour afficher/cacher une barre latérale
    $('section.windows .icon-slider-left').on('click', function () {
        const iconSliderLeft = $(this);
        iconSliderLeft.toggleClass('active').parents('.container-sildebar-left').children('ul').toggleClass('active');
    });

    var titleIconSliderLeft = "";
    $('section.windows .icon-slider-left').on('mouseenter', function () {
        var __this = $(this);
        titleIconSliderLeft = __this.attr('title');

        if (!__this.hasClass('active')) {
            __this.attr('title', 'Afficher la liste');
        }
    });
    $('section.windows .icon-slider-left').on('mouseleave', function () {
        var __this = $(this);

        __this.attr('title', titleIconSliderLeft);
    });

    // Fonction pour afficher/cacher le contenu de la barre latérale
    $('section.windows .extends-sidebar').on('click', function () {
        const dataLink = $(this).parents('section.windows').data('link');
        $(`section.windows.${dataLink} .container-content`).toggleClass('active');
        $('section.windows .tools').toggleClass('inactive');
    });

    var titleIconSidebarLeft = "";
    $('section.windows .extends-sidebar').on('mouseenter', function () {
        var __this = $(this);
        titleIconSidebarLeft = __this.attr('title');

        if (__this.parent('.container-content').hasClass('active')) {
            __this.attr('title', 'Masquer le gestionnaire de fichiers');
        }
    });
    $('section.windows .extends-sidebar').on('mouseleave', function () {
        var __this = $(this);

        __this.attr('title', titleIconSidebarLeft);
    });

    $('section.windows .tools .menu-extends').on('click', function () {
        $('section.windows .content-menu').toggleClass('active');
        $('section.windows .tools').toggleClass('active');
        $('section.windows .extends-sidebar').toggleClass('inactive');
    });

    var titleIconMenuExtends = "";
    $('section.windows .tools .menu-extends').on('mouseenter', function () {
        var __this = $(this);
        titleIconMenuExtends = __this.attr('title');

        if (__this.parent('.tools').hasClass('active')) {
            __this.attr('title', 'Masquer la barre des tâches');
        }
    });
    $('section.windows .tools .menu-extends').on('mouseleave', function () {
        var __this = $(this);
        __this.attr('title', titleIconMenuExtends);
    });

    var folderOpen = [];
    var pathOpen = [];
    var folderSelected = [];
    $('section.windows .container-icon').on('click', function () {
        var dataLink = $(this).data('link');
        var windowsOpen = $(this).parents('section.windows');
        var windowsLink = $(this).parents('section.windows').data('link');

        if (!folderOpen[windowsLink]) {
            folderOpen[windowsLink] = [];
        }
        folderOpen[windowsLink].push(windowsOpen.find('.container-folder.' + dataLink));

        var pathAddressElement = windowsOpen.find('.path-address');
        var currentText = pathAddressElement.text();
        var newText = currentText + dataLink + '/';
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
            var windowsOpen = $(this).parents('section.windows');
            var windowsLink = $(this).parents('section.windows').data('link');

            var lastFolderOpen = folderOpen[windowsLink][folderOpen[windowsLink].length - 1];
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

            var lastPath = pathOpen[windowsLink][pathOpen[windowsLink].length - 1];

            var pathFolder = windowsOpen.find('.path-address');
            var pathFolderText = pathFolder.text();
            var newPathFolder = pathFolderText.replace(lastPath + "/", '');
            pathFolder.text(newPathFolder);

            pathOpen[windowsLink].pop(lastPath);
            if (pathOpen[windowsLink].length === 0) {
                windowsOpen.find('.arrrow-before').removeClass('active');
                windowsOpen.find('.address-before').removeClass('active');
            }
        }
    });

    var nbrsView;
    $('section.windows .container-icon#film').on('click', function () {
        var eltContainerFilm = $('.container-folder.film');
        var eltListFilm = eltContainerFilm.find('.list-film');
        nbrsView = movieScrollingNumbers();

        $.each(eltListFilm, function (index, value) {
            var nbrsEltFilm = $(value).find('a').length;
            var eltNextFilm = $(value).parents('.container-film').find('.next-film');
            var eltGenreFilm = $(value).parents('.container-film').find('.genre-film');

            eltGenreFilm.append('<span>(' + nbrsEltFilm + ' Films)</span>');
            if (nbrsEltFilm <= nbrsView) {
                eltNextFilm.addClass('inactive')
            }
        });
    });

    var sliderFilmDist = [];
    $('section.windows .container-folder.film .next-film').on('click', function () {
        var eltContainerFilm = $(this).parent('.container-film');
        var genreContainerFilm = eltContainerFilm.find('.genre-film').text();
        var eltListFilm = eltContainerFilm.find('.list-film');
        var nbrstranslateMax = 150 * eltListFilm.find('a').length - (150 * nbrsView);
        var eltBeforeFilm = eltContainerFilm.find('.before-film');

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

    $('section.windows .container-folder.film .before-film').on('click', function () {
        var eltContainerFilm = $(this).parent('.container-film');
        var genreContainerFilm = eltContainerFilm.find('.genre-film').text();
        var eltListFilm = eltContainerFilm.find('.list-film');
        var eltNextFilm = eltContainerFilm.find('.next-film');

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
})