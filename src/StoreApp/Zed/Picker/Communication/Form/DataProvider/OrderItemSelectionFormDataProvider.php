<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\Form\DataProvider;

use Generated\Shared\Transfer\OrderContainerTransfer;
use Pyz\Zed\Product\Business\ProductFacadeInterface;
use StoreApp\Zed\Picker\Communication\Form\OrderItemSelectionForm;

class OrderItemSelectionFormDataProvider
{
    /**
     * @var \Pyz\Zed\Product\Business\ProductFacadeInterface
     */
    private $productFacade;

    /**
     * @param \Pyz\Zed\Product\Business\ProductFacadeInterface $productFacade
     */
    public function __construct(ProductFacadeInterface $productFacade)
    {
        $this->productFacade = $productFacade;
    }

    /**
     * @param int $idSalesOrder
     *
     * @return array
     */
    public function getData(int $idSalesOrder): array
    {
        $c = (new OrderContainerTransfer())
            ->setCode(123);

        $c2 = (new OrderContainerTransfer())
            ->setCode(123);
        return [
            OrderItemSelectionForm::FIELD_ID_SALES_ORDER => $idSalesOrder,
//            OrderItemSelectionForm::FIELD_SALES_ORDER_CONTAINERS => [$c, $c2],
        ];
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer[] $itemTransfers
     * @param string $storeName
     *
     * @return array
     */
    public function getOptions(array $itemTransfers, string $storeName): array
    {
        $options = [
            OrderItemSelectionForm::OPTION_SALES_ORDER_ITEMS => [],
            OrderItemSelectionForm::OPTION_ITEM_ATTRIBUTES => [],
        ];

        if ($itemTransfers !== null) {
            $options[OrderItemSelectionForm::OPTION_SALES_ORDER_ITEMS] = $itemTransfers;
            $options[OrderItemSelectionForm::OPTION_ITEM_ATTRIBUTES] = $this->getProductAttributes(
                $itemTransfers,
                $storeName
            );
        }

        return $options;
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer[] $itemTransfers
     * @param string $storeName
     *
     * @return string[][]
     */
    protected function getProductAttributes(array $itemTransfers, string $storeName): array
    {
        $skus = array_keys($itemTransfers);

        return $this->productFacade->getConcreteSkuToAttributesMap($skus, $storeName);
    }
}
