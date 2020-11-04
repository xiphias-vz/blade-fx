<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CatalogPage\CategoryNode;

class CategoryNode
{
    /**
     * @var int
     */
    public $nodeId = 0;

    /**
     * @var bool
     */
    public $isActive = false;

    /**
     * @var bool
     */
    public $isCurrent = false;

    /**
     * @var bool
     */
    public $hasChildren = false;

    /**
     * @var \Pyz\Yves\CatalogPage\CategoryNode\CategoryNode[]
     */
    public $children = [];

    /**
     * @var int
     */
    public $quantity = 0;

    /**
     * @var string
     */
    public $url = '';

    /**
     * @var string
     */
    public $name = '';
}
