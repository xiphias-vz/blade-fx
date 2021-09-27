<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payone\Business\TransactionStatus;

use Orm\Zed\Payone\Persistence\SpyPaymentPayone;
use Orm\Zed\Payone\Persistence\SpyPaymentPayoneTransactionStatusLog;
use SprykerEco\Shared\Payone\Dependency\TransactionStatusUpdateInterface;
use SprykerEco\Zed\Payone\Business\Api\TransactionStatus\TransactionStatusResponse;
use SprykerEco\Zed\Payone\Business\TransactionStatus\TransactionStatusUpdateManager as SprykerEcoTransactionStatusUpdateManager;

class TransactionStatusUpdateManager extends SprykerEcoTransactionStatusUpdateManager
{
    /**
     * @param \SprykerEco\Shared\Payone\Dependency\TransactionStatusUpdateInterface $request
     *
     * @return \SprykerEco\Zed\Payone\Business\Api\TransactionStatus\TransactionStatusResponse
     */
    public function processTransactionStatusUpdate(TransactionStatusUpdateInterface $request): TransactionStatusResponse
    {
        $validationResult = $this->validate($request);
        if ($validationResult instanceof TransactionStatusResponse) {
            return $validationResult;
        }
        $this->transformCurrency($request);

        $paymentPayoneEntity = $this->findPaymentByTransactionId($request->getTxid());

        if (!$paymentPayoneEntity) {
            return $this->createErrorResponse('Payone transaction status update: Payment was not found!');
        }

        $this->persistRequest($request, $paymentPayoneEntity);

        return $this->createSuccessResponse();
    }

    /**
     * @param int $transactionId
     *
     * @return \Orm\Zed\Payone\Persistence\SpyPaymentPayone|null
     */
    protected function findPaymentByTransactionId(int $transactionId): ?SpyPaymentPayone
    {
        return parent::findPaymentByTransactionId($transactionId);
    }

    /**
     * @param \SprykerEco\Shared\Payone\Dependency\TransactionStatusUpdateInterface $request
     * @param \Orm\Zed\Payone\Persistence\SpyPaymentPayone|null $paymentPayoneEntity
     *
     * @return void
     */
    protected function persistRequest(TransactionStatusUpdateInterface $request, ?SpyPaymentPayone $paymentPayoneEntity = null): void
    {
        if (!$paymentPayoneEntity) {
            return;
        }

        $paymentPayoneTransactionStatusLogEntity = new SpyPaymentPayoneTransactionStatusLog();
        $paymentPayoneTransactionStatusLogEntity->setFkPaymentPayone($paymentPayoneEntity->getIdPaymentPayone());
        $paymentPayoneTransactionStatusLogEntity->setTransactionId($request->getTxid());
        $paymentPayoneTransactionStatusLogEntity->setReferenceId($request->getReference());
        $paymentPayoneTransactionStatusLogEntity->setMode($request->getMode());
        $paymentPayoneTransactionStatusLogEntity->setStatus($request->getTxaction());
        $paymentPayoneTransactionStatusLogEntity->setTransactionTime($request->getTxtime());
        $paymentPayoneTransactionStatusLogEntity->setSequenceNumber($request->getSequencenumber());
        $paymentPayoneTransactionStatusLogEntity->setClearingType($request->getClearingtype());
        $paymentPayoneTransactionStatusLogEntity->setPortalId($request->getPortalid());
        $paymentPayoneTransactionStatusLogEntity->setPrice($request->getPrice());
        $paymentPayoneTransactionStatusLogEntity->setBalance($request->getBalance());
        $paymentPayoneTransactionStatusLogEntity->setReceivable($request->getReceivable());
        $paymentPayoneTransactionStatusLogEntity->setReminderLevel($request->getReminderlevel());
        $paymentPayoneTransactionStatusLogEntity->setRawRequest($request);

        $paymentPayoneTransactionStatusLogEntity->save();
    }
}
