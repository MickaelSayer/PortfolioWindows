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

        $('.nav-link').removeClass('open-nav');
        $('#' + data_link).addClass('active');
    });

    var nav_link = $('.nav-link');
    var logo_windows = $('.logo-windows');
    $(document).on('click', function(event) {
        if (nav_link.hasClass('open-nav') && !nav_link.is(event.target) && !logo_windows.is(event.target) && nav_link.has(event.target).length === 0) {
            nav_link.removeClass('open-nav');
            $('.logo-windows').removeClass('active');
        }
    });

    $('#discord').click(function () {
        var discord = $(this).data('discord') || '';
  
        navigator.clipboard.writeText(discord)
          .then(() => {
            $('#discord span').text('copié');
  
            setTimeout(() => {
                $('#discord span').text('Discord');
            }, 200);
          })
      });

      $('section.windows .icon-slider-left').on('click', function() {
        $(this).toggleClass('active');
        
        var container = $(this).parents()[1];
        $(container).children('ul').toggleClass('active')
      });
});
