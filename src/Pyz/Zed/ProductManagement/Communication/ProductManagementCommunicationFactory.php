<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductManagement\Communication;

use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\ProductManagement\Communication\Form\DataProvider\ProductFormEditDataProvider;
use Pyz\Zed\ProductManagement\Communication\Form\ProductConcreteFormEdit;
use Pyz\Zed\ProductManagement\Communication\Table\ProductTable;
use Pyz\Zed\ProductManagement\Communication\Table\VariantTable;
use Pyz\Zed\ProductManagement\ProductManagementDependencyProvider;
use Pyz\Zed\User\Business\UserFacadeInterface;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\ProductManagement\Communication\ProductManagementCommunicationFactory as SpyProductManagementCommunicationFactory;

class ProductManagementCommunicationFactory extends SpyProductManagementCommunicationFactory
{
    /**
     * @param array $formData
     * @param array $formOptions
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createProductVariantFormEdit(array $formData, array $formOptions = [])
    {
        return $this->getFormFactory()->create(ProductConcreteFormEdit::class, $formData, $formOptions);
    }

    /**
     * @param int $idProductAbstract
     * @param string $type
     *
     * @return \Pyz\Zed\ProductManagement\Communication\Table\VariantTable
     */
    public function createVariantTable($idProductAbstract, $type)
    {
        return new VariantTable(
            $this->getProductQueryContainer(),
            $idProductAbstract,
            $this->getLocaleFacade()->getCurrentLocale(),
            $type
        );
    }

    /**
     * @return mixed
     */
    public function getUserFacade(): UserFacadeInterface
    {
        return $this->getProvidedDependency(ProductManagementDependencyProvider::FACADE_USER);
    }

    /**
     * @return \Spryker\Zed\Acl\Business\AclFacadeInterface
     */
    public function getAclFacade(): AclFacadeInterface
    {
        return $this->getProvidedDependency(ProductManagementDependencyProvider::FACADE_ACL);
    }

    /**
     * @return \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    public function getMerchantFacade(): MerchantFacadeInterface
    {
        return $this->getProvidedDependency(ProductManagementDependencyProvider::FACADE_MERCHANT);
    }

    /**
     * @return \Spryker\Zed\Gui\Communication\Table\AbstractTable
     */
    public function createProductTable()
    {
        return new ProductTable(
            $this->getProductQueryContainer(),
            $this->getLocaleFacade()->getCurrentLocale(),
            $this->createProductTypeHelper()
        );
    }

    /**
     * @return \Spryker\Zed\ProductManagement\Communication\Form\DataProvider\ProductFormEditDataProvider
     */
    public function createProductFormEditDataProvider()
    {
        $currentLocale = $this->getLocaleFacade()->getCurrentLocale();

        return new ProductFormEditDataProvider(
            $this->getCategoryQueryContainer(),
            $this->getQueryContainer(),
            $this->getProductQueryContainer(),
            $this->getStockQueryContainer(),
            $this->getProductFacade(),
            $this->getProductImageFacade(),
            $this->getPriceProductFacade(),
            $this->createLocaleProvider(),
            $currentLocale,
            $this->getProductAttributeCollection(),
            $this->getProductTaxCollection(),
            $this->getConfig()->getImageUrlPrefix(),
            $this->getStore()
        );
    }
}
