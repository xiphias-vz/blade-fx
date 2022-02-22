<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Business;

use Generated\Shared\Transfer\MailTransfer;
use Generated\Shared\Transfer\MonitoringTransfer;
use Orm\Zed\MonitoringReport\Persistence\PyzEmailSendQuery;
use Pyz\Zed\MonitoringReport\Communication\Plugin\Mail\AlarmEmailMailTypePlugin;
use Pyz\Zed\MonitoringReport\Persistence\MonitoringReportQueryContainer;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\MonitoringReport\Business\MonitoringReportBusinessFactory getFactory()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportRepositoryInterface getRepository()
 */
class MonitoringReportFacade extends AbstractFacade implements MonitoringReportFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\MonitoringTransfer $monitoringTransfer
     *
     * @return \Generated\Shared\Transfer\MonitoringTransfer
     */
    public function getDBVersion(MonitoringTransfer $monitoringTransfer): MonitoringTransfer
    {
        $query = new MonitoringReportQueryContainer();
        $response = $query->getDBVersion();
        $monitoringTransfer->setDbResponse($response);

        return $monitoringTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\MonitoringTransfer $monitoringTransfer
     *
     * @return \Generated\Shared\Transfer\MonitoringTransfer
     */
    public function getRedisKeys(MonitoringTransfer $monitoringTransfer): MonitoringTransfer
    {
        $query = new MonitoringReportQueryContainer();
        $keysDb = $query->getRedisKeys();
        $monitoringTransfer->setRedisKeys($keysDb);

        return $monitoringTransfer;
    }

    /**
     * @return void
     */
    public function sendAlarmMail()
    {
        $mailFacade = $this->getFactory()->getMailFacade();
        $mailsForSending = $this->getEmailsForSending();
        if (count($mailsForSending) != 0) {
            foreach ($mailsForSending as $mail) {
                $mailTransfer = new MailTransfer();
                $mailTransfer->setType(AlarmEmailMailTypePlugin::MAIL_TYPE);
                $mailTransfer->setAdditionalData([$mail]);

                $mailFacade->handleMail($mailTransfer);
                $mail->setSentAt(time());
                if ($mail->isModified()) {
                    $mail->save();
                }
            }
        } else {
            dump('THERE ARE NO EMAILS TO BE SENT');
        }
    }

    /**
     * @return array
     */
    public function getEmailsForSending(): array
    {
        $result = PyzEmailSendQuery::create()
            ->filterBySentAt(null)
            ->find();
        if ($result != null) {
            return $result->getData();
        }

        return [];
    }
}
