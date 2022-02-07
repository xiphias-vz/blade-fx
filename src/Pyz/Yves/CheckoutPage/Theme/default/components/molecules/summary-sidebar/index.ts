import './summary-sidebar.scss';
const paymentNumberInputField = <HTMLInputElement>document.querySelector('#txt_paymentCardNumber');
const errorMessageHolder = <HTMLInputElement>document.querySelector('.error-message');
const payBackForm = <HTMLFormElement>document.querySelector('#frm_payback');
const linkPayBackInput = <HTMLInputElement>document.querySelector('input[name=linkPayBackInput]');
const additionalInfo = <HTMLElement>document.querySelector('.additional-info');
const prefix = '308342';
const checkbox = <HTMLInputElement>document.querySelector('.checkbox__input');
const myGlobusCard = <HTMLInputElement>document.querySelector('#myGlobusCard');
const isPaybackConnected = <HTMLInputElement>document.querySelector('#isPaybackConnected');

window.addEventListener('DOMContentLoaded', () => {
    if (payBackForm !== null) {
        if (paymentNumberInputField.value !== '') {
                linkPayBackInput.value = '1';
        }

        payBackForm.addEventListener('submit',e => {
            const paymentNumberInputFieldValue = prefix.concat(paymentNumberInputField.value);
            if (valid_credit_card(paymentNumberInputFieldValue) && myGlobusCard.value !== '' && isPaybackConnected.value === '') {
                linkPayBackInput.value = '1';
                checkbox.checked = true;
                additionalInfo.style.display = 'block';
                localStorage.setItem('RefreshFlag', 'value');
            } else if (valid_credit_card(paymentNumberInputFieldValue) && myGlobusCard.value === '' && isPaybackConnected.value === '') {
                linkPayBackInput.value = '1';
                checkbox.checked = true;
                additionalInfo.style.display = 'none';
            } else {
                errorMessageHolder.style.visibility = 'visible';
                errorMessageHolder.style.color = 'red';

                setTimeout(() => {
                    errorMessageHolder.style.visibility = 'hidden';
                }, 1300);

                e.preventDefault();

                return false;
            }
        });

        if (myGlobusCard.value !== '' && isPaybackConnected.value === '1') {
            linkPayBackInput.value = '1';
            checkbox.checked = true;
            additionalInfo.style.display = 'none';
        } else if (myGlobusCard.value !== '' && isPaybackConnected.value === '') {
            checkbox.checked = false;
            additionalInfo.style.display = 'block';
        } else if (myGlobusCard.value === '' && isPaybackConnected.value === '') {
            checkbox.checked = false;
            additionalInfo.style.display = 'none';
        } else if (myGlobusCard.value === '' && isPaybackConnected.value === '1') {
            linkPayBackInput.value = '1';
            checkbox.checked = true;
            additionalInfo.style.display = 'none';
        }

        if (localStorage.getItem('RefreshFlag')) {
            additionalInfo.style.display = 'block';
            localStorage.removeItem('RefreshFlag');
        }
    }
});

function valid_credit_card(value) {
    if (/[^0-9-\s]+/.test(value)) return false;
    let nCheck = 0, bEven = false;
    value = value.replace(/\D/g, '');

    for (let n = value.length - 1; n >= 0; n--) {
        let cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

        nCheck += nDigit;
        bEven = !bEven;
    }
    return (nCheck % 10) == 0;
}
