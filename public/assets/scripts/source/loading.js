$(document).ready(function () {
    let currentDotIndex = parseInt(0, 10);
    let intervalId;
    /**
     * Gére l'animation des points de la page loading
     */
    function showDots() {
        const dotsElement = $('.container-loading .content-loading span.dots');
        const dotsArray = ['.', '..', '...'];

        if (Number.isInteger(currentDotIndex) && currentDotIndex >= 0 && currentDotIndex <= 2) {
            dotsElement.text(dotsArray[currentDotIndex]);
            currentDotIndex = (currentDotIndex + 1) % dotsArray.length;
        }
    }

    intervalId = setInterval(showDots, 600);

    setTimeout(() => {
        $('.container-loading .mid').addClass('login');
        $('.container-loading .mid .loader').html('<i class="fa-solid fa-circle-info fa-lg"></i><br>Seuls les endroits où il y a du vert sont cliquables<br>Pour commencer, cliquez sur ma session');

        clearInterval(intervalId);
    }, 5000);

    $('.container-loading .mid .login-loading').on('click', function () {
        $('.container-loading').addClass('inactive');
        $('#audio-windows')[0].play();

        setTimeout(() => {
            $('.container-loading.inactive').addClass('display')
        }, 300);
    });
});
