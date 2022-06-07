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
      var firstClickFlag = false;
      var productItemsForSyncCounter = JSON.parse(localStorage.getItem('productItemsForSyncCounter'));

      if (productItemsForSyncCounter) {
        for (var i = 0; i < productItemsForSyncCounter.length; i++) {
          if (productItemsForSyncCounter[i][0].includes(productSku)) {
            if (productItemsForSyncCounter[i][2] === false) {
              firstClickFlag = true;
            } else {
              firstClickFlag = false;
            }
          } else {
            firstClickFlag = true;
          }
        }
      } else {
        firstClickFlag = true;
      }

      var query = "";
      var page = "1";
      var recordList = document.getElementsByTagName('ff-record-list')[0];

      if (recordList) {
        var baseURI = recordList.baseURI;
        var resultQuery = baseURI.substring(baseURI.indexOf('?') + 1, baseURI.indexOf('&'));
        var resultPage = baseURI.substring(baseURI.indexOf('&') + 1);
        query = resultQuery.substring(resultQuery.indexOf('=') + 1);
        page = resultPage.substring(resultPage.indexOf('=') + 1);
      }

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
          addedQuantity: that.quantityAdded,
          firstClickFlag: firstClickFlag,
          productPage: page,
          productPosition: link.dataset.productPosition,
          productQuery: query
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

      var itemAddedInCartWithQuantity = [[productSkuFromPOP, quantity, true]];

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
    var codebucket = document.querySelector(this.codeBucket);

    if (quantityElement.valueAsNumber > 1 && decreaseButtonElement.classList.contains(this.addBinIcon) || decreaseButtonElement.classList.contains(this.addBinIconCz)) {
      if (codebucket.value === "DE") {
        decreaseButtonElement.classList.remove(this.addBinIcon);
      } else {
        decreaseButtonElement.classList.remove(this.addBinIconCz);
      }

      decreaseButtonElement.innerText = "-";
    } else if (quantityElement.valueAsNumber === 1) {
      if (codebucket.value === "DE") {
        decreaseButtonElement.classList.add(this.addBinIcon);
      } else {
        decreaseButtonElement.classList.add(this.addBinIconCz);
      }

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

  get addBinIconCz() {
    return 'add-bin-cz';
  }

  get codeBucket() {
    return "input[name=header-codebucket]";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvYWpheC1hZGQtdG8tY2FydC9hamF4LWFkZC10by1jYXJ0LnRzIl0sIm5hbWVzIjpbIkhJRERFTl9DTEFTUyIsIkNMQVNTX1BSRUZJWCIsIklEX1BSRUZJWCIsIkFqYXhBZGRUb0NhcnQiLCJDb21wb25lbnQiLCIkIiwicmVhZHlDYWxsYmFjayIsImVudmlyb25tZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidmFsdWUiLCJjaGVja1JlY29yZHNBcmVSZW5kZXJlZCIsInNldEludGVydmFsIiwibGlua3MiLCJBcnJheSIsImZyb20iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiYWRkVG9DYXJ0TGlua0NsYXNzIiwibGVuZ3RoIiwibG9hZCIsImNsZWFySW50ZXJ2YWwiLCJhZGRUb0NhcnRJbmNyZW1lbnRlckxpbmtzIiwiYWRkVG9DYXJ0SW5jcmVtZW50ZXIiLCJhZGR0b0NhcnREZWNyZW1lbnRlckxpbmtzIiwiYWRkVG9DYXJ0RGVjcmVtZW50ZXIiLCJxdWFudGl0eUlucHV0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJxdWFudGl0eUlucHV0RmllbGQiLCJxdWFudGl0eUFkZGVkIiwiaWNvbiIsImljb25DbGFzcyIsImNhcnRCbG9jayIsImNhcnRDbGFzcyIsImFtb3VudCIsImFtb3VudENsYXNzIiwicXVhbnRpdHkiLCJxdWFudGl0eUNsYXNzIiwiZmxhc2hNZXNzYWdlcyIsImZsYXNoTWVzc2FnZXNDbGFzcyIsIm5vdGlmaWNhdGlvbkFyZWEiLCJub3RpZmljYXRpb25BcmVhQ2xhc3MiLCJtZXNzYWdlc1RleHRIb2xkZXJzIiwibWVzc2FnZXNUZXh0SG9sZGVyQ2xhc3MiLCJjYWxsQmFja0RlbGF5IiwibGlzdGVuRm9yVXJsQ2hhbmdlcyIsInVybCIsImxvY2F0aW9uIiwiaHJlZiIsIm1hcEV2ZW50cyIsImZvckVhY2giLCJsaW5rIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInN5bmNDb3VudGVyRnJvbUxvY2FsU3RvcmFnZSIsImdldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImxpbmtDbGlja0hhbmRsZXIiLCJzZXRBdHRyaWJ1dGUiLCJpbmNyZW1lbnRlciIsImluZGV4Iiwic2VuZEFqYXhSZXF1ZXN0VG9BZGRJdGVtVG9DYXJ0IiwiZGVjcmVtZW50ZXIiLCJzZW5kQWpheFJlcXVlc3RUb1JlbW92ZUl0ZW1Gcm9tQ2FydCIsInF1YW50aXR5SW5wdXQiLCJhcHBseVF1YW50aXR5VmFsaWRhdGlvbiIsInNlbmRBamF4UmVxdWVzdFRvQWRkTXVsdGlwbGVJdGVtc1RvQ2FydCIsInByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyIiwiSlNPTiIsInBhcnNlIiwia2V5IiwicHJvZHVjdFNrdUZyb21QT1AiLCJkYXRhc2V0IiwicHJvZHVjdFNrdSIsInVuZGVmaW5lZCIsInByb2R1Y3RVcmwiLCJzcGxpdCIsInF1YW50aXR5RnJvbUNhcnQiLCJ1cGRhdGVJdGVtUXVhbnRpdHlJbnB1dCIsInNob3dDb3VudGVyQW5kSGlkZUFqYXhCdXR0b24iLCJmaWx0ZXJlZFByb2R1Y3RJdGVtc0Zyb21DYXJ0IiwiZmlsdGVyIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInJlbW92ZUl0ZW0iLCJ0YXJnZXQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJzZW5kUmVxdWVzdCIsIlN0cmluZyIsInByZXZlbnREZWZhdWx0IiwiY2xlYXJUaW1lb3V0IiwidGltZXIiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiTnVtYmVyIiwiYWRkT3JSZW1vdmVCaW5JY29uIiwicGFyZW50RWxlbWVudCIsInNldFRpbWVvdXQiLCJ0b2dnbGVDb3VudGVyQW5kQWpheEJ1dHRvbnMiLCJvcGVyYXRpb24iLCJwcm9kdWN0UHJpY2UiLCJwcm9kdWN0VGl0bGUiLCJmaXJzdENsaWNrRmxhZyIsImkiLCJpbmNsdWRlcyIsInF1ZXJ5IiwicGFnZSIsInJlY29yZExpc3QiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImJhc2VVUkkiLCJyZXN1bHRRdWVyeSIsInN1YnN0cmluZyIsImluZGV4T2YiLCJyZXN1bHRQYWdlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImNzcmZUb2tlbiIsInRoYXQiLCJhamF4IiwidHlwZSIsImRhdGFUeXBlIiwiZGF0YSIsIm15VG9rZW4iLCJteU9wZXJhdGlvbiIsIm15UXVhbnRpdHkiLCJhZGRlZFF1YW50aXR5IiwicHJvZHVjdFBhZ2UiLCJwcm9kdWN0UG9zaXRpb24iLCJwcm9kdWN0UXVlcnkiLCJzdWNjZXNzIiwic3RhdHVzIiwieGhyIiwiZXJyb3IiLCJzZXRNZXNzYWdlcyIsInNob3dNZXNzYWdlcyIsIml0ZW1RdWFudGl0eSIsInJlcGxhY2VRdWFudGl0eSIsInJlcGxhY2VBbW91bnQiLCJoaWRlSWNvbiIsInNob3dRdWFudGl0eSIsImlzQ291bnRlclZpc2libGUiLCJzaG93TWVzc2FnZSIsImpxWGhyIiwidGV4dFN0YXR1cyIsImVycm9yTWVzc2FnZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImZsYXNoTWVzc2FnZUl0ZW0iLCJzaG93Rm9yIiwiZGVmYXVsdER1cmF0aW9uIiwibWVzc2FnZSIsIm1lc3NhZ2VJdGVtIiwiaW5uZXJIVE1MIiwiYW1vdW50SXRlbSIsInRyYWNraW5nSW5mbyIsInNrdSIsInRpdGxlIiwicHJpY2UiLCJhZGQiLCJzaG93QWpheEJ1dHRvbkFuZEhpZGVDb3VudGVyIiwiaXRlbUFkZGVkSW5DYXJ0V2l0aFF1YW50aXR5IiwicHVzaCIsImNvdW50ZXIiLCJyZXNwb25zZSIsInBhcmVudENvdW50ZXIiLCJhZGRlZEl0ZW1NZXNzYWdlIiwiaXRlbUFkZGVkIiwicmVtb3ZlSXRlbU1lc3NhZ2UiLCJpdGVtUmVtb3ZlZCIsImNvZGUiLCJzaG93VG9wTWVzc2FnZUZvck1vYmlsZURldmljZSIsImVycm9yRXhpc3RzQW5kUXVhbnRpdHlCaWdnZXJUaGFuUXVhbnRpdHlGcm9tVGhlQ2FydCIsInJlbW92ZUl0ZW1UaW1lT3V0IiwiaXRlbVF1YW50aXR5RnJvbUNhcnQiLCJjdXJyZW50UXVhbnRpdHkiLCJlbGVtZW50Iiwid2luZG93V2lkdGgiLCJ3aW5kb3ciLCJzY3JlZW4iLCJ3aWR0aCIsInRvcE1lc3NhZ2UiLCJjbG9uZU5vZGUiLCJib2R5Iiwic3R5bGUiLCJjc3NUZXh0IiwiY3NzTWVzc2FnZSIsImNoZWNrTWFyayIsImNzc0NoZWNrTWFyayIsInBvc2l0aW9uIiwiaW5zZXJ0QmVmb3JlIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhamF4Q2FydENvdW50ZXJDbGFzcyIsImRlY3JlYXNlQnV0dG9uRWxlbWVudCIsInF1YW50aXR5RWxlbWVudCIsImNvZGVidWNrZXQiLCJjb2RlQnVja2V0IiwidmFsdWVBc051bWJlciIsImNvbnRhaW5zIiwiYWRkQmluSWNvbiIsImFkZEJpbkljb25DeiIsImlubmVyVGV4dCIsImFkZEFqYXhCdXR0b24iLCJhamF4QWRkUXVhbnRpdHlMaW5rIiwicmVtb3ZlQXR0cmlidXRlIiwianNOYW1lIiwiYWpheENoYW5nZVF1YW50aXR5TGluayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUNBLElBQU1BLFlBQVksR0FBRyxXQUFyQjtBQUNBLElBQU1DLFlBQVksR0FBRyxHQUFyQjtBQUNBLElBQU1DLFNBQVMsR0FBRyxHQUFsQjtBQUVlLE1BQU1DLGFBQU4sU0FBNEJDLCtEQUE1QixDQUFzQztBQUFBO0FBQUE7O0FBQUEsbUNBQzVCQyx5REFBQyxDQUFDLElBQUQsQ0FEMkI7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFxQnZDQyxlQUFWLEdBQWdDO0FBQzVCLFNBQUtDLFdBQUwsR0FBcUNDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixjQUF2QixDQUFy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SyxNQUFmO0FBQ0g7O0FBRVNuQixZQUFWLEdBQStCO0FBRTNCO0FBYUg7O0FBRVNFLGNBQVYsR0FBaUM7QUFFN0I7QUFXSDs7QUFua0JnRCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjE5LmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0IEZsYXNoTWVzc2FnZSBmcm9tICdTaG9wVWkvY29tcG9uZW50cy9tb2xlY3VsZXMvZmxhc2gtbWVzc2FnZS9mbGFzaC1tZXNzYWdlJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeS9kaXN0L2pxdWVyeSc7XG5jb25zdCBISURERU5fQ0xBU1MgPSAnaXMtaGlkZGVuJztcbmNvbnN0IENMQVNTX1BSRUZJWCA9ICcuJztcbmNvbnN0IElEX1BSRUZJWCA9ICcjJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheEFkZFRvQ2FydCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkICR0aGlzOiAkID0gJCh0aGlzKTtcbiAgICBwcm90ZWN0ZWQgbGlua3M6IEhUTUxMaW5rRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBjYXJ0QmxvY2s6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBhbW91bnQ6IEhUTUxFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIHF1YW50aXR5OiBIVE1MRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBpdGVtUXVhbnRpdHk6IEhUTUxFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIG9wZXJhdGlvbjogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgaWNvbjogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGZsYXNoTWVzc2FnZXM6IEZsYXNoTWVzc2FnZVtdO1xuICAgIHByb3RlY3RlZCBtZXNzYWdlc1RleHRIb2xkZXJzOiBIVE1MRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBub3RpZmljYXRpb25BcmVhOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGFkZFRvQ2FydEluY3JlbWVudGVyTGlua3M6IEhUTUxFbGVtZW50W107XG4gICAgcHJpdmF0ZSBhZGR0b0NhcnREZWNyZW1lbnRlckxpbmtzOiBIVE1MRWxlbWVudFtdO1xuICAgIHByaXZhdGUgcXVhbnRpdHlJbnB1dHM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgcXVhbnRpdHlBZGRlZDtcbiAgICBwcm90ZWN0ZWQgdGltZXI7XG4gICAgcHJvdGVjdGVkIGNhbGxCYWNrRGVsYXk6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgZW52aXJvbm1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHVybDogc3RyaW5nO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW52aXJvbm1lbnQnKTtcbiAgICAgICAgaWYgKHRoaXMuZW52aXJvbm1lbnQudmFsdWUgPT09ICdERScpIHtcbiAgICAgICAgICAgIGxldCBjaGVja1JlY29yZHNBcmVSZW5kZXJlZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtzID0gPEhUTUxMaW5rRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmFkZFRvQ2FydExpbmtDbGFzcykpO1xuXG4gICAgICAgICAgICAgICAgaWYodGhpcy5saW5rcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGNoZWNrUmVjb3Jkc0FyZVJlbmRlcmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZCgpIHtcbiAgICAgICAgdGhpcy5saW5rcyA9IDxIVE1MTGlua0VsZW1lbnRbXT5BcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5hZGRUb0NhcnRMaW5rQ2xhc3MpKTtcbiAgICAgICAgdGhpcy5hZGRUb0NhcnRJbmNyZW1lbnRlckxpbmtzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuYWRkVG9DYXJ0SW5jcmVtZW50ZXIpKTtcbiAgICAgICAgdGhpcy5hZGR0b0NhcnREZWNyZW1lbnRlckxpbmtzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuYWRkVG9DYXJ0RGVjcmVtZW50ZXIpKTtcbiAgICAgICAgdGhpcy5xdWFudGl0eUlucHV0cyA9IDxIVE1MSW5wdXRFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKENMQVNTX1BSRUZJWCArIHRoaXMucXVhbnRpdHlJbnB1dEZpZWxkKSk7XG4gICAgICAgIHRoaXMucXVhbnRpdHlBZGRlZCA9IDA7XG5cbiAgICAgICAgaWYgKCF0aGlzLmxpbmtzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaWNvbiA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuaWNvbkNsYXNzKVswXTtcbiAgICAgICAgdGhpcy5jYXJ0QmxvY2sgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmNhcnRDbGFzcylbMF07XG4gICAgICAgIHRoaXMuYW1vdW50ID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuYW1vdW50Q2xhc3MpKTtcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnF1YW50aXR5Q2xhc3MpKTtcbiAgICAgICAgdGhpcy5mbGFzaE1lc3NhZ2VzID0gPEZsYXNoTWVzc2FnZVtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZmxhc2hNZXNzYWdlc0NsYXNzKSk7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uQXJlYSA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5ub3RpZmljYXRpb25BcmVhQ2xhc3MpWzBdO1xuICAgICAgICB0aGlzLm1lc3NhZ2VzVGV4dEhvbGRlcnMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMubWVzc2FnZXNUZXh0SG9sZGVyQ2xhc3MpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2FsbEJhY2tEZWxheSA9IDgwMDtcbiAgICAgICAgaWYodGhpcy5lbnZpcm9ubWVudC52YWx1ZSA9PT0gJ0RFJykge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5Gb3JVcmxDaGFuZ2VzKCk7XG4gICAgICAgICAgICB0aGlzLnVybCA9IGxvY2F0aW9uLmhyZWY7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbGlzdGVuRm9yVXJsQ2hhbmdlcygpIHtcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMudXJsICE9IGxvY2F0aW9uLmhyZWYpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy51cmwgPSBsb2NhdGlvbi5ocmVmO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCA1MDApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGlua3MuZm9yRWFjaCgobGluazogSFRNTExpbmtFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNDb3VudGVyRnJvbUxvY2FsU3RvcmFnZShsaW5rKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGxpbmsuZ2V0QXR0cmlidXRlKCdmbGFnJykgIT09IFwiMVwiKSB7XG4gICAgICAgICAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMubGlua0NsaWNrSGFuZGxlcihldmVudCwgbGluaykpO1xuICAgICAgICAgICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdmbGFnJywgJzEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRUb0NhcnRJbmNyZW1lbnRlckxpbmtzLmZvckVhY2goKGluY3JlbWVudGVyOiBIVE1MTGlua0VsZW1lbnQsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmNyZW1lbnRlci5nZXRBdHRyaWJ1dGUoJ2ZsYWcnKSAhPT0gXCIxXCIpIHtcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMuc2VuZEFqYXhSZXF1ZXN0VG9BZGRJdGVtVG9DYXJ0KGV2ZW50LCBpbmNyZW1lbnRlcikpO1xuICAgICAgICAgICAgICAgIGluY3JlbWVudGVyLnNldEF0dHJpYnV0ZSgnZmxhZycsICcxJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkdG9DYXJ0RGVjcmVtZW50ZXJMaW5rcy5mb3JFYWNoKChkZWNyZW1lbnRlcjogSFRNTExpbmtFbGVtZW50LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGVjcmVtZW50ZXIuZ2V0QXR0cmlidXRlKCdmbGFnJykgIT09IFwiMVwiKSB7XG4gICAgICAgICAgICAgICAgZGVjcmVtZW50ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLnNlbmRBamF4UmVxdWVzdFRvUmVtb3ZlSXRlbUZyb21DYXJ0KGV2ZW50LCBkZWNyZW1lbnRlcikpO1xuICAgICAgICAgICAgICAgIGRlY3JlbWVudGVyLnNldEF0dHJpYnV0ZSgnZmxhZycsICcxJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucXVhbnRpdHlJbnB1dHMuZm9yRWFjaCgocXVhbnRpdHlJbnB1dDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcXVhbnRpdHlJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudDogRXZlbnQpID0+IHRoaXMuYXBwbHlRdWFudGl0eVZhbGlkYXRpb24oZXZlbnQpKTtcbiAgICAgICAgICAgIHF1YW50aXR5SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5zZW5kQWpheFJlcXVlc3RUb0FkZE11bHRpcGxlSXRlbXNUb0NhcnQoZXZlbnQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHN5bmNDb3VudGVyRnJvbUxvY2FsU3RvcmFnZShsaW5rKTogdm9pZCB7XG4gICAgICAgIGxldCBwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyJykpO1xuXG4gICAgICAgIHByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgbGV0IHByb2R1Y3RTa3VGcm9tUE9QID0gbGluay5kYXRhc2V0LnByb2R1Y3RTa3U7XG4gICAgICAgICAgICBpZiAocHJvZHVjdFNrdUZyb21QT1AgPT09ICcnIHx8IHByb2R1Y3RTa3VGcm9tUE9QID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJvZHVjdFVybCA9IGxpbmsuZGF0YXNldC5wcm9kdWN0VXJsO1xuICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0VXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RTa3VGcm9tUE9QID0gcHJvZHVjdFVybC5zcGxpdChcIi9cIilbM107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGtleSA9PT0gcHJvZHVjdFNrdUZyb21QT1ApIHtcbiAgICAgICAgICAgICAgICBsZXQgcXVhbnRpdHlGcm9tQ2FydCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChxdWFudGl0eUZyb21DYXJ0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbVF1YW50aXR5SW5wdXQobGluaywgcXVhbnRpdHlGcm9tQ2FydCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NvdW50ZXJBbmRIaWRlQWpheEJ1dHRvbihsaW5rKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRQcm9kdWN0SXRlbXNGcm9tQ2FydCA9IHByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyLmZpbHRlcigoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgIT09IDA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXInLCBKU09OLnN0cmluZ2lmeShmaWx0ZXJlZFByb2R1Y3RJdGVtc0Zyb21DYXJ0KSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXInKSA9PT0gJ1tdJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Byb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhcHBseVF1YW50aXR5VmFsaWRhdGlvbihldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgcXVhbnRpdHlJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgcXVhbnRpdHkgPSBxdWFudGl0eUlucHV0LnZhbHVlO1xuICAgICAgICBpZiAocXVhbnRpdHkgPT09ICcnICB8fCBxdWFudGl0eSA9PT0gJzAnKSB7XG4gICAgICAgICAgICBxdWFudGl0eUlucHV0LnZhbHVlID0gJzEnO1xuICAgICAgICB9IGVsc2UgaWYgKHF1YW50aXR5Lmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIHF1YW50aXR5SW5wdXQudmFsdWUgPSBxdWFudGl0eVswXSArIHF1YW50aXR5WzFdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNlbmRBamF4UmVxdWVzdFRvQWRkTXVsdGlwbGVJdGVtc1RvQ2FydChldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgcXVhbnRpdHlJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgcXVhbnRpdHkgPSBxdWFudGl0eUlucHV0LnZhbHVlO1xuICAgICAgICBjb25zdCBpbmNyZW1lbnRlcjogSFRNTExpbmtFbGVtZW50ID0gPEhUTUxMaW5rRWxlbWVudD5xdWFudGl0eUlucHV0Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgdGhpcy5zZW5kUmVxdWVzdChpbmNyZW1lbnRlci5ocmVmLCBpbmNyZW1lbnRlciwgU3RyaW5nKHF1YW50aXR5KSwgJ0FERF9NVUxUSVBMRScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZW5kQWpheFJlcXVlc3RUb0FkZEl0ZW1Ub0NhcnQoZXZlbnQ6IEV2ZW50LCBpbmNyZW1lbnRlcjogSFRNTExpbmtFbGVtZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgY29uc3QgcXVhbnRpdHlJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmluY3JlbWVudGVyLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGxldCBxdWFudGl0eTogbnVtYmVyID0gTnVtYmVyKHF1YW50aXR5SW5wdXQudmFsdWUpO1xuICAgICAgICBxdWFudGl0eSsrO1xuICAgICAgICB0aGlzLnF1YW50aXR5QWRkZWQrKztcbiAgICAgICAgcXVhbnRpdHlJbnB1dC52YWx1ZSA9IFN0cmluZyhxdWFudGl0eSk7XG4gICAgICAgIHRoaXMuYWRkT3JSZW1vdmVCaW5JY29uKGluY3JlbWVudGVyLnBhcmVudEVsZW1lbnQpXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFJlcXVlc3QoaW5jcmVtZW50ZXIuaHJlZiwgaW5jcmVtZW50ZXIsIFN0cmluZyhxdWFudGl0eUlucHV0LnZhbHVlKSwgJ0FERCcpO1xuICAgICAgICB9LCB0aGlzLmNhbGxCYWNrRGVsYXkpO1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNlbmRBamF4UmVxdWVzdFRvUmVtb3ZlSXRlbUZyb21DYXJ0KGV2ZW50OiBFdmVudCwgZGVjcmVtZW50ZXIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICBsZXQgcXVhbnRpdHlJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRlY3JlbWVudGVyLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgbGV0IHF1YW50aXR5OiBudW1iZXIgPSBOdW1iZXIocXVhbnRpdHlJbnB1dC52YWx1ZSk7XG4gICAgICAgIHF1YW50aXR5LS07XG4gICAgICAgIHF1YW50aXR5SW5wdXQudmFsdWUgPSBTdHJpbmcocXVhbnRpdHkpO1xuICAgICAgICB0aGlzLnRvZ2dsZUNvdW50ZXJBbmRBamF4QnV0dG9ucyhkZWNyZW1lbnRlciwgJ1JFTU9WRScsIHF1YW50aXR5KTtcbiAgICAgICAgdGhpcy5hZGRPclJlbW92ZUJpbkljb24oZGVjcmVtZW50ZXIucGFyZW50RWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZW5kUmVxdWVzdChkZWNyZW1lbnRlci5ocmVmLCBkZWNyZW1lbnRlciwgU3RyaW5nKHF1YW50aXR5SW5wdXQudmFsdWUpLCAnUkVNT1ZFJyk7XG4gICAgICAgIH0sIHRoaXMuY2FsbEJhY2tEZWxheSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxpbmtDbGlja0hhbmRsZXIoZXZlbnQ6IEV2ZW50LCBsaW5rOiBIVE1MTGlua0VsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZW5kUmVxdWVzdChsaW5rLmhyZWYsIGxpbmssIFN0cmluZygxKSwgbnVsbCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIHNlbmRSZXF1ZXN0KHVybDogc3RyaW5nLCBsaW5rOiBIVE1MTGlua0VsZW1lbnQsIHF1YW50aXR5OiBzdHJpbmcsIG9wZXJhdGlvbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGxldCBwcm9kdWN0U2t1ID0gbGluay5kYXRhc2V0LnByb2R1Y3RTa3U7XG4gICAgICAgIGxldCBwcm9kdWN0UHJpY2UgPSBsaW5rLmRhdGFzZXQucHJvZHVjdFByaWNlICogMTAwO1xuICAgICAgICBsZXQgcHJvZHVjdFRpdGxlID0gbGluay5kYXRhc2V0LnByb2R1Y3RUaXRsZTtcbiAgICAgICAgbGV0IGZpcnN0Q2xpY2tGbGFnID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IHByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXInKSk7XG5cbiAgICAgICAgaWYocHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXIpe1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcltpXVswXS5pbmNsdWRlcyhwcm9kdWN0U2t1KSkge1xuICAgICAgICAgICAgICAgICAgICBpZihwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcltpXVsyXSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICBmaXJzdENsaWNrRmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdENsaWNrRmxhZyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdENsaWNrRmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmlyc3RDbGlja0ZsYWcgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHF1ZXJ5ID0gXCJcIjtcbiAgICAgICAgbGV0IHBhZ2UgPSBcIjFcIjtcblxuICAgICAgICBsZXQgcmVjb3JkTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmZi1yZWNvcmQtbGlzdCcpWzBdO1xuICAgICAgICBpZihyZWNvcmRMaXN0KXtcbiAgICAgICAgICAgIGxldCBiYXNlVVJJID0gcmVjb3JkTGlzdC5iYXNlVVJJO1xuICAgICAgICAgICAgbGV0IHJlc3VsdFF1ZXJ5ID0gYmFzZVVSSS5zdWJzdHJpbmcoYmFzZVVSSS5pbmRleE9mKCc/JykgKyAxLCBiYXNlVVJJLmluZGV4T2YoJyYnKSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0UGFnZSA9IGJhc2VVUkkuc3Vic3RyaW5nKGJhc2VVUkkuaW5kZXhPZignJicpICsgMSk7XG4gICAgICAgICAgICBxdWVyeSA9IHJlc3VsdFF1ZXJ5LnN1YnN0cmluZyhyZXN1bHRRdWVyeS5pbmRleE9mKCc9JykgKyAxKTtcbiAgICAgICAgICAgIHBhZ2UgPSByZXN1bHRQYWdlLnN1YnN0cmluZyhyZXN1bHRQYWdlLmluZGV4T2YoJz0nKSArIDEpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Rva2VuJywgbGluay5kYXRhc2V0LmNzcmZUb2tlbik7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnb3BlcmF0aW9uJywgb3BlcmF0aW9uKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdxdWFudGl0eScsIHF1YW50aXR5KTtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHVybCwge1xuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBteVRva2VuOiBsaW5rLmRhdGFzZXQuY3NyZlRva2VuLFxuICAgICAgICAgICAgICAgIG15T3BlcmF0aW9uOiBvcGVyYXRpb24sXG4gICAgICAgICAgICAgICAgbXlRdWFudGl0eTogcXVhbnRpdHksXG4gICAgICAgICAgICAgICAgcHJvZHVjdFNrdTogcHJvZHVjdFNrdSxcbiAgICAgICAgICAgICAgICBwcm9kdWN0UHJpY2U6IHByb2R1Y3RQcmljZSxcbiAgICAgICAgICAgICAgICBwcm9kdWN0VGl0bGU6IHByb2R1Y3RUaXRsZSxcbiAgICAgICAgICAgICAgICBhZGRlZFF1YW50aXR5OiB0aGF0LnF1YW50aXR5QWRkZWQsXG4gICAgICAgICAgICAgICAgZmlyc3RDbGlja0ZsYWc6IGZpcnN0Q2xpY2tGbGFnLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RQYWdlOiBwYWdlLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RQb3NpdGlvbjogbGluay5kYXRhc2V0LnByb2R1Y3RQb3NpdGlvbixcbiAgICAgICAgICAgICAgICBwcm9kdWN0UXVlcnk6IHF1ZXJ5XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzcyhkYXRhLCBzdGF0dXMsIHhocikge1xuICAgICAgICAgICAgICAgIGlmKGRhdGEuZXJyb3IgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0TWVzc2FnZXMoZGF0YS5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd01lc3NhZ2VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZUl0ZW1RdWFudGl0eUlucHV0KGxpbmssIGRhdGEuaXRlbVF1YW50aXR5KTtcbiAgICAgICAgICAgICAgICB0aGF0LnJlcGxhY2VRdWFudGl0eShkYXRhLnF1YW50aXR5KTtcbiAgICAgICAgICAgICAgICB0aGF0LnJlcGxhY2VBbW91bnQoZGF0YS5hbW91bnQpO1xuICAgICAgICAgICAgICAgIHRoYXQuaGlkZUljb24oKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dRdWFudGl0eSgpO1xuICAgICAgICAgICAgICAgIHRoYXQucXVhbnRpdHlBZGRlZCA9IDA7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpc0NvdW50ZXJWaXNpYmxlID0gb3BlcmF0aW9uICE9PSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzQ291bnRlclZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93TWVzc2FnZShkYXRhLCBsaW5rKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dDb3VudGVyQW5kSGlkZUFqYXhCdXR0b24obGluayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yKGpxWGhyLCB0ZXh0U3RhdHVzLCBlcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGF0LnNldE1lc3NhZ2VzKGpxWGhyLmVycm9yKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dNZXNzYWdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHByb3RlY3RlZCBzaG93TWVzc2FnZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uQXJlYS5jbGFzc0xpc3QucmVtb3ZlKEhJRERFTl9DTEFTUyk7XG4gICAgICAgIHRoaXMuZmxhc2hNZXNzYWdlcy5mb3JFYWNoKGZsYXNoTWVzc2FnZUl0ZW0gPT4ge1xuICAgICAgICAgICAgZmxhc2hNZXNzYWdlSXRlbS5zaG93Rm9yKGZsYXNoTWVzc2FnZUl0ZW0uZGVmYXVsdER1cmF0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldE1lc3NhZ2VzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzVGV4dEhvbGRlcnMuZm9yRWFjaCgobWVzc2FnZUl0ZW06IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBtZXNzYWdlSXRlbS5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVwbGFjZUFtb3VudChhbW91bnQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmFtb3VudC5mb3JFYWNoKChhbW91bnRJdGVtOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgYW1vdW50SXRlbS5pbm5lckhUTUwgPSBhbW91bnQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZXBsYWNlUXVhbnRpdHkocXVhbnRpdHk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnF1YW50aXR5LmZvckVhY2goKGFtb3VudEl0ZW06IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBhbW91bnRJdGVtLmlubmVySFRNTCA9IHF1YW50aXR5O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdHJhY2tpbmdJbmZvKGxpbms6IEhUTUxMaW5rRWxlbWVudCk6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nXG4gICAgfSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBza3U6IGxpbmsuZGF0YXNldC5wcm9kdWN0U2t1LFxuICAgICAgICAgICAgdGl0bGU6IGxpbmsuZGF0YXNldC5wcm9kdWN0VGl0bGUsXG4gICAgICAgICAgICBwcmljZTogbGluay5kYXRhc2V0LnByb2R1Y3RQcmljZSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaGlkZUljb24oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmljb24pIHtcbiAgICAgICAgICAgIHRoaXMuaWNvbi5jbGFzc0xpc3QuYWRkKEhJRERFTl9DTEFTUyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hvd1F1YW50aXR5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnF1YW50aXR5LmZvckVhY2goKGFtb3VudEl0ZW06IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBhbW91bnRJdGVtLmNsYXNzTGlzdC5yZW1vdmUoSElEREVOX0NMQVNTKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRvZ2dsZUNvdW50ZXJBbmRBamF4QnV0dG9ucyhsaW5rOiBIVE1MTGlua0VsZW1lbnQsIG9wZXJhdGlvbjogc3RyaW5nLCBxdWFudGl0eTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChvcGVyYXRpb24gPT09ICdSRU1PVkUnICYmIHF1YW50aXR5ID09PSAwKSB7XG4gICAgICAgICAgIHRoaXMuc2hvd0FqYXhCdXR0b25BbmRIaWRlQ291bnRlcihsaW5rKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVJdGVtUXVhbnRpdHlJbnB1dChsaW5rOiBIVE1MTGlua0VsZW1lbnQsIHF1YW50aXR5OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHF1YW50aXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBwcm9kdWN0U2t1RnJvbVBPUCA9IGxpbmsuZGF0YXNldC5wcm9kdWN0U2t1O1xuICAgICAgICAgICAgaWYgKHByb2R1Y3RTa3VGcm9tUE9QID09PSAnJyB8fCBwcm9kdWN0U2t1RnJvbVBPUCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByb2R1Y3RVcmwgPSBsaW5rLmRhdGFzZXQucHJvZHVjdFVybDtcbiAgICAgICAgICAgICAgICBpZiAocHJvZHVjdFVybCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0U2t1RnJvbVBPUCA9IHByb2R1Y3RVcmwuc3BsaXQoXCIvXCIpWzNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBpdGVtQWRkZWRJbkNhcnRXaXRoUXVhbnRpdHkgPSBbW3Byb2R1Y3RTa3VGcm9tUE9QLCBxdWFudGl0eSwgdHJ1ZV1dO1xuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcicpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXInKSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcltpXVswXS5pbmNsdWRlcyhwcm9kdWN0U2t1RnJvbVBPUCkgJiYgcHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXJbaV1bMF0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyW2ldWzFdID0gcXVhbnRpdHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFKU09OLnN0cmluZ2lmeShwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcikuaW5jbHVkZXMoSlNPTi5zdHJpbmdpZnkoaXRlbUFkZGVkSW5DYXJ0V2l0aFF1YW50aXR5WzBdWzBdKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXIucHVzaChpdGVtQWRkZWRJbkNhcnRXaXRoUXVhbnRpdHlbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXInLCBKU09OLnN0cmluZ2lmeShwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXInLCBKU09OLnN0cmluZ2lmeShpdGVtQWRkZWRJbkNhcnRXaXRoUXVhbnRpdHkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvdW50ZXI6IEhUTUxJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5saW5rLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKENMQVNTX1BSRUZJWCArIHRoaXMucXVhbnRpdHlJbnB1dEZpZWxkKTtcbiAgICAgICAgICAgIGNvdW50ZXIudmFsdWUgPSBTdHJpbmcocXVhbnRpdHkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNob3dNZXNzYWdlKHJlc3BvbnNlOiBvYmplY3QsIGxpbms6IEhUTUxMaW5rRWxlbWVudCkge1xuICAgICAgICBjb25zdCBwYXJlbnRDb3VudGVyOiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD5saW5rLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGFkZGVkSXRlbU1lc3NhZ2U6IEhUTUxFbGVtZW50ID0gcGFyZW50Q291bnRlci5xdWVyeVNlbGVjdG9yKENMQVNTX1BSRUZJWCArIHRoaXMuaXRlbUFkZGVkKTtcbiAgICAgICAgY29uc3QgcmVtb3ZlSXRlbU1lc3NhZ2U6IEhUTUxFbGVtZW50ID0gcGFyZW50Q291bnRlci5xdWVyeVNlbGVjdG9yKENMQVNTX1BSRUZJWCArIHRoaXMuaXRlbVJlbW92ZWQpO1xuICAgICAgICBpZiAocmVzcG9uc2UuY29kZSA9PT0gMjAwICYmIHJlc3BvbnNlLm9wZXJhdGlvbiA9PT0gJ0FERCcpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zaG93VG9wTWVzc2FnZUZvck1vYmlsZURldmljZShhZGRlZEl0ZW1NZXNzYWdlLCByZXNwb25zZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZXJyb3JFeGlzdHNBbmRRdWFudGl0eUJpZ2dlclRoYW5RdWFudGl0eUZyb21UaGVDYXJ0KHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgICAgICBhZGRlZEl0ZW1NZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW1UaW1lT3V0KGFkZGVkSXRlbU1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLmNvZGUgPT09IDIwMCAmJiByZXNwb25zZS5vcGVyYXRpb24gPT09ICdBRERfTVVMVElQTEUnKSB7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zaG93VG9wTWVzc2FnZUZvck1vYmlsZURldmljZShhZGRlZEl0ZW1NZXNzYWdlLCByZXNwb25zZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZXJyb3JFeGlzdHNBbmRRdWFudGl0eUJpZ2dlclRoYW5RdWFudGl0eUZyb21UaGVDYXJ0KHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgICAgICBhZGRlZEl0ZW1NZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW1UaW1lT3V0KGFkZGVkSXRlbU1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2hvd1RvcE1lc3NhZ2VGb3JNb2JpbGVEZXZpY2UocmVtb3ZlSXRlbU1lc3NhZ2UsIHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lcnJvckV4aXN0c0FuZFF1YW50aXR5QmlnZ2VyVGhhblF1YW50aXR5RnJvbVRoZUNhcnQocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUl0ZW1NZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW1UaW1lT3V0KHJlbW92ZUl0ZW1NZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZXJyb3JFeGlzdHNBbmRRdWFudGl0eUJpZ2dlclRoYW5RdWFudGl0eUZyb21UaGVDYXJ0KHJlc3BvbnNlOiBvYmplY3QpIHtcblxuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgaXRlbVF1YW50aXR5RnJvbUNhcnQ6IG51bWJlciA9IHJlc3BvbnNlLml0ZW1RdWFudGl0eTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRRdWFudGl0eTogbnVtYmVyID0gcmVzcG9uc2UucXVhbnRpdHk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1YW50aXR5ID4gaXRlbVF1YW50aXR5RnJvbUNhcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlSXRlbVRpbWVPdXQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hvd1RvcE1lc3NhZ2VGb3JNb2JpbGVEZXZpY2UobWVzc2FnZTogSFRNTEVsZW1lbnQsIHJlc3BvbnNlOiBvYmplY3QpIHtcbiAgICAgICAgY29uc3Qgd2luZG93V2lkdGg6IG51bWJlciA9IHdpbmRvdy5zY3JlZW4ud2lkdGg7XG5cbiAgICAgICAgaWYgKHdpbmRvd1dpZHRoIDwgNTc0ICYmICF0aGlzLmVycm9yRXhpc3RzQW5kUXVhbnRpdHlCaWdnZXJUaGFuUXVhbnRpdHlGcm9tVGhlQ2FydChyZXNwb25zZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvcE1lc3NhZ2U6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50Pm1lc3NhZ2UuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgY29uc3QgYm9keTogSFRNTEJvZHlFbGVtZW50ID0gPEhUTUxCb2R5RWxlbWVudD5kb2N1bWVudC5ib2R5O1xuICAgICAgICAgICAgdG9wTWVzc2FnZS5zdHlsZS5jc3NUZXh0ID0gdGhpcy5jc3NNZXNzYWdlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNoZWNrTWFyazogSFRNTEVsZW1lbnQgPSB0b3BNZXNzYWdlLnF1ZXJ5U2VsZWN0b3IoJy5jaGVja21hcmsnKTtcbiAgICAgICAgICAgIGNoZWNrTWFyay5zdHlsZS5jc3NUZXh0ID0gdGhpcy5jc3NDaGVja01hcmsoKTtcblxuICAgICAgICAgICAgdG9wTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgIGJvZHkuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICAgICAgYm9keS5pbnNlcnRCZWZvcmUodG9wTWVzc2FnZSwgYm9keS5maXJzdEVsZW1lbnRDaGlsZCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0b3BNZXNzYWdlLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzaG93Q291bnRlckFuZEhpZGVBamF4QnV0dG9uKGxpbms6IEhUTUxMaW5rRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb3VudGVyID0gbGluaz8ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBjb3VudGVyPy5jbGFzc0xpc3QuYWRkKHRoaXMuYWpheENhcnRDb3VudGVyQ2xhc3MpO1xuICAgICAgICBjb3VudGVyPy5jbGFzc0xpc3QucmVtb3ZlKEhJRERFTl9DTEFTUyk7XG4gICAgICAgIGxpbms/LmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTKTtcbiAgICAgICAgdGhpcy5hZGRPclJlbW92ZUJpbkljb24oY291bnRlcik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFkZE9yUmVtb3ZlQmluSWNvbihlbGVtZW50KSB7XG4gICAgICAgIGxldCBkZWNyZWFzZUJ1dHRvbkVsZW1lbnQgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5hZGRUb0NhcnREZWNyZW1lbnRlcilbMF07XG4gICAgICAgIGxldCBxdWFudGl0eUVsZW1lbnQgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5xdWFudGl0eUlucHV0RmllbGQpWzBdO1xuICAgICAgICBsZXQgY29kZWJ1Y2tldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb2RlQnVja2V0KTtcbiAgICAgICAgaWYgKHF1YW50aXR5RWxlbWVudC52YWx1ZUFzTnVtYmVyID4gMSAmJiBkZWNyZWFzZUJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuYWRkQmluSWNvbikgfHwgZGVjcmVhc2VCdXR0b25FbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmFkZEJpbkljb25DeikpIHtcbiAgICAgICAgICAgIGlmKGNvZGVidWNrZXQudmFsdWUgPT09IFwiREVcIil7XG4gICAgICAgICAgICAgICAgZGVjcmVhc2VCdXR0b25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5hZGRCaW5JY29uKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVjcmVhc2VCdXR0b25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5hZGRCaW5JY29uQ3opO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVjcmVhc2VCdXR0b25FbGVtZW50LmlubmVyVGV4dCA9IFwiLVwiO1xuICAgICAgICB9IGVsc2UgaWYocXVhbnRpdHlFbGVtZW50LnZhbHVlQXNOdW1iZXIgPT09IDEpIHtcbiAgICAgICAgICAgIGlmKGNvZGVidWNrZXQudmFsdWUgPT09IFwiREVcIil7XG4gICAgICAgICAgICAgICAgZGVjcmVhc2VCdXR0b25FbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5hZGRCaW5JY29uKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVjcmVhc2VCdXR0b25FbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5hZGRCaW5JY29uQ3opO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVjcmVhc2VCdXR0b25FbGVtZW50LmlubmVyVGV4dCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hvd0FqYXhCdXR0b25BbmRIaWRlQ291bnRlcihsaW5rOiBIVE1MTGlua0VsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY291bnRlciA9IGxpbms/LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGFkZEFqYXhCdXR0b24gPSBsaW5rPy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihDTEFTU19QUkVGSVggKyB0aGlzLmFqYXhBZGRRdWFudGl0eUxpbmspO1xuICAgICAgICBjb3VudGVyPy5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuYWpheENhcnRDb3VudGVyQ2xhc3MpO1xuICAgICAgICBjb3VudGVyPy5jbGFzc0xpc3QuYWRkKEhJRERFTl9DTEFTUyk7XG4gICAgICAgIGFkZEFqYXhCdXR0b24/LmNsYXNzTGlzdC5yZW1vdmUoSElEREVOX0NMQVNTKTtcbiAgICAgICAgYWRkQWpheEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhZGRUb0NhcnRMaW5rQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuanNOYW1lfV9fbGlua2A7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhZGRUb0NhcnRJbmNyZW1lbnRlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2pzLXF1YW50aXR5LWNvdW50ZXItcHJvZHVjdF9faW5jcic7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhZGRUb0NhcnREZWNyZW1lbnRlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2pzLXF1YW50aXR5LWNvdW50ZXItcHJvZHVjdF9fZGVjcic7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhamF4QWRkUXVhbnRpdHlMaW5rKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnanMtYWpheC1hZGQtdG8tY2FydF9fbGluayc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhamF4Q2hhbmdlUXVhbnRpdHlMaW5rKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnanMtYWpheC1jaGFuZ2UtcXVhbnRpdHlfX2xpbmsnO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgYWpheENhcnRDb3VudGVyQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdjaGFuZ2UtY2FydC1jb3VudGVyJztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHF1YW50aXR5SW5wdXRGaWVsZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ3R4dC1wcm9kdWN0LXF1YW50aXR5JztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGFkZEJpbkljb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdhZGQtYmluJztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGFkZEJpbkljb25DeigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2FkZC1iaW4tY3onO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgY29kZUJ1Y2tldCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gXCJpbnB1dFtuYW1lPWhlYWRlci1jb2RlYnVja2V0XVwiO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgaXRlbUFkZGVkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnaXRlbS1hZGRlZCc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBpdGVtUmVtb3ZlZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2l0ZW0tcmVtb3ZlZCc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBjYXJ0Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuanNOYW1lfV9fY2FydC1ibG9ja2A7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhbW91bnRDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5qc05hbWV9X19hbW91bnRgO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgcXVhbnRpdHlDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5qc05hbWV9X19xdWFudGl0eWA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBpY29uQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuanNOYW1lfV9faWNvbmA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBmbGFzaE1lc3NhZ2VzQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuanNOYW1lfV9fZmxhc2gtbWVzc2FnZWA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBtZXNzYWdlc1RleHRIb2xkZXJDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5qc05hbWV9X19tZXNzYWdlLXRleHRgO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgbm90aWZpY2F0aW9uQXJlYUNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmpzTmFtZX1fX25vdGlmaWNhdGlvbi1hcmVhYDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3NzTWVzc2FnZSgpOiBzdHJpbmcge1xuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICB3aWR0aDo5MCU7XG4gICAgICAgICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6Y2VudGVyO1xuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgICAgdG9wOiA1cHg7XG4gICAgICAgICAgICBsZWZ0OiA1JTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiM3YjdiN2I7XG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICAgIHotaW5kZXg6IDk5OTtcbiAgICAgICAgYDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3NzQ2hlY2tNYXJrKCk6IHN0cmluZyB7XG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHRvcDogNnB4O1xuICAgICAgICAgICAgbGVmdDoxNXB4O1xuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgICAgICAgICAgaGVpZ2h0OiAyMnB4O1xuICAgICAgICAgICAgd2lkdGg6IDExcHg7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2ZmZjtcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMnB4IHNvbGlkICNmZmY7XG4gICAgICAgIGA7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==