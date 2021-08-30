<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Navigation\Business\Helper;

use Orm\Zed\Category\Persistence\SpyCategoryQuery;
use Pyz\Zed\Navigation\Business\Navigation\NavigationReader;

class NavigationHelper
{
    public const NODE_KEY_SUFFIX = '_NODE_';

    /**
     * @var \Pyz\Zed\Navigation\Business\Navigation\NavigationReader
     */
    protected $navigationReader;

    protected const MAIN_NAVIGATION_KEYS = [
        'MAIN_NAVIGATION',
        'MAIN_NAVIGATION_DESKTOP',
    ];

    /**
     * @param int $parentCategoryId
     *
     * @return string[]
     */
    public function composeNavigationNodeKeys(int $parentCategoryId): array
    {
        $navigationNodeKeys = [];
        $key = SpyCategoryQuery::create()->findOneByIdCategory($parentCategoryId)->getCategoryKey();
        foreach (static::MAIN_NAVIGATION_KEYS as $navigationKey) {
            $navigationNodeKeys[] = $navigationKey . static::NODE_KEY_SUFFIX . $parentCategoryId;
            $navigationNodeKeys[] = $navigationKey . static::NODE_KEY_SUFFIX . str_replace("_", "", $key);
        }

        return $navigationNodeKeys;
    }

    /**
     * @param \Pyz\Zed\Navigation\Business\Navigation\NavigationReader $navigationReader
     */
    public function __construct(NavigationReader $navigationReader)
    {
        $this->navigationReader = $navigationReader;
    }

    /**
     * @return array
     */
    public function getMainNavigationIds(): array
    {
        return $this->navigationReader->findNavigationIdsByKeys(static::MAIN_NAVIGATION_KEYS);
    }
}
