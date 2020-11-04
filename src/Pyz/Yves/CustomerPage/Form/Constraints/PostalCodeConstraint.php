<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Form\Constraints;

use Pyz\Client\Customer\CustomerClientInterface;
use Symfony\Component\Validator\Constraint;

class PostalCodeConstraint extends Constraint
{
    /**
     * @var string
     */
    protected $message = 'customer.address.zip_code_invalid';

    /**
     * @var \Pyz\Client\Customer\CustomerClientInterface
     */
    protected $customerBaseClient;

    /**
     * @return string
     */
    public function getMessage(): string
    {
        return $this->message;
    }

    /**
     * @return \Pyz\Client\Customer\CustomerClientInterface
     */
    public function getBaseCustomerClient(): CustomerClientInterface
    {
        return $this->customerBaseClient;
    }
}
