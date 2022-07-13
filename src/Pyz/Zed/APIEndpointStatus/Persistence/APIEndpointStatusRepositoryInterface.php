<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\APIEndpointStatus\Persistence;

interface APIEndpointStatusRepositoryInterface
{
    /**
     * @param string $roleName
     *
     * @return array
     */
    public function getEmailListForRoleName(string $roleName): array;

    /**
     * @param string $senderJobDescription
     * @param string $sendToEmail
     * @param string $subject
     * @param string $body
     * @param bool|null $isHtml
     *
     * @return void
     */
    public function setEmailToSend(string $senderJobDescription, string $sendToEmail, string $subject, string $body, ?bool $isHtml = false);
}
