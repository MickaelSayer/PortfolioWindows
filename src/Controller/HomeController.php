<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="app_home")
     *
     * @return Response
     */
    public function homeAction(): Response
    {
        $env = $this->getParameter('kernel.environment');
        if (empty($env)) {
            $env = 'dev';
        }

        return $this->render('/portfolio/app/home.html.twig', ['env' => $env]);
    }
}
