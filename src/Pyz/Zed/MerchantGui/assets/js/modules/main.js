'use strict'

require('./pickZone');
require('../../scss/main.scss');

$(document).ready(function () {
    let isCashierTxtRadioInput = document.querySelector('#merchant_isCashierTxt');
    let isCashierXmlRadioInput = document.querySelector('#merchant_isCashierXml');
    isCashierTxtRadioInput.addEventListener('change', (e) => {
        if(isCashierXmlRadioInput.checked) {
            isCashierXmlRadioInput.checked = false
        }
    })
    isCashierXmlRadioInput.addEventListener('change', (e) => {
        if(isCashierTxtRadioInput.checked) {
            isCashierTxtRadioInput.checked = false
        }
    })
})
