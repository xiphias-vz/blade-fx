'use strict'

$(document).ready(function () {
    let isPickzoneTab = document.querySelector('#isPickzoneTab');
    let tabPickZone = document.querySelectorAll('li[data-tab-content-id]');

    for(let i = 0; i < tabPickZone.length; i++) {
        tabPickZone[i].addEventListener('click', (e) => clickOnTab(tabPickZone[i], e));
    }


    function clickOnTab(tab, e){
        let valuePickingZone = '0';
        if (tab.getAttribute('data-tab-content-id') === 'tab-content-pickzone'){
            valuePickingZone = '1';
        }
        else {
            valuePickingZone = '0';
        }
        isPickzoneTab.setAttribute('value', valuePickingZone);
    }
})
