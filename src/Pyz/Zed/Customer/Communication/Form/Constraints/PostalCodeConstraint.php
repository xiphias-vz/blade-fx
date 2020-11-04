<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Customer\Communication\Form\Constraints;

use Pyz\Zed\Customer\Business\CustomerFacadeInterface;
use Symfony\Component\Validator\Constraint;

class PostalCodeConstraint extends Constraint
{
    /**
     * @var string
     */
    protected $message = 'customer.address.zip_code_invalid';

    /**
     * @var \Pyz\Zed\Customer\Business\CustomerFacadeInterface
     */
    protected $customerFacade;

    /**
     * @return string
     */
    public function getMessage(): string
    {
        return $this->message;
    }

    /**
     * @return \Pyz\Zed\Customer\Business\CustomerFacadeInterface
     */
    public function getCustomerFacade(): CustomerFacadeInterface
    {
        return $this->customerFacade;
    }
}
