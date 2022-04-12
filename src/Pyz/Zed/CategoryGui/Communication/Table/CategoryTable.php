<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\CategoryGui\Communication\Table;

use Orm\Zed\Category\Persistence\SpyCategory;
use Spryker\Service\UtilText\Model\Url\Url;
use Spryker\Shared\Category\CategoryConstants;
use Spryker\Zed\CategoryGui\Communication\Table\CategoryTable as SprykerCategoryTable;
use Spryker\Zed\CategoryGui\Dependency\Facade\CategoryGuiToLocaleFacadeInterface;
use Spryker\Zed\Translator\Business\TranslatorFacadeInterface;

class CategoryTable extends SprykerCategoryTable
{
    /**
     * @var \Spryker\Zed\Translator\Business\TranslatorFacadeInterface
     */
    protected $translatorFacade;

    /**
     * @param \Spryker\Zed\CategoryGui\Dependency\Facade\CategoryGuiToLocaleFacadeInterface $localeFacade
     * @param \Spryker\Zed\Translator\Business\TranslatorFacadeInterface $translatorFacade
     */
    public function __construct(
        CategoryGuiToLocaleFacadeInterface $localeFacade,
        TranslatorFacadeInterface $translatorFacade
    ) {
        parent::__construct($localeFacade);
        $this->translatorFacade = $translatorFacade;
    }

    /**
     * @param bool $condition
     *
     * @return string
     */
    protected function yesNoOutput(bool $condition): string
    {
        if ($condition === true) {
            return $this->translatorFacade->trans('Yes');
        }

        return $this->translatorFacade->trans('No');
    }

    /**
     * @param \Orm\Zed\Category\Persistence\SpyCategory $item
     *
     * @return string
     */
    protected function generateViewCategoryButton(SpyCategory $item): string
    {
        return $this->generateViewButton(
            Url::generate('/category/view', [
                CategoryConstants::PARAM_ID_CATEGORY => $item->getIdCategory(),
            ]),
            'category.gui.view'
        );
    }
}
