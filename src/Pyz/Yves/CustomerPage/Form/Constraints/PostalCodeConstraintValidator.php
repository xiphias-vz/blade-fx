<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Form\Constraints;

use Generated\Shared\Transfer\CustomerAddressRequestTransfer;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class PostalCodeConstraintValidator extends ConstraintValidator
{
    /**
     * @param mixed $value
     * @param \Pyz\Yves\CustomerPage\Form\Constraints\PostalCodeConstraint $constraint
     *
     * @throws \Symfony\Component\Validator\Exception\UnexpectedTypeException
     *
     * @return void
     */
    public function validate($value, Constraint $constraint)
    {
        if (!$constraint instanceof PostalCodeConstraint) {
            throw new UnexpectedTypeException($constraint, __NAMESPACE__ . '\QueryStringConstraint');
        }

        $customerAddressRequestTransfer = (new CustomerAddressRequestTransfer())
            ->setPostalCode($value);

        $customerAddressResponseTransfer = $constraint->getBaseCustomerClient()->isPostalCodeWhiteListed($customerAddressRequestTransfer);

        if (!$customerAddressResponseTransfer->getIsSuccess()) {
            $this->context->buildViolation($constraint->getMessage())
                ->setParameter('{{ value }}', $this->formatValue($value))
                ->addViolation();
        }
    }
}
