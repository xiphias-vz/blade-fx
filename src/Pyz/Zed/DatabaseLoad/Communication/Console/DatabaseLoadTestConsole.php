<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\DatabaseLoad\Communication\Console;

use Orm\Zed\DatabaseLoad\Persistence\PyzDatabaseLoadTest;
use Orm\Zed\DatabaseLoad\Persistence\PyzDatabaseLoadTestQuery;
use PDO;
use Propel\Runtime\Propel;
use Pyz\Zed\Propel\PropelConfig;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Pyz\Zed\Oms\Business\OmsFacadeInterface getFacade()
 * @method \Spryker\Zed\Oms\Persistence\OmsQueryContainerInterface getQueryContainer()
 * @method \Spryker\Zed\Oms\Communication\OmsCommunicationFactory getFactory()
 * @method \Spryker\Zed\Oms\Persistence\OmsRepositoryInterface getRepository()
 */
class DatabaseLoadTestConsole extends Console
{
    public const COMMAND_NAME = 'db:load-test';
    public const COMMAND_DESCRIPTION = 'Provide heavy load-test on database by inserting millions of records';

    public const TEST_NAME = 'test-name';
    public const TEST_NAME_SHORTCUT = 't';

    public const CHUNK_SIZE = 'chunk-size';
    public const CHUNK_SIZE_SHORTCUT = 'c';

    public const RECORD_NUMBERS = 'record-number';
    public const RECORD_NUMBERS_SHORTCUT = 'r';

    /**
     * @var string
     */
    protected $testName = 'single-inserts';

    /**
     * @var int
     */
    protected $chunkSize = 100;

    /**
     * @var int
     */
    protected $records = 1000;

    /**
     * @var array
     */
    protected $testSuite = [
        'single-inserts' => 'runSingleInserts',
        'single-updates' => 'runSingleUpdates',
        'batch-inserts' => 'runBatchInserts',
        'batch-updates' => 'runBatchUpdates',
        'clean-table' => 'runCleanTable',
    ];

