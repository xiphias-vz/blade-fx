(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[19],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/ajax-add-to-cart/ajax-add-to-cart.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/ajax-add-to-cart/ajax-add-to-cart.ts ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AjaxAddToCart; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var HIDDEN_CLASS = 'is-hidden';
var CLASS_PREFIX = '.';
var ID_PREFIX = '#';
class AjaxAddToCart extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "$this", jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this));

    _defineProperty(this, "links", void 0);

    _defineProperty(this, "cartBlock", void 0);

    _defineProperty(this, "amount", void 0);

    _defineProperty(this, "quantity", void 0);

    _defineProperty(this, "itemQuantity", void 0);

    _defineProperty(this, "operation", void 0);

    _defineProperty(this, "icon", void 0);

    _defineProperty(this, "flashMessages", void 0);

    _defineProperty(this, "messagesTextHolders", void 0);

    _defineProperty(this, "notificationArea", void 0);

    _defineProperty(this, "addToCartIncrementerLinks", void 0);

    _defineProperty(this, "addtoCartDecrementerLinks", void 0);

    _defineProperty(this, "quantityInputs", void 0);

    _defineProperty(this, "quantityAdded", void 0);

    _defineProperty(this, "timer", void 0);

    _defineProperty(this, "callBackDelay", void 0);

    _defineProperty(this, "environment", void 0);

    _defineProperty(this, "url", void 0);
  }

  readyCallback() {
    this.environment = document.querySelector('#environment');

    if (this.environment.value === 'DE') {
      var checkRecordsAreRendered = setInterval(() => {
        this.links = Array.from(document.getElementsByClassName(this.addToCartLinkClass));

        if (this.links.length > 0) {
          this.load();
          clearInterval(checkRecordsAreRendered);
        }
      }, 500);
    } else {
      this.load();
    }
  }

  load() {
    this.links = Array.from(document.getElementsByClassName(this.addToCartLinkClass));
    this.addToCartIncrementerLinks = Array.from(document.getElementsByClassName(this.addToCartIncrementer));
    this.addtoCartDecrementerLinks = Array.from(document.getElementsByClassName(this.addToCartDecrementer));
    this.quantityInputs = Array.from(document.querySelectorAll(CLASS_PREFIX + this.quantityInputField));
    this.quantityAdded = 0;

    if (!this.links.length) {
      return;
    }

    this.icon = document.getElementsByClassName(this.iconClass)[0];
    this.cartBlock = document.getElementsByClassName(this.cartClass)[0];
    this.amount = Array.from(document.getElementsByClassName(this.amountClass));
    this.quantity = Array.from(document.getElementsByClassName(this.quantityClass));
    this.flashMessages = Array.from(this.getElementsByClassName(this.flashMessagesClass));
    this.notificationArea = this.getElementsByClassName(this.notificationAreaClass)[0];
    this.messagesTextHolders = Array.from(this.getElementsByClassName(this.messagesTextHolderClass));
    this.callBackDelay = 800;

    if (this.environment.value === 'DE') {
      this.listenForUrlChanges();
      this.url = location.href;
    }

    this.mapEvents();
  }

  listenForUrlChanges() {
    setInterval(() => {
      if (this.url != location.href) {
        this.url = location.href;
        this.load();
      }
    }, 500);
  }

  mapEvents() {
    this.links.forEach(link => {
      if (localStorage.getItem('productItemsForSyncCounter')) {
        this.syncCounterFromLocalStorage(link);
      }

      if (link.getAttribute('flag') !== "1") {
        link.addEventListener('click', event => this.linkClickHandler(event, link));
        link.setAttribute('flag', '1');
      }
    });
    this.addToCartIncrementerLinks.forEach((incrementer, index) => {
      if (incrementer.getAttribute('flag') !== "1") {
        incrementer.addEventListener('click', event => this.sendAjaxRequestToAddItemToCart(event, incrementer));
        incrementer.setAttribute('flag', '1');
      }
    });
    this.addtoCartDecrementerLinks.forEach((decrementer, index) => {
      if (decrementer.getAttribute('flag') !== "1") {
        decrementer.addEventListener('click', event => this.sendAjaxRequestToRemoveItemFromCart(event, decrementer));
        decrementer.setAttribute('flag', '1');
      }
    });
    this.quantityInputs.forEach(quantityInput => {
      quantityInput.addEventListener('keyup', event => this.applyQuantityValidation(event));
      quantityInput.addEventListener('change', event => this.sendAjaxRequestToAddMultipleItemsToCart(event));
    });
  }

  syncCounterFromLocalStorage(link) {
    var productItemsForSyncCounter = JSON.parse(localStorage.getItem('productItemsForSyncCounter'));
    productItemsForSyncCounter.forEach((_ref) => {
      var [key, value] = _ref;
      var productSkuFromPOP = link.dataset.productSku;

      if (productSkuFromPOP === '' || productSkuFromPOP === undefined) {
        var productUrl = link.dataset.productUrl;

        if (productUrl) {
          productSkuFromPOP = productUrl.split("/")[3];
        }
      }

      if (key === productSkuFromPOP) {
        var quantityFromCart = value;

        if (quantityFromCart !== 0) {
          this.updateItemQuantityInput(link, quantityFromCart);
          this.showCounterAndHideAjaxButton(link);
        } else {
          var filteredProductItemsFromCart = productItemsForSyncCounter.filter((_ref2) => {
            var [key, value] = _ref2;
            return value !== 0;
          });
          localStorage.setItem('productItemsForSyncCounter', JSON.stringify(filteredProductItemsFromCart));

          if (localStorage.getItem('productItemsForSyncCounter') === '[]') {
            localStorage.removeItem('productItemsForSyncCounter');
          }
        }
      }
    });
  }

  applyQuantityValidation(event) {
    var quantityInput = event.target;
    var quantity = quantityInput.value;

    if (quantity === '' || quantity === '0') {
      quantityInput.value = '1';
    } else if (quantity.length > 2) {
      quantityInput.value = quantity[0] + quantity[1];
    }
  }

  sendAjaxRequestToAddMultipleItemsToCart(event) {
    var quantityInput = event.target;
    var quantity = quantityInput.value;
    var incrementer = quantityInput.nextElementSibling;
    this.sendRequest(incrementer.href, incrementer, String(quantity), 'ADD_MULTIPLE');
  }

  sendAjaxRequestToAddItemToCart(event, incrementer) {
    event.preventDefault();
    clearTimeout(this.timer);
    var quantityInput = incrementer.previousElementSibling;
    var quantity = Number(quantityInput.value);
    quantity++;
    this.quantityAdded++;
    quantityInput.value = String(quantity);
    this.addOrRemoveBinIcon(incrementer.parentElement);
    this.timer = setTimeout(() => {
      this.sendRequest(incrementer.href, incrementer, String(quantityInput.value), 'ADD');
    }, this.callBackDelay);
  }

  sendAjaxRequestToRemoveItemFromCart(event, decrementer) {
    event.preventDefault();
    clearTimeout(this.timer);
    var quantityInput = decrementer.nextElementSibling;
    var quantity = Number(quantityInput.value);
    quantity--;
    quantityInput.value = String(quantity);
    this.toggleCounterAndAjaxButtons(decrementer, 'REMOVE', quantity);
    this.addOrRemoveBinIcon(decrementer.parentElement);
    this.timer = setTimeout(() => {
      this.sendRequest(decrementer.href, decrementer, String(quantityInput.value), 'REMOVE');
    }, this.callBackDelay);
  }

  linkClickHandler(event, link) {
    event.preventDefault();
    this.sendRequest(link.href, link, String(1), null);
  }

  sendRequest(url, link, quantity, operation) {
    var _this = this;

    return _asyncToGenerator(function* () {
      var productSku = link.dataset.productSku;
      var productPrice = link.dataset.productPrice * 100;
      var productTitle = link.dataset.productTitle;
      var formData = new FormData();
      formData.append('token', link.dataset.csrfToken);
      formData.append('operation', operation);
      formData.append('quantity', quantity);
      var that = _this;
      jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default.a.ajax(url, {
        type: 'POST',
        dataType: 'json',
        data: {
          myToken: link.dataset.csrfToken,
          myOperation: operation,
          myQuantity: quantity,
          productSku: productSku,
          productPrice: productPrice,
          productTitle: productTitle,
          addedQuantity: that.quantityAdded
        },

        success(data, status, xhr) {
          if (data.error !== '') {
            that.setMessages(data.error);
            that.showMessages();
            return;
          }

          that.updateItemQuantityInput(link, data.itemQuantity);
          that.replaceQuantity(data.quantity);
          that.replaceAmount(data.amount);
          that.hideIcon();
          that.showQuantity();
          that.quantityAdded = 0;
          var isCounterVisible = operation !== null;

          if (isCounterVisible) {
            that.showMessage(data, link);
          } else {
            that.showCounterAndHideAjaxButton(link);
          }
        },

        error(jqXhr, textStatus, errorMessage) {
          that.setMessages(jqXhr.error);
          that.showMessages();
        }

      });
    })();
  }

  showMessages() {
    this.notificationArea.classList.remove(HIDDEN_CLASS);
    this.flashMessages.forEach(flashMessageItem => {
      flashMessageItem.showFor(flashMessageItem.defaultDuration);
    });
  }

  setMessages(message) {
    this.messagesTextHolders.forEach(messageItem => {
      messageItem.innerHTML = message;
    });
  }

  replaceAmount(amount) {
    this.amount.forEach(amountItem => {
      amountItem.innerHTML = amount;
    });
  }

  replaceQuantity(quantity) {
    this.quantity.forEach(amountItem => {
      amountItem.innerHTML = quantity;
    });
  }

  trackingInfo(link) {
    return {
      sku: link.dataset.productSku,
      title: link.dataset.productTitle,
      price: link.dataset.productPrice
    };
  }

  hideIcon() {
    if (this.icon) {
      this.icon.classList.add(HIDDEN_CLASS);
    }
  }

  showQuantity() {
    this.quantity.forEach(amountItem => {
      amountItem.classList.remove(HIDDEN_CLASS);
    });
  }

  toggleCounterAndAjaxButtons(link, operation, quantity) {
    if (operation === 'REMOVE' && quantity === 0) {
      this.showAjaxButtonAndHideCounter(link);
    }
  }

  updateItemQuantityInput(link, quantity) {
    if (quantity !== undefined) {
      var productSkuFromPOP = link.dataset.productSku;

      if (productSkuFromPOP === '' || productSkuFromPOP === undefined) {
        var productUrl = link.dataset.productUrl;

        if (productUrl) {
          productSkuFromPOP = productUrl.split("/")[3];
        }
      }

      var itemAddedInCartWithQuantity = [[productSkuFromPOP, quantity]];

      if (localStorage.getItem('productItemsForSyncCounter')) {
        var productItemsForSyncCounter = JSON.parse(localStorage.getItem('productItemsForSyncCounter'));

        for (var i = 0; i < productItemsForSyncCounter.length; i++) {
          if (productItemsForSyncCounter[i][0].includes(productSkuFromPOP) && productItemsForSyncCounter[i][0] !== null) {
            productItemsForSyncCounter[i][1] = quantity;
          }
        }

        if (!JSON.stringify(productItemsForSyncCounter).includes(JSON.stringify(itemAddedInCartWithQuantity[0][0]))) {
          productItemsForSyncCounter.push(itemAddedInCartWithQuantity[0]);
        }

        localStorage.setItem('productItemsForSyncCounter', JSON.stringify(productItemsForSyncCounter));
      } else {
        localStorage.setItem('productItemsForSyncCounter', JSON.stringify(itemAddedInCartWithQuantity));
      }

      var counter = link.parentElement.parentElement.querySelector(CLASS_PREFIX + this.quantityInputField);
      counter.value = String(quantity);
    }
  }

  showMessage(response, link) {
    var parentCounter = link.parentElement;
    var addedItemMessage = parentCounter.querySelector(CLASS_PREFIX + this.itemAdded);
    var removeItemMessage = parentCounter.querySelector(CLASS_PREFIX + this.itemRemoved);

    if (response.code === 200 && response.operation === 'ADD') {
      if (!this.showTopMessageForMobileDevice(addedItemMessage, response)) {
        if (!this.errorExistsAndQuantityBiggerThanQuantityFromTheCart(response)) {
          addedItemMessage.classList.remove('is-hidden');
          this.removeItemTimeOut(addedItemMessage);
        }
      }
    } else if (response.code === 200 && response.operation === 'ADD_MULTIPLE') {
      if (!this.showTopMessageForMobileDevice(addedItemMessage, response)) {
        if (!this.errorExistsAndQuantityBiggerThanQuantityFromTheCart(response)) {
          addedItemMessage.classList.remove('is-hidden');
          this.removeItemTimeOut(addedItemMessage);
        }
      }
    } else {
      if (!this.showTopMessageForMobileDevice(removeItemMessage, response)) {
        if (!this.errorExistsAndQuantityBiggerThanQuantityFromTheCart(response)) {
          removeItemMessage.classList.remove('is-hidden');
          this.removeItemTimeOut(removeItemMessage);
        }
      }
    }
  }

  errorExistsAndQuantityBiggerThanQuantityFromTheCart(response) {
    if (response.error.length > 0) {
      var itemQuantityFromCart = response.itemQuantity;
      var currentQuantity = response.quantity;

      if (currentQuantity > itemQuantityFromCart) {
        return true;
      }
    }

    return false;
  }

  removeItemTimeOut(element) {
    setTimeout(() => {
      element.classList.add('is-hidden');
    }, 2000);
  }

  showTopMessageForMobileDevice(message, response) {
    var windowWidth = window.screen.width;

    if (windowWidth < 574 && !this.errorExistsAndQuantityBiggerThanQuantityFromTheCart(response)) {
      var topMessage = message.cloneNode(true);
      var body = document.body;
      topMessage.style.cssText = this.cssMessage();
      var checkMark = topMessage.querySelector('.checkmark');
      checkMark.style.cssText = this.cssCheckMark();
      topMessage.classList.remove('is-hidden');
      body.style.position = 'relative';
      body.insertBefore(topMessage, body.firstElementChild);
      setTimeout(() => {
        topMessage.remove();
      }, 2000);
      return true;
    }

    return false;
  }

  showCounterAndHideAjaxButton(link) {
    var counter = link == null ? void 0 : link.nextElementSibling;
    counter == null ? void 0 : counter.classList.add(this.ajaxCartCounterClass);
    counter == null ? void 0 : counter.classList.remove(HIDDEN_CLASS);
    link == null ? void 0 : link.classList.add(HIDDEN_CLASS);
    this.addOrRemoveBinIcon(counter);
  }

  addOrRemoveBinIcon(element) {
    var decreaseButtonElement = element.getElementsByClassName(this.addToCartDecrementer)[0];
    var quantityElement = element.getElementsByClassName(this.quantityInputField)[0];

    if (quantityElement.valueAsNumber > 1 && decreaseButtonElement.classList.contains(this.addBinIcon)) {
      decreaseButtonElement.classList.remove(this.addBinIcon);
      decreaseButtonElement.innerText = "-";
    } else if (quantityElement.valueAsNumber === 1) {
      decreaseButtonElement.classList.add(this.addBinIcon);
      decreaseButtonElement.innerText = "";
    }
  }

  showAjaxButtonAndHideCounter(link) {
    var counter = link == null ? void 0 : link.parentElement;
    var addAjaxButton = link == null ? void 0 : link.parentElement.parentElement.querySelector(CLASS_PREFIX + this.ajaxAddQuantityLink);
    counter == null ? void 0 : counter.classList.remove(this.ajaxCartCounterClass);
    counter == null ? void 0 : counter.classList.add(HIDDEN_CLASS);
    addAjaxButton == null ? void 0 : addAjaxButton.classList.remove(HIDDEN_CLASS);
    addAjaxButton.removeAttribute('disabled');
  }

  get addToCartLinkClass() {
    return this.jsName + "__link";
  }

  get addToCartIncrementer() {
    return 'js-quantity-counter-product__incr';
  }

  get addToCartDecrementer() {
    return 'js-quantity-counter-product__decr';
  }

  get ajaxAddQuantityLink() {
    return 'js-ajax-add-to-cart__link';
  }

  get ajaxChangeQuantityLink() {
    return 'js-ajax-change-quantity__link';
  }

  get ajaxCartCounterClass() {
    return 'change-cart-counter';
  }

  get quantityInputField() {
    return 'txt-product-quantity';
  }

  get addBinIcon() {
    return 'add-bin';
  }

  get itemAdded() {
    return 'item-added';
  }

  get itemRemoved() {
    return 'item-removed';
  }

  get cartClass() {
    return this.jsName + "__cart-block";
  }

  get amountClass() {
    return this.jsName + "__amount";
  }

  get quantityClass() {
    return this.jsName + "__quantity";
  }

  get iconClass() {
    return this.jsName + "__icon";
  }

  get flashMessagesClass() {
    return this.jsName + "__flash-message";
  }

  get messagesTextHolderClass() {
    return this.jsName + "__message-text";
  }

  get notificationAreaClass() {
    return this.jsName + "__notification-area";
  }

  cssMessage() {
    return "\n            width:90%;\n            display:flex;\n            justify-content:center;\n            align-items:center;\n            position: fixed;\n            top: 5px;\n            left: 5%;\n            padding: 10px;\n            background-color:#7b7b7b;\n            color: #fff;\n            z-index: 999;\n        ";
  }

  cssCheckMark() {
    return "\n            position: absolute;\n            top: 6px;\n            left:15px;\n            display: inline-block;\n            transform: rotate(45deg);\n            height: 22px;\n            width: 11px;\n            border-bottom: 2px solid #fff;\n            border-right: 2px solid #fff;\n        ";
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvYWpheC1hZGQtdG8tY2FydC9hamF4LWFkZC10by1jYXJ0LnRzIl0sIm5hbWVzIjpbIkhJRERFTl9DTEFTUyIsIkNMQVNTX1BSRUZJWCIsIklEX1BSRUZJWCIsIkFqYXhBZGRUb0NhcnQiLCJDb21wb25lbnQiLCIkIiwicmVhZHlDYWxsYmFjayIsImVudmlyb25tZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidmFsdWUiLCJjaGVja1JlY29yZHNBcmVSZW5kZXJlZCIsInNldEludGVydmFsIiwibGlua3MiLCJBcnJheSIsImZyb20iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiYWRkVG9DYXJ0TGlua0NsYXNzIiwibGVuZ3RoIiwibG9hZCIsImNsZWFySW50ZXJ2YWwiLCJhZGRUb0NhcnRJbmNyZW1lbnRlckxpbmtzIiwiYWRkVG9DYXJ0SW5jcmVtZW50ZXIiLCJhZGR0b0NhcnREZWNyZW1lbnRlckxpbmtzIiwiYWRkVG9DYXJ0RGVjcmVtZW50ZXIiLCJxdWFudGl0eUlucHV0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJxdWFudGl0eUlucHV0RmllbGQiLCJxdWFudGl0eUFkZGVkIiwiaWNvbiIsImljb25DbGFzcyIsImNhcnRCbG9jayIsImNhcnRDbGFzcyIsImFtb3VudCIsImFtb3VudENsYXNzIiwicXVhbnRpdHkiLCJxdWFudGl0eUNsYXNzIiwiZmxhc2hNZXNzYWdlcyIsImZsYXNoTWVzc2FnZXNDbGFzcyIsIm5vdGlmaWNhdGlvbkFyZWEiLCJub3RpZmljYXRpb25BcmVhQ2xhc3MiLCJtZXNzYWdlc1RleHRIb2xkZXJzIiwibWVzc2FnZXNUZXh0SG9sZGVyQ2xhc3MiLCJjYWxsQmFja0RlbGF5IiwibGlzdGVuRm9yVXJsQ2hhbmdlcyIsInVybCIsImxvY2F0aW9uIiwiaHJlZiIsIm1hcEV2ZW50cyIsImZvckVhY2giLCJsaW5rIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInN5bmNDb3VudGVyRnJvbUxvY2FsU3RvcmFnZSIsImdldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImxpbmtDbGlja0hhbmRsZXIiLCJzZXRBdHRyaWJ1dGUiLCJpbmNyZW1lbnRlciIsImluZGV4Iiwic2VuZEFqYXhSZXF1ZXN0VG9BZGRJdGVtVG9DYXJ0IiwiZGVjcmVtZW50ZXIiLCJzZW5kQWpheFJlcXVlc3RUb1JlbW92ZUl0ZW1Gcm9tQ2FydCIsInF1YW50aXR5SW5wdXQiLCJhcHBseVF1YW50aXR5VmFsaWRhdGlvbiIsInNlbmRBamF4UmVxdWVzdFRvQWRkTXVsdGlwbGVJdGVtc1RvQ2FydCIsInByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyIiwiSlNPTiIsInBhcnNlIiwia2V5IiwicHJvZHVjdFNrdUZyb21QT1AiLCJkYXRhc2V0IiwicHJvZHVjdFNrdSIsInVuZGVmaW5lZCIsInByb2R1Y3RVcmwiLCJzcGxpdCIsInF1YW50aXR5RnJvbUNhcnQiLCJ1cGRhdGVJdGVtUXVhbnRpdHlJbnB1dCIsInNob3dDb3VudGVyQW5kSGlkZUFqYXhCdXR0b24iLCJmaWx0ZXJlZFByb2R1Y3RJdGVtc0Zyb21DYXJ0IiwiZmlsdGVyIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInJlbW92ZUl0ZW0iLCJ0YXJnZXQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJzZW5kUmVxdWVzdCIsIlN0cmluZyIsInByZXZlbnREZWZhdWx0IiwiY2xlYXJUaW1lb3V0IiwidGltZXIiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiTnVtYmVyIiwiYWRkT3JSZW1vdmVCaW5JY29uIiwicGFyZW50RWxlbWVudCIsInNldFRpbWVvdXQiLCJ0b2dnbGVDb3VudGVyQW5kQWpheEJ1dHRvbnMiLCJvcGVyYXRpb24iLCJwcm9kdWN0UHJpY2UiLCJwcm9kdWN0VGl0bGUiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiY3NyZlRva2VuIiwidGhhdCIsImFqYXgiLCJ0eXBlIiwiZGF0YVR5cGUiLCJkYXRhIiwibXlUb2tlbiIsIm15T3BlcmF0aW9uIiwibXlRdWFudGl0eSIsImFkZGVkUXVhbnRpdHkiLCJzdWNjZXNzIiwic3RhdHVzIiwieGhyIiwiZXJyb3IiLCJzZXRNZXNzYWdlcyIsInNob3dNZXNzYWdlcyIsIml0ZW1RdWFudGl0eSIsInJlcGxhY2VRdWFudGl0eSIsInJlcGxhY2VBbW91bnQiLCJoaWRlSWNvbiIsInNob3dRdWFudGl0eSIsImlzQ291bnRlclZpc2libGUiLCJzaG93TWVzc2FnZSIsImpxWGhyIiwidGV4dFN0YXR1cyIsImVycm9yTWVzc2FnZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImZsYXNoTWVzc2FnZUl0ZW0iLCJzaG93Rm9yIiwiZGVmYXVsdER1cmF0aW9uIiwibWVzc2FnZSIsIm1lc3NhZ2VJdGVtIiwiaW5uZXJIVE1MIiwiYW1vdW50SXRlbSIsInRyYWNraW5nSW5mbyIsInNrdSIsInRpdGxlIiwicHJpY2UiLCJhZGQiLCJzaG93QWpheEJ1dHRvbkFuZEhpZGVDb3VudGVyIiwiaXRlbUFkZGVkSW5DYXJ0V2l0aFF1YW50aXR5IiwiaSIsImluY2x1ZGVzIiwicHVzaCIsImNvdW50ZXIiLCJyZXNwb25zZSIsInBhcmVudENvdW50ZXIiLCJhZGRlZEl0ZW1NZXNzYWdlIiwiaXRlbUFkZGVkIiwicmVtb3ZlSXRlbU1lc3NhZ2UiLCJpdGVtUmVtb3ZlZCIsImNvZGUiLCJzaG93VG9wTWVzc2FnZUZvck1vYmlsZURldmljZSIsImVycm9yRXhpc3RzQW5kUXVhbnRpdHlCaWdnZXJUaGFuUXVhbnRpdHlGcm9tVGhlQ2FydCIsInJlbW92ZUl0ZW1UaW1lT3V0IiwiaXRlbVF1YW50aXR5RnJvbUNhcnQiLCJjdXJyZW50UXVhbnRpdHkiLCJlbGVtZW50Iiwid2luZG93V2lkdGgiLCJ3aW5kb3ciLCJzY3JlZW4iLCJ3aWR0aCIsInRvcE1lc3NhZ2UiLCJjbG9uZU5vZGUiLCJib2R5Iiwic3R5bGUiLCJjc3NUZXh0IiwiY3NzTWVzc2FnZSIsImNoZWNrTWFyayIsImNzc0NoZWNrTWFyayIsInBvc2l0aW9uIiwiaW5zZXJ0QmVmb3JlIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhamF4Q2FydENvdW50ZXJDbGFzcyIsImRlY3JlYXNlQnV0dG9uRWxlbWVudCIsInF1YW50aXR5RWxlbWVudCIsInZhbHVlQXNOdW1iZXIiLCJjb250YWlucyIsImFkZEJpbkljb24iLCJpbm5lclRleHQiLCJhZGRBamF4QnV0dG9uIiwiYWpheEFkZFF1YW50aXR5TGluayIsInJlbW92ZUF0dHJpYnV0ZSIsImpzTmFtZSIsImFqYXhDaGFuZ2VRdWFudGl0eUxpbmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUE7QUFDQSxJQUFNQSxZQUFZLEdBQUcsV0FBckI7QUFDQSxJQUFNQyxZQUFZLEdBQUcsR0FBckI7QUFDQSxJQUFNQyxTQUFTLEdBQUcsR0FBbEI7QUFFZSxNQUFNQyxhQUFOLFNBQTRCQywrREFBNUIsQ0FBc0M7QUFBQTtBQUFBOztBQUFBLG1DQUM1QkMseURBQUMsQ0FBQyxJQUFELENBRDJCOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBcUJ2Q0MsZUFBVixHQUFnQztBQUM1QixTQUFLQyxXQUFMLEdBQXFDQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBckM7O0FBQ0EsUUFBSSxLQUFLRixXQUFMLENBQWlCRyxLQUFqQixLQUEyQixJQUEvQixFQUFxQztBQUNqQyxVQUFJQyx1QkFBdUIsR0FBR0MsV0FBVyxDQUFDLE1BQU07QUFDNUMsYUFBS0MsS0FBTCxHQUFnQ0MsS0FBSyxDQUFDQyxJQUFOLENBQVdQLFFBQVEsQ0FBQ1Esc0JBQVQsQ0FBZ0MsS0FBS0Msa0JBQXJDLENBQVgsQ0FBaEM7O0FBRUEsWUFBRyxLQUFLSixLQUFMLENBQVdL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QUFQO0FBQ0g7O0FBRUQsTUFBY0Usb0JBQWQsR0FBNkM7QUFDekMsV0FBTyxtQ0FBUDtBQUNIOztBQUVELE1BQWNrSyxtQkFBZCxHQUE0QztBQUN4QyxXQUFPLDJCQUFQO0FBQ0g7O0FBRUQsTUFBY0csc0JBQWQsR0FBK0M7QUFDM0MsV0FBTywrQkFBUDtBQUNIOztBQUVELE1BQWNYLG9CQUFkLEdBQTZDO0FBQ3pDLFdBQU8scUJBQVA7QUFDSDs7QUFFRCxNQUFjdkosa0JBQWQsR0FBMkM7QUFDdkMsV0FBTyxzQkFBUDtBQUNIOztBQUVELE1BQWM0SixVQUFkLEdBQW1DO0FBQy9CLFdBQU8sU0FBUDtBQUNIOztBQUVELE1BQWM5QixTQUFkLEdBQWtDO0FBQzlCLFdBQU8sWUFBUDtBQUNIOztBQUVELE1BQWNFLFdBQWQsR0FBb0M7QUFDaEMsV0FBTyxjQUFQO0FBQ0g7O0FBRUQsTUFBYzNILFNBQWQsR0FBa0M7QUFDOUIsV0FBVSxLQUFLNEosTUFBZjtBQUNIOztBQUVELE1BQWMxSixXQUFkLEdBQW9DO0FBQ2hDLFdBQVUsS0FBSzBKLE1BQWY7QUFDSDs7QUFFRCxNQUFjeEosYUFBZCxHQUFzQztBQUNsQyxXQUFVLEtBQUt3SixNQUFmO0FBQ0g7O0FBRUQsTUFBYzlKLFNBQWQsR0FBa0M7QUFDOUIsV0FBVSxLQUFLOEosTUFBZjtBQUNIOztBQUVELE1BQWN0SixrQkFBZCxHQUEyQztBQUN2QyxXQUFVLEtBQUtzSixNQUFmO0FBQ0g7O0FBRUQsTUFBY2xKLHVCQUFkLEdBQWdEO0FBQzVDLFdBQVUsS0FBS2tKLE1BQWY7QUFDSDs7QUFFRCxNQUFjcEoscUJBQWQsR0FBOEM7QUFDMUMsV0FBVSxLQUFLb0osTUFBZjtBQUNIOztBQUVTaEIsWUFBVixHQUErQjtBQUUzQjtBQWFIOztBQUVTRSxjQUFWLEdBQWlDO0FBRTdCO0FBV0g7O0FBL2dCZ0QsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4xOS5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCBGbGFzaE1lc3NhZ2UgZnJvbSAnU2hvcFVpL2NvbXBvbmVudHMvbW9sZWN1bGVzL2ZsYXNoLW1lc3NhZ2UvZmxhc2gtbWVzc2FnZSc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnkvZGlzdC9qcXVlcnknO1xuY29uc3QgSElEREVOX0NMQVNTID0gJ2lzLWhpZGRlbic7XG5jb25zdCBDTEFTU19QUkVGSVggPSAnLic7XG5jb25zdCBJRF9QUkVGSVggPSAnIyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqYXhBZGRUb0NhcnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCAkdGhpczogJCA9ICQodGhpcyk7XG4gICAgcHJvdGVjdGVkIGxpbmtzOiBIVE1MTGlua0VsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgY2FydEJsb2NrOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgYW1vdW50OiBIVE1MRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBxdWFudGl0eTogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgaXRlbVF1YW50aXR5OiBIVE1MRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBvcGVyYXRpb246IEhUTUxFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIGljb246IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBmbGFzaE1lc3NhZ2VzOiBGbGFzaE1lc3NhZ2VbXTtcbiAgICBwcm90ZWN0ZWQgbWVzc2FnZXNUZXh0SG9sZGVyczogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgbm90aWZpY2F0aW9uQXJlYTogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBhZGRUb0NhcnRJbmNyZW1lbnRlckxpbmtzOiBIVE1MRWxlbWVudFtdO1xuICAgIHByaXZhdGUgYWRkdG9DYXJ0RGVjcmVtZW50ZXJMaW5rczogSFRNTEVsZW1lbnRbXTtcbiAgICBwcml2YXRlIHF1YW50aXR5SW5wdXRzOiBIVE1MSW5wdXRFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIHF1YW50aXR5QWRkZWQ7XG4gICAgcHJvdGVjdGVkIHRpbWVyO1xuICAgIHByb3RlY3RlZCBjYWxsQmFja0RlbGF5OiBudW1iZXI7XG4gICAgcHJvdGVjdGVkIGVudmlyb25tZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCB1cmw6IHN0cmluZztcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVudmlyb25tZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Vudmlyb25tZW50Jyk7XG4gICAgICAgIGlmICh0aGlzLmVudmlyb25tZW50LnZhbHVlID09PSAnREUnKSB7XG4gICAgICAgICAgICBsZXQgY2hlY2tSZWNvcmRzQXJlUmVuZGVyZWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5rcyA9IDxIVE1MTGlua0VsZW1lbnRbXT5BcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5hZGRUb0NhcnRMaW5rQ2xhc3MpKTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMubGlua3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjaGVja1JlY29yZHNBcmVSZW5kZXJlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWQoKSB7XG4gICAgICAgIHRoaXMubGlua3MgPSA8SFRNTExpbmtFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuYWRkVG9DYXJ0TGlua0NsYXNzKSk7XG4gICAgICAgIHRoaXMuYWRkVG9DYXJ0SW5jcmVtZW50ZXJMaW5rcyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmFkZFRvQ2FydEluY3JlbWVudGVyKSk7XG4gICAgICAgIHRoaXMuYWRkdG9DYXJ0RGVjcmVtZW50ZXJMaW5rcyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmFkZFRvQ2FydERlY3JlbWVudGVyKSk7XG4gICAgICAgIHRoaXMucXVhbnRpdHlJbnB1dHMgPSA8SFRNTElucHV0RWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChDTEFTU19QUkVGSVggKyB0aGlzLnF1YW50aXR5SW5wdXRGaWVsZCkpO1xuICAgICAgICB0aGlzLnF1YW50aXR5QWRkZWQgPSAwO1xuXG4gICAgICAgIGlmICghdGhpcy5saW5rcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmljb24gPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmljb25DbGFzcylbMF07XG4gICAgICAgIHRoaXMuY2FydEJsb2NrID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5jYXJ0Q2xhc3MpWzBdO1xuICAgICAgICB0aGlzLmFtb3VudCA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmFtb3VudENsYXNzKSk7XG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5xdWFudGl0eUNsYXNzKSk7XG4gICAgICAgIHRoaXMuZmxhc2hNZXNzYWdlcyA9IDxGbGFzaE1lc3NhZ2VbXT5BcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmZsYXNoTWVzc2FnZXNDbGFzcykpO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbkFyZWEgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMubm90aWZpY2F0aW9uQXJlYUNsYXNzKVswXTtcbiAgICAgICAgdGhpcy5tZXNzYWdlc1RleHRIb2xkZXJzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbShcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLm1lc3NhZ2VzVGV4dEhvbGRlckNsYXNzKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNhbGxCYWNrRGVsYXkgPSA4MDA7XG4gICAgICAgIGlmKHRoaXMuZW52aXJvbm1lbnQudmFsdWUgPT09ICdERScpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuRm9yVXJsQ2hhbmdlcygpO1xuICAgICAgICAgICAgdGhpcy51cmwgPSBsb2NhdGlvbi5ocmVmO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxpc3RlbkZvclVybENoYW5nZXMoKSB7XG4gICAgICAgIHNldEludGVydmFsKCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVybCAhPSBsb2NhdGlvbi5ocmVmKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMudXJsID0gbG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgNTAwKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxpbmtzLmZvckVhY2goKGxpbms6IEhUTUxMaW5rRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jQ291bnRlckZyb21Mb2NhbFN0b3JhZ2UobGluayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChsaW5rLmdldEF0dHJpYnV0ZSgnZmxhZycpICE9PSBcIjFcIikge1xuICAgICAgICAgICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLmxpbmtDbGlja0hhbmRsZXIoZXZlbnQsIGxpbmspKTtcbiAgICAgICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZmxhZycsICcxJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkVG9DYXJ0SW5jcmVtZW50ZXJMaW5rcy5mb3JFYWNoKChpbmNyZW1lbnRlcjogSFRNTExpbmtFbGVtZW50LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5jcmVtZW50ZXIuZ2V0QXR0cmlidXRlKCdmbGFnJykgIT09IFwiMVwiKSB7XG4gICAgICAgICAgICAgICAgaW5jcmVtZW50ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLnNlbmRBamF4UmVxdWVzdFRvQWRkSXRlbVRvQ2FydChldmVudCwgaW5jcmVtZW50ZXIpKTtcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRlci5zZXRBdHRyaWJ1dGUoJ2ZsYWcnLCAnMScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZHRvQ2FydERlY3JlbWVudGVyTGlua3MuZm9yRWFjaCgoZGVjcmVtZW50ZXI6IEhUTUxMaW5rRWxlbWVudCwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGRlY3JlbWVudGVyLmdldEF0dHJpYnV0ZSgnZmxhZycpICE9PSBcIjFcIikge1xuICAgICAgICAgICAgICAgIGRlY3JlbWVudGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5zZW5kQWpheFJlcXVlc3RUb1JlbW92ZUl0ZW1Gcm9tQ2FydChldmVudCwgZGVjcmVtZW50ZXIpKTtcbiAgICAgICAgICAgICAgICBkZWNyZW1lbnRlci5zZXRBdHRyaWJ1dGUoJ2ZsYWcnLCAnMScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnF1YW50aXR5SW5wdXRzLmZvckVhY2goKHF1YW50aXR5SW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHF1YW50aXR5SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLmFwcGx5UXVhbnRpdHlWYWxpZGF0aW9uKGV2ZW50KSk7XG4gICAgICAgICAgICBxdWFudGl0eUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudDogRXZlbnQpID0+IHRoaXMuc2VuZEFqYXhSZXF1ZXN0VG9BZGRNdWx0aXBsZUl0ZW1zVG9DYXJ0KGV2ZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzeW5jQ291bnRlckZyb21Mb2NhbFN0b3JhZ2UobGluayk6IHZvaWQge1xuICAgICAgICBsZXQgcHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcicpKTtcblxuICAgICAgICBwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlci5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9kdWN0U2t1RnJvbVBPUCA9IGxpbmsuZGF0YXNldC5wcm9kdWN0U2t1O1xuICAgICAgICAgICAgaWYgKHByb2R1Y3RTa3VGcm9tUE9QID09PSAnJyB8fCBwcm9kdWN0U2t1RnJvbVBPUCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByb2R1Y3RVcmwgPSBsaW5rLmRhdGFzZXQucHJvZHVjdFVybDtcbiAgICAgICAgICAgICAgICBpZiAocHJvZHVjdFVybCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0U2t1RnJvbVBPUCA9IHByb2R1Y3RVcmwuc3BsaXQoXCIvXCIpWzNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChrZXkgPT09IHByb2R1Y3RTa3VGcm9tUE9QKSB7XG4gICAgICAgICAgICAgICAgbGV0IHF1YW50aXR5RnJvbUNhcnQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAocXVhbnRpdHlGcm9tQ2FydCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1RdWFudGl0eUlucHV0KGxpbmssIHF1YW50aXR5RnJvbUNhcnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dDb3VudGVyQW5kSGlkZUFqYXhCdXR0b24obGluayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkUHJvZHVjdEl0ZW1zRnJvbUNhcnQgPSBwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlci5maWx0ZXIoKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSAwO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyJywgSlNPTi5zdHJpbmdpZnkoZmlsdGVyZWRQcm9kdWN0SXRlbXNGcm9tQ2FydCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyJykgPT09ICdbXScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXBwbHlRdWFudGl0eVZhbGlkYXRpb24oZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHF1YW50aXR5SW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IHF1YW50aXR5ID0gcXVhbnRpdHlJbnB1dC52YWx1ZTtcbiAgICAgICAgaWYgKHF1YW50aXR5ID09PSAnJyAgfHwgcXVhbnRpdHkgPT09ICcwJykge1xuICAgICAgICAgICAgcXVhbnRpdHlJbnB1dC52YWx1ZSA9ICcxJztcbiAgICAgICAgfSBlbHNlIGlmIChxdWFudGl0eS5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBxdWFudGl0eUlucHV0LnZhbHVlID0gcXVhbnRpdHlbMF0gKyBxdWFudGl0eVsxXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZW5kQWpheFJlcXVlc3RUb0FkZE11bHRpcGxlSXRlbXNUb0NhcnQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHF1YW50aXR5SW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IHF1YW50aXR5ID0gcXVhbnRpdHlJbnB1dC52YWx1ZTtcbiAgICAgICAgY29uc3QgaW5jcmVtZW50ZXI6IEhUTUxMaW5rRWxlbWVudCA9IDxIVE1MTGlua0VsZW1lbnQ+cXVhbnRpdHlJbnB1dC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIHRoaXMuc2VuZFJlcXVlc3QoaW5jcmVtZW50ZXIuaHJlZiwgaW5jcmVtZW50ZXIsIFN0cmluZyhxdWFudGl0eSksICdBRERfTVVMVElQTEUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2VuZEFqYXhSZXF1ZXN0VG9BZGRJdGVtVG9DYXJ0KGV2ZW50OiBFdmVudCwgaW5jcmVtZW50ZXI6IEhUTUxMaW5rRWxlbWVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgIGNvbnN0IHF1YW50aXR5SW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5pbmNyZW1lbnRlci5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICBsZXQgcXVhbnRpdHk6IG51bWJlciA9IE51bWJlcihxdWFudGl0eUlucHV0LnZhbHVlKTtcbiAgICAgICAgcXVhbnRpdHkrKztcbiAgICAgICAgdGhpcy5xdWFudGl0eUFkZGVkKys7XG4gICAgICAgIHF1YW50aXR5SW5wdXQudmFsdWUgPSBTdHJpbmcocXVhbnRpdHkpO1xuICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQmluSWNvbihpbmNyZW1lbnRlci5wYXJlbnRFbGVtZW50KVxuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmRSZXF1ZXN0KGluY3JlbWVudGVyLmhyZWYsIGluY3JlbWVudGVyLCBTdHJpbmcocXVhbnRpdHlJbnB1dC52YWx1ZSksICdBREQnKTtcbiAgICAgICAgfSwgdGhpcy5jYWxsQmFja0RlbGF5KTtcblxuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZW5kQWpheFJlcXVlc3RUb1JlbW92ZUl0ZW1Gcm9tQ2FydChldmVudDogRXZlbnQsIGRlY3JlbWVudGVyKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgY29uc3QgcXVhbnRpdHlJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRlY3JlbWVudGVyLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgbGV0IHF1YW50aXR5OiBudW1iZXIgPSBOdW1iZXIocXVhbnRpdHlJbnB1dC52YWx1ZSk7XG4gICAgICAgIHF1YW50aXR5LS07XG4gICAgICAgIHF1YW50aXR5SW5wdXQudmFsdWUgPSBTdHJpbmcocXVhbnRpdHkpO1xuICAgICAgICB0aGlzLnRvZ2dsZUNvdW50ZXJBbmRBamF4QnV0dG9ucyhkZWNyZW1lbnRlciwgJ1JFTU9WRScsIHF1YW50aXR5KTtcbiAgICAgICAgdGhpcy5hZGRPclJlbW92ZUJpbkljb24oZGVjcmVtZW50ZXIucGFyZW50RWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZW5kUmVxdWVzdChkZWNyZW1lbnRlci5ocmVmLCBkZWNyZW1lbnRlciwgU3RyaW5nKHF1YW50aXR5SW5wdXQudmFsdWUpLCAnUkVNT1ZFJyk7XG4gICAgICAgIH0sIHRoaXMuY2FsbEJhY2tEZWxheSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxpbmtDbGlja0hhbmRsZXIoZXZlbnQ6IEV2ZW50LCBsaW5rOiBIVE1MTGlua0VsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZW5kUmVxdWVzdChsaW5rLmhyZWYsIGxpbmssIFN0cmluZygxKSwgbnVsbCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIHNlbmRSZXF1ZXN0KHVybDogc3RyaW5nLCBsaW5rOiBIVE1MTGlua0VsZW1lbnQsIHF1YW50aXR5OiBzdHJpbmcsIG9wZXJhdGlvbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGxldCBwcm9kdWN0U2t1ID0gbGluay5kYXRhc2V0LnByb2R1Y3RTa3U7XG4gICAgICAgIGxldCBwcm9kdWN0UHJpY2UgPSBsaW5rLmRhdGFzZXQucHJvZHVjdFByaWNlICogMTAwO1xuICAgICAgICBsZXQgcHJvZHVjdFRpdGxlID0gbGluay5kYXRhc2V0LnByb2R1Y3RUaXRsZTtcblxuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Rva2VuJywgbGluay5kYXRhc2V0LmNzcmZUb2tlbik7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnb3BlcmF0aW9uJywgb3BlcmF0aW9uKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdxdWFudGl0eScsIHF1YW50aXR5KTtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHVybCwge1xuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBteVRva2VuOiBsaW5rLmRhdGFzZXQuY3NyZlRva2VuLFxuICAgICAgICAgICAgICAgIG15T3BlcmF0aW9uOiBvcGVyYXRpb24sXG4gICAgICAgICAgICAgICAgbXlRdWFudGl0eTogcXVhbnRpdHksXG4gICAgICAgICAgICAgICAgcHJvZHVjdFNrdTogcHJvZHVjdFNrdSxcbiAgICAgICAgICAgICAgICBwcm9kdWN0UHJpY2U6IHByb2R1Y3RQcmljZSxcbiAgICAgICAgICAgICAgICBwcm9kdWN0VGl0bGU6IHByb2R1Y3RUaXRsZSxcbiAgICAgICAgICAgICAgICBhZGRlZFF1YW50aXR5OiB0aGF0LnF1YW50aXR5QWRkZWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzKGRhdGEsIHN0YXR1cywgeGhyKSB7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5lcnJvciAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRNZXNzYWdlcyhkYXRhLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93TWVzc2FnZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlSXRlbVF1YW50aXR5SW5wdXQobGluaywgZGF0YS5pdGVtUXVhbnRpdHkpO1xuICAgICAgICAgICAgICAgIHRoYXQucmVwbGFjZVF1YW50aXR5KGRhdGEucXVhbnRpdHkpO1xuICAgICAgICAgICAgICAgIHRoYXQucmVwbGFjZUFtb3VudChkYXRhLmFtb3VudCk7XG4gICAgICAgICAgICAgICAgdGhhdC5oaWRlSWNvbigpO1xuICAgICAgICAgICAgICAgIHRoYXQuc2hvd1F1YW50aXR5KCk7XG4gICAgICAgICAgICAgICAgdGhhdC5xdWFudGl0eUFkZGVkID0gMDtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGlzQ291bnRlclZpc2libGUgPSBvcGVyYXRpb24gIT09IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNDb3VudGVyVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dNZXNzYWdlKGRhdGEsIGxpbmspO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0NvdW50ZXJBbmRIaWRlQWpheEJ1dHRvbihsaW5rKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IoanFYaHIsIHRleHRTdGF0dXMsIGVycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0TWVzc2FnZXMoanFYaHIuZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRoYXQuc2hvd01lc3NhZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNob3dNZXNzYWdlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25BcmVhLmNsYXNzTGlzdC5yZW1vdmUoSElEREVOX0NMQVNTKTtcbiAgICAgICAgdGhpcy5mbGFzaE1lc3NhZ2VzLmZvckVhY2goZmxhc2hNZXNzYWdlSXRlbSA9PiB7XG4gICAgICAgICAgICBmbGFzaE1lc3NhZ2VJdGVtLnNob3dGb3IoZmxhc2hNZXNzYWdlSXRlbS5kZWZhdWx0RHVyYXRpb24pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0TWVzc2FnZXMobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVzc2FnZXNUZXh0SG9sZGVycy5mb3JFYWNoKChtZXNzYWdlSXRlbTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIG1lc3NhZ2VJdGVtLmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZXBsYWNlQW1vdW50KGFtb3VudDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYW1vdW50LmZvckVhY2goKGFtb3VudEl0ZW06IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBhbW91bnRJdGVtLmlubmVySFRNTCA9IGFtb3VudDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlcGxhY2VRdWFudGl0eShxdWFudGl0eTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMucXVhbnRpdHkuZm9yRWFjaCgoYW1vdW50SXRlbTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGFtb3VudEl0ZW0uaW5uZXJIVE1MID0gcXVhbnRpdHk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0cmFja2luZ0luZm8obGluazogSFRNTExpbmtFbGVtZW50KToge1xuICAgICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbiAgICB9IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNrdTogbGluay5kYXRhc2V0LnByb2R1Y3RTa3UsXG4gICAgICAgICAgICB0aXRsZTogbGluay5kYXRhc2V0LnByb2R1Y3RUaXRsZSxcbiAgICAgICAgICAgIHByaWNlOiBsaW5rLmRhdGFzZXQucHJvZHVjdFByaWNlLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBoaWRlSWNvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaWNvbikge1xuICAgICAgICAgICAgdGhpcy5pY29uLmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBzaG93UXVhbnRpdHkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucXVhbnRpdHkuZm9yRWFjaCgoYW1vdW50SXRlbTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGFtb3VudEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShISURERU5fQ0xBU1MpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdG9nZ2xlQ291bnRlckFuZEFqYXhCdXR0b25zKGxpbms6IEhUTUxMaW5rRWxlbWVudCwgb3BlcmF0aW9uOiBzdHJpbmcsIHF1YW50aXR5OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJ1JFTU9WRScgJiYgcXVhbnRpdHkgPT09IDApIHtcbiAgICAgICAgICAgdGhpcy5zaG93QWpheEJ1dHRvbkFuZEhpZGVDb3VudGVyKGxpbmspO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUl0ZW1RdWFudGl0eUlucHV0KGxpbms6IEhUTUxMaW5rRWxlbWVudCwgcXVhbnRpdHk6IG51bWJlcikge1xuICAgICAgICBpZiAocXVhbnRpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IHByb2R1Y3RTa3VGcm9tUE9QID0gbGluay5kYXRhc2V0LnByb2R1Y3RTa3U7XG4gICAgICAgICAgICBpZiAocHJvZHVjdFNrdUZyb21QT1AgPT09ICcnIHx8IHByb2R1Y3RTa3VGcm9tUE9QID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJvZHVjdFVybCA9IGxpbmsuZGF0YXNldC5wcm9kdWN0VXJsO1xuICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0VXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RTa3VGcm9tUE9QID0gcHJvZHVjdFVybC5zcGxpdChcIi9cIilbM107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaXRlbUFkZGVkSW5DYXJ0V2l0aFF1YW50aXR5ID0gW1twcm9kdWN0U2t1RnJvbVBPUCwgcXVhbnRpdHldXTtcblxuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcicpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXInKSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcltpXVswXS5pbmNsdWRlcyhwcm9kdWN0U2t1RnJvbVBPUCkgJiYgcHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXJbaV1bMF0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyW2ldWzFdID0gcXVhbnRpdHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFKU09OLnN0cmluZ2lmeShwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcikuaW5jbHVkZXMoSlNPTi5zdHJpbmdpZnkoaXRlbUFkZGVkSW5DYXJ0V2l0aFF1YW50aXR5WzBdWzBdKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXIucHVzaChpdGVtQWRkZWRJbkNhcnRXaXRoUXVhbnRpdHlbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXInLCBKU09OLnN0cmluZ2lmeShwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXInLCBKU09OLnN0cmluZ2lmeShpdGVtQWRkZWRJbkNhcnRXaXRoUXVhbnRpdHkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvdW50ZXI6IEhUTUxJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5saW5rLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKENMQVNTX1BSRUZJWCArIHRoaXMucXVhbnRpdHlJbnB1dEZpZWxkKTtcbiAgICAgICAgICAgIGNvdW50ZXIudmFsdWUgPSBTdHJpbmcocXVhbnRpdHkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNob3dNZXNzYWdlKHJlc3BvbnNlOiBvYmplY3QsIGxpbms6IEhUTUxMaW5rRWxlbWVudCkge1xuICAgICAgICBjb25zdCBwYXJlbnRDb3VudGVyOiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD5saW5rLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGFkZGVkSXRlbU1lc3NhZ2U6IEhUTUxFbGVtZW50ID0gcGFyZW50Q291bnRlci5xdWVyeVNlbGVjdG9yKENMQVNTX1BSRUZJWCArIHRoaXMuaXRlbUFkZGVkKTtcbiAgICAgICAgY29uc3QgcmVtb3ZlSXRlbU1lc3NhZ2U6IEhUTUxFbGVtZW50ID0gcGFyZW50Q291bnRlci5xdWVyeVNlbGVjdG9yKENMQVNTX1BSRUZJWCArIHRoaXMuaXRlbVJlbW92ZWQpO1xuICAgICAgICBpZiAocmVzcG9uc2UuY29kZSA9PT0gMjAwICYmIHJlc3BvbnNlLm9wZXJhdGlvbiA9PT0gJ0FERCcpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zaG93VG9wTWVzc2FnZUZvck1vYmlsZURldmljZShhZGRlZEl0ZW1NZXNzYWdlLCByZXNwb25zZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZXJyb3JFeGlzdHNBbmRRdWFudGl0eUJpZ2dlclRoYW5RdWFudGl0eUZyb21UaGVDYXJ0KHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgICAgICBhZGRlZEl0ZW1NZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW1UaW1lT3V0KGFkZGVkSXRlbU1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLmNvZGUgPT09IDIwMCAmJiByZXNwb25zZS5vcGVyYXRpb24gPT09ICdBRERfTVVMVElQTEUnKSB7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zaG93VG9wTWVzc2FnZUZvck1vYmlsZURldmljZShhZGRlZEl0ZW1NZXNzYWdlLCByZXNwb25zZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZXJyb3JFeGlzdHNBbmRRdWFudGl0eUJpZ2dlclRoYW5RdWFudGl0eUZyb21UaGVDYXJ0KHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgICAgICBhZGRlZEl0ZW1NZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW1UaW1lT3V0KGFkZGVkSXRlbU1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2hvd1RvcE1lc3NhZ2VGb3JNb2JpbGVEZXZpY2UocmVtb3ZlSXRlbU1lc3NhZ2UsIHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lcnJvckV4aXN0c0FuZFF1YW50aXR5QmlnZ2VyVGhhblF1YW50aXR5RnJvbVRoZUNhcnQocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUl0ZW1NZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW1UaW1lT3V0KHJlbW92ZUl0ZW1NZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZXJyb3JFeGlzdHNBbmRRdWFudGl0eUJpZ2dlclRoYW5RdWFudGl0eUZyb21UaGVDYXJ0KHJlc3BvbnNlOiBvYmplY3QpIHtcblxuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgaXRlbVF1YW50aXR5RnJvbUNhcnQ6IG51bWJlciA9IHJlc3BvbnNlLml0ZW1RdWFudGl0eTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRRdWFudGl0eTogbnVtYmVyID0gcmVzcG9uc2UucXVhbnRpdHk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1YW50aXR5ID4gaXRlbVF1YW50aXR5RnJvbUNhcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlSXRlbVRpbWVPdXQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hvd1RvcE1lc3NhZ2VGb3JNb2JpbGVEZXZpY2UobWVzc2FnZTogSFRNTEVsZW1lbnQsIHJlc3BvbnNlOiBvYmplY3QpIHtcbiAgICAgICAgY29uc3Qgd2luZG93V2lkdGg6IG51bWJlciA9IHdpbmRvdy5zY3JlZW4ud2lkdGg7XG5cbiAgICAgICAgaWYgKHdpbmRvd1dpZHRoIDwgNTc0ICYmICF0aGlzLmVycm9yRXhpc3RzQW5kUXVhbnRpdHlCaWdnZXJUaGFuUXVhbnRpdHlGcm9tVGhlQ2FydChyZXNwb25zZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvcE1lc3NhZ2U6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50Pm1lc3NhZ2UuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgY29uc3QgYm9keTogSFRNTEJvZHlFbGVtZW50ID0gPEhUTUxCb2R5RWxlbWVudD5kb2N1bWVudC5ib2R5O1xuICAgICAgICAgICAgdG9wTWVzc2FnZS5zdHlsZS5jc3NUZXh0ID0gdGhpcy5jc3NNZXNzYWdlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNoZWNrTWFyazogSFRNTEVsZW1lbnQgPSB0b3BNZXNzYWdlLnF1ZXJ5U2VsZWN0b3IoJy5jaGVja21hcmsnKTtcbiAgICAgICAgICAgIGNoZWNrTWFyay5zdHlsZS5jc3NUZXh0ID0gdGhpcy5jc3NDaGVja01hcmsoKTtcblxuICAgICAgICAgICAgdG9wTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgIGJvZHkuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICAgICAgYm9keS5pbnNlcnRCZWZvcmUodG9wTWVzc2FnZSwgYm9keS5maXJzdEVsZW1lbnRDaGlsZCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0b3BNZXNzYWdlLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzaG93Q291bnRlckFuZEhpZGVBamF4QnV0dG9uKGxpbms6IEhUTUxMaW5rRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb3VudGVyID0gbGluaz8ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBjb3VudGVyPy5jbGFzc0xpc3QuYWRkKHRoaXMuYWpheENhcnRDb3VudGVyQ2xhc3MpO1xuICAgICAgICBjb3VudGVyPy5jbGFzc0xpc3QucmVtb3ZlKEhJRERFTl9DTEFTUyk7XG4gICAgICAgIGxpbms/LmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTKTtcbiAgICAgICAgdGhpcy5hZGRPclJlbW92ZUJpbkljb24oY291bnRlcik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFkZE9yUmVtb3ZlQmluSWNvbihlbGVtZW50KSB7XG4gICAgICAgIGxldCBkZWNyZWFzZUJ1dHRvbkVsZW1lbnQgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5hZGRUb0NhcnREZWNyZW1lbnRlcilbMF07XG4gICAgICAgIGxldCBxdWFudGl0eUVsZW1lbnQgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5xdWFudGl0eUlucHV0RmllbGQpWzBdO1xuICAgICAgICBpZiAocXVhbnRpdHlFbGVtZW50LnZhbHVlQXNOdW1iZXIgPiAxICYmIGRlY3JlYXNlQnV0dG9uRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5hZGRCaW5JY29uKSkge1xuICAgICAgICAgICAgZGVjcmVhc2VCdXR0b25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5hZGRCaW5JY29uKTtcbiAgICAgICAgICAgIGRlY3JlYXNlQnV0dG9uRWxlbWVudC5pbm5lclRleHQgPSBcIi1cIjtcbiAgICAgICAgfSBlbHNlIGlmKHF1YW50aXR5RWxlbWVudC52YWx1ZUFzTnVtYmVyID09PSAxKSB7XG4gICAgICAgICAgICBkZWNyZWFzZUJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmFkZEJpbkljb24pO1xuICAgICAgICAgICAgZGVjcmVhc2VCdXR0b25FbGVtZW50LmlubmVyVGV4dCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hvd0FqYXhCdXR0b25BbmRIaWRlQ291bnRlcihsaW5rOiBIVE1MTGlua0VsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY291bnRlciA9IGxpbms/LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGFkZEFqYXhCdXR0b24gPSBsaW5rPy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihDTEFTU19QUkVGSVggKyB0aGlzLmFqYXhBZGRRdWFudGl0eUxpbmspO1xuICAgICAgICBjb3VudGVyPy5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuYWpheENhcnRDb3VudGVyQ2xhc3MpO1xuICAgICAgICBjb3VudGVyPy5jbGFzc0xpc3QuYWRkKEhJRERFTl9DTEFTUyk7XG4gICAgICAgIGFkZEFqYXhCdXR0b24/LmNsYXNzTGlzdC5yZW1vdmUoSElEREVOX0NMQVNTKTtcbiAgICAgICAgYWRkQWpheEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhZGRUb0NhcnRMaW5rQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuanNOYW1lfV9fbGlua2A7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhZGRUb0NhcnRJbmNyZW1lbnRlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2pzLXF1YW50aXR5LWNvdW50ZXItcHJvZHVjdF9faW5jcic7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhZGRUb0NhcnREZWNyZW1lbnRlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2pzLXF1YW50aXR5LWNvdW50ZXItcHJvZHVjdF9fZGVjcic7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhamF4QWRkUXVhbnRpdHlMaW5rKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnanMtYWpheC1hZGQtdG8tY2FydF9fbGluayc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhamF4Q2hhbmdlUXVhbnRpdHlMaW5rKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnanMtYWpheC1jaGFuZ2UtcXVhbnRpdHlfX2xpbmsnO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgYWpheENhcnRDb3VudGVyQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdjaGFuZ2UtY2FydC1jb3VudGVyJztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHF1YW50aXR5SW5wdXRGaWVsZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ3R4dC1wcm9kdWN0LXF1YW50aXR5JztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGFkZEJpbkljb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdhZGQtYmluJztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGl0ZW1BZGRlZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2l0ZW0tYWRkZWQnO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgaXRlbVJlbW92ZWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdpdGVtLXJlbW92ZWQnO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgY2FydENsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmpzTmFtZX1fX2NhcnQtYmxvY2tgO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgYW1vdW50Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuanNOYW1lfV9fYW1vdW50YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHF1YW50aXR5Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuanNOYW1lfV9fcXVhbnRpdHlgO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgaWNvbkNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmpzTmFtZX1fX2ljb25gO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgZmxhc2hNZXNzYWdlc0NsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmpzTmFtZX1fX2ZsYXNoLW1lc3NhZ2VgO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgbWVzc2FnZXNUZXh0SG9sZGVyQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuanNOYW1lfV9fbWVzc2FnZS10ZXh0YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IG5vdGlmaWNhdGlvbkFyZWFDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5qc05hbWV9X19ub3RpZmljYXRpb24tYXJlYWA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNzc01lc3NhZ2UoKTogc3RyaW5nIHtcblxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgd2lkdGg6OTAlO1xuICAgICAgICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OmNlbnRlcjtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgIHRvcDogNXB4O1xuICAgICAgICAgICAgbGVmdDogNSU7XG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojN2I3YjdiO1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICB6LWluZGV4OiA5OTk7XG4gICAgICAgIGA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNzc0NoZWNrTWFyaygpOiBzdHJpbmcge1xuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB0b3A6IDZweDtcbiAgICAgICAgICAgIGxlZnQ6MTVweDtcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgICAgICAgIGhlaWdodDogMjJweDtcbiAgICAgICAgICAgIHdpZHRoOiAxMXB4O1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNmZmY7XG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDJweCBzb2xpZCAjZmZmO1xuICAgICAgICBgO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=