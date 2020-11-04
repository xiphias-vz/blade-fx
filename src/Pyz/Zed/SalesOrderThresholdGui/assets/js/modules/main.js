/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

'use strict';

var thresholdStrategyToggle = function(thresholdGroup) {
    var strategyKey = $('input[name="global-threshold[' + thresholdGroup + '][strategy]"]:checked').val();

    $('.threshold-key-' + strategyKey).removeClass('hidden');
    $('.threshold_group_' + thresholdGroup + ':not(.threshold-key-'+ strategyKey +')').addClass('hidden');
};

$(document).ready(function () {
    thresholdStrategyToggle('hardThreshold');
    thresholdStrategyToggle('hardMaxThreshold');

    $('input[name="global-threshold[hardThreshold][strategy]"]').click(function () {
        thresholdStrategyToggle('hardThreshold');
    });

    $('input[name="global-threshold[hardMaxThreshold][strategy]"]').click(function() {
        thresholdStrategyToggle('hardMaxThreshold');
    });

    if ($('input[name="global-threshold[hardThreshold][strategy]"][value!=""]').length === 0) {
        $('input[name="global-threshold[hardThreshold][strategy]"]').parents('.form-group').addClass('hidden');
    }

    if ($('input[name="global-threshold[hardMaxThreshold][strategy]"][value!=""]').length === 0) {
        $('input[name="global-threshold[hardMaxThreshold][strategy]"]').parents('.form-group').addClass('hidden');
    }

    $('#global-threshold_storeCurrency').change(function() {
        window.location.href = '/sales-order-threshold-gui/global?store_currency='+$(this).val();
    })
});
