<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Touch\Business;

use Spryker\Zed\Touch\Business\TouchFacade as SprykerTouchFacade;

class TouchFacade extends SprykerTouchFacade
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $itemType
     * @param int $idItem
     * @param bool $keyChange
     *
     * @return bool
     */
    public function touchActive($itemType, $idItem, $keyChange = false)
    {
        return false;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $itemType
     * @param int $idItem
     *
     * @return bool
     */
    public function touchInactive($itemType, $idItem)
    {
        return true;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $itemType
     * @param int $idItem
     *
     * @return bool
     */
    public function touchDeleted($itemType, $idItem)
    {
        return true;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $itemType
     * @param array $itemIds
     *
     * @return int
     */
    public function bulkTouchSetActive($itemType, array $itemIds)
    {
        return 0;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $itemType
     * @param array $itemIds
     *
     * @return int
     */
    public function bulkTouchSetInActive($itemType, array $itemIds)
    {
        return 0;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $itemType
     * @param array $itemIds
     *
     * @return int
     */
    public function bulkTouchSetDeleted($itemType, array $itemIds)
    {
        return 0;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param string $itemType
     *
     * @return \Generated\Shared\Transfer\TouchTransfer[]
     */
    public function getItemsByType($itemType)
    {
        return [];
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @deprecated Use TouchFacadeInterface::cleanTouchEntitiesForDeletedItemEvent() instead.
     *
     * @return int
     */
    public function removeTouchEntriesMarkedAsDeleted()
    {
        return 0;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return int
     */
    public function cleanTouchEntitiesForDeletedItemEvent(): int
    {
        return 0;
    }
}
