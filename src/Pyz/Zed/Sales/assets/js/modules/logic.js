/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

'use strict';

$(document).ready(function () {

    const pickZones = document.getElementById('list1');
    const timeslots = document.getElementById('list2');
    if(pickZones !== null) {
        pickZones.getElementsByClassName('anchor')[0].onclick = function(evt) {
            if (pickZones.classList.contains('visible'))
                pickZones.classList.remove('visible');
            else
                pickZones.classList.add('visible');
        }
    }

    if(timeslots !== null) {
        timeslots.getElementsByClassName('anchor')[0].onclick = function(evt) {
            if (timeslots.classList.contains('visible'))
                timeslots.classList.remove('visible');
            else
                timeslots.classList.add('visible');
        }
    }

    $('.sales-order-item-group-element button').click(function(e) {
        e.preventDefault();
        var keyItemGroup = $(this).closest('.sales-order-item-group-element').data('group-key');
        var $groupTable = $('.order-group-items-table-' + keyItemGroup);
        var $idGroupItems = $groupTable.find('input[name="order-item"]');
        var idGroupItemsCheckedList = [];
        var idGroupItemsFullList = [];
        var $form = $(this).closest('form');
        var formAction = $form.attr('action');

        $idGroupItems.each(function () {
            idGroupItemsFullList.push($(this).val());

            if ($(this).prop('checked')) {
                idGroupItemsCheckedList.push($(this).val());
            }
        });

        if (!idGroupItemsCheckedList.length) {
            idGroupItemsCheckedList = idGroupItemsFullList;
        }

        var finalUrl = formAction + '&' + $.param({items: idGroupItemsCheckedList});

        $(this).prop('disabled', true).addClass('disabled');
        $form.attr('action', finalUrl);
        $form.submit();
    });

    $('.item-check').click(function(){
        var $table = $(this).closest('table');
        var $checkAllOrders = $table.find('.check-all-orders');
        var countChecked = $table.find('.item-check[type="checkbox"]:checked').length;
        var totalCheckboxItems = $table.find('.item-check').length;

        if (totalCheckboxItems === countChecked) {
            $checkAllOrders.prop('checked', true);

            return;
        }

        $checkAllOrders.prop('checked', false);
    });

    $('.more-attributes').click(function(e){
        e.preventDefault();
        var idProductItem = $(this).data('id');
        var $attributes = $('#attribute_details_' + idProductItem);
        var $button = $('#attribute-details-btn-' + idProductItem);
        var isHidden = $attributes.hasClass('hidden');

        $attributes.toggleClass('hidden', !isHidden);
        $button.toggleClass('is-hidden', !isHidden);
        $button.toggleClass('is-shown', isHidden);
    });

    $('.item-split').click(function(e){
        e.preventDefault();
        var theID = $(this).data('id');

        $('#split_form_row_' + theID).toggle();
    });

    $('.check-all-orders').click(function(){
        $(this).closest('table').find('.item-check').prop('checked', $(this).prop('checked'));
    });

    $('.trigger-event:contains(cancel by customer)').click(function(event) {
        var isActionConfirmed = confirm('Sind Sie sicher, dass Sie die Wunscheinkauf stornieren möchten?');

        if (isActionConfirmed) {
            return;
        }

        event.preventDefault();
    });

});
window.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const table = document.querySelector('#order-item-list');
    const pickingZoneHeaders = document.querySelectorAll('.pickingZoneHeader');
    const headers = document.querySelectorAll('#order-item-list th[data-pickzone]')
    const tableRows = document.querySelectorAll('#order-item-list tr')
    let isCurrentUserSupervisorOrAdmin;
    if(document.querySelector("#isCurrentUserSupervisorOrAdmin") !== null)
        isCurrentUserSupervisorOrAdmin = document.querySelector("#isCurrentUserSupervisorOrAdmin").value;
    let visibleHeader = null;
    for(let i = 0; i < headers.length; i++) {
        headers[i].parentElement.addEventListener('click', (e) => toggleItemsGroupedByPickingZone(headers[i].parentElement, e));
        headers[i].parentElement.classList.add('picking-zone-name');
        let current = headers[i].getAttribute('data-pickZone');
        if(headers[i + 1] !== undefined) {
            let nextHeader = headers[i + 1].getAttribute('data-pickZone');
            if(current === nextHeader)
                headers[i + 1].style.display = 'none';
        }
    }
    sortTable(tableRows, table);
    removeNotNeededRows();
    if(parseInt(isCurrentUserSupervisorOrAdmin) === 1) {
        showResetFunctionality(visibleHeader);
    }

    let pageSwitcher = document.querySelector("#page_switcher")
    pageSwitcher.addEventListener('change', changeOrderItemsPerPage)

    let buttonNext = document.getElementsByClassName('js-paginate_button next')[0]
    buttonNext.addEventListener('click', onNextButtonClick)

    let buttonPrevious = document.getElementsByClassName('js-paginate_button previous')[0]
    buttonPrevious.addEventListener('click', onPreviousButtonClick)

    function changeOrderItemsPerPage(e) {
        let itemsPerPage = e.target.value;
        queryParams.set("items-per-page", itemsPerPage);
       if (queryParams.has('page')) {
           queryParams.set('page', '1');
       }
        window.location = window.location.pathname + '?' + queryParams.toString();
    }

    function onNextButtonClick(e) {
        let pageCounter = document.querySelector('#page_number')
        if (!buttonNext.classList.contains('disabled')) {
            let currentPageNumber = pageCounter.children[0].innerText
            let nextPageNumber = parseInt(currentPageNumber) + 1
            queryParams.set('page', nextPageNumber);
            window.location = window.location.pathname + '?' + queryParams.toString();
        }
    }

    function onPreviousButtonClick(e) {
        let pageCounter = document.querySelector('#page_number')
        if (!buttonPrevious.classList.contains('disabled')) {
            let currentPageNumber = pageCounter.children[0].innerText
            let nextPageNumber = parseInt(currentPageNumber) - 1
            queryParams.set('page', nextPageNumber);
            window.location = window.location.pathname + '?' + queryParams.toString();
        }
    }

    function showResetFunctionality() {
        let hasItemStatusPickedOrCancelled = false;
        let hasItemStatusReadyForPicking = false;
        let hasForbiddenStatus = false;
        let currentPickZone = '';
        for(let i = 0; i < pickingZoneHeaders.length; i++) {
            if(window.getComputedStyle(pickingZoneHeaders[i]).display === 'table-cell') {
                visibleHeader = pickingZoneHeaders[i];
                if(currentPickZone === '') {
                    currentPickZone = pickingZoneHeaders[i].getAttribute('data-pickZone');
                }
                if(currentPickZone !== pickingZoneHeaders[i].getAttribute('data-pickZone')) {
                    hasItemStatusReadyForPicking = false;
                    hasItemStatusPickedOrCancelled = false;
                }
                let itemState = pickingZoneHeaders[i].getAttribute('data-orderItemState');
                if (itemState === 'picked' || itemState === 'cancelled') {
                      hasItemStatusPickedOrCancelled = true;
                } else if(itemState === 'ready for picking' || itemState === 'ready for picking (paused)') {
                    hasItemStatusReadyForPicking = true;
                } else {
                    hasForbiddenStatus = true;
                }

                if(hasItemStatusPickedOrCancelled && hasItemStatusReadyForPicking && !hasForbiddenStatus) {
                    visibleHeader.querySelector('.reset-picking-zone').style.display = 'flex';
                } else if (hasItemStatusPickedOrCancelled && !hasItemStatusReadyForPicking && !hasForbiddenStatus) {
                    visibleHeader.querySelector('.reset-picking-zone').style.display = 'flex';
                } else {
                    visibleHeader.querySelector('.reset-picking-zone').style.display = 'none';
                }

            }
            else if(window.getComputedStyle(pickingZoneHeaders[i]).display === 'none'){
                let itemState = pickingZoneHeaders[i].getAttribute('data-orderItemState');
                if(visibleHeader.getAttribute('data-pickZone') === pickingZoneHeaders[i].getAttribute('data-pickZone')) {
                    if(currentPickZone === '') {
                        currentPickZone = pickingZoneHeaders[i].getAttribute('data-pickZone');
                    }
                    if(currentPickZone !== pickingZoneHeaders[i].getAttribute('data-pickZone')) {
                        hasItemStatusReadyForPicking = false;
                        hasItemStatusPickedOrCancelled = false;
                    }
                    if (itemState === 'picked' || itemState === 'cancelled') {
                        hasItemStatusPickedOrCancelled = true;
                    } else if(itemState === 'ready for picking' || itemState === 'ready for picking (paused)') {
                        hasItemStatusReadyForPicking = true;
                    } else {
                        hasForbiddenStatus = true;
                    }

                    if(hasItemStatusPickedOrCancelled && hasItemStatusReadyForPicking && !hasForbiddenStatus) {
                        visibleHeader.querySelector('.reset-picking-zone').style.display = 'flex';
                    } else if (hasItemStatusPickedOrCancelled && !hasItemStatusReadyForPicking && !hasForbiddenStatus) {
                        visibleHeader.querySelector('.reset-picking-zone').style.display = 'flex';
                    } else {
                        visibleHeader.querySelector('.reset-picking-zone').style.display = 'none';
                    }
                }

            }
        }
    }

    function toggleItemsGroupedByPickingZone(row, e) {
        if(e.target.nodeName === 'BUTTON') {
            return;
        }
        let pickingZone = row.querySelector('.pickingZoneHeader');
        let pickingZoneValue = pickingZone.getAttribute('data-pickZone');
        const pickingZoneItems = document.querySelectorAll('#order-item-list tr[data-pickzone-item]');
        let arr = Array.prototype.slice.call(pickingZoneItems);
        arr.map((el, index) => {

            if(el.getAttribute('data-pickZone-item') === pickingZoneValue) {
                if(window.getComputedStyle(el).display === 'none') {
                    if(!el.classList.contains('collapsed')) {
                        el.style.display = 'table-row';
                        let arrow = pickingZone.querySelector('.arrow');
                        toggleAdditionalRows('DISPLAY_TABLE_ROW', el);
                        toggleArrowIcon('ADD_DOWN_ARROW', arrow);
                    }

                }
                else {
                    el.style.display = 'none';
                    let arrow = pickingZone.querySelector('.arrow');
                    toggleAdditionalRows('DISPLAY_NONE', el);
                    toggleArrowIcon('ADD_RIGHT_ARROW', arrow);

                }
            }
        });
    }

    function toggleAdditionalRows(operation, currentRow) {
       let additionalRow = currentRow.nextElementSibling;
       if(additionalRow === null)
           return;
       while (additionalRow.classList.contains('addition-row')) {
           additionalRow.style.display = operation === 'DISPLAY_TABLE_ROW' ? 'table-row' : 'none';
           if(additionalRow.nextElementSibling === null)
               break;
           additionalRow = additionalRow.nextElementSibling;

           if(!additionalRow.classList.contains('addition-row')) {
               break;
           }
       }

    }

    function toggleArrowIcon(operation, arrow) {
        if(operation === 'ADD_DOWN_ARROW') {
            arrow.classList.remove('right');
            arrow.classList.add('down');
        }
        else {
            arrow.classList.remove('down');
            arrow.classList.add('right');
        }
    }

    function sortTable(pickingZones) {
        let x, y;
        for(let i = 0; i < pickingZones.length; i++) {
            x = pickingZones[i]
            for(let j = 0; j < pickingZones.length; j++) {
                y = pickingZones[j];
                if(y.hasAttribute('data-pickZone-item') && x.hasAttribute('data-pickZone-item')) {
                    if (y.getAttribute('data-pickZone-item').toLowerCase() === x.getAttribute('data-pickZone-item').toLowerCase()) {
                        y.parentNode.insertBefore(y, x);
                        if($(pickingZones[j+ 1]).hasClass('addition-row')){
                            let index = 0;
                            while (pickingZones[j+ 1 + index].classList.contains('addition-row')) {
                                y.parentNode.insertBefore(pickingZones[j + 1 + index], y.nextElementSibling)
                                index++;
                                if(!$(pickingZones[j+ 1 + index]).hasClass('addition-row')) {
                                    break;
                                }
                            }

                        }
                    }
                }
            }
        }
    }

    function removeNotNeededRows() {
        let rows = document.querySelectorAll('#order-item-list tr');
        for(let i = 0; i < rows.length; i++) {
            if(i === rows.length -1) {
                if(rows[i].classList.contains('picking-zone-name')) {
                    rows[i].style.display = 'none';
                }
            }
            if(rows[i+1] !== undefined) {
                if(!rows[i+1].classList.contains('picking-zone-item') && rows[i].classList.contains('picking-zone-name')) {
                    rows[i].style.display = 'none';
                }
            }
        }
    }

})
