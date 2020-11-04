<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Mail\Business\Model\Renderer;

use ArrayObject;
use Generated\Shared\Transfer\CmsBlockTransfer;
use Generated\Shared\Transfer\LocaleTransfer;
use Generated\Shared\Transfer\MailTemplateTransfer;
use Generated\Shared\Transfer\MailTransfer;
use Pyz\Zed\CmsBlockStorage\Business\CmsBlockStorageFacadeInterface;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Glossary\Communication\Plugin\TwigTranslatorPlugin;
use Spryker\Zed\Mail\Business\Model\Renderer\RendererInterface;
use Twig\Environment;

class CmsBlockRenderer implements RendererInterface
{
    /**
     * @var \Twig\Environment
     */
    protected $twigEnvironment;

    /**
     * @var \Spryker\Zed\Glossary\Communication\Plugin\TwigTranslatorPlugin
     */
    protected $translator;

    /**
     * @var \Pyz\Zed\CmsBlockStorage\Business\CmsBlockStorageFacadeInterface
     */
    protected $cmsBlockStorageFacade;

    /**
     * @param \Twig\Environment $twigEnvironment
     * @param \Spryker\Zed\Glossary\Communication\Plugin\TwigTranslatorPlugin $translator
     * @param \Pyz\Zed\CmsBlockStorage\Business\CmsBlockStorageFacadeInterface $cmsBlockStorageFacade
     */
    public function __construct(
        Environment $twigEnvironment,
        TwigTranslatorPlugin $translator,
        CmsBlockStorageFacadeInterface $cmsBlockStorageFacade
    ) {
        $this->twigEnvironment = $twigEnvironment;
        $this->translator = $translator;
        $this->cmsBlockStorageFacade = $cmsBlockStorageFacade;
    }

    /**
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     *
     * @return void
     */
    public function render(MailTransfer $mailTransfer): void
    {
        $this->setupTranslation($mailTransfer);

        $renderedContent = $this->renderTemplate($mailTransfer);
        $renderedContent = $this->replaceCmsBlockPlaceholders($mailTransfer, $renderedContent);
        $this->addTextTemplate($mailTransfer, $renderedContent);
        $this->addHtmlTemplate($mailTransfer, $renderedContent);
    }

    /**
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     *
     * @return void
     */
    protected function setupTranslation(MailTransfer $mailTransfer): void
    {
        $localeTransfer = $this->getLocaleTransfer($mailTransfer);
        $this->setLocaleTransfer($localeTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     *
     * @return \Generated\Shared\Transfer\LocaleTransfer
     */
    protected function getLocaleTransfer(MailTransfer $mailTransfer): LocaleTransfer
    {
        $localeTransfer = $mailTransfer->getLocale();
        if (!$localeTransfer) {
            $localeTransfer = new LocaleTransfer();
            $localeTransfer->setLocaleName(Store::getInstance()->getCurrentLocale());
        }

        return $localeTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     *
     * @return string
     */
    protected function renderTemplate(MailTransfer $mailTransfer): string
    {
        $cmsBlockStorageTransfer = $this->cmsBlockStorageFacade->findBlockStorageByName($mailTransfer->getCmsBlockName());
        if ($cmsBlockStorageTransfer === null) {
            return '';
        }
        $cmsBlockData = $cmsBlockStorageTransfer->getData();

        $cmsBlockTransfer = $this->mapToCmsBlockTransfer($cmsBlockData);
        $template = $cmsBlockTransfer->getCmsBlockTemplate()->getTemplatePath();

        return $this->twigEnvironment->render(
            $template,
            $this->getPlaceholders($cmsBlockTransfer->getSpyCmsBlockGlossaryKeyMappings()) +
            ['cmsContent' => $cmsBlockData]
        );
    }

    /**
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     * @param string $renderedContent
     *
     * @return string
     */
    protected function replaceCmsBlockPlaceholders(MailTransfer $mailTransfer, string $renderedContent): string
    {
        foreach ($mailTransfer->getCmsBlockPlaceholders() as $placeholder => $value) {
            $renderedContent = str_replace($placeholder, $value, $renderedContent);
        }

        return $renderedContent;
    }

    /**
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     * @param string $renderedContent
     *
     * @return void
     */
    protected function addTextTemplate(MailTransfer $mailTransfer, string $renderedContent): void
    {
        $templateTransfer = new MailTemplateTransfer();
        $templateTransfer->setIsHtml(false);
        $templateTransfer->setContent(strip_tags($renderedContent));

        $mailTransfer->addTemplate($templateTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\MailTransfer $mailTransfer
     * @param string $renderedContent
     *
     * @return void
     */
    protected function addHtmlTemplate(MailTransfer $mailTransfer, string $renderedContent): void
    {
        $templateTransfer = new MailTemplateTransfer();
        $templateTransfer->setIsHtml(true);
        $templateTransfer->setContent($renderedContent);

        $mailTransfer->addTemplate($templateTransfer);
    }

    /**
     * @param \ArrayObject $mappings
     *
     * @return array
     */
    protected function getPlaceholders(ArrayObject $mappings): array
    {
        $placeholders = [];

        foreach ($mappings as $mapping) {
            $placeholders[$mapping->getPlaceholder()] = $this->translator->trans($mapping->getGlossaryKey()->getKey());
        }

        return $placeholders;
    }

    /**
     * @param array $data
     *
     * @return \Generated\Shared\Transfer\CmsBlockTransfer
     */
    protected function mapToCmsBlockTransfer(array $data): CmsBlockTransfer
    {
        return (new CmsBlockTransfer())->fromArray($data, true);
    }

    /**
     * @param \Generated\Shared\Transfer\LocaleTransfer $localeTransfer
     *
     * @return void
     */
    public function setLocaleTransfer(LocaleTransfer $localeTransfer): void
    {
        $this->translator->setLocaleTransfer($localeTransfer);
    }
}
