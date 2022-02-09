import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PopupUiAddressValidation extends Component{
    protected $this: $ = $(this);
    protected linkToAddressModal;
    protected closeModalBtn;
    protected submitRegistrationFormButton;
    protected cancelRegistrationFormButton;
    protected $registrationForm;
    protected $firstName;
    protected $lastName;
    protected $streetName;
    protected $houseNumber;
    protected $zip;
    protected $city;
    protected $userNameElement;
    protected $userZipCity;
    protected $userStreetHouseNo;
    protected $userSvg;
    protected $apiNameElement;
    protected $apiZipCity;
    protected $apiStreetHouseNo;
    protected $apiSvg;
    protected $userDiv;
    protected $apiDiv;
    protected $apiFirstNameValue;
    protected $apiLastNameValue;
    protected $apiStreet;
    protected $apiZip;
    protected $apiHouseNumber;
    protected $apiCity;
    protected $userFirstNameValue;
    protected $userLastNameValue;
    protected $userStreet;
    protected $userZip;
    protected $userHouseNumber;
    protected $userCity;
    protected $userCheckedCircleWrapper;
    protected $apiCheckedCircleWrapper;
    protected $apiButton;
    protected $userButton;
    protected $errorMessageSpan;
    protected $errorDivAboveSubmitButton;
    protected $globusCardNumberField;
    protected $radioButtons;
    protected hiddenMyGlobusCardNumber;
    protected hiddenMyGlobusCardType;
    protected checkboxIsAdvertise;
    protected hiddenIsMeinGlobus;
    protected $mobilePhoneNumber;
    protected $phoneNumber;
    protected $cmbDay;
    protected $cmbMonth;
    protected $cmbYear;

    protected ageDiff;
    protected flagRadio;
    protected registerForma = false;
    protected requiredCard = false;
    protected globalCardNumber;

    protected cardKey = 'cardNumber';
    protected isPhysicalKey = 'is_physical';

    protected async readyCallback() {
        this.linkToAddressModal = this.findElement(this.getLinkToAddressModal);
        if (!this.linkToAddressModal) {
            this.linkToAddressModal = document.getElementsByClassName('form__action js-form-register__submit-button form__action--login button button--large button--expand-tablet')[0];
            if (this.linkToAddressModal) {
                this.registerForma = true;
                this.linkToAddressModal.addEventListener("click", function(event) {
                    event.preventDefault();
                }, false);
            }
        }
        this.closeModalBtn = this.$this.find(this.getCloseButtonSelector);
        this.submitRegistrationFormButton = this.findElement(this.getSubmitFormButton);
        this.cancelRegistrationFormButton = this.findElement(this.getCancelRegisterButton);
        this.$registrationForm = document.getElementsByName(this.registerForm);
        this.$firstName = this.findElement(this.getFirstName);
        this.$lastName = this.findElement(this.getLastName);
        this.$streetName = this.findElement(this.getStreet);
        this.$houseNumber = this.findElement(this.getHouseNumber);
        this.$zip = this.findElement(this.getZipNumber);
        this.$city = this.findElement(this.getCity);
        this.$userNameElement = this.findElement(this.getUserName);
        this.$userZipCity = this.findElement(this.getUserZipCity);
        this.$userStreetHouseNo = this.findElement(this.getUserStreetHouseNo);
        this.$userSvg = this.findElement(this.getUserSvg);
        this.$apiNameElement = this.findElement(this.getApiName);
        this.$apiZipCity = this.findElement(this.getApiZipCity);
        this.$apiStreetHouseNo = this.findElement(this.getApiStreetHouseNo);
        this.$apiSvg = this.findElement(this.getApiSvg);
        this.$userDiv = this.findElement(this.getUserDiv);
        this.$apiDiv = this.findElement(this.getApiDiv);
        this.$userCheckedCircleWrapper = this.findElement(this.getUserCircleWrapper);
        this.$apiCheckedCircleWrapper = this.findElement(this.getApiCircleWrapper);
        this.$apiButton = document.getElementById(this.getApiButton);
        this.$userButton = document.getElementById(this.getUserButton);

        this.$errorMessageSpan = document.getElementsByClassName(this.errorMessageSpan);
        this.$errorDivAboveSubmitButton = document.getElementById(this.errorDivAboveSubmit);
        this.$globusCardNumberField = this.findElement(this.getMyGlobusCardNumber);
        this.$radioButtons = document.getElementsByName(this.getRadioButtonsName);
        this.hiddenMyGlobusCardNumber = document.querySelector('#registerForm_my_globus_card_number');
        this.hiddenMyGlobusCardType = document.querySelector('#registerForm_isMyGloubsCardValid');
        this.checkboxIsAdvertise = document.querySelector('#chk_isAdvertise .checkbox__input');
        this.hiddenIsMeinGlobus = document.querySelector('#registerForm_isMeinGlobus');
        this.$mobilePhoneNumber = document.getElementById(this.getMobilePhoneNumber);
        if (!this.$mobilePhoneNumber) {
            this.$mobilePhoneNumber = document.getElementById(this.getMobilePhoneNumberRegistrationForm);
        }
        this.$phoneNumber = document.getElementById(this.getPhoneNumber);
        if (!this.$phoneNumber) {
            this.$phoneNumber = document.getElementById(this.getPhoneNumberRegistrationForm);
        }
        this.$cmbDay = document.getElementById(this.getDay);
        if (!this.$cmbDay) {
            this.$cmbDay = document.getElementById(this.getDayRegistrationForm);
        }
        this.$cmbMonth = document.getElementById(this.getMonth);
        if (!this.$cmbMonth) {
            this.$cmbMonth = document.getElementById(this.getMonthRegistrationForm);
        }
        this.$cmbYear = document.getElementById(this.getYear);
        if (!this.$cmbYear) {
            this.$cmbYear = document.getElementById(this.getYearRegistrationForm);
        }

        await this.mapEvents();
    }

    protected async mapEvents()
    {
        if (this.linkToAddressModal != undefined){
            this.linkToAddressModal.addEventListener('click', async() => {

                if (this.$radioButtons[0].checked) {
                    this.requiredCard = true;
                } else {
                    this.requiredCard = false;
                }

                this.removeErrorLabels();
                this.emptyDivElements();
                this.enableApiContent();

                const fieldsChecked = await this.checkIfDataIsInputed();
                if (fieldsChecked === true) {
                    this.afterApiCall();
                }
            });
        }

        if (this.closeModalBtn != undefined){
            this.closeModalBtn.on('click', () => {
                this.closeModal();
                this.emptyDivElements();
            });
        }

        if (this.submitRegistrationFormButton != undefined){
            this.submitRegistrationFormButton.addEventListener('click', () => {
                this.submitRegistrationForm();
                this.emptyDivElements();
            });
        }

        if (this.cancelRegistrationFormButton != undefined){
            this.cancelRegistrationFormButton.addEventListener('click', () => {
                this.closeModal();
                this.emptyDivElements();
            });
        }

        if(this.$userButton != undefined){
            this.$userButton.addEventListener('click', () => {
                this.clickedUserAddress();
                this.enableUserContent();
                this.disableApiContent();
            });
        }

        if(this.$apiButton != undefined){
            this.$apiButton.addEventListener('click', () => {
                this.clickedApiAddress();
                this.enableApiContent();
                this.disableUserContent();
            });
        }

        if(this.$userDiv != undefined) {
            this.$userDiv.addEventListener('click', () => {
                 this.findElement('hidShowScanAndGo').value = "0";
            });
        }

        if(this.$apiDiv != undefined) {
            this.$apiDiv.addEventListener('click', () => {
                this.findElement('hidShowScanAndGo').value = "1";
            });
        }
    }

    protected showModal(): void
    {
        this.$this.addClass(this.showClass);
    }

    protected closeModal(): void
    {
        this.$this.removeClass(this.showClass);
    }

    protected afterApiCall(): void
    {
        this.sendRequestToAddressAPI();
        this.setUserAttributesToModal();
    }

    protected disableUserContent(): void {
        this.$userCheckedCircleWrapper.classList.add(this.getDisableCircleWrapperClass);
        this.$userNameElement.classList.add(this.getDisableTextClass);
        this.$userZipCity.classList.add(this.getDisableTextClass);
        this.$userStreetHouseNo.classList.add(this.getDisableTextClass);

        this.$userButton.classList.remove(this.getSelectedDivClass);
    }

    protected disableApiContent(): void{
        this.$apiCheckedCircleWrapper.classList.add(this.getDisableCircleWrapperClass);
        this.$apiNameElement.classList.add(this.getDisableTextClass);
        this.$apiZipCity.classList.add(this.getDisableTextClass);
        this.$apiStreetHouseNo.classList.add(this.getDisableTextClass);
        this.$globusCardNumberField.classList.add(this.getDisableTextClass);

        this.$apiButton.classList.remove(this.getSelectedDivClass);
    }

    protected enableUserContent(): void{
        this.$userCheckedCircleWrapper.classList.remove(this.getDisableCircleWrapperClass);
        this.$userNameElement.classList.remove(this.getDisableTextClass);
        this.$userZipCity.classList.remove(this.getDisableTextClass);
        this.$userStreetHouseNo.classList.remove(this.getDisableTextClass);

        this.$userButton.classList.add(this.getSelectedDivClass);
    }

    protected enableApiContent(): void{
        this.$apiCheckedCircleWrapper.classList.remove(this.getDisableCircleWrapperClass);
        this.$apiNameElement.classList.remove(this.getDisableTextClass);
        this.$apiZipCity.classList.remove(this.getDisableTextClass);
        this.$apiStreetHouseNo.classList.remove(this.getDisableTextClass);

        this.$apiButton.classList.add(this.getSelectedDivClass);
    }

    protected clickedUserAddress(): void {
        const firstName = this.$userFirstNameValue;
        const lastName = this.$userLastNameValue;
        const street = this.$userStreet;
        const city = this.$userCity;
        const zip = this.$userZip;
        const houseNumber = this.$userHouseNumber;
        this.addValuesToFormElements(firstName, lastName, street, city, zip, houseNumber);
    }

    protected clickedApiAddress(): void {
        const firstName = this.$apiFirstNameValue;
        const lastName = this.$apiLastNameValue;
        const street = this.$apiStreet;
        const city = this.$apiCity;
        const zip = this.$apiZip;
        const houseNumber = this.$apiHouseNumber;
        this.addValuesToFormElements(firstName, lastName, street, city, zip, houseNumber);

    }

    protected addValuesToFormElements(firstName, lastName, street, city, zip, houseNumber): void
    {
        this.$firstName.value = firstName;
        this.$lastName.value = lastName;
        this.$streetName.value = street;
        this.$city.value = city;
        this.$zip.value = zip;
        this.$houseNumber.value = houseNumber;
    }

    protected setUserAttributesToModal(): void
    {
        const firstName = this.$firstName;
        const lastName = this.$lastName;
        const street = this.$streetName;
        const houseNumber = this.$houseNumber;
        const zip = this.$zip;
        const city = this.$city;

        this.$userFirstNameValue = firstName.value;
        this.$userLastNameValue = lastName.value;
        this.$userCity = city.value;
        this.$userZip = zip.value;
        this.$userHouseNumber = houseNumber.value;
        this.$userStreet = street.value;

        this.$userNameElement.append(firstName.value + ' ' + lastName.value);
        this.$userZipCity.append(zip.value + ' ' + city.value);
        this.$userStreetHouseNo.append(street.value + ' ' + houseNumber.value);
    }

    protected setApiAttributesModal(firstName, lastName, street, houseNumber, zip, city): void
    {
        this.$apiNameElement.append(firstName + ' ' + lastName);
        this.$apiZipCity.append(zip + ' ' + city);
        this.$apiStreetHouseNo.append(street + ' ' + houseNumber);
    }

    protected emptyDivElements(): void {
        this.$userNameElement.innerHTML = '';
        this.$userZipCity.innerHTML = '';
        this.$userStreetHouseNo.innerHTML = '';
        this.$apiNameElement.innerHTML = '';
        this.$apiZipCity.innerHTML = '';
        this.$apiStreetHouseNo.innerHTML = '';
        this.$globusCardNumberField.innerHTML = '';
    }

    public submitRegistrationForm(): void
    {
        this.checkoutStep('login');
        this.checkoutStep('pick-up station');
        this.$registrationForm[0].submit();
    }

    protected async sendRequestToAddressAPI(): Promise <void>
    {
        const firstName = this.$firstName;
        const lastName = this.$lastName;
        const street = this.$streetName;
        const houseNumber = this.$houseNumber;
        const zip = this.$zip;
        const city = this.$city;
        const we = this.checkboxIsAdvertise;
        const meinGlobus = this.hiddenIsMeinGlobus;

        const url = '/register/customer-address-api';

        const formData = new FormData();

        formData.append('firstName', firstName.value);
        formData.append('lastName', lastName.value);
        formData.append('street', street.value);
        formData.append('houseNumber', houseNumber.value);
        formData.append('zip', zip.value);
        formData.append('city', city.value);
        formData.append('we', we.checked);
        formData.append('meinGlobus', meinGlobus.checked);

        fetch(url,
            { method: 'POST', body: formData })
            .then(response => response.json())
            .then(parsedResponse => {
                if(parsedResponse != undefined && parsedResponse !== []){

                    if(parsedResponse.showOverlay === true){
                        this.addContentToModal(parsedResponse);
                        this.showModal();
                    }
                    else {
                        document.getElementById("hidShowScanAndGo").value = "2";
                        this.emptyDivElements();
                        this.submitRegistrationForm();
                    }

                }
            })
            .catch(error => {});

    }

    protected async callCardNumberCheckAPI(cardNumber): Promise<any> {
        const url = '/register/check-card-number';
        const formData = new FormData();
        let dataToSend;

        formData.append('id', cardNumber);

        await fetch(url,
            { method: 'POST', body: formData })
            .then(response => response.json())
            .then(parsedResponse => {
                if (parsedResponse != undefined && parsedResponse !== []){
                    dataToSend = parsedResponse;

                    return dataToSend;
                }
            })
            .catch(error => {
                return 'error';
            });

        return dataToSend;
    }

    protected getAgeDifference(){
        let dateFromInput = new Date(this.$cmbYear.value, (this.$cmbMonth.value-1), this.$cmbDay.value);
        let sixteenYearsAgo = new Date();
        sixteenYearsAgo.setTime(sixteenYearsAgo.valueOf() - 16 * 365.25 * 24 * 60 * 60 * 1000);
        this.ageDiff = sixteenYearsAgo < dateFromInput;
    }


    protected async checkIfDataIsInputed(){
        let flag = 0;

        this.getAgeDifference();

        if (this.ageDiff) {
            this.$cmbYear.parentNode.classList.add('input--error-birthday');
            this.addErrorMessageToTheInputField(this.$cmbYear.parentNode.parentNode, 5);
            flag = 1;
        }

        if (this.$firstName.value === '' || this.$firstName.value === null){
            this.$firstName.classList.add('input--error');
            this.addErrorMessageToTheInputField(this.$firstName);
            flag = 1;
        }

        if (this.$lastName.value === '' || this.$lastName.value === null){
            this.$lastName.classList.add('input--error');
            this.addErrorMessageToTheInputField(this.$lastName);
            flag = 1;
        }

        if (this.$streetName.value === '' || this.$streetName.value === null){
            this.$streetName.classList.add('input--error');
            this.addErrorMessageToTheInputField(this.$streetName);
            flag = 1;
        }

        if (this.$houseNumber.value === '' || this.$houseNumber.value === null){
            this.$houseNumber.classList.add('input--error');
            this.addErrorMessageToTheInputField(this.$houseNumber);
            flag = 1;
        }

        var regexNumbers = new RegExp(/^[0-9]*$/, 'g');
        var isNumbersOnly = regexNumbers.test(this.$zip.value);
        if (this.$zip.value === '' || this.$zip.value === null){
            $("#registerForm_customer_zip_code").parent(".form__field").children(".errorValidationMessage").remove();
            this.$zip.classList.add('input--error');
            flag = 1;
            this.addErrorMessageToTheInputField(this.$zip, 3);
        }

        if (this.$city.value === '' || this.$city.value === null){
            this.$city.classList.add('input--error');
            this.addErrorMessageToTheInputField(this.$city);
            flag = 1;
        }

        if ((this.$mobilePhoneNumber.value === '' || this.$mobilePhoneNumber.value === null) && (this.$phoneNumber.value === '' || this.$phoneNumber.value === null)){
            this.$mobilePhoneNumber.classList.add('input--error');
            this.addErrorMessageToTheInputField(this.$mobilePhoneNumber);
            this.$phoneNumber.classList.add('input--error');
            this.addErrorMessageToTheInputField(this.$phoneNumber);
            flag = 1;
        }

        if ($(this.$cmbDay).val() === '' || $(this.$cmbDay).val() === null
            || $(this.$cmbMonth).val() === '' || $(this.$cmbMonth).val() === null
            || $(this.$cmbYear).val() === '' || $(this.$cmbYear).val() === null)
        {
            if ($(this.$cmbDay).val() === '') {
                this.$cmbDay.parentNode.classList.add('input--error-birthday');
            }
            if ($(this.$cmbMonth).val() === '') {
                this.$cmbMonth.parentNode.classList.add('input--error-birthday');
            }
            if ($(this.$cmbYear).val() === '') {
                this.$cmbYear.parentNode.classList.add('input--error-birthday');
            }
            this.addErrorMessageToTheInputField(this.$cmbYear.parentNode.parentNode, 3);
            flag = 1;
        }

        if (this.requiredCard) {
            const cardNumber = $(this.$globusCardNumberField).val();
            if (this.$globusCardNumberField.value === '' || this.$globusCardNumberField.value === null) {

            } else {
                const cardNumberAfter = await this.callCardNumberCheckAPI(cardNumber);
                if (cardNumberAfter !== 'used_card_error') {
                    this.hiddenMyGlobusCardNumber.value = cardNumberAfter[this.cardKey];
                    this.hiddenMyGlobusCardType.value = cardNumberAfter[this.isPhysicalKey];
                } else {
                    this.$globusCardNumberField.value = '';
                    this.$globusCardNumberField.classList.add('input--error');
                    this.addErrorMessageToTheInputField(this.$globusCardNumberField, true);
                    flag = 1;
                }
            }
        } else {
            if (!this.$radioButtons[1].checked) {
                this.$radioButtons[0].parentNode.parentNode.classList.add('input--error');
                this.addErrorMessageToTheInputField(this.$radioButtons[0].parentNode.parentNode, 2);
                this.flagRadio = true;
                flag = 1;
            } else {
                this.flagRadio = false;
            }

        }

        if (flag === 0){
            return true;
        } else {
            this.addErrorMessageToTheSubmitButton();

            return false;
        }
    }

    protected removeErrorLabels(): void{
        this.$firstName.classList.remove('input--error');
        this.$lastName.classList.remove('input--error');
        this.$streetName.classList.remove('input--error');
        this.$houseNumber.classList.remove('input--error');
        this.$zip.classList.remove('input--error');
        this.$city.classList.remove('input--error');
        this.$mobilePhoneNumber.classList.remove('input--error');
        this.$phoneNumber.classList.remove('input--error');
        this.$radioButtons[0].parentNode.parentNode.classList.remove('input--error');
        this.$cmbDay.parentNode.classList.remove('input--error-birthday');
        this.$cmbMonth.parentNode.classList.remove('input--error-birthday');
        this.$cmbYear.parentNode.classList.remove('input--error-birthday');

        if (this.$globusCardNumberField.classList !== undefined) {
            this.$globusCardNumberField.classList.remove('input--error');
        }

        this.$errorDivAboveSubmitButton.setAttribute('class', 'errorSubmitMessage');
        this.$errorDivAboveSubmitButton.textContent = '';

        if (this.$errorMessageSpan.length > 0) {
            for (let i = 0; i < this.$errorMessageSpan.length; i++) {
                if (this.$errorMessageSpan[i].parentNode !== undefined) {
                    this.$errorMessageSpan[i].classList.add('hidden');
                }
            }
        }
    }

    // using flags for different cases -> 0 = normal case, 1 = card_number_error, 2 = radio button error message
    protected addErrorMessageToTheInputField(element, flag: number = 0): void{
        const errorSpan = document.createElement('span');
        errorSpan.setAttribute('class', 'errorValidationMessage');
        if (flag === 1) {
            errorSpan.textContent = '• Diese Kartennummer ist bereits angelegt. Bitte loggen Sie sich mit Ihrem Passwort ein.';
            $(element).parent().append(errorSpan);
        } else if (flag === 2) {
            errorSpan.textContent = '• Mindestens eine Angabe ist Pflicht.';
            $(element).parent().append(errorSpan);
        } else if (flag === 3) {
            errorSpan.textContent = '• Dieses Felder sollte nicht leer sein';
            errorSpan.classList.add('form__field', 'col', 'col--order-4', 'col--sm-12', 'col--md-12');
            $(element).parent().append(errorSpan);
        }
        else if (flag === 4) {
            errorSpan.textContent = '• Bitte eine 5-stellige PLZ eingeben.';
            errorSpan.classList.add('form__field', 'col', 'col--order-4', 'col--sm-12', 'col--md-12');
            $(element).parent().append(errorSpan);
        }
        else if (flag === 5) {
            errorSpan.textContent = '• Sie müssen mindestens 16 Jahre alt sein.';
            errorSpan.style.textAlign = "right";
            errorSpan.classList.add('form__field', 'col', 'col--order-4', 'col--sm-12', 'col--md-12');
            $(element).parent().append(errorSpan);
        }
        else {
            errorSpan.textContent = '• Dieses Feld sollte nicht leer sein';
            $(element).parent().append(errorSpan);
        }
    }

    protected addErrorMessageToTheSubmitButton(): void{
        if (this.registerForma) {
            const errorSpan = document.createElement('span');
            errorSpan.setAttribute('class', 'errorValidationMessage');
            $(errorSpan).css('position', 'absolute');
            $(errorSpan).css('margin-bottom', '45px');
            errorSpan.textContent = 'Bitte füllen Sie die Pflichtfelder aus.';
            if(this.registerForma == true && this.ageDiff == true && this.flagRadio == false){
                errorSpan.textContent = '';
            }
            this.linkToAddressModal.parentNode.prepend(errorSpan);
        } else {
            this.$errorDivAboveSubmitButton.setAttribute('class', 'errorSubmitMessage');
            this.$errorDivAboveSubmitButton.textContent = 'Bitte füllen Sie die Pflichtfelder aus.';
        }

    }

    protected addContentToModal(data): void{
        const firstName = data.result.firstName;
        const lastName = data.result.lastName;
        const zip = data.result.address.zip;
        const houseNumber = data.result.address.houseNo;
        const street = data.result.address.street;
        const city = data.result.address.city;

        this.$apiFirstNameValue = firstName;
        this.$apiLastNameValue = lastName;
        this.$apiStreet = street;
        this.$apiHouseNumber = houseNumber;
        this.$apiCity = city;
        this.$apiZip = zip;

        this.setApiAttributesModal(firstName, lastName, street, houseNumber, zip, city);
    }

    protected findElement(name:string): HTMLElement {
        let el = document.getElementById(name);
        if(!el) {
            name = name.replace('registerForm_customer_', 'registerForm_');
            el = document.getElementById(name);
        }
        return el;
    }

    protected checkoutStep(option)
    {
        window.dataLayer.push({
            'event': 'eec.checkout',
            'ecommerce':
                {
                    'checkout':
                        {
                            'actionField':
                                {
                                    'step': '1',
                                    'option': option,
                                }
                        },
                },
        });
    }

    get getLinkToAddressModal(): string{
        return 'link-to-address-modal';
    }

    get getCloseButtonSelector(): string{
        return `.${this.name}__close`;
    }

    get showClass(): string {
        return `${this.name}--show`;
    }

    get getCancelRegisterButton(): string{
        return 'button-cancel-registration';
    }

    get getSubmitFormButton(): string{
        return 'id-submit-registration-user';
    }

    get registerForm(){
        return 'registerForm';
    }

    get getFirstName(): string{
        return 'registerForm_customer_first_name';
    }

    get getLastName(): string  {
        return 'registerForm_customer_last_name';
    }

    get getStreet(): string {
        return 'registerForm_customer_address1';
    }

    get getHouseNumber(): string {
        return 'registerForm_customer_address2';
    }

    get getZipNumber(): string {
        return 'registerForm_customer_zip_code';
    }

    get getCity(): string {
        return 'registerForm_customer_city';
    }

    get getUserName(): string{
        return 'user_name_and_surname';
    }

    get getUserZipCity(): string {
        return 'user_zip_city';
    }

    get getUserStreetHouseNo(): string{
        return 'user_street_houseNo';
    }

    get getUserSvg(): string{
        return 'user_svg_icon';
    }

    get getApiName(): string{
        return 'api_name_and_surname';
    }

    get getApiZipCity(): string {
        return 'api_zip_city';
    }

    get getApiStreetHouseNo(): string{
        return 'api_street_houseNo';
    }

    get getApiSvg(): string{
        return 'api_svg_icon';
    }

    get getApiDiv(): string{
        return 'left-side';
    }

    get getUserDiv(): string{
        return 'right-side';
    }

    get getUserCircleWrapper(): string{
        return 'user_circle_class';
    }

    get getApiCircleWrapper(): string{
        return 'api_circle_class';
    }

    get getDisableCircleWrapperClass(): string{
        return 'popup-ui-address-validation__disabledCircle';
    }

    get getDisableTextClass(): string{
        return 'popup-ui-address-validation__disabledText';
    }

    get getSelectedDivClass(): string{
        return 'selected-div';
    }

    get getApiButton(): string {
        return 'api_button_content';
    }

    get getUserButton(): string {
        return 'user_button_content';
    }

    get errorMessageSpan(): string{
        return 'errorValidationMessage';
    }

    get errorDivAboveSubmit(): string{
        return 'errorMessageAboveSubmitButton';
    }

    get getMyGlobusCardNumber(): string {
        return 'myGlobusCardNumber';
    }

    get getRadioButtonsName(): string {
        return 'radio_kundenkarte';
    }

    get getMobilePhoneNumber(): string {
        return 'registerForm_customer_mobile_phone_number';
    }

    get getMobilePhoneNumberRegistrationForm(): string {
        return 'registerForm_mobile_phone_number';
    }

    get getPhoneNumber(): string {
        return 'registerForm_customer_phone';
    }

    get getPhoneNumberRegistrationForm(): string {
        return 'registerForm_phone';
    }

    get getDay(): string {
        return 'registerForm_customer_birth_day';
    }

    get getDayRegistrationForm(): string {
        return 'registerForm_birth_day';
    }

    get getMonth(): string {
        return 'registerForm_customer_birth_month';
    }

    get getMonthRegistrationForm(): string {
        return 'registerForm_birth_month';
    }

    get getYear(): string {
        return 'registerForm_customer_birth_year';
    }

    get getYearRegistrationForm(): string {
        return 'registerForm_birth_year';
    }
}
