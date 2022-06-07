(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[36],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/popup-ui-login-form/popup-ui-login-form.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/popup-ui-login-form/popup-ui-login-form.ts ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PopupUiLoginForm; });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7__);







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var PopupUiLoginForm = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(PopupUiLoginForm, _Component);

  var _super = _createSuper(PopupUiLoginForm);

  function PopupUiLoginForm() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "$this", jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "linkToLoginModal", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "linkToLoginModalMobile", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "closeModalBtn", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "isUserLoggedIn", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "gigyaLayoutRow", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "gigyaUsernameDiv", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "gigyaPasswordDiv", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "submitButton", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "registerText", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "closeResetPasswordIcon", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "closeResetPasswordBtn", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "submitButtonResetPassword", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "emailOrCardNumber", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "forgotenPassword", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "mailInputField", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "isAppended", false);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "flashMessage", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "fmTitle", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "fmMessage", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "fmLink", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "resetPasswordFormHolder", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "loginFormHolder", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "whichCountry", void 0);

    return _this;
  }

  var _proto = PopupUiLoginForm.prototype;

  _proto.readyCallback = function readyCallback() {
    this.linkToLoginModal = document.getElementById(this.getLinkToLoginForm);
    this.linkToLoginModalMobile = document.getElementsByClassName(this.getLinkToLoginForm)[0];
    this.closeModalBtn = this.$this.find(this.closeButtonSelector);
    this.gigyaLayoutRow = document.getElementsByClassName(this.getGigyaLayoutRow);
    this.gigyaUsernameDiv = document.getElementsByClassName(this.getGigyaUsernameDiv);
    this.gigyaPasswordDiv = document.getElementsByClassName(this.getGigyaPasswordDiv);
    this.registerText = document.getElementsByClassName(this.getRegisterText);
    this.forgotenPassword = document.getElementsByClassName(this.getForgotenPassword);
    this.submitButton = document.getElementsByClassName(this.getSubmitButton);
    this.isUserLoggedIn = document.getElementById(this.getIsUserLoggedIn);
    this.mailInputField = document.getElementsByClassName(this.getMailInputField);
    this.whichCountry = document.getElementById(this.getWhichCountry);
    this.resetPasswordFormHolder = document.querySelector('#reset-password-form-holder');
    this.loginFormHolder = document.querySelector('#login-form-holder');
    this.closeResetPasswordIcon = document.querySelector('.close-reset-password-icon');
    this.closeResetPasswordBtn = document.querySelector('.btn-return-sign-in');
    this.submitButtonResetPassword = this.resetPasswordFormHolder.querySelector('.submit-form');
    this.emailOrCardNumber = document.querySelector('#txt_email_or_card'); // flash message and all related to it

    this.flashMessage = document.getElementById(this.getFlashMessage);
    this.fmTitle = document.getElementById(this.getFlashMessageTitle);
    this.fmMessage = document.getElementById(this.getFlashMessageMessage);
    this.fmLink = document.getElementById(this.getFlashMessageStaticLink);
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    if (this.linkToLoginModalMobile != undefined) {
      this.linkToLoginModalMobile.addEventListener('click', function () {
        _this2.$this.addClass(_this2.name + "--show");

        if (jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(_this2.whichCountry).val() === 'DE') {
          if (!_this2.isAppended) {
            _this2.appendToLoginForm();

            _this2.isAppended = true;
          }
        }
      });
    }

    this.closeResetPasswordIcon.addEventListener('click', function () {
      _this2.loginFormHolder.style.display = 'block';
      _this2.resetPasswordFormHolder.style.display = 'none';

      _this2.classList.add('popup-ui-login-form--show');
    });
    this.closeResetPasswordBtn.addEventListener('click', function () {
      _this2.loginFormHolder.style.display = 'block';
      _this2.resetPasswordFormHolder.style.display = 'none';

      _this2.classList.add('popup-ui-login-form--show');
    });
    this.submitButtonResetPassword.addEventListener('click', function () {
      var email = _this2.emailOrCardNumber.value;

      _this2.globusApiCall(email);
    });

    if (this.linkToLoginModal != undefined) {
      this.linkToLoginModal.addEventListener('click', function () {
        if (_this2.gigyaUsernameDiv.item(0) != undefined) {
          if (_this2.isUserLoggedIn.value === 'true') {
            location.href = 'customer/overview';
          } else {
            _this2.$this.addClass(_this2.name + "--show");

            if (jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(_this2.whichCountry).val() === 'DE') {
              if (!_this2.isAppended) {
                _this2.appendToLoginForm();

                _this2.isAppended = true;
              }
            }
          }
        }
      });
    }

    this.closeModalBtn.on('click', function () {
      _this2.$this.toggleClass(_this2.showClass);
    });
  };

  _proto.appendToLoginForm = function appendToLoginForm() {
    var _this3 = this;

    // prepending Labels
    var starSpan = document.createElement('span');
    starSpan.setAttribute('class', 'login-modal-star');
    starSpan.textContent = '*';
    var usernameLabel = document.createElement('label');
    usernameLabel.setAttribute('for', 'username');
    usernameLabel.setAttribute('id', 'usernameLabel');
    usernameLabel.textContent = 'E-Mail-Adresse oder Kundenkartennummer ';
    usernameLabel.append(starSpan);
    var popupLoginEyeIcon = document.createElement('span');
    popupLoginEyeIcon.setAttribute('id', 'popupLoginEyeIconDE');
    popupLoginEyeIcon.classList.add('icon-eye', 'popup-login-eye-icon');
    var starSpanPass = document.createElement('span');
    starSpanPass.setAttribute('class', 'login-modal-star');
    starSpanPass.textContent = '*';
    var passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.setAttribute('id', 'passwordLabel');
    passwordLabel.textContent = 'Passwort ';
    passwordLabel.append(starSpanPass);
    this.gigyaUsernameDiv.item(1).prepend(usernameLabel);
    this.gigyaPasswordDiv.item(8).prepend(popupLoginEyeIcon);
    this.gigyaPasswordDiv.item(8).prepend(passwordLabel); // appending Password forget link

    var passwordForgetLink = document.createElement('a');
    passwordForgetLink.setAttribute('id', 'password-forget-link');
    passwordForgetLink.setAttribute('href', '#');
    passwordForgetLink.textContent = 'Passwort vergessen?';
    passwordForgetLink.style.float = 'left'; // $(passwordForgetLink).css('padding-bottom', '0.7rem');

    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(passwordForgetLink).css('padding', '10px 15px');
    this.gigyaLayoutRow.item(158).append(passwordForgetLink);
    passwordForgetLink.addEventListener('click', function (event) {
      _this3.loginFormHolder.style.display = 'none';
      _this3.resetPasswordFormHolder.style.display = 'block';
    }); // bottom line horizontal line

    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(this.gigyaUsernameDiv).parent().css('position', 'relative');
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(this.gigyaUsernameDiv).parent().css('border-bottom-style', 'solid');
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(this.gigyaUsernameDiv).parent().css('border-bottom-color', '#CDCFCC');
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(this.gigyaUsernameDiv).parent().css('border-bottom-width', '1px');
    var textSpan = document.createElement('span');
    textSpan.setAttribute('class', 'span-in-link');
    textSpan.textContent = 'Neu beim Abholservice? '; // registriren link

    var registerLink = document.createElement('a');
    registerLink.setAttribute('id', 'register-now-link');
    registerLink.setAttribute('href', '/register');
    registerLink.text = 'Jetzt registrieren';
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(registerLink).css('cursor', 'pointer'); // placing register link in first div that comes after horizontal line

    var divForLink = document.createElement('div');
    divForLink.setAttribute('class', 'gigya-layout-row');
    divForLink.setAttribute('display', 'inline-flex');
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(divForLink).css('text-align', 'left');
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(divForLink).css('padding', '10px 15px');
    divForLink.append(textSpan);
    divForLink.append(registerLink);
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(this.gigyaLayoutRow.item(159)).prepend(divForLink); // changing tekst in button ??

    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(this.submitButton.item(11)).parent().attr('style', 'padding-bottom: 5px !important');
  };

  _proto.triggerPopup = function triggerPopup(event) {
    if (event) {
      event.preventDefault();
    }

    this.$this.toggleClass(this.showClass);
  };

  _proto.changeTextInSubmitButton = function changeTextInSubmitButton() {
    var _this4 = this;

    // seting weiter in submit button
    setTimeout(function () {
      if (_this4.submitButton.item(11) != undefined) {
        _this4.submitButton.item(11).value = 'Weiter';
      }
    }, 130);
  } // function to call Globus API and to show toaster message for failure or success
  ;

  _proto.globusApiCall = function globusApiCall(email) {
    var url = '/password/reset';
    var realUrl = 'https://api-dev.globus.de:443/v2/meinglobus/accounts/password/reset';
    var success = false;
    var localInstance = this;
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default.a.ajax(url, {
      type: 'POST',
      dataType: 'json',
      data: {
        id: email
      },
      success: function success(data, status, xhr) {
        localInstance.showSuccessMessage();
      },
      error: function error(jqXhr, textStatus, errorMessage) {
        localInstance.showErrorMessage();
      }
    });
  };

  _proto.showSuccessMessage = function showSuccessMessage() {
    var _this5 = this;

    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(this.flashMessage).parent().toggleClass(this.showMessage);
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(this.flashMessage).removeClass('flash-message-error').addClass('flash-message-success');
    this.fmTitle.textContent = '';
    this.fmMessage.textContent = 'Ihnen wurde eine E-Mail zur Passwortänderung zugestellt. Bitte prüfen Sie Ihr Postfach.';
    this.fmLink.textContent = '';
    setTimeout(function () {
      _this5.closeFlashMessage();

      _this5.$this.toggleClass(_this5.showClass);
    }, 2000);
  };

  _proto.showErrorMessage = function showErrorMessage() {
    var _this6 = this;

    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(this.flashMessage).parent().toggleClass(this.showMessage);
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(this.flashMessage).removeClass('flash-message-success').addClass('flash-message-error');
    this.fmTitle.textContent = 'Error!';
    this.fmMessage.textContent = 'No account with selected email.';
    this.fmLink.textContent = 'OK!';
    setTimeout(function () {
      _this6.closeFlashMessage();
    }, 2000);
  };

  _proto.closeFlashMessage = function closeFlashMessage() {
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(this.flashMessage).parent().removeClass(this.showMessage);
  } // getters
  ;

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(PopupUiLoginForm, [{
    key: "showClass",
    get: function get() {
      return this.name + "--show";
    }
  }, {
    key: "showMessage",
    get: function get() {
      return "pass-reset-flash-message--show";
    }
  }, {
    key: "closeButtonSelector",
    get: function get() {
      return ".login-close-icon";
    }
  }, {
    key: "getLinkToLoginForm",
    get: function get() {
      return 'link-to-login-modal';
    }
  }, {
    key: "getGigyaLayoutRow",
    get: function get() {
      return 'gigya-layout-row';
    }
  }, {
    key: "getGigyaUsernameDiv",
    get: function get() {
      return 'gigya-composite-control gigya-composite-control-textbox gigya-composite-control-loginID';
    }
  }, {
    key: "getGigyaPasswordDiv",
    get: function get() {
      return 'gigya-composite-control gigya-composite-control-password';
    }
  }, {
    key: "getRegisterText",
    get: function get() {
      return 'gigya-composite-control gigya-composite-control-link globus_register_link';
    }
  }, {
    key: "getForgotenPassword",
    get: function get() {
      return 'gigya-composite-control gigya-composite-control-link globus_pwforget_link';
    }
  }, {
    key: "getSubmitButton",
    get: function get() {
      return 'gigya-input-submit';
    }
  }, {
    key: "getIsUserLoggedIn",
    get: function get() {
      return 'is_user_logged_in';
    }
  }, {
    key: "getMailInputField",
    get: function get() {
      return 'gigya-input-text gigya-show-checkmark gigya-valid';
    }
  }, {
    key: "getFlashMessage",
    get: function get() {
      return 'pass_reset_flash_message';
    }
  }, {
    key: "getFlashMessageStaticLink",
    get: function get() {
      return 'flash-message-static-link';
    }
  }, {
    key: "getFlashMessageTitle",
    get: function get() {
      return 'flash-message-title';
    }
  }, {
    key: "getFlashMessageMessage",
    get: function get() {
      return 'flash-message-message';
    }
  }, {
    key: "getWhichCountry",
    get: function get() {
      return 'which_country';
    }
  }]);

  return PopupUiLoginForm;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcG9wdXAtdWktbG9naW4tZm9ybS9wb3B1cC11aS1sb2dpbi1mb3JtLnRzIl0sIm5hbWVzIjpbIlBvcHVwVWlMb2dpbkZvcm0iLCIkIiwicmVhZHlDYWxsYmFjayIsImxpbmtUb0xvZ2luTW9kYWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZ2V0TGlua1RvTG9naW5Gb3JtIiwibGlua1RvTG9naW5Nb2RhbE1vYmlsZSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbG9zZU1vZGFsQnRuIiwiJHRoaXMiLCJmaW5kIiwiY2xvc2VCdXR0b25TZWxlY3RvciIsImdpZ3lhTGF5b3V0Um93IiwiZ2V0R2lneWFMYXlvdXRSb3ciLCJnaWd5YVVzZXJuYW1lRGl2IiwiZ2V0R2lneWFVc2VybmFtZURpdiIsImdpZ3lhUGFzc3dvcmREaXYiLCJnZXRHaWd5YVBhc3N3b3JkRGl2IiwicmVnaXN0ZXJUZXh0IiwiZ2V0UmVnaXN0ZXJUZXh0IiwiZm9yZ290ZW5QYXNzd29yZCIsImdldEZvcmdvdGVuUGFzc3dvcmQiLCJzdWJtaXRCdXR0b24iLCJnZXRTdWJtaXRCdXR0b24iLCJpc1VzZXJMb2dnZWRJbiIsImdldElzVXNlckxvZ2dlZEluIiwibWFpbElucHV0RmllbGQiLCJnZXRNYWlsSW5wdXRGaWVsZCIsIndoaWNoQ291bnRyeSIsImdldFdoaWNoQ291bnRyeSIsInJlc2V0UGFzc3dvcmRGb3JtSG9sZGVyIiwicXVlcnlTZWxlY3RvciIsImxvZ2luRm9ybUhvbGRlciIsImNsb3NlUmVzZXRQYXNzd29yZEljb24iLCJjbG9zZVJlc2V0UGFzc3dvcmRCdG4iLCJzdWJtaXRCdXR0b25SZXNldFBhc3N3b3JkIiwiZW1haWxPckNhcmROdW1iZXIiLCJmbGFzaE1lc3NhZ2UiLCJnZXRGbGFzaE1lc3NhZ2UiLCJmbVRpdGxlIiwiZ2V0Rmxhc2hNZXNzYWdlVGl0bGUiLCJmbU1lc3NhZ2UiLCJnZXRGbGFzaE1lc3NhZ2VNZXNzYWdlIiwiZm1MaW5rIiwiZ2V0Rmxhc2hNZXNzYWdlU3RhdGljTGluayIsIm1hcEV2ZW50cyIsInVuZGVmaW5lZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRDbGFzcyIsIm5hbWUiLCJ2YWwiLCJpc0FwcGVuZGVkIiwiYXBwZW5kVG9Mb2dpbkZvcm0iLCJzdHlsZSIsImRpc3BsYXkiLCJjbGFzc0xpc3QiLCJhZGQiLCJlbWFpbCIsInZhbHVlIiwiZ2xvYnVzQXBpQ2FsbCIsIml0ZW0iLCJsb2NhdGlvbiIsImhyZWYiLCJvbiIsInRvZ2dsZUNsYXNzIiwic2hvd0NsYXNzIiwic3RhclNwYW4iLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJ1c2VybmFtZUxhYmVsIiwiYXBwZW5kIiwicG9wdXBMb2dpbkV5ZUljb24iLCJzdGFyU3BhblBhc3MiLCJwYXNzd29yZExhYmVsIiwicHJlcGVuZCIsInBhc3N3b3JkRm9yZ2V0TGluayIsImZsb2F0IiwiY3NzIiwiZXZlbnQiLCJwYXJlbnQiLCJ0ZXh0U3BhbiIsInJlZ2lzdGVyTGluayIsInRleHQiLCJkaXZGb3JMaW5rIiwiYXR0ciIsInRyaWdnZXJQb3B1cCIsInByZXZlbnREZWZhdWx0IiwiY2hhbmdlVGV4dEluU3VibWl0QnV0dG9uIiwic2V0VGltZW91dCIsInVybCIsInJlYWxVcmwiLCJzdWNjZXNzIiwibG9jYWxJbnN0YW5jZSIsImFqYXgiLCJ0eXBlIiwiZGF0YVR5cGUiLCJkYXRhIiwiaWQiLCJzdGF0dXMiLCJ4aHIiLCJzaG93U3VjY2Vzc01lc3NhZ2UiLCJlcnJvciIsImpxWGhyIiwidGV4dFN0YXR1cyIsImVycm9yTWVzc2FnZSIsInNob3dFcnJvck1lc3NhZ2UiLCJzaG93TWVzc2FnZSIsInJlbW92ZUNsYXNzIiwiY2xvc2VGbGFzaE1lc3NhZ2UiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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LFlBQUksQ0FBQ29CLGlCQUFMO0FBQ0gsS0FGUyxFQUVQLElBRk8sQ0FBVjtBQUdILEc7O1NBRU9BLGlCLEdBQVIsNkJBQTRCO0FBQ3hCN0csNkRBQUMsQ0FBQyxLQUFLcUMsWUFBTixDQUFELENBQXFCMkMsTUFBckIsR0FBOEI0QixXQUE5QixDQUEwQyxLQUFLRCxXQUEvQztBQUNILEcsQ0FFRDs7Ozs7d0JBQ3dCO0FBQ3BCLGFBQVUsS0FBSzFELElBQWY7QUFDSDs7O3dCQUV5QjtBQUN0QjtBQUNIOzs7d0JBRWlDO0FBQzlCO0FBQ0g7Ozt3QkFFZ0M7QUFDN0IsYUFBTyxxQkFBUDtBQUNIOzs7d0JBRStCO0FBQzVCLGFBQU8sa0JBQVA7QUFDSDs7O3dCQUVpQztBQUM5QixhQUFPLHlGQUFQO0FBQ0g7Ozt3QkFFaUM7QUFDOUIsYUFBTywwREFBUDtBQUNIOzs7d0JBRTZCO0FBQzFCLGFBQU8sMkVBQVA7QUFDSDs7O3dCQUVpQztBQUM5QixhQUFRLDJFQUFSO0FBQ0g7Ozt3QkFFNkI7QUFDMUIsYUFBTyxvQkFBUDtBQUNIOzs7d0JBRStCO0FBQzVCLGFBQU8sbUJBQVA7QUFDSDs7O3dCQUUrQjtBQUM1QixhQUFPLG1EQUFQO0FBQ0g7Ozt3QkFFNkI7QUFDMUIsYUFBTywwQkFBUDtBQUNIOzs7d0JBRXVDO0FBQ3BDLGFBQU8sMkJBQVA7QUFDSDs7O3dCQUVrQztBQUMvQixhQUFPLHFCQUFQO0FBQ0g7Ozt3QkFFb0M7QUFDakMsYUFBTyx1QkFBUDtBQUNIOzs7d0JBRTZCO0FBQzFCLGFBQU8sZUFBUDtBQUNIOzs7O0VBM1V5QzZELCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjM2LmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5L2Rpc3QvanF1ZXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBVaUxvZ2luRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkICR0aGlzOiAkID0gJCh0aGlzKTtcbiAgICBwcm90ZWN0ZWQgbGlua1RvTG9naW5Nb2RhbDtcbiAgICBwcm90ZWN0ZWQgbGlua1RvTG9naW5Nb2RhbE1vYmlsZTtcbiAgICBwcm90ZWN0ZWQgY2xvc2VNb2RhbEJ0bjtcbiAgICBwcm90ZWN0ZWQgaXNVc2VyTG9nZ2VkSW47XG4gICAgcHJvdGVjdGVkIGdpZ3lhTGF5b3V0Um93O1xuICAgIHByb3RlY3RlZCBnaWd5YVVzZXJuYW1lRGl2O1xuICAgIHByb3RlY3RlZCBnaWd5YVBhc3N3b3JkRGl2O1xuICAgIHByb3RlY3RlZCBzdWJtaXRCdXR0b247XG4gICAgcHJvdGVjdGVkIHJlZ2lzdGVyVGV4dDtcbiAgICBwcm90ZWN0ZWQgY2xvc2VSZXNldFBhc3N3b3JkSWNvbjtcbiAgICBwcm90ZWN0ZWQgY2xvc2VSZXNldFBhc3N3b3JkQnRuO1xuICAgIHByb3RlY3RlZCBzdWJtaXRCdXR0b25SZXNldFBhc3N3b3JkO1xuICAgIHByb3RlY3RlZCBlbWFpbE9yQ2FyZE51bWJlcjtcblxuICAgIHByb3RlY3RlZCBmb3Jnb3RlblBhc3N3b3JkO1xuXG4gICAgcHJvdGVjdGVkIG1haWxJbnB1dEZpZWxkO1xuXG4gICAgcHJpdmF0ZSBpc0FwcGVuZGVkID0gZmFsc2U7XG5cbiAgICAvLyBpbXBsZW1lbnRpbmcgZmxhc2ggbWVzc2FnZXNcbiAgICBwcm90ZWN0ZWQgZmxhc2hNZXNzYWdlO1xuICAgIHByb3RlY3RlZCBmbVRpdGxlO1xuICAgIHByb3RlY3RlZCBmbU1lc3NhZ2U7XG4gICAgcHJvdGVjdGVkIGZtTGluaztcbiAgICBwcm90ZWN0ZWQgcmVzZXRQYXNzd29yZEZvcm1Ib2xkZXI7XG4gICAgcHJvdGVjdGVkIGxvZ2luRm9ybUhvbGRlcjtcblxuICAgIHByb3RlY3RlZCB3aGljaENvdW50cnk7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5rVG9Mb2dpbk1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRMaW5rVG9Mb2dpbkZvcm0pO1xuICAgICAgICB0aGlzLmxpbmtUb0xvZ2luTW9kYWxNb2JpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZ2V0TGlua1RvTG9naW5Gb3JtKVswXTtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsQnRuID0gdGhpcy4kdGhpcy5maW5kKHRoaXMuY2xvc2VCdXR0b25TZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuZ2lneWFMYXlvdXRSb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZ2V0R2lneWFMYXlvdXRSb3cpO1xuICAgICAgICB0aGlzLmdpZ3lhVXNlcm5hbWVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZ2V0R2lneWFVc2VybmFtZURpdik7XG4gICAgICAgIHRoaXMuZ2lneWFQYXNzd29yZERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5nZXRHaWd5YVBhc3N3b3JkRGl2KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZ2V0UmVnaXN0ZXJUZXh0KTtcbiAgICAgICAgdGhpcy5mb3Jnb3RlblBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmdldEZvcmdvdGVuUGFzc3dvcmQpO1xuICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5nZXRTdWJtaXRCdXR0b24pO1xuICAgICAgICB0aGlzLmlzVXNlckxvZ2dlZEluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRJc1VzZXJMb2dnZWRJbik7XG4gICAgICAgIHRoaXMubWFpbElucHV0RmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZ2V0TWFpbElucHV0RmllbGQpO1xuICAgICAgICB0aGlzLndoaWNoQ291bnRyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0V2hpY2hDb3VudHJ5KTtcbiAgICAgICAgdGhpcy5yZXNldFBhc3N3b3JkRm9ybUhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXNldC1wYXNzd29yZC1mb3JtLWhvbGRlcicpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybUhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbi1mb3JtLWhvbGRlcicpO1xuICAgICAgICB0aGlzLmNsb3NlUmVzZXRQYXNzd29yZEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtcmVzZXQtcGFzc3dvcmQtaWNvbicpO1xuICAgICAgICB0aGlzLmNsb3NlUmVzZXRQYXNzd29yZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tcmV0dXJuLXNpZ24taW4nKTtcbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b25SZXNldFBhc3N3b3JkID0gdGhpcy5yZXNldFBhc3N3b3JkRm9ybUhvbGRlci5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LWZvcm0nKTtcbiAgICAgICAgdGhpcy5lbWFpbE9yQ2FyZE51bWJlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0eHRfZW1haWxfb3JfY2FyZCcpO1xuXG5cbiAgICAgICAgLy8gZmxhc2ggbWVzc2FnZSBhbmQgYWxsIHJlbGF0ZWQgdG8gaXRcbiAgICAgICAgdGhpcy5mbGFzaE1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldEZsYXNoTWVzc2FnZSk7XG4gICAgICAgIHRoaXMuZm1UaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0Rmxhc2hNZXNzYWdlVGl0bGUpO1xuICAgICAgICB0aGlzLmZtTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0Rmxhc2hNZXNzYWdlTWVzc2FnZSk7XG4gICAgICAgIHRoaXMuZm1MaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRGbGFzaE1lc3NhZ2VTdGF0aWNMaW5rKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubGlua1RvTG9naW5Nb2RhbE1vYmlsZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubGlua1RvTG9naW5Nb2RhbE1vYmlsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiR0aGlzLmFkZENsYXNzKGAke3RoaXMubmFtZX0tLXNob3dgKTtcblxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMud2hpY2hDb3VudHJ5KS52YWwoKSA9PT0gJ0RFJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNBcHBlbmRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRUb0xvZ2luRm9ybSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FwcGVuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsb3NlUmVzZXRQYXNzd29yZEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRm9ybUhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIHRoaXMucmVzZXRQYXNzd29yZEZvcm1Ib2xkZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgncG9wdXAtdWktbG9naW4tZm9ybS0tc2hvdycpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmNsb3NlUmVzZXRQYXNzd29yZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9naW5Gb3JtSG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgdGhpcy5yZXNldFBhc3N3b3JkRm9ybUhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdwb3B1cC11aS1sb2dpbi1mb3JtLS1zaG93Jyk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b25SZXNldFBhc3N3b3JkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW1haWwgPSB0aGlzLmVtYWlsT3JDYXJkTnVtYmVyLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5nbG9idXNBcGlDYWxsKGVtYWlsKTtcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAodGhpcy5saW5rVG9Mb2dpbk1vZGFsICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5saW5rVG9Mb2dpbk1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdpZ3lhVXNlcm5hbWVEaXYuaXRlbSgwKSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNVc2VyTG9nZ2VkSW4udmFsdWUgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICdjdXN0b21lci9vdmVydmlldyc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aGlzLmFkZENsYXNzKGAke3RoaXMubmFtZX0tLXNob3dgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcy53aGljaENvdW50cnkpLnZhbCgpID09PSAnREUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzQXBwZW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRUb0xvZ2luRm9ybSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQXBwZW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsb3NlTW9kYWxCdG4ub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kdGhpcy50b2dnbGVDbGFzcyh0aGlzLnNob3dDbGFzcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhcHBlbmRUb0xvZ2luRm9ybSgpOiB2b2lkIHtcbiAgICAgICAgLy8gcHJlcGVuZGluZyBMYWJlbHNcbiAgICAgICAgY29uc3Qgc3RhclNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJTcGFuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbG9naW4tbW9kYWwtc3RhcicpO1xuICAgICAgICBzdGFyU3Bhbi50ZXh0Q29udGVudCA9ICcqJztcblxuICAgICAgICBjb25zdCB1c2VybmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgdXNlcm5hbWVMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICd1c2VybmFtZScpO1xuICAgICAgICB1c2VybmFtZUxhYmVsLnNldEF0dHJpYnV0ZSgnaWQnLCAndXNlcm5hbWVMYWJlbCcpO1xuICAgICAgICB1c2VybmFtZUxhYmVsLnRleHRDb250ZW50ID0gJ0UtTWFpbC1BZHJlc3NlIG9kZXIgS3VuZGVua2FydGVubnVtbWVyICc7XG4gICAgICAgIHVzZXJuYW1lTGFiZWwuYXBwZW5kKHN0YXJTcGFuKTtcblxuICAgICAgICBjb25zdCBwb3B1cExvZ2luRXllSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgcG9wdXBMb2dpbkV5ZUljb24uc2V0QXR0cmlidXRlKCdpZCcsICdwb3B1cExvZ2luRXllSWNvbkRFJyk7XG4gICAgICAgIHBvcHVwTG9naW5FeWVJY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24tZXllJywgJ3BvcHVwLWxvZ2luLWV5ZS1pY29uJyk7XG5cbiAgICAgICAgY29uc3Qgc3RhclNwYW5QYXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyU3BhblBhc3Muc2V0QXR0cmlidXRlKCdjbGFzcycsICdsb2dpbi1tb2RhbC1zdGFyJyk7XG4gICAgICAgIHN0YXJTcGFuUGFzcy50ZXh0Q29udGVudCA9ICcqJztcblxuICAgICAgICBjb25zdCBwYXNzd29yZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgcGFzc3dvcmRMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICdwYXNzd29yZCcpO1xuICAgICAgICBwYXNzd29yZExhYmVsLnNldEF0dHJpYnV0ZSgnaWQnLCAncGFzc3dvcmRMYWJlbCcpO1xuICAgICAgICBwYXNzd29yZExhYmVsLnRleHRDb250ZW50ID0gJ1Bhc3N3b3J0ICc7XG4gICAgICAgIHBhc3N3b3JkTGFiZWwuYXBwZW5kKHN0YXJTcGFuUGFzcyk7XG5cbiAgICAgICAgdGhpcy5naWd5YVVzZXJuYW1lRGl2Lml0ZW0oMSkucHJlcGVuZCh1c2VybmFtZUxhYmVsKTtcblxuICAgICAgICB0aGlzLmdpZ3lhUGFzc3dvcmREaXYuaXRlbSg4KS5wcmVwZW5kKHBvcHVwTG9naW5FeWVJY29uKTtcblxuICAgICAgICB0aGlzLmdpZ3lhUGFzc3dvcmREaXYuaXRlbSg4KS5wcmVwZW5kKHBhc3N3b3JkTGFiZWwpO1xuXG4gICAgICAgIC8vIGFwcGVuZGluZyBQYXNzd29yZCBmb3JnZXQgbGlua1xuICAgICAgICBjb25zdCBwYXNzd29yZEZvcmdldExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIHBhc3N3b3JkRm9yZ2V0TGluay5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Bhc3N3b3JkLWZvcmdldC1saW5rJyk7XG4gICAgICAgIHBhc3N3b3JkRm9yZ2V0TGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgICBwYXNzd29yZEZvcmdldExpbmsudGV4dENvbnRlbnQgPSAnUGFzc3dvcnQgdmVyZ2Vzc2VuPyc7XG4gICAgICAgIHBhc3N3b3JkRm9yZ2V0TGluay5zdHlsZS5mbG9hdCA9ICdsZWZ0JztcbiAgICAgICAgLy8gJChwYXNzd29yZEZvcmdldExpbmspLmNzcygncGFkZGluZy1ib3R0b20nLCAnMC43cmVtJyk7XG4gICAgICAgICQocGFzc3dvcmRGb3JnZXRMaW5rKS5jc3MoJ3BhZGRpbmcnLCAnMTBweCAxNXB4Jyk7XG4gICAgICAgIHRoaXMuZ2lneWFMYXlvdXRSb3cuaXRlbSgxNTgpLmFwcGVuZChwYXNzd29yZEZvcmdldExpbmspO1xuICAgICAgICBwYXNzd29yZEZvcmdldExpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRm9ybUhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy5yZXNldFBhc3N3b3JkRm9ybUhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYm90dG9tIGxpbmUgaG9yaXpvbnRhbCBsaW5lXG4gICAgICAgICQodGhpcy5naWd5YVVzZXJuYW1lRGl2KS5wYXJlbnQoKS5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG4gICAgICAgICQodGhpcy5naWd5YVVzZXJuYW1lRGl2KS5wYXJlbnQoKS5jc3MoJ2JvcmRlci1ib3R0b20tc3R5bGUnLCAnc29saWQnKTtcbiAgICAgICAgJCh0aGlzLmdpZ3lhVXNlcm5hbWVEaXYpLnBhcmVudCgpLmNzcygnYm9yZGVyLWJvdHRvbS1jb2xvcicsICcjQ0RDRkNDJyk7XG4gICAgICAgICQodGhpcy5naWd5YVVzZXJuYW1lRGl2KS5wYXJlbnQoKS5jc3MoJ2JvcmRlci1ib3R0b20td2lkdGgnLCAnMXB4Jyk7XG5cbiAgICAgICAgY29uc3QgdGV4dFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHRleHRTcGFuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc3Bhbi1pbi1saW5rJyk7XG4gICAgICAgIHRleHRTcGFuLnRleHRDb250ZW50ID0gJ05ldSBiZWltIEFiaG9sc2VydmljZT8gJztcblxuICAgICAgICAvLyByZWdpc3RyaXJlbiBsaW5rXG4gICAgICAgIGNvbnN0IHJlZ2lzdGVyTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgcmVnaXN0ZXJMaW5rLnNldEF0dHJpYnV0ZSgnaWQnLCAncmVnaXN0ZXItbm93LWxpbmsnKTtcbiAgICAgICAgcmVnaXN0ZXJMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcvcmVnaXN0ZXInKTtcbiAgICAgICAgcmVnaXN0ZXJMaW5rLnRleHQgPSAnSmV0enQgcmVnaXN0cmllcmVuJztcbiAgICAgICAgJChyZWdpc3RlckxpbmspLmNzcygnY3Vyc29yJywgJ3BvaW50ZXInKTtcblxuICAgICAgICAvLyBwbGFjaW5nIHJlZ2lzdGVyIGxpbmsgaW4gZmlyc3QgZGl2IHRoYXQgY29tZXMgYWZ0ZXIgaG9yaXpvbnRhbCBsaW5lXG4gICAgICAgIGNvbnN0IGRpdkZvckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2Rm9yTGluay5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2dpZ3lhLWxheW91dC1yb3cnKTtcbiAgICAgICAgZGl2Rm9yTGluay5zZXRBdHRyaWJ1dGUoJ2Rpc3BsYXknLCAnaW5saW5lLWZsZXgnKTtcbiAgICAgICAgJChkaXZGb3JMaW5rKS5jc3MoJ3RleHQtYWxpZ24nLCAnbGVmdCcpO1xuICAgICAgICAkKGRpdkZvckxpbmspLmNzcygncGFkZGluZycsICcxMHB4IDE1cHgnKTtcbiAgICAgICAgZGl2Rm9yTGluay5hcHBlbmQodGV4dFNwYW4pO1xuICAgICAgICBkaXZGb3JMaW5rLmFwcGVuZChyZWdpc3RlckxpbmspO1xuXG4gICAgICAgICQodGhpcy5naWd5YUxheW91dFJvdy5pdGVtKDE1OSkpLnByZXBlbmQoZGl2Rm9yTGluayk7XG5cbiAgICAgICAgLy8gY2hhbmdpbmcgdGVrc3QgaW4gYnV0dG9uID8/XG4gICAgICAgICQodGhpcy5zdWJtaXRCdXR0b24uaXRlbSgxMSkpLnBhcmVudCgpLmF0dHIoJ3N0eWxlJywgJ3BhZGRpbmctYm90dG9tOiA1cHggIWltcG9ydGFudCcpO1xuXG4gICAgfVxuXG4gICAgdHJpZ2dlclBvcHVwKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJHRoaXMudG9nZ2xlQ2xhc3ModGhpcy5zaG93Q2xhc3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlVGV4dEluU3VibWl0QnV0dG9uKCk6IHZvaWQge1xuICAgICAgICAvLyBzZXRpbmcgd2VpdGVyIGluIHN1Ym1pdCBidXR0b25cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdWJtaXRCdXR0b24uaXRlbSgxMSkgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi5pdGVtKDExKS52YWx1ZSA9ICdXZWl0ZXInO1xuICAgICAgICAgICAgfX0sIDEzMCk7XG4gICAgfVxuXG4gICAgLy8gZnVuY3Rpb24gdG8gY2FsbCBHbG9idXMgQVBJIGFuZCB0byBzaG93IHRvYXN0ZXIgbWVzc2FnZSBmb3IgZmFpbHVyZSBvciBzdWNjZXNzXG4gICAgcHJpdmF0ZSBnbG9idXNBcGlDYWxsKGVtYWlsOiBzdHJpbmcpXG4gICAge1xuICAgICAgICBjb25zdCB1cmwgPSAnL3Bhc3N3b3JkL3Jlc2V0JztcbiAgICAgICAgY29uc3QgcmVhbFVybCA9ICdodHRwczovL2FwaS1kZXYuZ2xvYnVzLmRlOjQ0My92Mi9tZWluZ2xvYnVzL2FjY291bnRzL3Bhc3N3b3JkL3Jlc2V0JztcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBsb2NhbEluc3RhbmNlID0gdGhpcztcblxuICAgICAgICAkLmFqYXgodXJsLCB7XG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiBlbWFpbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3MoZGF0YSwgc3RhdHVzLCB4aHIpIHtcbiAgICAgICAgICAgICAgICBsb2NhbEluc3RhbmNlLnNob3dTdWNjZXNzTWVzc2FnZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yKGpxWGhyLCB0ZXh0U3RhdHVzLCBlcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBsb2NhbEluc3RhbmNlLnNob3dFcnJvck1lc3NhZ2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3dTdWNjZXNzTWVzc2FnZSgpXG4gICAge1xuICAgICAgICAkKHRoaXMuZmxhc2hNZXNzYWdlKS5wYXJlbnQoKS50b2dnbGVDbGFzcyh0aGlzLnNob3dNZXNzYWdlKTtcbiAgICAgICAgJCh0aGlzLmZsYXNoTWVzc2FnZSkucmVtb3ZlQ2xhc3MoJ2ZsYXNoLW1lc3NhZ2UtZXJyb3InKS5hZGRDbGFzcygnZmxhc2gtbWVzc2FnZS1zdWNjZXNzJyk7XG4gICAgICAgIHRoaXMuZm1UaXRsZS50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICB0aGlzLmZtTWVzc2FnZS50ZXh0Q29udGVudCA9ICdJaG5lbiB3dXJkZSBlaW5lIEUtTWFpbCB6dXIgUGFzc3dvcnTDpG5kZXJ1bmcgenVnZXN0ZWxsdC4gQml0dGUgcHLDvGZlbiBTaWUgSWhyIFBvc3RmYWNoLic7XG4gICAgICAgIHRoaXMuZm1MaW5rLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbG9zZUZsYXNoTWVzc2FnZSgpO1xuICAgICAgICAgICAgdGhpcy4kdGhpcy50b2dnbGVDbGFzcyh0aGlzLnNob3dDbGFzcyk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgIH1cblxuICAgIHNob3dFcnJvck1lc3NhZ2UoKSB7XG4gICAgICAgICQodGhpcy5mbGFzaE1lc3NhZ2UpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKHRoaXMuc2hvd01lc3NhZ2UpO1xuICAgICAgICAkKHRoaXMuZmxhc2hNZXNzYWdlKS5yZW1vdmVDbGFzcygnZmxhc2gtbWVzc2FnZS1zdWNjZXNzJykuYWRkQ2xhc3MoJ2ZsYXNoLW1lc3NhZ2UtZXJyb3InKTtcbiAgICAgICAgdGhpcy5mbVRpdGxlLnRleHRDb250ZW50ID0gJ0Vycm9yISc7XG4gICAgICAgIHRoaXMuZm1NZXNzYWdlLnRleHRDb250ZW50ID0gJ05vIGFjY291bnQgd2l0aCBzZWxlY3RlZCBlbWFpbC4nO1xuICAgICAgICB0aGlzLmZtTGluay50ZXh0Q29udGVudCA9ICdPSyEnO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VGbGFzaE1lc3NhZ2UoKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbG9zZUZsYXNoTWVzc2FnZSgpIHtcbiAgICAgICAgJCh0aGlzLmZsYXNoTWVzc2FnZSkucGFyZW50KCkucmVtb3ZlQ2xhc3ModGhpcy5zaG93TWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0dGVyc1xuICAgIGdldCBzaG93Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0tLXNob3dgO1xuICAgIH1cblxuICAgIGdldCBzaG93TWVzc2FnZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYHBhc3MtcmVzZXQtZmxhc2gtbWVzc2FnZS0tc2hvd2A7XG4gICAgfVxuXG4gICAgZ2V0IGNsb3NlQnV0dG9uU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAubG9naW4tY2xvc2UtaWNvbmA7XG4gICAgfVxuXG4gICAgZ2V0IGdldExpbmtUb0xvZ2luRm9ybSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2xpbmstdG8tbG9naW4tbW9kYWwnO1xuICAgIH1cblxuICAgIGdldCBnZXRHaWd5YUxheW91dFJvdygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2dpZ3lhLWxheW91dC1yb3cnO1xuICAgIH1cblxuICAgIGdldCBnZXRHaWd5YVVzZXJuYW1lRGl2KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnZ2lneWEtY29tcG9zaXRlLWNvbnRyb2wgZ2lneWEtY29tcG9zaXRlLWNvbnRyb2wtdGV4dGJveCBnaWd5YS1jb21wb3NpdGUtY29udHJvbC1sb2dpbklEJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0R2lneWFQYXNzd29yZERpdigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2dpZ3lhLWNvbXBvc2l0ZS1jb250cm9sIGdpZ3lhLWNvbXBvc2l0ZS1jb250cm9sLXBhc3N3b3JkJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0UmVnaXN0ZXJUZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnZ2lneWEtY29tcG9zaXRlLWNvbnRyb2wgZ2lneWEtY29tcG9zaXRlLWNvbnRyb2wtbGluayBnbG9idXNfcmVnaXN0ZXJfbGluayc7XG4gICAgfVxuXG4gICAgZ2V0IGdldEZvcmdvdGVuUGFzc3dvcmQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICAnZ2lneWEtY29tcG9zaXRlLWNvbnRyb2wgZ2lneWEtY29tcG9zaXRlLWNvbnRyb2wtbGluayBnbG9idXNfcHdmb3JnZXRfbGluayc7XG4gICAgfVxuXG4gICAgZ2V0IGdldFN1Ym1pdEJ1dHRvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2dpZ3lhLWlucHV0LXN1Ym1pdCc7XG4gICAgfVxuXG4gICAgZ2V0IGdldElzVXNlckxvZ2dlZEluKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnaXNfdXNlcl9sb2dnZWRfaW4nO1xuICAgIH1cblxuICAgIGdldCBnZXRNYWlsSW5wdXRGaWVsZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2dpZ3lhLWlucHV0LXRleHQgZ2lneWEtc2hvdy1jaGVja21hcmsgZ2lneWEtdmFsaWQnO1xuICAgIH1cblxuICAgIGdldCBnZXRGbGFzaE1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdwYXNzX3Jlc2V0X2ZsYXNoX21lc3NhZ2UnO1xuICAgIH1cblxuICAgIGdldCBnZXRGbGFzaE1lc3NhZ2VTdGF0aWNMaW5rKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnZmxhc2gtbWVzc2FnZS1zdGF0aWMtbGluayc7XG4gICAgfVxuXG4gICAgZ2V0IGdldEZsYXNoTWVzc2FnZVRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnZmxhc2gtbWVzc2FnZS10aXRsZSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldEZsYXNoTWVzc2FnZU1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdmbGFzaC1tZXNzYWdlLW1lc3NhZ2UnO1xuICAgIH1cblxuICAgIGdldCBnZXRXaGljaENvdW50cnkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICd3aGljaF9jb3VudHJ5JztcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9