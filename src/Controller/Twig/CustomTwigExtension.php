<?php

namespace App\Controller\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CustomTwigExtension extends AbstractExtension
{
    public function getFunctions()
    {
        return [
            new TwigFunction('get_path_file_js', [$this, 'getPathFileJs']),
        ];
    }

    public function getPathFileJs(string $file_name)
    {
        $pathFileJs = 'assets/scripts/source/' . $file_name . '.js';

        if ($_ENV['APP_ENV'] === 'prod') {
            $pathFileJs = 'assets/scripts/min/' . $file_name . '.min.js';
        }

        return $pathFileJs;
    }
}
