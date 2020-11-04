<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\DepositProductOption;

use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\DepositProductOption\DepositProductOptionFactory getFactory()
 */
class DepositProductOptionClient extends AbstractClient implements DepositProductOptionClientInterface
{
    /**
     * @param int $idProductAbstract
     *
     * @return array
     */
    public function getDepositProductOptionsByIdProductAbstract(int $idProductAbstract): array
    {
        return $this->getFactory()
            ->createDepositProductOptionReader()
            ->getDepositProductOptionsByIdProductAbstract($idProductAbstract);
    }
}
