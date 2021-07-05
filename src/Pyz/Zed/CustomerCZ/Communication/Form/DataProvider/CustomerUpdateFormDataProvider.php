<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Customer_CZ\Communication\Form\DataProvider;

use Orm\Zed\Customer\Persistence\Map\SpyCustomerTableMap;
use Pyz\Zed\Customer\Communication\Form\CustomerForm;
use Spryker\Zed\Customer\Communication\Form\DataProvider\CustomerUpdateFormDataProvider as SprykerCustomerUpdateFormDataProvider;

class CustomerUpdateFormDataProvider extends SprykerCustomerUpdateFormDataProvider
{
    /**
     * @param int|null $idCustomer
     *
     * @return array
     */
    public function getOptions($idCustomer = null)
    {
        $options = parent::getOptions($idCustomer);
        $options[CustomerForm::OPTION_CUSTOMER_QUALITY] = $this->getCustomerQuality();
        return $options;
    }

    /**
     * @return array
     */
    protected function getCustomerQuality()
    {
        $riskFlagSet = SpyCustomerTableMap::getValueSet(SpyCustomerTableMap::COL_RISK_FLAG);

        return array_combine($riskFlagSet, $riskFlagSet);
    }
}
