<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantDataImport\Business\Model\DataSet;

use Spryker\Zed\MerchantDataImport\Business\Model\DataSet\MerchantDataSetInterface as SprykerMerchantDataSetInterfaceAlias;

interface MerchantDataSetInterface extends SprykerMerchantDataSetInterfaceAlias
{
    public const REGION_NUMBER = 'region_number';
    public const REGION_NAME = 'region_name';
    public const FILIAL_NUMBER = 'filial_number';
    public const ZIP_CODE = 'zip_code';
    public const CITY = 'city';
    public const STREET = 'street';
    public const LATITUDE = 'latitude';
    public const LONGITUDE = 'longitude';
    public const PICKING_CAPACITY_PER_SLOT = 'picking_capacity_per_slot';
    public const DELIVERY_CAPACITY_PER_SLOT = 'delivery_capacity_per_slot';
    public const STORE = 'store';
    public const ID_STORE = 'id_store';
}
