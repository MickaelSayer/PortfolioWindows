<?php

namespace App\Controller\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CustomTwigExtension extends AbstractExtension
{
    /**
     * Renvoie un tableau de fonctions personnalisées à rendre disponibles dans les templates Twig.
     *
     * @return array Un tableau d'instances de TwigFunction
     */
    public function getFunctions()
    {
        return [
            new TwigFunction('get_path_file_js', [$this, 'getPathFileJs']),
        ];
    }

    /**
     * Renvoie le chemin du fichier JavaScript en fonction du nom du fichier et de l'environnement d'exécution.
     *
     * @param string $file_name Le nom du fichier JavaScript
     * @return string Le chemin du fichier JavaScript
     */
    public function getPathFileJs(string $file_name)
    {
        $pathFileJs = 'assets/scripts/source/'.$file_name.'.js';

        if (!empty($_ENV['APP_ENV']) && $_ENV['APP_ENV'] === 'prod') {
            $pathFileJs = 'assets/scripts/min/'.$file_name.'.min.js';
        }

        return $pathFileJs;
    }
}
