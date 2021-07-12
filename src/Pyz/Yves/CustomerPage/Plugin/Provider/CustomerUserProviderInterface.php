<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CustomerPage\Plugin\Provider;

use Symfony\Component\Security\Core\User\UserProviderInterface;

interface CustomerUserProviderInterface extends UserProviderInterface
{
    /**
     * @return string
     */
    public function getCdcApiKey(): string;

    /**
     * @return string
     */
    public function getCdcSecretKey(): string;

    /**
     * @return string
     */
    public function getCdcUserKey(): string;

    /**
     * @return string
     */
    public function getCdcUrlPrefix(): string;

    /**
     * @param string $emailOrCardNumber
     *
     * @return string
     */
    public function checkEmailOrCardAvailability(string $emailOrCardNumber): string;

    /**
     * @return string
     */
    public function getCaptchaSecretKey(): string;

    /**
     * @param string $emailOrCardNumber
     * @param string $password
     *
     * @return string
     */
    public function globusLogin(string $emailOrCardNumber, string $password): string;
}
