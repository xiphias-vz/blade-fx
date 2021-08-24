<?php

$storeCodeBucket = getenv('SPRYKER_CODE_BUCKET');

if ($storeCodeBucket == 'CZ') {
    return 'OST';
} else {
    return 'EIN';
}
