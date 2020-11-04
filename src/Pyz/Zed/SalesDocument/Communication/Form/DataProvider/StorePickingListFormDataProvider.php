<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\SalesDocument\Communication\Form\DataProvider;

use Generated\Shared\Transfer\FilterTransfer;
use Generated\Shared\Transfer\MerchantCriteriaFilterTransfer;
use Generated\Shared\Transfer\MerchantTransfer;
use Orm\Zed\Merchant\Persistence\Map\SpyMerchantTableMap;
use Pyz\Zed\Merchant\Business\MerchantFacadeInterface;
use Pyz\Zed\SalesDocument\Communication\Form\StorePickingListForm;
use Pyz\Zed\SalesDocument\SalesDocumentConfig;
use Spryker\Zed\MerchantSearch\Business\MerchantSearchFacadeInterface;
use Spryker\Zed\User\Business\UserFacadeInterface;

class StorePickingListFormDataProvider
{
    /**
     * @var \Spryker\Zed\MerchantSearch\Business\MerchantSearchFacadeInterface
     */
    private $merchantSearchFacade;

    /**
     * @var \Spryker\Zed\User\Business\UserFacadeInterface
     */
    private $userFacade;

    /**
     * @var \Pyz\Zed\Merchant\Business\MerchantFacadeInterface
     */
    private $merchantFacade;

    /**
     * @param \Spryker\Zed\MerchantSearch\Business\MerchantSearchFacadeInterface $merchantSearchFacade
     * @param \Spryker\Zed\User\Business\UserFacadeInterface $userFacade
     * @param \Pyz\Zed\Merchant\Business\MerchantFacadeInterface $merchantFacade
     */
    public function __construct(
        MerchantSearchFacadeInterface $merchantSearchFacade,
        UserFacadeInterface $userFacade,
        MerchantFacadeInterface $merchantFacade
    ) {
        $this->merchantSearchFacade = $merchantSearchFacade;
        $this->userFacade = $userFacade;
        $this->merchantFacade = $merchantFacade;
    }

    /**
     * @return array
     */
    public function getOptions(): array
    {
        return [
            StorePickingListForm::OPTION_EXPORT_TYPES => $this->getExportTypes(),
            StorePickingListForm::OPTION_MERCHANT_REFERENCES => $this->getMerchantReferences(),
        ];
    }

    /**
     * @return string[]
     */
    protected function getExportTypes(): array
    {
        return [
            StorePickingListForm::OPTION_EXPORT_TYPE_HTML,
            StorePickingListForm::OPTION_EXPORT_TYPE_PDF,
        ];
    }

    /**
     * @return string[]
     */
    protected function getMerchantReferences(): array
    {
        $currentUserTransfer = $this->userFacade->getCurrentUser();

        $merchantReference = $currentUserTransfer->getMerchantReference();
        if ($merchantReference !== null) {
            $merchantTransfer = $this->merchantFacade->findMerchantByUser($currentUserTransfer);
            if ($merchantTransfer !== null) {
                return $this->generateMerchantOptions([$merchantTransfer]);
            }
        }

        $availableMerchantTransfers = $this->getAvailableMerchants();

        return $this->generateMerchantOptions($availableMerchantTransfers);
    }

    /**
     * @return \Generated\Shared\Transfer\MerchantTransfer[]
     */
    private function getAvailableMerchants(): array
    {
        $merchantCriteriaFilterTransfer = (new MerchantCriteriaFilterTransfer())
            ->setFilter(
                (new FilterTransfer())
                    ->setOrderBy(SpyMerchantTableMap::COL_REGION_NAME)
            );

        $activeMerchantCollectionTransfer = $this->merchantSearchFacade->getActiveMerchants($merchantCriteriaFilterTransfer);

        return $activeMerchantCollectionTransfer->getMerchants()->getArrayCopy();
    }

    /**
     * @param \Generated\Shared\Transfer\MerchantTransfer[] $merchantTransfers
     *
     * @return array
     */
    private function generateMerchantOptions(array $merchantTransfers): array
    {
        return array_reduce(
            $merchantTransfers,
            function ($merchantReferences, MerchantTransfer $merchantTransfer) {
                $merchantReferences[$merchantTransfer->getMerchantReference()] = sprintf(
                    SalesDocumentConfig::FORMAT_MERCHANT_DETAILS_OPTION,
                    $merchantTransfer->getZipCode(),
                    $merchantTransfer->getCity(),
                    $merchantTransfer->getStreet()
                );

                return $merchantReferences;
            },
            []
        );
    }
}
