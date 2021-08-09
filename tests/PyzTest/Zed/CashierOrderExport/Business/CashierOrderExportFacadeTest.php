<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace PyzTest\Zed\CashierOrderExport\Business;

use Codeception\TestCase\Test;
use DateTime;
use Generated\Shared\Transfer\ItemStateTransfer;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\ProductOptionTransfer;
use Generated\Shared\Transfer\TotalsTransfer;
use Pyz\Zed\CashierOrderExport\Business\CashierOrderExportFacade;
use Spryker\Zed\Product\Persistence\ProductQueryContainer;

/**
 * Auto-generated group annotations
 *
 * @group PyzTest
 * @group Zed
 * @group CashierOrderExport
 * @group Business
 * @group Facade
 * @group CashierOrderExportFacadeTest
 * Add your own group annotations below this line
 */
class CashierOrderExportFacadeTest extends Test
{
    /**
     * @var \Spryker\Zed\Product\Persistence\ProductQueryContainerInterface
     */
    protected $productQueryContainer;

    /**
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->productQueryContainer = new ProductQueryContainer();
    }

    /**
     * @var \PyzTest\Zed\CashierOrderExport\CashierOrderExportBusinessTester
     */
    public $tester;

    /**
     * @return void
     */
    public function testCreationXmlCashierFile(): void
    {
        //Arrange
        $orderTransfer = $this->createOrderTransfer();
        $cashierOrderExportFacade = $this->createCashierOrderExportFacade();

        //Act
        $output = $cashierOrderExportFacade->writeXml($orderTransfer);

        //Assert
        $this->tester->assertNotEmpty($output);
    }

    /**
     * @return void
     */
    public function testCreationTxtCashierFile(): void
    {
        //Arrange
        $orderTransfer = $this->createOrderTransfer();
        $cashierOrderExportFacade = $this->createCashierOrderExportFacade();

        //Act
        $output = $cashierOrderExportFacade->writeTxt($orderTransfer);

        //Assert
        $this->tester->assertNotEmpty($output);
    }

    /**
     * @return \Pyz\Zed\CashierOrderExport\Business\CashierOrderExportFacade
     */
    protected function createCashierOrderExportFacade(): CashierOrderExportFacade
    {
        return new CashierOrderExportFacade();
    }

    /**
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    protected function createOrderTransfer(): OrderTransfer
    {
        $dateObj = new DateTime();
        $date = $dateObj->format('Y-m-d');
        $orderTransfer = (new OrderTransfer())
            ->setIdSalesOrder(100)
            ->setOrderReference('000001000')
            ->setStore('EIN')
            ->setMerchantReference('1004')
            ->setCreatedAt($date);

        $totalsTransfer = (new TotalsTransfer())
            ->setGrandTotal(120);

        $orderTransfer->setTotals($totalsTransfer);

        $productSkus = $this->getProductSkus();
        $productSkusLength = count($productSkus);
        for ($i = 0; $i < $productSkusLength; $i++) {
            $itemTransfer = new ItemTransfer();
            $productOptionTransfer = new ProductOptionTransfer();
            $itemTransfer->setSku($productSkus[$i]);
            $itemTransfer->setName('Product');
            $itemTransfer->setTaxRate(19 + $i);
            $itemTransfer->setQuantity(2 + $i);
            $itemTransfer->setUnitGrossPrice(100 + $i);
            $itemTransfer->setUnitNetPrice(80 + $i);
            $itemTransfer->setSumTaxAmount(12);
            $productOptionTransfer->setUnitGrossPrice(20 + $i);
            $productOptionTransfer->setQuantity(1);
            $productOptionTransfer->setTaxRate(1);
            $productOptionTransfer->setValue('Product');
            $productOptionTransfer->setSku($productSkus[$i]);
            $itemTransfer->addProductOption($productOptionTransfer);
            $itemTransfer->setPricePerKg(12);
            $itemTransfer->setWeightPerUnit(134);
            $itemStateTransfer = new ItemStateTransfer();
            $itemStateTransfer->setName('ready for collection');
            $itemTransfer->setState($itemStateTransfer);

            $orderTransfer->addItem($itemTransfer);
        }

        return $orderTransfer;
    }

    /**
     * @return array
     */
    protected function getProductSkus(): array
    {
        return $this->productQueryContainer
            ->queryProduct()
            ->select(['sku'])
            ->limit(5)
            ->find()
            ->getData();
    }
}
