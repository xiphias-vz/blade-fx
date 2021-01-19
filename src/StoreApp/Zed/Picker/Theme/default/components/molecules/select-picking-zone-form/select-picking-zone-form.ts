const selectPickingZoneForm = document.querySelector('form[name="picking_zone_selection_form"]');

window.addEventListener('DOMContentLoaded', (event) => {
    if(selectPickingZoneForm !== null) {
        disableSubmitButtonWhenNoItemIsSelected();
    }
});

function disableSubmitButtonWhenNoItemIsSelected() {
    const radioItemInputFields =  selectPickingZoneForm.querySelectorAll('.radio__input');
    const radioItem =  selectPickingZoneForm.querySelectorAll('.select-picking-zone-form__radio-item')
    let submitButton = selectPickingZoneForm.querySelector('.submit button');
    let isOneItemSelected = false;
    disableFieldsWithNoOrders(radioItem, radioItemInputFields);

    for(let i = 0; i < radioItemInputFields.length; i++) {
        radioItem[i].addEventListener('change', (e) => {
            submitButton.disabled = false;
        })
        if(radioItemInputFields[i].checked) {
            isOneItemSelected = true;
        }
    }
    if(isOneItemSelected) {
        submitButton.disabled = false;
    }
    else {
        submitButton.disabled = true;
    }
}

function disableFieldsWithNoOrders(radioItem, radioItemInputFields) {
    for(let i = 0; i < radioItemInputFields.length; i++) {
        let labelPickZone = radioItemInputFields[i].parentNode.lastChild;
        let pickZoneWithOrderNumber = labelPickZone.innerHTML.split('/');
        labelPickZone.innerHTML =  pickZoneWithOrderNumber[0];
        let numberOfOrders = pickZoneWithOrderNumber[1];
        if(numberOfOrders == 0) {
            radioItemInputFields[i].setAttribute('disabled', 'disabled');
            labelPickZone.classList.add('disable-field')
        }
    }
}
