<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Service\User\Validator;

use Pyz\Service\User\UserConfig;

class PasswordValidator implements PasswordValidatorInterface
{
    /**
     * @var \Pyz\Service\User\UserConfig
     */
    protected $userConfig;

    /**
     * @param \Pyz\Service\User\UserConfig $userConfig
     */
    public function __construct(UserConfig $userConfig)
    {
        $this->userConfig = $userConfig;
    }

    /**
     * @param string $password
     *
     * @return bool
     */
    public function validate(string $password): bool
    {
        if (mb_strlen($password) < $this->userConfig->getMinimalPasswordLength()) {
            return false;
        }

        $groupsUsed = 0;
        foreach ($this->userConfig->getAllowedPatterns() as $pattern) {
            if (preg_match($pattern, $password) > 0) {
                $groupsUsed++;
            }
        }

        if ($groupsUsed < $this->userConfig->getRequiredPatternsMatches()) {
            return false;
        }

        return true;
    }
}
