<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\DummyPayment;

use Pyz\Yves\DummyPayment\Form\InvoiceSubForm;
use Spryker\Yves\DummyPayment\Form\CreditCardSubForm;
use Spryker\Yves\DummyPayment\Form\DataProvider\DummyPaymentCreditCardFormDataProvider;
use Spryker\Yves\DummyPayment\Form\DataProvider\DummyPaymentInvoiceFormDataProvider;
use Spryker\Yves\DummyPayment\Handler\DummyPaymentHandler;
use Spryker\Yves\Kernel\AbstractFactory;

class DummyPaymentFactory extends AbstractFactory
{
    /**
     * @return \Spryker\Yves\DummyPayment\Form\CreditCardSubForm
     */
    public function createCreditCardForm()
    {
        return new CreditCardSubForm();
    }

    /**
     * @return \Spryker\Yves\DummyPayment\Form\DataProvider\DummyPaymentCreditCardFormDataProvider
     */
    public function createCreditCardFormDataProvider()
    {
        return new DummyPaymentCreditCardFormDataProvider();
    }

    /**
     * @return \Pyz\Yves\DummyPayment\Form\InvoiceSubForm
     */
    public function createInvoiceForm()
    {
        return new InvoiceSubForm();
    }

    /**
     * @return \Spryker\Yves\DummyPayment\Form\DataProvider\DummyPaymentInvoiceFormDataProvider
     */
    public function createInvoiceFormDataProvider()
    {
        return new DummyPaymentInvoiceFormDataProvider();
    }

    /**
     * @return \Spryker\Yves\DummyPayment\Handler\DummyPaymentHandler
     */
    public function createDummyPaymentHandler()
    {
        return new DummyPaymentHandler();
    }
}
