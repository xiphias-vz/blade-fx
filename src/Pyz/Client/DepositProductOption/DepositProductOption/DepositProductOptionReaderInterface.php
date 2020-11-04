<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\DepositProductOption\DepositProductOption;

interface DepositProductOptionReaderInterface
{
    /**
     * @param int $idProductAbstract
     *
     * @return array
     */
    public function getDepositProductOptionsByIdProductAbstract(int $idProductAbstract): array;
}
