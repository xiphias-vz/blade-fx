<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantGui\Communication\Tabs;

use Generated\Shared\Transfer\TabsViewTransfer;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\MerchantGui\Communication\Tabs\MerchantFormTabs as SprykerMerchantFormTabs;
use Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface;

class MerchantFormTabs extends SprykerMerchantFormTabs
{
    /**
     * @var \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface
     */
    protected $userFacade;

    /**
     * @var \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    protected $aclFacade;

    /**
     * @param array $merchantFormTabExpanderPlugins
     * @param \Spryker\Zed\Sales\Dependency\Facade\SalesToUserInterface $userFacade
     * @param \Spryker\Zed\Acl\Business\AclFacadeInterface $aclFacade
     */
    public function __construct(array $merchantFormTabExpanderPlugins, SalesToUserInterface $userFacade, AclFacadeInterface $aclFacade)
    {
        $this->userFacade = $userFacade;
        $this->aclFacade = $aclFacade;
        parent::__construct($merchantFormTabExpanderPlugins);
    }

    /**
     * @param \Generated\Shared\Transfer\TabsViewTransfer $tabsViewTransfer
     *
     * @return $this
     */
    protected function setFooter(TabsViewTransfer $tabsViewTransfer)
    {
        $tabsViewTransfer->setFooterTemplate('@MerchantGui/_partials/_form-submit.twig');

        return $this;
    }
}
