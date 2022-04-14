<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class SwapiController extends AbstractController
{
    /**
     * @Route("/api", name="app_api")
     */
    public function films(): Response
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://swapi.dev/api/films/');
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
        $data = curl_exec($ch);
        if(curl_errno($ch)){
            return new JsonResponse($data, Response::HTTP_INTERNAL_SERVER_ERROR);    
        }
        return new JsonResponse($data, Response::HTTP_OK);
    }
}
