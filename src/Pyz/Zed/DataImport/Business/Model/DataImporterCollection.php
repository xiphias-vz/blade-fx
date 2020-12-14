<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Business\Model;

use Spryker\Zed\DataImport\Business\Model\DataImporterCollection as SprykerDataImporterCollection;

class DataImporterCollection extends SprykerDataImporterCollection
{
    /**
     * @return void
     */
    public function afterImport()
    {
        echo 'After import hooks starts:' . date('Y-m-d H:i:s') . PHP_EOL;
        $startAfterImportHooks = microtime(true);

        foreach ($this->afterImportHooks as $afterImportHook) {
            echo ' ' . PHP_EOL;
            echo get_class($afterImportHook) . PHP_EOL;
            echo 'Start: ' . date('Y-m-d H:i:s') . PHP_EOL;
            $start = microtime(true);
            $afterImportHook->afterImport();
            echo 'Finish: ' . date('Y-m-d H:i:s') . PHP_EOL;
            echo 'Took: ' . round((microtime(true) - $start), 3) . ' seconds' . PHP_EOL;
            echo 'Took: ' . round((microtime(true) - $start), 3) / 60 . ' minutes' . PHP_EOL;
            echo ' ' . PHP_EOL;
        }
        echo 'After import hooks finished:' . date('Y-m-d H:i:s') . PHP_EOL;
        echo '# Took: ' . round((microtime(true) - $startAfterImportHooks), 3) . ' seconds' . PHP_EOL;
        echo '# Took: ' . round((microtime(true) - $startAfterImportHooks), 3) / 60 . ' minutes' . PHP_EOL;
    }
}
