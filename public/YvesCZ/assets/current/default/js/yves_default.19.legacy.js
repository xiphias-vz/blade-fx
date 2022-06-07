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
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9__);









function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var HIDDEN_CLASS = 'is-hidden';
var CLASS_PREFIX = '.';
var ID_PREFIX = '#';

var AjaxAddToCart = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_6___default()(AjaxAddToCart, _Component);

  var _super = _createSuper(AjaxAddToCart);

  function AjaxAddToCart() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "$this", jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "links", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "cartBlock", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "amount", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "quantity", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "itemQuantity", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "operation", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "icon", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "flashMessages", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "messagesTextHolders", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "notificationArea", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "addToCartIncrementerLinks", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "addtoCartDecrementerLinks", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "quantityInputs", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "quantityAdded", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "timer", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "callBackDelay", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "environment", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "url", void 0);

    return _this;
  }

  var _proto = AjaxAddToCart.prototype;

  _proto.readyCallback = function readyCallback() {
    var _this2 = this;

    this.environment = document.querySelector('#environment');

    if (this.environment.value === 'DE') {
      var checkRecordsAreRendered = setInterval(function () {
        _this2.links = Array.from(document.getElementsByClassName(_this2.addToCartLinkClass));

        if (_this2.links.length > 0) {
          _this2.load();

          clearInterval(checkRecordsAreRendered);
        }
      }, 500);
    } else {
      this.load();
    }
  };

  _proto.load = function load() {
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
  };

  _proto.listenForUrlChanges = function listenForUrlChanges() {
    var _this3 = this;

    setInterval(function () {
      if (_this3.url != location.href) {
        _this3.url = location.href;

        _this3.load();
      }
    }, 500);
  };

  _proto.mapEvents = function mapEvents() {
    var _this4 = this;

    this.links.forEach(function (link) {
      if (localStorage.getItem('productItemsForSyncCounter')) {
        _this4.syncCounterFromLocalStorage(link);
      }

      if (link.getAttribute('flag') !== "1") {
        link.addEventListener('click', function (event) {
          return _this4.linkClickHandler(event, link);
        });
        link.setAttribute('flag', '1');
      }
    });
    this.addToCartIncrementerLinks.forEach(function (incrementer, index) {
      if (incrementer.getAttribute('flag') !== "1") {
        incrementer.addEventListener('click', function (event) {
          return _this4.sendAjaxRequestToAddItemToCart(event, incrementer);
        });
        incrementer.setAttribute('flag', '1');
      }
    });
    this.addtoCartDecrementerLinks.forEach(function (decrementer, index) {
      if (decrementer.getAttribute('flag') !== "1") {
        decrementer.addEventListener('click', function (event) {
          return _this4.sendAjaxRequestToRemoveItemFromCart(event, decrementer);
        });
        decrementer.setAttribute('flag', '1');
      }
    });
    this.quantityInputs.forEach(function (quantityInput) {
      quantityInput.addEventListener('keyup', function (event) {
        return _this4.applyQuantityValidation(event);
      });
      quantityInput.addEventListener('change', function (event) {
        return _this4.sendAjaxRequestToAddMultipleItemsToCart(event);
      });
    });
  };

  _proto.syncCounterFromLocalStorage = function syncCounterFromLocalStorage(link) {
    var _this5 = this;

    var productItemsForSyncCounter = JSON.parse(localStorage.getItem('productItemsForSyncCounter'));
    productItemsForSyncCounter.forEach(function (_ref) {
      var key = _ref[0],
          value = _ref[1];
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
          _this5.updateItemQuantityInput(link, quantityFromCart);

          _this5.showCounterAndHideAjaxButton(link);
        } else {
          var filteredProductItemsFromCart = productItemsForSyncCounter.filter(function (_ref2) {
            var key = _ref2[0],
                value = _ref2[1];
            return value !== 0;
          });
          localStorage.setItem('productItemsForSyncCounter', JSON.stringify(filteredProductItemsFromCart));

          if (localStorage.getItem('productItemsForSyncCounter') === '[]') {
            localStorage.removeItem('productItemsForSyncCounter');
          }
        }
      }
    });
  };

  _proto.applyQuantityValidation = function applyQuantityValidation(event) {
    var quantityInput = event.target;
    var quantity = quantityInput.value;

    if (quantity === '' || quantity === '0') {
      quantityInput.value = '1';
    } else if (quantity.length > 2) {
      quantityInput.value = quantity[0] + quantity[1];
    }
  };

  _proto.sendAjaxRequestToAddMultipleItemsToCart = function sendAjaxRequestToAddMultipleItemsToCart(event) {
    var quantityInput = event.target;
    var quantity = quantityInput.value;
    var incrementer = quantityInput.nextElementSibling;
    this.sendRequest(incrementer.href, incrementer, String(quantity), 'ADD_MULTIPLE');
  };

  _proto.sendAjaxRequestToAddItemToCart = function sendAjaxRequestToAddItemToCart(event, incrementer) {
    var _this6 = this;

    event.preventDefault();
    clearTimeout(this.timer);
    var quantityInput = incrementer.previousElementSibling;
    var quantity = Number(quantityInput.value);
    quantity++;
    this.quantityAdded++;
    quantityInput.value = String(quantity);
    this.addOrRemoveBinIcon(incrementer.parentElement);
    this.timer = setTimeout(function () {
      _this6.sendRequest(incrementer.href, incrementer, String(quantityInput.value), 'ADD');
    }, this.callBackDelay);
  };

  _proto.sendAjaxRequestToRemoveItemFromCart = function sendAjaxRequestToRemoveItemFromCart(event, decrementer) {
    var _this7 = this;

    event.preventDefault();
    clearTimeout(this.timer);
    var quantityInput = decrementer.nextElementSibling;
    var quantity = Number(quantityInput.value);
    quantity--;
    quantityInput.value = String(quantity);
    this.toggleCounterAndAjaxButtons(decrementer, 'REMOVE', quantity);
    this.addOrRemoveBinIcon(decrementer.parentElement);
    this.timer = setTimeout(function () {
      _this7.sendRequest(decrementer.href, decrementer, String(quantityInput.value), 'REMOVE');
    }, this.callBackDelay);
  };

  _proto.linkClickHandler = function linkClickHandler(event, link) {
    event.preventDefault();
    this.sendRequest(link.href, link, String(1), null);
  };

  _proto.sendRequest = /*#__PURE__*/function () {
    var _sendRequest = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(url, link, quantity, operation) {
      var productSku, productPrice, productTitle, formData, that;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              productSku = link.dataset.productSku;
              productPrice = link.dataset.productPrice * 100;
              productTitle = link.dataset.productTitle;
              formData = new FormData();
              formData.append('token', link.dataset.csrfToken);
              formData.append('operation', operation);
              formData.append('quantity', quantity);
              that = this;
              jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default.a.ajax(url, {
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
                success: function success(data, status, xhr) {
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
                error: function error(jqXhr, textStatus, errorMessage) {
                  that.setMessages(jqXhr.error);
                  that.showMessages();
                }
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function sendRequest(_x, _x2, _x3, _x4) {
      return _sendRequest.apply(this, arguments);
    }

    return sendRequest;
  }();

  _proto.showMessages = function showMessages() {
    this.notificationArea.classList.remove(HIDDEN_CLASS);
    this.flashMessages.forEach(function (flashMessageItem) {
      flashMessageItem.showFor(flashMessageItem.defaultDuration);
    });
  };

  _proto.setMessages = function setMessages(message) {
    this.messagesTextHolders.forEach(function (messageItem) {
      messageItem.innerHTML = message;
    });
  };

  _proto.replaceAmount = function replaceAmount(amount) {
    this.amount.forEach(function (amountItem) {
      amountItem.innerHTML = amount;
    });
  };

  _proto.replaceQuantity = function replaceQuantity(quantity) {
    this.quantity.forEach(function (amountItem) {
      amountItem.innerHTML = quantity;
    });
  };

  _proto.trackingInfo = function trackingInfo(link) {
    return {
      sku: link.dataset.productSku,
      title: link.dataset.productTitle,
      price: link.dataset.productPrice
    };
  };

  _proto.hideIcon = function hideIcon() {
    if (this.icon) {
      this.icon.classList.add(HIDDEN_CLASS);
    }
  };

  _proto.showQuantity = function showQuantity() {
    this.quantity.forEach(function (amountItem) {
      amountItem.classList.remove(HIDDEN_CLASS);
    });
  };

  _proto.toggleCounterAndAjaxButtons = function toggleCounterAndAjaxButtons(link, operation, quantity) {
    if (operation === 'REMOVE' && quantity === 0) {
      this.showAjaxButtonAndHideCounter(link);
    }
  };

  _proto.updateItemQuantityInput = function updateItemQuantityInput(link, quantity) {
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
  };

  _proto.showMessage = function showMessage(response, link) {
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
  };

  _proto.errorExistsAndQuantityBiggerThanQuantityFromTheCart = function errorExistsAndQuantityBiggerThanQuantityFromTheCart(response) {
    if (response.error.length > 0) {
      var itemQuantityFromCart = response.itemQuantity;
      var currentQuantity = response.quantity;

      if (currentQuantity > itemQuantityFromCart) {
        return true;
      }
    }

    return false;
  };

  _proto.removeItemTimeOut = function removeItemTimeOut(element) {
    setTimeout(function () {
      element.classList.add('is-hidden');
    }, 2000);
  };

  _proto.showTopMessageForMobileDevice = function showTopMessageForMobileDevice(message, response) {
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
      setTimeout(function () {
        topMessage.remove();
      }, 2000);
      return true;
    }

    return false;
  };

  _proto.showCounterAndHideAjaxButton = function showCounterAndHideAjaxButton(link) {
    var counter = link == null ? void 0 : link.nextElementSibling;
    counter == null ? void 0 : counter.classList.add(this.ajaxCartCounterClass);
    counter == null ? void 0 : counter.classList.remove(HIDDEN_CLASS);
    link == null ? void 0 : link.classList.add(HIDDEN_CLASS);
    this.addOrRemoveBinIcon(counter);
  };

  _proto.addOrRemoveBinIcon = function addOrRemoveBinIcon(element) {
    var decreaseButtonElement = element.getElementsByClassName(this.addToCartDecrementer)[0];
    var quantityElement = element.getElementsByClassName(this.quantityInputField)[0];

    if (quantityElement.valueAsNumber > 1 && decreaseButtonElement.classList.contains(this.addBinIcon)) {
      decreaseButtonElement.classList.remove(this.addBinIcon);
      decreaseButtonElement.innerText = "-";
    } else if (quantityElement.valueAsNumber === 1) {
      decreaseButtonElement.classList.add(this.addBinIcon);
      decreaseButtonElement.innerText = "";
    }
  };

  _proto.showAjaxButtonAndHideCounter = function showAjaxButtonAndHideCounter(link) {
    var counter = link == null ? void 0 : link.parentElement;
    var addAjaxButton = link == null ? void 0 : link.parentElement.parentElement.querySelector(CLASS_PREFIX + this.ajaxAddQuantityLink);
    counter == null ? void 0 : counter.classList.remove(this.ajaxCartCounterClass);
    counter == null ? void 0 : counter.classList.add(HIDDEN_CLASS);
    addAjaxButton == null ? void 0 : addAjaxButton.classList.remove(HIDDEN_CLASS);
    addAjaxButton.removeAttribute('disabled');
  };

  _proto.cssMessage = function cssMessage() {
    return "\n            width:90%;\n            display:flex;\n            justify-content:center;\n            align-items:center;\n            position: fixed;\n            top: 5px;\n            left: 5%;\n            padding: 10px;\n            background-color:#7b7b7b;\n            color: #fff;\n            z-index: 999;\n        ";
  };

  _proto.cssCheckMark = function cssCheckMark() {
    return "\n            position: absolute;\n            top: 6px;\n            left:15px;\n            display: inline-block;\n            transform: rotate(45deg);\n            height: 22px;\n            width: 11px;\n            border-bottom: 2px solid #fff;\n            border-right: 2px solid #fff;\n        ";
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(AjaxAddToCart, [{
    key: "addToCartLinkClass",
    get: function get() {
      return this.jsName + "__link";
    }
  }, {
    key: "addToCartIncrementer",
    get: function get() {
      return 'js-quantity-counter-product__incr';
    }
  }, {
    key: "addToCartDecrementer",
    get: function get() {
      return 'js-quantity-counter-product__decr';
    }
  }, {
    key: "ajaxAddQuantityLink",
    get: function get() {
      return 'js-ajax-add-to-cart__link';
    }
  }, {
    key: "ajaxChangeQuantityLink",
    get: function get() {
      return 'js-ajax-change-quantity__link';
    }
  }, {
    key: "ajaxCartCounterClass",
    get: function get() {
      return 'change-cart-counter';
    }
  }, {
    key: "quantityInputField",
    get: function get() {
      return 'txt-product-quantity';
    }
  }, {
    key: "addBinIcon",
    get: function get() {
      return 'add-bin';
    }
  }, {
    key: "itemAdded",
    get: function get() {
      return 'item-added';
    }
  }, {
    key: "itemRemoved",
    get: function get() {
      return 'item-removed';
    }
  }, {
    key: "cartClass",
    get: function get() {
      return this.jsName + "__cart-block";
    }
  }, {
    key: "amountClass",
    get: function get() {
      return this.jsName + "__amount";
    }
  }, {
    key: "quantityClass",
    get: function get() {
      return this.jsName + "__quantity";
    }
  }, {
    key: "iconClass",
    get: function get() {
      return this.jsName + "__icon";
    }
  }, {
    key: "flashMessagesClass",
    get: function get() {
      return this.jsName + "__flash-message";
    }
  }, {
    key: "messagesTextHolderClass",
    get: function get() {
      return this.jsName + "__message-text";
    }
  }, {
    key: "notificationAreaClass",
    get: function get() {
      return this.jsName + "__notification-area";
    }
  }]);

  return AjaxAddToCart;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_8__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvYWpheC1hZGQtdG8tY2FydC9hamF4LWFkZC10by1jYXJ0LnRzIl0sIm5hbWVzIjpbIkhJRERFTl9DTEFTUyIsIkNMQVNTX1BSRUZJWCIsIklEX1BSRUZJWCIsIkFqYXhBZGRUb0NhcnQiLCIkIiwicmVhZHlDYWxsYmFjayIsImVudmlyb25tZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidmFsdWUiLCJjaGVja1JlY29yZHNBcmVSZW5kZXJlZCIsInNldEludGVydmFsIiwibGlua3MiLCJBcnJheSIsImZyb20iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiYWRkVG9DYXJ0TGlua0NsYXNzIiwibGVuZ3RoIiwibG9hZCIsImNsZWFySW50ZXJ2YWwiLCJhZGRUb0NhcnRJbmNyZW1lbnRlckxpbmtzIiwiYWRkVG9DYXJ0SW5jcmVtZW50ZXIiLCJhZGR0b0NhcnREZWNyZW1lbnRlckxpbmtzIiwiYWRkVG9DYXJ0RGVjcmVtZW50ZXIiLCJxdWFudGl0eUlucHV0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJxdWFudGl0eUlucHV0RmllbGQiLCJxdWFudGl0eUFkZGVkIiwiaWNvbiIsImljb25DbGFzcyIsImNhcnRCbG9jayIsImNhcnRDbGFzcyIsImFtb3VudCIsImFtb3VudENsYXNzIiwicXVhbnRpdHkiLCJxdWFudGl0eUNsYXNzIiwiZmxhc2hNZXNzYWdlcyIsImZsYXNoTWVzc2FnZXNDbGFzcyIsIm5vdGlmaWNhdGlvbkFyZWEiLCJub3RpZmljYXRpb25BcmVhQ2xhc3MiLCJtZXNzYWdlc1RleHRIb2xkZXJzIiwibWVzc2FnZXNUZXh0SG9sZGVyQ2xhc3MiLCJjYWxsQmFja0RlbGF5IiwibGlzdGVuRm9yVXJsQ2hhbmdlcyIsInVybCIsImxvY2F0aW9uIiwiaHJlZiIsIm1hcEV2ZW50cyIsImZvckVhY2giLCJsaW5rIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInN5bmNDb3VudGVyRnJvbUxvY2FsU3RvcmFnZSIsImdldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImxpbmtDbGlja0hhbmRsZXIiLCJzZXRBdHRyaWJ1dGUiLCJpbmNyZW1lbnRlciIsImluZGV4Iiwic2VuZEFqYXhSZXF1ZXN0VG9BZGRJdGVtVG9DYXJ0IiwiZGVjcmVtZW50ZXIiLCJzZW5kQWpheFJlcXVlc3RUb1JlbW92ZUl0ZW1Gcm9tQ2FydCIsInF1YW50aXR5SW5wdXQiLCJhcHBseVF1YW50aXR5VmFsaWRhdGlvbiIsInNlbmRBamF4UmVxdWVzdFRvQWRkTXVsdGlwbGVJdGVtc1RvQ2FydCIsInByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyIiwiSlNPTiIsInBhcnNlIiwia2V5IiwicHJvZHVjdFNrdUZyb21QT1AiLCJkYXRhc2V0IiwicHJvZHVjdFNrdSIsInVuZGVmaW5lZCIsInByb2R1Y3RVcmwiLCJzcGxpdCIsInF1YW50aXR5RnJvbUNhcnQiLCJ1cGRhdGVJdGVtUXVhbnRpdHlJbnB1dCIsInNob3dDb3VudGVyQW5kSGlkZUFqYXhCdXR0b24iLCJmaWx0ZXJlZFByb2R1Y3RJdGVtc0Zyb21DYXJ0IiwiZmlsdGVyIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInJlbW92ZUl0ZW0iLCJ0YXJnZXQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJzZW5kUmVxdWVzdCIsIlN0cmluZyIsInByZXZlbnREZWZhdWx0IiwiY2xlYXJUaW1lb3V0IiwidGltZXIiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiTnVtYmVyIiwiYWRkT3JSZW1vdmVCaW5JY29uIiwicGFyZW50RWxlbWVudCIsInNldFRpbWVvdXQiLCJ0b2dnbGVDb3VudGVyQW5kQWpheEJ1dHRvbnMiLCJvcGVyYXRpb24iLCJwcm9kdWN0UHJpY2UiLCJwcm9kdWN0VGl0bGUiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiY3NyZlRva2VuIiwidGhhdCIsImFqYXgiLCJ0eXBlIiwiZGF0YVR5cGUiLCJkYXRhIiwibXlUb2tlbiIsIm15T3BlcmF0aW9uIiwibXlRdWFudGl0eSIsImFkZGVkUXVhbnRpdHkiLCJzdWNjZXNzIiwic3RhdHVzIiwieGhyIiwiZXJyb3IiLCJzZXRNZXNzYWdlcyIsInNob3dNZXNzYWdlcyIsIml0ZW1RdWFudGl0eSIsInJlcGxhY2VRdWFudGl0eSIsInJlcGxhY2VBbW91bnQiLCJoaWRlSWNvbiIsInNob3dRdWFudGl0eSIsImlzQ291bnRlclZpc2libGUiLCJzaG93TWVzc2FnZSIsImpxWGhyIiwidGV4dFN0YXR1cyIsImVycm9yTWVzc2FnZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImZsYXNoTWVzc2FnZUl0ZW0iLCJzaG93Rm9yIiwiZGVmYXVsdER1cmF0aW9uIiwibWVzc2FnZSIsIm1lc3NhZ2VJdGVtIiwiaW5uZXJIVE1MIiwiYW1vdW50SXRlbSIsInRyYWNraW5nSW5mbyIsInNrdSIsInRpdGxlIiwicHJpY2UiLCJhZGQiLCJzaG93QWpheEJ1dHRvbkFuZEhpZGVDb3VudGVyIiwiaXRlbUFkZGVkSW5DYXJ0V2l0aFF1YW50aXR5IiwiaSIsImluY2x1ZGVzIiwicHVzaCIsImNvdW50ZXIiLCJyZXNwb25zZSIsInBhcmVudENvdW50ZXIiLCJhZGRlZEl0ZW1NZXNzYWdlIiwiaXRlbUFkZGVkIiwicmVtb3ZlSXRlbU1lc3NhZ2UiLCJpdGVtUmVtb3ZlZCIsImNvZGUiLCJzaG93VG9wTWVzc2FnZUZvck1vYmlsZURldmljZSIsImVycm9yRXhpc3RzQW5kUXVhbnRpdHlCaWdnZXJUaGFuUXVhbnRpdHlGcm9tVGhlQ2FydCIsInJlbW92ZUl0ZW1UaW1lT3V0IiwiaXRlbVF1YW50aXR5RnJvbUNhcnQiLCJjdXJyZW50UXVhbnRpdHkiLCJlbGVtZW50Iiwid2luZG93V2lkdGgiLCJ3aW5kb3ciLCJzY3JlZW4iLCJ3aWR0aCIsInRvcE1lc3NhZ2UiLCJjbG9uZU5vZGUiLCJib2R5Iiwic3R5bGUiLCJjc3NUZXh0IiwiY3NzTWVzc2FnZSIsImNoZWNrTWFyayIsImNzc0NoZWNrTWFyayIsInBvc2l0aW9uIiwiaW5zZXJ0QmVmb3JlIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhamF4Q2FydENvdW50ZXJDbGFzcyIsImRlY3JlYXNlQnV0dG9uRWxlbWVudCIsInF1YW50aXR5RWxlbWVudCIsInZhbHVlQXNOdW1iZXIiLCJjb250YWlucyIsImFkZEJpbkljb24iLCJpbm5lclRleHQiLCJhZGRBamF4QnV0dG9uIiwiYWpheEFkZFF1YW50aXR5TGluayIsInJlbW92ZUF0dHJpYnV0ZSIsImpzTmFtZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBQ0EsSUFBTUEsWUFBWSxHQUFHLFdBQXJCO0FBQ0EsSUFBTUMsWUFBWSxHQUFHLEdBQXJCO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLEdBQWxCOztJQUVxQkMsYTs7Ozs7Ozs7Ozs7Ozs7c0xBQ0lDLHlEQUFDLENBQUMsMkY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FvQmJDLGEsR0FBVix5QkFBZ0M7QUFBQTs7QUFDNUIsU0FBS0MsV0FBTCxHQUFxQ0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLGNBQXZCLENBQXJDOztBQUNBLFFBQUksS0FBS0YsV0FBTCxDQUFpQkcsS0FBakIsS0FBMkIsSUFBL0IsRUFBcUM7QUFDakMsVUFBSUMsdUJBQXVCLEdBQUdDLFdBQVcsQ0FBQyxZQUFNO0FBQzVDLGNBQUksQ0FBQ0MsS0FBTCxHQUFnQ0MsS0FBSyxDQUFDQyxJQUFOLENBQVdQLFFBQVEsQ0FBQ1Esc0JBQVQsQ0FBZ0MsTUFBSSxDQUFDQyxrQkFBckMsQ0FBWCxDQUFoQzs7QUFFQSxZQUFHLE1BQUksQ0FBQ0osS0FBTCxDQUFXSyxNQUFYLEdBQW9CLENBQXZCLEVBQTBCO0FBQ3RCLGdCQUFJLENBQUNDLElBQUw7O0FBQ0FDLHVCQUFhLENBQUNULHVCQUFELENBQWI7QUFDSDtBQUNKLE9B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ZSI6Ii4vanMveXZlc19kZWZhdWx0LjE5LmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0IEZsYXNoTWVzc2FnZSBmcm9tICdTaG9wVWkvY29tcG9uZW50cy9tb2xlY3VsZXMvZmxhc2gtbWVzc2FnZS9mbGFzaC1tZXNzYWdlJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeS9kaXN0L2pxdWVyeSc7XG5jb25zdCBISURERU5fQ0xBU1MgPSAnaXMtaGlkZGVuJztcbmNvbnN0IENMQVNTX1BSRUZJWCA9ICcuJztcbmNvbnN0IElEX1BSRUZJWCA9ICcjJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheEFkZFRvQ2FydCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkICR0aGlzOiAkID0gJCh0aGlzKTtcbiAgICBwcm90ZWN0ZWQgbGlua3M6IEhUTUxMaW5rRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBjYXJ0QmxvY2s6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBhbW91bnQ6IEhUTUxFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIHF1YW50aXR5OiBIVE1MRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBpdGVtUXVhbnRpdHk6IEhUTUxFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIG9wZXJhdGlvbjogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgaWNvbjogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGZsYXNoTWVzc2FnZXM6IEZsYXNoTWVzc2FnZVtdO1xuICAgIHByb3RlY3RlZCBtZXNzYWdlc1RleHRIb2xkZXJzOiBIVE1MRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBub3RpZmljYXRpb25BcmVhOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGFkZFRvQ2FydEluY3JlbWVudGVyTGlua3M6IEhUTUxFbGVtZW50W107XG4gICAgcHJpdmF0ZSBhZGR0b0NhcnREZWNyZW1lbnRlckxpbmtzOiBIVE1MRWxlbWVudFtdO1xuICAgIHByaXZhdGUgcXVhbnRpdHlJbnB1dHM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgcXVhbnRpdHlBZGRlZDtcbiAgICBwcm90ZWN0ZWQgdGltZXI7XG4gICAgcHJvdGVjdGVkIGNhbGxCYWNrRGVsYXk6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgZW52aXJvbm1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHVybDogc3RyaW5nO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW52aXJvbm1lbnQnKTtcbiAgICAgICAgaWYgKHRoaXMuZW52aXJvbm1lbnQudmFsdWUgPT09ICdERScpIHtcbiAgICAgICAgICAgIGxldCBjaGVja1JlY29yZHNBcmVSZW5kZXJlZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmtzID0gPEhUTUxMaW5rRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmFkZFRvQ2FydExpbmtDbGFzcykpO1xuXG4gICAgICAgICAgICAgICAgaWYodGhpcy5saW5rcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGNoZWNrUmVjb3Jkc0FyZVJlbmRlcmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZCgpIHtcbiAgICAgICAgdGhpcy5saW5rcyA9IDxIVE1MTGlua0VsZW1lbnRbXT5BcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5hZGRUb0NhcnRMaW5rQ2xhc3MpKTtcbiAgICAgICAgdGhpcy5hZGRUb0NhcnRJbmNyZW1lbnRlckxpbmtzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuYWRkVG9DYXJ0SW5jcmVtZW50ZXIpKTtcbiAgICAgICAgdGhpcy5hZGR0b0NhcnREZWNyZW1lbnRlckxpbmtzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuYWRkVG9DYXJ0RGVjcmVtZW50ZXIpKTtcbiAgICAgICAgdGhpcy5xdWFudGl0eUlucHV0cyA9IDxIVE1MSW5wdXRFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKENMQVNTX1BSRUZJWCArIHRoaXMucXVhbnRpdHlJbnB1dEZpZWxkKSk7XG4gICAgICAgIHRoaXMucXVhbnRpdHlBZGRlZCA9IDA7XG5cbiAgICAgICAgaWYgKCF0aGlzLmxpbmtzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaWNvbiA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuaWNvbkNsYXNzKVswXTtcbiAgICAgICAgdGhpcy5jYXJ0QmxvY2sgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmNhcnRDbGFzcylbMF07XG4gICAgICAgIHRoaXMuYW1vdW50ID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuYW1vdW50Q2xhc3MpKTtcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnF1YW50aXR5Q2xhc3MpKTtcbiAgICAgICAgdGhpcy5mbGFzaE1lc3NhZ2VzID0gPEZsYXNoTWVzc2FnZVtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZmxhc2hNZXNzYWdlc0NsYXNzKSk7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uQXJlYSA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5ub3RpZmljYXRpb25BcmVhQ2xhc3MpWzBdO1xuICAgICAgICB0aGlzLm1lc3NhZ2VzVGV4dEhvbGRlcnMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMubWVzc2FnZXNUZXh0SG9sZGVyQ2xhc3MpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2FsbEJhY2tEZWxheSA9IDgwMDtcbiAgICAgICAgaWYodGhpcy5lbnZpcm9ubWVudC52YWx1ZSA9PT0gJ0RFJykge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5Gb3JVcmxDaGFuZ2VzKCk7XG4gICAgICAgICAgICB0aGlzLnVybCA9IGxvY2F0aW9uLmhyZWY7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbGlzdGVuRm9yVXJsQ2hhbmdlcygpIHtcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHRoaXMudXJsICE9IGxvY2F0aW9uLmhyZWYpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy51cmwgPSBsb2NhdGlvbi5ocmVmO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCA1MDApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGlua3MuZm9yRWFjaCgobGluazogSFRNTExpbmtFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNDb3VudGVyRnJvbUxvY2FsU3RvcmFnZShsaW5rKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGxpbmsuZ2V0QXR0cmlidXRlKCdmbGFnJykgIT09IFwiMVwiKSB7XG4gICAgICAgICAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMubGlua0NsaWNrSGFuZGxlcihldmVudCwgbGluaykpO1xuICAgICAgICAgICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdmbGFnJywgJzEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRUb0NhcnRJbmNyZW1lbnRlckxpbmtzLmZvckVhY2goKGluY3JlbWVudGVyOiBIVE1MTGlua0VsZW1lbnQsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmNyZW1lbnRlci5nZXRBdHRyaWJ1dGUoJ2ZsYWcnKSAhPT0gXCIxXCIpIHtcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMuc2VuZEFqYXhSZXF1ZXN0VG9BZGRJdGVtVG9DYXJ0KGV2ZW50LCBpbmNyZW1lbnRlcikpO1xuICAgICAgICAgICAgICAgIGluY3JlbWVudGVyLnNldEF0dHJpYnV0ZSgnZmxhZycsICcxJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkdG9DYXJ0RGVjcmVtZW50ZXJMaW5rcy5mb3JFYWNoKChkZWNyZW1lbnRlcjogSFRNTExpbmtFbGVtZW50LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGVjcmVtZW50ZXIuZ2V0QXR0cmlidXRlKCdmbGFnJykgIT09IFwiMVwiKSB7XG4gICAgICAgICAgICAgICAgZGVjcmVtZW50ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLnNlbmRBamF4UmVxdWVzdFRvUmVtb3ZlSXRlbUZyb21DYXJ0KGV2ZW50LCBkZWNyZW1lbnRlcikpO1xuICAgICAgICAgICAgICAgIGRlY3JlbWVudGVyLnNldEF0dHJpYnV0ZSgnZmxhZycsICcxJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucXVhbnRpdHlJbnB1dHMuZm9yRWFjaCgocXVhbnRpdHlJbnB1dDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcXVhbnRpdHlJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudDogRXZlbnQpID0+IHRoaXMuYXBwbHlRdWFudGl0eVZhbGlkYXRpb24oZXZlbnQpKTtcbiAgICAgICAgICAgIHF1YW50aXR5SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5zZW5kQWpheFJlcXVlc3RUb0FkZE11bHRpcGxlSXRlbXNUb0NhcnQoZXZlbnQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHN5bmNDb3VudGVyRnJvbUxvY2FsU3RvcmFnZShsaW5rKTogdm9pZCB7XG4gICAgICAgIGxldCBwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyJykpO1xuXG4gICAgICAgIHByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgbGV0IHByb2R1Y3RTa3VGcm9tUE9QID0gbGluay5kYXRhc2V0LnByb2R1Y3RTa3U7XG4gICAgICAgICAgICBpZiAocHJvZHVjdFNrdUZyb21QT1AgPT09ICcnIHx8IHByb2R1Y3RTa3VGcm9tUE9QID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJvZHVjdFVybCA9IGxpbmsuZGF0YXNldC5wcm9kdWN0VXJsO1xuICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0VXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RTa3VGcm9tUE9QID0gcHJvZHVjdFVybC5zcGxpdChcIi9cIilbM107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGtleSA9PT0gcHJvZHVjdFNrdUZyb21QT1ApIHtcbiAgICAgICAgICAgICAgICBsZXQgcXVhbnRpdHlGcm9tQ2FydCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChxdWFudGl0eUZyb21DYXJ0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbVF1YW50aXR5SW5wdXQobGluaywgcXVhbnRpdHlGcm9tQ2FydCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NvdW50ZXJBbmRIaWRlQWpheEJ1dHRvbihsaW5rKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRQcm9kdWN0SXRlbXNGcm9tQ2FydCA9IHByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyLmZpbHRlcigoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgIT09IDA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXInLCBKU09OLnN0cmluZ2lmeShmaWx0ZXJlZFByb2R1Y3RJdGVtc0Zyb21DYXJ0KSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXInKSA9PT0gJ1tdJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Byb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhcHBseVF1YW50aXR5VmFsaWRhdGlvbihldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgcXVhbnRpdHlJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgcXVhbnRpdHkgPSBxdWFudGl0eUlucHV0LnZhbHVlO1xuICAgICAgICBpZiAocXVhbnRpdHkgPT09ICcnICB8fCBxdWFudGl0eSA9PT0gJzAnKSB7XG4gICAgICAgICAgICBxdWFudGl0eUlucHV0LnZhbHVlID0gJzEnO1xuICAgICAgICB9IGVsc2UgaWYgKHF1YW50aXR5Lmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIHF1YW50aXR5SW5wdXQudmFsdWUgPSBxdWFudGl0eVswXSArIHF1YW50aXR5WzFdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNlbmRBamF4UmVxdWVzdFRvQWRkTXVsdGlwbGVJdGVtc1RvQ2FydChldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgcXVhbnRpdHlJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgcXVhbnRpdHkgPSBxdWFudGl0eUlucHV0LnZhbHVlO1xuICAgICAgICBjb25zdCBpbmNyZW1lbnRlcjogSFRNTExpbmtFbGVtZW50ID0gPEhUTUxMaW5rRWxlbWVudD5xdWFudGl0eUlucHV0Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgdGhpcy5zZW5kUmVxdWVzdChpbmNyZW1lbnRlci5ocmVmLCBpbmNyZW1lbnRlciwgU3RyaW5nKHF1YW50aXR5KSwgJ0FERF9NVUxUSVBMRScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZW5kQWpheFJlcXVlc3RUb0FkZEl0ZW1Ub0NhcnQoZXZlbnQ6IEV2ZW50LCBpbmNyZW1lbnRlcjogSFRNTExpbmtFbGVtZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgY29uc3QgcXVhbnRpdHlJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmluY3JlbWVudGVyLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGxldCBxdWFudGl0eTogbnVtYmVyID0gTnVtYmVyKHF1YW50aXR5SW5wdXQudmFsdWUpO1xuICAgICAgICBxdWFudGl0eSsrO1xuICAgICAgICB0aGlzLnF1YW50aXR5QWRkZWQrKztcbiAgICAgICAgcXVhbnRpdHlJbnB1dC52YWx1ZSA9IFN0cmluZyhxdWFudGl0eSk7XG4gICAgICAgIHRoaXMuYWRkT3JSZW1vdmVCaW5JY29uKGluY3JlbWVudGVyLnBhcmVudEVsZW1lbnQpXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFJlcXVlc3QoaW5jcmVtZW50ZXIuaHJlZiwgaW5jcmVtZW50ZXIsIFN0cmluZyhxdWFudGl0eUlucHV0LnZhbHVlKSwgJ0FERCcpO1xuICAgICAgICB9LCB0aGlzLmNhbGxCYWNrRGVsYXkpO1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNlbmRBamF4UmVxdWVzdFRvUmVtb3ZlSXRlbUZyb21DYXJ0KGV2ZW50OiBFdmVudCwgZGVjcmVtZW50ZXIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICBjb25zdCBxdWFudGl0eUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZGVjcmVtZW50ZXIubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBsZXQgcXVhbnRpdHk6IG51bWJlciA9IE51bWJlcihxdWFudGl0eUlucHV0LnZhbHVlKTtcbiAgICAgICAgcXVhbnRpdHktLTtcbiAgICAgICAgcXVhbnRpdHlJbnB1dC52YWx1ZSA9IFN0cmluZyhxdWFudGl0eSk7XG4gICAgICAgIHRoaXMudG9nZ2xlQ291bnRlckFuZEFqYXhCdXR0b25zKGRlY3JlbWVudGVyLCAnUkVNT1ZFJywgcXVhbnRpdHkpO1xuICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQmluSWNvbihkZWNyZW1lbnRlci5wYXJlbnRFbGVtZW50KTtcblxuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmRSZXF1ZXN0KGRlY3JlbWVudGVyLmhyZWYsIGRlY3JlbWVudGVyLCBTdHJpbmcocXVhbnRpdHlJbnB1dC52YWx1ZSksICdSRU1PVkUnKTtcbiAgICAgICAgfSwgdGhpcy5jYWxsQmFja0RlbGF5KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbGlua0NsaWNrSGFuZGxlcihldmVudDogRXZlbnQsIGxpbms6IEhUTUxMaW5rRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNlbmRSZXF1ZXN0KGxpbmsuaHJlZiwgbGluaywgU3RyaW5nKDEpLCBudWxsKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXN5bmMgc2VuZFJlcXVlc3QodXJsOiBzdHJpbmcsIGxpbms6IEhUTUxMaW5rRWxlbWVudCwgcXVhbnRpdHk6IHN0cmluZywgb3BlcmF0aW9uOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgbGV0IHByb2R1Y3RTa3UgPSBsaW5rLmRhdGFzZXQucHJvZHVjdFNrdTtcbiAgICAgICAgbGV0IHByb2R1Y3RQcmljZSA9IGxpbmsuZGF0YXNldC5wcm9kdWN0UHJpY2UgKiAxMDA7XG4gICAgICAgIGxldCBwcm9kdWN0VGl0bGUgPSBsaW5rLmRhdGFzZXQucHJvZHVjdFRpdGxlO1xuXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndG9rZW4nLCBsaW5rLmRhdGFzZXQuY3NyZlRva2VuKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdvcGVyYXRpb24nLCBvcGVyYXRpb24pO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3F1YW50aXR5JywgcXVhbnRpdHkpO1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgICAgICAkLmFqYXgodXJsLCB7XG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG15VG9rZW46IGxpbmsuZGF0YXNldC5jc3JmVG9rZW4sXG4gICAgICAgICAgICAgICAgbXlPcGVyYXRpb246IG9wZXJhdGlvbixcbiAgICAgICAgICAgICAgICBteVF1YW50aXR5OiBxdWFudGl0eSxcbiAgICAgICAgICAgICAgICBwcm9kdWN0U2t1OiBwcm9kdWN0U2t1LFxuICAgICAgICAgICAgICAgIHByb2R1Y3RQcmljZTogcHJvZHVjdFByaWNlLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RUaXRsZTogcHJvZHVjdFRpdGxlLFxuICAgICAgICAgICAgICAgIGFkZGVkUXVhbnRpdHk6IHRoYXQucXVhbnRpdHlBZGRlZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3MoZGF0YSwgc3RhdHVzLCB4aHIpIHtcbiAgICAgICAgICAgICAgICBpZihkYXRhLmVycm9yICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE1lc3NhZ2VzKGRhdGEuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dNZXNzYWdlcygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhhdC51cGRhdGVJdGVtUXVhbnRpdHlJbnB1dChsaW5rLCBkYXRhLml0ZW1RdWFudGl0eSk7XG4gICAgICAgICAgICAgICAgdGhhdC5yZXBsYWNlUXVhbnRpdHkoZGF0YS5xdWFudGl0eSk7XG4gICAgICAgICAgICAgICAgdGhhdC5yZXBsYWNlQW1vdW50KGRhdGEuYW1vdW50KTtcbiAgICAgICAgICAgICAgICB0aGF0LmhpZGVJY29uKCk7XG4gICAgICAgICAgICAgICAgdGhhdC5zaG93UXVhbnRpdHkoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnF1YW50aXR5QWRkZWQgPSAwO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaXNDb3VudGVyVmlzaWJsZSA9IG9wZXJhdGlvbiAhPT0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmIChpc0NvdW50ZXJWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd01lc3NhZ2UoZGF0YSwgbGluayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Q291bnRlckFuZEhpZGVBamF4QnV0dG9uKGxpbmspO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcihqcVhociwgdGV4dFN0YXR1cywgZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRNZXNzYWdlcyhqcVhoci5lcnJvcik7XG4gICAgICAgICAgICAgICAgdGhhdC5zaG93TWVzc2FnZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hvd01lc3NhZ2VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbkFyZWEuY2xhc3NMaXN0LnJlbW92ZShISURERU5fQ0xBU1MpO1xuICAgICAgICB0aGlzLmZsYXNoTWVzc2FnZXMuZm9yRWFjaChmbGFzaE1lc3NhZ2VJdGVtID0+IHtcbiAgICAgICAgICAgIGZsYXNoTWVzc2FnZUl0ZW0uc2hvd0ZvcihmbGFzaE1lc3NhZ2VJdGVtLmRlZmF1bHREdXJhdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRNZXNzYWdlcyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlc1RleHRIb2xkZXJzLmZvckVhY2goKG1lc3NhZ2VJdGVtOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgbWVzc2FnZUl0ZW0uaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlcGxhY2VBbW91bnQoYW1vdW50OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hbW91bnQuZm9yRWFjaCgoYW1vdW50SXRlbTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGFtb3VudEl0ZW0uaW5uZXJIVE1MID0gYW1vdW50O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVwbGFjZVF1YW50aXR5KHF1YW50aXR5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5xdWFudGl0eS5mb3JFYWNoKChhbW91bnRJdGVtOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgYW1vdW50SXRlbS5pbm5lckhUTUwgPSBxdWFudGl0eTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRyYWNraW5nSW5mbyhsaW5rOiBIVE1MTGlua0VsZW1lbnQpOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1xuICAgIH0ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2t1OiBsaW5rLmRhdGFzZXQucHJvZHVjdFNrdSxcbiAgICAgICAgICAgIHRpdGxlOiBsaW5rLmRhdGFzZXQucHJvZHVjdFRpdGxlLFxuICAgICAgICAgICAgcHJpY2U6IGxpbmsuZGF0YXNldC5wcm9kdWN0UHJpY2UsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGhpZGVJY29uKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pY29uKSB7XG4gICAgICAgICAgICB0aGlzLmljb24uY2xhc3NMaXN0LmFkZChISURERU5fQ0xBU1MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNob3dRdWFudGl0eSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5xdWFudGl0eS5mb3JFYWNoKChhbW91bnRJdGVtOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgYW1vdW50SXRlbS5jbGFzc0xpc3QucmVtb3ZlKEhJRERFTl9DTEFTUyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0b2dnbGVDb3VudGVyQW5kQWpheEJ1dHRvbnMobGluazogSFRNTExpbmtFbGVtZW50LCBvcGVyYXRpb246IHN0cmluZywgcXVhbnRpdHk6IG51bWJlcikge1xuICAgICAgICBpZiAob3BlcmF0aW9uID09PSAnUkVNT1ZFJyAmJiBxdWFudGl0eSA9PT0gMCkge1xuICAgICAgICAgICB0aGlzLnNob3dBamF4QnV0dG9uQW5kSGlkZUNvdW50ZXIobGluayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlSXRlbVF1YW50aXR5SW5wdXQobGluazogSFRNTExpbmtFbGVtZW50LCBxdWFudGl0eTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChxdWFudGl0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgcHJvZHVjdFNrdUZyb21QT1AgPSBsaW5rLmRhdGFzZXQucHJvZHVjdFNrdTtcbiAgICAgICAgICAgIGlmIChwcm9kdWN0U2t1RnJvbVBPUCA9PT0gJycgfHwgcHJvZHVjdFNrdUZyb21QT1AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxldCBwcm9kdWN0VXJsID0gbGluay5kYXRhc2V0LnByb2R1Y3RVcmw7XG4gICAgICAgICAgICAgICAgaWYgKHByb2R1Y3RVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdFNrdUZyb21QT1AgPSBwcm9kdWN0VXJsLnNwbGl0KFwiL1wiKVszXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpdGVtQWRkZWRJbkNhcnRXaXRoUXVhbnRpdHkgPSBbW3Byb2R1Y3RTa3VGcm9tUE9QLCBxdWFudGl0eV1dO1xuXG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcicpKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyW2ldWzBdLmluY2x1ZGVzKHByb2R1Y3RTa3VGcm9tUE9QKSAmJiBwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcltpXVswXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEl0ZW1zRm9yU3luY0NvdW50ZXJbaV1bMV0gPSBxdWFudGl0eTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIUpTT04uc3RyaW5naWZ5KHByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyKS5pbmNsdWRlcyhKU09OLnN0cmluZ2lmeShpdGVtQWRkZWRJbkNhcnRXaXRoUXVhbnRpdHlbMF1bMF0pKSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlci5wdXNoKGl0ZW1BZGRlZEluQ2FydFdpdGhRdWFudGl0eVswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcicsIEpTT04uc3RyaW5naWZ5KHByb2R1Y3RJdGVtc0ZvclN5bmNDb3VudGVyKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9kdWN0SXRlbXNGb3JTeW5jQ291bnRlcicsIEpTT04uc3RyaW5naWZ5KGl0ZW1BZGRlZEluQ2FydFdpdGhRdWFudGl0eSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY291bnRlcjogSFRNTElucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmxpbmsucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoQ0xBU1NfUFJFRklYICsgdGhpcy5xdWFudGl0eUlucHV0RmllbGQpO1xuICAgICAgICAgICAgY291bnRlci52YWx1ZSA9IFN0cmluZyhxdWFudGl0eSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hvd01lc3NhZ2UocmVzcG9uc2U6IG9iamVjdCwgbGluazogSFRNTExpbmtFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHBhcmVudENvdW50ZXI6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmxpbmsucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3QgYWRkZWRJdGVtTWVzc2FnZTogSFRNTEVsZW1lbnQgPSBwYXJlbnRDb3VudGVyLnF1ZXJ5U2VsZWN0b3IoQ0xBU1NfUFJFRklYICsgdGhpcy5pdGVtQWRkZWQpO1xuICAgICAgICBjb25zdCByZW1vdmVJdGVtTWVzc2FnZTogSFRNTEVsZW1lbnQgPSBwYXJlbnRDb3VudGVyLnF1ZXJ5U2VsZWN0b3IoQ0xBU1NfUFJFRklYICsgdGhpcy5pdGVtUmVtb3ZlZCk7XG4gICAgICAgIGlmIChyZXNwb25zZS5jb2RlID09PSAyMDAgJiYgcmVzcG9uc2Uub3BlcmF0aW9uID09PSAnQUREJykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNob3dUb3BNZXNzYWdlRm9yTW9iaWxlRGV2aWNlKGFkZGVkSXRlbU1lc3NhZ2UsIHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lcnJvckV4aXN0c0FuZFF1YW50aXR5QmlnZ2VyVGhhblF1YW50aXR5RnJvbVRoZUNhcnQocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGVkSXRlbU1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlSXRlbVRpbWVPdXQoYWRkZWRJdGVtTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuY29kZSA9PT0gMjAwICYmIHJlc3BvbnNlLm9wZXJhdGlvbiA9PT0gJ0FERF9NVUxUSVBMRScpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnNob3dUb3BNZXNzYWdlRm9yTW9iaWxlRGV2aWNlKGFkZGVkSXRlbU1lc3NhZ2UsIHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lcnJvckV4aXN0c0FuZFF1YW50aXR5QmlnZ2VyVGhhblF1YW50aXR5RnJvbVRoZUNhcnQocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGVkSXRlbU1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlSXRlbVRpbWVPdXQoYWRkZWRJdGVtTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zaG93VG9wTWVzc2FnZUZvck1vYmlsZURldmljZShyZW1vdmVJdGVtTWVzc2FnZSwgcmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVycm9yRXhpc3RzQW5kUXVhbnRpdHlCaWdnZXJUaGFuUXVhbnRpdHlGcm9tVGhlQ2FydChyZXNwb25zZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSXRlbU1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlSXRlbVRpbWVPdXQocmVtb3ZlSXRlbU1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBlcnJvckV4aXN0c0FuZFF1YW50aXR5QmlnZ2VyVGhhblF1YW50aXR5RnJvbVRoZUNhcnQocmVzcG9uc2U6IG9iamVjdCkge1xuXG4gICAgICAgIGlmIChyZXNwb25zZS5lcnJvci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtUXVhbnRpdHlGcm9tQ2FydDogbnVtYmVyID0gcmVzcG9uc2UuaXRlbVF1YW50aXR5O1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFF1YW50aXR5OiBudW1iZXIgPSByZXNwb25zZS5xdWFudGl0eTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVhbnRpdHkgPiBpdGVtUXVhbnRpdHlGcm9tQ2FydCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZW1vdmVJdGVtVGltZU91dChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzaG93VG9wTWVzc2FnZUZvck1vYmlsZURldmljZShtZXNzYWdlOiBIVE1MRWxlbWVudCwgcmVzcG9uc2U6IG9iamVjdCkge1xuICAgICAgICBjb25zdCB3aW5kb3dXaWR0aDogbnVtYmVyID0gd2luZG93LnNjcmVlbi53aWR0aDtcblxuICAgICAgICBpZiAod2luZG93V2lkdGggPCA1NzQgJiYgIXRoaXMuZXJyb3JFeGlzdHNBbmRRdWFudGl0eUJpZ2dlclRoYW5RdWFudGl0eUZyb21UaGVDYXJ0KHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgY29uc3QgdG9wTWVzc2FnZTogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+bWVzc2FnZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBib2R5OiBIVE1MQm9keUVsZW1lbnQgPSA8SFRNTEJvZHlFbGVtZW50PmRvY3VtZW50LmJvZHk7XG4gICAgICAgICAgICB0b3BNZXNzYWdlLnN0eWxlLmNzc1RleHQgPSB0aGlzLmNzc01lc3NhZ2UoKTtcblxuICAgICAgICAgICAgY29uc3QgY2hlY2tNYXJrOiBIVE1MRWxlbWVudCA9IHRvcE1lc3NhZ2UucXVlcnlTZWxlY3RvcignLmNoZWNrbWFyaycpO1xuICAgICAgICAgICAgY2hlY2tNYXJrLnN0eWxlLmNzc1RleHQgPSB0aGlzLmNzc0NoZWNrTWFyaygpO1xuXG4gICAgICAgICAgICB0b3BNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgYm9keS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgICAgICBib2R5Lmluc2VydEJlZm9yZSh0b3BNZXNzYWdlLCBib2R5LmZpcnN0RWxlbWVudENoaWxkKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRvcE1lc3NhZ2UucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCAyMDAwKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNob3dDb3VudGVyQW5kSGlkZUFqYXhCdXR0b24obGluazogSFRNTExpbmtFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvdW50ZXIgPSBsaW5rPy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGNvdW50ZXI/LmNsYXNzTGlzdC5hZGQodGhpcy5hamF4Q2FydENvdW50ZXJDbGFzcyk7XG4gICAgICAgIGNvdW50ZXI/LmNsYXNzTGlzdC5yZW1vdmUoSElEREVOX0NMQVNTKTtcbiAgICAgICAgbGluaz8uY2xhc3NMaXN0LmFkZChISURERU5fQ0xBU1MpO1xuICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQmluSWNvbihjb3VudGVyKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWRkT3JSZW1vdmVCaW5JY29uKGVsZW1lbnQpIHtcbiAgICAgICAgbGV0IGRlY3JlYXNlQnV0dG9uRWxlbWVudCA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmFkZFRvQ2FydERlY3JlbWVudGVyKVswXTtcbiAgICAgICAgbGV0IHF1YW50aXR5RWxlbWVudCA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnF1YW50aXR5SW5wdXRGaWVsZClbMF07XG4gICAgICAgIGlmIChxdWFudGl0eUVsZW1lbnQudmFsdWVBc051bWJlciA+IDEgJiYgZGVjcmVhc2VCdXR0b25FbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmFkZEJpbkljb24pKSB7XG4gICAgICAgICAgICBkZWNyZWFzZUJ1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmFkZEJpbkljb24pO1xuICAgICAgICAgICAgZGVjcmVhc2VCdXR0b25FbGVtZW50LmlubmVyVGV4dCA9IFwiLVwiO1xuICAgICAgICB9IGVsc2UgaWYocXVhbnRpdHlFbGVtZW50LnZhbHVlQXNOdW1iZXIgPT09IDEpIHtcbiAgICAgICAgICAgIGRlY3JlYXNlQnV0dG9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuYWRkQmluSWNvbik7XG4gICAgICAgICAgICBkZWNyZWFzZUJ1dHRvbkVsZW1lbnQuaW5uZXJUZXh0ID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBzaG93QWpheEJ1dHRvbkFuZEhpZGVDb3VudGVyKGxpbms6IEhUTUxMaW5rRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb3VudGVyID0gbGluaz8ucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3QgYWRkQWpheEJ1dHRvbiA9IGxpbms/LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKENMQVNTX1BSRUZJWCArIHRoaXMuYWpheEFkZFF1YW50aXR5TGluayk7XG4gICAgICAgIGNvdW50ZXI/LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5hamF4Q2FydENvdW50ZXJDbGFzcyk7XG4gICAgICAgIGNvdW50ZXI/LmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTKTtcbiAgICAgICAgYWRkQWpheEJ1dHRvbj8uY2xhc3NMaXN0LnJlbW92ZShISURERU5fQ0xBU1MpO1xuICAgICAgICBhZGRBamF4QnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGFkZFRvQ2FydExpbmtDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5qc05hbWV9X19saW5rYDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGFkZFRvQ2FydEluY3JlbWVudGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnanMtcXVhbnRpdHktY291bnRlci1wcm9kdWN0X19pbmNyJztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGFkZFRvQ2FydERlY3JlbWVudGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnanMtcXVhbnRpdHktY291bnRlci1wcm9kdWN0X19kZWNyJztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGFqYXhBZGRRdWFudGl0eUxpbmsoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdqcy1hamF4LWFkZC10by1jYXJ0X19saW5rJztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGFqYXhDaGFuZ2VRdWFudGl0eUxpbmsoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdqcy1hamF4LWNoYW5nZS1xdWFudGl0eV9fbGluayc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhamF4Q2FydENvdW50ZXJDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2NoYW5nZS1jYXJ0LWNvdW50ZXInO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgcXVhbnRpdHlJbnB1dEZpZWxkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAndHh0LXByb2R1Y3QtcXVhbnRpdHknO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgYWRkQmluSWNvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2FkZC1iaW4nO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgaXRlbUFkZGVkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnaXRlbS1hZGRlZCc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBpdGVtUmVtb3ZlZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2l0ZW0tcmVtb3ZlZCc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBjYXJ0Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuanNOYW1lfV9fY2FydC1ibG9ja2A7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhbW91bnRDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5qc05hbWV9X19hbW91bnRgO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgcXVhbnRpdHlDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5qc05hbWV9X19xdWFudGl0eWA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBpY29uQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuanNOYW1lfV9faWNvbmA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBmbGFzaE1lc3NhZ2VzQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuanNOYW1lfV9fZmxhc2gtbWVzc2FnZWA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBtZXNzYWdlc1RleHRIb2xkZXJDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5qc05hbWV9X19tZXNzYWdlLXRleHRgO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgbm90aWZpY2F0aW9uQXJlYUNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmpzTmFtZX1fX25vdGlmaWNhdGlvbi1hcmVhYDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3NzTWVzc2FnZSgpOiBzdHJpbmcge1xuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICB3aWR0aDo5MCU7XG4gICAgICAgICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6Y2VudGVyO1xuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgICAgdG9wOiA1cHg7XG4gICAgICAgICAgICBsZWZ0OiA1JTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiM3YjdiN2I7XG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICAgIHotaW5kZXg6IDk5OTtcbiAgICAgICAgYDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3NzQ2hlY2tNYXJrKCk6IHN0cmluZyB7XG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHRvcDogNnB4O1xuICAgICAgICAgICAgbGVmdDoxNXB4O1xuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgICAgICAgICAgaGVpZ2h0OiAyMnB4O1xuICAgICAgICAgICAgd2lkdGg6IDExcHg7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2ZmZjtcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMnB4IHNvbGlkICNmZmY7XG4gICAgICAgIGA7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==