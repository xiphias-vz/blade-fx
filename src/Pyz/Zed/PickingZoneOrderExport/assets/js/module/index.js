/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

'use strict';

$(document).ready(function() {

    var $pickingDateField = $('.js-picking-date-field');
    const pickingZoneOrderExportFormPickingData = document.querySelector('#picking_zone_order_export_form_picking_date');
    $pickingDateField.datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        numberOfMonths: 3,
        defaultData: 0
    });

    var $storeField = $('.js-store-field');

    $storeField[0].addEventListener('change', event=>{
        sendStoreDataToIndexController(event.target.value, pickingZoneOrderExportFormPickingData.value)
    });

    function sendStoreDataToIndexController(storeName, pickingZoneOrderExportFormPickingDate) {
        let url = "";
        let originUrlTwo = window.location.origin + '/picking-zone-order-export/picking-zone-order-items-export';
        if(window.location.href === originUrlTwo){
            url = window.location.href + "/change-time-slots-by-user-select";
        } else {
            url = window.location.href + "/index/change-time-slots-by-user-select";
        }
        const dataToSend = {};
        dataToSend.storeName = storeName;
        dataToSend.exactDate = pickingZoneOrderExportFormPickingDate;
        url = url.trim();
        $.ajax(url, {
            type: 'POST',
            dataType: 'json',
            data: dataToSend,
            success(data, status, xhr) {
                appendNewTimeSlots(data);
            },
            error(jqXhr, textStatus, errorMessage) {
            }

        });
    }

    function appendNewTimeSlots(timeSlots) {
        let middleDiv = document.querySelector('#picking_zone_order_export_form_picking_time_slots');
        const timeSlotsLength = timeSlots.length;
        middleDiv.innerHTML = "";

        for (let i = 0; i < timeSlotsLength; i++) {
            let checkBoxDivCreated = document.createElement('div')
            checkBoxDivCreated.classList.add('checkbox');
            checkBoxDivCreated.innerHTML =
                `<label for="picking_zone_order_export_form_picking_time_slots_${i}" class="">
                 <input type="checkbox" id="picking_zone_order_export_form_picking_time_slots_${i}"
                 name="picking_zone_order_export_form[picking_time_slots][]" value="${i}">${timeSlots[i].time_slot}</label>`
            middleDiv.append(checkBoxDivCreated)
        }
    }
});
