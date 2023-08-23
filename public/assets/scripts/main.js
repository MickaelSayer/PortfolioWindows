$(document).ready(function () {
    const discordButton = $('#discord');
    const discordButtonSpan = discordButton.find('span');
    discordButton.click(function () {
        const discord = $(this).data('discord') || '';

        navigator.clipboard.writeText(discord)
            .then(() => {
                discordButtonSpan.text('copié');

                setTimeout(() => {
                    discordButtonSpan.text('Discord');
                }, 200);
            });
    });

    $('main .gestion-app').on('click', function () {
        var windowsOpen = $('section.windows.active');
        $.each(windowsOpen, function (index, windows) {

        });
    });
});
