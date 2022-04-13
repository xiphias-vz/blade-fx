<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Recommendations\Communication\Transfer;

use Generated\Shared\Transfer\ScenarioTransfer;
use Symfony\Component\Form\FormInterface;

interface ScenarioFormTransferMapperInterface
{
    /**
     * @param \Symfony\Component\Form\FormInterface $scenarioForm
     *
     * @return \Generated\Shared\Transfer\ScenarioTransfer
     */
    public function createTransfer(FormInterface $scenarioForm): ScenarioTransfer;
}