    /**
     * @return void
     */
    protected function configure()
    {
        $this->setName(self::COMMAND_NAME);
        $this->setDescription(self::COMMAND_DESCRIPTION);

        $this->addOption(
            static::TEST_NAME,
            static::TEST_NAME_SHORTCUT,
            InputArgument::OPTIONAL,
            'Test name [default: single-inserts, other tests are single-updates, batch-inserts, batch-updates and clean-table for removing the records]'
        );

        $this->addOption(
            static::CHUNK_SIZE,
            static::CHUNK_SIZE_SHORTCUT,
            InputArgument::OPTIONAL,
            'Chunk size [default: 100]'
        );

        $this->addOption(
            static::RECORD_NUMBERS,
            static::RECORD_NUMBERS_SHORTCUT,
            InputArgument::OPTIONAL,
            'Record number [default: 1000]'
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
        if ($input->getOption(static::TEST_NAME)) {
            $this->testName = $input->getOption(static::TEST_NAME);
        }

        if ($input->getOption(static::CHUNK_SIZE)) {
            $this->chunkSize = (int)$input->getOption(static::CHUNK_SIZE);
        }

        if ($input->getOption(static::RECORD_NUMBERS)) {
            $this->records = (int)$input->getOption(static::RECORD_NUMBERS);
        }

        if (array_key_exists($this->testName, $this->testSuite)) {
            $output->writeln(sprintf('Test name: %s, Chunk-size: %d, Number of records: %d', $this->testName, $this->chunkSize, $this->records));
            $starttime = microtime(true);

            $testSuite = $this->testSuite[$this->testName];
            $this->$testSuite();

            $endtime = microtime(true);
            $timediff = $endtime - $starttime;
            $output->writeln(sprintf('Test has been successfully finished. Time [%4f seconds]', $timediff));
        } else {
            $output->writeln('No test found!');
        }
    }

    /**
     * @return void
     */
    protected function runSingleInserts()
    {
        for ($i = 0; $i < $this->records; $i++) {
            $entity = new PyzDatabaseLoadTest();
            $entity->setFakeId($i);
            $entity->setFakeVarchar($this->getFakeVarchar());
            $entity->setFakeText($this->getFakeText());
            $entity->save();
            $this->output->writeln(sprintf('%d record(s) are processed', $i), OutputInterface::VERBOSITY_DEBUG);
        }

        $this->output->writeln(sprintf('%d records are affected', $this->records));
    }

    /**
     * @return void
     */
    protected function runSingleUpdates()
    {
        $affectedRow = 0;
        for ($i = 0; $i < $this->records; $i++) {
            $entity = PyzDatabaseLoadTestQuery::create()
                ->filterByFakeId($i)
                ->findOne();

            if (!$entity) {
                continue;
            }

            $affectedRow++;
            $entity->setFakeVarchar('(UPDATED)' . $this->getFakeVarchar());
            $entity->setFakeText('(UPDATED)' . $this->getFakeText());
            $entity->save();
            $this->output->writeln(sprintf('%d record(s) are processed', $i), OutputInterface::VERBOSITY_DEBUG);
        }

        $this->output->writeln(sprintf('%d records are affected', $affectedRow));
    }

    /**
     * @return void
     */
    protected function runBatchInserts()
    {
        $propelConfig = new PropelConfig();
        $dbEngine = $propelConfig->getCurrentDatabaseEngine();
        $sql = $this->prepareBatchInsertSql($dbEngine);
        $index = 0;
        $i = 0;
        $chunkRound = 0;
        while ($i < $this->records) {
            if ($i !== 0) {
                $sql .= ',';
            }

            if ($dbEngine === PropelConfig::DB_ENGINE_MYSQL) {
                $sql .= sprintf('(%d, "%s", "%s")', $index++, $this->getFakeText(), $this->getFakeVarchar());
            } else {
                $sql .= sprintf("(nextval('pyz_database_load_test_id_pyz_database_load_test_seq'), %d, '%s', '%s')", $index++, $this->getFakeText(), $this->getFakeVarchar());
            }
            $i++;
            if ($i === $this->chunkSize) {
                $chunkRound++;
                $this->executeSql($sql);
                $this->output->writeln(sprintf('%d chunk of %d records are processed', $chunkRound, $i), OutputInterface::VERBOSITY_DEBUG);
                $i = 0;
                $this->records = $this->records - $this->chunkSize;
                $sql = $this->prepareBatchInsertSql($dbEngine);
            }
        }

        if ($i !== 0) {
            $chunkRound++;
            $this->executeSql($sql);
            $this->output->writeln(sprintf('%d chunk of %d records are processed', $chunkRound, $i), OutputInterface::VERBOSITY_DEBUG);
        }

        $this->output->writeln(sprintf('%d records are affected', $index));
    }

    /**
     * @param string $dbEngine
     *
     * @return string
     */
    protected function prepareBatchInsertSql(string $dbEngine): string
    {
        $sql = 'insert into pyz_database_load_test (id_pyz_database_load_test, fake_id, fake_text, fake_varchar) VALUES ';

        if ($dbEngine === PropelConfig::DB_ENGINE_MYSQL) {
            $sql = 'insert into pyz_database_load_test (fake_id, fake_text, fake_varchar) VALUES ';
        }

        return $sql;
    }

    /**
     * @return void
     */
    protected function runBatchUpdates()
    {
        $sql = '';
        $index = 0;
        $i = 0;
        $chunkRound = 0;
        while ($i < $this->records) {
            $sql .= sprintf("update pyz_database_load_test set fake_text = '(UPDATED) %s', fake_varchar='(UPDATED) %s' where fake_id = %d;", $this->getFakeText(), $this->getFakeVarchar(), $index++);
            $i++;
            if ($i === $this->chunkSize) {
                $chunkRound++;
                $this->executeSql($sql);
                $this->output->writeln(sprintf('%d chunk of %d records are processed', $chunkRound, $i), OutputInterface::VERBOSITY_DEBUG);
                $i = 0;
                $this->records = $this->records - $this->chunkSize;
                $sql = '';
            }
        }

        if ($sql !== '') {
            $chunkRound++;
            $this->executeSql($sql);
            $this->output->writeln(sprintf('%d chunk of %d records are processed', $chunkRound, $i), OutputInterface::VERBOSITY_DEBUG);
        }
    }

    /**
     * @return void
     */
    protected function runCleanTable()
    {
        $records = PyzDatabaseLoadTestQuery::create()->deleteAll();

        $this->output->writeln(sprintf('%d records are deleted, Table is empty now.', $records));
    }

    /**
     * @return string
     */
    protected function getFakeVarchar()
    {
        return 'This is a load test for varchar column';
    }

    /**
     * @return string
     */
    protected function getFakeText()
    {
        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut urna velit. Nulla massa mi, mollis nec massa nec, sagittis consectetur elit. Proin pellentesque ex vitae suscipit mattis. Nullam feugiat metus in nibh porta, ac ornare sem ultricies. Sed accumsan ultricies faucibus. Suspendisse sapien ligula, efficitur eget tellus in, imperdiet accumsan eros. Sed eleifend accumsan malesuada. Suspendisse sed odio arcu. Aliquam tempor turpis at hendrerit sollicitudin. Vestibulum vitae neque placerat, consectetur sapien vitae, semper magna. Mauris a euismod justo. Nunc enim risus, gravida vel venenatis ac, sollicitudin non elit. Quisque rhoncus varius suscipit. Donec id euismod mi, ac blandit lacus. Donec vitae augue risus. Pellentesque a neque odio. Nullam convallis, nunc sed blandit ullamcorper, felis enim mattis lacus, efficitur faucibus ligula est ac turpis. Aenean vehicula quis nisl quis gravida. Mauris vel libero metus. Pellentesque iaculis dolor vitae mattis aliquet. Suspendisse et ullamcorper lacus, eget tincidunt justo. In velit velit, commodo vitae nunc a, malesuada mollis neque. Proin dignissim ullamcorper nisl, in ullamcorper neque lobortis sit amet. Pellentesque a tristique dolor, in maximus lectus. Fusce quis finibus massa. Morbi iaculis, eros eget molestie venenatis, ligula sapien aliquam tortor, eu feugiat risus augue vel diam. Proin sit amet metus elit. Curabitur interdum nisl enim, in auctor magna porta consequat. Proin laoreet mattis maximus. Duis ante massa, imperdiet a eros facilisis, placerat molestie eros. Integer tortor massa, ullamcorper a libero posuere, blandit accumsan enim. Nullam pulvinar dolor arcu, vitae tempor nisl interdum luctus. Vivamus est risus, gravida nec viverra et, viverra quis lectus. Integer nibh justo, suscipit non pharetra a, rhoncus ut risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst. Nullam ornare tortor a tempor euismod. Nulla vehicula nisi ac turpis viverra tempor. Aliquam eget elit quis lacus blandit cursus sit amet sit amet massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean et viverra arcu. Vestibulum feugiat et augue non iaculis. Mauris gravida risus eget velit vestibulum venenatis. Nam tristique tortor sit amet pellentesque auctor. Aliquam sagittis lacus sit amet velit suscipit, eget mattis nisl posuere. In efficitur vestibulum risus, sed convallis dolor malesuada ac. Proin tellus ligula, maximus ac leo scelerisque, fermentum sagittis lectus. Donec a urna venenatis arcu ullamcorper vestibulum in sed enim. Nulla nec erat eu lacus ultricies bibendum a id dolor. Duis elementum lobortis ipsum ac cursus. In hac habitasse platea dictumst. Aliquam feugiat velit massa, quis lobortis libero euismod vel. Nulla ultricies nisi lectus, quis feugiat leo aliquam non. Aliquam hendrerit, eros nec bibendum convallis, nulla mi aliquam metus, ac egestas est sapien sit amet nisi. Pellentesque ut sodales arcu. Etiam eget nisl in purus porttitor pellentesque ut ut enim. Ut vitae mi nec diam tincidunt bibendum. Nunc dignissim malesuada sem, eu iaculis risus ullamcorper vel. Nam pharetra vestibulum purus, vel ultricies justo hendrerit non.';
    }

    /**
     * @param string $sql
     * @param array $parameters
     *
     * @return void
     */
    protected function executeSql(string $sql, $parameters = [])
    {
        $connection = Propel::getConnection();
        $connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);

        $stmt = $connection->prepare($sql);
        $stmt->execute($parameters);
    }
}
