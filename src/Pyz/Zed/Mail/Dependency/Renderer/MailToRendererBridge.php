<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Mail\Dependency\Renderer;

use Spryker\Zed\Glossary\Communication\Plugin\TwigTranslatorPlugin;
use Spryker\Zed\Mail\Dependency\Renderer\MailToRendererBridge as SpryMailToRendererBridge;

class MailToRendererBridge extends SpryMailToRendererBridge
{
    /**
     * @return \Spryker\Zed\Glossary\Communication\Plugin\TwigTranslatorPlugin
     */
    protected function getTranslator()
    {
        /** @var \Spryker\Zed\Glossary\Communication\Plugin\TwigTranslatorPlugin $translator */
        if ($this->twigEnvironment->hasExtension(TwigTranslatorPlugin::class)) {
            $translator = $this->twigEnvironment->getExtension(TwigTranslatorPlugin::class);
        } else {
            $translator = new TwigTranslatorPlugin();
        }

        return $translator;
    }
}
