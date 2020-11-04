<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\MailCmsBlock;

use Pyz\Service\MailCmsBlock\Placeholder\Converter;
use Spryker\Service\Kernel\AbstractServiceFactory;

class MailCmsBlockServiceFactory extends AbstractServiceFactory
{
    /**
     * @return \Pyz\Service\MailCmsBlock\Placeholder\Converter
     */
    public function createConverter(): Converter
    {
        return new Converter();
    }
}
