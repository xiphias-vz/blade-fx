<?php

namespace Pyz\Zed\PriceProduct\Business;

use Spryker\Zed\PriceProduct\Business\PriceProductFacade as SprykerPriceProductFacade;

/**
 * @method \Pyz\Zed\PriceProduct\Business\PriceProductBusinessFactory getFactory()
 * @method \Spryker\Zed\PriceProduct\Persistence\PriceProductEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\PriceProduct\Persistence\PriceProductRepositoryInterface getRepository()
 */
class PriceProductFacade extends SprykerPriceProductFacade
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @phpstan-return array<mixed>
     *
     * @param \Generated\Shared\Transfer\PriceProductTransfer[] $priceProductTransfers
     *
     * @return array
     */
    public function groupPriceProductCollection(array $priceProductTransfers)
    {
        return $this->getFactory()
            ->createPriceGrouper()
            ->groupPriceProduct($priceProductTransfers);
    }
}
