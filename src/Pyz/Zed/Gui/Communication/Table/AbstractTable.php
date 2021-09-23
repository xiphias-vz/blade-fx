<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Gui\Communication\Table;

use LogicException;
use Spryker\Service\UtilText\Model\Url\Url;
use Spryker\Zed\Gui\Communication\Form\DeleteForm;
use Spryker\Zed\Gui\Communication\Table\AbstractTable as SprykerAbstractTable;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

abstract class AbstractTable extends SprykerAbstractTable
{
    /**
     * @param \Spryker\Service\UtilText\Model\Url\Url $url
     * @param string $title
     * @param array $options
     *
     * @return string
     */
    protected function generateViewButtonForm(Url $url, string $title, array $options = []): string
    {
        $defaultOptions = [
            'class' => 'btn-view',
            'icon' => 'fa-caret-right',
        ];

        return $this->generateButtonForm($url, $title, $defaultOptions, $options);
    }

    /**
     * @param \Spryker\Service\UtilText\Model\Url\Url $url
     * @param string $title
     * @param array $defaultOptions
     * @param array $customOptions
     *
     * @return string
     */
    protected function generateButtonForm(
        Url $url,
        string $title,
        array $defaultOptions,
        array $customOptions = []
    ): string {
        $buttonOptions = $this->generateButtonOptions($defaultOptions, $customOptions);

        $class = $this->getButtonClass($defaultOptions, $customOptions);
        $parameters = $this->getButtonParameters($buttonOptions);
        $icon = '';

        if (array_key_exists(self::BUTTON_ICON, $buttonOptions) === true && $buttonOptions[self::BUTTON_ICON] !== null) {
            $icon = '<i class="fa ' . $buttonOptions[self::BUTTON_ICON] . '"></i> ';
        }

        return $this->getTwig()->render('button-form.twig', [
            'url' => $this->buildUrl($url),
            'class' => $class,
            'title' => $title,
            'icon' => $icon,
            'parameters' => $parameters,
        ]);
    }

    /**
     * @throws \LogicException
     *
     * @return \Twig\Environment
     */
    protected function getTwig(): Environment
    {
        /** @var \Twig\Environment|null $twig */
        $twig = $this->getApplicationContainer()->get(static::SERVICE_TWIG);

        if ($twig === null) {
            throw new LogicException('Twig environment not set up.');
        }

        /** @var \Twig\Loader\ChainLoader $loaderChain */
        $loaderChain = $twig->getLoader();
        $loaderChain->addLoader(new FilesystemLoader(
            $this->getPyzTwigPaths(),
            $this->getTwigRootPath()
        ));

        return $twig;
    }

    /**
     * @param string $url
     * @param string $title
     * @param array $options
     *
     * @return string
     */
    protected function generateRemoveButtonFormToken(string $url, string $title, array $options = []): string
    {
        $formFactory = $this->getFormFactory();

        $options = [
            'fields' => $options,
            'action' => $url,
        ];

        $form = $formFactory->create(DeleteForm::class, [], $options);

        $options['form'] = $form->createView();
        $options['title'] = $title;

        return $this->getTwig()->render('delete-form-token.twig', $options);
    }

    /**
     * @return string[]
     */
    protected function getPyzTwigPaths(): array
    {
        return [
            __DIR__ . '/../../Presentation/Table/',
        ];
    }

    /**
     * @return string[]
     */
    protected function getTwigPaths()
    {
        $corePath = parent::getTwigPaths();
        $projectPath = $this->getPyzTwigPaths();

        return array_merge($projectPath, $corePath);
    }
}
