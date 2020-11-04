<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\User\Communication\Form\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class PasswordConstraintValidator extends ConstraintValidator
{
    /**
     * @param mixed $value
     * @param \Symfony\Component\Validator\Constraint|\Spryker\Zed\User\Communication\Form\Constraints\CurrentPassword $constraint
     *
     * @throws \Symfony\Component\Validator\Exception\UnexpectedTypeException
     *
     * @return void
     */
    public function validate($value, Constraint $constraint)
    {
        if (!$constraint instanceof PasswordConstraint) {
            throw new UnexpectedTypeException($constraint, PasswordConstraint::class);
        }

        if ($value === null || $this->isValidPassword($value, $constraint)) {
            return;
        }

        $this->context->buildViolation($constraint->getMessage())
            ->setParameter('{{ value }}', $this->formatValue($value))
            ->addViolation();
    }

    /**
     * @param string $password
     * @param \Pyz\Zed\User\Communication\Form\Constraints\PasswordConstraint $constraint
     *
     * @return bool
     */
    protected function isValidPassword(string $password, PasswordConstraint $constraint): bool
    {
        return $constraint->getUserService()->validatePassword($password);
    }
}
