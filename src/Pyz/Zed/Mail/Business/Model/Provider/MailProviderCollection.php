<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Mail\Business\Model\Provider;

use Spryker\Zed\Mail\Business\Model\Provider\MailProviderCollection as SprykerMailProviderCollection;
use Spryker\Zed\Mail\MailConfig;

class MailProviderCollection extends SprykerMailProviderCollection
{
    /**
     * @param string $mailType
     *
     * @return \Spryker\Zed\Mail\Dependency\Plugin\MailProviderPluginInterface[]
     */
    public function getProviderForMailType($mailType): array
    {
        $mailProviderForMailType = [];
        foreach ($this->mailProvider as $provider) {
            if (in_array($mailType, $provider[static::ACCEPTED_MAIL_TYPES])) {
                $mailProviderForMailType[] = $provider[static::PROVIDER];

                return $mailProviderForMailType;
            }

            if (in_array(MailConfig::MAIL_TYPE_ALL, $provider[static::ACCEPTED_MAIL_TYPES]) || in_array($mailType, $provider[static::ACCEPTED_MAIL_TYPES])) {
                $mailProviderForMailType[] = $provider[static::PROVIDER];
            }
        }

        return $mailProviderForMailType;
    }
}
