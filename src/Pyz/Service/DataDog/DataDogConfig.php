<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\DataDog;

use Pyz\Shared\DataDog\DataDogConstants;
use Spryker\Service\Kernel\AbstractBundleConfig;

class DataDogConfig extends AbstractBundleConfig
{
    protected const DEFAULT_DATA_DOG_HOST = '127.0.0.1';
    protected const DEFAULT_DATA_DOG_PORT = 8125;

    /**
     * @return string
     */
    public function getDataDogHost(): string
    {
        return $this->get(DataDogConstants::DATA_DOG_HOST, static::DEFAULT_DATA_DOG_HOST);
    }

    /**
     * @return int
     */
    public function getDataDogPort(): int
    {
        return $this->get(DataDogConstants::DATA_DOG_PORT, static::DEFAULT_DATA_DOG_PORT);
    }

    /**
     * @return string|null
     */
    public function getDataDogApiKey(): ?string
    {
        return $this->get(DataDogConstants::DATA_DOG_API_KEY, null);
    }

    /**
     * @return string|null
     */
    public function getDataDogAppKey(): ?string
    {
        return $this->get(DataDogConstants::DATA_DOG_APP_KEY, null);
    }
}
