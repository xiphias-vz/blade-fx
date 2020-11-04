<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CustomerAccess\Persistence;

use DateTime;
use Generated\Shared\Transfer\CustomerAccessTransfer;
use Spryker\Zed\CustomerAccess\Persistence\CustomerAccessEntityManager as SprykerCustomerAccessEntityManager;

class CustomerAccessEntityManager extends SprykerCustomerAccessEntityManager
{
    /**
     * @param string $contentType
     * @param bool $isRestricted
     *
     * @return \Generated\Shared\Transfer\CustomerAccessTransfer
     */
    public function createCustomerAccess(string $contentType, bool $isRestricted): CustomerAccessTransfer
    {
        $customerAccessEntity = $this->getFactory()->customerAccessQuery()
            ->filterByContentType($contentType)
            ->findOneOrCreate();

        $customerAccessEntity->setIsRestricted($isRestricted);

        if (!$customerAccessEntity->isNew()) {
            $customerAccessEntity->setUpdatedAt(new DateTime());
        }

        $customerAccessEntity->save();

        return $this->getFactory()
            ->createCustomerAccessMapper()
            ->mapEntityToCustomerAccessTransfer($customerAccessEntity, new CustomerAccessTransfer());
    }
}
