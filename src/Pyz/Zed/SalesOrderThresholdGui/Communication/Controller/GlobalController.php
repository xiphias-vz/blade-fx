<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOrderThresholdGui\Communication\Controller;

use Generated\Shared\Transfer\CurrencyTransfer;
use Generated\Shared\Transfer\StoreTransfer;
use Pyz\Shared\SalesOrderThreshold\SalesOrderThresholdConfig;
use Pyz\Zed\SalesOrderThresholdGui\Communication\Form\GlobalThresholdType;
use Pyz\Zed\SalesOrderThresholdGui\SalesOrderThresholdGuiConfig;
use Spryker\Zed\SalesOrderThresholdGui\Communication\Controller\GlobalController as SprykerGlobalController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

class GlobalController extends SprykerGlobalController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Symfony\Component\Form\FormInterface $globalThresholdForm
     * @param \Generated\Shared\Transfer\StoreTransfer $storeTransfer
     * @param \Generated\Shared\Transfer\CurrencyTransfer $currencyTransfer
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    protected function handleFormSubmission(
        Request $request,
        FormInterface $globalThresholdForm,
        StoreTransfer $storeTransfer,
        CurrencyTransfer $currencyTransfer
    ): RedirectResponse {
        $data = $globalThresholdForm->getData();

        $this->handleThresholdData(
            $data[GlobalThresholdType::FIELD_HARD],
            SalesOrderThresholdGuiConfig::GROUP_HARD,
            $storeTransfer,
            $currencyTransfer
        );

        $this->handleThresholdData(
            $data[GlobalThresholdType::FIELD_HARD_MAX],
            SalesOrderThresholdConfig::GROUP_HARD_MAX,
            $storeTransfer,
            $currencyTransfer
        );

        $this->addSuccessMessage(static::MESSAGE_UPDATE_SUCCESSFUL);

        return $this->redirectResponse($request->getRequestUri());
    }
}
