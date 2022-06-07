(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[34],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/popup-ui-address-validation/popup-ui-address-validation.ts":
/*!***************************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/popup-ui-address-validation/popup-ui-address-validation.ts ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PopupUiAddressValidation; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class PopupUiAddressValidation extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "$this", jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this));

    _defineProperty(this, "linkToAddressModal", void 0);

    _defineProperty(this, "closeModalBtn", void 0);

    _defineProperty(this, "submitRegistrationFormButton", void 0);

    _defineProperty(this, "cancelRegistrationFormButton", void 0);

    _defineProperty(this, "$registrationForm", void 0);

    _defineProperty(this, "$firstName", void 0);

    _defineProperty(this, "$lastName", void 0);

    _defineProperty(this, "$streetName", void 0);

    _defineProperty(this, "$houseNumber", void 0);

    _defineProperty(this, "$zip", void 0);

    _defineProperty(this, "$city", void 0);

    _defineProperty(this, "$userNameElement", void 0);

    _defineProperty(this, "$userZipCity", void 0);

    _defineProperty(this, "$userStreetHouseNo", void 0);

    _defineProperty(this, "$userSvg", void 0);

    _defineProperty(this, "$apiNameElement", void 0);

    _defineProperty(this, "$apiZipCity", void 0);

    _defineProperty(this, "$apiStreetHouseNo", void 0);

    _defineProperty(this, "$apiSvg", void 0);

    _defineProperty(this, "$userDiv", void 0);

    _defineProperty(this, "$apiDiv", void 0);

    _defineProperty(this, "$apiFirstNameValue", void 0);

    _defineProperty(this, "$apiLastNameValue", void 0);

    _defineProperty(this, "$apiStreet", void 0);

    _defineProperty(this, "$apiZip", void 0);

    _defineProperty(this, "$apiHouseNumber", void 0);

    _defineProperty(this, "$apiCity", void 0);

    _defineProperty(this, "$userFirstNameValue", void 0);

    _defineProperty(this, "$userLastNameValue", void 0);

    _defineProperty(this, "$userStreet", void 0);

    _defineProperty(this, "$userZip", void 0);

    _defineProperty(this, "$userHouseNumber", void 0);

    _defineProperty(this, "$userCity", void 0);

    _defineProperty(this, "$userCheckedCircleWrapper", void 0);

    _defineProperty(this, "$apiCheckedCircleWrapper", void 0);

    _defineProperty(this, "$apiButton", void 0);

    _defineProperty(this, "$userButton", void 0);

    _defineProperty(this, "$errorMessageSpan", void 0);

    _defineProperty(this, "$errorDivAboveSubmitButton", void 0);

    _defineProperty(this, "$globusCardNumberField", void 0);

    _defineProperty(this, "$radioButtons", void 0);

    _defineProperty(this, "hiddenMyGlobusCardNumber", void 0);

    _defineProperty(this, "hiddenMyGlobusCardType", void 0);

    _defineProperty(this, "checkboxIsAdvertise", void 0);

    _defineProperty(this, "hiddenIsMeinGlobus", void 0);

    _defineProperty(this, "$mobilePhoneNumber", void 0);

    _defineProperty(this, "$phoneNumber", void 0);

    _defineProperty(this, "$cmbDay", void 0);

    _defineProperty(this, "$cmbMonth", void 0);

    _defineProperty(this, "$cmbYear", void 0);

    _defineProperty(this, "country", void 0);

    _defineProperty(this, "ageDiff", void 0);

    _defineProperty(this, "flagRadio", void 0);

    _defineProperty(this, "registerForma", false);

    _defineProperty(this, "requiredCard", false);

    _defineProperty(this, "globalCardNumber", void 0);

    _defineProperty(this, "cardKey", 'cardNumber');

    _defineProperty(this, "isPhysicalKey", 'is_physical');

    _defineProperty(this, "arrayWithInputFieldsForRegex", void 0);
  }

  readyCallback() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.linkToAddressModal = _this.findElement(_this.getLinkToAddressModal);

      if (!_this.linkToAddressModal) {
        _this.linkToAddressModal = document.getElementsByClassName('form__action js-form-register__submit-button form__action--login button button--large button--expand-tablet')[0];

        if (_this.linkToAddressModal) {
          _this.registerForma = true;

          _this.linkToAddressModal.addEventListener("click", function (event) {
            event.preventDefault();
          }, false);
        }
      }

      _this.closeModalBtn = _this.$this.find(_this.getCloseButtonSelector);
      _this.submitRegistrationFormButton = _this.findElement(_this.getSubmitFormButton);
      _this.cancelRegistrationFormButton = _this.findElement(_this.getCancelRegisterButton);
      _this.$registrationForm = document.getElementsByName(_this.registerForm);
      _this.$firstName = _this.findElement(_this.getFirstName);
      _this.$lastName = _this.findElement(_this.getLastName);
      _this.$streetName = _this.findElement(_this.getStreet);
      _this.$houseNumber = _this.findElement(_this.getHouseNumber);
      _this.$zip = _this.findElement(_this.getZipNumber);
      _this.$city = _this.findElement(_this.getCity);
      _this.$userNameElement = _this.findElement(_this.getUserName);
      _this.$userZipCity = _this.findElement(_this.getUserZipCity);
      _this.$userStreetHouseNo = _this.findElement(_this.getUserStreetHouseNo);
      _this.$userSvg = _this.findElement(_this.getUserSvg);
      _this.$apiNameElement = _this.findElement(_this.getApiName);
      _this.$apiZipCity = _this.findElement(_this.getApiZipCity);
      _this.$apiStreetHouseNo = _this.findElement(_this.getApiStreetHouseNo);
      _this.$apiSvg = _this.findElement(_this.getApiSvg);
      _this.$userDiv = _this.findElement(_this.getUserDiv);
      _this.$apiDiv = _this.findElement(_this.getApiDiv);
      _this.$userCheckedCircleWrapper = _this.findElement(_this.getUserCircleWrapper);
      _this.$apiCheckedCircleWrapper = _this.findElement(_this.getApiCircleWrapper);
      _this.$apiButton = document.getElementById(_this.getApiButton);
      _this.$userButton = document.getElementById(_this.getUserButton);
      _this.$errorMessageSpan = document.getElementsByClassName(_this.errorMessageSpan);
      _this.$errorDivAboveSubmitButton = document.getElementById(_this.errorDivAboveSubmit);
      _this.$globusCardNumberField = _this.findElement(_this.getMyGlobusCardNumber);
      _this.$radioButtons = document.getElementsByName(_this.getRadioButtonsName);
      _this.hiddenMyGlobusCardNumber = document.querySelector('#registerForm_my_globus_card_number');
      _this.hiddenMyGlobusCardType = document.querySelector('#registerForm_isMyGloubsCardValid');
      _this.checkboxIsAdvertise = document.querySelector('#chk_isAdvertise .checkbox__input');
      _this.hiddenIsMeinGlobus = document.querySelector('#registerForm_isMeinGlobus');
      _this.$mobilePhoneNumber = document.getElementById(_this.getMobilePhoneNumber);
      _this.country = document.getElementById(_this.getCustomerCountryRegistrationForm);

      if (_this.country === undefined || _this.country === null) {
        _this.country = document.getElementById(_this.getCountryRegistrationForm);
      }

      if (!_this.$mobilePhoneNumber) {
        _this.$mobilePhoneNumber = document.getElementById(_this.getMobilePhoneNumberRegistrationForm);
      }

      _this.$phoneNumber = document.getElementById(_this.getPhoneNumber);

      if (!_this.$phoneNumber) {
        _this.$phoneNumber = document.getElementById(_this.getPhoneNumberRegistrationForm);
      }

      _this.$cmbDay = document.getElementById(_this.getDay);

      if (!_this.$cmbDay) {
        _this.$cmbDay = document.getElementById(_this.getDayRegistrationForm);
      }

      _this.$cmbMonth = document.getElementById(_this.getMonth);

      if (!_this.$cmbMonth) {
        _this.$cmbMonth = document.getElementById(_this.getMonthRegistrationForm);
      }

      _this.$cmbYear = document.getElementById(_this.getYear);

      if (!_this.$cmbYear) {
        _this.$cmbYear = document.getElementById(_this.getYearRegistrationForm);
      }

      _this.arrayWithInputFieldsForRegex = [_this.$firstName, _this.$lastName, _this.$streetName, _this.$houseNumber, _this.$city, _this.$zip, _this.$mobilePhoneNumber, _this.$phoneNumber];
      yield _this.mapEvents();
    })();
  }

  mapEvents() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (_this2.linkToAddressModal != undefined) {
        _this2.linkToAddressModal.addEventListener('click', /*#__PURE__*/_asyncToGenerator(function* () {
          if (_this2.$radioButtons[0].checked) {
            _this2.requiredCard = true;
          } else {
            _this2.requiredCard = false;
          }

          _this2.removeErrorLabels();

          _this2.emptyDivElements();

          _this2.enableApiContent();

          var fieldsChecked = yield _this2.checkIfDataIsInputed();

          if (fieldsChecked === true) {
            _this2.afterApiCall();
          }
        }));
      }

      if (_this2.closeModalBtn != undefined) {
        _this2.closeModalBtn.on('click', () => {
          _this2.closeModal();

          _this2.emptyDivElements();
        });
      }

      if (_this2.submitRegistrationFormButton != undefined) {
        _this2.submitRegistrationFormButton.addEventListener('click', () => {
          _this2.submitRegistrationForm();

          _this2.emptyDivElements();
        });
      }

      if (_this2.cancelRegistrationFormButton != undefined) {
        _this2.cancelRegistrationFormButton.addEventListener('click', () => {
          _this2.closeModal();

          _this2.emptyDivElements();
        });
      }

      if (_this2.$userButton != undefined) {
        _this2.$userButton.addEventListener('click', () => {
          _this2.clickedUserAddress();

          _this2.enableUserContent();

          _this2.disableApiContent();
        });
      }

      if (_this2.$apiButton != undefined) {
        _this2.$apiButton.addEventListener('click', () => {
          _this2.clickedApiAddress();

          _this2.enableApiContent();

          _this2.disableUserContent();
        });
      }

      if (_this2.$userDiv != undefined) {
        _this2.$userDiv.addEventListener('click', () => {
          _this2.findElement('hidShowScanAndGo').value = "0";
        });
      }

      if (_this2.$apiDiv != undefined) {
        _this2.$apiDiv.addEventListener('click', () => {
          _this2.findElement('hidShowScanAndGo').value = "1";
        });
      }
    })();
  }

  showModal() {
    this.$this.addClass(this.showClass);
  }

  closeModal() {
    this.$this.removeClass(this.showClass);
  }

  afterApiCall() {
    this.sendRequestToAddressAPI();
    this.setUserAttributesToModal();
  }

  disableUserContent() {
    this.$userCheckedCircleWrapper.classList.add(this.getDisableCircleWrapperClass);
    this.$userNameElement.classList.add(this.getDisableTextClass);
    this.$userZipCity.classList.add(this.getDisableTextClass);
    this.$userStreetHouseNo.classList.add(this.getDisableTextClass);
    this.$userButton.classList.remove(this.getSelectedDivClass);
  }

  disableApiContent() {
    this.$apiCheckedCircleWrapper.classList.add(this.getDisableCircleWrapperClass);
    this.$apiNameElement.classList.add(this.getDisableTextClass);
    this.$apiZipCity.classList.add(this.getDisableTextClass);
    this.$apiStreetHouseNo.classList.add(this.getDisableTextClass);
    this.$globusCardNumberField.classList.add(this.getDisableTextClass);
    this.$apiButton.classList.remove(this.getSelectedDivClass);
  }

  enableUserContent() {
    this.$userCheckedCircleWrapper.classList.remove(this.getDisableCircleWrapperClass);
    this.$userNameElement.classList.remove(this.getDisableTextClass);
    this.$userZipCity.classList.remove(this.getDisableTextClass);
    this.$userStreetHouseNo.classList.remove(this.getDisableTextClass);
    this.$userButton.classList.add(this.getSelectedDivClass);
  }

  enableApiContent() {
    this.$apiCheckedCircleWrapper.classList.remove(this.getDisableCircleWrapperClass);
    this.$apiNameElement.classList.remove(this.getDisableTextClass);
    this.$apiZipCity.classList.remove(this.getDisableTextClass);
    this.$apiStreetHouseNo.classList.remove(this.getDisableTextClass);
    this.$apiButton.classList.add(this.getSelectedDivClass);
  }

  clickedUserAddress() {
    var firstName = this.$userFirstNameValue;
    var lastName = this.$userLastNameValue;
    var street = this.$userStreet;
    var city = this.$userCity;
    var zip = this.$userZip;
    var houseNumber = this.$userHouseNumber;
    this.addValuesToFormElements(firstName, lastName, street, city, zip, houseNumber);
  }

  clickedApiAddress() {
    var firstName = this.$apiFirstNameValue;
    var lastName = this.$apiLastNameValue;
    var street = this.$apiStreet;
    var city = this.$apiCity;
    var zip = this.$apiZip;
    var houseNumber = this.$apiHouseNumber;
    this.addValuesToFormElements(firstName, lastName, street, city, zip, houseNumber);
  }

  addValuesToFormElements(firstName, lastName, street, city, zip, houseNumber) {
    this.$firstName.value = firstName;
    this.$lastName.value = lastName;
    this.$streetName.value = street;
    this.$city.value = city;
    this.$zip.value = zip;
    this.$houseNumber.value = houseNumber;
  }

  setUserAttributesToModal() {
    var firstName = this.$firstName;
    var lastName = this.$lastName;
    var street = this.$streetName;
    var houseNumber = this.$houseNumber;
    var zip = this.$zip;
    var city = this.$city;
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

  setApiAttributesModal(firstName, lastName, street, houseNumber, zip, city) {
    this.$apiNameElement.append(firstName + ' ' + lastName);
    this.$apiZipCity.append(zip + ' ' + city);
    this.$apiStreetHouseNo.append(street + ' ' + houseNumber);
  }

  emptyDivElements() {
    this.$userNameElement.innerHTML = '';
    this.$userZipCity.innerHTML = '';
    this.$userStreetHouseNo.innerHTML = '';
    this.$apiNameElement.innerHTML = '';
    this.$apiZipCity.innerHTML = '';
    this.$apiStreetHouseNo.innerHTML = '';
    this.$globusCardNumberField.innerHTML = '';
  }

  submitRegistrationForm() {
    this.checkoutStep('login');
    this.checkoutStep('pick-up station');
    this.$registrationForm[0].submit();
  }

  sendRequestToAddressAPI() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      var firstName = _this3.$firstName;
      var lastName = _this3.$lastName;
      var street = _this3.$streetName;
      var houseNumber = _this3.$houseNumber;
      var zip = _this3.$zip;
      var city = _this3.$city;
      var we = _this3.checkboxIsAdvertise;
      var meinGlobus = _this3.hiddenIsMeinGlobus;
      var url = '/register/customer-address-api';
      var formData = new FormData();
      formData.append('firstName', firstName.value);
      formData.append('lastName', lastName.value);
      formData.append('street', street.value);
      formData.append('houseNumber', houseNumber.value);
      formData.append('zip', zip.value);
      formData.append('city', city.value);
      formData.append('we', we.checked);
      formData.append('meinGlobus', meinGlobus.checked);
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(response => response.json()).then(parsedResponse => {
        if (parsedResponse != undefined && parsedResponse !== []) {
          if (parsedResponse.showOverlay === true) {
            _this3.addContentToModal(parsedResponse);

            _this3.showModal();
          } else {
            document.getElementById("hidShowScanAndGo").value = "2";

            _this3.emptyDivElements();

            _this3.submitRegistrationForm();
          }
        }
      }).catch(error => {});
    })();
  }

  callCardNumberCheckAPI(cardNumber) {
    return _asyncToGenerator(function* () {
      var url = '/register/check-card-number';
      var formData = new FormData();
      var dataToSend;
      formData.append('id', cardNumber);
      yield fetch(url, {
        method: 'POST',
        body: formData
      }).then(response => response.json()).then(parsedResponse => {
        if (parsedResponse != undefined && parsedResponse !== []) {
          dataToSend = parsedResponse;
          return dataToSend;
        }
      }).catch(error => {
        return 'error';
      });
      return dataToSend;
    })();
  }

  getAgeDifference() {
    var dateFromInput = new Date(this.$cmbYear.value, this.$cmbMonth.value - 1, this.$cmbDay.value);
    var sixteenYearsAgo = new Date();
    sixteenYearsAgo.setTime(sixteenYearsAgo.valueOf() - 16 * 365.25 * 24 * 60 * 60 * 1000);
    this.ageDiff = sixteenYearsAgo < dateFromInput;
  }

  checkIfDataIsInputed() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      var flag = 0;

      _this4.getAgeDifference();

      if (_this4.ageDiff) {
        _this4.$cmbYear.parentNode.classList.add('input--error-birthday');

        _this4.addErrorMessageToTheInputField(_this4.$cmbYear.parentNode.parentNode, 5);

        flag = 1;
      }

      if (_this4.$firstName.value === '' || _this4.$firstName.value === null) {
        _this4.$firstName.classList.add('input--error');

        _this4.addErrorMessageToTheInputField(_this4.$firstName);

        flag = 1;
      }

      if (_this4.$lastName.value === '' || _this4.$lastName.value === null) {
        _this4.$lastName.classList.add('input--error');

        _this4.addErrorMessageToTheInputField(_this4.$lastName);

        flag = 1;
      }

      if (_this4.$streetName.value === '' || _this4.$streetName.value === null) {
        _this4.$streetName.classList.add('input--error');

        _this4.addErrorMessageToTheInputField(_this4.$streetName);

        flag = 1;
      }

      if (_this4.$houseNumber.value === '' || _this4.$houseNumber.value === null) {
        _this4.$houseNumber.classList.add('input--error');

        _this4.addErrorMessageToTheInputField(_this4.$houseNumber);

        flag = 1;
      }

      var regexNumbers = new RegExp(/^[0-9]*$/, 'g');
      var isNumbersOnly = regexNumbers.test(_this4.$zip.value);

      if (_this4.$zip.value === '' || _this4.$zip.value === null) {
        jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()("#registerForm_customer_zip_code").parent(".form__field").children(".errorValidationMessage").remove();

        _this4.$zip.classList.add('input--error');

        flag = 1;

        _this4.addErrorMessageToTheInputField(_this4.$zip, 3);
      }

      if (_this4.$city.value === '' || _this4.$city.value === null) {
        _this4.$city.classList.add('input--error');

        _this4.addErrorMessageToTheInputField(_this4.$city);

        flag = 1;
      }

      if ((_this4.$mobilePhoneNumber.value === '' || _this4.$mobilePhoneNumber.value === null) && (_this4.$phoneNumber.value === '' || _this4.$phoneNumber.value === null)) {
        _this4.$mobilePhoneNumber.classList.add('input--error');

        _this4.addErrorMessageToTheInputField(_this4.$mobilePhoneNumber);

        _this4.$phoneNumber.classList.add('input--error');

        _this4.addErrorMessageToTheInputField(_this4.$phoneNumber);

        flag = 1;
      }

      if (_this4.country.value === '' || _this4.country.value === null) {
        _this4.country.parentNode.classList.add('input--error');

        _this4.addErrorMessageToTheInputField(_this4.country.parentNode);

        flag = 1;
      }

      var regexCheck = new RegExp(/^[^<>;"]+$/);

      _this4.arrayWithInputFieldsForRegex.forEach(item => {
        if (item.value.length > 0) {
          if (regexCheck.test(item.value) === false) {
            item.classList.add('input--error');

            _this4.addRegexErrorMessageToTheField(item);

            flag = 1;
          }
        }
      });

      if (jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(_this4.$cmbDay).val() === '' || jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(_this4.$cmbDay).val() === null || jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(_this4.$cmbMonth).val() === '' || jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(_this4.$cmbMonth).val() === null || jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(_this4.$cmbYear).val() === '' || jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(_this4.$cmbYear).val() === null) {
        if (jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(_this4.$cmbDay).val() === '') {
          _this4.$cmbDay.parentNode.classList.add('input--error-birthday');
        }

        if (jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(_this4.$cmbMonth).val() === '') {
          _this4.$cmbMonth.parentNode.classList.add('input--error-birthday');
        }

        if (jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(_this4.$cmbYear).val() === '') {
          _this4.$cmbYear.parentNode.classList.add('input--error-birthday');
        }

        _this4.addErrorMessageToTheInputField(_this4.$cmbYear.parentNode.parentNode, 3);

        flag = 1;
      }

      if (_this4.requiredCard) {
        var cardNumber = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(_this4.$globusCardNumberField).val();

        if (_this4.$globusCardNumberField.value === '' || _this4.$globusCardNumberField.value === null) {} else {
          var cardNumberAfter = yield _this4.callCardNumberCheckAPI(cardNumber);

          if (cardNumberAfter !== 'used_card_error') {
            _this4.hiddenMyGlobusCardNumber.value = cardNumberAfter[_this4.cardKey];
            _this4.hiddenMyGlobusCardType.value = cardNumberAfter[_this4.isPhysicalKey];
          } else {
            _this4.$globusCardNumberField.value = '';

            _this4.$globusCardNumberField.classList.add('input--error');

            _this4.addErrorMessageToTheInputField(_this4.$globusCardNumberField, true);

            flag = 1;
          }
        }
      } else {
        if (!_this4.$radioButtons[1].checked) {
          _this4.$radioButtons[0].parentNode.parentNode.classList.add('input--error');

          _this4.addErrorMessageToTheInputField(_this4.$radioButtons[0].parentNode.parentNode, 2);

          _this4.flagRadio = true;
          flag = 1;
        } else {
          _this4.flagRadio = false;
        }
      }

      if (flag === 0) {
        return true;
      } else {
        _this4.addErrorMessageToTheSubmitButton();

        return false;
      }
    })();
  }

  removeErrorLabels() {
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
      for (var i = 0; i < this.$errorMessageSpan.length; i++) {
        if (this.$errorMessageSpan[i].parentNode !== undefined) {
          this.$errorMessageSpan[i].classList.add('hidden');
        }
      }
    }
  } // using flags for different cases -> 0 = normal case, 1 = card_number_error, 2 = radio button error message


  addErrorMessageToTheInputField(element, flag) {
    if (flag === void 0) {
      flag = 0;
    }

    var errorSpan = document.createElement('span');
    errorSpan.setAttribute('class', 'errorValidationMessage');

    if (flag === 1) {
      errorSpan.textContent = '• Diese Kartennummer ist bereits angelegt. Bitte loggen Sie sich mit Ihrem Passwort ein.';
      jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(element).parent().append(errorSpan);
    } else if (flag === 2) {
      errorSpan.textContent = '• Mindestens eine Angabe ist Pflicht.';
      jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(element).parent().append(errorSpan);
    } else if (flag === 3) {
      errorSpan.textContent = '• Dieses Felder sollte nicht leer sein';
      errorSpan.classList.add('form__field', 'col', 'col--order-4', 'col--sm-12', 'col--md-12');
      jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(element).parent().append(errorSpan);
    } else if (flag === 4) {
      errorSpan.textContent = '• Bitte eine 5-stellige PLZ eingeben.';
      errorSpan.classList.add('form__field', 'col', 'col--order-4', 'col--sm-12', 'col--md-12');
      jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(element).parent().append(errorSpan);
    } else if (flag === 5) {
      errorSpan.textContent = '• Sie müssen mindestens 16 Jahre alt sein.';
      errorSpan.style.textAlign = "right";
      errorSpan.classList.add('form__field', 'col', 'col--order-4', 'col--sm-12', 'col--md-12');
      jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(element).parent().append(errorSpan);
    } else {
      errorSpan.textContent = '• Dieses Feld sollte nicht leer sein';
      jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(element).parent().append(errorSpan);
    }
  }

  addErrorMessageToTheSubmitButton() {
    if (this.registerForma) {
      var errorSpan = document.createElement('span');
      errorSpan.setAttribute('class', 'errorValidationMessage');
      jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(errorSpan).css('position', 'absolute');
      jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(errorSpan).css('margin-bottom', '45px');
      errorSpan.textContent = 'Bitte füllen Sie die Pflichtfelder aus.';

      if (this.registerForma == true && this.ageDiff == true && this.flagRadio == false) {
        errorSpan.textContent = '';
      }

      this.linkToAddressModal.parentNode.prepend(errorSpan);
    } else {
      this.$errorDivAboveSubmitButton.setAttribute('class', 'errorSubmitMessage');
      this.$errorDivAboveSubmitButton.textContent = 'Bitte füllen Sie die Pflichtfelder aus.';
    }
  }

  addRegexErrorMessageToTheField(element) {
    var errorSpan = document.createElement('span');
    errorSpan.setAttribute('class', 'errorValidationMessage');
    errorSpan.textContent = '• Falsch eingegebene Daten';
    errorSpan.classList.add('form__field', 'col', 'col--order-4', 'col--sm-12', 'col--md-12');
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(element).parent().append(errorSpan);
  }

  addContentToModal(data) {
    var firstName = data.result.firstName;
    var lastName = data.result.lastName;
    var zip = data.result.address.zip;
    var houseNumber = data.result.address.houseNo;
    var street = data.result.address.street;
    var city = data.result.address.city;
    this.$apiFirstNameValue = firstName;
    this.$apiLastNameValue = lastName;
    this.$apiStreet = street;
    this.$apiHouseNumber = houseNumber;
    this.$apiCity = city;
    this.$apiZip = zip;
    this.setApiAttributesModal(firstName, lastName, street, houseNumber, zip, city);
  }

  findElement(name) {
    var el = document.getElementById(name);

    if (!el) {
      name = name.replace('registerForm_customer_', 'registerForm_');
      el = document.getElementById(name);
    }

    return el;
  }

  checkoutStep(option) {
    window.dataLayer.push({
      'event': 'eec.checkout',
      'ecommerce': {
        'checkout': {
          'actionField': {
            'step': '1',
            'option': option
          }
        }
      }
    });
  }

  get getLinkToAddressModal() {
    return 'link-to-address-modal';
  }

  get getCloseButtonSelector() {
    return "." + this.name + "__close";
  }

  get showClass() {
    return this.name + "--show";
  }

  get getCancelRegisterButton() {
    return 'button-cancel-registration';
  }

  get getSubmitFormButton() {
    return 'id-submit-registration-user';
  }

  get registerForm() {
    return 'registerForm';
  }

  get getFirstName() {
    return 'registerForm_customer_first_name';
  }

  get getLastName() {
    return 'registerForm_customer_last_name';
  }

  get getStreet() {
    return 'registerForm_customer_address1';
  }

  get getHouseNumber() {
    return 'registerForm_customer_address2';
  }

  get getZipNumber() {
    return 'registerForm_customer_zip_code';
  }

  get getCity() {
    return 'registerForm_customer_city';
  }

  get getUserName() {
    return 'user_name_and_surname';
  }

  get getUserZipCity() {
    return 'user_zip_city';
  }

  get getUserStreetHouseNo() {
    return 'user_street_houseNo';
  }

  get getUserSvg() {
    return 'user_svg_icon';
  }

  get getApiName() {
    return 'api_name_and_surname';
  }

  get getApiZipCity() {
    return 'api_zip_city';
  }

  get getApiStreetHouseNo() {
    return 'api_street_houseNo';
  }

  get getApiSvg() {
    return 'api_svg_icon';
  }

  get getApiDiv() {
    return 'left-side';
  }

  get getUserDiv() {
    return 'right-side';
  }

  get getUserCircleWrapper() {
    return 'user_circle_class';
  }

  get getApiCircleWrapper() {
    return 'api_circle_class';
  }

  get getDisableCircleWrapperClass() {
    return 'popup-ui-address-validation__disabledCircle';
  }

  get getDisableTextClass() {
    return 'popup-ui-address-validation__disabledText';
  }

  get getSelectedDivClass() {
    return 'selected-div';
  }

  get getApiButton() {
    return 'api_button_content';
  }

  get getUserButton() {
    return 'user_button_content';
  }

  get errorMessageSpan() {
    return 'errorValidationMessage';
  }

  get errorDivAboveSubmit() {
    return 'errorMessageAboveSubmitButton';
  }

  get getMyGlobusCardNumber() {
    return 'myGlobusCardNumber';
  }

  get getRadioButtonsName() {
    return 'radio_kundenkarte';
  }

  get getMobilePhoneNumber() {
    return 'registerForm_customer_mobile_phone_number';
  }

  get getMobilePhoneNumberRegistrationForm() {
    return 'registerForm_mobile_phone_number';
  }

  get getPhoneNumber() {
    return 'registerForm_customer_phone';
  }

  get getPhoneNumberRegistrationForm() {
    return 'registerForm_phone';
  }

  get getDay() {
    return 'registerForm_customer_birth_day';
  }

  get getDayRegistrationForm() {
    return 'registerForm_birth_day';
  }

  get getMonth() {
    return 'registerForm_customer_birth_month';
  }

  get getMonthRegistrationForm() {
    return 'registerForm_birth_month';
  }

  get getYear() {
    return 'registerForm_customer_birth_year';
  }

  get getYearRegistrationForm() {
    return 'registerForm_birth_year';
  }

  get getCustomerCountryRegistrationForm() {
    return 'registerForm_customer_country';
  }

  get getCountryRegistrationForm() {
    return 'registerForm_country';
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcG9wdXAtdWktYWRkcmVzcy12YWxpZGF0aW9uL3BvcHVwLXVpLWFkZHJlc3MtdmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6WyJQb3B1cFVpQWRkcmVzc1ZhbGlkYXRpb24iLCJDb21wb25lbnQiLCIkIiwicmVhZHlDYWxsYmFjayIsImxpbmtUb0FkZHJlc3NNb2RhbCIsImZpbmRFbGVtZW50IiwiZ2V0TGlua1RvQWRkcmVzc01vZGFsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwicmVnaXN0ZXJGb3JtYSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY2xvc2VNb2RhbEJ0biIsIiR0aGlzIiwiZmluZCIsImdldENsb3NlQnV0dG9uU2VsZWN0b3IiLCJzdWJtaXRSZWdpc3RyYXRpb25Gb3JtQnV0dG9uIiwiZ2V0U3VibWl0Rm9ybUJ1dHRvbiIsImNhbmNlbFJlZ2lzdHJhdGlvbkZvcm1CdXR0b24iLCJnZXRDYW5jZWxSZWdpc3RlckJ1dHRvbiIsIiRyZWdpc3RyYXRpb25Gb3JtIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJyZWdpc3RlckZvcm0iLCIkZmlyc3ROYW1lIiwiZ2V0Rmlyc3ROYW1lIiwiJGxhc3ROYW1lIiwiZ2V0TGFzdE5hbWUiLCIkc3RyZWV0TmFtZSIsImdldFN0cmVldCIsIiRob3VzZU51bWJlciIsImdldEhvdXNlTnVtYmVyIiwiJHppcCIsImdldFppcE51bWJlciIsIiRjaXR5IiwiZ2V0Q2l0eSIsIiR1c2VyTmFtZUVsZW1lbnQiLCJnZXRVc2VyTmFtZSIsIiR1c2VyWmlwQ2l0eSIsImdldFVzZXJaaXBDaXR5IiwiJHVzZXJTdHJlZXRIb3VzZU5vIiwiZ2V0VXNlclN0cmVldEhvdXNlTm8iLCIkdXNlclN2ZyIsImdldFVzZXJTdmciLCIkYXBpTmFtZUVsZW1lbnQiLCJnZXRBcGlOYW1lIiwiJGFwaVppcENpdHkiLCJnZXRBcGlaaXBDaXR5IiwiJGFwaVN0cmVldEhvdXNlTm8iLCJnZXRBcGlTdHJlZXRIb3VzZU5vIiwiJGFwaVN2ZyIsImdldEFwaVN2ZyIsIiR1c2VyRGl2IiwiZ2V0VXNlckRpdiIsIiRhcGlEaXYiLCJnZXRBcGlEaXYiLCIkdXNlckNoZWNrZWRDaXJjbGVXcmFwcGVyIiwiZ2V0VXNlckNpcmNsZVdyYXBwZXIiLCIkYXBpQ2hlY2tlZENpcmNsZVdyYXBwZXIiLCJnZXRBcGlDaXJjbGVXcmFwcGVyIiwiJGFwaUJ1dHRvbiIsImdldEVsZW1lbnRCeUlkIiwiZ2V0QXBpQnV0dG9uIiwiJHVzZXJCdXR0b24iLCJnZXRVc2VyQnV0dG9uIiwiJGVycm9yTWVzc2FnZVNwYW4iLCJlcnJvck1lc3NhZ2VTcGFuIiwiJGVycm9yRGl2QWJvdmVTdWJtaXRCdXR0b24iLCJlcnJvckRpdkFib3ZlU3VibWl0IiwiJGdsb2J1c0NhcmROdW1iZXJGaWVsZCIsImdldE15R2xvYnVzQ2FyZE51bWJlciIsIiRyYWRpb0J1dHRvbnMiLCJnZXRSYWRpb0J1dHRvbnNOYW1lIiwiaGlkZGVuTXlHbG9idXNDYXJkTnVtYmVyIiwicXVlcnlTZWxlY3RvciIsImhpZGRlbk15R2xvYnVzQ2FyZFR5cGUiLCJjaGVja2JveElzQWR2ZXJ0aXNlIiwiaGlkZGVuSXNNZWluR2xvYnVzIiwiJG1vYmlsZVBob25lTnVtYmVyIiwiZ2V0TW9iaWxlUGhvbmVOdW1iZXIiLCJjb3VudHJ5IiwiZ2V0Q3VzdG9tZXJDb3VudHJ5UmVnaXN0cmF0aW9uRm9ybSIsInVuZGVmaW5lZCIsImdldENvdW50cnlSZWdpc3RyYXRpb25Gb3JtIiwiZ2V0TW9iaWxlUGhvbmVOdW1iZXJSZWdpc3RyYXRpb25Gb3JtIiwiJHBob25lTnVtYmVyIiwiZ2V0UGhvbmVOdW1iZXIiLCJnZXRQaG9uZU51bWJlclJlZ2lzdHJhdGlvbkZvcm0iLCIkY21iRGF5IiwiZ2V0RGF5IiwiZ2V0RGF5UmVnaXN0cmF0aW9uRm9ybSIsIiRjbWJNb250aCIsImdldE1vbnRoIiwiZ2V0TW9udGhSZWdpc3RyYXRpb25Gb3JtIiwiJGNtYlllYXIiLCJnZXRZZWFyIiwiZ2V0WWVhclJlZ2lzdHJhdGlvbkZvcm0iLCJhcnJheVdpdGhJbnB1dEZpZWxkc0ZvclJlZ2V4IiwibWFwRXZlbnRzIiwiY2hlY2tlZCIsInJlcXVpcmVkQ2FyZCIsInJlbW92ZUVycm9yTGFiZWxzIiwiZW1wdHlEaXZFbGVtZW50cyIsImVuYWJsZUFwaUNvbnRlbnQiLCJmaWVsZHNDaGVja2VkIiwiY2hlY2tJZkRhdGFJc0lucHV0ZWQiLCJhZnRlckFwaUNhbGwiLCJvbiIsImNsb3NlTW9kYWwiLCJzdWJtaXRSZWdpc3RyYXRpb25Gb3JtIiwiY2xpY2tlZFVzZXJBZGRyZXNzIiwiZW5hYmxlVXNlckNvbnRlbnQiLCJkaXNhYmxlQXBpQ29udGVudCIsImNsaWNrZWRBcGlBZGRyZXNzIiwiZGlzYWJsZVVzZXJDb250ZW50IiwidmFsdWUiLCJzaG93TW9kYWwiLCJhZGRDbGFzcyIsInNob3dDbGFzcyIsInJlbW92ZUNsYXNzIiwic2VuZFJlcXVlc3RUb0FkZHJlc3NBUEkiLCJzZXRVc2VyQXR0cmlidXRlc1RvTW9kYWwiLCJjbGFzc0xpc3QiLCJhZGQiLCJnZXREaXNhYmxlQ2lyY2xlV3JhcHBlckNsYXNzIiwiZ2V0RGlzYWJsZVRleHRDbGFzcyIsInJlbW92ZSIsImdldFNlbGVjdGVkRGl2Q2xhc3MiLCJmaXJzdE5hbWUiLCIkdXNlckZpcnN0TmFtZVZhbHVlIiwibGFzdE5hbWUiLCIkdXNlckxhc3ROYW1lVmFsdWUiLCJzdHJlZXQiLCIkdXNlclN0cmVldCIsImNpdHkiLCIkdXNlckNpdHkiLCJ6aXAiLCIkdXNlclppcCIsImhvdXNlTnVtYmVyIiwiJHVzZXJIb3VzZU51bWJlciIsImFkZFZhbHVlc1RvRm9ybUVsZW1lbnRzIiwiJGFwaUZpcnN0TmFtZVZhbHVlIiwiJGFwaUxhc3ROYW1lVmFsdWUiLCIkYXBpU3RyZWV0IiwiJGFwaUNpdHkiLCIkYXBpWmlwIiwiJGFwaUhvdXNlTnVtYmVyIiwiYXBwZW5kIiwic2V0QXBpQXR0cmlidXRlc01vZGFsIiwiaW5uZXJIVE1MIiwiY2hlY2tvdXRTdGVwIiwic3VibWl0Iiwid2UiLCJtZWluR2xvYnVzIiwidXJsIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJwYXJzZWRSZXNwb25zZSIsInNob3dPdmVybGF5IiwiYWRkQ29udGVudFRvTW9kYWwiLCJjYXRjaCIsImVycm9yIiwiY2FsbENhcmROdW1iZXJDaGVja0FQSSIsImNhcmROdW1iZXIiLCJkYXRhVG9TZW5kIiwiZ2V0QWdlRGlmZmVyZW5jZSIsImRhdGVGcm9tSW5wdXQiLCJEYXRlIiwic2l4dGVlblllYXJzQWdvIiwic2V0VGltZSIsInZhbHVlT2YiLCJhZ2VEaWZmIiwiZmxhZyIsInBhcmVudE5vZGUiLCJhZGRFcnJvck1lc3NhZ2VUb1RoZUlucHV0RmllbGQiLCJyZWdleE51bWJlcnMiLCJSZWdFeHAiLCJpc051bWJlcnNPbmx5IiwidGVzdCIsInBhcmVudCIsImNoaWxkcmVuIiwicmVnZXhDaGVjayIsImZvckVhY2giLCJpdGVtIiwibGVuZ3RoIiwiYWRkUmVnZXhFcnJvck1lc3NhZ2VUb1RoZUZpZWxkIiwidmFsIiwiY2FyZE51bWJlckFmdGVyIiwiY2FyZEtleSIsImlzUGh5c2ljYWxLZXkiLCJmbGFnUmFkaW8iLCJhZGRFcnJvck1lc3NhZ2VUb1RoZVN1Ym1pdEJ1dHRvbiIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiaSIsImVsZW1lbnQiLCJlcnJvclNwYW4iLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJ0ZXh0QWxpZ24iLCJjc3MiLCJwcmVwZW5kIiwiZGF0YSIsInJlc3VsdCIsImFkZHJlc3MiLCJob3VzZU5vIiwibmFtZSIsImVsIiwicmVwbGFjZSIsIm9wdGlvbiIsIndpbmRvdyIsImRhdGFMYXllciIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7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QUosR0FBaUQ7QUFDN0MsV0FBTywrQkFBUDtBQUNIOztBQUVELE1BQUlFLDBCQUFKLEdBQXlDO0FBQ3JDLFdBQU8sc0JBQVA7QUFDSDs7QUEzMUIwRCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjM0LmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5L2Rpc3QvanF1ZXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBVaUFkZHJlc3NWYWxpZGF0aW9uIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHByb3RlY3RlZCAkdGhpczogJCA9ICQodGhpcyk7XG4gICAgcHJvdGVjdGVkIGxpbmtUb0FkZHJlc3NNb2RhbDtcbiAgICBwcm90ZWN0ZWQgY2xvc2VNb2RhbEJ0bjtcbiAgICBwcm90ZWN0ZWQgc3VibWl0UmVnaXN0cmF0aW9uRm9ybUJ1dHRvbjtcbiAgICBwcm90ZWN0ZWQgY2FuY2VsUmVnaXN0cmF0aW9uRm9ybUJ1dHRvbjtcbiAgICBwcm90ZWN0ZWQgJHJlZ2lzdHJhdGlvbkZvcm07XG4gICAgcHJvdGVjdGVkICRmaXJzdE5hbWU7XG4gICAgcHJvdGVjdGVkICRsYXN0TmFtZTtcbiAgICBwcm90ZWN0ZWQgJHN0cmVldE5hbWU7XG4gICAgcHJvdGVjdGVkICRob3VzZU51bWJlcjtcbiAgICBwcm90ZWN0ZWQgJHppcDtcbiAgICBwcm90ZWN0ZWQgJGNpdHk7XG4gICAgcHJvdGVjdGVkICR1c2VyTmFtZUVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkICR1c2VyWmlwQ2l0eTtcbiAgICBwcm90ZWN0ZWQgJHVzZXJTdHJlZXRIb3VzZU5vO1xuICAgIHByb3RlY3RlZCAkdXNlclN2ZztcbiAgICBwcm90ZWN0ZWQgJGFwaU5hbWVFbGVtZW50O1xuICAgIHByb3RlY3RlZCAkYXBpWmlwQ2l0eTtcbiAgICBwcm90ZWN0ZWQgJGFwaVN0cmVldEhvdXNlTm87XG4gICAgcHJvdGVjdGVkICRhcGlTdmc7XG4gICAgcHJvdGVjdGVkICR1c2VyRGl2O1xuICAgIHByb3RlY3RlZCAkYXBpRGl2O1xuICAgIHByb3RlY3RlZCAkYXBpRmlyc3ROYW1lVmFsdWU7XG4gICAgcHJvdGVjdGVkICRhcGlMYXN0TmFtZVZhbHVlO1xuICAgIHByb3RlY3RlZCAkYXBpU3RyZWV0O1xuICAgIHByb3RlY3RlZCAkYXBpWmlwO1xuICAgIHByb3RlY3RlZCAkYXBpSG91c2VOdW1iZXI7XG4gICAgcHJvdGVjdGVkICRhcGlDaXR5O1xuICAgIHByb3RlY3RlZCAkdXNlckZpcnN0TmFtZVZhbHVlO1xuICAgIHByb3RlY3RlZCAkdXNlckxhc3ROYW1lVmFsdWU7XG4gICAgcHJvdGVjdGVkICR1c2VyU3RyZWV0O1xuICAgIHByb3RlY3RlZCAkdXNlclppcDtcbiAgICBwcm90ZWN0ZWQgJHVzZXJIb3VzZU51bWJlcjtcbiAgICBwcm90ZWN0ZWQgJHVzZXJDaXR5O1xuICAgIHByb3RlY3RlZCAkdXNlckNoZWNrZWRDaXJjbGVXcmFwcGVyO1xuICAgIHByb3RlY3RlZCAkYXBpQ2hlY2tlZENpcmNsZVdyYXBwZXI7XG4gICAgcHJvdGVjdGVkICRhcGlCdXR0b247XG4gICAgcHJvdGVjdGVkICR1c2VyQnV0dG9uO1xuICAgIHByb3RlY3RlZCAkZXJyb3JNZXNzYWdlU3BhbjtcbiAgICBwcm90ZWN0ZWQgJGVycm9yRGl2QWJvdmVTdWJtaXRCdXR0b247XG4gICAgcHJvdGVjdGVkICRnbG9idXNDYXJkTnVtYmVyRmllbGQ7XG4gICAgcHJvdGVjdGVkICRyYWRpb0J1dHRvbnM7XG4gICAgcHJvdGVjdGVkIGhpZGRlbk15R2xvYnVzQ2FyZE51bWJlcjtcbiAgICBwcm90ZWN0ZWQgaGlkZGVuTXlHbG9idXNDYXJkVHlwZTtcbiAgICBwcm90ZWN0ZWQgY2hlY2tib3hJc0FkdmVydGlzZTtcbiAgICBwcm90ZWN0ZWQgaGlkZGVuSXNNZWluR2xvYnVzO1xuICAgIHByb3RlY3RlZCAkbW9iaWxlUGhvbmVOdW1iZXI7XG4gICAgcHJvdGVjdGVkICRwaG9uZU51bWJlcjtcbiAgICBwcm90ZWN0ZWQgJGNtYkRheTtcbiAgICBwcm90ZWN0ZWQgJGNtYk1vbnRoO1xuICAgIHByb3RlY3RlZCAkY21iWWVhcjtcbiAgICBwcm90ZWN0ZWQgY291bnRyeTtcblxuICAgIHByb3RlY3RlZCBhZ2VEaWZmO1xuICAgIHByb3RlY3RlZCBmbGFnUmFkaW87XG4gICAgcHJvdGVjdGVkIHJlZ2lzdGVyRm9ybWEgPSBmYWxzZTtcbiAgICBwcm90ZWN0ZWQgcmVxdWlyZWRDYXJkID0gZmFsc2U7XG4gICAgcHJvdGVjdGVkIGdsb2JhbENhcmROdW1iZXI7XG5cbiAgICBwcm90ZWN0ZWQgY2FyZEtleSA9ICdjYXJkTnVtYmVyJztcbiAgICBwcm90ZWN0ZWQgaXNQaHlzaWNhbEtleSA9ICdpc19waHlzaWNhbCc7XG5cbiAgICBwcm90ZWN0ZWQgYXJyYXlXaXRoSW5wdXRGaWVsZHNGb3JSZWdleDogSFRNTElucHV0RWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIGFzeW5jIHJlYWR5Q2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMubGlua1RvQWRkcmVzc01vZGFsID0gdGhpcy5maW5kRWxlbWVudCh0aGlzLmdldExpbmtUb0FkZHJlc3NNb2RhbCk7XG4gICAgICAgIGlmICghdGhpcy5saW5rVG9BZGRyZXNzTW9kYWwpIHtcbiAgICAgICAgICAgIHRoaXMubGlua1RvQWRkcmVzc01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZm9ybV9fYWN0aW9uIGpzLWZvcm0tcmVnaXN0ZXJfX3N1Ym1pdC1idXR0b24gZm9ybV9fYWN0aW9uLS1sb2dpbiBidXR0b24gYnV0dG9uLS1sYXJnZSBidXR0b24tLWV4cGFuZC10YWJsZXQnKVswXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmxpbmtUb0FkZHJlc3NNb2RhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJGb3JtYSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5rVG9BZGRyZXNzTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbEJ0biA9IHRoaXMuJHRoaXMuZmluZCh0aGlzLmdldENsb3NlQnV0dG9uU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLnN1Ym1pdFJlZ2lzdHJhdGlvbkZvcm1CdXR0b24gPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0U3VibWl0Rm9ybUJ1dHRvbik7XG4gICAgICAgIHRoaXMuY2FuY2VsUmVnaXN0cmF0aW9uRm9ybUJ1dHRvbiA9IHRoaXMuZmluZEVsZW1lbnQodGhpcy5nZXRDYW5jZWxSZWdpc3RlckJ1dHRvbik7XG4gICAgICAgIHRoaXMuJHJlZ2lzdHJhdGlvbkZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSh0aGlzLnJlZ2lzdGVyRm9ybSk7XG4gICAgICAgIHRoaXMuJGZpcnN0TmFtZSA9IHRoaXMuZmluZEVsZW1lbnQodGhpcy5nZXRGaXJzdE5hbWUpO1xuICAgICAgICB0aGlzLiRsYXN0TmFtZSA9IHRoaXMuZmluZEVsZW1lbnQodGhpcy5nZXRMYXN0TmFtZSk7XG4gICAgICAgIHRoaXMuJHN0cmVldE5hbWUgPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0U3RyZWV0KTtcbiAgICAgICAgdGhpcy4kaG91c2VOdW1iZXIgPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0SG91c2VOdW1iZXIpO1xuICAgICAgICB0aGlzLiR6aXAgPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0WmlwTnVtYmVyKTtcbiAgICAgICAgdGhpcy4kY2l0eSA9IHRoaXMuZmluZEVsZW1lbnQodGhpcy5nZXRDaXR5KTtcbiAgICAgICAgdGhpcy4kdXNlck5hbWVFbGVtZW50ID0gdGhpcy5maW5kRWxlbWVudCh0aGlzLmdldFVzZXJOYW1lKTtcbiAgICAgICAgdGhpcy4kdXNlclppcENpdHkgPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0VXNlclppcENpdHkpO1xuICAgICAgICB0aGlzLiR1c2VyU3RyZWV0SG91c2VObyA9IHRoaXMuZmluZEVsZW1lbnQodGhpcy5nZXRVc2VyU3RyZWV0SG91c2VObyk7XG4gICAgICAgIHRoaXMuJHVzZXJTdmcgPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0VXNlclN2Zyk7XG4gICAgICAgIHRoaXMuJGFwaU5hbWVFbGVtZW50ID0gdGhpcy5maW5kRWxlbWVudCh0aGlzLmdldEFwaU5hbWUpO1xuICAgICAgICB0aGlzLiRhcGlaaXBDaXR5ID0gdGhpcy5maW5kRWxlbWVudCh0aGlzLmdldEFwaVppcENpdHkpO1xuICAgICAgICB0aGlzLiRhcGlTdHJlZXRIb3VzZU5vID0gdGhpcy5maW5kRWxlbWVudCh0aGlzLmdldEFwaVN0cmVldEhvdXNlTm8pO1xuICAgICAgICB0aGlzLiRhcGlTdmcgPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0QXBpU3ZnKTtcbiAgICAgICAgdGhpcy4kdXNlckRpdiA9IHRoaXMuZmluZEVsZW1lbnQodGhpcy5nZXRVc2VyRGl2KTtcbiAgICAgICAgdGhpcy4kYXBpRGl2ID0gdGhpcy5maW5kRWxlbWVudCh0aGlzLmdldEFwaURpdik7XG4gICAgICAgIHRoaXMuJHVzZXJDaGVja2VkQ2lyY2xlV3JhcHBlciA9IHRoaXMuZmluZEVsZW1lbnQodGhpcy5nZXRVc2VyQ2lyY2xlV3JhcHBlcik7XG4gICAgICAgIHRoaXMuJGFwaUNoZWNrZWRDaXJjbGVXcmFwcGVyID0gdGhpcy5maW5kRWxlbWVudCh0aGlzLmdldEFwaUNpcmNsZVdyYXBwZXIpO1xuICAgICAgICB0aGlzLiRhcGlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldEFwaUJ1dHRvbik7XG4gICAgICAgIHRoaXMuJHVzZXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldFVzZXJCdXR0b24pO1xuXG4gICAgICAgIHRoaXMuJGVycm9yTWVzc2FnZVNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZXJyb3JNZXNzYWdlU3Bhbik7XG4gICAgICAgIHRoaXMuJGVycm9yRGl2QWJvdmVTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmVycm9yRGl2QWJvdmVTdWJtaXQpO1xuICAgICAgICB0aGlzLiRnbG9idXNDYXJkTnVtYmVyRmllbGQgPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0TXlHbG9idXNDYXJkTnVtYmVyKTtcbiAgICAgICAgdGhpcy4kcmFkaW9CdXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUodGhpcy5nZXRSYWRpb0J1dHRvbnNOYW1lKTtcbiAgICAgICAgdGhpcy5oaWRkZW5NeUdsb2J1c0NhcmROdW1iZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVnaXN0ZXJGb3JtX215X2dsb2J1c19jYXJkX251bWJlcicpO1xuICAgICAgICB0aGlzLmhpZGRlbk15R2xvYnVzQ2FyZFR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVnaXN0ZXJGb3JtX2lzTXlHbG91YnNDYXJkVmFsaWQnKTtcbiAgICAgICAgdGhpcy5jaGVja2JveElzQWR2ZXJ0aXNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Noa19pc0FkdmVydGlzZSAuY2hlY2tib3hfX2lucHV0Jyk7XG4gICAgICAgIHRoaXMuaGlkZGVuSXNNZWluR2xvYnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JlZ2lzdGVyRm9ybV9pc01laW5HbG9idXMnKTtcbiAgICAgICAgdGhpcy4kbW9iaWxlUGhvbmVOdW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldE1vYmlsZVBob25lTnVtYmVyKTtcbiAgICAgICAgdGhpcy5jb3VudHJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRDdXN0b21lckNvdW50cnlSZWdpc3RyYXRpb25Gb3JtKTtcbiAgICAgICAgaWYgKHRoaXMuY291bnRyeSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY291bnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jb3VudHJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRDb3VudHJ5UmVnaXN0cmF0aW9uRm9ybSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLiRtb2JpbGVQaG9uZU51bWJlcikge1xuICAgICAgICAgICAgdGhpcy4kbW9iaWxlUGhvbmVOdW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldE1vYmlsZVBob25lTnVtYmVyUmVnaXN0cmF0aW9uRm9ybSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kcGhvbmVOdW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldFBob25lTnVtYmVyKTtcbiAgICAgICAgaWYgKCF0aGlzLiRwaG9uZU51bWJlcikge1xuICAgICAgICAgICAgdGhpcy4kcGhvbmVOdW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldFBob25lTnVtYmVyUmVnaXN0cmF0aW9uRm9ybSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kY21iRGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXREYXkpO1xuICAgICAgICBpZiAoIXRoaXMuJGNtYkRheSkge1xuICAgICAgICAgICAgdGhpcy4kY21iRGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXREYXlSZWdpc3RyYXRpb25Gb3JtKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRjbWJNb250aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0TW9udGgpO1xuICAgICAgICBpZiAoIXRoaXMuJGNtYk1vbnRoKSB7XG4gICAgICAgICAgICB0aGlzLiRjbWJNb250aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0TW9udGhSZWdpc3RyYXRpb25Gb3JtKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRjbWJZZWFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRZZWFyKTtcbiAgICAgICAgaWYgKCF0aGlzLiRjbWJZZWFyKSB7XG4gICAgICAgICAgICB0aGlzLiRjbWJZZWFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRZZWFyUmVnaXN0cmF0aW9uRm9ybSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFycmF5V2l0aElucHV0RmllbGRzRm9yUmVnZXggPSBbdGhpcy4kZmlyc3ROYW1lLCB0aGlzLiRsYXN0TmFtZSwgdGhpcy4kc3RyZWV0TmFtZSwgdGhpcy4kaG91c2VOdW1iZXIsIHRoaXMuJGNpdHksIHRoaXMuJHppcCwgdGhpcy4kbW9iaWxlUGhvbmVOdW1iZXIsIHRoaXMuJHBob25lTnVtYmVyXTtcblxuICAgICAgICBhd2FpdCB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBtYXBFdmVudHMoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMubGlua1RvQWRkcmVzc01vZGFsICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICB0aGlzLmxpbmtUb0FkZHJlc3NNb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJHJhZGlvQnV0dG9uc1swXS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWlyZWRDYXJkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVpcmVkQ2FyZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXJyb3JMYWJlbHMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtcHR5RGl2RWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZUFwaUNvbnRlbnQoKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkc0NoZWNrZWQgPSBhd2FpdCB0aGlzLmNoZWNrSWZEYXRhSXNJbnB1dGVkKCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkc0NoZWNrZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZnRlckFwaUNhbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNsb3NlTW9kYWxCdG4gIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VNb2RhbEJ0bi5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbXB0eURpdkVsZW1lbnRzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN1Ym1pdFJlZ2lzdHJhdGlvbkZvcm1CdXR0b24gIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHRoaXMuc3VibWl0UmVnaXN0cmF0aW9uRm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdFJlZ2lzdHJhdGlvbkZvcm0oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtcHR5RGl2RWxlbWVudHMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FuY2VsUmVnaXN0cmF0aW9uRm9ybUJ1dHRvbiAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxSZWdpc3RyYXRpb25Gb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VNb2RhbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1wdHlEaXZFbGVtZW50cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLiR1c2VyQnV0dG9uICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICB0aGlzLiR1c2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZFVzZXJBZGRyZXNzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVVc2VyQ29udGVudCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZUFwaUNvbnRlbnQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy4kYXBpQnV0dG9uICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICB0aGlzLiRhcGlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkQXBpQWRkcmVzcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlQXBpQ29udGVudCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZVVzZXJDb250ZW50KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuJHVzZXJEaXYgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLiR1c2VyRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICB0aGlzLmZpbmRFbGVtZW50KCdoaWRTaG93U2NhbkFuZEdvJykudmFsdWUgPSBcIjBcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy4kYXBpRGl2ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy4kYXBpRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluZEVsZW1lbnQoJ2hpZFNob3dTY2FuQW5kR28nKS52YWx1ZSA9IFwiMVwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hvd01vZGFsKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuJHRoaXMuYWRkQ2xhc3ModGhpcy5zaG93Q2xhc3MpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbG9zZU1vZGFsKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuJHRoaXMucmVtb3ZlQ2xhc3ModGhpcy5zaG93Q2xhc3MpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZnRlckFwaUNhbGwoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zZW5kUmVxdWVzdFRvQWRkcmVzc0FQSSgpO1xuICAgICAgICB0aGlzLnNldFVzZXJBdHRyaWJ1dGVzVG9Nb2RhbCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkaXNhYmxlVXNlckNvbnRlbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuJHVzZXJDaGVja2VkQ2lyY2xlV3JhcHBlci5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0RGlzYWJsZUNpcmNsZVdyYXBwZXJDbGFzcyk7XG4gICAgICAgIHRoaXMuJHVzZXJOYW1lRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0RGlzYWJsZVRleHRDbGFzcyk7XG4gICAgICAgIHRoaXMuJHVzZXJaaXBDaXR5LmNsYXNzTGlzdC5hZGQodGhpcy5nZXREaXNhYmxlVGV4dENsYXNzKTtcbiAgICAgICAgdGhpcy4kdXNlclN0cmVldEhvdXNlTm8uY2xhc3NMaXN0LmFkZCh0aGlzLmdldERpc2FibGVUZXh0Q2xhc3MpO1xuXG4gICAgICAgIHRoaXMuJHVzZXJCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldFNlbGVjdGVkRGl2Q2xhc3MpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkaXNhYmxlQXBpQ29udGVudCgpOiB2b2lke1xuICAgICAgICB0aGlzLiRhcGlDaGVja2VkQ2lyY2xlV3JhcHBlci5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0RGlzYWJsZUNpcmNsZVdyYXBwZXJDbGFzcyk7XG4gICAgICAgIHRoaXMuJGFwaU5hbWVFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5nZXREaXNhYmxlVGV4dENsYXNzKTtcbiAgICAgICAgdGhpcy4kYXBpWmlwQ2l0eS5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0RGlzYWJsZVRleHRDbGFzcyk7XG4gICAgICAgIHRoaXMuJGFwaVN0cmVldEhvdXNlTm8uY2xhc3NMaXN0LmFkZCh0aGlzLmdldERpc2FibGVUZXh0Q2xhc3MpO1xuICAgICAgICB0aGlzLiRnbG9idXNDYXJkTnVtYmVyRmllbGQuY2xhc3NMaXN0LmFkZCh0aGlzLmdldERpc2FibGVUZXh0Q2xhc3MpO1xuXG4gICAgICAgIHRoaXMuJGFwaUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0U2VsZWN0ZWREaXZDbGFzcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGVuYWJsZVVzZXJDb250ZW50KCk6IHZvaWR7XG4gICAgICAgIHRoaXMuJHVzZXJDaGVja2VkQ2lyY2xlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0RGlzYWJsZUNpcmNsZVdyYXBwZXJDbGFzcyk7XG4gICAgICAgIHRoaXMuJHVzZXJOYW1lRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0RGlzYWJsZVRleHRDbGFzcyk7XG4gICAgICAgIHRoaXMuJHVzZXJaaXBDaXR5LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXREaXNhYmxlVGV4dENsYXNzKTtcbiAgICAgICAgdGhpcy4kdXNlclN0cmVldEhvdXNlTm8uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldERpc2FibGVUZXh0Q2xhc3MpO1xuXG4gICAgICAgIHRoaXMuJHVzZXJCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLmdldFNlbGVjdGVkRGl2Q2xhc3MpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBlbmFibGVBcGlDb250ZW50KCk6IHZvaWR7XG4gICAgICAgIHRoaXMuJGFwaUNoZWNrZWRDaXJjbGVXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXREaXNhYmxlQ2lyY2xlV3JhcHBlckNsYXNzKTtcbiAgICAgICAgdGhpcy4kYXBpTmFtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldERpc2FibGVUZXh0Q2xhc3MpO1xuICAgICAgICB0aGlzLiRhcGlaaXBDaXR5LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXREaXNhYmxlVGV4dENsYXNzKTtcbiAgICAgICAgdGhpcy4kYXBpU3RyZWV0SG91c2VOby5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0RGlzYWJsZVRleHRDbGFzcyk7XG5cbiAgICAgICAgdGhpcy4kYXBpQnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRTZWxlY3RlZERpdkNsYXNzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2xpY2tlZFVzZXJBZGRyZXNzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmaXJzdE5hbWUgPSB0aGlzLiR1c2VyRmlyc3ROYW1lVmFsdWU7XG4gICAgICAgIGNvbnN0IGxhc3ROYW1lID0gdGhpcy4kdXNlckxhc3ROYW1lVmFsdWU7XG4gICAgICAgIGNvbnN0IHN0cmVldCA9IHRoaXMuJHVzZXJTdHJlZXQ7XG4gICAgICAgIGNvbnN0IGNpdHkgPSB0aGlzLiR1c2VyQ2l0eTtcbiAgICAgICAgY29uc3QgemlwID0gdGhpcy4kdXNlclppcDtcbiAgICAgICAgY29uc3QgaG91c2VOdW1iZXIgPSB0aGlzLiR1c2VySG91c2VOdW1iZXI7XG4gICAgICAgIHRoaXMuYWRkVmFsdWVzVG9Gb3JtRWxlbWVudHMoZmlyc3ROYW1lLCBsYXN0TmFtZSwgc3RyZWV0LCBjaXR5LCB6aXAsIGhvdXNlTnVtYmVyKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2xpY2tlZEFwaUFkZHJlc3MoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IHRoaXMuJGFwaUZpcnN0TmFtZVZhbHVlO1xuICAgICAgICBjb25zdCBsYXN0TmFtZSA9IHRoaXMuJGFwaUxhc3ROYW1lVmFsdWU7XG4gICAgICAgIGNvbnN0IHN0cmVldCA9IHRoaXMuJGFwaVN0cmVldDtcbiAgICAgICAgY29uc3QgY2l0eSA9IHRoaXMuJGFwaUNpdHk7XG4gICAgICAgIGNvbnN0IHppcCA9IHRoaXMuJGFwaVppcDtcbiAgICAgICAgY29uc3QgaG91c2VOdW1iZXIgPSB0aGlzLiRhcGlIb3VzZU51bWJlcjtcbiAgICAgICAgdGhpcy5hZGRWYWx1ZXNUb0Zvcm1FbGVtZW50cyhmaXJzdE5hbWUsIGxhc3ROYW1lLCBzdHJlZXQsIGNpdHksIHppcCwgaG91c2VOdW1iZXIpO1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFkZFZhbHVlc1RvRm9ybUVsZW1lbnRzKGZpcnN0TmFtZSwgbGFzdE5hbWUsIHN0cmVldCwgY2l0eSwgemlwLCBob3VzZU51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuJGZpcnN0TmFtZS52YWx1ZSA9IGZpcnN0TmFtZTtcbiAgICAgICAgdGhpcy4kbGFzdE5hbWUudmFsdWUgPSBsYXN0TmFtZTtcbiAgICAgICAgdGhpcy4kc3RyZWV0TmFtZS52YWx1ZSA9IHN0cmVldDtcbiAgICAgICAgdGhpcy4kY2l0eS52YWx1ZSA9IGNpdHk7XG4gICAgICAgIHRoaXMuJHppcC52YWx1ZSA9IHppcDtcbiAgICAgICAgdGhpcy4kaG91c2VOdW1iZXIudmFsdWUgPSBob3VzZU51bWJlcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0VXNlckF0dHJpYnV0ZXNUb01vZGFsKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IHRoaXMuJGZpcnN0TmFtZTtcbiAgICAgICAgY29uc3QgbGFzdE5hbWUgPSB0aGlzLiRsYXN0TmFtZTtcbiAgICAgICAgY29uc3Qgc3RyZWV0ID0gdGhpcy4kc3RyZWV0TmFtZTtcbiAgICAgICAgY29uc3QgaG91c2VOdW1iZXIgPSB0aGlzLiRob3VzZU51bWJlcjtcbiAgICAgICAgY29uc3QgemlwID0gdGhpcy4kemlwO1xuICAgICAgICBjb25zdCBjaXR5ID0gdGhpcy4kY2l0eTtcblxuICAgICAgICB0aGlzLiR1c2VyRmlyc3ROYW1lVmFsdWUgPSBmaXJzdE5hbWUudmFsdWU7XG4gICAgICAgIHRoaXMuJHVzZXJMYXN0TmFtZVZhbHVlID0gbGFzdE5hbWUudmFsdWU7XG4gICAgICAgIHRoaXMuJHVzZXJDaXR5ID0gY2l0eS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXNlclppcCA9IHppcC52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXNlckhvdXNlTnVtYmVyID0gaG91c2VOdW1iZXIudmFsdWU7XG4gICAgICAgIHRoaXMuJHVzZXJTdHJlZXQgPSBzdHJlZXQudmFsdWU7XG5cbiAgICAgICAgdGhpcy4kdXNlck5hbWVFbGVtZW50LmFwcGVuZChmaXJzdE5hbWUudmFsdWUgKyAnICcgKyBsYXN0TmFtZS52YWx1ZSk7XG4gICAgICAgIHRoaXMuJHVzZXJaaXBDaXR5LmFwcGVuZCh6aXAudmFsdWUgKyAnICcgKyBjaXR5LnZhbHVlKTtcbiAgICAgICAgdGhpcy4kdXNlclN0cmVldEhvdXNlTm8uYXBwZW5kKHN0cmVldC52YWx1ZSArICcgJyArIGhvdXNlTnVtYmVyLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0QXBpQXR0cmlidXRlc01vZGFsKGZpcnN0TmFtZSwgbGFzdE5hbWUsIHN0cmVldCwgaG91c2VOdW1iZXIsIHppcCwgY2l0eSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuJGFwaU5hbWVFbGVtZW50LmFwcGVuZChmaXJzdE5hbWUgKyAnICcgKyBsYXN0TmFtZSk7XG4gICAgICAgIHRoaXMuJGFwaVppcENpdHkuYXBwZW5kKHppcCArICcgJyArIGNpdHkpO1xuICAgICAgICB0aGlzLiRhcGlTdHJlZXRIb3VzZU5vLmFwcGVuZChzdHJlZXQgKyAnICcgKyBob3VzZU51bWJlcik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGVtcHR5RGl2RWxlbWVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuJHVzZXJOYW1lRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy4kdXNlclppcENpdHkuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuJHVzZXJTdHJlZXRIb3VzZU5vLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLiRhcGlOYW1lRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy4kYXBpWmlwQ2l0eS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy4kYXBpU3RyZWV0SG91c2VOby5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy4kZ2xvYnVzQ2FyZE51bWJlckZpZWxkLmlubmVySFRNTCA9ICcnO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdWJtaXRSZWdpc3RyYXRpb25Gb3JtKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuY2hlY2tvdXRTdGVwKCdsb2dpbicpO1xuICAgICAgICB0aGlzLmNoZWNrb3V0U3RlcCgncGljay11cCBzdGF0aW9uJyk7XG4gICAgICAgIHRoaXMuJHJlZ2lzdHJhdGlvbkZvcm1bMF0uc3VibWl0KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIHNlbmRSZXF1ZXN0VG9BZGRyZXNzQVBJKCk6IFByb21pc2UgPHZvaWQ+XG4gICAge1xuICAgICAgICBjb25zdCBmaXJzdE5hbWUgPSB0aGlzLiRmaXJzdE5hbWU7XG4gICAgICAgIGNvbnN0IGxhc3ROYW1lID0gdGhpcy4kbGFzdE5hbWU7XG4gICAgICAgIGNvbnN0IHN0cmVldCA9IHRoaXMuJHN0cmVldE5hbWU7XG4gICAgICAgIGNvbnN0IGhvdXNlTnVtYmVyID0gdGhpcy4kaG91c2VOdW1iZXI7XG4gICAgICAgIGNvbnN0IHppcCA9IHRoaXMuJHppcDtcbiAgICAgICAgY29uc3QgY2l0eSA9IHRoaXMuJGNpdHk7XG4gICAgICAgIGNvbnN0IHdlID0gdGhpcy5jaGVja2JveElzQWR2ZXJ0aXNlO1xuICAgICAgICBjb25zdCBtZWluR2xvYnVzID0gdGhpcy5oaWRkZW5Jc01laW5HbG9idXM7XG5cbiAgICAgICAgY29uc3QgdXJsID0gJy9yZWdpc3Rlci9jdXN0b21lci1hZGRyZXNzLWFwaSc7XG5cbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpcnN0TmFtZScsIGZpcnN0TmFtZS52YWx1ZSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbGFzdE5hbWUnLCBsYXN0TmFtZS52YWx1ZSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnc3RyZWV0Jywgc3RyZWV0LnZhbHVlKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdob3VzZU51bWJlcicsIGhvdXNlTnVtYmVyLnZhbHVlKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd6aXAnLCB6aXAudmFsdWUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2NpdHknLCBjaXR5LnZhbHVlKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd3ZScsIHdlLmNoZWNrZWQpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ21laW5HbG9idXMnLCBtZWluR2xvYnVzLmNoZWNrZWQpO1xuXG4gICAgICAgIGZldGNoKHVybCxcbiAgICAgICAgICAgIHsgbWV0aG9kOiAnUE9TVCcsIGJvZHk6IGZvcm1EYXRhIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihwYXJzZWRSZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYocGFyc2VkUmVzcG9uc2UgIT0gdW5kZWZpbmVkICYmIHBhcnNlZFJlc3BvbnNlICE9PSBbXSl7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYocGFyc2VkUmVzcG9uc2Uuc2hvd092ZXJsYXkgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDb250ZW50VG9Nb2RhbChwYXJzZWRSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dNb2RhbCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWRTaG93U2NhbkFuZEdvXCIpLnZhbHVlID0gXCIyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5RGl2RWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0UmVnaXN0cmF0aW9uRm9ybSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHt9KTtcblxuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBjYWxsQ2FyZE51bWJlckNoZWNrQVBJKGNhcmROdW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL3JlZ2lzdGVyL2NoZWNrLWNhcmQtbnVtYmVyJztcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgbGV0IGRhdGFUb1NlbmQ7XG5cbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdpZCcsIGNhcmROdW1iZXIpO1xuXG4gICAgICAgIGF3YWl0IGZldGNoKHVybCxcbiAgICAgICAgICAgIHsgbWV0aG9kOiAnUE9TVCcsIGJvZHk6IGZvcm1EYXRhIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihwYXJzZWRSZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlZFJlc3BvbnNlICE9IHVuZGVmaW5lZCAmJiBwYXJzZWRSZXNwb25zZSAhPT0gW10pe1xuICAgICAgICAgICAgICAgICAgICBkYXRhVG9TZW5kID0gcGFyc2VkUmVzcG9uc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFUb1NlbmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGF0YVRvU2VuZDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0QWdlRGlmZmVyZW5jZSgpe1xuICAgICAgICBsZXQgZGF0ZUZyb21JbnB1dCA9IG5ldyBEYXRlKHRoaXMuJGNtYlllYXIudmFsdWUsICh0aGlzLiRjbWJNb250aC52YWx1ZS0xKSwgdGhpcy4kY21iRGF5LnZhbHVlKTtcbiAgICAgICAgbGV0IHNpeHRlZW5ZZWFyc0FnbyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHNpeHRlZW5ZZWFyc0Fnby5zZXRUaW1lKHNpeHRlZW5ZZWFyc0Fnby52YWx1ZU9mKCkgLSAxNiAqIDM2NS4yNSAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuICAgICAgICB0aGlzLmFnZURpZmYgPSBzaXh0ZWVuWWVhcnNBZ28gPCBkYXRlRnJvbUlucHV0O1xuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIGNoZWNrSWZEYXRhSXNJbnB1dGVkKCl7XG4gICAgICAgIGxldCBmbGFnID0gMDtcblxuICAgICAgICB0aGlzLmdldEFnZURpZmZlcmVuY2UoKTtcblxuICAgICAgICBpZiAodGhpcy5hZ2VEaWZmKSB7XG4gICAgICAgICAgICB0aGlzLiRjbWJZZWFyLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yLWJpcnRoZGF5Jyk7XG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiRjbWJZZWFyLnBhcmVudE5vZGUucGFyZW50Tm9kZSwgNSk7XG4gICAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLiRmaXJzdE5hbWUudmFsdWUgPT09ICcnIHx8IHRoaXMuJGZpcnN0TmFtZS52YWx1ZSA9PT0gbnVsbCl7XG4gICAgICAgICAgICB0aGlzLiRmaXJzdE5hbWUuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yJyk7XG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiRmaXJzdE5hbWUpO1xuICAgICAgICAgICAgZmxhZyA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kbGFzdE5hbWUudmFsdWUgPT09ICcnIHx8IHRoaXMuJGxhc3ROYW1lLnZhbHVlID09PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuJGxhc3ROYW1lLmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICAgICAgdGhpcy5hZGRFcnJvck1lc3NhZ2VUb1RoZUlucHV0RmllbGQodGhpcy4kbGFzdE5hbWUpO1xuICAgICAgICAgICAgZmxhZyA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kc3RyZWV0TmFtZS52YWx1ZSA9PT0gJycgfHwgdGhpcy4kc3RyZWV0TmFtZS52YWx1ZSA9PT0gbnVsbCl7XG4gICAgICAgICAgICB0aGlzLiRzdHJlZXROYW1lLmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICAgICAgdGhpcy5hZGRFcnJvck1lc3NhZ2VUb1RoZUlucHV0RmllbGQodGhpcy4kc3RyZWV0TmFtZSk7XG4gICAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLiRob3VzZU51bWJlci52YWx1ZSA9PT0gJycgfHwgdGhpcy4kaG91c2VOdW1iZXIudmFsdWUgPT09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy4kaG91c2VOdW1iZXIuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yJyk7XG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiRob3VzZU51bWJlcik7XG4gICAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWdleE51bWJlcnMgPSBuZXcgUmVnRXhwKC9eWzAtOV0qJC8sICdnJyk7XG4gICAgICAgIHZhciBpc051bWJlcnNPbmx5ID0gcmVnZXhOdW1iZXJzLnRlc3QodGhpcy4kemlwLnZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMuJHppcC52YWx1ZSA9PT0gJycgfHwgdGhpcy4kemlwLnZhbHVlID09PSBudWxsKXtcbiAgICAgICAgICAgICQoXCIjcmVnaXN0ZXJGb3JtX2N1c3RvbWVyX3ppcF9jb2RlXCIpLnBhcmVudChcIi5mb3JtX19maWVsZFwiKS5jaGlsZHJlbihcIi5lcnJvclZhbGlkYXRpb25NZXNzYWdlXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy4kemlwLmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICAgICAgZmxhZyA9IDE7XG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiR6aXAsIDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuJGNpdHkudmFsdWUgPT09ICcnIHx8IHRoaXMuJGNpdHkudmFsdWUgPT09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy4kY2l0eS5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JNZXNzYWdlVG9UaGVJbnB1dEZpZWxkKHRoaXMuJGNpdHkpO1xuICAgICAgICAgICAgZmxhZyA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHRoaXMuJG1vYmlsZVBob25lTnVtYmVyLnZhbHVlID09PSAnJyB8fCB0aGlzLiRtb2JpbGVQaG9uZU51bWJlci52YWx1ZSA9PT0gbnVsbCkgJiYgKHRoaXMuJHBob25lTnVtYmVyLnZhbHVlID09PSAnJyB8fCB0aGlzLiRwaG9uZU51bWJlci52YWx1ZSA9PT0gbnVsbCkpe1xuICAgICAgICAgICAgdGhpcy4kbW9iaWxlUGhvbmVOdW1iZXIuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yJyk7XG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiRtb2JpbGVQaG9uZU51bWJlcik7XG4gICAgICAgICAgICB0aGlzLiRwaG9uZU51bWJlci5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JNZXNzYWdlVG9UaGVJbnB1dEZpZWxkKHRoaXMuJHBob25lTnVtYmVyKTtcbiAgICAgICAgICAgIGZsYWcgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY291bnRyeS52YWx1ZSA9PT0gJycgfHwgdGhpcy5jb3VudHJ5LnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50cnkucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JNZXNzYWdlVG9UaGVJbnB1dEZpZWxkKHRoaXMuY291bnRyeS5wYXJlbnROb2RlKTtcbiAgICAgICAgICAgIGZsYWcgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVnZXhDaGVjayA9IG5ldyBSZWdFeHAoL15bXjw+O1wiXSskLyk7XG4gICAgICAgIHRoaXMuYXJyYXlXaXRoSW5wdXRGaWVsZHNGb3JSZWdleC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0udmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChyZWdleENoZWNrLnRlc3QoaXRlbS52YWx1ZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUmVnZXhFcnJvck1lc3NhZ2VUb1RoZUZpZWxkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICgkKHRoaXMuJGNtYkRheSkudmFsKCkgPT09ICcnIHx8ICQodGhpcy4kY21iRGF5KS52YWwoKSA9PT0gbnVsbFxuICAgICAgICAgICAgfHwgJCh0aGlzLiRjbWJNb250aCkudmFsKCkgPT09ICcnIHx8ICQodGhpcy4kY21iTW9udGgpLnZhbCgpID09PSBudWxsXG4gICAgICAgICAgICB8fCAkKHRoaXMuJGNtYlllYXIpLnZhbCgpID09PSAnJyB8fCAkKHRoaXMuJGNtYlllYXIpLnZhbCgpID09PSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzLiRjbWJEYXkpLnZhbCgpID09PSAnJykge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNtYkRheS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1lcnJvci1iaXJ0aGRheScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCQodGhpcy4kY21iTW9udGgpLnZhbCgpID09PSAnJykge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNtYk1vbnRoLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yLWJpcnRoZGF5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJCh0aGlzLiRjbWJZZWFyKS52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRjbWJZZWFyLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yLWJpcnRoZGF5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiRjbWJZZWFyLnBhcmVudE5vZGUucGFyZW50Tm9kZSwgMyk7XG4gICAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlcXVpcmVkQ2FyZCkge1xuICAgICAgICAgICAgY29uc3QgY2FyZE51bWJlciA9ICQodGhpcy4kZ2xvYnVzQ2FyZE51bWJlckZpZWxkKS52YWwoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLiRnbG9idXNDYXJkTnVtYmVyRmllbGQudmFsdWUgPT09ICcnIHx8IHRoaXMuJGdsb2J1c0NhcmROdW1iZXJGaWVsZC52YWx1ZSA9PT0gbnVsbCkge1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmROdW1iZXJBZnRlciA9IGF3YWl0IHRoaXMuY2FsbENhcmROdW1iZXJDaGVja0FQSShjYXJkTnVtYmVyKTtcbiAgICAgICAgICAgICAgICBpZiAoY2FyZE51bWJlckFmdGVyICE9PSAndXNlZF9jYXJkX2Vycm9yJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbk15R2xvYnVzQ2FyZE51bWJlci52YWx1ZSA9IGNhcmROdW1iZXJBZnRlclt0aGlzLmNhcmRLZXldO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbk15R2xvYnVzQ2FyZFR5cGUudmFsdWUgPSBjYXJkTnVtYmVyQWZ0ZXJbdGhpcy5pc1BoeXNpY2FsS2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRnbG9idXNDYXJkTnVtYmVyRmllbGQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ2xvYnVzQ2FyZE51bWJlckZpZWxkLmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiRnbG9idXNDYXJkTnVtYmVyRmllbGQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuJHJhZGlvQnV0dG9uc1sxXS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcmFkaW9CdXR0b25zWzBdLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiRyYWRpb0J1dHRvbnNbMF0ucGFyZW50Tm9kZS5wYXJlbnROb2RlLCAyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZsYWdSYWRpbyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZmxhZyA9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZmxhZ1JhZGlvID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmbGFnID09PSAwKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGRFcnJvck1lc3NhZ2VUb1RoZVN1Ym1pdEJ1dHRvbigpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlRXJyb3JMYWJlbHMoKTogdm9pZHtcbiAgICAgICAgdGhpcy4kZmlyc3ROYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICB0aGlzLiRsYXN0TmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgdGhpcy4kc3RyZWV0TmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgdGhpcy4kaG91c2VOdW1iZXIuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtLWVycm9yJyk7XG4gICAgICAgIHRoaXMuJHppcC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgdGhpcy4kY2l0eS5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgdGhpcy4kbW9iaWxlUGhvbmVOdW1iZXIuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtLWVycm9yJyk7XG4gICAgICAgIHRoaXMuJHBob25lTnVtYmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICB0aGlzLiRyYWRpb0J1dHRvbnNbMF0ucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICB0aGlzLiRjbWJEYXkucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3ItYmlydGhkYXknKTtcbiAgICAgICAgdGhpcy4kY21iTW9udGgucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3ItYmlydGhkYXknKTtcbiAgICAgICAgdGhpcy4kY21iWWVhci5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1lcnJvci1iaXJ0aGRheScpO1xuXG4gICAgICAgIGlmICh0aGlzLiRnbG9idXNDYXJkTnVtYmVyRmllbGQuY2xhc3NMaXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuJGdsb2J1c0NhcmROdW1iZXJGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGVycm9yRGl2QWJvdmVTdWJtaXRCdXR0b24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdlcnJvclN1Ym1pdE1lc3NhZ2UnKTtcbiAgICAgICAgdGhpcy4kZXJyb3JEaXZBYm92ZVN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgICAgIGlmICh0aGlzLiRlcnJvck1lc3NhZ2VTcGFuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy4kZXJyb3JNZXNzYWdlU3Bhbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRlcnJvck1lc3NhZ2VTcGFuW2ldLnBhcmVudE5vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlcnJvck1lc3NhZ2VTcGFuW2ldLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVzaW5nIGZsYWdzIGZvciBkaWZmZXJlbnQgY2FzZXMgLT4gMCA9IG5vcm1hbCBjYXNlLCAxID0gY2FyZF9udW1iZXJfZXJyb3IsIDIgPSByYWRpbyBidXR0b24gZXJyb3IgbWVzc2FnZVxuICAgIHByb3RlY3RlZCBhZGRFcnJvck1lc3NhZ2VUb1RoZUlucHV0RmllbGQoZWxlbWVudCwgZmxhZzogbnVtYmVyID0gMCk6IHZvaWR7XG4gICAgICAgIGNvbnN0IGVycm9yU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgZXJyb3JTcGFuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZXJyb3JWYWxpZGF0aW9uTWVzc2FnZScpO1xuICAgICAgICBpZiAoZmxhZyA9PT0gMSkge1xuICAgICAgICAgICAgZXJyb3JTcGFuLnRleHRDb250ZW50ID0gJ+KAoiBEaWVzZSBLYXJ0ZW5udW1tZXIgaXN0IGJlcmVpdHMgYW5nZWxlZ3QuIEJpdHRlIGxvZ2dlbiBTaWUgc2ljaCBtaXQgSWhyZW0gUGFzc3dvcnQgZWluLic7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLnBhcmVudCgpLmFwcGVuZChlcnJvclNwYW4pO1xuICAgICAgICB9IGVsc2UgaWYgKGZsYWcgPT09IDIpIHtcbiAgICAgICAgICAgIGVycm9yU3Bhbi50ZXh0Q29udGVudCA9ICfigKIgTWluZGVzdGVucyBlaW5lIEFuZ2FiZSBpc3QgUGZsaWNodC4nO1xuICAgICAgICAgICAgJChlbGVtZW50KS5wYXJlbnQoKS5hcHBlbmQoZXJyb3JTcGFuKTtcbiAgICAgICAgfSBlbHNlIGlmIChmbGFnID09PSAzKSB7XG4gICAgICAgICAgICBlcnJvclNwYW4udGV4dENvbnRlbnQgPSAn4oCiIERpZXNlcyBGZWxkZXIgc29sbHRlIG5pY2h0IGxlZXIgc2Vpbic7XG4gICAgICAgICAgICBlcnJvclNwYW4uY2xhc3NMaXN0LmFkZCgnZm9ybV9fZmllbGQnLCAnY29sJywgJ2NvbC0tb3JkZXItNCcsICdjb2wtLXNtLTEyJywgJ2NvbC0tbWQtMTInKTtcbiAgICAgICAgICAgICQoZWxlbWVudCkucGFyZW50KCkuYXBwZW5kKGVycm9yU3Bhbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmxhZyA9PT0gNCkge1xuICAgICAgICAgICAgZXJyb3JTcGFuLnRleHRDb250ZW50ID0gJ+KAoiBCaXR0ZSBlaW5lIDUtc3RlbGxpZ2UgUExaIGVpbmdlYmVuLic7XG4gICAgICAgICAgICBlcnJvclNwYW4uY2xhc3NMaXN0LmFkZCgnZm9ybV9fZmllbGQnLCAnY29sJywgJ2NvbC0tb3JkZXItNCcsICdjb2wtLXNtLTEyJywgJ2NvbC0tbWQtMTInKTtcbiAgICAgICAgICAgICQoZWxlbWVudCkucGFyZW50KCkuYXBwZW5kKGVycm9yU3Bhbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmxhZyA9PT0gNSkge1xuICAgICAgICAgICAgZXJyb3JTcGFuLnRleHRDb250ZW50ID0gJ+KAoiBTaWUgbcO8c3NlbiBtaW5kZXN0ZW5zIDE2IEphaHJlIGFsdCBzZWluLic7XG4gICAgICAgICAgICBlcnJvclNwYW4uc3R5bGUudGV4dEFsaWduID0gXCJyaWdodFwiO1xuICAgICAgICAgICAgZXJyb3JTcGFuLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fX2ZpZWxkJywgJ2NvbCcsICdjb2wtLW9yZGVyLTQnLCAnY29sLS1zbS0xMicsICdjb2wtLW1kLTEyJyk7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLnBhcmVudCgpLmFwcGVuZChlcnJvclNwYW4pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXJyb3JTcGFuLnRleHRDb250ZW50ID0gJ+KAoiBEaWVzZXMgRmVsZCBzb2xsdGUgbmljaHQgbGVlciBzZWluJztcbiAgICAgICAgICAgICQoZWxlbWVudCkucGFyZW50KCkuYXBwZW5kKGVycm9yU3Bhbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWRkRXJyb3JNZXNzYWdlVG9UaGVTdWJtaXRCdXR0b24oKTogdm9pZHtcbiAgICAgICAgaWYgKHRoaXMucmVnaXN0ZXJGb3JtYSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgZXJyb3JTcGFuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZXJyb3JWYWxpZGF0aW9uTWVzc2FnZScpO1xuICAgICAgICAgICAgJChlcnJvclNwYW4pLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICQoZXJyb3JTcGFuKS5jc3MoJ21hcmdpbi1ib3R0b20nLCAnNDVweCcpO1xuICAgICAgICAgICAgZXJyb3JTcGFuLnRleHRDb250ZW50ID0gJ0JpdHRlIGbDvGxsZW4gU2llIGRpZSBQZmxpY2h0ZmVsZGVyIGF1cy4nO1xuICAgICAgICAgICAgaWYodGhpcy5yZWdpc3RlckZvcm1hID09IHRydWUgJiYgdGhpcy5hZ2VEaWZmID09IHRydWUgJiYgdGhpcy5mbGFnUmFkaW8gPT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIGVycm9yU3Bhbi50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5saW5rVG9BZGRyZXNzTW9kYWwucGFyZW50Tm9kZS5wcmVwZW5kKGVycm9yU3Bhbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRlcnJvckRpdkFib3ZlU3VibWl0QnV0dG9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZXJyb3JTdWJtaXRNZXNzYWdlJyk7XG4gICAgICAgICAgICB0aGlzLiRlcnJvckRpdkFib3ZlU3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0JpdHRlIGbDvGxsZW4gU2llIGRpZSBQZmxpY2h0ZmVsZGVyIGF1cy4nO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWRkUmVnZXhFcnJvck1lc3NhZ2VUb1RoZUZpZWxkKGVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXJyb3JTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBlcnJvclNwYW4uc2V0QXR0cmlidXRlKCdjbGFzcycsICdlcnJvclZhbGlkYXRpb25NZXNzYWdlJyk7XG4gICAgICAgIGVycm9yU3Bhbi50ZXh0Q29udGVudCA9ICfigKIgRmFsc2NoIGVpbmdlZ2ViZW5lIERhdGVuJztcbiAgICAgICAgZXJyb3JTcGFuLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fX2ZpZWxkJywgJ2NvbCcsICdjb2wtLW9yZGVyLTQnLCAnY29sLS1zbS0xMicsICdjb2wtLW1kLTEyJyk7XG4gICAgICAgICQoZWxlbWVudCkucGFyZW50KCkuYXBwZW5kKGVycm9yU3Bhbik7XG4gICAgfVxuXG5cbiAgICBwcm90ZWN0ZWQgYWRkQ29udGVudFRvTW9kYWwoZGF0YSk6IHZvaWR7XG4gICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGRhdGEucmVzdWx0LmZpcnN0TmFtZTtcbiAgICAgICAgY29uc3QgbGFzdE5hbWUgPSBkYXRhLnJlc3VsdC5sYXN0TmFtZTtcbiAgICAgICAgY29uc3QgemlwID0gZGF0YS5yZXN1bHQuYWRkcmVzcy56aXA7XG4gICAgICAgIGNvbnN0IGhvdXNlTnVtYmVyID0gZGF0YS5yZXN1bHQuYWRkcmVzcy5ob3VzZU5vO1xuICAgICAgICBjb25zdCBzdHJlZXQgPSBkYXRhLnJlc3VsdC5hZGRyZXNzLnN0cmVldDtcbiAgICAgICAgY29uc3QgY2l0eSA9IGRhdGEucmVzdWx0LmFkZHJlc3MuY2l0eTtcblxuICAgICAgICB0aGlzLiRhcGlGaXJzdE5hbWVWYWx1ZSA9IGZpcnN0TmFtZTtcbiAgICAgICAgdGhpcy4kYXBpTGFzdE5hbWVWYWx1ZSA9IGxhc3ROYW1lO1xuICAgICAgICB0aGlzLiRhcGlTdHJlZXQgPSBzdHJlZXQ7XG4gICAgICAgIHRoaXMuJGFwaUhvdXNlTnVtYmVyID0gaG91c2VOdW1iZXI7XG4gICAgICAgIHRoaXMuJGFwaUNpdHkgPSBjaXR5O1xuICAgICAgICB0aGlzLiRhcGlaaXAgPSB6aXA7XG5cbiAgICAgICAgdGhpcy5zZXRBcGlBdHRyaWJ1dGVzTW9kYWwoZmlyc3ROYW1lLCBsYXN0TmFtZSwgc3RyZWV0LCBob3VzZU51bWJlciwgemlwLCBjaXR5KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZmluZEVsZW1lbnQobmFtZTpzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hbWUpO1xuICAgICAgICBpZighZWwpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoJ3JlZ2lzdGVyRm9ybV9jdXN0b21lcl8nLCAncmVnaXN0ZXJGb3JtXycpO1xuICAgICAgICAgICAgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0U3RlcChvcHRpb24pXG4gICAge1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe1xuICAgICAgICAgICAgJ2V2ZW50JzogJ2VlYy5jaGVja291dCcsXG4gICAgICAgICAgICAnZWNvbW1lcmNlJzpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICdjaGVja291dCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FjdGlvbkZpZWxkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0ZXAnOiAnMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb3B0aW9uJzogb3B0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBnZXRMaW5rVG9BZGRyZXNzTW9kYWwoKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gJ2xpbmstdG8tYWRkcmVzcy1tb2RhbCc7XG4gICAgfVxuXG4gICAgZ2V0IGdldENsb3NlQnV0dG9uU2VsZWN0b3IoKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gYC4ke3RoaXMubmFtZX1fX2Nsb3NlYDtcbiAgICB9XG5cbiAgICBnZXQgc2hvd0NsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9LS1zaG93YDtcbiAgICB9XG5cbiAgICBnZXQgZ2V0Q2FuY2VsUmVnaXN0ZXJCdXR0b24oKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gJ2J1dHRvbi1jYW5jZWwtcmVnaXN0cmF0aW9uJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0U3VibWl0Rm9ybUJ1dHRvbigpOiBzdHJpbmd7XG4gICAgICAgIHJldHVybiAnaWQtc3VibWl0LXJlZ2lzdHJhdGlvbi11c2VyJztcbiAgICB9XG5cbiAgICBnZXQgcmVnaXN0ZXJGb3JtKCl7XG4gICAgICAgIHJldHVybiAncmVnaXN0ZXJGb3JtJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0Rmlyc3ROYW1lKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fY3VzdG9tZXJfZmlyc3RfbmFtZSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldExhc3ROYW1lKCk6IHN0cmluZyAge1xuICAgICAgICByZXR1cm4gJ3JlZ2lzdGVyRm9ybV9jdXN0b21lcl9sYXN0X25hbWUnO1xuICAgIH1cblxuICAgIGdldCBnZXRTdHJlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fY3VzdG9tZXJfYWRkcmVzczEnO1xuICAgIH1cblxuICAgIGdldCBnZXRIb3VzZU51bWJlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ3JlZ2lzdGVyRm9ybV9jdXN0b21lcl9hZGRyZXNzMic7XG4gICAgfVxuXG4gICAgZ2V0IGdldFppcE51bWJlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ3JlZ2lzdGVyRm9ybV9jdXN0b21lcl96aXBfY29kZSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldENpdHkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fY3VzdG9tZXJfY2l0eSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldFVzZXJOYW1lKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICd1c2VyX25hbWVfYW5kX3N1cm5hbWUnO1xuICAgIH1cblxuICAgIGdldCBnZXRVc2VyWmlwQ2l0eSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ3VzZXJfemlwX2NpdHknO1xuICAgIH1cblxuICAgIGdldCBnZXRVc2VyU3RyZWV0SG91c2VObygpOiBzdHJpbmd7XG4gICAgICAgIHJldHVybiAndXNlcl9zdHJlZXRfaG91c2VObyc7XG4gICAgfVxuXG4gICAgZ2V0IGdldFVzZXJTdmcoKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gJ3VzZXJfc3ZnX2ljb24nO1xuICAgIH1cblxuICAgIGdldCBnZXRBcGlOYW1lKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICdhcGlfbmFtZV9hbmRfc3VybmFtZSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldEFwaVppcENpdHkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdhcGlfemlwX2NpdHknO1xuICAgIH1cblxuICAgIGdldCBnZXRBcGlTdHJlZXRIb3VzZU5vKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICdhcGlfc3RyZWV0X2hvdXNlTm8nO1xuICAgIH1cblxuICAgIGdldCBnZXRBcGlTdmcoKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gJ2FwaV9zdmdfaWNvbic7XG4gICAgfVxuXG4gICAgZ2V0IGdldEFwaURpdigpOiBzdHJpbmd7XG4gICAgICAgIHJldHVybiAnbGVmdC1zaWRlJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0VXNlckRpdigpOiBzdHJpbmd7XG4gICAgICAgIHJldHVybiAncmlnaHQtc2lkZSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldFVzZXJDaXJjbGVXcmFwcGVyKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICd1c2VyX2NpcmNsZV9jbGFzcyc7XG4gICAgfVxuXG4gICAgZ2V0IGdldEFwaUNpcmNsZVdyYXBwZXIoKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gJ2FwaV9jaXJjbGVfY2xhc3MnO1xuICAgIH1cblxuICAgIGdldCBnZXREaXNhYmxlQ2lyY2xlV3JhcHBlckNsYXNzKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICdwb3B1cC11aS1hZGRyZXNzLXZhbGlkYXRpb25fX2Rpc2FibGVkQ2lyY2xlJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0RGlzYWJsZVRleHRDbGFzcygpOiBzdHJpbmd7XG4gICAgICAgIHJldHVybiAncG9wdXAtdWktYWRkcmVzcy12YWxpZGF0aW9uX19kaXNhYmxlZFRleHQnO1xuICAgIH1cblxuICAgIGdldCBnZXRTZWxlY3RlZERpdkNsYXNzKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICdzZWxlY3RlZC1kaXYnO1xuICAgIH1cblxuICAgIGdldCBnZXRBcGlCdXR0b24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdhcGlfYnV0dG9uX2NvbnRlbnQnO1xuICAgIH1cblxuICAgIGdldCBnZXRVc2VyQnV0dG9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAndXNlcl9idXR0b25fY29udGVudCc7XG4gICAgfVxuXG4gICAgZ2V0IGVycm9yTWVzc2FnZVNwYW4oKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gJ2Vycm9yVmFsaWRhdGlvbk1lc3NhZ2UnO1xuICAgIH1cblxuICAgIGdldCBlcnJvckRpdkFib3ZlU3VibWl0KCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICdlcnJvck1lc3NhZ2VBYm92ZVN1Ym1pdEJ1dHRvbic7XG4gICAgfVxuXG4gICAgZ2V0IGdldE15R2xvYnVzQ2FyZE51bWJlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ215R2xvYnVzQ2FyZE51bWJlcic7XG4gICAgfVxuXG4gICAgZ2V0IGdldFJhZGlvQnV0dG9uc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyYWRpb19rdW5kZW5rYXJ0ZSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldE1vYmlsZVBob25lTnVtYmVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAncmVnaXN0ZXJGb3JtX2N1c3RvbWVyX21vYmlsZV9waG9uZV9udW1iZXInO1xuICAgIH1cblxuICAgIGdldCBnZXRNb2JpbGVQaG9uZU51bWJlclJlZ2lzdHJhdGlvbkZvcm0oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fbW9iaWxlX3Bob25lX251bWJlcic7XG4gICAgfVxuXG4gICAgZ2V0IGdldFBob25lTnVtYmVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAncmVnaXN0ZXJGb3JtX2N1c3RvbWVyX3Bob25lJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0UGhvbmVOdW1iZXJSZWdpc3RyYXRpb25Gb3JtKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAncmVnaXN0ZXJGb3JtX3Bob25lJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0RGF5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAncmVnaXN0ZXJGb3JtX2N1c3RvbWVyX2JpcnRoX2RheSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldERheVJlZ2lzdHJhdGlvbkZvcm0oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fYmlydGhfZGF5JztcbiAgICB9XG5cbiAgICBnZXQgZ2V0TW9udGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fY3VzdG9tZXJfYmlydGhfbW9udGgnO1xuICAgIH1cblxuICAgIGdldCBnZXRNb250aFJlZ2lzdHJhdGlvbkZvcm0oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fYmlydGhfbW9udGgnO1xuICAgIH1cblxuICAgIGdldCBnZXRZZWFyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAncmVnaXN0ZXJGb3JtX2N1c3RvbWVyX2JpcnRoX3llYXInO1xuICAgIH1cblxuICAgIGdldCBnZXRZZWFyUmVnaXN0cmF0aW9uRm9ybSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ3JlZ2lzdGVyRm9ybV9iaXJ0aF95ZWFyJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0Q3VzdG9tZXJDb3VudHJ5UmVnaXN0cmF0aW9uRm9ybSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ3JlZ2lzdGVyRm9ybV9jdXN0b21lcl9jb3VudHJ5JztcbiAgICB9XG5cbiAgICBnZXQgZ2V0Q291bnRyeVJlZ2lzdHJhdGlvbkZvcm0oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fY291bnRyeSc7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==