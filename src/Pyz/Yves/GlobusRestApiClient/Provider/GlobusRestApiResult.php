<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\GlobusRestApiClient\Provider;

class GlobusRestApiResult
{
    /**
     * @var mixed
     */
    public $result;

    /**
     * @var string
     */
    public $error;

    /**
     * @var bool
     */
    public $isSuccess = false;

    /**
     * @return mixed
     */
    public function resultToJson()
    {
        return json_decode($this->result);
    }
}
