<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Business;

use Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface;
use Pyz\Zed\Customer\Business\Customer\Customer;
use Pyz\Zed\Customer\Business\Customer\CustomerWriter;
use Pyz\Zed\Customer\Business\Customer\CustomerWriterInterface;
use Pyz\Zed\Customer\CustomerDependencyProvider;
use Pyz\Zed\MerchantRegion\Business\MerchantRegionFacadeInterface;
use Spryker\Zed\Customer\Business\CustomerBusinessFactory as SprykerCustomerBusinessFactory;

/**
 * @method \Spryker\Zed\Customer\CustomerConfig getConfig()
 * @method \Spryker\Zed\Customer\Persistence\CustomerQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\Customer\Persistence\CustomerEntityManagerInterface getEntityManager()
 * @method \Spryker\Zed\Customer\Persistence\CustomerRepositoryInterface getRepository()
 */
class CustomerBusinessFactory extends SprykerCustomerBusinessFactory
{
    /**
     * @return \Spryker\Zed\Customer\Business\Customer\CustomerInterface
     */
    public function createCustomer()
    {
        return new Customer(
            $this->getQueryContainer(),
            $this->createCustomerReferenceGenerator(),
            $this->getConfig(),
            $this->createEmailValidator(),
            $this->getMailFacade(),
            $this->getLocaleQueryContainer(),
            $this->getStore(),
            $this->createCustomerExpander(),
            $this->getPostCustomerRegistrationPlugins(),
            $this->getMailCmsBlock(),
            $this->getMerchantRegionFacade()
        );
    }

    /**
     * @return \Pyz\Zed\Customer\Business\Customer\CustomerWriterInterface
     */
    public function createCustomerWriter(): CustomerWriterInterface
    {
        return new CustomerWriter($this->getEntityManager());
    }

    /**
     * @return \Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface
     */
    private function getMailCmsBlock(): MailCmsBlockServiceInterface
    {
        return $this->getProvidedDependency(CustomerDependencyProvider::SERVICE_MAIL_CMS_BLOCK);
    }

    /**
     * @return \Pyz\Zed\MerchantRegion\Business\MerchantRegionFacadeInterface
     */
    private function getMerchantRegionFacade(): MerchantRegionFacadeInterface
    {
        return $this->getProvidedDependency(CustomerDependencyProvider::FACADE_MERCHANT_REGION);
    }
}
