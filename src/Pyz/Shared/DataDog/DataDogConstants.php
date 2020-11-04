<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Shared\DataDog;

/**
 * Declares global environment configuration keys. Do not use it for other class constants.
 */
interface DataDogConstants
{
    public const DATA_DOG_HOST = 'DATA_DOG:DATA_DOG_HOST';
    public const DATA_DOG_PORT = 'DATA_DOG:DATA_DOG_PORT';
    public const DATA_DOG_APP_KEY = 'DATA_DOG:DATA_DOG_APP_KEY';
    public const DATA_DOG_API_KEY = 'DATA_DOG:DATA_DOG_API_KEY';
}
