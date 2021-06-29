<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductManagement\Communication;

use Pyz\Zed\ProductManagement\Communication\Form\ProductConcreteFormEdit;
use Pyz\Zed\ProductManagement\Communication\Table\VariantTable;
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
}
