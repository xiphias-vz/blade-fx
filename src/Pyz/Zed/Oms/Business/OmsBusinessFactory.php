<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Oms\Business;

use Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface;
use Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface;
use Pyz\Zed\Oms\Business\Mail\MailHandler;
use Pyz\Zed\Oms\Business\OrderStateMachine\Finder;
use Pyz\Zed\Oms\Business\OrderStateMachine\LockedOrderStateMachine;
use Pyz\Zed\Oms\Business\OrderStateMachine\OrderStateMachine;
use Pyz\Zed\Oms\Business\OrderStateMachine\Timeout;
use Pyz\Zed\Oms\Business\Util\TransitionLog;
use Pyz\Zed\Oms\OmsDependencyProvider;
use Pyz\Zed\Sales\Business\SalesFacadeInterface;
use Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface;
use Spryker\Zed\Money\Business\MoneyFacadeInterface;
use Spryker\Zed\Oms\Business\OmsBusinessFactory as SprykerOmsBusinessFactory;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;
use Twig\Environment;

/**
 * @method \Pyz\Zed\Oms\OmsConfig getConfig()
 * @method \Spryker\Zed\Oms\Persistence\OmsQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Oms\Persistence\OmsRepositoryInterface getRepository()
 */
class OmsBusinessFactory extends SprykerOmsBusinessFactory
{
    /**
     * @return \Pyz\Zed\Oms\Business\OrderStateMachine\Finder
     */
    public function createOrderStateMachineFinder(): Finder
    {
        $config = $this->getConfig();

        return new Finder(
            $this->getQueryContainer(),
            $this->createOrderStateMachineBuilder(),
            $config->getActiveProcesses()
        );
    }

    /**
     * @return \Pyz\Zed\Oms\Business\Mail\MailHandler
     */
    public function createMailHandler()
    {
        return new MailHandler(
            $this->getQueryContainer(),
            $this->getSalesFacade(),
            $this->getMailFacade(),
            $this->getOmsOrderMailExpanderPlugins(),
            $this->getMoneyFacade(),
            $this->getConfig(),
            $this->getMailCmsBlockService(),
            $this->getUtilDateTimeService(),
            $this->getPyzSalesFacade(),
            $this->getTwigEnvironment(),
            $this->getDateTimeWithZoneService(),
            $this->getTranslatorFacade()
        );
    }

    /**
     * @return \Spryker\Zed\Money\Business\MoneyFacadeInterface
     */
    private function getMoneyFacade(): MoneyFacadeInterface
    {
        return $this->getProvidedDependency(OmsDependencyProvider::FACADE_MONEY);
    }

    /**
     * @return \Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface
     */
    private function getMailCmsBlockService(): MailCmsBlockServiceInterface
    {
        return $this->getProvidedDependency(OmsDependencyProvider::SERVICE_MAIL_CMS_BLOCK);
    }

    /**
     * @return \Pyz\Zed\Oms\Business\OrderStateMachine\TimeoutInterface
     */
    public function createOrderStateMachineTimeout()
    {
        return new Timeout(
            $this->getQueryContainer(),
            $this->getConfig(),
            $this->getStoreFacade(),
            $this->createTimeoutProcessorCollection()
        );
    }

    /**
     * @param array $logContext
     *
     * @return \Pyz\Zed\Oms\Business\OrderStateMachine\LockedOrderStateMachine
     */
    public function createLockedOrderStateMachine(array $logContext = [])
    {
        return new LockedOrderStateMachine(
            $this->createOrderStateMachine($logContext),
            $this->createTriggerLocker()
        );
    }

    /**
     * @param array $logContext
     *
     * @return \Pyz\Zed\Oms\Business\OrderStateMachine\OrderStateMachine|\Spryker\Zed\Oms\Business\OrderStateMachine\OrderStateMachineInterface
     */
    public function createOrderStateMachine(array $logContext = [])
    {
        return new OrderStateMachine(
            $this->getQueryContainer(),
            $this->createOrderStateMachineBuilder(),
            $this->createUtilTransitionLog($logContext),
            $this->createOrderStateMachineTimeout(),
            $this->createUtilReadOnlyArrayObject($this->getConfig()->getActiveProcesses()),
            $this->getProvidedDependency(OmsDependencyProvider::CONDITION_PLUGINS),
            $this->getProvidedDependency(OmsDependencyProvider::COMMAND_PLUGINS),
            $this->createUtilReservation(),
            $this->getConfig(),
            $this->getStoreFacade()
        );
    }

    /**
     * @return \Spryker\Service\UtilDateTime\UtilDateTimeServiceInterface
     */
    public function getUtilDateTimeService(): UtilDateTimeServiceInterface
    {
        return $this->getProvidedDependency(OmsDependencyProvider::SERVICE_UTIL_DATE_TIME);
    }

    /**
     * @return \Pyz\Zed\Sales\Business\SalesFacadeInterface
     */
    public function getPyzSalesFacade(): SalesFacadeInterface
    {
        return $this->getProvidedDependency(OmsDependencyProvider::PYZ_FACADE_SALES);
    }

    /**
     * @return \Twig\Environment
     */
    protected function getTwigEnvironment(): Environment
    {
        return $this->getProvidedDependency(OmsDependencyProvider::SERVICE_TWIG);
    }

    /**
     * @param array $logContext
     *
     * @return \Pyz\Zed\Oms\Business\Util\TransitionLogInterface
     */
    public function createUtilTransitionLog(array $logContext)
    {
        return new TransitionLog($this->getQueryContainer(), $logContext, $this->getUtilNetworkService());
    }

    /**
     * @return \Spryker\Zed\Translator\Business\TranslatorFacadeInterface
     */
    private function getTranslatorFacade(): TranslatorFacadeInterface
    {
        return $this->getProvidedDependency(OmsDependencyProvider::FACADE_TRANSLATOR);
    }

    /**
     * @return \Pyz\Service\DateTimeWithZone\DateTimeWithZoneServiceInterface
     */
    private function getDateTimeWithZoneService(): DateTimeWithZoneServiceInterface
    {
        return $this->getProvidedDependency(OmsDependencyProvider::SERVICE_DATE_TIME_WITH_ZONE);
    }
}
