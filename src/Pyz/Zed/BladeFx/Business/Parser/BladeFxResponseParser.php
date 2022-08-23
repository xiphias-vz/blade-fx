<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\BladeFx\Business\Parser;

use Exception;
use SimpleXMLElement;

class BladeFxResponseParser implements BladeFxResponseParserInterface
{
    /**
     * @param string $response
     * @param string $pathNamespace
     *
     * @throws \Exception
     *
     * @return array
     */
    public function parse(string $response, string $pathNamespace): array
    {
        $data = [];
        try {
            $simpleXmlObject = new SimpleXMLElement($response);
            $simpleXmlObject->registerXPathNamespace('NewDataSet', 'urn:schemas-microsoft-com:xml-msdata');
            foreach ($simpleXmlObject->xpath('//' . $pathNamespace) as $item) {
                $data[] = (array)$item;
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

        return $data;
    }
}
