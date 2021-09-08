<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DataImport\Communication\Console;

use DateTime;
use Exception;
use Orm\Zed\Store\Persistence\SpyStoreQuery;
use PDO;
use PDOException;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Propel;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Spryker\Zed\Kernel\Locator;
use Spryker\Zed\Stock\Persistence\Propel\Mapper\StoreMapper;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\DataImport\Business\DataImportFacadeInterface getFacade()
 */
class DataImportCheckImagesConsole extends Console
{
    public const COMMAND_NAME = 'import:checkImages';
    public const COMMAND_DESCRIPTION = 'Check images availability';
    public const ARGUMENT_URL = 'url';
    public const ARGUMENT_URL_DESCRIPTION = 'root image url';

    /**
     * @var \Spryker\Zed\Event\Business\EventFacadeInterface|null
     */
    protected static $eventFacade;

    /**
     * @var array
     */
    protected $eventBulk = [];

    /**
     * @var int
     */
    protected $eventBulkCounter = 0;

    /**
     * @return void
     */
    protected function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this
            ->setDescription(static::COMMAND_DESCRIPTION)
            ->addArgument(
                self::ARGUMENT_URL,
                InputArgument::OPTIONAL,
                self::ARGUMENT_URL_DESCRIPTION
            );

        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int|null
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $counter = 0;
        $startTime = new DateTime();
        $url = $input->getArgument(self::ARGUMENT_URL);
        $qry = 'select sp.sku, spi.image_name, spi.external_url_large, spi.external_url_small
            from spy_product_image spi
                inner join spy_product_image_set_to_product_image spistpi on spi.id_product_image = spistpi.fk_product_image
                inner join spy_product_image_set spis on spistpi.fk_product_image_set = spis.id_product_image_set
                inner join spy_product sp on spis.fk_product = sp.id_product
            where sp.is_active = true
            order by sp.sku';
        try {
            $images = $this->getResult($qry, Propel::getConnection(), true);
            foreach ($images as $image) {
                if (empty($url)) {
                    if (!empty($image["external_url_large"])) {
                        $r = $this->curlGet($image["external_url_large"]);
                        if (str_contains($r, "AccessDenied")) {
                            $output->writeln($image["sku"] . "|" . $image["external_url_large"]);
                        }
                    }
                    if (!empty($image["external_url_small"]) && $image["external_url_large"] != $image["external_url_small"]) {
                        $r = $this->curlGet($image["external_url_small"]);
                        if (str_contains($r, "AccessDenied")) {
                            $output->writeln($image["sku"] . "|" . $image["external_url_small"]);
                        }
                    }
                } else {
                    if (!empty($image["image_name"])) {
                        $r = $this->curlGet($url . $image["image_name"]);
                        if (str_contains($r, "AccessDenied")) {
                            $output->writeln($image["sku"] . "|" . $image["image_name"]);
                        }
                    }
                }
                $counter++;
                if ($counter % 500 == 0) {
                    $interval = $startTime->diff(new DateTime());
                    $output->writeln("Checked " . $counter . " images in " . $interval->format('%Hh %Im %Ss'));
                }
            }
            $interval = $startTime->diff(new DateTime());
            $output->writeln("Finished - Checked " . $counter . " images in " . $interval->format('%Hh %Im %Ss'));

            return Console::CODE_SUCCESS;
        } catch (Exception $ex) {
            $output->writeln($ex->getMessage());
        }

        return Console::CODE_ERROR;
    }

    /**
     * Send a GET requst using cURL
     *
     * @param string $url to request
     *
     * @return string
     */
    private function curlGet(string $url)
    {
        $result = "OK";
        $headers = get_headers($url);
        if (!str_ends_with($headers[0], "200 OK")) {
            $result = "AccessDenied";
        }

        return $result;
    }

    /**
     * @param string $sql
     * @param \Propel\Runtime\Connection\ConnectionInterface $connection
     * @param bool $doFetch
     *
     * @return array
     */
    private function getResult(string $sql, ConnectionInterface $connection, bool $doFetch = true): array
    {
        try {
            $statement = $connection->prepare($sql);
            $statement->execute();

            if ($doFetch) {
                return $statement->fetchAll(PDO::FETCH_NAMED);
            }
        } catch (PDOException $ex) {
        }

        return [];
    }

    /**
     * Added here for keeping the BC, needs to inject this from outside
     *
     * @return void
     */
    protected function loadEventFacade()
    {
        if (!static::$eventFacade) {
            $locatorClassName = Locator::class;
            static::$eventFacade = $locatorClassName::getInstance()->event()->facade();
        }
    }

    /**
     * @return \Spryker\Zed\Stock\Persistence\Propel\Mapper\StoreMapper
     */
    public function createStoreMapper(): StoreMapper
    {
        return new StoreMapper();
    }

    /**
     * @return \Orm\Zed\Store\Persistence\SpyStoreQuery
     */
    public function getStoreQuery(): SpyStoreQuery
    {
        return new SpyStoreQuery();
    }
}
