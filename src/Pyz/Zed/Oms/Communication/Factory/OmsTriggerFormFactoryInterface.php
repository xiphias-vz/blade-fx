<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Communication\Factory;

use Symfony\Component\Form\FormInterface;

interface OmsTriggerFormFactoryInterface
{
    /**
     * @param string $redirectUrl
     * @param string $event
     * @param int $idSalesOrder
     * @param string|null $idPickingZone
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function getOrderOmsTriggerForm(string $redirectUrl, string $event, int $idSalesOrder, ?string $idPickingZone = null): FormInterface;
}
