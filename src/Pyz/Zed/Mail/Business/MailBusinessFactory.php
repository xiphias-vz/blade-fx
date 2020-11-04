<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Mail\Business;

use Pyz\Service\DataDog\DataDogServiceInterface;
use Pyz\Zed\CmsBlockStorage\Business\CmsBlockStorageFacadeInterface;
use Pyz\Zed\Mail\Business\Model\Mailer\MailHandler;
use Pyz\Zed\Mail\Business\Model\Provider\CmsBlockMailer;
use Pyz\Zed\Mail\Business\Model\Provider\SwiftMailer;
use Pyz\Zed\Mail\Business\Model\Renderer\CmsBlockRenderer;
use Pyz\Zed\Mail\MailDependencyProvider;
use Spryker\Zed\Glossary\Communication\Plugin\TwigTranslatorPlugin;
use Spryker\Zed\Kernel\Communication\Plugin\Pimple;
use Spryker\Zed\Mail\Business\MailBusinessFactory as SprykerMailBusinessFactory;
use Spryker\Zed\Mail\Business\Model\Renderer\RendererInterface;
use Twig\Environment;

/**
 * @method \Pyz\Zed\Mail\MailConfig getConfig()
 * @method \Pyz\Zed\Mail\Dependency\Mailer\MailToMailerInterface getMailer()
 */
class MailBusinessFactory extends SprykerMailBusinessFactory
{
    /**
     * @return \Spryker\Zed\Mail\Business\Model\Mailer\MailHandlerInterface
     */
    public function createMailHandler()
    {
        return new MailHandler(
            $this->createMailBuilder(),
            $this->getMailTypeCollection(),
            $this->getMailProviderCollection(),
            $this->getDataDogService()
        );
    }

    /**
     * @return \Pyz\Zed\Mail\Business\Model\Provider\CmsBlockMailer
     */
    public function createCmsBlockMailer(): CmsBlockMailer
    {
        return new CmsBlockMailer(
            $this->createCmsBlockRenderer(),
            $this->getMailer()
        );
    }

    /**
     * @return \Pyz\Zed\Mail\Business\Model\Renderer\CmsBlockRenderer
     */
    public function createCmsBlockRenderer(): RendererInterface
    {
        return new CmsBlockRenderer(
            $this->createTwigEnvironment(),
            $this->createTranslator(),
            $this->getCmsBlockStorageFacade()
        );
    }

    /**
     * @return \Pyz\Zed\Mail\Business\Model\Provider\SwiftMailer
     */
    public function createMailer(): SwiftMailer
    {
        return new SwiftMailer(
            $this->createRenderer(),
            $this->getMailer()
        );
    }

    /**
     * @return \Twig\Environment
     */
    protected function createTwigEnvironment(): Environment
    {
        return (new Pimple())->getApplication()['twig'];
    }

    /**
     * @return \Pyz\Zed\CmsBlockStorage\Business\CmsBlockStorageFacadeInterface
     */
    protected function getCmsBlockStorageFacade(): CmsBlockStorageFacadeInterface
    {
        return $this->getProvidedDependency(MailDependencyProvider::FACADE_CMS_BLOCK_STORAGE);
    }

    /**
     * @return \Pyz\Service\DataDog\DataDogServiceInterface
     */
    public function getDataDogService(): DataDogServiceInterface
    {
        return $this->getProvidedDependency(MailDependencyProvider::SERVICE_DATA_DOG);
    }

    /**
     * @return \Spryker\Zed\Glossary\Communication\Plugin\TwigTranslatorPlugin
     */
    protected function createTranslator(): TwigTranslatorPlugin
    {
        return new TwigTranslatorPlugin();
    }
}
