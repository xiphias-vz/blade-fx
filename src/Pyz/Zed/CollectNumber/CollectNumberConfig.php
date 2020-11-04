<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CollectNumber;

use Pyz\Shared\CollectNumber\CollectNumberConstants;
use Spryker\Zed\Kernel\AbstractBundleConfig;

class CollectNumberConfig extends AbstractBundleConfig
{
    /**
     * @return int
     */
    public function getCollectNumberLength(): int
    {
        return (int)$this->get(CollectNumberConstants::COLLECT_NUMBER_LENGTH);
    }

    /**
     * @return string
     */
    public function getCollectNumberPadSymbol(): string
    {
        return $this->get(CollectNumberConstants::COLLECT_NUMBER_PAD_SYMBOL);
    }

    /**
     * @return string
     */
    public function getCollectNumberDigitsBase(): string
    {
        return $this->get(CollectNumberConstants::COLLECT_NUMBER_DIGITS_BASE);
    }
}
