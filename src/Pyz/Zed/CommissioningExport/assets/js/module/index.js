/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

'use strict';

$(document).ready(function() {

    var $dateFrom = $('.js-date-from');
    var $dateTo = $('.js-date-to');

    $dateFrom.datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        numberOfMonths: 3,
        maxDate: $dateTo.val(),
        defaultData: 0,
        onClose: function(selectedDate) {
            $dateTo.datepicker('option', 'minDate', selectedDate);
        }
    });

    $dateTo.datepicker({
        defaultData: 0,
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        numberOfMonths: 3,
        minDate: $dateFrom.val(),
        onClose: function(selectedDate) {
            $dateFrom.datepicker('option', 'maxDate', selectedDate);
        }
    });
});
