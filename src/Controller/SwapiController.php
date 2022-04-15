<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\RestProxi;
use App\Repository\RestProxiRepository;


class SwapiController extends AbstractController
{
    private $restProxiRepository;

    public function __construct(RestProxiRepository $restProxiRepository)
    {
        $this->restProxiRepository = $restProxiRepository;
    }
    /**
     * @Route("/api", name="app_api", methods={"POST"})
     */
    public function films(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $url =  $data['url'];
        $databaseAnswer = $this->restProxiRepository->findOneByUrl(['url' =>$url]);
        if($databaseAnswer === null){
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
            $data = curl_exec($ch);
            if(curl_errno($ch)){
                return new JsonResponse($data, Response::HTTP_INTERNAL_SERVER_ERROR);    
            }
            $restProxi = new RestProxi();
            $restProxi->setUrl($url);
            $restProxi->setMethod("GET");
            $restProxi->setResponse($data);
            $this->restProxiRepository->add($restProxi);
        } else {
            $data = $databaseAnswer->getResponse();
        }
        return new JsonResponse(json_decode($data), Response::HTTP_OK);
    }
}
