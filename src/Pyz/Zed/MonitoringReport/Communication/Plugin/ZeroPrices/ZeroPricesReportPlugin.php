<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Communication\Plugin\ZeroPrices;

use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\MonitoringReport\Business\MonitoringReportFacadeInterface getFacade()
 * @method \Pyz\Zed\MonitoringReport\Communication\MonitoringReportCommunicationFactory getFactory()
 * @method \Pyz\Zed\MonitoringReport\MonitoringReportConfig getConfig()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportRepositoryInterface getRepository()
 */
class ZeroPricesReportPlugin extends AbstractPlugin
{
    public const COLUMNS = ["store", "sapnumber", "gtin", "price", "pseudoprice", "promotion", "promotionstart", "promotionend"];
    public const ROLE_NAME = 'ZeroReportMail';
    public const DESCRIPTION = "Zero prices report";

    /**
     * @return void
     */
    public function checkAndSendMail()
    {
        $zeroReportData = $this->getRepository()->getZeroPricesData();
        if (count($zeroReportData) > 0) {
            $mailsToSend = $this->getRepository()->getEmailListForRoleName(static::ROLE_NAME);
            $mailBody = $this->getEmailBody($zeroReportData);
            foreach ($mailsToSend as $mail) {
                $this->getRepository()->setEmailToSend(static::DESCRIPTION, $mail, static::DESCRIPTION, $mailBody, true);
            }
        }
    }

    /**
     * @param array $data
     *
     * @return string
     */
    protected function getEmailBody(array $data): string
    {
        $header = "<table>
        <thead>
            <tr>
                <th>store</th>
                <th>sapnumber</th>
                <th>gtin</th>
                <th>price</th>
                <th>pseudoprice</th>
                <th>promotion</th>
                <th>promotionstart</th>
                <th>promotionend</th>
            </tr>
        </thead>";

        $rowTemplate = " <tr>
                <td>{{store}}</td>
                <td>{{sapnumber}}</td>
                <td>{{gtin}}</td>
                <td>{{price}}</td>
                <td>{{pseudoprice}}</td>
                <td>{{promotion}}</td>
                <td>{{promotionstart}}</td>
                <td>{{promotionend}}</td>
            </tr>";

        foreach ($data as $row) {
            $res = $rowTemplate;
            foreach (static::COLUMNS as $col) {
                $res = str_replace("{{" . $col . "}}", $row[$col], $res);
            }
            $header .= $res;
        }
        $header .= "</table>";

        return $header;
    }
}
