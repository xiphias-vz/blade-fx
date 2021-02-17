<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sitemap\Communication\Console;

use Orm\Zed\UrlStorage\Persistence\SpyUrlStorageQuery;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\Sitemap\Communication\SitemapCommunicationFactory getFactory()
 */
class SitemapConsole extends Console
{
    public const COMMAND_NAME = 'sitemap:generate';
    public const COMMAND_DESCRIPTION = 'Generate new Sitemap.xml';
    public const SHIPMENT_NAME = 'Click & Collect';
    public const SITEMAP1_FILE_NAME = "public/Yves/sitemap1.xml";
    public const SITEMAP2_FILE_NAME = "public/Yves/sitemap2.xml";
    public const COUNT_BREAK = 50000;

    /**
     * @return void
     */
    protected function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);
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
        $urls = $this->getUrls();
        $urlsCount = count($urls);
        dump("NUMBER OF URL's: " . $urlsCount);
        if ($urlsCount < static::COUNT_BREAK && $urlsCount != 0) {
            $this->singleXml($urls, $urlsCount);
        } else {
            $this->multipleXmls($urls, $urlsCount);
        }
    }

    /**
     * @return array
     */
    protected function getUrls()
    {
        $categoryUrlEntity = SpyUrlStorageQuery::create()
            ->find();

        return $categoryUrlEntity->getData();
    }

    /**
     * @param array $urls
     * @param int $count
     *
     * @return void
     */
    protected function singleXml(array $urls, int $count): void
    {
        $sitemap1File = null;
        $sitemap2File = null;

        try {
            $sitemap1File = fopen(static::SITEMAP1_FILE_NAME, "r+");
            $sitemap2File = fopen(static::SITEMAP2_FILE_NAME, "r+");

            $this->deleteFileContent(static::SITEMAP1_FILE_NAME);
            $generatedContent = $this->addXmlHeader();

            for ($i = 0; $i < $count; $i++) {
                $generatedContent = $this->addUrlsToString($urls[$i], $generatedContent);
            }
            $generatedContent = $this->addXmlFooter($generatedContent);
            dump("Generated content \n" . $generatedContent);
            file_put_contents(static::SITEMAP1_FILE_NAME, $generatedContent);

            $generatedContent2 = $this->addXmlHeader();
            $generatedContent2 = $this->addXmlFooter($generatedContent2);
            file_put_contents(static::SITEMAP2_FILE_NAME, $generatedContent2);
            dump("Opened file 1: " . $sitemap1File);
            dump("Opened file 2: " . $sitemap2File);
            dump("SAVED Single XML");
        } catch (Exception $e) {
            dump($e);
        } finally {
            if ($sitemap1File != null) {
                fclose($sitemap1File);
            }
            if ($sitemap2File != null) {
                fclose($sitemap2File);
            }
        }
    }

    /**
     * @param array $urls
     * @param int $count
     *
     * @return void
     */
    protected function multipleXmls(array $urls, int $count): void
    {
        $sitemap1File = null;
        $sitemap2File = null;
        try {
            $sitemap1File = fopen(static::SITEMAP1_FILE_NAME, "r+");
            $sitemap2File = fopen(static::SITEMAP2_FILE_NAME, "r+");

            $this->deleteFileContent(static::SITEMAP1_FILE_NAME);
            $this->deleteFileContent(static::SITEMAP2_FILE_NAME);

            $generatedContent1 = $this->addXmlHeader();
            $generatedContent2 = $this->addXmlHeader();

            $generatedContent1 = $this->writeToXml1($urls, $generatedContent1);
            $generatedContent2 = $this->writeToXml2($urls, $generatedContent2, $count);

            $generatedContent1 = $this->addXmlFooter($generatedContent1);
            $generatedContent2 = $this->addXmlFooter($generatedContent2);

            file_put_contents(static::SITEMAP1_FILE_NAME, $generatedContent1);
            file_put_contents(static::SITEMAP2_FILE_NAME, $generatedContent2);
            dump("SAVED Multiple XMLs");
        } catch (Exception $e) {
            dump($e);
        } finally {
            if ($sitemap1File != null) {
                fclose($sitemap1File);
            }
            if ($sitemap2File != null) {
                fclose($sitemap2File);
            }
        }
    }

    /**
     * @param string $fileName
     *
     * @return void
     */
    protected function deleteFileContent(string $fileName): void
    {
        file_put_contents($fileName, "");
    }

    /**
     * @return string
     */
    protected function addXmlHeader(): string
    {
        $content = '<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';

        return $content;
    }

    /**
     * @param string $content
     *
     * @return string
     */
    protected function addXmlFooter(string $content): string
    {
        $content .= "\n";
        $content .= '</urlset>';

        return $content;
    }

    /**
     * @param array $urls
     * @param string $generatedContent
     *
     * @return string
     */
    protected function writeToXml1(array $urls, string $generatedContent): string
    {
        for ($i = 0; $i < static::COUNT_BREAK; $i++) {
            $generatedContent = $this->addUrlsToString($urls[$i], $generatedContent);
        }

        return $generatedContent;
    }

    /**
     * @param array $urls
     * @param string $generatedContent
     * @param int $count
     *
     * @return string
     */
    protected function writeToXml2(array $urls, string $generatedContent, int $count): string
    {
        for ($i = static::COUNT_BREAK; $i < $count; $i++) {
            $generatedContent = $this->addUrlsToString($urls[$i], $generatedContent);
        }

        return $generatedContent;
    }

    /**
     * @param object $url
     * @param string $generatedContent
     *
     * @return string
     */
    protected function addUrlsToString(object $url, string $generatedContent): string
    {
        $updatedAtArr = (array)$url->getUpdatedAt();
        $updateDate = explode(" ", $updatedAtArr['date']);
        $generatedContent .= "\n";
        $generatedContent .= "    <url>\n";
        $generatedContent .= "        <loc>https://shop.globus.de" . urlencode($url->getUrl()) . "</loc>\n";
        $generatedContent .= "        <lastmod>" . $updateDate[0] . "</lastmod>\n";
        $generatedContent .= "    </url>";

        return $generatedContent;
    }
}
