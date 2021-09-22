<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms;

use Pyz\Shared\Oms\OmsConstants;
use Spryker\Shared\Customer\CustomerConstants;
use Spryker\Zed\Oms\OmsConfig as SprykerOmsConfig;

class OmsConfig extends SprykerOmsConfig
{
    protected const ORDER_CONFIRMATION_PRODUCT_LIST_TEMPLATE = '@Oms/template/order_product_list.twig';
    protected const ORDER_CONFIRMATION_COLLECT_NUMBER_TEMPLATE = '@Oms/template/collect_number.twig';
    protected const ORDER_SHIPPED_PRODUCT_LIST = '@Oms/template/order_canceled_product_list.twig';
    protected const ORDER_SIMILAR_PRODUCT_LIST = '@Oms/template/similar_product.twig';

    /**
     * @return int|null
     */
    public function getOmsProcessWorkerChunkSize()
    {
        $config = $this->getConfig();
        if ($config->haskey(OmsConstants::OMS_PROCESS_WORKER_CHUNK_SIZE)) {
            return $config->get(OmsConstants::OMS_PROCESS_WORKER_CHUNK_SIZE);
        }

        return null;
    }

    /**
     * @return string
     */
    public function getOrderConfirmationProductListTemplate(): string
    {
        return static::ORDER_CONFIRMATION_PRODUCT_LIST_TEMPLATE;
    }

    /**
     * @return string
     */
    public function getOrderConfirmationCollectNumberTemplate(): string
    {
        return static::ORDER_CONFIRMATION_COLLECT_NUMBER_TEMPLATE;
    }

    /**
     * @return string
     */
    public function getOrderShippedProductListTemplate(): string
    {
        return static::ORDER_SHIPPED_PRODUCT_LIST;
    }

    /**
     * @return string
     */
    public function getBaseUrlYves(): string
    {
        return $this->get(CustomerConstants::BASE_URL_YVES);
    }

    /**
     * @return string
     */
    public function getSimilarProductListTemplate(): string
    {
        return static::ORDER_SIMILAR_PRODUCT_LIST;
    }
}
