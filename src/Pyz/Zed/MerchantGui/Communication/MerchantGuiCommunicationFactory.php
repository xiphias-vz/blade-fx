<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantGui\Communication;

use Generated\Shared\Transfer\MerchantTransfer;
use Pyz\Zed\MerchantGui\Communication\Form\MerchantUpdateForm;
use Pyz\Zed\MerchantGui\Communication\Tabs\MerchantFormTabs;
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
}
