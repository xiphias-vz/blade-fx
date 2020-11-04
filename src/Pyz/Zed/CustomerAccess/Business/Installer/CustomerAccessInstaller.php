<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CustomerAccess\Business\Installer;

use Spryker\Zed\CustomerAccess\Business\Installer\CustomerAccessInstaller as SprykerCustomerAccessInstaller;

class CustomerAccessInstaller extends SprykerCustomerAccessInstaller
{
    /**
     * @return void
     */
    public function install(): void
    {
        $contentTypeAccess = $this->customerAccessConfig->getContentTypeAccess();
        $contentAccessByType = $this->customerAccessConfig->getContentAccessByType();

        foreach ($this->customerAccessConfig->getContentTypes() as $contentType) {
            $isGranted = $contentAccessByType[$contentType] ?? $contentTypeAccess;

            $this->customerAccessCreator->createCustomerAccess($contentType, !$isGranted);
        }
    }
}
