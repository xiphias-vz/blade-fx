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

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcG9wdXAtdWktYWRkcmVzcy12YWxpZGF0aW9uL3BvcHVwLXVpLWFkZHJlc3MtdmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6WyJQb3B1cFVpQWRkcmVzc1ZhbGlkYXRpb24iLCJDb21wb25lbnQiLCIkIiwicmVhZHlDYWxsYmFjayIsImxpbmtUb0FkZHJlc3NNb2RhbCIsImZpbmRFbGVtZW50IiwiZ2V0TGlua1RvQWRkcmVzc01vZGFsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwicmVnaXN0ZXJGb3JtYSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY2xvc2VNb2RhbEJ0biIsIiR0aGlzIiwiZmluZCIsImdldENsb3NlQnV0dG9uU2VsZWN0b3IiLCJzdWJtaXRSZWdpc3RyYXRpb25Gb3JtQnV0dG9uIiwiZ2V0U3VibWl0Rm9ybUJ1dHRvbiIsImNhbmNlbFJlZ2lzdHJhdGlvbkZvcm1CdXR0b24iLCJnZXRDYW5jZWxSZWdpc3RlckJ1dHRvbiIsIiRyZWdpc3RyYXRpb25Gb3JtIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJyZWdpc3RlckZvcm0iLCIkZmlyc3ROYW1lIiwiZ2V0Rmlyc3ROYW1lIiwiJGxhc3ROYW1lIiwiZ2V0TGFzdE5hbWUiLCIkc3RyZWV0TmFtZSIsImdldFN0cmVldCIsIiRob3VzZU51bWJlciIsImdldEhvdXNlTnVtYmVyIiwiJHppcCIsImdldFppcE51bWJlciIsIiRjaXR5IiwiZ2V0Q2l0eSIsIiR1c2VyTmFtZUVsZW1lbnQiLCJnZXRVc2VyTmFtZSIsIiR1c2VyWmlwQ2l0eSIsImdldFVzZXJaaXBDaXR5IiwiJHVzZXJTdHJlZXRIb3VzZU5vIiwiZ2V0VXNlclN0cmVldEhvdXNlTm8iLCIkdXNlclN2ZyIsImdldFVzZXJTdmciLCIkYXBpTmFtZUVsZW1lbnQiLCJnZXRBcGlOYW1lIiwiJGFwaVppcENpdHkiLCJnZXRBcGlaaXBDaXR5IiwiJGFwaVN0cmVldEhvdXNlTm8iLCJnZXRBcGlTdHJlZXRIb3VzZU5vIiwiJGFwaVN2ZyIsImdldEFwaVN2ZyIsIiR1c2VyRGl2IiwiZ2V0VXNlckRpdiIsIiRhcGlEaXYiLCJnZXRBcGlEaXYiLCIkdXNlckNoZWNrZWRDaXJjbGVXcmFwcGVyIiwiZ2V0VXNlckNpcmNsZVdyYXBwZXIiLCIkYXBpQ2hlY2tlZENpcmNsZVdyYXBwZXIiLCJnZXRBcGlDaXJjbGVXcmFwcGVyIiwiJGFwaUJ1dHRvbiIsImdldEVsZW1lbnRCeUlkIiwiZ2V0QXBpQnV0dG9uIiwiJHVzZXJCdXR0b24iLCJnZXRVc2VyQnV0dG9uIiwiJGVycm9yTWVzc2FnZVNwYW4iLCJlcnJvck1lc3NhZ2VTcGFuIiwiJGVycm9yRGl2QWJvdmVTdWJtaXRCdXR0b24iLCJlcnJvckRpdkFib3ZlU3VibWl0IiwiJGdsb2J1c0NhcmROdW1iZXJGaWVsZCIsImdldE15R2xvYnVzQ2FyZE51bWJlciIsIiRyYWRpb0J1dHRvbnMiLCJnZXRSYWRpb0J1dHRvbnNOYW1lIiwiaGlkZGVuTXlHbG9idXNDYXJkTnVtYmVyIiwicXVlcnlTZWxlY3RvciIsImhpZGRlbk15R2xvYnVzQ2FyZFR5cGUiLCJjaGVja2JveElzQWR2ZXJ0aXNlIiwiaGlkZGVuSXNNZWluR2xvYnVzIiwiJG1vYmlsZVBob25lTnVtYmVyIiwiZ2V0TW9iaWxlUGhvbmVOdW1iZXIiLCJnZXRNb2JpbGVQaG9uZU51bWJlclJlZ2lzdHJhdGlvbkZvcm0iLCIkcGhvbmVOdW1iZXIiLCJnZXRQaG9uZU51bWJlciIsImdldFBob25lTnVtYmVyUmVnaXN0cmF0aW9uRm9ybSIsIiRjbWJEYXkiLCJnZXREYXkiLCJnZXREYXlSZWdpc3RyYXRpb25Gb3JtIiwiJGNtYk1vbnRoIiwiZ2V0TW9udGgiLCJnZXRNb250aFJlZ2lzdHJhdGlvbkZvcm0iLCIkY21iWWVhciIsImdldFllYXIiLCJnZXRZZWFyUmVnaXN0cmF0aW9uRm9ybSIsImFycmF5V2l0aElucHV0RmllbGRzRm9yUmVnZXgiLCJtYXBFdmVudHMiLCJ1bmRlZmluZWQiLCJjaGVja2VkIiwicmVxdWlyZWRDYXJkIiwicmVtb3ZlRXJyb3JMYWJlbHMiLCJlbXB0eURpdkVsZW1lbnRzIiwiZW5hYmxlQXBpQ29udGVudCIsImZpZWxkc0NoZWNrZWQiLCJjaGVja0lmRGF0YUlzSW5wdXRlZCIsImFmdGVyQXBpQ2FsbCIsIm9uIiwiY2xvc2VNb2RhbCIsInN1Ym1pdFJlZ2lzdHJhdGlvbkZvcm0iLCJjbGlja2VkVXNlckFkZHJlc3MiLCJlbmFibGVVc2VyQ29udGVudCIsImRpc2FibGVBcGlDb250ZW50IiwiY2xpY2tlZEFwaUFkZHJlc3MiLCJkaXNhYmxlVXNlckNvbnRlbnQiLCJ2YWx1ZSIsInNob3dNb2RhbCIsImFkZENsYXNzIiwic2hvd0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzZW5kUmVxdWVzdFRvQWRkcmVzc0FQSSIsInNldFVzZXJBdHRyaWJ1dGVzVG9Nb2RhbCIsImNsYXNzTGlzdCIsImFkZCIsImdldERpc2FibGVDaXJjbGVXcmFwcGVyQ2xhc3MiLCJnZXREaXNhYmxlVGV4dENsYXNzIiwicmVtb3ZlIiwiZ2V0U2VsZWN0ZWREaXZDbGFzcyIsImZpcnN0TmFtZSIsIiR1c2VyRmlyc3ROYW1lVmFsdWUiLCJsYXN0TmFtZSIsIiR1c2VyTGFzdE5hbWVWYWx1ZSIsInN0cmVldCIsIiR1c2VyU3RyZWV0IiwiY2l0eSIsIiR1c2VyQ2l0eSIsInppcCIsIiR1c2VyWmlwIiwiaG91c2VOdW1iZXIiLCIkdXNlckhvdXNlTnVtYmVyIiwiYWRkVmFsdWVzVG9Gb3JtRWxlbWVudHMiLCIkYXBpRmlyc3ROYW1lVmFsdWUiLCIkYXBpTGFzdE5hbWVWYWx1ZSIsIiRhcGlTdHJlZXQiLCIkYXBpQ2l0eSIsIiRhcGlaaXAiLCIkYXBpSG91c2VOdW1iZXIiLCJhcHBlbmQiLCJzZXRBcGlBdHRyaWJ1dGVzTW9kYWwiLCJpbm5lckhUTUwiLCJjaGVja291dFN0ZXAiLCJzdWJtaXQiLCJ3ZSIsIm1laW5HbG9idXMiLCJ1cmwiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInBhcnNlZFJlc3BvbnNlIiwic2hvd092ZXJsYXkiLCJhZGRDb250ZW50VG9Nb2RhbCIsImNhdGNoIiwiZXJyb3IiLCJjYWxsQ2FyZE51bWJlckNoZWNrQVBJIiwiY2FyZE51bWJlciIsImRhdGFUb1NlbmQiLCJnZXRBZ2VEaWZmZXJlbmNlIiwiZGF0ZUZyb21JbnB1dCIsIkRhdGUiLCJzaXh0ZWVuWWVhcnNBZ28iLCJzZXRUaW1lIiwidmFsdWVPZiIsImFnZURpZmYiLCJmbGFnIiwicGFyZW50Tm9kZSIsImFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCIsInJlZ2V4TnVtYmVycyIsIlJlZ0V4cCIsImlzTnVtYmVyc09ubHkiLCJ0ZXN0IiwicGFyZW50IiwiY2hpbGRyZW4iLCJyZWdleENoZWNrIiwiZm9yRWFjaCIsIml0ZW0iLCJsZW5ndGgiLCJhZGRSZWdleEVycm9yTWVzc2FnZVRvVGhlRmllbGQiLCJ2YWwiLCJjYXJkTnVtYmVyQWZ0ZXIiLCJjYXJkS2V5IiwiaXNQaHlzaWNhbEtleSIsImZsYWdSYWRpbyIsImFkZEVycm9yTWVzc2FnZVRvVGhlU3VibWl0QnV0dG9uIiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJpIiwiZWxlbWVudCIsImVycm9yU3BhbiIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsInRleHRBbGlnbiIsImNzcyIsInByZXBlbmQiLCJkYXRhIiwicmVzdWx0IiwiYWRkcmVzcyIsImhvdXNlTm8iLCJuYW1lIiwiZWwiLCJyZXBsYWNlIiwib3B0aW9uIiwid2luZG93IiwiZGF0YUxheWVyIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVlLE1BQU1BLHdCQUFOLFNBQXVDQywrREFBdkMsQ0FBZ0Q7QUFBQTtBQUFBOztBQUFBLG1DQUN0Q0Ms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LEdBQTZDO0FBQ3pDLFdBQU8sb0JBQVA7QUFDSDs7QUFFRCxNQUFJRSxNQUFKLEdBQXFCO0FBQ2pCLFdBQU8saUNBQVA7QUFDSDs7QUFFRCxNQUFJQyxzQkFBSixHQUFxQztBQUNqQyxXQUFPLHdCQUFQO0FBQ0g7O0FBRUQsTUFBSUUsUUFBSixHQUF1QjtBQUNuQixXQUFPLG1DQUFQO0FBQ0g7O0FBRUQsTUFBSUMsd0JBQUosR0FBdUM7QUFDbkMsV0FBTywwQkFBUDtBQUNIOztBQUVELE1BQUlFLE9BQUosR0FBc0I7QUFDbEIsV0FBTyxrQ0FBUDtBQUNIOztBQUVELE1BQUlDLHVCQUFKLEdBQXNDO0FBQ2xDLFdBQU8seUJBQVA7QUFDSDs7QUF4MEIwRCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjM0LmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5L2Rpc3QvanF1ZXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBVaUFkZHJlc3NWYWxpZGF0aW9uIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHByb3RlY3RlZCAkdGhpczogJCA9ICQodGhpcyk7XG4gICAgcHJvdGVjdGVkIGxpbmtUb0FkZHJlc3NNb2RhbDtcbiAgICBwcm90ZWN0ZWQgY2xvc2VNb2RhbEJ0bjtcbiAgICBwcm90ZWN0ZWQgc3VibWl0UmVnaXN0cmF0aW9uRm9ybUJ1dHRvbjtcbiAgICBwcm90ZWN0ZWQgY2FuY2VsUmVnaXN0cmF0aW9uRm9ybUJ1dHRvbjtcbiAgICBwcm90ZWN0ZWQgJHJlZ2lzdHJhdGlvbkZvcm07XG4gICAgcHJvdGVjdGVkICRmaXJzdE5hbWU7XG4gICAgcHJvdGVjdGVkICRsYXN0TmFtZTtcbiAgICBwcm90ZWN0ZWQgJHN0cmVldE5hbWU7XG4gICAgcHJvdGVjdGVkICRob3VzZU51bWJlcjtcbiAgICBwcm90ZWN0ZWQgJHppcDtcbiAgICBwcm90ZWN0ZWQgJGNpdHk7XG4gICAgcHJvdGVjdGVkICR1c2VyTmFtZUVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkICR1c2VyWmlwQ2l0eTtcbiAgICBwcm90ZWN0ZWQgJHVzZXJTdHJlZXRIb3VzZU5vO1xuICAgIHByb3RlY3RlZCAkdXNlclN2ZztcbiAgICBwcm90ZWN0ZWQgJGFwaU5hbWVFbGVtZW50O1xuICAgIHByb3RlY3RlZCAkYXBpWmlwQ2l0eTtcbiAgICBwcm90ZWN0ZWQgJGFwaVN0cmVldEhvdXNlTm87XG4gICAgcHJvdGVjdGVkICRhcGlTdmc7XG4gICAgcHJvdGVjdGVkICR1c2VyRGl2O1xuICAgIHByb3RlY3RlZCAkYXBpRGl2O1xuICAgIHByb3RlY3RlZCAkYXBpRmlyc3ROYW1lVmFsdWU7XG4gICAgcHJvdGVjdGVkICRhcGlMYXN0TmFtZVZhbHVlO1xuICAgIHByb3RlY3RlZCAkYXBpU3RyZWV0O1xuICAgIHByb3RlY3RlZCAkYXBpWmlwO1xuICAgIHByb3RlY3RlZCAkYXBpSG91c2VOdW1iZXI7XG4gICAgcHJvdGVjdGVkICRhcGlDaXR5O1xuICAgIHByb3RlY3RlZCAkdXNlckZpcnN0TmFtZVZhbHVlO1xuICAgIHByb3RlY3RlZCAkdXNlckxhc3ROYW1lVmFsdWU7XG4gICAgcHJvdGVjdGVkICR1c2VyU3RyZWV0O1xuICAgIHByb3RlY3RlZCAkdXNlclppcDtcbiAgICBwcm90ZWN0ZWQgJHVzZXJIb3VzZU51bWJlcjtcbiAgICBwcm90ZWN0ZWQgJHVzZXJDaXR5O1xuICAgIHByb3RlY3RlZCAkdXNlckNoZWNrZWRDaXJjbGVXcmFwcGVyO1xuICAgIHByb3RlY3RlZCAkYXBpQ2hlY2tlZENpcmNsZVdyYXBwZXI7XG4gICAgcHJvdGVjdGVkICRhcGlCdXR0b247XG4gICAgcHJvdGVjdGVkICR1c2VyQnV0dG9uO1xuICAgIHByb3RlY3RlZCAkZXJyb3JNZXNzYWdlU3BhbjtcbiAgICBwcm90ZWN0ZWQgJGVycm9yRGl2QWJvdmVTdWJtaXRCdXR0b247XG4gICAgcHJvdGVjdGVkICRnbG9idXNDYXJkTnVtYmVyRmllbGQ7XG4gICAgcHJvdGVjdGVkICRyYWRpb0J1dHRvbnM7XG4gICAgcHJvdGVjdGVkIGhpZGRlbk15R2xvYnVzQ2FyZE51bWJlcjtcbiAgICBwcm90ZWN0ZWQgaGlkZGVuTXlHbG9idXNDYXJkVHlwZTtcbiAgICBwcm90ZWN0ZWQgY2hlY2tib3hJc0FkdmVydGlzZTtcbiAgICBwcm90ZWN0ZWQgaGlkZGVuSXNNZWluR2xvYnVzO1xuICAgIHByb3RlY3RlZCAkbW9iaWxlUGhvbmVOdW1iZXI7XG4gICAgcHJvdGVjdGVkICRwaG9uZU51bWJlcjtcbiAgICBwcm90ZWN0ZWQgJGNtYkRheTtcbiAgICBwcm90ZWN0ZWQgJGNtYk1vbnRoO1xuICAgIHByb3RlY3RlZCAkY21iWWVhcjtcblxuICAgIHByb3RlY3RlZCBhZ2VEaWZmO1xuICAgIHByb3RlY3RlZCBmbGFnUmFkaW87XG4gICAgcHJvdGVjdGVkIHJlZ2lzdGVyRm9ybWEgPSBmYWxzZTtcbiAgICBwcm90ZWN0ZWQgcmVxdWlyZWRDYXJkID0gZmFsc2U7XG4gICAgcHJvdGVjdGVkIGdsb2JhbENhcmROdW1iZXI7XG5cbiAgICBwcm90ZWN0ZWQgY2FyZEtleSA9ICdjYXJkTnVtYmVyJztcbiAgICBwcm90ZWN0ZWQgaXNQaHlzaWNhbEtleSA9ICdpc19waHlzaWNhbCc7XG5cbiAgICBwcm90ZWN0ZWQgYXJyYXlXaXRoSW5wdXRGaWVsZHNGb3JSZWdleDogSFRNTElucHV0RWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIGFzeW5jIHJlYWR5Q2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMubGlua1RvQWRkcmVzc01vZGFsID0gdGhpcy5maW5kRWxlbWVudCh0aGlzLmdldExpbmtUb0FkZHJlc3NNb2RhbCk7XG4gICAgICAgIGlmICghdGhpcy5saW5rVG9BZGRyZXNzTW9kYWwpIHtcbiAgICAgICAgICAgIHRoaXMubGlua1RvQWRkcmVzc01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZm9ybV9fYWN0aW9uIGpzLWZvcm0tcmVnaXN0ZXJfX3N1Ym1pdC1idXR0b24gZm9ybV9fYWN0aW9uLS1sb2dpbiBidXR0b24gYnV0dG9uLS1sYXJnZSBidXR0b24tLWV4cGFuZC10YWJsZXQnKVswXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmxpbmtUb0FkZHJlc3NNb2RhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJGb3JtYSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5rVG9BZGRyZXNzTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbEJ0biA9IHRoaXMuJHRoaXMuZmluZCh0aGlzLmdldENsb3NlQnV0dG9uU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLnN1Ym1pdFJlZ2lzdHJhdGlvbkZvcm1CdXR0b24gPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0U3VibWl0Rm9ybUJ1dHRvbik7XG4gICAgICAgIHRoaXMuY2FuY2VsUmVnaXN0cmF0aW9uRm9ybUJ1dHRvbiA9IHRoaXMuZmluZEVsZW1lbnQodGhpcy5nZXRDYW5jZWxSZWdpc3RlckJ1dHRvbik7XG4gICAgICAgIHRoaXMuJHJlZ2lzdHJhdGlvbkZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSh0aGlzLnJlZ2lzdGVyRm9ybSk7XG4gICAgICAgIHRoaXMuJGZpcnN0TmFtZSA9IHRoaXMuZmluZEVsZW1lbnQodGhpcy5nZXRGaXJzdE5hbWUpO1xuICAgICAgICB0aGlzLiRsYXN0TmFtZSA9IHRoaXMuZmluZEVsZW1lbnQodGhpcy5nZXRMYXN0TmFtZSk7XG4gICAgICAgIHRoaXMuJHN0cmVldE5hbWUgPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0U3RyZWV0KTtcbiAgICAgICAgdGhpcy4kaG91c2VOdW1iZXIgPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0SG91c2VOdW1iZXIpO1xuICAgICAgICB0aGlzLiR6aXAgPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0WmlwTnVtYmVyKTtcbiAgICAgICAgdGhpcy4kY2l0eSA9IHRoaXMuZmluZEVsZW1lbnQodGhpcy5nZXRDaXR5KTtcbiAgICAgICAgdGhpcy4kdXNlck5hbWVFbGVtZW50ID0gdGhpcy5maW5kRWxlbWVudCh0aGlzLmdldFVzZXJOYW1lKTtcbiAgICAgICAgdGhpcy4kdXNlclppcENpdHkgPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0VXNlclppcENpdHkpO1xuICAgICAgICB0aGlzLiR1c2VyU3RyZWV0SG91c2VObyA9IHRoaXMuZmluZEVsZW1lbnQodGhpcy5nZXRVc2VyU3RyZWV0SG91c2VObyk7XG4gICAgICAgIHRoaXMuJHVzZXJTdmcgPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0VXNlclN2Zyk7XG4gICAgICAgIHRoaXMuJGFwaU5hbWVFbGVtZW50ID0gdGhpcy5maW5kRWxlbWVudCh0aGlzLmdldEFwaU5hbWUpO1xuICAgICAgICB0aGlzLiRhcGlaaXBDaXR5ID0gdGhpcy5maW5kRWxlbWVudCh0aGlzLmdldEFwaVppcENpdHkpO1xuICAgICAgICB0aGlzLiRhcGlTdHJlZXRIb3VzZU5vID0gdGhpcy5maW5kRWxlbWVudCh0aGlzLmdldEFwaVN0cmVldEhvdXNlTm8pO1xuICAgICAgICB0aGlzLiRhcGlTdmcgPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0QXBpU3ZnKTtcbiAgICAgICAgdGhpcy4kdXNlckRpdiA9IHRoaXMuZmluZEVsZW1lbnQodGhpcy5nZXRVc2VyRGl2KTtcbiAgICAgICAgdGhpcy4kYXBpRGl2ID0gdGhpcy5maW5kRWxlbWVudCh0aGlzLmdldEFwaURpdik7XG4gICAgICAgIHRoaXMuJHVzZXJDaGVja2VkQ2lyY2xlV3JhcHBlciA9IHRoaXMuZmluZEVsZW1lbnQodGhpcy5nZXRVc2VyQ2lyY2xlV3JhcHBlcik7XG4gICAgICAgIHRoaXMuJGFwaUNoZWNrZWRDaXJjbGVXcmFwcGVyID0gdGhpcy5maW5kRWxlbWVudCh0aGlzLmdldEFwaUNpcmNsZVdyYXBwZXIpO1xuICAgICAgICB0aGlzLiRhcGlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldEFwaUJ1dHRvbik7XG4gICAgICAgIHRoaXMuJHVzZXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldFVzZXJCdXR0b24pO1xuXG4gICAgICAgIHRoaXMuJGVycm9yTWVzc2FnZVNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZXJyb3JNZXNzYWdlU3Bhbik7XG4gICAgICAgIHRoaXMuJGVycm9yRGl2QWJvdmVTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmVycm9yRGl2QWJvdmVTdWJtaXQpO1xuICAgICAgICB0aGlzLiRnbG9idXNDYXJkTnVtYmVyRmllbGQgPSB0aGlzLmZpbmRFbGVtZW50KHRoaXMuZ2V0TXlHbG9idXNDYXJkTnVtYmVyKTtcbiAgICAgICAgdGhpcy4kcmFkaW9CdXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUodGhpcy5nZXRSYWRpb0J1dHRvbnNOYW1lKTtcbiAgICAgICAgdGhpcy5oaWRkZW5NeUdsb2J1c0NhcmROdW1iZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVnaXN0ZXJGb3JtX215X2dsb2J1c19jYXJkX251bWJlcicpO1xuICAgICAgICB0aGlzLmhpZGRlbk15R2xvYnVzQ2FyZFR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVnaXN0ZXJGb3JtX2lzTXlHbG91YnNDYXJkVmFsaWQnKTtcbiAgICAgICAgdGhpcy5jaGVja2JveElzQWR2ZXJ0aXNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Noa19pc0FkdmVydGlzZSAuY2hlY2tib3hfX2lucHV0Jyk7XG4gICAgICAgIHRoaXMuaGlkZGVuSXNNZWluR2xvYnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JlZ2lzdGVyRm9ybV9pc01laW5HbG9idXMnKTtcbiAgICAgICAgdGhpcy4kbW9iaWxlUGhvbmVOdW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldE1vYmlsZVBob25lTnVtYmVyKTtcbiAgICAgICAgaWYgKCF0aGlzLiRtb2JpbGVQaG9uZU51bWJlcikge1xuICAgICAgICAgICAgdGhpcy4kbW9iaWxlUGhvbmVOdW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldE1vYmlsZVBob25lTnVtYmVyUmVnaXN0cmF0aW9uRm9ybSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kcGhvbmVOdW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldFBob25lTnVtYmVyKTtcbiAgICAgICAgaWYgKCF0aGlzLiRwaG9uZU51bWJlcikge1xuICAgICAgICAgICAgdGhpcy4kcGhvbmVOdW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldFBob25lTnVtYmVyUmVnaXN0cmF0aW9uRm9ybSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kY21iRGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXREYXkpO1xuICAgICAgICBpZiAoIXRoaXMuJGNtYkRheSkge1xuICAgICAgICAgICAgdGhpcy4kY21iRGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXREYXlSZWdpc3RyYXRpb25Gb3JtKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRjbWJNb250aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0TW9udGgpO1xuICAgICAgICBpZiAoIXRoaXMuJGNtYk1vbnRoKSB7XG4gICAgICAgICAgICB0aGlzLiRjbWJNb250aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0TW9udGhSZWdpc3RyYXRpb25Gb3JtKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRjbWJZZWFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRZZWFyKTtcbiAgICAgICAgaWYgKCF0aGlzLiRjbWJZZWFyKSB7XG4gICAgICAgICAgICB0aGlzLiRjbWJZZWFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRZZWFyUmVnaXN0cmF0aW9uRm9ybSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFycmF5V2l0aElucHV0RmllbGRzRm9yUmVnZXggPSBbdGhpcy4kZmlyc3ROYW1lLCB0aGlzLiRsYXN0TmFtZSwgdGhpcy4kc3RyZWV0TmFtZSwgdGhpcy4kaG91c2VOdW1iZXIsIHRoaXMuJGNpdHksIHRoaXMuJHppcCwgdGhpcy4kbW9iaWxlUGhvbmVOdW1iZXIsIHRoaXMuJHBob25lTnVtYmVyXTtcblxuICAgICAgICBhd2FpdCB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBtYXBFdmVudHMoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMubGlua1RvQWRkcmVzc01vZGFsICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICB0aGlzLmxpbmtUb0FkZHJlc3NNb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJHJhZGlvQnV0dG9uc1swXS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWlyZWRDYXJkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVpcmVkQ2FyZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXJyb3JMYWJlbHMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtcHR5RGl2RWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZUFwaUNvbnRlbnQoKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkc0NoZWNrZWQgPSBhd2FpdCB0aGlzLmNoZWNrSWZEYXRhSXNJbnB1dGVkKCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkc0NoZWNrZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZnRlckFwaUNhbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNsb3NlTW9kYWxCdG4gIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VNb2RhbEJ0bi5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbXB0eURpdkVsZW1lbnRzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN1Ym1pdFJlZ2lzdHJhdGlvbkZvcm1CdXR0b24gIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHRoaXMuc3VibWl0UmVnaXN0cmF0aW9uRm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdFJlZ2lzdHJhdGlvbkZvcm0oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtcHR5RGl2RWxlbWVudHMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FuY2VsUmVnaXN0cmF0aW9uRm9ybUJ1dHRvbiAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxSZWdpc3RyYXRpb25Gb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VNb2RhbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1wdHlEaXZFbGVtZW50cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLiR1c2VyQnV0dG9uICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICB0aGlzLiR1c2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZFVzZXJBZGRyZXNzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVVc2VyQ29udGVudCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZUFwaUNvbnRlbnQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy4kYXBpQnV0dG9uICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICB0aGlzLiRhcGlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkQXBpQWRkcmVzcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlQXBpQ29udGVudCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZVVzZXJDb250ZW50KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuJHVzZXJEaXYgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLiR1c2VyRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICB0aGlzLmZpbmRFbGVtZW50KCdoaWRTaG93U2NhbkFuZEdvJykudmFsdWUgPSBcIjBcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy4kYXBpRGl2ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy4kYXBpRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluZEVsZW1lbnQoJ2hpZFNob3dTY2FuQW5kR28nKS52YWx1ZSA9IFwiMVwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hvd01vZGFsKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuJHRoaXMuYWRkQ2xhc3ModGhpcy5zaG93Q2xhc3MpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbG9zZU1vZGFsKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuJHRoaXMucmVtb3ZlQ2xhc3ModGhpcy5zaG93Q2xhc3MpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZnRlckFwaUNhbGwoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zZW5kUmVxdWVzdFRvQWRkcmVzc0FQSSgpO1xuICAgICAgICB0aGlzLnNldFVzZXJBdHRyaWJ1dGVzVG9Nb2RhbCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkaXNhYmxlVXNlckNvbnRlbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuJHVzZXJDaGVja2VkQ2lyY2xlV3JhcHBlci5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0RGlzYWJsZUNpcmNsZVdyYXBwZXJDbGFzcyk7XG4gICAgICAgIHRoaXMuJHVzZXJOYW1lRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0RGlzYWJsZVRleHRDbGFzcyk7XG4gICAgICAgIHRoaXMuJHVzZXJaaXBDaXR5LmNsYXNzTGlzdC5hZGQodGhpcy5nZXREaXNhYmxlVGV4dENsYXNzKTtcbiAgICAgICAgdGhpcy4kdXNlclN0cmVldEhvdXNlTm8uY2xhc3NMaXN0LmFkZCh0aGlzLmdldERpc2FibGVUZXh0Q2xhc3MpO1xuXG4gICAgICAgIHRoaXMuJHVzZXJCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldFNlbGVjdGVkRGl2Q2xhc3MpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkaXNhYmxlQXBpQ29udGVudCgpOiB2b2lke1xuICAgICAgICB0aGlzLiRhcGlDaGVja2VkQ2lyY2xlV3JhcHBlci5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0RGlzYWJsZUNpcmNsZVdyYXBwZXJDbGFzcyk7XG4gICAgICAgIHRoaXMuJGFwaU5hbWVFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5nZXREaXNhYmxlVGV4dENsYXNzKTtcbiAgICAgICAgdGhpcy4kYXBpWmlwQ2l0eS5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0RGlzYWJsZVRleHRDbGFzcyk7XG4gICAgICAgIHRoaXMuJGFwaVN0cmVldEhvdXNlTm8uY2xhc3NMaXN0LmFkZCh0aGlzLmdldERpc2FibGVUZXh0Q2xhc3MpO1xuICAgICAgICB0aGlzLiRnbG9idXNDYXJkTnVtYmVyRmllbGQuY2xhc3NMaXN0LmFkZCh0aGlzLmdldERpc2FibGVUZXh0Q2xhc3MpO1xuXG4gICAgICAgIHRoaXMuJGFwaUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0U2VsZWN0ZWREaXZDbGFzcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGVuYWJsZVVzZXJDb250ZW50KCk6IHZvaWR7XG4gICAgICAgIHRoaXMuJHVzZXJDaGVja2VkQ2lyY2xlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0RGlzYWJsZUNpcmNsZVdyYXBwZXJDbGFzcyk7XG4gICAgICAgIHRoaXMuJHVzZXJOYW1lRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0RGlzYWJsZVRleHRDbGFzcyk7XG4gICAgICAgIHRoaXMuJHVzZXJaaXBDaXR5LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXREaXNhYmxlVGV4dENsYXNzKTtcbiAgICAgICAgdGhpcy4kdXNlclN0cmVldEhvdXNlTm8uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldERpc2FibGVUZXh0Q2xhc3MpO1xuXG4gICAgICAgIHRoaXMuJHVzZXJCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLmdldFNlbGVjdGVkRGl2Q2xhc3MpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBlbmFibGVBcGlDb250ZW50KCk6IHZvaWR7XG4gICAgICAgIHRoaXMuJGFwaUNoZWNrZWRDaXJjbGVXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXREaXNhYmxlQ2lyY2xlV3JhcHBlckNsYXNzKTtcbiAgICAgICAgdGhpcy4kYXBpTmFtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldERpc2FibGVUZXh0Q2xhc3MpO1xuICAgICAgICB0aGlzLiRhcGlaaXBDaXR5LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXREaXNhYmxlVGV4dENsYXNzKTtcbiAgICAgICAgdGhpcy4kYXBpU3RyZWV0SG91c2VOby5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0RGlzYWJsZVRleHRDbGFzcyk7XG5cbiAgICAgICAgdGhpcy4kYXBpQnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRTZWxlY3RlZERpdkNsYXNzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2xpY2tlZFVzZXJBZGRyZXNzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmaXJzdE5hbWUgPSB0aGlzLiR1c2VyRmlyc3ROYW1lVmFsdWU7XG4gICAgICAgIGNvbnN0IGxhc3ROYW1lID0gdGhpcy4kdXNlckxhc3ROYW1lVmFsdWU7XG4gICAgICAgIGNvbnN0IHN0cmVldCA9IHRoaXMuJHVzZXJTdHJlZXQ7XG4gICAgICAgIGNvbnN0IGNpdHkgPSB0aGlzLiR1c2VyQ2l0eTtcbiAgICAgICAgY29uc3QgemlwID0gdGhpcy4kdXNlclppcDtcbiAgICAgICAgY29uc3QgaG91c2VOdW1iZXIgPSB0aGlzLiR1c2VySG91c2VOdW1iZXI7XG4gICAgICAgIHRoaXMuYWRkVmFsdWVzVG9Gb3JtRWxlbWVudHMoZmlyc3ROYW1lLCBsYXN0TmFtZSwgc3RyZWV0LCBjaXR5LCB6aXAsIGhvdXNlTnVtYmVyKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2xpY2tlZEFwaUFkZHJlc3MoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IHRoaXMuJGFwaUZpcnN0TmFtZVZhbHVlO1xuICAgICAgICBjb25zdCBsYXN0TmFtZSA9IHRoaXMuJGFwaUxhc3ROYW1lVmFsdWU7XG4gICAgICAgIGNvbnN0IHN0cmVldCA9IHRoaXMuJGFwaVN0cmVldDtcbiAgICAgICAgY29uc3QgY2l0eSA9IHRoaXMuJGFwaUNpdHk7XG4gICAgICAgIGNvbnN0IHppcCA9IHRoaXMuJGFwaVppcDtcbiAgICAgICAgY29uc3QgaG91c2VOdW1iZXIgPSB0aGlzLiRhcGlIb3VzZU51bWJlcjtcbiAgICAgICAgdGhpcy5hZGRWYWx1ZXNUb0Zvcm1FbGVtZW50cyhmaXJzdE5hbWUsIGxhc3ROYW1lLCBzdHJlZXQsIGNpdHksIHppcCwgaG91c2VOdW1iZXIpO1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFkZFZhbHVlc1RvRm9ybUVsZW1lbnRzKGZpcnN0TmFtZSwgbGFzdE5hbWUsIHN0cmVldCwgY2l0eSwgemlwLCBob3VzZU51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuJGZpcnN0TmFtZS52YWx1ZSA9IGZpcnN0TmFtZTtcbiAgICAgICAgdGhpcy4kbGFzdE5hbWUudmFsdWUgPSBsYXN0TmFtZTtcbiAgICAgICAgdGhpcy4kc3RyZWV0TmFtZS52YWx1ZSA9IHN0cmVldDtcbiAgICAgICAgdGhpcy4kY2l0eS52YWx1ZSA9IGNpdHk7XG4gICAgICAgIHRoaXMuJHppcC52YWx1ZSA9IHppcDtcbiAgICAgICAgdGhpcy4kaG91c2VOdW1iZXIudmFsdWUgPSBob3VzZU51bWJlcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0VXNlckF0dHJpYnV0ZXNUb01vZGFsKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IHRoaXMuJGZpcnN0TmFtZTtcbiAgICAgICAgY29uc3QgbGFzdE5hbWUgPSB0aGlzLiRsYXN0TmFtZTtcbiAgICAgICAgY29uc3Qgc3RyZWV0ID0gdGhpcy4kc3RyZWV0TmFtZTtcbiAgICAgICAgY29uc3QgaG91c2VOdW1iZXIgPSB0aGlzLiRob3VzZU51bWJlcjtcbiAgICAgICAgY29uc3QgemlwID0gdGhpcy4kemlwO1xuICAgICAgICBjb25zdCBjaXR5ID0gdGhpcy4kY2l0eTtcblxuICAgICAgICB0aGlzLiR1c2VyRmlyc3ROYW1lVmFsdWUgPSBmaXJzdE5hbWUudmFsdWU7XG4gICAgICAgIHRoaXMuJHVzZXJMYXN0TmFtZVZhbHVlID0gbGFzdE5hbWUudmFsdWU7XG4gICAgICAgIHRoaXMuJHVzZXJDaXR5ID0gY2l0eS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXNlclppcCA9IHppcC52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXNlckhvdXNlTnVtYmVyID0gaG91c2VOdW1iZXIudmFsdWU7XG4gICAgICAgIHRoaXMuJHVzZXJTdHJlZXQgPSBzdHJlZXQudmFsdWU7XG5cbiAgICAgICAgdGhpcy4kdXNlck5hbWVFbGVtZW50LmFwcGVuZChmaXJzdE5hbWUudmFsdWUgKyAnICcgKyBsYXN0TmFtZS52YWx1ZSk7XG4gICAgICAgIHRoaXMuJHVzZXJaaXBDaXR5LmFwcGVuZCh6aXAudmFsdWUgKyAnICcgKyBjaXR5LnZhbHVlKTtcbiAgICAgICAgdGhpcy4kdXNlclN0cmVldEhvdXNlTm8uYXBwZW5kKHN0cmVldC52YWx1ZSArICcgJyArIGhvdXNlTnVtYmVyLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0QXBpQXR0cmlidXRlc01vZGFsKGZpcnN0TmFtZSwgbGFzdE5hbWUsIHN0cmVldCwgaG91c2VOdW1iZXIsIHppcCwgY2l0eSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuJGFwaU5hbWVFbGVtZW50LmFwcGVuZChmaXJzdE5hbWUgKyAnICcgKyBsYXN0TmFtZSk7XG4gICAgICAgIHRoaXMuJGFwaVppcENpdHkuYXBwZW5kKHppcCArICcgJyArIGNpdHkpO1xuICAgICAgICB0aGlzLiRhcGlTdHJlZXRIb3VzZU5vLmFwcGVuZChzdHJlZXQgKyAnICcgKyBob3VzZU51bWJlcik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGVtcHR5RGl2RWxlbWVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuJHVzZXJOYW1lRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy4kdXNlclppcENpdHkuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuJHVzZXJTdHJlZXRIb3VzZU5vLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLiRhcGlOYW1lRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy4kYXBpWmlwQ2l0eS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy4kYXBpU3RyZWV0SG91c2VOby5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy4kZ2xvYnVzQ2FyZE51bWJlckZpZWxkLmlubmVySFRNTCA9ICcnO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdWJtaXRSZWdpc3RyYXRpb25Gb3JtKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuY2hlY2tvdXRTdGVwKCdsb2dpbicpO1xuICAgICAgICB0aGlzLmNoZWNrb3V0U3RlcCgncGljay11cCBzdGF0aW9uJyk7XG4gICAgICAgIHRoaXMuJHJlZ2lzdHJhdGlvbkZvcm1bMF0uc3VibWl0KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIHNlbmRSZXF1ZXN0VG9BZGRyZXNzQVBJKCk6IFByb21pc2UgPHZvaWQ+XG4gICAge1xuICAgICAgICBjb25zdCBmaXJzdE5hbWUgPSB0aGlzLiRmaXJzdE5hbWU7XG4gICAgICAgIGNvbnN0IGxhc3ROYW1lID0gdGhpcy4kbGFzdE5hbWU7XG4gICAgICAgIGNvbnN0IHN0cmVldCA9IHRoaXMuJHN0cmVldE5hbWU7XG4gICAgICAgIGNvbnN0IGhvdXNlTnVtYmVyID0gdGhpcy4kaG91c2VOdW1iZXI7XG4gICAgICAgIGNvbnN0IHppcCA9IHRoaXMuJHppcDtcbiAgICAgICAgY29uc3QgY2l0eSA9IHRoaXMuJGNpdHk7XG4gICAgICAgIGNvbnN0IHdlID0gdGhpcy5jaGVja2JveElzQWR2ZXJ0aXNlO1xuICAgICAgICBjb25zdCBtZWluR2xvYnVzID0gdGhpcy5oaWRkZW5Jc01laW5HbG9idXM7XG5cbiAgICAgICAgY29uc3QgdXJsID0gJy9yZWdpc3Rlci9jdXN0b21lci1hZGRyZXNzLWFwaSc7XG5cbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpcnN0TmFtZScsIGZpcnN0TmFtZS52YWx1ZSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbGFzdE5hbWUnLCBsYXN0TmFtZS52YWx1ZSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnc3RyZWV0Jywgc3RyZWV0LnZhbHVlKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdob3VzZU51bWJlcicsIGhvdXNlTnVtYmVyLnZhbHVlKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd6aXAnLCB6aXAudmFsdWUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2NpdHknLCBjaXR5LnZhbHVlKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd3ZScsIHdlLmNoZWNrZWQpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ21laW5HbG9idXMnLCBtZWluR2xvYnVzLmNoZWNrZWQpO1xuXG4gICAgICAgIGZldGNoKHVybCxcbiAgICAgICAgICAgIHsgbWV0aG9kOiAnUE9TVCcsIGJvZHk6IGZvcm1EYXRhIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihwYXJzZWRSZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYocGFyc2VkUmVzcG9uc2UgIT0gdW5kZWZpbmVkICYmIHBhcnNlZFJlc3BvbnNlICE9PSBbXSl7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYocGFyc2VkUmVzcG9uc2Uuc2hvd092ZXJsYXkgPT09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDb250ZW50VG9Nb2RhbChwYXJzZWRSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dNb2RhbCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWRTaG93U2NhbkFuZEdvXCIpLnZhbHVlID0gXCIyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5RGl2RWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0UmVnaXN0cmF0aW9uRm9ybSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHt9KTtcblxuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBjYWxsQ2FyZE51bWJlckNoZWNrQVBJKGNhcmROdW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL3JlZ2lzdGVyL2NoZWNrLWNhcmQtbnVtYmVyJztcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgbGV0IGRhdGFUb1NlbmQ7XG5cbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdpZCcsIGNhcmROdW1iZXIpO1xuXG4gICAgICAgIGF3YWl0IGZldGNoKHVybCxcbiAgICAgICAgICAgIHsgbWV0aG9kOiAnUE9TVCcsIGJvZHk6IGZvcm1EYXRhIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihwYXJzZWRSZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlZFJlc3BvbnNlICE9IHVuZGVmaW5lZCAmJiBwYXJzZWRSZXNwb25zZSAhPT0gW10pe1xuICAgICAgICAgICAgICAgICAgICBkYXRhVG9TZW5kID0gcGFyc2VkUmVzcG9uc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFUb1NlbmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGF0YVRvU2VuZDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0QWdlRGlmZmVyZW5jZSgpe1xuICAgICAgICBsZXQgZGF0ZUZyb21JbnB1dCA9IG5ldyBEYXRlKHRoaXMuJGNtYlllYXIudmFsdWUsICh0aGlzLiRjbWJNb250aC52YWx1ZS0xKSwgdGhpcy4kY21iRGF5LnZhbHVlKTtcbiAgICAgICAgbGV0IHNpeHRlZW5ZZWFyc0FnbyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHNpeHRlZW5ZZWFyc0Fnby5zZXRUaW1lKHNpeHRlZW5ZZWFyc0Fnby52YWx1ZU9mKCkgLSAxNiAqIDM2NS4yNSAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuICAgICAgICB0aGlzLmFnZURpZmYgPSBzaXh0ZWVuWWVhcnNBZ28gPCBkYXRlRnJvbUlucHV0O1xuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIGNoZWNrSWZEYXRhSXNJbnB1dGVkKCl7XG4gICAgICAgIGxldCBmbGFnID0gMDtcblxuICAgICAgICB0aGlzLmdldEFnZURpZmZlcmVuY2UoKTtcblxuICAgICAgICBpZiAodGhpcy5hZ2VEaWZmKSB7XG4gICAgICAgICAgICB0aGlzLiRjbWJZZWFyLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yLWJpcnRoZGF5Jyk7XG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiRjbWJZZWFyLnBhcmVudE5vZGUucGFyZW50Tm9kZSwgNSk7XG4gICAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLiRmaXJzdE5hbWUudmFsdWUgPT09ICcnIHx8IHRoaXMuJGZpcnN0TmFtZS52YWx1ZSA9PT0gbnVsbCl7XG4gICAgICAgICAgICB0aGlzLiRmaXJzdE5hbWUuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yJyk7XG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiRmaXJzdE5hbWUpO1xuICAgICAgICAgICAgZmxhZyA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kbGFzdE5hbWUudmFsdWUgPT09ICcnIHx8IHRoaXMuJGxhc3ROYW1lLnZhbHVlID09PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuJGxhc3ROYW1lLmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICAgICAgdGhpcy5hZGRFcnJvck1lc3NhZ2VUb1RoZUlucHV0RmllbGQodGhpcy4kbGFzdE5hbWUpO1xuICAgICAgICAgICAgZmxhZyA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kc3RyZWV0TmFtZS52YWx1ZSA9PT0gJycgfHwgdGhpcy4kc3RyZWV0TmFtZS52YWx1ZSA9PT0gbnVsbCl7XG4gICAgICAgICAgICB0aGlzLiRzdHJlZXROYW1lLmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICAgICAgdGhpcy5hZGRFcnJvck1lc3NhZ2VUb1RoZUlucHV0RmllbGQodGhpcy4kc3RyZWV0TmFtZSk7XG4gICAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLiRob3VzZU51bWJlci52YWx1ZSA9PT0gJycgfHwgdGhpcy4kaG91c2VOdW1iZXIudmFsdWUgPT09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy4kaG91c2VOdW1iZXIuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yJyk7XG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiRob3VzZU51bWJlcik7XG4gICAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWdleE51bWJlcnMgPSBuZXcgUmVnRXhwKC9eWzAtOV0qJC8sICdnJyk7XG4gICAgICAgIHZhciBpc051bWJlcnNPbmx5ID0gcmVnZXhOdW1iZXJzLnRlc3QodGhpcy4kemlwLnZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMuJHppcC52YWx1ZSA9PT0gJycgfHwgdGhpcy4kemlwLnZhbHVlID09PSBudWxsKXtcbiAgICAgICAgICAgICQoXCIjcmVnaXN0ZXJGb3JtX2N1c3RvbWVyX3ppcF9jb2RlXCIpLnBhcmVudChcIi5mb3JtX19maWVsZFwiKS5jaGlsZHJlbihcIi5lcnJvclZhbGlkYXRpb25NZXNzYWdlXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy4kemlwLmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICAgICAgZmxhZyA9IDE7XG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiR6aXAsIDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuJGNpdHkudmFsdWUgPT09ICcnIHx8IHRoaXMuJGNpdHkudmFsdWUgPT09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy4kY2l0eS5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JNZXNzYWdlVG9UaGVJbnB1dEZpZWxkKHRoaXMuJGNpdHkpO1xuICAgICAgICAgICAgZmxhZyA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHRoaXMuJG1vYmlsZVBob25lTnVtYmVyLnZhbHVlID09PSAnJyB8fCB0aGlzLiRtb2JpbGVQaG9uZU51bWJlci52YWx1ZSA9PT0gbnVsbCkgJiYgKHRoaXMuJHBob25lTnVtYmVyLnZhbHVlID09PSAnJyB8fCB0aGlzLiRwaG9uZU51bWJlci52YWx1ZSA9PT0gbnVsbCkpe1xuICAgICAgICAgICAgdGhpcy4kbW9iaWxlUGhvbmVOdW1iZXIuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yJyk7XG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiRtb2JpbGVQaG9uZU51bWJlcik7XG4gICAgICAgICAgICB0aGlzLiRwaG9uZU51bWJlci5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JNZXNzYWdlVG9UaGVJbnB1dEZpZWxkKHRoaXMuJHBob25lTnVtYmVyKTtcbiAgICAgICAgICAgIGZsYWcgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVnZXhDaGVjayA9IG5ldyBSZWdFeHAoL15bXjw+O1wiXSskLyk7XG4gICAgICAgIHRoaXMuYXJyYXlXaXRoSW5wdXRGaWVsZHNGb3JSZWdleC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0udmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChyZWdleENoZWNrLnRlc3QoaXRlbS52YWx1ZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUmVnZXhFcnJvck1lc3NhZ2VUb1RoZUZpZWxkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICgkKHRoaXMuJGNtYkRheSkudmFsKCkgPT09ICcnIHx8ICQodGhpcy4kY21iRGF5KS52YWwoKSA9PT0gbnVsbFxuICAgICAgICAgICAgfHwgJCh0aGlzLiRjbWJNb250aCkudmFsKCkgPT09ICcnIHx8ICQodGhpcy4kY21iTW9udGgpLnZhbCgpID09PSBudWxsXG4gICAgICAgICAgICB8fCAkKHRoaXMuJGNtYlllYXIpLnZhbCgpID09PSAnJyB8fCAkKHRoaXMuJGNtYlllYXIpLnZhbCgpID09PSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzLiRjbWJEYXkpLnZhbCgpID09PSAnJykge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNtYkRheS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1lcnJvci1iaXJ0aGRheScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCQodGhpcy4kY21iTW9udGgpLnZhbCgpID09PSAnJykge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNtYk1vbnRoLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yLWJpcnRoZGF5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJCh0aGlzLiRjbWJZZWFyKS52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRjbWJZZWFyLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yLWJpcnRoZGF5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiRjbWJZZWFyLnBhcmVudE5vZGUucGFyZW50Tm9kZSwgMyk7XG4gICAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlcXVpcmVkQ2FyZCkge1xuICAgICAgICAgICAgY29uc3QgY2FyZE51bWJlciA9ICQodGhpcy4kZ2xvYnVzQ2FyZE51bWJlckZpZWxkKS52YWwoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLiRnbG9idXNDYXJkTnVtYmVyRmllbGQudmFsdWUgPT09ICcnIHx8IHRoaXMuJGdsb2J1c0NhcmROdW1iZXJGaWVsZC52YWx1ZSA9PT0gbnVsbCkge1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmROdW1iZXJBZnRlciA9IGF3YWl0IHRoaXMuY2FsbENhcmROdW1iZXJDaGVja0FQSShjYXJkTnVtYmVyKTtcbiAgICAgICAgICAgICAgICBpZiAoY2FyZE51bWJlckFmdGVyICE9PSAndXNlZF9jYXJkX2Vycm9yJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbk15R2xvYnVzQ2FyZE51bWJlci52YWx1ZSA9IGNhcmROdW1iZXJBZnRlclt0aGlzLmNhcmRLZXldO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbk15R2xvYnVzQ2FyZFR5cGUudmFsdWUgPSBjYXJkTnVtYmVyQWZ0ZXJbdGhpcy5pc1BoeXNpY2FsS2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRnbG9idXNDYXJkTnVtYmVyRmllbGQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ2xvYnVzQ2FyZE51bWJlckZpZWxkLmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiRnbG9idXNDYXJkTnVtYmVyRmllbGQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBmbGFnID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuJHJhZGlvQnV0dG9uc1sxXS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcmFkaW9CdXR0b25zWzBdLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yTWVzc2FnZVRvVGhlSW5wdXRGaWVsZCh0aGlzLiRyYWRpb0J1dHRvbnNbMF0ucGFyZW50Tm9kZS5wYXJlbnROb2RlLCAyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZsYWdSYWRpbyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZmxhZyA9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZmxhZ1JhZGlvID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmbGFnID09PSAwKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGRFcnJvck1lc3NhZ2VUb1RoZVN1Ym1pdEJ1dHRvbigpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlRXJyb3JMYWJlbHMoKTogdm9pZHtcbiAgICAgICAgdGhpcy4kZmlyc3ROYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICB0aGlzLiRsYXN0TmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgdGhpcy4kc3RyZWV0TmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgdGhpcy4kaG91c2VOdW1iZXIuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtLWVycm9yJyk7XG4gICAgICAgIHRoaXMuJHppcC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgdGhpcy4kY2l0eS5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgdGhpcy4kbW9iaWxlUGhvbmVOdW1iZXIuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtLWVycm9yJyk7XG4gICAgICAgIHRoaXMuJHBob25lTnVtYmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICB0aGlzLiRyYWRpb0J1dHRvbnNbMF0ucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1lcnJvcicpO1xuICAgICAgICB0aGlzLiRjbWJEYXkucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3ItYmlydGhkYXknKTtcbiAgICAgICAgdGhpcy4kY21iTW9udGgucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3ItYmlydGhkYXknKTtcbiAgICAgICAgdGhpcy4kY21iWWVhci5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1lcnJvci1iaXJ0aGRheScpO1xuXG4gICAgICAgIGlmICh0aGlzLiRnbG9idXNDYXJkTnVtYmVyRmllbGQuY2xhc3NMaXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuJGdsb2J1c0NhcmROdW1iZXJGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGVycm9yRGl2QWJvdmVTdWJtaXRCdXR0b24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdlcnJvclN1Ym1pdE1lc3NhZ2UnKTtcbiAgICAgICAgdGhpcy4kZXJyb3JEaXZBYm92ZVN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgICAgIGlmICh0aGlzLiRlcnJvck1lc3NhZ2VTcGFuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy4kZXJyb3JNZXNzYWdlU3Bhbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRlcnJvck1lc3NhZ2VTcGFuW2ldLnBhcmVudE5vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlcnJvck1lc3NhZ2VTcGFuW2ldLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVzaW5nIGZsYWdzIGZvciBkaWZmZXJlbnQgY2FzZXMgLT4gMCA9IG5vcm1hbCBjYXNlLCAxID0gY2FyZF9udW1iZXJfZXJyb3IsIDIgPSByYWRpbyBidXR0b24gZXJyb3IgbWVzc2FnZVxuICAgIHByb3RlY3RlZCBhZGRFcnJvck1lc3NhZ2VUb1RoZUlucHV0RmllbGQoZWxlbWVudCwgZmxhZzogbnVtYmVyID0gMCk6IHZvaWR7XG4gICAgICAgIGNvbnN0IGVycm9yU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgZXJyb3JTcGFuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZXJyb3JWYWxpZGF0aW9uTWVzc2FnZScpO1xuICAgICAgICBpZiAoZmxhZyA9PT0gMSkge1xuICAgICAgICAgICAgZXJyb3JTcGFuLnRleHRDb250ZW50ID0gJ+KAoiBEaWVzZSBLYXJ0ZW5udW1tZXIgaXN0IGJlcmVpdHMgYW5nZWxlZ3QuIEJpdHRlIGxvZ2dlbiBTaWUgc2ljaCBtaXQgSWhyZW0gUGFzc3dvcnQgZWluLic7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLnBhcmVudCgpLmFwcGVuZChlcnJvclNwYW4pO1xuICAgICAgICB9IGVsc2UgaWYgKGZsYWcgPT09IDIpIHtcbiAgICAgICAgICAgIGVycm9yU3Bhbi50ZXh0Q29udGVudCA9ICfigKIgTWluZGVzdGVucyBlaW5lIEFuZ2FiZSBpc3QgUGZsaWNodC4nO1xuICAgICAgICAgICAgJChlbGVtZW50KS5wYXJlbnQoKS5hcHBlbmQoZXJyb3JTcGFuKTtcbiAgICAgICAgfSBlbHNlIGlmIChmbGFnID09PSAzKSB7XG4gICAgICAgICAgICBlcnJvclNwYW4udGV4dENvbnRlbnQgPSAn4oCiIERpZXNlcyBGZWxkZXIgc29sbHRlIG5pY2h0IGxlZXIgc2Vpbic7XG4gICAgICAgICAgICBlcnJvclNwYW4uY2xhc3NMaXN0LmFkZCgnZm9ybV9fZmllbGQnLCAnY29sJywgJ2NvbC0tb3JkZXItNCcsICdjb2wtLXNtLTEyJywgJ2NvbC0tbWQtMTInKTtcbiAgICAgICAgICAgICQoZWxlbWVudCkucGFyZW50KCkuYXBwZW5kKGVycm9yU3Bhbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmxhZyA9PT0gNCkge1xuICAgICAgICAgICAgZXJyb3JTcGFuLnRleHRDb250ZW50ID0gJ+KAoiBCaXR0ZSBlaW5lIDUtc3RlbGxpZ2UgUExaIGVpbmdlYmVuLic7XG4gICAgICAgICAgICBlcnJvclNwYW4uY2xhc3NMaXN0LmFkZCgnZm9ybV9fZmllbGQnLCAnY29sJywgJ2NvbC0tb3JkZXItNCcsICdjb2wtLXNtLTEyJywgJ2NvbC0tbWQtMTInKTtcbiAgICAgICAgICAgICQoZWxlbWVudCkucGFyZW50KCkuYXBwZW5kKGVycm9yU3Bhbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmxhZyA9PT0gNSkge1xuICAgICAgICAgICAgZXJyb3JTcGFuLnRleHRDb250ZW50ID0gJ+KAoiBTaWUgbcO8c3NlbiBtaW5kZXN0ZW5zIDE2IEphaHJlIGFsdCBzZWluLic7XG4gICAgICAgICAgICBlcnJvclNwYW4uc3R5bGUudGV4dEFsaWduID0gXCJyaWdodFwiO1xuICAgICAgICAgICAgZXJyb3JTcGFuLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fX2ZpZWxkJywgJ2NvbCcsICdjb2wtLW9yZGVyLTQnLCAnY29sLS1zbS0xMicsICdjb2wtLW1kLTEyJyk7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLnBhcmVudCgpLmFwcGVuZChlcnJvclNwYW4pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXJyb3JTcGFuLnRleHRDb250ZW50ID0gJ+KAoiBEaWVzZXMgRmVsZCBzb2xsdGUgbmljaHQgbGVlciBzZWluJztcbiAgICAgICAgICAgICQoZWxlbWVudCkucGFyZW50KCkuYXBwZW5kKGVycm9yU3Bhbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWRkRXJyb3JNZXNzYWdlVG9UaGVTdWJtaXRCdXR0b24oKTogdm9pZHtcbiAgICAgICAgaWYgKHRoaXMucmVnaXN0ZXJGb3JtYSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgZXJyb3JTcGFuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZXJyb3JWYWxpZGF0aW9uTWVzc2FnZScpO1xuICAgICAgICAgICAgJChlcnJvclNwYW4pLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICQoZXJyb3JTcGFuKS5jc3MoJ21hcmdpbi1ib3R0b20nLCAnNDVweCcpO1xuICAgICAgICAgICAgZXJyb3JTcGFuLnRleHRDb250ZW50ID0gJ0JpdHRlIGbDvGxsZW4gU2llIGRpZSBQZmxpY2h0ZmVsZGVyIGF1cy4nO1xuICAgICAgICAgICAgaWYodGhpcy5yZWdpc3RlckZvcm1hID09IHRydWUgJiYgdGhpcy5hZ2VEaWZmID09IHRydWUgJiYgdGhpcy5mbGFnUmFkaW8gPT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIGVycm9yU3Bhbi50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5saW5rVG9BZGRyZXNzTW9kYWwucGFyZW50Tm9kZS5wcmVwZW5kKGVycm9yU3Bhbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRlcnJvckRpdkFib3ZlU3VibWl0QnV0dG9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZXJyb3JTdWJtaXRNZXNzYWdlJyk7XG4gICAgICAgICAgICB0aGlzLiRlcnJvckRpdkFib3ZlU3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0JpdHRlIGbDvGxsZW4gU2llIGRpZSBQZmxpY2h0ZmVsZGVyIGF1cy4nO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWRkUmVnZXhFcnJvck1lc3NhZ2VUb1RoZUZpZWxkKGVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXJyb3JTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBlcnJvclNwYW4uc2V0QXR0cmlidXRlKCdjbGFzcycsICdlcnJvclZhbGlkYXRpb25NZXNzYWdlJyk7XG4gICAgICAgIGVycm9yU3Bhbi50ZXh0Q29udGVudCA9ICfigKIgRmFsc2NoIGVpbmdlZ2ViZW5lIERhdGVuJztcbiAgICAgICAgZXJyb3JTcGFuLmNsYXNzTGlzdC5hZGQoJ2Zvcm1fX2ZpZWxkJywgJ2NvbCcsICdjb2wtLW9yZGVyLTQnLCAnY29sLS1zbS0xMicsICdjb2wtLW1kLTEyJyk7XG4gICAgICAgICQoZWxlbWVudCkucGFyZW50KCkuYXBwZW5kKGVycm9yU3Bhbik7XG4gICAgfVxuXG5cbiAgICBwcm90ZWN0ZWQgYWRkQ29udGVudFRvTW9kYWwoZGF0YSk6IHZvaWR7XG4gICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGRhdGEucmVzdWx0LmZpcnN0TmFtZTtcbiAgICAgICAgY29uc3QgbGFzdE5hbWUgPSBkYXRhLnJlc3VsdC5sYXN0TmFtZTtcbiAgICAgICAgY29uc3QgemlwID0gZGF0YS5yZXN1bHQuYWRkcmVzcy56aXA7XG4gICAgICAgIGNvbnN0IGhvdXNlTnVtYmVyID0gZGF0YS5yZXN1bHQuYWRkcmVzcy5ob3VzZU5vO1xuICAgICAgICBjb25zdCBzdHJlZXQgPSBkYXRhLnJlc3VsdC5hZGRyZXNzLnN0cmVldDtcbiAgICAgICAgY29uc3QgY2l0eSA9IGRhdGEucmVzdWx0LmFkZHJlc3MuY2l0eTtcblxuICAgICAgICB0aGlzLiRhcGlGaXJzdE5hbWVWYWx1ZSA9IGZpcnN0TmFtZTtcbiAgICAgICAgdGhpcy4kYXBpTGFzdE5hbWVWYWx1ZSA9IGxhc3ROYW1lO1xuICAgICAgICB0aGlzLiRhcGlTdHJlZXQgPSBzdHJlZXQ7XG4gICAgICAgIHRoaXMuJGFwaUhvdXNlTnVtYmVyID0gaG91c2VOdW1iZXI7XG4gICAgICAgIHRoaXMuJGFwaUNpdHkgPSBjaXR5O1xuICAgICAgICB0aGlzLiRhcGlaaXAgPSB6aXA7XG5cbiAgICAgICAgdGhpcy5zZXRBcGlBdHRyaWJ1dGVzTW9kYWwoZmlyc3ROYW1lLCBsYXN0TmFtZSwgc3RyZWV0LCBob3VzZU51bWJlciwgemlwLCBjaXR5KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZmluZEVsZW1lbnQobmFtZTpzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hbWUpO1xuICAgICAgICBpZighZWwpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoJ3JlZ2lzdGVyRm9ybV9jdXN0b21lcl8nLCAncmVnaXN0ZXJGb3JtXycpO1xuICAgICAgICAgICAgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0U3RlcChvcHRpb24pXG4gICAge1xuICAgICAgICB3aW5kb3cuZGF0YUxheWVyLnB1c2goe1xuICAgICAgICAgICAgJ2V2ZW50JzogJ2VlYy5jaGVja291dCcsXG4gICAgICAgICAgICAnZWNvbW1lcmNlJzpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICdjaGVja291dCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FjdGlvbkZpZWxkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0ZXAnOiAnMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb3B0aW9uJzogb3B0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBnZXRMaW5rVG9BZGRyZXNzTW9kYWwoKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gJ2xpbmstdG8tYWRkcmVzcy1tb2RhbCc7XG4gICAgfVxuXG4gICAgZ2V0IGdldENsb3NlQnV0dG9uU2VsZWN0b3IoKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gYC4ke3RoaXMubmFtZX1fX2Nsb3NlYDtcbiAgICB9XG5cbiAgICBnZXQgc2hvd0NsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9LS1zaG93YDtcbiAgICB9XG5cbiAgICBnZXQgZ2V0Q2FuY2VsUmVnaXN0ZXJCdXR0b24oKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gJ2J1dHRvbi1jYW5jZWwtcmVnaXN0cmF0aW9uJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0U3VibWl0Rm9ybUJ1dHRvbigpOiBzdHJpbmd7XG4gICAgICAgIHJldHVybiAnaWQtc3VibWl0LXJlZ2lzdHJhdGlvbi11c2VyJztcbiAgICB9XG5cbiAgICBnZXQgcmVnaXN0ZXJGb3JtKCl7XG4gICAgICAgIHJldHVybiAncmVnaXN0ZXJGb3JtJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0Rmlyc3ROYW1lKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fY3VzdG9tZXJfZmlyc3RfbmFtZSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldExhc3ROYW1lKCk6IHN0cmluZyAge1xuICAgICAgICByZXR1cm4gJ3JlZ2lzdGVyRm9ybV9jdXN0b21lcl9sYXN0X25hbWUnO1xuICAgIH1cblxuICAgIGdldCBnZXRTdHJlZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fY3VzdG9tZXJfYWRkcmVzczEnO1xuICAgIH1cblxuICAgIGdldCBnZXRIb3VzZU51bWJlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ3JlZ2lzdGVyRm9ybV9jdXN0b21lcl9hZGRyZXNzMic7XG4gICAgfVxuXG4gICAgZ2V0IGdldFppcE51bWJlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ3JlZ2lzdGVyRm9ybV9jdXN0b21lcl96aXBfY29kZSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldENpdHkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fY3VzdG9tZXJfY2l0eSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldFVzZXJOYW1lKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICd1c2VyX25hbWVfYW5kX3N1cm5hbWUnO1xuICAgIH1cblxuICAgIGdldCBnZXRVc2VyWmlwQ2l0eSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ3VzZXJfemlwX2NpdHknO1xuICAgIH1cblxuICAgIGdldCBnZXRVc2VyU3RyZWV0SG91c2VObygpOiBzdHJpbmd7XG4gICAgICAgIHJldHVybiAndXNlcl9zdHJlZXRfaG91c2VObyc7XG4gICAgfVxuXG4gICAgZ2V0IGdldFVzZXJTdmcoKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gJ3VzZXJfc3ZnX2ljb24nO1xuICAgIH1cblxuICAgIGdldCBnZXRBcGlOYW1lKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICdhcGlfbmFtZV9hbmRfc3VybmFtZSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldEFwaVppcENpdHkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdhcGlfemlwX2NpdHknO1xuICAgIH1cblxuICAgIGdldCBnZXRBcGlTdHJlZXRIb3VzZU5vKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICdhcGlfc3RyZWV0X2hvdXNlTm8nO1xuICAgIH1cblxuICAgIGdldCBnZXRBcGlTdmcoKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gJ2FwaV9zdmdfaWNvbic7XG4gICAgfVxuXG4gICAgZ2V0IGdldEFwaURpdigpOiBzdHJpbmd7XG4gICAgICAgIHJldHVybiAnbGVmdC1zaWRlJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0VXNlckRpdigpOiBzdHJpbmd7XG4gICAgICAgIHJldHVybiAncmlnaHQtc2lkZSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldFVzZXJDaXJjbGVXcmFwcGVyKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICd1c2VyX2NpcmNsZV9jbGFzcyc7XG4gICAgfVxuXG4gICAgZ2V0IGdldEFwaUNpcmNsZVdyYXBwZXIoKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gJ2FwaV9jaXJjbGVfY2xhc3MnO1xuICAgIH1cblxuICAgIGdldCBnZXREaXNhYmxlQ2lyY2xlV3JhcHBlckNsYXNzKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICdwb3B1cC11aS1hZGRyZXNzLXZhbGlkYXRpb25fX2Rpc2FibGVkQ2lyY2xlJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0RGlzYWJsZVRleHRDbGFzcygpOiBzdHJpbmd7XG4gICAgICAgIHJldHVybiAncG9wdXAtdWktYWRkcmVzcy12YWxpZGF0aW9uX19kaXNhYmxlZFRleHQnO1xuICAgIH1cblxuICAgIGdldCBnZXRTZWxlY3RlZERpdkNsYXNzKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICdzZWxlY3RlZC1kaXYnO1xuICAgIH1cblxuICAgIGdldCBnZXRBcGlCdXR0b24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdhcGlfYnV0dG9uX2NvbnRlbnQnO1xuICAgIH1cblxuICAgIGdldCBnZXRVc2VyQnV0dG9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAndXNlcl9idXR0b25fY29udGVudCc7XG4gICAgfVxuXG4gICAgZ2V0IGVycm9yTWVzc2FnZVNwYW4oKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gJ2Vycm9yVmFsaWRhdGlvbk1lc3NhZ2UnO1xuICAgIH1cblxuICAgIGdldCBlcnJvckRpdkFib3ZlU3VibWl0KCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICdlcnJvck1lc3NhZ2VBYm92ZVN1Ym1pdEJ1dHRvbic7XG4gICAgfVxuXG4gICAgZ2V0IGdldE15R2xvYnVzQ2FyZE51bWJlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ215R2xvYnVzQ2FyZE51bWJlcic7XG4gICAgfVxuXG4gICAgZ2V0IGdldFJhZGlvQnV0dG9uc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyYWRpb19rdW5kZW5rYXJ0ZSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldE1vYmlsZVBob25lTnVtYmVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAncmVnaXN0ZXJGb3JtX2N1c3RvbWVyX21vYmlsZV9waG9uZV9udW1iZXInO1xuICAgIH1cblxuICAgIGdldCBnZXRNb2JpbGVQaG9uZU51bWJlclJlZ2lzdHJhdGlvbkZvcm0oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fbW9iaWxlX3Bob25lX251bWJlcic7XG4gICAgfVxuXG4gICAgZ2V0IGdldFBob25lTnVtYmVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAncmVnaXN0ZXJGb3JtX2N1c3RvbWVyX3Bob25lJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0UGhvbmVOdW1iZXJSZWdpc3RyYXRpb25Gb3JtKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAncmVnaXN0ZXJGb3JtX3Bob25lJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0RGF5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAncmVnaXN0ZXJGb3JtX2N1c3RvbWVyX2JpcnRoX2RheSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldERheVJlZ2lzdHJhdGlvbkZvcm0oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fYmlydGhfZGF5JztcbiAgICB9XG5cbiAgICBnZXQgZ2V0TW9udGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fY3VzdG9tZXJfYmlydGhfbW9udGgnO1xuICAgIH1cblxuICAgIGdldCBnZXRNb250aFJlZ2lzdHJhdGlvbkZvcm0oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdyZWdpc3RlckZvcm1fYmlydGhfbW9udGgnO1xuICAgIH1cblxuICAgIGdldCBnZXRZZWFyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAncmVnaXN0ZXJGb3JtX2N1c3RvbWVyX2JpcnRoX3llYXInO1xuICAgIH1cblxuICAgIGdldCBnZXRZZWFyUmVnaXN0cmF0aW9uRm9ybSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ3JlZ2lzdGVyRm9ybV9iaXJ0aF95ZWFyJztcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9