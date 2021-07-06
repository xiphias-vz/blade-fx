<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantGui\Communication;

use Generated\Shared\Transfer\MerchantTransfer;
use Orm\Zed\AssortmentZone\Persistence\Base\PyzAssortmentPickZoneRelationQuery;
use Pyz\Zed\AssortmentZone\Business\AssortmentZoneFacadeInterface;
use Pyz\Zed\MerchantGui\Communication\Form\MerchantUpdateForm;
use Pyz\Zed\MerchantGui\Communication\Tabs\MerchantFormTabs;
use Pyz\Zed\MerchantGui\MerchantGuiDependencyProvider;
use Pyz\Zed\MerchantStorage\Business\MerchantStorageFacadeInterface;
use Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface;
use Pyz\Zed\Sales\SalesDependencyProvider as SalesSalesDependencyProvider;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\MerchantGui\Communication\MerchantGuiCommunicationFactory as SprykerMerchantGuiCommunicationFactory;
use Spryker\Zed\MerchantGui\Communication\Tabs\MerchantFormTabs as SprykerMerchantFormTabs;
use Spryker\Zed\Sales\SalesDependencyProvider;
use Symfony\Component\Form\FormInterface;

/**
 * @method \Spryker\Zed\MerchantGui\MerchantGuiConfig getConfig()
 */
class MerchantGuiCommunicationFactory extends SprykerMerchantGuiCommunicationFactory
{
    /**
     * @return \Pyz\Zed\MerchantGui\Communication\Tabs\MerchantFormTabs
     */
    public function createMerchantFormTabs(): SprykerMerchantFormTabs
    {
        return new MerchantFormTabs(
            $this->getMerchantFormTabsExpanderPlugins(),
            $this->getUserFacade(),
            $this->getAclFacade()
        );
    }

    /**
     * @return \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    public function getAclFacade(): AclFacadeInterface
    {
        return $this->getProvidedDependency(SalesSalesDependencyProvider::FACADE_ACL);
    }

    /**
     * @return \Pyz\Zed\MerchantStorage\Business\MerchantStorageFacadeInterface
     */
    public function getMerchantStorageFacade(): MerchantStorageFacadeInterface
    {
        return $this->getProvidedDependency(MerchantGuiDependencyProvider::MERCHANT_STORAGE_FACADE);
    }

    /**
     * @return \Pyz\Zed\AssortmentZone\Business\AssortmentZoneFacadeInterface
     */
    public function getAssortmentZoneFacade(): AssortmentZoneFacadeInterface
    {
        return $this->getProvidedDependency(MerchantGuiDependencyProvider::ASSORTMENT_ZONES);
    }

    /**
     * @return \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface
     */
    public function getUserFacade()
    {
        return $this->getProvidedDependency(SalesDependencyProvider::FACADE_USER);
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantTransfer|null $data
     * @param array $options
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function getMerchantUpdateForm(?MerchantTransfer $data = null, array $options = []): FormInterface
    {
        return $this->getFormFactory()->create(MerchantUpdateForm::class, $data, $options);
    }

    /**
     * @return \Pyz\Zed\PickingZone\Business\PickingZoneFacadeInterface
     */
    public function getPickingZoneFacade(): PickingZoneFacadeInterface
    {
        return $this->getProvidedDependency(MerchantGuiDependencyProvider::PICKING_ZONES);
    }

    /**
     * @return \Orm\Zed\AssortmentZone\Persistence\PyzAssortmentPickZoneRelationQuery
     */
    public function getAssortmentPickZoneRelationQuery(): PyzAssortmentPickZoneRelationQuery
    {
        return $this->getAssortmentPickZoneRelationQuery();
    }
}
