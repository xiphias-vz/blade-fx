<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model\ProductStock\Hook;

use Orm\Zed\Product\Persistence\Base\SpyProductQuery;
use Orm\Zed\Product\Persistence\Map\SpyProductTableMap;
use Spryker\Zed\Availability\Business\AvailabilityFacadeInterface;

/**
 * @method \Pyz\Zed\DataImport\Business\DataImportBusinessFactory getFactory()
 */
class UpdateAvailabilityAfterImport implements UpdateAvailabilityAfterImportInterface
{
    /**
     * @var \Spryker\Zed\Availability\Business\AvailabilityFacadeInterface
     */
    protected $availabilityFacade;

    /**
     * @param \Spryker\Zed\Availability\Business\AvailabilityFacadeInterface $availabilityFacade
     */
    public function __construct(AvailabilityFacadeInterface $availabilityFacade)
    {
        $this->availabilityFacade = $availabilityFacade;
    }

    /**
     * @return void
     */
    public function updateAvailability(): void
    {
        foreach (SpyProductQuery::create()->select([SpyProductTableMap::COL_SKU])->find() as $productConcreteSku) {
            $this->availabilityFacade->updateAvailability($productConcreteSku);
        }
    }
}
