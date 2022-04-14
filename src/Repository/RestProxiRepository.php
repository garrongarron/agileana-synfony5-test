<?php

namespace App\Repository;

use App\Entity\RestProxi;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method RestProxi|null find($id, $lockMode = null, $lockVersion = null)
 * @method RestProxi|null findOneBy(array $criteria, array $orderBy = null)
 * @method RestProxi[]    findAll()
 * @method RestProxi[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RestProxiRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RestProxi::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(RestProxi $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(RestProxi $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return RestProxi[] Returns an array of RestProxi objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    public function findOneBySomeField($value): ?RestProxi
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.url = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
}
