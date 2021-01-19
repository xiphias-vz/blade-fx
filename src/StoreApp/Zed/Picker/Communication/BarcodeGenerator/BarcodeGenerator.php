<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace StoreApp\Zed\Picker\Communication\BarcodeGenerator;

class BarcodeGenerator
{
    private const BARCODE_PREFIX = '97400';

    /**
     * @param string $barcodeToEncode
     *
     * @return string
     */
    public function getEncodedBarcode(string $barcodeToEncode): string
    {
        $barcode = self::BARCODE_PREFIX;
        $barcode .= $barcodeToEncode;

        $asciiString = "Â!";
        $asciiString .= CHR(34);
        $asciiString .= "#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÃÄÅÆÇ";

        $checkSumTotal = 105;
        $outputIndex = 1;
        $thisInt = 1;
        $finalArray = "Í";
        $barocdeLength = strlen($barcode);

        for ($position = 0; $position < $barocdeLength; $position += 2) {
            $thisInt = (int)substr($barcode, $position, 2);
            $checkSumTotal = $checkSumTotal + ($thisInt * $outputIndex);

            if ($thisInt == 0) {
                $finalArray .= "Â";
            } else {
                $finalArray .= mb_substr($asciiString, $thisInt, 1);
            }
            $outputIndex++;
        }

        $checkSum = $checkSumTotal % 103;
        if ($checkSum == 0) {
            $finalArray .= "Â";
        } else {
            $finalArray .= mb_substr($asciiString, $checkSum, 1);
            $finalArray .= "Î";
        }

        return $finalArray;
    }
}
