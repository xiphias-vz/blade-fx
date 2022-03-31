<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductAttributeGui\Communication\Form\DataProvider;

use Pyz\Zed\ProductAttributeGui\Communication\Form\AttributeForm;
use Spryker\Zed\ProductAttributeGui\Communication\Form\AttributeForm as AttributeFormAlias;
use Spryker\Zed\ProductAttributeGui\Communication\Form\DataProvider\AttributeFormDataProvider as SprykerAttributeFormDataProvider;

class AttributeFormDataProvider extends SprykerAttributeFormDataProvider
{
    /**
     * @param int|null $idProductManagementAttribute
     *
     * @return array
     */
    public function getOptions($idProductManagementAttribute = null)
    {
        $options = [
            AttributeFormAlias::OPTION_ATTRIBUTE_TYPE_CHOICES => $this->productAttributeFacade->getAttributeAvailableTypes(),
            AttributeFormAlias::OPTION_VALUES_CHOICES => [],
            AttributeForm::OPTION_FF_EXPORT_CHOICE => $this->getAttributeEntity($idProductManagementAttribute)->getSpyProductAttributeKey()->getFfExport(),
        ];

        if ($idProductManagementAttribute === null) {
            return $options;
        }

        $productManagementAttributeEntity = $this->getAttributeEntity($idProductManagementAttribute);

        $options[AttributeFormAlias::OPTION_IS_UPDATE] = true;
        $options[AttributeFormAlias::OPTION_VALUES_CHOICES] = $this->getValues($productManagementAttributeEntity);
        $options[AttributeForm::OPTION_FF_EXPORT_CHOICE] = $productManagementAttributeEntity->getSpyProductAttributeKey()->getFfExport();

        return $options;
    }
}
