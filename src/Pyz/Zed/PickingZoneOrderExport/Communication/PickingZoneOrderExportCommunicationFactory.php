<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\PickingZoneOrderExport\Communication;

use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\PickingZoneOrderExport\Communication\Form\DataProvider\PickingZoneOrderExportFormDataProvider;
use Pyz\Zed\PickingZoneOrderExport\Communication\Form\PickingZoneOrderExportForm;
use Pyz\Zed\PickingZoneOrderExport\PickingZoneOrderExportDependencyProvider;
use Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface;
use Pyz\Zed\User\Business\UserFacadeInterface;
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
        return new PickingZoneOrderExportFormDataProvider($this->getPickingZoneFacade(), $this->getTimeSlotsFacade(), $this->getUserFacade(), $this->getMerchantFacade());
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

    /**
     * @return \Pyz\Zed\TimeSlot\Business\TimeSlotFacadeInterface
     */
    public function getTimeSlotsFacade(): TimeSlotFacadeInterface
    {
        return $this->getProvidedDependency(PickingZoneOrderExportDependencyProvider::FACADE_TIME_SLOTS);
    }

    /**
     * @return \Pyz\Zed\User\Business\UserFacadeInterface
     */
    public function getUserFacade(): UserFacadeInterface
    {
        return $this->getProvidedDependency(PickingZoneOrderExportDependencyProvider::FACADE_USER);
    }

    /**
     * @return \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    public function getMerchantFacade(): MerchantFacadeInterface
    {
        return $this->getProvidedDependency(PickingZoneOrderExportDependencyProvider::FACADE_MERCHANT);
    }
}
