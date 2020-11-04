<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Console\Communication\Plugin;

use Spryker\Zed\Console\Communication\Plugin\ConsoleLogPlugin as SprykerConsoleLogPlugin;
use Symfony\Component\Console\Event\ConsoleErrorEvent;

class ConsoleLogPlugin extends SprykerConsoleLogPlugin
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Symfony\Component\Console\Event\ConsoleErrorEvent $event
     *
     * @return void
     */
    public function onConsoleError(ConsoleErrorEvent $event)
    {
        $exception = $event->getError();

        $this->getLogger()->error(sprintf(
            'CLI command "%s" exception, message "%s"',
            $event->getCommand() ? $event->getCommand()->getName() : '',
            $exception->getMessage()
        ), ['exception' => $exception]);
    }
}
