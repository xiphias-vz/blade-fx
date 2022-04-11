<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Recommendations\Communication\Transfer;

use Generated\Shared\Transfer\ScenarioTransfer;
use Symfony\Component\Form\FormInterface;

class ScenarioFormTransferMapper implements ScenarioFormTransferMapperInterface
{
    /**
     * @param FormInterface $scenarioForm
     *
     * @return ScenarioTransfer
     */
    public function createTransfer(FormInterface $scenarioForm): ScenarioTransfer
    {
        // $scenarioTransfer = new ScenarioTransfer();

        // if (gettype($scenarioForm->getData()) === 'object')
        // {

        // }
        return (new ScenarioTransfer())
             ->fromArray($scenarioForm->getData(), true);
    }
}
