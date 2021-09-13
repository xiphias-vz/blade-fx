<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\NavigationGui\Dependency\Facade;

class NavigationGuiToTwigBridge implements NavigationGuiToTwigInterface
{
    /**
     * @var \Spryker\Zed\Twig\Business\TwigFacadeInterface
     */
    protected $twigFacade;

    /**
     * @param \Spryker\Zed\Twig\Business\TwigFacadeInterface $twigFacade
     */
    public function __construct($twigFacade)
    {
        $this->twigFacade = $twigFacade;
    }

    /**
     * @return void
     */
    public function warmUpTwigCache()
    {
        $this->twigFacade->warmUpCache();
    }
}
