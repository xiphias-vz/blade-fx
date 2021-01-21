<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Communication\Builder;

interface OmsTriggerFormCollectionBuilderInterface
{
    /**
     * @param string $redirectUrl
     * @param string[] $events
     * @param int $idSalesOrder
     * @param string|null $idPickingZone
     *
     * @return \Symfony\Component\Form\FormView[]
     */
    public function buildOrderOmsTriggerFormCollection(string $redirectUrl, array $events, int $idSalesOrder, ?string $idPickingZone = null): array;
}
