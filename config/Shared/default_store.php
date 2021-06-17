<?php

$storeCodeBucket =  getenv('SPRYKER_CODE_BUCKET');

if($storeCodeBucket == 'CZ'){
    return 'OPA';
}else{
    return 'EIN';
}

