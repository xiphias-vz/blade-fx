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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class PopupUiLoginForm extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "$this", jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this));

    _defineProperty(this, "linkToLoginModal", void 0);

    _defineProperty(this, "linkToLoginModalMobile", void 0);

    _defineProperty(this, "closeModalBtn", void 0);

    _defineProperty(this, "isUserLoggedIn", void 0);

    _defineProperty(this, "gigyaLayoutRow", void 0);

    _defineProperty(this, "gigyaUsernameDiv", void 0);

    _defineProperty(this, "gigyaPasswordDiv", void 0);

    _defineProperty(this, "submitButton", void 0);

    _defineProperty(this, "registerText", void 0);

    _defineProperty(this, "closeResetPasswordIcon", void 0);

    _defineProperty(this, "closeResetPasswordBtn", void 0);

    _defineProperty(this, "submitButtonResetPassword", void 0);

    _defineProperty(this, "emailOrCardNumber", void 0);

    _defineProperty(this, "forgotenPassword", void 0);

    _defineProperty(this, "mailInputField", void 0);

    _defineProperty(this, "isAppended", false);

    _defineProperty(this, "flashMessage", void 0);

    _defineProperty(this, "fmTitle", void 0);

    _defineProperty(this, "fmMessage", void 0);

    _defineProperty(this, "fmLink", void 0);

    _defineProperty(this, "resetPasswordFormHolder", void 0);

    _defineProperty(this, "loginFormHolder", void 0);

    _defineProperty(this, "whichCountry", void 0);
  }

  readyCallback() {
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
  }

  mapEvents() {
    if (this.linkToLoginModalMobile != undefined) {
      this.linkToLoginModalMobile.addEventListener('click', () => {
        this.$this.addClass(this.name + "--show");

        if (jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.whichCountry).val() === 'DE') {
          if (!this.isAppended) {
            this.appendToLoginForm();
            this.isAppended = true;
          }
        }
      });
    }

    this.closeResetPasswordIcon.addEventListener('click', () => {
      this.loginFormHolder.style.display = 'block';
      this.resetPasswordFormHolder.style.display = 'none';
      this.classList.add('popup-ui-login-form--show');
    });
    this.closeResetPasswordBtn.addEventListener('click', () => {
      this.loginFormHolder.style.display = 'block';
      this.resetPasswordFormHolder.style.display = 'none';
      this.classList.add('popup-ui-login-form--show');
    });
    this.submitButtonResetPassword.addEventListener('click', () => {
      var email = this.emailOrCardNumber.value;
      this.globusApiCall(email);
    });

    if (this.linkToLoginModal != undefined) {
      this.linkToLoginModal.addEventListener('click', () => {
        if (this.gigyaUsernameDiv.item(0) != undefined) {
          if (this.isUserLoggedIn.value === 'true') {
            location.href = 'customer/overview';
          } else {
            this.$this.addClass(this.name + "--show");

            if (jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.whichCountry).val() === 'DE') {
              if (!this.isAppended) {
                this.appendToLoginForm();
                this.isAppended = true;
              }
            }
          }
        }
      });
    }

    this.closeModalBtn.on('click', () => {
      this.$this.toggleClass(this.showClass);
    });
  }

  appendToLoginForm() {
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

    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(passwordForgetLink).css('padding', '10px 15px');
    this.gigyaLayoutRow.item(158).append(passwordForgetLink);
    passwordForgetLink.addEventListener('click', event => {
      this.loginFormHolder.style.display = 'none';
      this.resetPasswordFormHolder.style.display = 'block';
    }); // bottom line horizontal line

    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.gigyaUsernameDiv).parent().css('position', 'relative');
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.gigyaUsernameDiv).parent().css('border-bottom-style', 'solid');
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.gigyaUsernameDiv).parent().css('border-bottom-color', '#CDCFCC');
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.gigyaUsernameDiv).parent().css('border-bottom-width', '1px');
    var textSpan = document.createElement('span');
    textSpan.setAttribute('class', 'span-in-link');
    textSpan.textContent = 'Neu beim Abholservice? '; // registriren link

    var registerLink = document.createElement('a');
    registerLink.setAttribute('id', 'register-now-link');
    registerLink.setAttribute('href', '/register');
    registerLink.text = 'Jetzt registrieren';
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(registerLink).css('cursor', 'pointer'); // placing register link in first div that comes after horizontal line

    var divForLink = document.createElement('div');
    divForLink.setAttribute('class', 'gigya-layout-row');
    divForLink.setAttribute('display', 'inline-flex');
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(divForLink).css('text-align', 'left');
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(divForLink).css('padding', '10px 15px');
    divForLink.append(textSpan);
    divForLink.append(registerLink);
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.gigyaLayoutRow.item(159)).prepend(divForLink); // changing tekst in button ??

    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.submitButton.item(11)).parent().attr('style', 'padding-bottom: 5px !important');
  }

  triggerPopup(event) {
    if (event) {
      event.preventDefault();
    }

    this.$this.toggleClass(this.showClass);
  }

  changeTextInSubmitButton() {
    // seting weiter in submit button
    setTimeout(() => {
      if (this.submitButton.item(11) != undefined) {
        this.submitButton.item(11).value = 'Weiter';
      }
    }, 130);
  } // function to call Globus API and to show toaster message for failure or success


  globusApiCall(email) {
    var url = '/password/reset';
    var realUrl = 'https://api-dev.globus.de:443/v2/meinglobus/accounts/password/reset';
    var success = false;
    var localInstance = this;
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default.a.ajax(url, {
      type: 'POST',
      dataType: 'json',
      data: {
        id: email
      },

      success(data, status, xhr) {
        localInstance.showSuccessMessage();
      },

      error(jqXhr, textStatus, errorMessage) {
        localInstance.showErrorMessage();
      }

    });
  }

  showSuccessMessage() {
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.flashMessage).parent().toggleClass(this.showMessage);
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.flashMessage).removeClass('flash-message-error').addClass('flash-message-success');
    this.fmTitle.textContent = '';
    this.fmMessage.textContent = 'Ihnen wurde eine E-Mail zur Passwortänderung zugestellt. Bitte prüfen Sie Ihr Postfach.';
    this.fmLink.textContent = '';
    setTimeout(() => {
      this.closeFlashMessage();
      this.$this.toggleClass(this.showClass);
    }, 2000);
  }

  showErrorMessage() {
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.flashMessage).parent().toggleClass(this.showMessage);
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.flashMessage).removeClass('flash-message-success').addClass('flash-message-error');
    this.fmTitle.textContent = 'Error!';
    this.fmMessage.textContent = 'No account with selected email.';
    this.fmLink.textContent = 'OK!';
    setTimeout(() => {
      this.closeFlashMessage();
    }, 2000);
  }

  closeFlashMessage() {
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.flashMessage).parent().removeClass(this.showMessage);
  } // getters


  get showClass() {
    return this.name + "--show";
  }

  get showMessage() {
    return "pass-reset-flash-message--show";
  }

  get closeButtonSelector() {
    return ".login-close-icon";
  }

  get getLinkToLoginForm() {
    return 'link-to-login-modal';
  }

  get getGigyaLayoutRow() {
    return 'gigya-layout-row';
  }

  get getGigyaUsernameDiv() {
    return 'gigya-composite-control gigya-composite-control-textbox gigya-composite-control-loginID';
  }

  get getGigyaPasswordDiv() {
    return 'gigya-composite-control gigya-composite-control-password';
  }

  get getRegisterText() {
    return 'gigya-composite-control gigya-composite-control-link globus_register_link';
  }

  get getForgotenPassword() {
    return 'gigya-composite-control gigya-composite-control-link globus_pwforget_link';
  }

  get getSubmitButton() {
    return 'gigya-input-submit';
  }

  get getIsUserLoggedIn() {
    return 'is_user_logged_in';
  }

  get getMailInputField() {
    return 'gigya-input-text gigya-show-checkmark gigya-valid';
  }

  get getFlashMessage() {
    return 'pass_reset_flash_message';
  }

  get getFlashMessageStaticLink() {
    return 'flash-message-static-link';
  }

  get getFlashMessageTitle() {
    return 'flash-message-title';
  }

  get getFlashMessageMessage() {
    return 'flash-message-message';
  }

  get getWhichCountry() {
    return 'which_country';
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcG9wdXAtdWktbG9naW4tZm9ybS9wb3B1cC11aS1sb2dpbi1mb3JtLnRzIl0sIm5hbWVzIjpbIlBvcHVwVWlMb2dpbkZvcm0iLCJDb21wb25lbnQiLCIkIiwicmVhZHlDYWxsYmFjayIsImxpbmtUb0xvZ2luTW9kYWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZ2V0TGlua1RvTG9naW5Gb3JtIiwibGlua1RvTG9naW5Nb2RhbE1vYmlsZSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbG9zZU1vZGFsQnRuIiwiJHRoaXMiLCJmaW5kIiwiY2xvc2VCdXR0b25TZWxlY3RvciIsImdpZ3lhTGF5b3V0Um93IiwiZ2V0R2lneWFMYXlvdXRSb3ciLCJnaWd5YVVzZXJuYW1lRGl2IiwiZ2V0R2lneWFVc2VybmFtZURpdiIsImdpZ3lhUGFzc3dvcmREaXYiLCJnZXRHaWd5YVBhc3N3b3JkRGl2IiwicmVnaXN0ZXJUZXh0IiwiZ2V0UmVnaXN0ZXJUZXh0IiwiZm9yZ290ZW5QYXNzd29yZCIsImdldEZvcmdvdGVuUGFzc3dvcmQiLCJzdWJtaXRCdXR0b24iLCJnZXRTdWJtaXRCdXR0b24iLCJpc1VzZXJMb2dnZWRJbiIsImdldElzVXNlckxvZ2dlZEluIiwibWFpbElucHV0RmllbGQiLCJnZXRNYWlsSW5wdXRGaWVsZCIsIndoaWNoQ291bnRyeSIsImdldFdoaWNoQ291bnRyeSIsInJlc2V0UGFzc3dvcmRGb3JtSG9sZGVyIiwicXVlcnlTZWxlY3RvciIsImxvZ2luRm9ybUhvbGRlciIsImNsb3NlUmVzZXRQYXNzd29yZEljb24iLCJjbG9zZVJlc2V0UGFzc3dvcmRCdG4iLCJzdWJtaXRCdXR0b25SZXNldFBhc3N3b3JkIiwiZW1haWxPckNhcmROdW1iZXIiLCJmbGFzaE1lc3NhZ2UiLCJnZXRGbGFzaE1lc3NhZ2UiLCJmbVRpdGxlIiwiZ2V0Rmxhc2hNZXNzYWdlVGl0bGUiLCJmbU1lc3NhZ2UiLCJnZXRGbGFzaE1lc3NhZ2VNZXNzYWdlIiwiZm1MaW5rIiwiZ2V0Rmxhc2hNZXNzYWdlU3RhdGljTGluayIsIm1hcEV2ZW50cyIsInVuZGVmaW5lZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRDbGFzcyIsIm5hbWUiLCJ2YWwiLCJpc0FwcGVuZGVkIiwiYXBwZW5kVG9Mb2dpbkZvcm0iLCJzdHlsZSIsImRpc3BsYXkiLCJjbGFzc0xpc3QiLCJhZGQiLCJlbWFpbCIsInZhbHVlIiwiZ2xvYnVzQXBpQ2FsbCIsIml0ZW0iLCJsb2NhdGlvbiIsImhyZWYiLCJvbiIsInRvZ2dsZUNsYXNzIiwic2hvd0NsYXNzIiwic3RhclNwYW4iLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJ1c2VybmFtZUxhYmVsIiwiYXBwZW5kIiwicG9wdXBMb2dpbkV5ZUljb24iLCJzdGFyU3BhblBhc3MiLCJwYXNzd29yZExhYmVsIiwicHJlcGVuZCIsInBhc3N3b3JkRm9yZ2V0TGluayIsImZsb2F0IiwiY3NzIiwiZXZlbnQiLCJwYXJlbnQiLCJ0ZXh0U3BhbiIsInJlZ2lzdGVyTGluayIsInRleHQiLCJkaXZGb3JMaW5rIiwiYXR0ciIsInRyaWdnZXJQb3B1cCIsInByZXZlbnREZWZhdWx0IiwiY2hhbmdlVGV4dEluU3VibWl0QnV0dG9uIiwic2V0VGltZW91dCIsInVybCIsInJlYWxVcmwiLCJzdWNjZXNzIiwibG9jYWxJbnN0YW5jZSIsImFqYXgiLCJ0eXBlIiwiZGF0YVR5cGUiLCJkYXRhIiwiaWQiLCJzdGF0dXMiLCJ4aHIiLCJzaG93U3VjY2Vzc01lc3NhZ2UiLCJlcnJvciIsImpxWGhyIiwidGV4dFN0YXR1cyIsImVycm9yTWVzc2FnZSIsInNob3dFcnJvck1lc3NhZ2UiLCJzaG93TWVzc2FnZSIsInJlbW92ZUNsYXNzIiwiY2xvc2VGbGFzaE1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FB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cG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeS9kaXN0L2pxdWVyeSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwVWlMb2dpbkZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCAkdGhpczogJCA9ICQodGhpcyk7XG4gICAgcHJvdGVjdGVkIGxpbmtUb0xvZ2luTW9kYWw7XG4gICAgcHJvdGVjdGVkIGxpbmtUb0xvZ2luTW9kYWxNb2JpbGU7XG4gICAgcHJvdGVjdGVkIGNsb3NlTW9kYWxCdG47XG4gICAgcHJvdGVjdGVkIGlzVXNlckxvZ2dlZEluO1xuICAgIHByb3RlY3RlZCBnaWd5YUxheW91dFJvdztcbiAgICBwcm90ZWN0ZWQgZ2lneWFVc2VybmFtZURpdjtcbiAgICBwcm90ZWN0ZWQgZ2lneWFQYXNzd29yZERpdjtcbiAgICBwcm90ZWN0ZWQgc3VibWl0QnV0dG9uO1xuICAgIHByb3RlY3RlZCByZWdpc3RlclRleHQ7XG4gICAgcHJvdGVjdGVkIGNsb3NlUmVzZXRQYXNzd29yZEljb247XG4gICAgcHJvdGVjdGVkIGNsb3NlUmVzZXRQYXNzd29yZEJ0bjtcbiAgICBwcm90ZWN0ZWQgc3VibWl0QnV0dG9uUmVzZXRQYXNzd29yZDtcbiAgICBwcm90ZWN0ZWQgZW1haWxPckNhcmROdW1iZXI7XG5cbiAgICBwcm90ZWN0ZWQgZm9yZ290ZW5QYXNzd29yZDtcblxuICAgIHByb3RlY3RlZCBtYWlsSW5wdXRGaWVsZDtcblxuICAgIHByaXZhdGUgaXNBcHBlbmRlZCA9IGZhbHNlO1xuXG4gICAgLy8gaW1wbGVtZW50aW5nIGZsYXNoIG1lc3NhZ2VzXG4gICAgcHJvdGVjdGVkIGZsYXNoTWVzc2FnZTtcbiAgICBwcm90ZWN0ZWQgZm1UaXRsZTtcbiAgICBwcm90ZWN0ZWQgZm1NZXNzYWdlO1xuICAgIHByb3RlY3RlZCBmbUxpbms7XG4gICAgcHJvdGVjdGVkIHJlc2V0UGFzc3dvcmRGb3JtSG9sZGVyO1xuICAgIHByb3RlY3RlZCBsb2dpbkZvcm1Ib2xkZXI7XG5cbiAgICBwcm90ZWN0ZWQgd2hpY2hDb3VudHJ5O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGlua1RvTG9naW5Nb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0TGlua1RvTG9naW5Gb3JtKTtcbiAgICAgICAgdGhpcy5saW5rVG9Mb2dpbk1vZGFsTW9iaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmdldExpbmtUb0xvZ2luRm9ybSlbMF07XG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbEJ0biA9IHRoaXMuJHRoaXMuZmluZCh0aGlzLmNsb3NlQnV0dG9uU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmdpZ3lhTGF5b3V0Um93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmdldEdpZ3lhTGF5b3V0Um93KTtcbiAgICAgICAgdGhpcy5naWd5YVVzZXJuYW1lRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmdldEdpZ3lhVXNlcm5hbWVEaXYpO1xuICAgICAgICB0aGlzLmdpZ3lhUGFzc3dvcmREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZ2V0R2lneWFQYXNzd29yZERpdik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmdldFJlZ2lzdGVyVGV4dCk7XG4gICAgICAgIHRoaXMuZm9yZ290ZW5QYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5nZXRGb3Jnb3RlblBhc3N3b3JkKTtcbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZ2V0U3VibWl0QnV0dG9uKTtcbiAgICAgICAgdGhpcy5pc1VzZXJMb2dnZWRJbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0SXNVc2VyTG9nZ2VkSW4pO1xuICAgICAgICB0aGlzLm1haWxJbnB1dEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmdldE1haWxJbnB1dEZpZWxkKTtcbiAgICAgICAgdGhpcy53aGljaENvdW50cnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldFdoaWNoQ291bnRyeSk7XG4gICAgICAgIHRoaXMucmVzZXRQYXNzd29yZEZvcm1Ib2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzZXQtcGFzc3dvcmQtZm9ybS1ob2xkZXInKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm1Ib2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW4tZm9ybS1ob2xkZXInKTtcbiAgICAgICAgdGhpcy5jbG9zZVJlc2V0UGFzc3dvcmRJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLXJlc2V0LXBhc3N3b3JkLWljb24nKTtcbiAgICAgICAgdGhpcy5jbG9zZVJlc2V0UGFzc3dvcmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXJldHVybi1zaWduLWluJyk7XG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uUmVzZXRQYXNzd29yZCA9IHRoaXMucmVzZXRQYXNzd29yZEZvcm1Ib2xkZXIucXVlcnlTZWxlY3RvcignLnN1Ym1pdC1mb3JtJyk7XG4gICAgICAgIHRoaXMuZW1haWxPckNhcmROdW1iZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdHh0X2VtYWlsX29yX2NhcmQnKTtcblxuXG4gICAgICAgIC8vIGZsYXNoIG1lc3NhZ2UgYW5kIGFsbCByZWxhdGVkIHRvIGl0XG4gICAgICAgIHRoaXMuZmxhc2hNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRGbGFzaE1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmZtVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldEZsYXNoTWVzc2FnZVRpdGxlKTtcbiAgICAgICAgdGhpcy5mbU1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldEZsYXNoTWVzc2FnZU1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmZtTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0Rmxhc2hNZXNzYWdlU3RhdGljTGluayk7XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcblxuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmxpbmtUb0xvZ2luTW9kYWxNb2JpbGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmtUb0xvZ2luTW9kYWxNb2JpbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kdGhpcy5hZGRDbGFzcyhgJHt0aGlzLm5hbWV9LS1zaG93YCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzLndoaWNoQ291bnRyeSkudmFsKCkgPT09ICdERScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzQXBwZW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kVG9Mb2dpbkZvcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBcHBlbmRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbG9zZVJlc2V0UGFzc3dvcmRJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dpbkZvcm1Ib2xkZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UGFzc3dvcmRGb3JtSG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLXVpLWxvZ2luLWZvcm0tLXNob3cnKTtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5jbG9zZVJlc2V0UGFzc3dvcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRm9ybUhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIHRoaXMucmVzZXRQYXNzd29yZEZvcm1Ib2xkZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgncG9wdXAtdWktbG9naW4tZm9ybS0tc2hvdycpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uUmVzZXRQYXNzd29yZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gdGhpcy5lbWFpbE9yQ2FyZE51bWJlci52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZ2xvYnVzQXBpQ2FsbChlbWFpbCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKHRoaXMubGlua1RvTG9naW5Nb2RhbCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubGlua1RvTG9naW5Nb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5naWd5YVVzZXJuYW1lRGl2Lml0ZW0oMCkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVXNlckxvZ2dlZEluLnZhbHVlID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnY3VzdG9tZXIvb3ZlcnZpZXcnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGhpcy5hZGRDbGFzcyhgJHt0aGlzLm5hbWV9LS1zaG93YCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMud2hpY2hDb3VudHJ5KS52YWwoKSA9PT0gJ0RFJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0FwcGVuZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kVG9Mb2dpbkZvcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FwcGVuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsQnRuLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJHRoaXMudG9nZ2xlQ2xhc3ModGhpcy5zaG93Q2xhc3MpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXBwZW5kVG9Mb2dpbkZvcm0oKTogdm9pZCB7XG4gICAgICAgIC8vIHByZXBlbmRpbmcgTGFiZWxzXG4gICAgICAgIGNvbnN0IHN0YXJTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyU3Bhbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xvZ2luLW1vZGFsLXN0YXInKTtcbiAgICAgICAgc3RhclNwYW4udGV4dENvbnRlbnQgPSAnKic7XG5cbiAgICAgICAgY29uc3QgdXNlcm5hbWVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIHVzZXJuYW1lTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAndXNlcm5hbWUnKTtcbiAgICAgICAgdXNlcm5hbWVMYWJlbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3VzZXJuYW1lTGFiZWwnKTtcbiAgICAgICAgdXNlcm5hbWVMYWJlbC50ZXh0Q29udGVudCA9ICdFLU1haWwtQWRyZXNzZSBvZGVyIEt1bmRlbmthcnRlbm51bW1lciAnO1xuICAgICAgICB1c2VybmFtZUxhYmVsLmFwcGVuZChzdGFyU3Bhbik7XG5cbiAgICAgICAgY29uc3QgcG9wdXBMb2dpbkV5ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHBvcHVwTG9naW5FeWVJY29uLnNldEF0dHJpYnV0ZSgnaWQnLCAncG9wdXBMb2dpbkV5ZUljb25ERScpO1xuICAgICAgICBwb3B1cExvZ2luRXllSWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uLWV5ZScsICdwb3B1cC1sb2dpbi1leWUtaWNvbicpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJTcGFuUGFzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhclNwYW5QYXNzLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbG9naW4tbW9kYWwtc3RhcicpO1xuICAgICAgICBzdGFyU3BhblBhc3MudGV4dENvbnRlbnQgPSAnKic7XG5cbiAgICAgICAgY29uc3QgcGFzc3dvcmRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIHBhc3N3b3JkTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAncGFzc3dvcmQnKTtcbiAgICAgICAgcGFzc3dvcmRMYWJlbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Bhc3N3b3JkTGFiZWwnKTtcbiAgICAgICAgcGFzc3dvcmRMYWJlbC50ZXh0Q29udGVudCA9ICdQYXNzd29ydCAnO1xuICAgICAgICBwYXNzd29yZExhYmVsLmFwcGVuZChzdGFyU3BhblBhc3MpO1xuXG4gICAgICAgIHRoaXMuZ2lneWFVc2VybmFtZURpdi5pdGVtKDEpLnByZXBlbmQodXNlcm5hbWVMYWJlbCk7XG5cbiAgICAgICAgdGhpcy5naWd5YVBhc3N3b3JkRGl2Lml0ZW0oOCkucHJlcGVuZChwb3B1cExvZ2luRXllSWNvbik7XG5cbiAgICAgICAgdGhpcy5naWd5YVBhc3N3b3JkRGl2Lml0ZW0oOCkucHJlcGVuZChwYXNzd29yZExhYmVsKTtcblxuICAgICAgICAvLyBhcHBlbmRpbmcgUGFzc3dvcmQgZm9yZ2V0IGxpbmtcbiAgICAgICAgY29uc3QgcGFzc3dvcmRGb3JnZXRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBwYXNzd29yZEZvcmdldExpbmsuc2V0QXR0cmlidXRlKCdpZCcsICdwYXNzd29yZC1mb3JnZXQtbGluaycpO1xuICAgICAgICBwYXNzd29yZEZvcmdldExpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcbiAgICAgICAgcGFzc3dvcmRGb3JnZXRMaW5rLnRleHRDb250ZW50ID0gJ1Bhc3N3b3J0IHZlcmdlc3Nlbj8nO1xuICAgICAgICBwYXNzd29yZEZvcmdldExpbmsuc3R5bGUuZmxvYXQgPSAnbGVmdCc7XG4gICAgICAgIC8vICQocGFzc3dvcmRGb3JnZXRMaW5rKS5jc3MoJ3BhZGRpbmctYm90dG9tJywgJzAuN3JlbScpO1xuICAgICAgICAkKHBhc3N3b3JkRm9yZ2V0TGluaykuY3NzKCdwYWRkaW5nJywgJzEwcHggMTVweCcpO1xuICAgICAgICB0aGlzLmdpZ3lhTGF5b3V0Um93Lml0ZW0oMTU4KS5hcHBlbmQocGFzc3dvcmRGb3JnZXRMaW5rKTtcbiAgICAgICAgcGFzc3dvcmRGb3JnZXRMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dpbkZvcm1Ib2xkZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMucmVzZXRQYXNzd29yZEZvcm1Ib2xkZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGJvdHRvbSBsaW5lIGhvcml6b250YWwgbGluZVxuICAgICAgICAkKHRoaXMuZ2lneWFVc2VybmFtZURpdikucGFyZW50KCkuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuICAgICAgICAkKHRoaXMuZ2lneWFVc2VybmFtZURpdikucGFyZW50KCkuY3NzKCdib3JkZXItYm90dG9tLXN0eWxlJywgJ3NvbGlkJyk7XG4gICAgICAgICQodGhpcy5naWd5YVVzZXJuYW1lRGl2KS5wYXJlbnQoKS5jc3MoJ2JvcmRlci1ib3R0b20tY29sb3InLCAnI0NEQ0ZDQycpO1xuICAgICAgICAkKHRoaXMuZ2lneWFVc2VybmFtZURpdikucGFyZW50KCkuY3NzKCdib3JkZXItYm90dG9tLXdpZHRoJywgJzFweCcpO1xuXG4gICAgICAgIGNvbnN0IHRleHRTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICB0ZXh0U3Bhbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NwYW4taW4tbGluaycpO1xuICAgICAgICB0ZXh0U3Bhbi50ZXh0Q29udGVudCA9ICdOZXUgYmVpbSBBYmhvbHNlcnZpY2U/ICc7XG5cbiAgICAgICAgLy8gcmVnaXN0cmlyZW4gbGlua1xuICAgICAgICBjb25zdCByZWdpc3RlckxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIHJlZ2lzdGVyTGluay5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3JlZ2lzdGVyLW5vdy1saW5rJyk7XG4gICAgICAgIHJlZ2lzdGVyTGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnL3JlZ2lzdGVyJyk7XG4gICAgICAgIHJlZ2lzdGVyTGluay50ZXh0ID0gJ0pldHp0IHJlZ2lzdHJpZXJlbic7XG4gICAgICAgICQocmVnaXN0ZXJMaW5rKS5jc3MoJ2N1cnNvcicsICdwb2ludGVyJyk7XG5cbiAgICAgICAgLy8gcGxhY2luZyByZWdpc3RlciBsaW5rIGluIGZpcnN0IGRpdiB0aGF0IGNvbWVzIGFmdGVyIGhvcml6b250YWwgbGluZVxuICAgICAgICBjb25zdCBkaXZGb3JMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdkZvckxpbmsuc2V0QXR0cmlidXRlKCdjbGFzcycsICdnaWd5YS1sYXlvdXQtcm93Jyk7XG4gICAgICAgIGRpdkZvckxpbmsuc2V0QXR0cmlidXRlKCdkaXNwbGF5JywgJ2lubGluZS1mbGV4Jyk7XG4gICAgICAgICQoZGl2Rm9yTGluaykuY3NzKCd0ZXh0LWFsaWduJywgJ2xlZnQnKTtcbiAgICAgICAgJChkaXZGb3JMaW5rKS5jc3MoJ3BhZGRpbmcnLCAnMTBweCAxNXB4Jyk7XG4gICAgICAgIGRpdkZvckxpbmsuYXBwZW5kKHRleHRTcGFuKTtcbiAgICAgICAgZGl2Rm9yTGluay5hcHBlbmQocmVnaXN0ZXJMaW5rKTtcblxuICAgICAgICAkKHRoaXMuZ2lneWFMYXlvdXRSb3cuaXRlbSgxNTkpKS5wcmVwZW5kKGRpdkZvckxpbmspO1xuXG4gICAgICAgIC8vIGNoYW5naW5nIHRla3N0IGluIGJ1dHRvbiA/P1xuICAgICAgICAkKHRoaXMuc3VibWl0QnV0dG9uLml0ZW0oMTEpKS5wYXJlbnQoKS5hdHRyKCdzdHlsZScsICdwYWRkaW5nLWJvdHRvbTogNXB4ICFpbXBvcnRhbnQnKTtcblxuICAgIH1cblxuICAgIHRyaWdnZXJQb3B1cChldmVudD86IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiR0aGlzLnRvZ2dsZUNsYXNzKHRoaXMuc2hvd0NsYXNzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZVRleHRJblN1Ym1pdEJ1dHRvbigpOiB2b2lkIHtcbiAgICAgICAgLy8gc2V0aW5nIHdlaXRlciBpbiBzdWJtaXQgYnV0dG9uXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3VibWl0QnV0dG9uLml0ZW0oMTEpICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24uaXRlbSgxMSkudmFsdWUgPSAnV2VpdGVyJztcbiAgICAgICAgICAgIH19LCAxMzApO1xuICAgIH1cblxuICAgIC8vIGZ1bmN0aW9uIHRvIGNhbGwgR2xvYnVzIEFQSSBhbmQgdG8gc2hvdyB0b2FzdGVyIG1lc3NhZ2UgZm9yIGZhaWx1cmUgb3Igc3VjY2Vzc1xuICAgIHByaXZhdGUgZ2xvYnVzQXBpQ2FsbChlbWFpbDogc3RyaW5nKVxuICAgIHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9wYXNzd29yZC9yZXNldCc7XG4gICAgICAgIGNvbnN0IHJlYWxVcmwgPSAnaHR0cHM6Ly9hcGktZGV2Lmdsb2J1cy5kZTo0NDMvdjIvbWVpbmdsb2J1cy9hY2NvdW50cy9wYXNzd29yZC9yZXNldCc7XG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgbG9jYWxJbnN0YW5jZSA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHVybCwge1xuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpZDogZW1haWxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzKGRhdGEsIHN0YXR1cywgeGhyKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxJbnN0YW5jZS5zaG93U3VjY2Vzc01lc3NhZ2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcihqcVhociwgdGV4dFN0YXR1cywgZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxJbnN0YW5jZS5zaG93RXJyb3JNZXNzYWdlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93U3VjY2Vzc01lc3NhZ2UoKVxuICAgIHtcbiAgICAgICAgJCh0aGlzLmZsYXNoTWVzc2FnZSkucGFyZW50KCkudG9nZ2xlQ2xhc3ModGhpcy5zaG93TWVzc2FnZSk7XG4gICAgICAgICQodGhpcy5mbGFzaE1lc3NhZ2UpLnJlbW92ZUNsYXNzKCdmbGFzaC1tZXNzYWdlLWVycm9yJykuYWRkQ2xhc3MoJ2ZsYXNoLW1lc3NhZ2Utc3VjY2VzcycpO1xuICAgICAgICB0aGlzLmZtVGl0bGUudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgdGhpcy5mbU1lc3NhZ2UudGV4dENvbnRlbnQgPSAnSWhuZW4gd3VyZGUgZWluZSBFLU1haWwgenVyIFBhc3N3b3J0w6RuZGVydW5nIHp1Z2VzdGVsbHQuIEJpdHRlIHByw7xmZW4gU2llIElociBQb3N0ZmFjaC4nO1xuICAgICAgICB0aGlzLmZtTGluay50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VGbGFzaE1lc3NhZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuJHRoaXMudG9nZ2xlQ2xhc3ModGhpcy5zaG93Q2xhc3MpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICB9XG5cbiAgICBzaG93RXJyb3JNZXNzYWdlKCkge1xuICAgICAgICAkKHRoaXMuZmxhc2hNZXNzYWdlKS5wYXJlbnQoKS50b2dnbGVDbGFzcyh0aGlzLnNob3dNZXNzYWdlKTtcbiAgICAgICAgJCh0aGlzLmZsYXNoTWVzc2FnZSkucmVtb3ZlQ2xhc3MoJ2ZsYXNoLW1lc3NhZ2Utc3VjY2VzcycpLmFkZENsYXNzKCdmbGFzaC1tZXNzYWdlLWVycm9yJyk7XG4gICAgICAgIHRoaXMuZm1UaXRsZS50ZXh0Q29udGVudCA9ICdFcnJvciEnO1xuICAgICAgICB0aGlzLmZtTWVzc2FnZS50ZXh0Q29udGVudCA9ICdObyBhY2NvdW50IHdpdGggc2VsZWN0ZWQgZW1haWwuJztcbiAgICAgICAgdGhpcy5mbUxpbmsudGV4dENvbnRlbnQgPSAnT0shJztcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRmxhc2hNZXNzYWdlKCk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xvc2VGbGFzaE1lc3NhZ2UoKSB7XG4gICAgICAgICQodGhpcy5mbGFzaE1lc3NhZ2UpLnBhcmVudCgpLnJlbW92ZUNsYXNzKHRoaXMuc2hvd01lc3NhZ2UpO1xuICAgIH1cblxuICAgIC8vIGdldHRlcnNcbiAgICBnZXQgc2hvd0NsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9LS1zaG93YDtcbiAgICB9XG5cbiAgICBnZXQgc2hvd01lc3NhZ2UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBwYXNzLXJlc2V0LWZsYXNoLW1lc3NhZ2UtLXNob3dgO1xuICAgIH1cblxuICAgIGdldCBjbG9zZUJ1dHRvblNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgLmxvZ2luLWNsb3NlLWljb25gO1xuICAgIH1cblxuICAgIGdldCBnZXRMaW5rVG9Mb2dpbkZvcm0oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdsaW5rLXRvLWxvZ2luLW1vZGFsJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0R2lneWFMYXlvdXRSb3coKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdnaWd5YS1sYXlvdXQtcm93JztcbiAgICB9XG5cbiAgICBnZXQgZ2V0R2lneWFVc2VybmFtZURpdigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2dpZ3lhLWNvbXBvc2l0ZS1jb250cm9sIGdpZ3lhLWNvbXBvc2l0ZS1jb250cm9sLXRleHRib3ggZ2lneWEtY29tcG9zaXRlLWNvbnRyb2wtbG9naW5JRCc7XG4gICAgfVxuXG4gICAgZ2V0IGdldEdpZ3lhUGFzc3dvcmREaXYoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdnaWd5YS1jb21wb3NpdGUtY29udHJvbCBnaWd5YS1jb21wb3NpdGUtY29udHJvbC1wYXNzd29yZCc7XG4gICAgfVxuXG4gICAgZ2V0IGdldFJlZ2lzdGVyVGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2dpZ3lhLWNvbXBvc2l0ZS1jb250cm9sIGdpZ3lhLWNvbXBvc2l0ZS1jb250cm9sLWxpbmsgZ2xvYnVzX3JlZ2lzdGVyX2xpbmsnO1xuICAgIH1cblxuICAgIGdldCBnZXRGb3Jnb3RlblBhc3N3b3JkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAgJ2dpZ3lhLWNvbXBvc2l0ZS1jb250cm9sIGdpZ3lhLWNvbXBvc2l0ZS1jb250cm9sLWxpbmsgZ2xvYnVzX3B3Zm9yZ2V0X2xpbmsnO1xuICAgIH1cblxuICAgIGdldCBnZXRTdWJtaXRCdXR0b24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdnaWd5YS1pbnB1dC1zdWJtaXQnO1xuICAgIH1cblxuICAgIGdldCBnZXRJc1VzZXJMb2dnZWRJbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2lzX3VzZXJfbG9nZ2VkX2luJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0TWFpbElucHV0RmllbGQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdnaWd5YS1pbnB1dC10ZXh0IGdpZ3lhLXNob3ctY2hlY2ttYXJrIGdpZ3lhLXZhbGlkJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0Rmxhc2hNZXNzYWdlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAncGFzc19yZXNldF9mbGFzaF9tZXNzYWdlJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0Rmxhc2hNZXNzYWdlU3RhdGljTGluaygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2ZsYXNoLW1lc3NhZ2Utc3RhdGljLWxpbmsnO1xuICAgIH1cblxuICAgIGdldCBnZXRGbGFzaE1lc3NhZ2VUaXRsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2ZsYXNoLW1lc3NhZ2UtdGl0bGUnO1xuICAgIH1cblxuICAgIGdldCBnZXRGbGFzaE1lc3NhZ2VNZXNzYWdlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnZmxhc2gtbWVzc2FnZS1tZXNzYWdlJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0V2hpY2hDb3VudHJ5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnd2hpY2hfY291bnRyeSc7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==