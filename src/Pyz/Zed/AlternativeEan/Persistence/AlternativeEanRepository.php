<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\AlternativeEan\Persistence;

use Exception;
use Orm\Zed\AlternativeEan\Persistence\Map\PyzAlternativeEanTableMap;
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
 * @method \Pyz\Zed\AlternativeEan\Persistence\AlternativeEanPersistenceFactory getFactory()
 */
class AlternativeEanRepository extends AbstractRepository
{
    /**
     * @param string $ean
     *
     * @throws \Exception
     *
     * @return string[]
     */
    public function getAlternativeEansByEan(string $ean): array
    {
        $spyProduct = $this->getFactory()
            ->createProductQuery()
            ->filterByProductNumber($ean)
            ->findOne();

        if (!$spyProduct) {
            throw new Exception('Product ' . $ean . ' doesn`t exists anymore.');
        }

        $sapNumber = $spyProduct->getSapNumber();

        return $this->getFactory()
            ->createAlternativeEanQuery()
            ->filterBySapNumber($sapNumber)
            ->select(PyzAlternativeEanTableMap::COL_EAN)
            ->find()
            ->getData();
    }
}
