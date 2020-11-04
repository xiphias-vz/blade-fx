<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Form;

use SprykerShop\Yves\CustomerPage\Form\ForgottenPasswordForm as SprykerForgottenPasswordForm;

class ForgottenPasswordForm extends SprykerForgottenPasswordForm
{
    public const FORM_NAME = 'forgottenPassword';

    /**
     * @return string
     */
    public function getBlockPrefix()
    {
        return self::FORM_NAME;
    }
}
