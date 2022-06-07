(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[38],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/popup-ui-shipment-form/popup-ui-shipment-form.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/popup-ui-shipment-form/popup-ui-shipment-form.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PopupUiShipmentForm; });
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




var PopupUiShipmentForm = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_6___default()(PopupUiShipmentForm, _Component);

  var _super = _createSuper(PopupUiShipmentForm);

  function PopupUiShipmentForm() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "$this", jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "linkToTimeSlots", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "linkToTimeSlotsMobile", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "closeModalBtn", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "mainContentContainer", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "slickTrack", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "timeSlotData", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "btnSlickPrevious", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "btnSlickNext", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "daysCounter", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "currentItemForMobile", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "lastOperation", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "pickUpTimes", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "footerMessage", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "locale", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "todayTranslation", void 0);

    return _this;
  }

  var _proto = PopupUiShipmentForm.prototype;

  _proto.readyCallback = function readyCallback() {
    this.linkToTimeSlots = document.getElementById(this.getLinkToTimeSlots);
    this.linkToTimeSlotsMobile = document.getElementById(this.getLinkToTimeSlotsMobile);
    this.closeModalBtn = this.$this.find(this.closeButtonSelector);
    this.mainContentContainer = this.$this.find(this.getMainContentContainer);
    this.currentItemForMobile = 0;
    this.pickUpTimes = document.querySelector('#pickup_times');
    this.footerMessage = document.querySelector('#footer_message');
    this.todayTranslation = document.querySelector('#today_translation');
    this.locale = document.querySelector('#locale');
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    if (this.linkToTimeSlots != null) {
      this.linkToTimeSlots.addEventListener('click', function () {
        _this2.$this.addClass(_this2.name + "--show");

        _this2.sendRequest();
      });
    }

    if (this.linkToTimeSlotsMobile != null) {
      this.linkToTimeSlotsMobile.addEventListener('click', function () {
        jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()(".js-page-layout-main__side-drawer-trigger").click();

        _this2.$this.addClass(_this2.name + "--show");

        _this2.sendRequest();
      });
    }

    this.closeModalBtn.on('click', function () {
      _this2.$this.toggleClass(_this2.showClass);

      _this2.mainContentContainer.empty();
    });
  };

  _proto.triggerPopup = function triggerPopup(event) {
    if (event) {
      event.preventDefault();
    }

    this.$this.toggleClass(this.showClass);
  };

  _proto.sendRequest = /*#__PURE__*/function () {
    var _sendRequest = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var _this3 = this;

      var url;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = "/checkout/time-slots-data";
              fetch(url, {
                method: 'POST'
              }).then(function (response) {
                return response.json();
              }).then(function (parsedResponse) {
                if (parsedResponse != undefined && parsedResponse != []) {
                  _this3.createTimeSlotsContainer(parsedResponse);
                }
              }).catch(function (error) {
                console.error(error);
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function sendRequest() {
      return _sendRequest.apply(this, arguments);
    }

    return sendRequest;
  }();

  _proto.createTimeSlotsContainer = function createTimeSlotsContainer(data) {
    var _this4 = this;

    this.timeSlotData = data;
    var slickCarouselContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()('<div class="grid"><article class="checkout-block checkout-block--shipment checkout-block--border-bottom-less grid col col--sm-12"><div class="col col--sm-12"><div class="popup-ui-shipment-form__container-slick js-slick-carousel__container js-list-switches__item slick-initialized slick-slider"><div class="popup-ui-shipment-form__top-left-title"><span>' + this.pickUpTimes.value + '</span></div><div class="popup-ui-shipment-form__time-slot-buttons"><button id="goToPreviousTimeSlot" class="slick-prev slick-arrow" aria-label="Previous" type="button">Previous</button><button id="goToNextTimeSlot" class="slick-next slick-arrow" aria-label="Next" type="button">Next</button></div><div class="popup-ui-shipment-form--timeslots"><div class="slick-popup-list draggable"><div class="slick-popup-track" style="opacity: 1; transform: translate3d(0px, 0px, 0px);"></div></div></div></div></div></article><div class="time-slot-info-text"><span>' + this.footerMessage.value + '</span></div></div>');
    slickCarouselContainer.appendTo(this.mainContentContainer);
    this.btnSlickPrevious = document.getElementById(this.getSlickPrevious);

    if (this.btnSlickPrevious != null) {
      this.btnSlickPrevious.addEventListener('click', function () {
        _this4.updateTimeSlotData(false);
      });
    }

    this.btnSlickNext = document.getElementById(this.getSlickNext);

    if (this.btnSlickNext != null) {
      this.btnSlickNext.addEventListener('click', function () {
        _this4.updateTimeSlotData(true);
      });
    }

    this.slickTrack = this.$this.find(this.getSlickTrack);
    this.daysCounter = 0;
    this.btnSlickPrevious.setAttribute("disabled", "disabled");
    this.generateTimeSlotsData();
  };

  _proto.updateTimeSlotData = function updateTimeSlotData(increment) {
    this.slickTrack.empty();
    var data = this.timeSlotData;
    var numberOfItems = 3;
    var item = 0;
    var loopIterationsQuantity = 0;

    if (jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()(this).width() < 580) {
      numberOfItems = 1;

      if (this.lastOperation == "decrement") {
        this.currentItemForMobile++;
      }

      item = this.currentItemForMobile;
      loopIterationsQuantity = item + 1;
    } else {
      item = this.daysCounter % 5;
      loopIterationsQuantity = this.daysCounter % 5 + numberOfItems;
    }

    if (increment) {
      this.lastOperation = "increment";
      var numberOfItemsInc = 0;

      for (item; item < loopIterationsQuantity; item++) {
        var dateInc = Object.keys(data)[item];

        if (dateInc != undefined) {
          var dateObj = new Date(dateInc);
          var germanFormatDate = dateObj.toLocaleDateString(this.locale.value);
          var slickSlideDaysContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()('<div class="slick-popup-slide slick-popup-current slick-popup-active col--md-4 col--sm-12" style="float: left;"><div class="spaceBetweenCol"><div class="popup-ui-shipment-form-popup__column spacing-bottom spacing-bottom--biggest" style="width: 100%; display: inline-block;overflow-x: hidden;overflow-y: scroll;height: 400px;"><div class="popup-ui-shipment-form-popup__date">' + this.getDayName(dateInc) + ', ' + germanFormatDate + '</div><div class="slots_' + dateInc + '"></div></div></div></div>');
          slickSlideDaysContainer.appendTo(this.slickTrack);
          var arrayOfTimeSlots = Object.values(data)[item];

          for (var time_slot in arrayOfTimeSlots) {
            var findEl = this.$this.find('.slots_' + dateInc);
            var slickSlideHoursContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()('<div class="popup-ui-shipment-form__slot"><div class="popup-ui-shipment-form-popup__slot-label">' + Object.values(data)[item][time_slot] + '</div></div>');
            slickSlideHoursContainer.appendTo(findEl);
          }

          this.currentItemForMobile++;
          numberOfItemsInc++;
        }
      }

      this.daysCounter += numberOfItemsInc;
    } else {
      this.lastOperation = "decrement";
      var numberOfItemsDec = 0;

      if (item == 1) {
        item = item - 1;
      } else {
        item = item - 2;
      }

      this.currentItemForMobile = item;

      for (item; item < loopIterationsQuantity; item++) {
        var dateDec = Object.keys(data)[item];

        if (dateDec != undefined) {
          var _dateObj = new Date(dateDec);

          var _germanFormatDate = _dateObj.toLocaleDateString(this.locale.value);

          var _slickSlideDaysContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()('<div class="slick-popup-slide slick-popup-current slick-popup-active col--md-4 col--sm-12" style="float: left;"><div class="spaceBetweenCol"><div class="popup-ui-shipment-form-popup__column spacing-bottom spacing-bottom--biggest" style="width: 100%; display: inline-block;overflow-x: hidden;overflow-y: scroll;height: 400px;"><div class="popup-ui-shipment-form-popup__date">' + this.getDayName(dateDec) + ', ' + _germanFormatDate + '</div><div class="slots_' + dateDec + '"></div></div></div></div>');

          _slickSlideDaysContainer.appendTo(this.slickTrack);

          var _arrayOfTimeSlots = Object.values(data)[item];

          for (var _time_slot in _arrayOfTimeSlots) {
            var _findEl = this.$this.find('.slots_' + dateDec);

            var _slickSlideHoursContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()('<div class="popup-ui-shipment-form__slot"><div class="popup-ui-shipment-form-popup__slot-label">' + Object.values(data)[item][_time_slot] + '</div></div>');

            _slickSlideHoursContainer.appendTo(_findEl);
          }

          numberOfItemsDec++;
        }
      }

      this.daysCounter -= numberOfItemsDec;
    }

    if (jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()(this).width() < 580) {
      if (this.currentItemForMobile < 1) {
        this.btnSlickPrevious.setAttribute("disabled", "disabled");
      } else {
        this.btnSlickPrevious.removeAttribute("disabled");
      }

      if (this.currentItemForMobile > 4) {
        this.btnSlickNext.setAttribute("disabled", "disabled");
      } else {
        this.btnSlickNext.removeAttribute("disabled");
      }
    } else {
      if (this.daysCounter < numberOfItems) {
        this.btnSlickPrevious.setAttribute("disabled", "disabled");
      } else {
        this.btnSlickPrevious.removeAttribute("disabled");
      }

      if (this.daysCounter > numberOfItems + 1) {
        this.btnSlickNext.setAttribute("disabled", "disabled");
      } else {
        this.btnSlickNext.removeAttribute("disabled");
      }
    }

    this.checkSize();
  };

  _proto.checkSize = function checkSize() {
    if (jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()(this).width() < 580) {
      var sel = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()(".slick-popup-slide");

      if (sel != null) {
        for (var i = 0; i < sel.length; i++) {
          if (i == 0) {
            jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()('.slick-popup-slide')[i].style.display = "block";
          } else {
            jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()('.slick-popup-slide')[i].style.display = "none";
          }
        }
      }
    }
  };

  _proto.generateTimeSlotsData = function generateTimeSlotsData() {
    this.btnSlickPrevious.setAttribute("disabled", "disabled");
    var data = this.timeSlotData;
    var maxDayCounter = this.daysCounter + 3;

    for (var property in data) {
      if (this.daysCounter < maxDayCounter) {
        this.daysCounter++;
        var dateObj = new Date(property);
        var germanFormatDate = dateObj.toLocaleDateString(this.locale.value);
        var slickSlideDaysContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()('<div class="slick-popup-slide slick-popup-current slick-popup-active col--md-4 col--sm-12" style="float: left;"><div class="spaceBetweenCol"><div class="popup-ui-shipment-form-popup__column spacing-bottom spacing-bottom--biggest" style="width: 100%; display: inline-block;overflow-x: hidden;overflow-y: scroll;height: 400px;"><div class="popup-ui-shipment-form-popup__date">' + this.getDayName(property) + ', ' + germanFormatDate + '</div><div class="slots_' + property + '"></div></div></div></div>');
        slickSlideDaysContainer.appendTo(this.slickTrack);

        for (var time_slot in data[property]) {
          var findEl = this.$this.find('.slots_' + property);
          var slickSlideHoursContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_9___default()('<div class="popup-ui-shipment-form__slot"><div class="popup-ui-shipment-form-popup__slot-label">' + data[property][time_slot] + '</div></div>');
          slickSlideHoursContainer.appendTo(findEl);
        }
      }
    }

    this.currentItemForMobile = 1;
    this.daysCounter = 2;
    this.checkSize();
  };

  _proto.uniqueByDateDay = function uniqueByDateDay(arr) {
    var _this5 = this;

    return arr.reduce(function (a, d) {
      var date = d["date"];

      var day = _this5.getDayName(date);

      if (!a.includes(d["date"])) {
        a.push(date);
      }

      return a;
    }, []);
  };

  _proto.getDayName = function getDayName(dateStr) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    if (today.toISOString() === date.toISOString()) {
      return this.todayTranslation.value;
    }

    return date.toLocaleDateString(this.locale.value, {
      weekday: 'long'
    });
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(PopupUiShipmentForm, [{
    key: "showClass",
    get: function get() {
      return this.name + "--show";
    }
  }, {
    key: "openPopupButton",
    get: function get() {
      return "." + this.jsName + "__open";
    }
  }, {
    key: "submitButtonSelector",
    get: function get() {
      return "." + this.jsName + "__submit";
    }
  }, {
    key: "closeButtonSelector",
    get: function get() {
      return "." + this.name + "__close";
    }
  }, {
    key: "isCloseOnSubmit",
    get: function get() {
      return this.hasAttribute('close-on-submit');
    }
  }, {
    key: "pickedCLass",
    get: function get() {
      return this.name + "--picked";
    }
  }, {
    key: "getMainContentContainer",
    get: function get() {
      return "." + this.name + "__content";
    }
  }, {
    key: "getSlickTrack",
    get: function get() {
      return ".slick-popup-track";
    }
  }, {
    key: "getLinkToTimeSlots",
    get: function get() {
      return "link-to-time-slots";
    }
  }, {
    key: "getLinkToTimeSlotsMobile",
    get: function get() {
      return "link-to-time-slots-mobile";
    }
  }, {
    key: "getSlickPrevious",
    get: function get() {
      return "goToPreviousTimeSlot";
    }
  }, {
    key: "getSlickNext",
    get: function get() {
      return "goToNextTimeSlot";
    }
  }]);

  return PopupUiShipmentForm;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_8__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcG9wdXAtdWktc2hpcG1lbnQtZm9ybS9wb3B1cC11aS1zaGlwbWVudC1mb3JtLnRzIl0sIm5hbWVzIjpbIlBvcHVwVWlTaGlwbWVudEZvcm0iLCIkIiwicmVhZHlDYWxsYmFjayIsImxpbmtUb1RpbWVTbG90cyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRMaW5rVG9UaW1lU2xvdHMiLCJsaW5rVG9UaW1lU2xvdHNNb2JpbGUiLCJnZXRMaW5rVG9UaW1lU2xvdHNNb2JpbGUiLCJjbG9zZU1vZGFsQnRuIiwiJHRoaXMiLCJmaW5kIiwiY2xvc2VCdXR0b25TZWxlY3RvciIsIm1haW5Db250ZW50Q29udGFpbmVyIiwiZ2V0TWFpbkNvbnRlbnRDb250YWluZXIiLCJjdXJyZW50SXRlbUZvck1vYmlsZSIsInBpY2tVcFRpbWVzIiwicXVlcnlTZWxlY3RvciIsImZvb3Rlck1lc3NhZ2UiLCJ0b2RheVRyYW5zbGF0aW9uIiwibG9jYWxlIiwibWFwRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZENsYXNzIiwibmFtZSIsInNlbmRSZXF1ZXN0IiwiY2xpY2siLCJvbiIsInRvZ2dsZUNsYXNzIiwic2hvd0NsYXNzIiwiZW1wdHkiLCJ0cmlnZ2VyUG9wdXAiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidXJsIiwiZmV0Y2giLCJtZXRob2QiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwicGFyc2VkUmVzcG9uc2UiLCJ1bmRlZmluZWQiLCJjcmVhdGVUaW1lU2xvdHNDb250YWluZXIiLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsImRhdGEiLCJ0aW1lU2xvdERhdGEiLCJzbGlja0Nhcm91c2VsQ29udGFpbmVyIiwidmFsdWUiLCJhcHBlbmRUbyIsImJ0blNsaWNrUHJldmlvdXMiLCJnZXRTbGlja1ByZXZpb3VzIiwidXBkYXRlVGltZVNsb3REYXRhIiwiYnRuU2xpY2tOZXh0IiwiZ2V0U2xpY2tOZXh0Iiwic2xpY2tUcmFjayIsImdldFNsaWNrVHJhY2siLCJkYXlzQ291bnRlciIsInNldEF0dHJpYnV0ZSIsImdlbmVyYXRlVGltZVNsb3RzRGF0YSIsImluY3JlbWVudCIsIm51bWJlck9mSXRlbXMiLCJpdGVtIiwibG9vcEl0ZXJhdGlvbnNRdWFudGl0eSIsIndpZHRoIiwibGFzdE9wZXJhdGlvbiIsIm51bWJlck9mSXRlbXNJbmMiLCJkYXRlSW5jIiwiT2JqZWN0Iiwia2V5cyIsImRhdGVPYmoiLCJEYXRlIiwiZ2VybWFuRm9ybWF0RGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsInNsaWNrU2xpZGVEYXlzQ29udGFpbmVyIiwiZ2V0RGF5TmFtZSIsImFycmF5T2ZUaW1lU2xvdHMiLCJ2YWx1ZXMiLCJ0aW1lX3Nsb3QiLCJmaW5kRWwiLCJzbGlja1NsaWRlSG91cnNDb250YWluZXIiLCJudW1iZXJPZkl0ZW1zRGVjIiwiZGF0ZURlYyIsInJlbW92ZUF0dHJpYnV0ZSIsImNoZWNrU2l6ZSIsInNlbCIsImkiLCJsZW5ndGgiLCJzdHlsZSIsImRpc3BsYXkiLCJtYXhEYXlDb3VudGVyIiwicHJvcGVydHkiLCJ1bmlxdWVCeURhdGVEYXkiLCJhcnIiLCJyZWR1Y2UiLCJhIiwiZCIsImRhdGUiLCJkYXkiLCJpbmNsdWRlcyIsInB1c2giLCJkYXRlU3RyIiwidG9kYXkiLCJzZXRIb3VycyIsInRvSVNPU3RyaW5nIiwid2Vla2RheSIsImpzTmFtZSIsImhhc0F0dHJpYnV0ZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztJQUVxQkEsbUI7Ozs7Ozs7Ozs7Ozs7O3NMQUNJQyx5REFBQyxDQUFDLDJGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBa0JiQyxhLEdBQVYseUJBQWdDO0FBQzVCLFNBQUtDLGVBQUws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RCxLQUFLLENBQUNFLFdBQU4sT0FBd0JQLElBQUksQ0FBQ08sV0FBTCxFQUEzQixFQUE4QztBQUMxQyxhQUFPLEtBQUt0RixnQkFBTCxDQUFzQjhCLEtBQTdCO0FBQ0g7O0FBQ0QsV0FBT2lELElBQUksQ0FBQ3hCLGtCQUFMLENBQXdCLEtBQUt0RCxNQUFMLENBQVk2QixLQUFwQyxFQUEyQztBQUFFeUQsYUFBTyxFQUFFO0FBQVgsS0FBM0MsQ0FBUDtBQUNILEc7Ozs7d0JBRXVCO0FBQ3BCLGFBQVUsS0FBS2xGLElBQWY7QUFDSDs7O3dCQUU2QjtBQUMxQixtQkFBVyxLQUFLbUYsTUFBaEI7QUFDSDs7O3dCQUVrQztBQUMvQixtQkFBVyxLQUFLQSxNQUFoQjtBQUNIOzs7d0JBRWlDO0FBQzlCLG1CQUFXLEtBQUtuRixJQUFoQjtBQUNIOzs7d0JBRThCO0FBQzNCLGFBQU8sS0FBS29GLFlBQUwsQ0FBa0IsaUJBQWxCLENBQVA7QUFDSDs7O3dCQUV5QjtBQUN0QixhQUFVLEtBQUtwRixJQUFmO0FBQ0g7Ozt3QkFFcUM7QUFDbEMsbUJBQVcsS0FBS0EsSUFBaEI7QUFDSDs7O3dCQUUyQjtBQUN4QjtBQUNIOzs7d0JBRWdDO0FBQzdCO0FBQ0g7Ozt3QkFFc0M7QUFDbkM7QUFDSDs7O3dCQUU4QjtBQUMzQjtBQUNIOzs7d0JBRTBCO0FBQ3ZCO0FBQ0g7Ozs7RUFyVjRDcUYsK0QiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuMzgubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnkvZGlzdC9qcXVlcnknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFVpU2hpcG1lbnRGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgJHRoaXM6ICQgPSAkKHRoaXMpO1xuICAgIHByb3RlY3RlZCBsaW5rVG9UaW1lU2xvdHM7XG4gICAgcHJvdGVjdGVkIGxpbmtUb1RpbWVTbG90c01vYmlsZTtcbiAgICBwcm90ZWN0ZWQgY2xvc2VNb2RhbEJ0bjtcbiAgICBwcm90ZWN0ZWQgbWFpbkNvbnRlbnRDb250YWluZXI7XG4gICAgcHJvdGVjdGVkIHNsaWNrVHJhY2s7XG4gICAgcHJvdGVjdGVkIHRpbWVTbG90RGF0YTtcbiAgICBwcm90ZWN0ZWQgYnRuU2xpY2tQcmV2aW91cztcbiAgICBwcm90ZWN0ZWQgYnRuU2xpY2tOZXh0O1xuICAgIHByb3RlY3RlZCBkYXlzQ291bnRlcjtcbiAgICBwcm90ZWN0ZWQgY3VycmVudEl0ZW1Gb3JNb2JpbGU7XG4gICAgcHJvdGVjdGVkIGxhc3RPcGVyYXRpb247XG4gICAgcGlja1VwVGltZXM6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgZm9vdGVyTWVzc2FnZTogSFRNTElucHV0RWxlbWVudDtcbiAgICBsb2NhbGU6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdG9kYXlUcmFuc2xhdGlvbjogSFRNTElucHV0RWxlbWVudDtcblxuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGlua1RvVGltZVNsb3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRMaW5rVG9UaW1lU2xvdHMpO1xuICAgICAgICB0aGlzLmxpbmtUb1RpbWVTbG90c01vYmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0TGlua1RvVGltZVNsb3RzTW9iaWxlKTtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsQnRuID0gdGhpcy4kdGhpcy5maW5kKHRoaXMuY2xvc2VCdXR0b25TZWxlY3Rvcik7XG4gICAgICAgIHRoaXMubWFpbkNvbnRlbnRDb250YWluZXIgPSB0aGlzLiR0aGlzLmZpbmQodGhpcy5nZXRNYWluQ29udGVudENvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW1Gb3JNb2JpbGUgPSAwO1xuICAgICAgICB0aGlzLnBpY2tVcFRpbWVzID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BpY2t1cF90aW1lcycpO1xuICAgICAgICB0aGlzLmZvb3Rlck1lc3NhZ2UgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9vdGVyX21lc3NhZ2UnKTtcbiAgICAgICAgdGhpcy50b2RheVRyYW5zbGF0aW9uID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZGF5X3RyYW5zbGF0aW9uJyk7XG4gICAgICAgIHRoaXMubG9jYWxlID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvY2FsZScpO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcblxuICAgICAgICBpZih0aGlzLmxpbmtUb1RpbWVTbG90cyAhPSBudWxsICl7XG4gICAgICAgICAgICB0aGlzLmxpbmtUb1RpbWVTbG90cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiR0aGlzLmFkZENsYXNzKGAke3RoaXMubmFtZX0tLXNob3dgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRSZXF1ZXN0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMubGlua1RvVGltZVNsb3RzTW9iaWxlICE9IG51bGwgKXtcbiAgICAgICAgICAgIHRoaXMubGlua1RvVGltZVNsb3RzTW9iaWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoXCIuanMtcGFnZS1sYXlvdXQtbWFpbl9fc2lkZS1kcmF3ZXItdHJpZ2dlclwiKS5jbGljaygpXG4gICAgICAgICAgICAgICAgdGhpcy4kdGhpcy5hZGRDbGFzcyhgJHt0aGlzLm5hbWV9LS1zaG93YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kUmVxdWVzdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsb3NlTW9kYWxCdG4ub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kdGhpcy50b2dnbGVDbGFzcyh0aGlzLnNob3dDbGFzcyk7XG4gICAgICAgICAgICB0aGlzLm1haW5Db250ZW50Q29udGFpbmVyLmVtcHR5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHRyaWdnZXJQb3B1cChldmVudD86IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJHRoaXMudG9nZ2xlQ2xhc3ModGhpcy5zaG93Q2xhc3MpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBzZW5kUmVxdWVzdCgpOiBQcm9taXNlPHZvaWQ+IHtcblxuICAgICAgICBjb25zdCB1cmwgPSBcIi9jaGVja291dC90aW1lLXNsb3RzLWRhdGFcIjtcblxuICAgICAgICBmZXRjaCh1cmwsIHttZXRob2Q6ICdQT1NUJ30pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihwYXJzZWRSZXNwb25zZSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZihwYXJzZWRSZXNwb25zZSAhPSB1bmRlZmluZWQgJiYgcGFyc2VkUmVzcG9uc2UgIT0gW10pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRpbWVTbG90c0NvbnRhaW5lcihwYXJzZWRSZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRpbWVTbG90c0NvbnRhaW5lcihkYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZVNsb3REYXRhID0gZGF0YTtcblxuICAgICAgICBsZXQgc2xpY2tDYXJvdXNlbENvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJncmlkXCI+PGFydGljbGUgY2xhc3M9XCJjaGVja291dC1ibG9jayBjaGVja291dC1ibG9jay0tc2hpcG1lbnQgY2hlY2tvdXQtYmxvY2stLWJvcmRlci1ib3R0b20tbGVzcyBncmlkIGNvbCBjb2wtLXNtLTEyXCI+PGRpdiBjbGFzcz1cImNvbCBjb2wtLXNtLTEyXCI+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm1fX2NvbnRhaW5lci1zbGljayBqcy1zbGljay1jYXJvdXNlbF9fY29udGFpbmVyIGpzLWxpc3Qtc3dpdGNoZXNfX2l0ZW0gc2xpY2staW5pdGlhbGl6ZWQgc2xpY2stc2xpZGVyXCI+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm1fX3RvcC1sZWZ0LXRpdGxlXCI+PHNwYW4+JyArIHRoaXMucGlja1VwVGltZXMudmFsdWUgKyAnPC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtX190aW1lLXNsb3QtYnV0dG9uc1wiPjxidXR0b24gaWQ9XCJnb1RvUHJldmlvdXNUaW1lU2xvdFwiIGNsYXNzPVwic2xpY2stcHJldiBzbGljay1hcnJvd1wiIGFyaWEtbGFiZWw9XCJQcmV2aW91c1wiIHR5cGU9XCJidXR0b25cIj5QcmV2aW91czwvYnV0dG9uPjxidXR0b24gaWQ9XCJnb1RvTmV4dFRpbWVTbG90XCIgY2xhc3M9XCJzbGljay1uZXh0IHNsaWNrLWFycm93XCIgYXJpYS1sYWJlbD1cIk5leHRcIiB0eXBlPVwiYnV0dG9uXCI+TmV4dDwvYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtLS10aW1lc2xvdHNcIj48ZGl2IGNsYXNzPVwic2xpY2stcG9wdXAtbGlzdCBkcmFnZ2FibGVcIj48ZGl2IGNsYXNzPVwic2xpY2stcG9wdXAtdHJhY2tcIiBzdHlsZT1cIm9wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCI+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PC9hcnRpY2xlPjxkaXYgY2xhc3M9XCJ0aW1lLXNsb3QtaW5mby10ZXh0XCI+PHNwYW4+JyArIHRoaXMuZm9vdGVyTWVzc2FnZS52YWx1ZSArICc8L3NwYW4+PC9kaXY+PC9kaXY+Jyk7XG4gICAgICAgIHNsaWNrQ2Fyb3VzZWxDb250YWluZXIuYXBwZW5kVG8odGhpcy5tYWluQ29udGVudENvbnRhaW5lcik7XG5cbiAgICAgICAgdGhpcy5idG5TbGlja1ByZXZpb3VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRTbGlja1ByZXZpb3VzKTtcbiAgICAgICAgaWYodGhpcy5idG5TbGlja1ByZXZpb3VzICE9IG51bGwgKXtcbiAgICAgICAgICAgIHRoaXMuYnRuU2xpY2tQcmV2aW91cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWVTbG90RGF0YShmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnRuU2xpY2tOZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRTbGlja05leHQpO1xuICAgICAgICBpZih0aGlzLmJ0blNsaWNrTmV4dCAhPSBudWxsICl7XG4gICAgICAgICAgICB0aGlzLmJ0blNsaWNrTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWVTbG90RGF0YSh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zbGlja1RyYWNrID0gdGhpcy4kdGhpcy5maW5kKHRoaXMuZ2V0U2xpY2tUcmFjayk7XG5cbiAgICAgICAgdGhpcy5kYXlzQ291bnRlciA9IDA7XG4gICAgICAgIHRoaXMuYnRuU2xpY2tQcmV2aW91cy5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVUaW1lU2xvdHNEYXRhKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVRpbWVTbG90RGF0YShpbmNyZW1lbnQpe1xuICAgICAgICB0aGlzLnNsaWNrVHJhY2suZW1wdHkoKTtcblxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMudGltZVNsb3REYXRhO1xuICAgICAgICBsZXQgbnVtYmVyT2ZJdGVtcyA9IDM7XG4gICAgICAgIGxldCBpdGVtID0gMDtcbiAgICAgICAgbGV0IGxvb3BJdGVyYXRpb25zUXVhbnRpdHkgPSAwO1xuXG4gICAgICAgIGlmICgkKHRoaXMpLndpZHRoKCkgPCA1ODApIHtcbiAgICAgICAgICAgIG51bWJlck9mSXRlbXMgPSAxO1xuICAgICAgICAgICAgaWYodGhpcy5sYXN0T3BlcmF0aW9uID09IFwiZGVjcmVtZW50XCIpe1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEl0ZW1Gb3JNb2JpbGUrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmN1cnJlbnRJdGVtRm9yTW9iaWxlO1xuICAgICAgICAgICAgbG9vcEl0ZXJhdGlvbnNRdWFudGl0eSA9IGl0ZW0gKyAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5kYXlzQ291bnRlciAlIDU7XG4gICAgICAgICAgICBsb29wSXRlcmF0aW9uc1F1YW50aXR5ID0gKHRoaXMuZGF5c0NvdW50ZXIgJSA1KSArIG51bWJlck9mSXRlbXM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmKGluY3JlbWVudCl7XG4gICAgICAgICAgICB0aGlzLmxhc3RPcGVyYXRpb24gPSBcImluY3JlbWVudFwiO1xuICAgICAgICAgICAgbGV0IG51bWJlck9mSXRlbXNJbmMgPSAwO1xuICAgICAgICAgICAgZm9yKGl0ZW07IGl0ZW0gPCBsb29wSXRlcmF0aW9uc1F1YW50aXR5OyBpdGVtKyspe1xuICAgICAgICAgICAgICAgIGxldCBkYXRlSW5jID0gT2JqZWN0LmtleXMoZGF0YSlbaXRlbV07XG4gICAgICAgICAgICAgICAgaWYoZGF0ZUluYyAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZU9iaiA9IG5ldyBEYXRlKGRhdGVJbmMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZ2VybWFuRm9ybWF0RGF0ZSA9IGRhdGVPYmoudG9Mb2NhbGVEYXRlU3RyaW5nKHRoaXMubG9jYWxlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNsaWNrU2xpZGVEYXlzQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cInNsaWNrLXBvcHVwLXNsaWRlIHNsaWNrLXBvcHVwLWN1cnJlbnQgc2xpY2stcG9wdXAtYWN0aXZlIGNvbC0tbWQtNCBjb2wtLXNtLTEyXCIgc3R5bGU9XCJmbG9hdDogbGVmdDtcIj48ZGl2IGNsYXNzPVwic3BhY2VCZXR3ZWVuQ29sXCI+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm0tcG9wdXBfX2NvbHVtbiBzcGFjaW5nLWJvdHRvbSBzcGFjaW5nLWJvdHRvbS0tYmlnZ2VzdFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IGRpc3BsYXk6IGlubGluZS1ibG9jaztvdmVyZmxvdy14OiBoaWRkZW47b3ZlcmZsb3cteTogc2Nyb2xsO2hlaWdodDogNDAwcHg7XCI+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm0tcG9wdXBfX2RhdGVcIj4nICsgdGhpcy5nZXREYXlOYW1lKGRhdGVJbmMpICsgJywgJyArIGdlcm1hbkZvcm1hdERhdGUgKyAnPC9kaXY+PGRpdiBjbGFzcz1cInNsb3RzXycgKyBkYXRlSW5jICsgJ1wiPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBzbGlja1NsaWRlRGF5c0NvbnRhaW5lci5hcHBlbmRUbyh0aGlzLnNsaWNrVHJhY2spO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnJheU9mVGltZVNsb3RzID0gT2JqZWN0LnZhbHVlcyhkYXRhKVtpdGVtXSBhcyBBcnJheTxzdHJpbmc+O1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdGltZV9zbG90IGluIGFycmF5T2ZUaW1lU2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5kRWwgPSB0aGlzLiR0aGlzLmZpbmQoJy5zbG90c18nICsgZGF0ZUluYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xpY2tTbGlkZUhvdXJzQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm1fX3Nsb3RcIj48ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybS1wb3B1cF9fc2xvdC1sYWJlbFwiPicgKyBPYmplY3QudmFsdWVzKGRhdGEpW2l0ZW1dW3RpbWVfc2xvdF0gKyAnPC9kaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlja1NsaWRlSG91cnNDb250YWluZXIuYXBwZW5kVG8oZmluZEVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEl0ZW1Gb3JNb2JpbGUrKztcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyT2ZJdGVtc0luYysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGF5c0NvdW50ZXIgKz0gbnVtYmVyT2ZJdGVtc0luYztcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5sYXN0T3BlcmF0aW9uID0gXCJkZWNyZW1lbnRcIjtcbiAgICAgICAgICAgIGxldCBudW1iZXJPZkl0ZW1zRGVjID0gMDtcbiAgICAgICAgICAgIGlmKGl0ZW0gPT0gMSl7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0tMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0tMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3VycmVudEl0ZW1Gb3JNb2JpbGUgPSBpdGVtO1xuXG4gICAgICAgICAgICBmb3IoaXRlbTsgaXRlbSA8IGxvb3BJdGVyYXRpb25zUXVhbnRpdHk7IGl0ZW0rKyl7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGVEZWMgPSBPYmplY3Qua2V5cyhkYXRhKVtpdGVtXTtcbiAgICAgICAgICAgICAgICBpZihkYXRlRGVjICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlT2JqID0gbmV3IERhdGUoZGF0ZURlYyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBnZXJtYW5Gb3JtYXREYXRlID0gZGF0ZU9iai50b0xvY2FsZURhdGVTdHJpbmcodGhpcy5sb2NhbGUudmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzbGlja1NsaWRlRGF5c0NvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJzbGljay1wb3B1cC1zbGlkZSBzbGljay1wb3B1cC1jdXJyZW50IHNsaWNrLXBvcHVwLWFjdGl2ZSBjb2wtLW1kLTQgY29sLS1zbS0xMlwiIHN0eWxlPVwiZmxvYXQ6IGxlZnQ7XCI+PGRpdiBjbGFzcz1cInNwYWNlQmV0d2VlbkNvbFwiPjxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtLXBvcHVwX19jb2x1bW4gc3BhY2luZy1ib3R0b20gc3BhY2luZy1ib3R0b20tLWJpZ2dlc3RcIiBzdHlsZT1cIndpZHRoOiAxMDAlOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7b3ZlcmZsb3cteDogaGlkZGVuO292ZXJmbG93LXk6IHNjcm9sbDtoZWlnaHQ6IDQwMHB4O1wiPjxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtLXBvcHVwX19kYXRlXCI+JyArIHRoaXMuZ2V0RGF5TmFtZShkYXRlRGVjKSArICcsICcgKyBnZXJtYW5Gb3JtYXREYXRlICsgJzwvZGl2PjxkaXYgY2xhc3M9XCJzbG90c18nICsgZGF0ZURlYyArICdcIj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgc2xpY2tTbGlkZURheXNDb250YWluZXIuYXBwZW5kVG8odGhpcy5zbGlja1RyYWNrKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXlPZlRpbWVTbG90cyA9IE9iamVjdC52YWx1ZXMoZGF0YSlbaXRlbV0gYXMgQXJyYXk8c3RyaW5nPjtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRpbWVfc2xvdCBpbiBhcnJheU9mVGltZVNsb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZEVsID0gdGhpcy4kdGhpcy5maW5kKCcuc2xvdHNfJyArIGRhdGVEZWMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNsaWNrU2xpZGVIb3Vyc0NvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtX19zbG90XCI+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm0tcG9wdXBfX3Nsb3QtbGFiZWxcIj4nICsgT2JqZWN0LnZhbHVlcyhkYXRhKVtpdGVtXVt0aW1lX3Nsb3RdICsgJzwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2tTbGlkZUhvdXJzQ29udGFpbmVyLmFwcGVuZFRvKGZpbmRFbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBudW1iZXJPZkl0ZW1zRGVjKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kYXlzQ291bnRlciAtPSBudW1iZXJPZkl0ZW1zRGVjO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoJCh0aGlzKS53aWR0aCgpIDwgNTgwKXtcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudEl0ZW1Gb3JNb2JpbGUgPCAxKXtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNsaWNrUHJldmlvdXMuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idG5TbGlja1ByZXZpb3VzLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmN1cnJlbnRJdGVtRm9yTW9iaWxlID4gNCl7XG4gICAgICAgICAgICAgICAgdGhpcy5idG5TbGlja05leHQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idG5TbGlja05leHQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGlmKHRoaXMuZGF5c0NvdW50ZXIgPCBudW1iZXJPZkl0ZW1zKXtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNsaWNrUHJldmlvdXMuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idG5TbGlja1ByZXZpb3VzLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmRheXNDb3VudGVyID4gKG51bWJlck9mSXRlbXMgKyAxKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5idG5TbGlja05leHQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idG5TbGlja05leHQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuY2hlY2tTaXplKCk7XG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2hlY2tTaXplKCk6IHZvaWQge1xuICAgICAgICBpZiAoJCh0aGlzKS53aWR0aCgpIDwgNTgwKSB7XG5cbiAgICAgICAgICAgIGxldCBzZWwgPSAkKFwiLnNsaWNrLXBvcHVwLXNsaWRlXCIpO1xuXG4gICAgICAgICAgICBpZihzZWwgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxzZWwubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc2xpY2stcG9wdXAtc2xpZGUnKVtpXS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuc2xpY2stcG9wdXAtc2xpZGUnKVtpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZW5lcmF0ZVRpbWVTbG90c0RhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYnRuU2xpY2tQcmV2aW91cy5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG5cbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnRpbWVTbG90RGF0YTtcbiAgICAgICAgbGV0IG1heERheUNvdW50ZXIgPSB0aGlzLmRheXNDb3VudGVyICsgMztcbiAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZih0aGlzLmRheXNDb3VudGVyIDwgbWF4RGF5Q291bnRlcil7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXlzQ291bnRlcisrO1xuXG4gICAgICAgICAgICAgICAgbGV0IGRhdGVPYmogPSBuZXcgRGF0ZShwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgbGV0IGdlcm1hbkZvcm1hdERhdGUgPSBkYXRlT2JqLnRvTG9jYWxlRGF0ZVN0cmluZyh0aGlzLmxvY2FsZS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2xpY2tTbGlkZURheXNDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwic2xpY2stcG9wdXAtc2xpZGUgc2xpY2stcG9wdXAtY3VycmVudCBzbGljay1wb3B1cC1hY3RpdmUgY29sLS1tZC00IGNvbC0tc20tMTJcIiBzdHlsZT1cImZsb2F0OiBsZWZ0O1wiPjxkaXYgY2xhc3M9XCJzcGFjZUJldHdlZW5Db2xcIj48ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybS1wb3B1cF9fY29sdW1uIHNwYWNpbmctYm90dG9tIHNwYWNpbmctYm90dG9tLS1iaWdnZXN0XCIgc3R5bGU9XCJ3aWR0aDogMTAwJTsgZGlzcGxheTogaW5saW5lLWJsb2NrO292ZXJmbG93LXg6IGhpZGRlbjtvdmVyZmxvdy15OiBzY3JvbGw7aGVpZ2h0OiA0MDBweDtcIj48ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybS1wb3B1cF9fZGF0ZVwiPicgKyB0aGlzLmdldERheU5hbWUocHJvcGVydHkpICsgJywgJyArIGdlcm1hbkZvcm1hdERhdGUgKyAnPC9kaXY+PGRpdiBjbGFzcz1cInNsb3RzXycgKyBwcm9wZXJ0eSArICdcIj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICBzbGlja1NsaWRlRGF5c0NvbnRhaW5lci5hcHBlbmRUbyh0aGlzLnNsaWNrVHJhY2spO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB0aW1lX3Nsb3QgaW4gZGF0YVtwcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmRFbCA9IHRoaXMuJHRoaXMuZmluZCgnLnNsb3RzXycgKyBwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzbGlja1NsaWRlSG91cnNDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybV9fc2xvdFwiPjxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtLXBvcHVwX19zbG90LWxhYmVsXCI+JyArIGRhdGFbcHJvcGVydHldW3RpbWVfc2xvdF0gKyAnPC9kaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgIHNsaWNrU2xpZGVIb3Vyc0NvbnRhaW5lci5hcHBlbmRUbyhmaW5kRWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRJdGVtRm9yTW9iaWxlID0gMTtcbiAgICAgICAgdGhpcy5kYXlzQ291bnRlciA9IDI7XG4gICAgICAgIHRoaXMuY2hlY2tTaXplKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVuaXF1ZUJ5RGF0ZURheShhcnIpe1xuICAgICAgICByZXR1cm4gYXJyLnJlZHVjZSgoYSwgZCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGUgPSBkW1wiZGF0ZVwiXTtcbiAgICAgICAgICAgIGxldCBkYXkgPSB0aGlzLmdldERheU5hbWUoZGF0ZSlcbiAgICAgICAgICAgIGlmICghYS5pbmNsdWRlcyhkW1wiZGF0ZVwiXSkpIHsgYS5wdXNoKGRhdGUpOyB9XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXREYXlOYW1lKGRhdGVTdHIpXG4gICAge1xuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0b2RheS5zZXRIb3VycygwLDAsMCwwKTtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyKTtcbiAgICAgICAgZGF0ZS5zZXRIb3VycygwLDAsMCwwKTtcbiAgICAgICAgaWYodG9kYXkudG9JU09TdHJpbmcoKSA9PT0gZGF0ZS50b0lTT1N0cmluZygpKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvZGF5VHJhbnNsYXRpb24udmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKHRoaXMubG9jYWxlLnZhbHVlLCB7IHdlZWtkYXk6ICdsb25nJyB9KTtcbiAgICB9XG5cbiAgICBnZXQgc2hvd0NsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9LS1zaG93YDtcbiAgICB9XG5cbiAgICBnZXQgb3BlblBvcHVwQnV0dG9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgLiR7dGhpcy5qc05hbWV9X19vcGVuYDtcbiAgICB9XG5cbiAgICBnZXQgc3VibWl0QnV0dG9uU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAuJHt0aGlzLmpzTmFtZX1fX3N1Ym1pdGA7XG4gICAgfVxuXG4gICAgZ2V0IGNsb3NlQnV0dG9uU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAuJHt0aGlzLm5hbWV9X19jbG9zZWA7XG4gICAgfVxuXG4gICAgZ2V0IGlzQ2xvc2VPblN1Ym1pdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdjbG9zZS1vbi1zdWJtaXQnKTtcbiAgICB9XG5cbiAgICBnZXQgcGlja2VkQ0xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0tLXBpY2tlZGA7XG4gICAgfVxuXG4gICAgZ2V0IGdldE1haW5Db250ZW50Q29udGFpbmVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgLiR7dGhpcy5uYW1lfV9fY29udGVudGA7XG4gICAgfVxuXG4gICAgZ2V0IGdldFNsaWNrVHJhY2soKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAuc2xpY2stcG9wdXAtdHJhY2tgO1xuICAgIH1cblxuICAgIGdldCBnZXRMaW5rVG9UaW1lU2xvdHMoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBsaW5rLXRvLXRpbWUtc2xvdHNgO1xuICAgIH1cblxuICAgIGdldCBnZXRMaW5rVG9UaW1lU2xvdHNNb2JpbGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBsaW5rLXRvLXRpbWUtc2xvdHMtbW9iaWxlYDtcbiAgICB9XG5cbiAgICBnZXQgZ2V0U2xpY2tQcmV2aW91cygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYGdvVG9QcmV2aW91c1RpbWVTbG90YDtcbiAgICB9XG5cbiAgICBnZXQgZ2V0U2xpY2tOZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgZ29Ub05leHRUaW1lU2xvdGA7XG4gICAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6IiJ9