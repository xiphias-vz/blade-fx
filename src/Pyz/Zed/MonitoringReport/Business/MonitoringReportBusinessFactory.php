<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MonitoringReport\Business;

use Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface;
use Pyz\Zed\Mail\Business\MailFacadeInterface;
use Pyz\Zed\MonitoringReport\Business\Mailer\MonitoringReportMailer;
use Pyz\Zed\MonitoringReport\Business\Model\FtpChecker\FtpChecker;
use Pyz\Zed\MonitoringReport\MonitoringReportDependencyProvider as MonitoringReportMonitoringReportDependencyProvider;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;
use Twig\Environment;

/**
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportQueryContainerInterface getQueryContainer()
 * @method \Pyz\Zed\MonitoringReport\MonitoringReportConfig getConfig()
 * @method \Pyz\Zed\MonitoringReport\Persistence\MonitoringReportRepositoryInterface getRepository()
 */
class MonitoringReportBusinessFactory extends AbstractBusinessFactory
{
    /**
     * @return \Pyz\Zed\MonitoringReport\Business\Mailer\MonitoringReportMailer
     */
    public function createMonitoringReportMailer(): MonitoringReportMailer
    {
        return new MonitoringReportMailer(
            $this->getMailFacade(),
            $this->getTwigEnvironment(),
            $this->getTranslatorFacade(),
            $this->getMailCmsBlock(),
            $this->getStore()
        );
    }

    /**
     * @return \Pyz\Zed\MonitoringReport\Business\Model\FtpChecker\FtpChecker
     */
    public function getFtpCashierFileChecker(): FtpChecker
    {
        return new FtpChecker(
            $this->getProvidedDependency(MonitoringReportMonitoringReportDependencyProvider::SERVICE_FLY_SYSTEM_SERVICE),
            $this->getConfig()
        );
    }

    /**
     * @return \Pyz\Zed\Mail\Business\MailFacadeInterface
     */
    public function getMailFacade(): MailFacadeInterface
    {
        return $this->getProvidedDependency(MonitoringReportMonitoringReportDependencyProvider::FACADE_MAIL);
    }

    /**
     * @return \Twig\Environment
     */
    protected function getTwigEnvironment(): Environment
    {
        return $this->getProvidedDependency(MonitoringReportMonitoringReportDependencyProvider::SERVICE_TWIG);
    }

    /**
     * @return \Spryker\Zed\Translator\Business\TranslatorFacadeInterface
     */
    public function getTranslatorFacade(): TranslatorFacadeInterface
    {
        return $this->getProvidedDependency(MonitoringReportMonitoringReportDependencyProvider::FACADE_TRANSLATOR);
    }

    /**
     * @return \Pyz\Service\MailCmsBlock\MailCmsBlockServiceInterface
     */
    private function getMailCmsBlock(): MailCmsBlockServiceInterface
    {
        return $this->getProvidedDependency(MonitoringReportMonitoringReportDependencyProvider::SERVICE_MAIL_CMS_BLOCK);
    }

    /**
     * @return \Spryker\Shared\Kernel\Store
     */
    private function getStore(): Store
    {
        return $this->getProvidedDependency(MonitoringReportMonitoringReportDependencyProvider::STORE);
    }
}
