<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer;

use Generated\Shared\Transfer\SequenceNumberSettingsTransfer;
use Pyz\Shared\Customer\CustomerConfig as SharedCustomerConfig;
use Spryker\Shared\Customer\CustomerConstants;
use Spryker\Shared\SequenceNumber\SequenceNumberConstants;
use Spryker\Zed\Customer\CustomerConfig as SprykerCustomerConfig;

/**
 * @method \Spryker\Shared\Customer\CustomerConfig getSharedConfig()
 */
class CustomerConfig extends SprykerCustomerConfig
{
    /**
     * {@inheritDoc}
     *
     * @return array
     */
    public function getCustomerDetailExternalBlocksUrls()
    {
        return [
            'sales' => '/sales/customer/customer-orders',
            'notes' => '/customer-note-gui/index/index',
        ] + parent::getCustomerDetailExternalBlocksUrls();
    }

    /**
     * @api
     *
     * @param string $token
     * @param string|null $localePrefix
     *
     * @return string
     */
    public function getRegisterConfirmTokenUrl($token, ?string $localePrefix = null)
    {
        $hostYves = $this->getHostYves();

        if ($localePrefix !== null) {
            $hostYves .= '/' . $localePrefix;
        }

        return $hostYves . '/register/confirm?' . SharedCustomerConfig::PARAM_TOKEN . '=' . $token;
    }

    /**
     * @api
     *
     * @param string $token
     * @param string|null $localePrefix
     *
     * @return string
     */
    public function getCustomerPasswordRestoreTokenUrl($token, ?string $localePrefix = null)
    {
        $hostYves = $this->getHostYves();

        if ($localePrefix !== null) {
            $hostYves .= '/' . $localePrefix;
        }

        return $hostYves . '/password/restore?token=' . $token;
    }

    /**
     * @api
     *
     * @return \Generated\Shared\Transfer\SequenceNumberSettingsTransfer
     */
    public function getCustomerReferenceDefaults()
    {
        $sequenceNumberSettingsTransfer = new SequenceNumberSettingsTransfer();

        $sequenceNumberSettingsTransfer->setName(CustomerConstants::NAME_CUSTOMER_REFERENCE);
        $prefix = $this->get(SequenceNumberConstants::ENVIRONMENT_PREFIX) . $this->getUniqueIdentifierSeparator();
        $sequenceNumberSettingsTransfer->setPrefix($prefix);

        return $sequenceNumberSettingsTransfer;
    }
}
