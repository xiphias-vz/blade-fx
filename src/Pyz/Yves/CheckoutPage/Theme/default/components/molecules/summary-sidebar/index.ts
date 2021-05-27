import './summary-sidebar.scss';

const paymentNumberInputField = <HTMLInputElement>document.querySelector('#txt_paymentCardNumber');
const errorMessageHolder = <HTMLInputElement>document.querySelector('.error-message');
const payBackForm = <HTMLFormElement>document.querySelector('#frm_payback');
const linkPayBackInput = <HTMLInputElement>document.querySelector('input[name=linkPayBackInput]');
const additionalInfo = <HTMLElement>document.querySelector('.additional-info');
const prefix = '308342';
const checkbox = <HTMLInputElement>document.querySelector(".checkbox__input");
window.addEventListener('DOMContentLoaded', () => {
    if(payBackForm !== null) {
        payBackForm.addEventListener('submit', (e) => {
            const paymentNumberInputFieldValue = prefix.concat(paymentNumberInputField.value);

            if(valid_credit_card(paymentNumberInputFieldValue)) {
                linkPayBackInput.value = '1';
                checkbox.checked = true;
                paymentNumberInputField.value = paymentNumberInputFieldValue;
            }
            else {
                errorMessageHolder.style.visibility = 'visible';
                errorMessageHolder.style.color = 'red';

                setTimeout(() => {
                    errorMessageHolder.style.visibility = 'hidden';
                }, 1000)

                e.preventDefault();
                return false;
            }

        })

        if(!checkbox.checked) {
            additionalInfo.style.display = 'none';
        }

        checkbox.addEventListener('change', (e) => {
            if(e.target.checked) {
                additionalInfo.style.display = 'block';
            }
            else {
                additionalInfo.style.display = 'none'
                paymentNumberInputField.value = '';
            }
        })
    }
})

function valid_credit_card(value) {
    if (/[^0-9-\s]+/.test(value)) return false;
    let nCheck = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (let n = value.length - 1; n >= 0; n--) {
        let cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) == 0;
}

