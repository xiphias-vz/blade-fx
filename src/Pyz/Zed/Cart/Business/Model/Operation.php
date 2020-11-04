<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Cart\Business\Model;

use Generated\Shared\Transfer\CartChangeTransfer;
use Generated\Shared\Transfer\QuoteResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Cart\Business\Model\Operation as SprykerOperation;
use Spryker\Zed\Cart\CartConfig;

class Operation extends SprykerOperation
{
    /**
     * @param \Generated\Shared\Transfer\CartChangeTransfer $cartChangeTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteResponseTransfer
     */
    public function addToCart(CartChangeTransfer $cartChangeTransfer): QuoteResponseTransfer
    {
        $cartChangeTransfer->requireQuote();
        $cartChangeTransfer->setOperation(CartConfig::OPERATION_ADD);

        $originalQuoteTransfer = (new QuoteTransfer())
            ->fromArray($cartChangeTransfer->getQuote()->modifiedToArray(), true);

        $quoteResponseTransfer = (new QuoteResponseTransfer())
            ->setIsSuccessful(false)
            ->setQuoteTransfer($originalQuoteTransfer);

        if ($this->quoteFacade->isQuoteLocked($originalQuoteTransfer)) {
            $this->messengerFacade->addErrorMessage($this->createMessengerMessageTransfer(static::GLOSSARY_KEY_LOCKED_CART_CHANGE_DENIED));

            return $this->addQuoteErrorsToQuoteResponse($quoteResponseTransfer);
        }

        $cartChangeTransfer = $this->normalizeCartChangeTransfer($cartChangeTransfer);
        $this->addInfoMessages(
            $this->getNotificationMessages($cartChangeTransfer)
        );

        $expandedCartChangeTransfer = $this->expandChangedItems($cartChangeTransfer);

        if (!$this->preCheckCart($cartChangeTransfer)) {
            return $this->addQuoteErrorsToQuoteResponse($quoteResponseTransfer);
        }

        $quoteTransfer = $this->cartStorageProvider->addItems($expandedCartChangeTransfer);
        $quoteTransfer = $this->executePostSavePlugins($quoteTransfer);
        $quoteTransfer = $this->recalculate($quoteTransfer);

        if ($this->isTerminated(static::TERMINATION_EVENT_NAME_ADD, $cartChangeTransfer, $quoteTransfer)) {
            return $quoteResponseTransfer;
        }

        $this->messengerFacade->addSuccessMessage($this->createMessengerMessageTransfer(self::ADD_ITEMS_SUCCESS));

        return $quoteResponseTransfer
            ->setQuoteTransfer($quoteTransfer)
            ->setIsSuccessful(true);
    }
}
