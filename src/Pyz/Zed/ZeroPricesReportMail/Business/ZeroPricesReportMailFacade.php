<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ZeroPricesReportMail\Business;

use Generated\Shared\Transfer\MailTransfer;
use PDO;
use PDOException;
use Propel\Runtime\Propel;
use Pyz\Zed\ZeroPricesReportMail\Communication\Plugin\Mail\ZeroPricesReportMailTypePlugin;
use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\ZeroPricesReportMail\Business\ZeroPricesReportMailBusinessFactory getFactory()
 */
class ZeroPricesReportMailFacade extends AbstractFacade implements ZeroPricesReportMailFacadeInterface
{
    /**
     * @return void
     */
    public function sendOrderConfirmationMail()
    {
        $mailFacade = $this->getFactory()->getMailFacade();

        $mailTransfer = new MailTransfer();

        $mailTransfer->setType(ZeroPricesReportMailTypePlugin::MAIL_TYPE);

        $mailTransfer->setAdditionalData($this->getData());

        $mailFacade->handleMail($mailTransfer);
    }

    /**
     * @return array
     */
    protected function getData(): array
    {
        $sql = "select pipp.store , pipp.sapnumber, pipp.gtin, pipp.price, pipp.pseudoprice, pipp.promotion, pipp.promotionstart, pipp.promotionend
                from pyz_imp_price_product pipp
                where dtImported > (select DATE_ADD(max(dtImported), INTERVAL -1 DAY) from pyz_imp_price_product)
                	and (price = 0 or (pseudoprice = 0 and promotionend > now()))
                order by pipp.store , pipp.sapnumber";

        return $this->getResult($sql);
    }

    /**
     * @param string $sql
     *
     * @return array
     */
    private function getResult(string $sql): array
    {
        try {
            $connection = Propel::getConnection();
            $statement = $connection->prepare($sql);
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_NAMED);
        } catch (PDOException $ex) {
        }

        return [];
    }
}
