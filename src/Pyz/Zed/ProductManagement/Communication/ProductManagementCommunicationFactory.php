<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductManagement\Communication;

use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\ProductManagement\Communication\Form\ProductConcreteFormEdit;
use Pyz\Zed\ProductManagement\Communication\Table\VariantTable;
use Pyz\Zed\ProductManagement\ProductManagementDependencyProvider;
use Spryker\Zed\Acl\Business\AclFacadeInterface;
use Spryker\Zed\ProductManagement\Communication\ProductManagementCommunicationFactory as SpyProductManagementCommunicationFactory;
use Spryker\Zed\Sales\SalesDependencyProvider;

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
    public function getUserFacade()
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
}
