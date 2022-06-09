<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\QrCodeGenerator\Communication\Console;

use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelHigh;
use Endroid\QrCode\Label\Alignment\LabelAlignmentCenter;
use Endroid\QrCode\Label\Font\NotoSans;
use Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin;
use Endroid\QrCode\Writer\PngWriter;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class QrCodeGeneratorConsole extends Console
{
    public const COMMAND_NAME = 'generate:qr-codes';
    public const COMMAND_DESCRIPTION = 'Generating Qr Codes';
    public const CODE_ERROR_MISSING_SEPARATOR = 'Argument is missing the "-" separator';

    protected const ARGUMENT_NUMBER = 'ARGUMENT_NUMBER';

    /**
     * @return void
     */
    public function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);
        $this->setHelp('Argument is a number range separated by "-". Example 1-100');
        $this->addArgument(
            self::ARGUMENT_NUMBER,
            InputArgument::REQUIRED,
            'Argument is a number range separated by "-". Example 1-100'
        );

        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        $argument = $input->getArgument(static::ARGUMENT_NUMBER);

        if (!str_contains($argument, "-")) {
            $this->error('Argument is missing the "-" separator');

            return self::CODE_ERROR;
        } else {
            $getNumbers = explode('-', $argument);
        }

        $minValue = "";
        $maxValue = "";

        if (count($getNumbers) == 2) {
            for ($i = 0; $i < count($getNumbers); $i++) {
                if (!is_numeric($getNumbers[$i])) {
                    $this->error(sprintf("%s is not a valid argument.", $getNumbers[$i]));

                    return self::CODE_ERROR;
                }
            }

            $files = glob('./data/qrCodes/*'); // get all file names
            foreach ($files as $file) { // iterate files
                if (is_file($file)) {
                    unlink($file); // delete file
                }
            }

            $minValue = (int)$getNumbers[0];
            $maxValue = (int)$getNumbers[1];

            for ($i = $minValue; $i <= $maxValue; $i++) {
                $result = Builder::create()
                    ->writer(new PngWriter())
                    ->writerOptions([])
                    ->data(str_pad($i, 9, '0', STR_PAD_LEFT))
                    ->encoding(new Encoding('UTF-8'))
                    ->errorCorrectionLevel(new ErrorCorrectionLevelHigh())
                    ->size(136)
                    ->margin(0)
                    ->roundBlockSizeMode(new RoundBlockSizeModeMargin())
                    ->build();

                $result->saveToFile('./data/qrCodes/QrCodeForOrder' . str_pad($i, 9, '0', STR_PAD_LEFT) . '.png');
            }
        } else {
            $this->error("Format should be: 'number-number'");

            return self::CODE_ERROR;
        }

        $this->success("QR-Codes are generated successfully");

        return static::CODE_SUCCESS;
    }
}
