/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

'use strict';

import './logic';

$(document).ready(function () {
    const orderItems = document.querySelectorAll('#order-item-list tr')

    groupOrderItemsByName(orderItems);

    function groupOrderItemsByName(orderItems) {
        for(let i = 0; i < orderItems.length; i++) {
            let currentOrderItem = orderItems[i];
            if(!currentOrderItem.classList.contains('header-row') && !currentOrderItem.classList.contains('nested-element')) {
                cloneOrderItemAndUpdateCurrentItem(currentOrderItem);
                currentOrderItem.addEventListener('click', (e) => toggleOrderItems(currentOrderItem));
            }

            for(let j = 0; j < orderItems.length; j++) {
                if(currentOrderItem.getAttribute('data-item-name') === orderItems[j].getAttribute('data-item-name')) {
                    if(!orderItems[j].classList.contains('header-row') && !orderItems[j].classList.contains('nested-element')) {
                        calculateQuantityPerOrderItem(orderItems[j], currentOrderItem);
                        if($(orderItems[j + 1]).hasClass('addition-row')){
                            let index = 0;
                            while (orderItems[j+ 1 + index].classList.contains('addition-row')) {
                                orderItems[j].parentNode.insertBefore(orderItems[j + 1 + index], orderItems[j].nextElementSibling)
                                index++;
                                if(!$(orderItems[j+ 1 + index]).hasClass('addition-row')) {
                                    break;
                                }
                            }

                        }
                    }
                }
            }
        }

        removeCloneOfSingleItems();

    }

    function calculateQuantityPerOrderItem(orderItem, currentOrderItem)  {
        if(orderItem.querySelector('.quantity-balance') === null) {
            return;
        }
        let individualQuantity = parseInt(orderItem.querySelector('.quantity-balance .quantity').innerHTML);
        let currentQuantity = parseInt(currentOrderItem.querySelector('.quantity-balance .quantity').innerHTML);
        let pickedQuantity = parseInt(currentOrderItem.querySelector('.quantity-balance .picked').innerHTML);
        let currentItemState = currentOrderItem.querySelector('.item-state').innerHTML;
        let itemState = orderItem.querySelector('.item-state').textContent;
        let averageWeight = orderItem.getAttribute('data-weightPerUnit');
        let newWeight = orderItem.getAttribute('data-newWeight');

        let currentWeightAmount = currentOrderItem.querySelector('.total-weight').innerHTML;
        let totalWeight = 0;
        if(currentWeightAmount !== "") {
            totalWeight += parseInt(currentWeightAmount);
        }
        if(averageWeight !== "") {
            totalWeight += parseInt(averageWeight);
        }
        if(newWeight !== "") {
            currentOrderItem.querySelector('.cumulative-weight').innerHTML = (newWeight !== "" ? newWeight : 0) + ' gr';
        }
        if(itemState !== "cancelled" && itemState !== "ready for picking" && itemState !== "ready for picking (paused)") {
            pickedQuantity += individualQuantity;
        }

        currentQuantity += individualQuantity;
        currentOrderItem.querySelector('.quantity-balance .picked').innerHTML = String(pickedQuantity);
        currentOrderItem.querySelector('.quantity-balance .quantity').innerHTML = String(currentQuantity);
        if(totalWeight !== 0) {
            currentOrderItem.querySelector('.total-weight').innerHTML = String(totalWeight) + ' gr';
        }
        if(currentItemState !== itemState) {
            if(!currentItemState.includes(itemState)) {
                currentOrderItem.querySelector('.item-state').innerHTML += '/ '+ itemState;
            }
        }
        orderItem.classList.add('nested-element');
        orderItem.querySelector('.quantity-balance').innerHTML = String(individualQuantity);
        currentOrderItem.parentElement.insertBefore(orderItem, currentOrderItem.nextElementSibling);
        orderItem.querySelector('img').remove();
    }

    function cloneOrderItemAndUpdateCurrentItem(currentOrderItem) {
        let clonedOrderItem = currentOrderItem.cloneNode(true);
        if(clonedOrderItem.querySelector('img') === null) {
           return
        }
        if(clonedOrderItem.classList.contains('addition-row'))
            return;
        let weightPerUnit = clonedOrderItem.getAttribute('data-weightPerUnit');
        let newWeight = clonedOrderItem.getAttribute('data-newWeight');
        currentOrderItem.classList.add('header-row');
        clonedOrderItem.querySelector('img').remove();
        clonedOrderItem.classList.add('nested-element');
        currentOrderItem.querySelector('.quantity-balance .quantity').innerHTML = clonedOrderItem.getAttribute('data-quantity');
        if(clonedOrderItem.querySelector('.item-state').innerHTML !== "cancelled"
            && clonedOrderItem.querySelector('.item-state').innerHTML !== "ready for picking"
            && clonedOrderItem.querySelector('.item-state').innerHTML !== "ready for picking (paused)"
        ) {
            currentOrderItem.querySelector('.quantity-balance .picked').innerHTML = clonedOrderItem.getAttribute('data-quantity');
        } else {
            currentOrderItem.querySelector('.quantity-balance .picked').innerHTML = "0";
        }
        if(weightPerUnit !== "") {
            currentOrderItem.querySelector('.total-weight').innerHTML = weightPerUnit + ' gr';
            currentOrderItem.querySelector('.cumulative-weight').innerHTML = (newWeight !== "" ? newWeight : 0) + ' gr';
        }
        currentOrderItem.querySelector('.item-state').innerHTML = clonedOrderItem.querySelector('.item-state').innerHTML;
        clonedOrderItem.querySelector('.quantity-balance').innerHTML = clonedOrderItem.getAttribute('data-quantity');
        let arrowIcon = document.createElement('i');
        arrowIcon.classList.add('arrow');
        arrowIcon.classList.add('down');
        currentOrderItem.appendChild(arrowIcon);
        currentOrderItem.parentElement.insertBefore(clonedOrderItem, currentOrderItem.nextElementSibling);
    }

    function removeCloneOfSingleItems() {
        let orderItems = document.querySelectorAll('.picking-zone-item');
        for(let i = 0; i < orderItems.length; i++) {
            if(orderItems[i].classList.contains('nested-element')) {
                if(orderItems[i - 1].classList.contains('header-row') &&  orderItems[i + 1] === undefined) {
                    orderItems[i - 1].querySelector('.arrow').remove();
                    orderItems[i - 1].querySelector('.quantity-balance').innerHTML =
                        orderItems[i - 1].querySelector('.quantity-balance .quantity').innerHTML;
                    updateSingleOrderItem(orderItems[i - 1]);
                    orderItems[i].remove();
                }
                else if(orderItems[i - 1].classList.contains('header-row') && orderItems[i + 1].classList.contains('header-row')) {
                    orderItems[i - 1].querySelector('.arrow').remove();
                    orderItems[i - 1].querySelector('.quantity-balance').innerHTML =
                        orderItems[i - 1].querySelector('.quantity-balance .quantity').innerHTML;
                    updateSingleOrderItem(orderItems[i - 1]);
                    orderItems[i].remove();
                }
            }
        }
    }

    function updateSingleOrderItem(orderItem) {
        if(orderItem.getAttribute('data-weightPerUnit') !== "") {
            orderItem.querySelector('.quantity-balance').innerHTML += ` <p>${orderItem.getAttribute('data-weightPerUnit')} gr</p>`
        }
    }

    function toggleOrderItems(clickedOrderItem) {
        let orderItems = document.querySelectorAll('.picking-zone-item');

        for(let i = 0; i < orderItems.length; i++) {
            let currentOrderItem = orderItems[i];
            let currentOrderItemName = orderItems[i].getAttribute('data-item-name');
            if(clickedOrderItem.getAttribute('data-item-name') === currentOrderItemName) {
                if(window.getComputedStyle(orderItems[i]).display === 'table-row' && !currentOrderItem.classList.contains('header-row')) {
                    currentOrderItem.classList.add('collapsed');
                    currentOrderItem.style.display = 'none';
                    toggleArrow(clickedOrderItem,'HIDE_ORDER_ITEMS');
                    toggleAdditionalRows(currentOrderItem, 'HIDE_ORDER_ITEMS');
                } else if(window.getComputedStyle(orderItems[i]).display === 'none' && !currentOrderItem.classList.contains('header-row')){
                    currentOrderItem.classList.remove('collapsed');
                    currentOrderItem.style.display = 'table-row';
                    toggleArrow(clickedOrderItem,'DISPLAY_ORDER_ITEMS');
                    toggleAdditionalRows(currentOrderItem, 'DISPLAY_TABLE_ROW');

                }
            }
        }
    }

    function toggleArrow(clickedOrderItem, operation) {
        if(operation === 'HIDE_ORDER_ITEMS') {
            clickedOrderItem.querySelector('.arrow').classList.remove('down');
            clickedOrderItem.querySelector('.arrow').classList.add('right');
        } else if(operation === 'DISPLAY_ORDER_ITEMS') {
            clickedOrderItem.querySelector('.arrow').classList.remove('right');
            clickedOrderItem.querySelector('.arrow').classList.add('down');
        }
    }

    function toggleAdditionalRows(currentRow, operation) {
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

})
