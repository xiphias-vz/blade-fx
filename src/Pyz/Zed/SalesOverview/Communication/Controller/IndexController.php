<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesOverview\Communication\Controller;

use Spryker\Zed\Sales\Communication\Controller\IndexController as SprykerIndexController;

/**
 * @method \Pyz\Zed\SalesOverview\Communication\SalesOverviewCommunicationFactory getFactory()
 */
class IndexController extends SprykerIndexController
{
    protected const CONST_SUMME = 'Total';
    protected const CONST_MERCHANT = '1004';
    protected const CONST_CHOICE = 1;

    /**
     * @return array
     */
    public function indexAction()
    {
        $userTransfer = $this->getFactory()
            ->getUserFacade();

        $merchantReferenceByUser = $userTransfer->getCurrentUser()->getMerchantReference();

        $merchantList = $this->getFactory()->merchantList();
        $choiceFilter = $this->getFactory()->choiceFilter();
        $tableHeader = $this->getFactory()->getTableHeaderContent();
        $tableTimeSlots = $this->getFactory()->getTimeSlotsForTableRows();
        $tableTimeSlots[static::CONST_SUMME] = static::CONST_SUMME;
        $tableColumnWidth = 100 / count($tableHeader);
        $merchant = static::CONST_MERCHANT;
        $date = date("Y-m-d");
        $choice = static::CONST_CHOICE;
        if (isset($_REQUEST['merchant'])) {
            if ($_REQUEST['merchant'] != "" && $_REQUEST['merchant'] != null) {
                $merchant = $_REQUEST['merchant'];
            }
        }
        if (isset($_REQUEST['date'])) {
            if ($_REQUEST['date'] != "" && $_REQUEST['date'] != null) {
                $date = $_REQUEST['date'];
            }
        }
        if (isset($_REQUEST['choice'])) {
            if ($_REQUEST['choice'] != "" && $_REQUEST['choice'] != null) {
                $choice = $_REQUEST['choice'];
            }
        }
        $data = $this->getFactory()
            ->getSalesOverviewRepository()
            ->getDataByChoiceFilter($choice, $date, $merchant);

        return [
            'merchantList' => $merchantList,
            'merchantReferenceByUser' => $merchantReferenceByUser,
            'choiceFilter' => $choiceFilter,
            'merchant' => $merchant,
            'date' => $date,
            'choice' => $choice,
            'tableHeader' => $tableHeader,
            'tableColumnWidth' => $tableColumnWidth,
            'tableTimeSlots' => $tableTimeSlots,
            'tableData' => $data,
        ];
    }
}
