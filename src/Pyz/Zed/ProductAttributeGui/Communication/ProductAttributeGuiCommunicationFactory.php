<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductAttributeGui\Communication;

use Pyz\Zed\ProductAttributeGui\Communication\Form\AttributeForm;
use Pyz\Zed\ProductAttributeGui\Communication\Form\DataProvider\AttributeFormDataProvider;
use Spryker\Zed\ProductAttributeGui\Communication\ProductAttributeGuiCommunicationFactory as SprykerProductAttributeGuiCommunicationFactory;
use Symfony\Component\Form\FormInterface;

class ProductAttributeGuiCommunicationFactory extends SprykerProductAttributeGuiCommunicationFactory
{
    /**
     * @param array $data
     * @param array $options
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    public function getAttributeForm(array $data = [], array $options = []): FormInterface
    {
        return $this->getFormFactory()->create(AttributeForm::class, $data, $options);
    }

    /**
     * @return \Pyz\Zed\ProductAttributeGui\Communication\Form\DataProvider\AttributeFormDataProvider
     */
    public function createAttributeFormDataProvider()
    {
        return new AttributeFormDataProvider(
            $this->getProductAttributeQueryContainer(),
            $this->getProductAttributeFacade()
        );
    }
}
