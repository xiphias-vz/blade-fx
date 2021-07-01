<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\AssortmentZone\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\AssortmentZone\Persistence\AssortmentZoneEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\AssortmentZone\Persistence\AssortmentZoneRepositoryInterface getRepository()()
 */
class AssortmentZoneFacade extends AbstractFacade implements AssortmentZoneFacadeInterface
{
    /**
     * @return array
     */
    public function queryAssortmentZones(): array
    {
        return $this->getRepository()
            ->getAssortmentZones();
    }
}
