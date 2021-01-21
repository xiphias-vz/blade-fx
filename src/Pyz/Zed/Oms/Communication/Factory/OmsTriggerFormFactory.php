<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Communication\Factory;

use Pyz\Zed\Oms\Communication\Form\DataProvider\OrderOmsTriggerFormDataProvider;
use Spryker\Zed\Oms\Communication\Factory\OmsTriggerFormFactory as SpyOmsTriggerFormFactory;
use Spryker\Zed\Oms\Communication\Form\OmsTriggerForm;
use Symfony\Component\Form\FormInterface;

class OmsTriggerFormFactory extends SpyOmsTriggerFormFactory implements OmsTriggerFormFactoryInterface
{
    /**
     * @var \Symfony\Component\Form\FormFactoryInterface
     */
    protected $formFactory;

    /**
     * @return \Pyz\Zed\Oms\Communication\Form\DataProvider\OrderOmsTriggerFormDataProvider
     */
    public function createPyzOrderOmsTriggerFormDataProvider(): OrderOmsTriggerFormDataProvider
    {
        return new OrderOmsTriggerFormDataProvider();
    }

    /**
     * @param string $redirectUrl
     * @param string $event
     * @param int $idSalesOrder
     * @param string|null $idPickingZone
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function getOrderOmsTriggerForm(string $redirectUrl, string $event, int $idSalesOrder, ?string $idPickingZone = null): FormInterface
    {
        $options = $this->createPyzOrderOmsTriggerFormDataProvider()
            ->getOptions($redirectUrl, $event, $idSalesOrder, $idPickingZone);

        return $this->formFactory->create(OmsTriggerForm::class, null, $options);
    }
}
