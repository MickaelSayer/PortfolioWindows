$(document).ready(function () {
    setTimeout(() => {
        $('.container-loading .mid').addClass('login');
        $('.container-loading .mid .loader').html("Pour commencer, cliquez sur votre nom d'utilisateur");
    }, 5000);

    const dotsElement = $('.container-loading .content-loading span.dots');

    let currentDotIndex = 0;

    function showDots() {
        const dotsArray = ['.', '..', '...'];

        dotsElement.text(dotsArray[currentDotIndex]);

        currentDotIndex = (currentDotIndex + 1) % dotsArray.length;
    }

    setInterval(showDots, 600);

    $('.container-loading .mid .login-loading').on('click', function() {
        $('.container-loading').addClass('inactive');
        $('#audio-windows')[0].play();

        setTimeout(() => {
            $('.container-loading.inactive').addClass('display')
        }, 300);
    });
});
