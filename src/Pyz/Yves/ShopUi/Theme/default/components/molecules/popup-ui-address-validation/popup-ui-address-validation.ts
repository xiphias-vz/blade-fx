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

    protected requiredCard = false;
    protected globalCardNumber;

    protected async readyCallback() {
        this.linkToAddressModal = document.getElementById(this.getLinkToAddressModal);
        this.closeModalBtn = this.$this.find(this.getCloseButtonSelector);
        this.submitRegistrationFormButton = document.getElementById(this.getSubmitFormButton);
        this.cancelRegistrationFormButton = document.getElementById(this.getCancelRegisterButton);
        this.$registrationForm = document.getElementsByName(this.registerForm);
        this.$firstName = document.getElementById(this.getFirstName);
        this.$lastName = document.getElementById(this.getLastName);
        this.$streetName = document.getElementById(this.getStreet);
        this.$houseNumber = document.getElementById(this.getHouseNumber);
        this.$zip = document.getElementById(this.getZipNumber);
        this.$city = document.getElementById(this.getCity);
        this.$userNameElement = document.getElementById(this.getUserName);
        this.$userZipCity = document.getElementById(this.getUserZipCity);
        this.$userStreetHouseNo = document.getElementById(this.getUserStreetHouseNo);
        this.$userSvg = document.getElementById(this.getUserSvg);
        this.$apiNameElement = document.getElementById(this.getApiName);
        this.$apiZipCity = document.getElementById(this.getApiZipCity);
        this.$apiStreetHouseNo = document.getElementById(this.getApiStreetHouseNo);
        this.$apiSvg = document.getElementById(this.getApiSvg);
        this.$userDiv = document.getElementById(this.getUserDiv);
        this.$apiDiv = document.getElementById(this.getApiDiv);
        this.$userCheckedCircleWrapper = document.getElementById(this.getUserCircleWrapper);
        this.$apiCheckedCircleWrapper = document.getElementById(this.getApiCircleWrapper);
        this.$apiButton = document.getElementById(this.getApiButton);
        this.$userButton = document.getElementById(this.getUserButton);

        this.$errorMessageSpan = document.getElementsByClassName(this.errorMessageSpan);
        this.$errorDivAboveSubmitButton = document.getElementById(this.errorDivAboveSubmit);
        this.$globusCardNumberField = document.getElementById(this.getMyGlobusCardNumber);
        this.$radioButtons = document.getElementsByName(this.getRadioButtonsName);
        this.hiddenMyGlobusCardNumber = document.querySelector('#registerForm_my_globus_card_number');

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
                    this.$this.addClass(`${this.name}--show`);
                    this.afterApiCall();
                }
            });
        }

        if (this.closeModalBtn != undefined){
            this.closeModalBtn.on('click', () => {
                this.$this.toggleClass(this.showClass);
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
                this.$this.toggleClass(this.showClass);
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
    }

    protected  afterApiCall(): void
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

        const url = '/register/customer-address-api';

        const formData = new FormData();

        formData.append('firstName', firstName.value);
        formData.append('lastName', lastName.value);
        formData.append('street', street.value);
        formData.append('houseNumber', houseNumber.value);
        formData.append('zip', zip.value);
        formData.append('city', city.value);

        fetch(url,
            { method: 'POST', body: formData })
            .then(response => response.json())
            .then(parsedResponse => {
                if(parsedResponse != undefined && parsedResponse !== []){
                    var addressData = JSON.parse(parsedResponse);
                    if(addressData.code === "VZ"){
                        this.addContentToModal(parsedResponse);
                        this.$this.addClass(`${this.name}--show`);
                    }
                    else {
                        this.submitRegistrationForm();
                        this.emptyDivElements();
                    }
                }
            })
            .catch(error => {});

    }

    protected async callCardNumberCheckAPI(): Promise<string> {

        const cardNumber = $(this.$globusCardNumberField).val();
        const url = '/register/check-card-number';

        const formData = new FormData();
        let dataToSend = '';

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

    protected async checkIfDataIsInputed(){
        let flag = 0;

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

        if (this.$zip.value === '' || this.$zip.value === null){
            this.$zip.classList.add('input--error');
            this.addErrorMessageToTheInputField(this.$zip);
            flag = 1;
        }

        if (this.$city.value === '' || this.$city.value === null){
            this.$city.classList.add('input--error');
            this.addErrorMessageToTheInputField(this.$city);
            flag = 1;
        }

        if (this.requiredCard) {
            if (this.$globusCardNumberField.value === '' || this.$globusCardNumberField.value === null) {
                this.$globusCardNumberField.classList.add('input--error');
                this.addErrorMessageToTheInputField(this.$globusCardNumberField, true);
                flag = 1;
            } else {
                const cardNumber = await this.callCardNumberCheckAPI();
                if (cardNumber !== 'used_card_error') {
                    this.hiddenMyGlobusCardNumber.value = cardNumber;
                } else {
                    this.$globusCardNumberField.value = '';
                    this.$globusCardNumberField.classList.add('input--error');
                    this.addErrorMessageToTheInputField(this.$globusCardNumberField, true);
                    flag = 1;
                }
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

        this.$city.classList.remove('input--error');

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

    protected addErrorMessageToTheInputField(element, cardNumberError: boolean = false): void{
        const errorSpan = document.createElement('span');
        errorSpan.setAttribute('class', 'errorValidationMessage');
        errorSpan.textContent = '• Dieses Feld sollte nicht leer sein.';
        if (cardNumberError) {
            $(element).parent().append(errorSpan);
        } else {
            $(element).parent().append(errorSpan);
        }
    }

    protected addErrorMessageToTheSubmitButton(): void{
        this.$errorDivAboveSubmitButton.setAttribute('class', 'errorSubmitMessage');
        this.$errorDivAboveSubmitButton.textContent = 'Bitte füllen Sie die Pflichtfelder aus.';
    }

    protected addContentToModal(data): void{
        const responseData = JSON.parse(data);
        const firstName = responseData.firstName;
        const lastName = responseData.lastName;
        const zip = responseData.address.zip;
        const houseNumber = responseData.address.houseNo;
        const street = responseData.address.street;
        const city = responseData.address.city;

        this.$apiFirstNameValue = firstName;
        this.$apiLastNameValue = lastName;
        this.$apiStreet = street;
        this.$apiHouseNumber = houseNumber;
        this.$apiCity = city;
        this.$apiZip = zip;

        this.setApiAttributesModal(firstName, lastName, street, houseNumber, zip, city);
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
}
