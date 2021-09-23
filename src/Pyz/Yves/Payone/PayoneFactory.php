<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\Payone;

use Pyz\Yves\Payone\Form\CreditCardSubForm;
use Pyz\Yves\Payone\Form\EWalletSubForm;
use SprykerEco\Yves\Payone\Form\AbstractPayoneSubForm;
use SprykerEco\Yves\Payone\PayoneFactory as SprykerEcoPayoneFactory;

/**
 * @method \SprykerEco\Yves\Payone\PayoneConfig getConfig()
 */
class PayoneFactory extends SprykerEcoPayoneFactory
{
    /**
     * @return \Pyz\Yves\Payone\Form\CreditCardSubForm
     */
    public function createCreditCardSubForm(): AbstractPayoneSubForm
    {
        return new CreditCardSubForm();
    }

    /**
     * @return \Pyz\Yves\Payone\Form\EWalletSubForm
     */
    public function createEWalletSubForm(): AbstractPayoneSubForm
    {
        return new EWalletSubForm();
    }
}
