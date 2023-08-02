function actualiserHorloge() {
    var date = new Date();
    var heure = date.getHours();
    var minutes = date.getMinutes();

    heure = (heure < 10) ? "0" + heure : heure;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    var heureActuelle = heure + ":" + minutes;

    $("header .horloge .heure").text(heureActuelle);
}

$(document).ready(function() {
    setInterval(actualiserHorloge, 1000);
    actualiserHorloge();

    $('.logo-windows').on('click', function() {
        $('.nav-link').toggleClass('open-nav');
        $(this).toggleClass('active');
    });

    $('.open-session').on('click', function() {
        $('.nav-link').removeClass('open-nav');
        $('.logo-windows').removeClass('active');
    });

    $('nav .sidebar-left ul li').on('click', function() {
        const data_link = $(this).data('link');

        $('nav .sidebar-left ul li, header .menu-open .menu-active, .logo-windows').removeClass('active');
        $('#' + data_link).addClass('active');
        $('.nav-link').removeClass('open-nav');
        $(this).addClass('active');
    });

    const nav_link = $('.nav-link');
    const logo_windows = $('.logo-windows');
    $(document).on('click', function(event) {
        if (nav_link.hasClass('open-nav') && !nav_link.is(event.target) && !logo_windows.is(event.target) && nav_link.has(event.target).length === 0) {
            nav_link.removeClass('open-nav');
            $('.logo-windows').removeClass('active');
        }
    });
});
