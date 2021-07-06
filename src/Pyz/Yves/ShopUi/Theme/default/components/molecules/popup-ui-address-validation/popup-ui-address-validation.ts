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


    protected readyCallback() {
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

        this.mapEvents();
    }

    protected mapEvents(): void
    {
        if(this.linkToAddressModal != null){
            this.linkToAddressModal.addEventListener('click', () => {
                this.emptyDivElements();
                this.enableUserContent();
                this.sendRequestToAddressAPI();
                this.setUserAttributesToModal();
                this.$this.addClass(`${this.name}--show`);

            });
        }

        if(this.closeModalBtn !=null){
            this.closeModalBtn.on('click', () => {
                this.$this.toggleClass(this.showClass);
                this.emptyDivElements();
            });
        }

        if(this.submitRegistrationFormButton != null){
            this.submitRegistrationFormButton.addEventListener('click', () => {
                this.submitRegistrationForm();
                this.emptyDivElements();
            });
        }

        if(this.cancelRegistrationFormButton != null){
            this.cancelRegistrationFormButton.addEventListener('click', () => {
                this.$this.toggleClass(this.showClass);
                this.emptyDivElements();
            });
        }

        if(this.$userDiv != null){
            this.$userDiv.addEventListener('click', () => {
                this.clickedUserAddress();
                this.enableUserContent();
                this.disableApiContent();
            });
        }

        if(this.$apiDiv != null){
            this.$apiDiv.addEventListener('click', () => {
                this.clickedApiAddress();
                this.enableApiContent();
                this.disableUserContent();
            });
        }
    }

    protected disableUserContent(): void {
        this.$userCheckedCircleWrapper.classList.add(this.getDisableCircleWrapperClass);
        this.$userNameElement.classList.add(this.getDisableTextClass);
        this.$userZipCity.classList.add(this.getDisableTextClass);
        this.$userStreetHouseNo.classList.add(this.getDisableTextClass);

        this.$userDiv.classList.remove(this.getSelectedDivClass);
    }

    protected disableApiContent(): void{
        this.$apiCheckedCircleWrapper.classList.add(this.getDisableCircleWrapperClass);
        this.$apiNameElement.classList.add(this.getDisableTextClass);
        this.$apiZipCity.classList.add(this.getDisableTextClass);
        this.$apiStreetHouseNo.classList.add(this.getDisableTextClass);

        this.$apiDiv.classList.remove(this.getSelectedDivClass);
    }

    protected enableUserContent(): void{
        this.$userCheckedCircleWrapper.classList.remove(this.getDisableCircleWrapperClass);
        this.$userNameElement.classList.remove(this.getDisableTextClass);
        this.$userZipCity.classList.remove(this.getDisableTextClass);
        this.$userStreetHouseNo.classList.remove(this.getDisableTextClass);

        this.$userDiv.classList.add(this.getSelectedDivClass);
    }

    protected enableApiContent(): void{
        this.$apiCheckedCircleWrapper.classList.remove(this.getDisableCircleWrapperClass);
        this.$apiNameElement.classList.remove(this.getDisableTextClass);
        this.$apiZipCity.classList.remove(this.getDisableTextClass);
        this.$apiStreetHouseNo.classList.remove(this.getDisableTextClass);

        this.$apiDiv.classList.add(this.getSelectedDivClass);
    }

    protected clickedUserAddress(): void {
        let firstName = this.$userFirstNameValue;
        let lastName = this.$userLastNameValue;
        let street = this.$userStreet;
        let city = this.$userCity;
        let zip = this.$userZip;
        let houseNumber = this.$userHouseNumber;
        this.addValuesToFormElements(firstName, lastName, street, city, zip, houseNumber);
    }

    protected clickedApiAddress(): void {
        let firstName = this.$apiFirstNameValue;
        let lastName = this.$apiLastNameValue;
        let street = this.$apiStreet;
        let city = this.$apiCity;
        let zip = this.$apiZip;
        let houseNumber = this.$apiHouseNumber;
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
        let firstName = this.$firstName;
        let lastName = this.$lastName;
        let street = this.$streetName;
        let houseNumber = this.$houseNumber;
        let zip = this.$zip;
        let city = this.$city;

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

    protected emptyDivElements():void{
        this.$userNameElement.innerHTML = "";
        this.$userZipCity.innerHTML = "";
        this.$userStreetHouseNo.innerHTML = "";
        this.$apiNameElement.innerHTML = "";
        this.$apiZipCity.innerHTML = "";
        this.$apiStreetHouseNo.innerHTML = "";
    }

    public submitRegistrationForm(): void
    {
        this.$registrationForm[0].submit();
    }

    protected async sendRequestToAddressAPI(): Promise <void>
    {
        let firstName = this.$firstName;
        let lastName = this.$lastName;
        let street = this.$streetName;
        let houseNumber = this.$houseNumber;
        let zip = this.$zip;
        let city = this.$city;

        const url = "/register/customer-address-api";

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
                if(parsedResponse != undefined && parsedResponse != []){
                    this.addContentToModal(parsedResponse);
                }
            })
            .catch(error => {});
    }

    protected addContentToModal(data): void{
        let responseData = JSON.parse(data);
        let firstName = responseData.firstName;
        let lastName = responseData.lastName;
        let zip = responseData.address.zip;
        let houseNumber = responseData.address.houseNo;
        let street = responseData.address.street;
        let city = responseData.address.city;

        this.$apiFirstNameValue = firstName;
        this.$apiLastNameValue = lastName;
        this.$apiStreet = street;
        this.$apiHouseNumber = houseNumber;
        this.$apiCity = city;
        this.$apiZip = zip;

        this.setApiAttributesModal(firstName, lastName, street, houseNumber, zip, city)
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

    get getUserDiv(): string{
        return 'left-side';
    }

    get getApiDiv(): string{
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
}
