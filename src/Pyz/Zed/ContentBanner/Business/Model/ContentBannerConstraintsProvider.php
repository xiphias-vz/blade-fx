<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ContentBanner\Business\Model;

use Spryker\Zed\ContentBanner\Business\Model\ContentBannerConstraintsProvider as ExtendContentBannerConstraintsProvider;
use Symfony\Component\Validator\Constraints\Length;

class ContentBannerConstraintsProvider extends ExtendContentBannerConstraintsProvider
{
    /**
     * @return \Symfony\Component\Validator\Constraint[]
     */
    protected function getTitleConstraints(): array
    {
        return [
            new Length(['max' => 64]),
        ];
    }

    /**
     * @return \Symfony\Component\Validator\Constraint[]
     */
    protected function getSubtitleConstraints(): array
    {
        return [
            new Length(['max' => 128]),
        ];
    }
}
