<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Communication\Builder;

use Pyz\Zed\Oms\Communication\Factory\OmsTriggerFormFactoryInterface as PyzOmsTriggerFormFactoryInterface;
use Spryker\Zed\Oms\Communication\Builder\OmsTriggerFormCollectionBuilder as SpyOmsTriggerFormCollectionBuilder;
use Spryker\Zed\Oms\Communication\Factory\OmsTriggerFormFactoryInterface;

class OmsTriggerFormCollectionBuilder extends SpyOmsTriggerFormCollectionBuilder implements OmsTriggerFormCollectionBuilderInterface
{
    /**
     * @var \Pyz\Zed\Oms\Communication\Factory\OmsTriggerFormFactoryInterface
     */
    protected $pyzOmsTriggerFormFactory;

    /**
     * @param \Spryker\Zed\Oms\Communication\Factory\OmsTriggerFormFactoryInterface $omsTriggerFormFactory
     * @param \Pyz\Zed\Oms\Communication\Factory\OmsTriggerFormFactoryInterface $pyzOmsTriggerFormFactory
     */
    public function __construct(
        OmsTriggerFormFactoryInterface $omsTriggerFormFactory,
        PyzOmsTriggerFormFactoryInterface $pyzOmsTriggerFormFactory
    ) {
        parent::__construct($omsTriggerFormFactory);
        $this->pyzOmsTriggerFormFactory = $pyzOmsTriggerFormFactory;
    }

    /**
     * @param string $redirectUrl
     * @param string[] $events
     * @param int $idSalesOrder
     * @param string|null $idPickingZone
     *
     * @return \Symfony\Component\Form\FormView[]
     */
    public function buildOrderOmsTriggerFormCollection(string $redirectUrl, array $events, int $idSalesOrder, ?string $idPickingZone = null): array
    {
        $orderOmsTriggerFormCollection = [];

        foreach ($events as $event) {
            $orderOmsTriggerFormCollection[$event] = $this->pyzOmsTriggerFormFactory
                ->getOrderOmsTriggerForm($redirectUrl, $event, $idSalesOrder, $idPickingZone)
                ->createView();
        }

        return $orderOmsTriggerFormCollection;
    }
}
