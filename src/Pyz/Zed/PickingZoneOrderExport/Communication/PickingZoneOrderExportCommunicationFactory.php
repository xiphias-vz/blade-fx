<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Communication;

use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\PickingZoneOrderExport\Communication\Form\DataProvider\PickingZoneOrderExportFormDataProvider;
use Pyz\Zed\PickingZoneOrderExport\Communication\Form\PickingZoneOrderExportForm;
use Pyz\Zed\PickingZoneOrderExport\PickingZoneOrderExportDependencyProvider;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Symfony\Component\Form\FormInterface;

/**
 * @method \Pyz\Zed\PickingZoneOrderExport\Business\PickingZoneOrderExportFacadeInterface getFacade()
 * @method \Pyz\Zed\PickingZoneOrderExport\PickingZoneOrderExportConfig getConfig()
 */
class PickingZoneOrderExportCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @return \Pyz\Zed\PickingZoneOrderExport\Communication\Form\DataProvider\PickingZoneOrderExportFormDataProvider
     */
    public function createPickingZoneOrderExportFormDataProvider(): PickingZoneOrderExportFormDataProvider
    {
        return new PickingZoneOrderExportFormDataProvider($this->getPickingZoneFacade());
    }

    /**
     * @param mixed[] $options
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createPickingZoneOrderExportForm(array $options): FormInterface
    {
        return $this->getFormFactory()->create(PickingZoneOrderExportForm::class, [], $options);
    }

    /**
     * @return \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface
     */
    public function getPickingZoneFacade(): PickingZoneFacadeInterface
    {
        return $this->getProvidedDependency(PickingZoneOrderExportDependencyProvider::FACADE_PICKING_ZONE);
    }
}
