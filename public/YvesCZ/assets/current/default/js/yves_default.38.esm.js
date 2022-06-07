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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class PopupUiShipmentForm extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "$this", jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this));

    _defineProperty(this, "linkToTimeSlots", void 0);

    _defineProperty(this, "linkToTimeSlotsMobile", void 0);

    _defineProperty(this, "closeModalBtn", void 0);

    _defineProperty(this, "mainContentContainer", void 0);

    _defineProperty(this, "slickTrack", void 0);

    _defineProperty(this, "timeSlotData", void 0);

    _defineProperty(this, "btnSlickPrevious", void 0);

    _defineProperty(this, "btnSlickNext", void 0);

    _defineProperty(this, "daysCounter", void 0);

    _defineProperty(this, "currentItemForMobile", void 0);

    _defineProperty(this, "lastOperation", void 0);

    _defineProperty(this, "pickUpTimes", void 0);

    _defineProperty(this, "footerMessage", void 0);

    _defineProperty(this, "locale", void 0);

    _defineProperty(this, "todayTranslation", void 0);

    _defineProperty(this, "codeBucket", void 0);
  }

  readyCallback() {
    this.linkToTimeSlots = document.getElementById(this.getLinkToTimeSlots);
    this.linkToTimeSlotsMobile = document.getElementById(this.getLinkToTimeSlotsMobile);
    this.closeModalBtn = this.$this.find(this.closeButtonSelector);
    this.mainContentContainer = this.$this.find(this.getMainContentContainer);
    this.currentItemForMobile = 0;
    this.pickUpTimes = document.querySelector('#pickup_times');
    this.footerMessage = document.querySelector('#footer_message');
    this.todayTranslation = document.querySelector('#today_translation');
    this.locale = document.querySelector('#locale');
    this.codeBucket = document.querySelector(this.getCodeBucket);
    this.mapEvents();
  }

  mapEvents() {
    if (this.linkToTimeSlots != null) {
      this.linkToTimeSlots.addEventListener('click', () => {
        this.$this.addClass(this.name + "--show");
        this.sendRequest();
      });
    }

    if (this.linkToTimeSlotsMobile != null) {
      this.linkToTimeSlotsMobile.addEventListener('click', () => {
        jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(".js-page-layout-main__side-drawer-trigger").click();
        this.$this.addClass(this.name + "--show");
        this.sendRequest();
      });
    }

    this.closeModalBtn.on('click', () => {
      this.$this.toggleClass(this.showClass);
      this.mainContentContainer.empty();
    });
  }

  triggerPopup(event) {
    if (event) {
      event.preventDefault();
    }

    this.$this.toggleClass(this.showClass);
  }

  sendRequest() {
    var _this = this;

    return _asyncToGenerator(function* () {
      var url = "/checkout/time-slots-data";
      fetch(url, {
        method: 'POST'
      }).then(response => response.json()).then(parsedResponse => {
        if (parsedResponse != undefined && parsedResponse != []) {
          _this.createTimeSlotsContainer(parsedResponse);
        }
      }).catch(error => {
        console.error(error);
      });
    })();
  }

  createTimeSlotsContainer(data) {
    this.timeSlotData = data;
    var slickCarouselContainer;

    if (this.codeBucket.value === "DE") {
      slickCarouselContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div class="grid"><article class="checkout-block checkout-block--shipment checkout-block--border-bottom-less grid col col--sm-12"><div class="col col--sm-12"><div class="popup-ui-shipment-form__container-slick js-slick-carousel__container js-list-switches__item slick-initialized slick-slider"><div class="popup-ui-shipment-form__top-left-title"><span>' + this.pickUpTimes.value + '</span></div><div class="popup-ui-shipment-form__time-slot-buttons"><button id="goToPreviousTimeSlot" class="slick-prev slick-arrow" aria-label="Previous" type="button">Previous</button><button id="goToNextTimeSlot" class="slick-next slick-arrow" aria-label="Next" type="button">Next</button></div><div class="popup-ui-shipment-form--timeslots"><div class="slick-popup-list draggable"><div class="slick-popup-track" style="opacity: 1; transform: translate3d(0px, 0px, 0px);"></div></div></div></div></div></article><div class="time-slot-info-text"><span>' + this.footerMessage.value + '</span></div></div>');
    } else {
      slickCarouselContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div class="grid"><article class="checkout-block checkout-block--shipment checkout-block--border-bottom-less grid col col--sm-12 font-cz"><div class="col col--sm-12"><div class="popup-ui-shipment-form__container-slick js-slick-carousel__container js-list-switches__item slick-initialized slick-slider"><div class="popup-ui-shipment-form__top-left-title"><span>' + this.pickUpTimes.value + '</span></div><div class="popup-ui-shipment-form__time-slot-buttons"><button id="goToPreviousTimeSlot" class="slick-prev slick-arrow-cz" aria-label="Previous" type="button">Previous</button><button id="goToNextTimeSlot" class="slick-next slick-arrow-cz" aria-label="Next" type="button">Next</button></div><div class="popup-ui-shipment-form--timeslots-cz"><div class="slick-popup-list draggable"><div class="slick-popup-track" style="opacity: 1; transform: translate3d(0px, 0px, 0px);"></div></div></div></div></div></article><div class="time-slot-info-text"><span>' + this.footerMessage.value + '</span></div></div>');
    }

    slickCarouselContainer.appendTo(this.mainContentContainer);
    this.btnSlickPrevious = document.getElementById(this.getSlickPrevious);

    if (this.btnSlickPrevious != null) {
      this.btnSlickPrevious.addEventListener('click', () => {
        this.updateTimeSlotData(false);
      });
    }

    this.btnSlickNext = document.getElementById(this.getSlickNext);

    if (this.btnSlickNext != null) {
      this.btnSlickNext.addEventListener('click', () => {
        this.updateTimeSlotData(true);
      });
    }

    this.slickTrack = this.$this.find(this.getSlickTrack);
    this.daysCounter = 0;
    this.btnSlickPrevious.setAttribute("disabled", "disabled");
    this.generateTimeSlotsData();
  }

  updateTimeSlotData(increment) {
    this.slickTrack.empty();
    var data = this.timeSlotData;
    var numberOfItems = 3;
    var item = 0;
    var loopIterationsQuantity = 0;

    if (jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).width() < 580) {
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
          var slickSlideDaysContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div class="slick-popup-slide slick-popup-current slick-popup-active col--md-4 col--sm-12" style="float: left;"><div class="spaceBetweenCol"><div class="popup-ui-shipment-form-popup__column spacing-bottom spacing-bottom--biggest" style="width: 100%; display: inline-block;overflow-x: hidden;overflow-y: scroll;height: 400px;"><div class="popup-ui-shipment-form-popup__date">' + this.getDayName(dateInc) + ', ' + germanFormatDate + '</div><div class="slots_' + dateInc + '"></div></div></div></div>');
          slickSlideDaysContainer.appendTo(this.slickTrack);
          var arrayOfTimeSlots = Object.values(data)[item];

          for (var time_slot in arrayOfTimeSlots) {
            var findEl = this.$this.find('.slots_' + dateInc);
            var slickSlideHoursContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div class="popup-ui-shipment-form__slot"><div class="popup-ui-shipment-form-popup__slot-label">' + Object.values(data)[item][time_slot] + '</div></div>');
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

          var _slickSlideDaysContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div class="slick-popup-slide slick-popup-current slick-popup-active col--md-4 col--sm-12" style="float: left;"><div class="spaceBetweenCol"><div class="popup-ui-shipment-form-popup__column spacing-bottom spacing-bottom--biggest" style="width: 100%; display: inline-block;overflow-x: hidden;overflow-y: scroll;height: 400px;"><div class="popup-ui-shipment-form-popup__date">' + this.getDayName(dateDec) + ', ' + _germanFormatDate + '</div><div class="slots_' + dateDec + '"></div></div></div></div>');

          _slickSlideDaysContainer.appendTo(this.slickTrack);

          var _arrayOfTimeSlots = Object.values(data)[item];

          for (var _time_slot in _arrayOfTimeSlots) {
            var _findEl = this.$this.find('.slots_' + dateDec);

            var _slickSlideHoursContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div class="popup-ui-shipment-form__slot"><div class="popup-ui-shipment-form-popup__slot-label">' + Object.values(data)[item][_time_slot] + '</div></div>');

            _slickSlideHoursContainer.appendTo(_findEl);
          }

          numberOfItemsDec++;
        }
      }

      this.daysCounter -= numberOfItemsDec;
    }

    if (jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).width() < 580) {
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
  }

  checkSize() {
    if (jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).width() < 580) {
      var sel = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(".slick-popup-slide");

      if (sel != null) {
        for (var i = 0; i < sel.length; i++) {
          if (i == 0) {
            jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()('.slick-popup-slide')[i].style.display = "block";
          } else {
            jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()('.slick-popup-slide')[i].style.display = "none";
          }
        }
      }
    }
  }

  generateTimeSlotsData() {
    this.btnSlickPrevious.setAttribute("disabled", "disabled");
    var data = this.timeSlotData;
    var maxDayCounter = this.daysCounter + 3;

    for (var property in data) {
      if (this.daysCounter < maxDayCounter) {
        this.daysCounter++;
        var dateObj = new Date(property);
        var germanFormatDate = dateObj.toLocaleDateString(this.locale.value);
        var slickSlideDaysContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div class="slick-popup-slide slick-popup-current slick-popup-active col--md-4 col--sm-12" style="float: left;"><div class="spaceBetweenCol"><div class="popup-ui-shipment-form-popup__column spacing-bottom spacing-bottom--biggest" style="width: 100%; display: inline-block;overflow-x: hidden;overflow-y: scroll;height: 400px;"><div class="popup-ui-shipment-form-popup__date">' + this.getDayName(property) + ', ' + germanFormatDate + '</div><div class="slots_' + property + '"></div></div></div></div>');
        slickSlideDaysContainer.appendTo(this.slickTrack);

        for (var time_slot in data[property]) {
          var findEl = this.$this.find('.slots_' + property);
          var slickSlideHoursContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div class="popup-ui-shipment-form__slot"><div class="popup-ui-shipment-form-popup__slot-label">' + data[property][time_slot] + '</div></div>');
          slickSlideHoursContainer.appendTo(findEl);
        }
      }
    }

    this.currentItemForMobile = 1;
    this.daysCounter = 2;
    this.checkSize();
  }

  uniqueByDateDay(arr) {
    return arr.reduce((a, d) => {
      var date = d["date"];
      var day = this.getDayName(date);

      if (!a.includes(d["date"])) {
        a.push(date);
      }

      return a;
    }, []);
  }

  getDayName(dateStr) {
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
  }

  get showClass() {
    return this.name + "--show";
  }

  get openPopupButton() {
    return "." + this.jsName + "__open";
  }

  get submitButtonSelector() {
    return "." + this.jsName + "__submit";
  }

  get closeButtonSelector() {
    return "." + this.name + "__close";
  }

  get isCloseOnSubmit() {
    return this.hasAttribute('close-on-submit');
  }

  get pickedCLass() {
    return this.name + "--picked";
  }

  get getMainContentContainer() {
    return "." + this.name + "__content";
  }

  get getSlickTrack() {
    return ".slick-popup-track";
  }

  get getLinkToTimeSlots() {
    return "link-to-time-slots";
  }

  get getLinkToTimeSlotsMobile() {
    return "link-to-time-slots-mobile";
  }

  get getSlickPrevious() {
    return "goToPreviousTimeSlot";
  }

  get getSlickNext() {
    return "goToNextTimeSlot";
  }

  get getCodeBucket() {
    return "input[name=header-codebucket]";
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcG9wdXAtdWktc2hpcG1lbnQtZm9ybS9wb3B1cC11aS1zaGlwbWVudC1mb3JtLnRzIl0sIm5hbWVzIjpbIlBvcHVwVWlTaGlwbWVudEZvcm0iLCJDb21wb25lbnQiLCIkIiwicmVhZHlDYWxsYmFjayIsImxpbmtUb1RpbWVTbG90cyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRMaW5rVG9UaW1lU2xvdHMiLCJsaW5rVG9UaW1lU2xvdHNNb2JpbGUiLCJnZXRMaW5rVG9UaW1lU2xvdHNNb2JpbGUiLCJjbG9zZU1vZGFsQnRuIiwiJHRoaXMiLCJmaW5kIiwiY2xvc2VCdXR0b25TZWxlY3RvciIsIm1haW5Db250ZW50Q29udGFpbmVyIiwiZ2V0TWFpbkNvbnRlbnRDb250YWluZXIiLCJjdXJyZW50SXRlbUZvck1vYmlsZSIsInBpY2tVcFRpbWVzIiwicXVlcnlTZWxlY3RvciIsImZvb3Rlck1lc3NhZ2UiLCJ0b2RheVRyYW5zbGF0aW9uIiwibG9jYWxlIiwiY29kZUJ1Y2tldCIsImdldENvZGVCdWNrZXQiLCJtYXBFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwiYWRkQ2xhc3MiLCJuYW1lIiwic2VuZFJlcXVlc3QiLCJjbGljayIsIm9uIiwidG9nZ2xlQ2xhc3MiLCJzaG93Q2xhc3MiLCJlbXB0eSIsInRyaWdnZXJQb3B1cCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ1cmwiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJwYXJzZWRSZXNwb25zZSIsInVuZGVmaW5lZCIsImNyZWF0ZVRpbWVTbG90c0NvbnRhaW5lciIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwiZGF0YSIsInRpbWVTbG90RGF0YSIsInNsaWNrQ2Fyb3VzZWxDb250YWluZXIiLCJ2YWx1ZSIsImFwcGVuZFRvIiwiYnRuU2xpY2tQcmV2aW91cyIsImdldFNsaWNrUHJldmlvdXMiLCJ1cGRhdGVUaW1lU2xvdERhdGEiLCJidG5TbGlja05leHQiLCJnZXRTbGlja05leHQiLCJzbGlja1RyYWNrIiwiZ2V0U2xpY2tUcmFjayIsImRheXNDb3VudGVyIiwic2V0QXR0cmlidXRlIiwiZ2VuZXJhdGVUaW1lU2xvdHNEYXRhIiwiaW5jcmVtZW50IiwibnVtYmVyT2ZJdGVtcyIsIml0ZW0iLCJsb29wSXRlcmF0aW9uc1F1YW50aXR5Iiwid2lkdGgiLCJsYXN0T3BlcmF0aW9uIiwibnVtYmVyT2ZJdGVtc0luYyIsImRhdGVJbmMiLCJPYmplY3QiLCJrZXlzIiwiZGF0ZU9iaiIsIkRhdGUiLCJnZXJtYW5Gb3JtYXREYXRlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwic2xpY2tTbGlkZURheXNDb250YWluZXIiLCJnZXREYXlOYW1lIiwiYXJyYXlPZlRpbWVTbG90cyIsInZhbHVlcyIsInRpbWVfc2xvdCIsImZpbmRFbCIsInNsaWNrU2xpZGVIb3Vyc0NvbnRhaW5lciIsIm51bWJlck9mSXRlbXNEZWMiLCJkYXRlRGVjIiwicmVtb3ZlQXR0cmlidXRlIiwiY2hlY2tTaXplIiwic2VsIiwiaSIsImxlbmd0aCIsInN0eWxlIiwiZGlzcGxheSIsIm1heERheUNvdW50ZXIiLCJwcm9wZXJ0eSIsInVuaXF1ZUJ5RGF0ZURheSIsImFyciIsInJlZHVjZSIsImEiLCJkIiwiZGF0ZSIsImRheSIsImluY2x1ZGVzIiwicHVzaCIsImRhdGVTdHIiLCJ0b2RheSIsInNldEhvdXJzIiwidG9JU09TdHJpbmciLCJ3ZWVrZGF5Iiwib3BlblBvcHVwQnV0dG9uIiwianNOYW1lIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJpc0Nsb3NlT25TdWJtaXQiLCJoYXNBdHRyaWJ1dGUiLCJwaWNrZWRDTGFzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVlLE1BQU1BLG1CQUFOLFNBQWtDQywrREFBbEMsQ0FBNEM7QUFB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SixHQUFpQztBQUM3QjtBQUNIOztBQUVELE1BQUlFLHdCQUFKLEdBQXVDO0FBQ25DO0FBQ0g7O0FBRUQsTUFBSThDLGdCQUFKLEdBQStCO0FBQzNCO0FBQ0g7O0FBRUQsTUFBSUcsWUFBSixHQUEyQjtBQUN2QjtBQUNIOztBQUdELE1BQUluQyxhQUFKLEdBQTRCO0FBQ3hCLFdBQU8sK0JBQVA7QUFDSDs7QUFoV3NELEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuMzguZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnkvZGlzdC9qcXVlcnknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFVpU2hpcG1lbnRGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgJHRoaXM6ICQgPSAkKHRoaXMpO1xuICAgIHByb3RlY3RlZCBsaW5rVG9UaW1lU2xvdHM7XG4gICAgcHJvdGVjdGVkIGxpbmtUb1RpbWVTbG90c01vYmlsZTtcbiAgICBwcm90ZWN0ZWQgY2xvc2VNb2RhbEJ0bjtcbiAgICBwcm90ZWN0ZWQgbWFpbkNvbnRlbnRDb250YWluZXI7XG4gICAgcHJvdGVjdGVkIHNsaWNrVHJhY2s7XG4gICAgcHJvdGVjdGVkIHRpbWVTbG90RGF0YTtcbiAgICBwcm90ZWN0ZWQgYnRuU2xpY2tQcmV2aW91cztcbiAgICBwcm90ZWN0ZWQgYnRuU2xpY2tOZXh0O1xuICAgIHByb3RlY3RlZCBkYXlzQ291bnRlcjtcbiAgICBwcm90ZWN0ZWQgY3VycmVudEl0ZW1Gb3JNb2JpbGU7XG4gICAgcHJvdGVjdGVkIGxhc3RPcGVyYXRpb247XG4gICAgcGlja1VwVGltZXM6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgZm9vdGVyTWVzc2FnZTogSFRNTElucHV0RWxlbWVudDtcbiAgICBsb2NhbGU6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdG9kYXlUcmFuc2xhdGlvbjogSFRNTElucHV0RWxlbWVudDtcbiAgICBjb2RlQnVja2V0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5rVG9UaW1lU2xvdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldExpbmtUb1RpbWVTbG90cyk7XG4gICAgICAgIHRoaXMubGlua1RvVGltZVNsb3RzTW9iaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRMaW5rVG9UaW1lU2xvdHNNb2JpbGUpO1xuICAgICAgICB0aGlzLmNsb3NlTW9kYWxCdG4gPSB0aGlzLiR0aGlzLmZpbmQodGhpcy5jbG9zZUJ1dHRvblNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5tYWluQ29udGVudENvbnRhaW5lciA9IHRoaXMuJHRoaXMuZmluZCh0aGlzLmdldE1haW5Db250ZW50Q29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbUZvck1vYmlsZSA9IDA7XG4gICAgICAgIHRoaXMucGlja1VwVGltZXMgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGlja3VwX3RpbWVzJyk7XG4gICAgICAgIHRoaXMuZm9vdGVyTWVzc2FnZSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb290ZXJfbWVzc2FnZScpO1xuICAgICAgICB0aGlzLnRvZGF5VHJhbnNsYXRpb24gPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kYXlfdHJhbnNsYXRpb24nKTtcbiAgICAgICAgdGhpcy5sb2NhbGUgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9jYWxlJyk7XG4gICAgICAgIHRoaXMuY29kZUJ1Y2tldCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5nZXRDb2RlQnVja2V0KVxuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcblxuICAgICAgICBpZih0aGlzLmxpbmtUb1RpbWVTbG90cyAhPSBudWxsICl7XG4gICAgICAgICAgICB0aGlzLmxpbmtUb1RpbWVTbG90cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiR0aGlzLmFkZENsYXNzKGAke3RoaXMubmFtZX0tLXNob3dgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRSZXF1ZXN0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMubGlua1RvVGltZVNsb3RzTW9iaWxlICE9IG51bGwgKXtcbiAgICAgICAgICAgIHRoaXMubGlua1RvVGltZVNsb3RzTW9iaWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoXCIuanMtcGFnZS1sYXlvdXQtbWFpbl9fc2lkZS1kcmF3ZXItdHJpZ2dlclwiKS5jbGljaygpXG4gICAgICAgICAgICAgICAgdGhpcy4kdGhpcy5hZGRDbGFzcyhgJHt0aGlzLm5hbWV9LS1zaG93YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kUmVxdWVzdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsb3NlTW9kYWxCdG4ub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kdGhpcy50b2dnbGVDbGFzcyh0aGlzLnNob3dDbGFzcyk7XG4gICAgICAgICAgICB0aGlzLm1haW5Db250ZW50Q29udGFpbmVyLmVtcHR5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHRyaWdnZXJQb3B1cChldmVudD86IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJHRoaXMudG9nZ2xlQ2xhc3ModGhpcy5zaG93Q2xhc3MpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBzZW5kUmVxdWVzdCgpOiBQcm9taXNlPHZvaWQ+IHtcblxuICAgICAgICBjb25zdCB1cmwgPSBcIi9jaGVja291dC90aW1lLXNsb3RzLWRhdGFcIjtcblxuICAgICAgICBmZXRjaCh1cmwsIHttZXRob2Q6ICdQT1NUJ30pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihwYXJzZWRSZXNwb25zZSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZihwYXJzZWRSZXNwb25zZSAhPSB1bmRlZmluZWQgJiYgcGFyc2VkUmVzcG9uc2UgIT0gW10pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRpbWVTbG90c0NvbnRhaW5lcihwYXJzZWRSZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRpbWVTbG90c0NvbnRhaW5lcihkYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGltZVNsb3REYXRhID0gZGF0YTtcbiAgICAgICAgbGV0IHNsaWNrQ2Fyb3VzZWxDb250YWluZXI7XG4gICAgICAgIGlmKHRoaXMuY29kZUJ1Y2tldC52YWx1ZSA9PT0gXCJERVwiKSB7XG4gICAgICAgICAgICBzbGlja0Nhcm91c2VsQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cImdyaWRcIj48YXJ0aWNsZSBjbGFzcz1cImNoZWNrb3V0LWJsb2NrIGNoZWNrb3V0LWJsb2NrLS1zaGlwbWVudCBjaGVja291dC1ibG9jay0tYm9yZGVyLWJvdHRvbS1sZXNzIGdyaWQgY29sIGNvbC0tc20tMTJcIj48ZGl2IGNsYXNzPVwiY29sIGNvbC0tc20tMTJcIj48ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybV9fY29udGFpbmVyLXNsaWNrIGpzLXNsaWNrLWNhcm91c2VsX19jb250YWluZXIganMtbGlzdC1zd2l0Y2hlc19faXRlbSBzbGljay1pbml0aWFsaXplZCBzbGljay1zbGlkZXJcIj48ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybV9fdG9wLWxlZnQtdGl0bGVcIj48c3Bhbj4nICsgdGhpcy5waWNrVXBUaW1lcy52YWx1ZSArICc8L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm1fX3RpbWUtc2xvdC1idXR0b25zXCI+PGJ1dHRvbiBpZD1cImdvVG9QcmV2aW91c1RpbWVTbG90XCIgY2xhc3M9XCJzbGljay1wcmV2IHNsaWNrLWFycm93XCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzXCIgdHlwZT1cImJ1dHRvblwiPlByZXZpb3VzPC9idXR0b24+PGJ1dHRvbiBpZD1cImdvVG9OZXh0VGltZVNsb3RcIiBjbGFzcz1cInNsaWNrLW5leHQgc2xpY2stYXJyb3dcIiBhcmlhLWxhYmVsPVwiTmV4dFwiIHR5cGU9XCJidXR0b25cIj5OZXh0PC9idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm0tLXRpbWVzbG90c1wiPjxkaXYgY2xhc3M9XCJzbGljay1wb3B1cC1saXN0IGRyYWdnYWJsZVwiPjxkaXYgY2xhc3M9XCJzbGljay1wb3B1cC10cmFja1wiIHN0eWxlPVwib3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcIj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2FydGljbGU+PGRpdiBjbGFzcz1cInRpbWUtc2xvdC1pbmZvLXRleHRcIj48c3Bhbj4nICsgdGhpcy5mb290ZXJNZXNzYWdlLnZhbHVlICsgJzwvc3Bhbj48L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWNrQ2Fyb3VzZWxDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwiZ3JpZFwiPjxhcnRpY2xlIGNsYXNzPVwiY2hlY2tvdXQtYmxvY2sgY2hlY2tvdXQtYmxvY2stLXNoaXBtZW50IGNoZWNrb3V0LWJsb2NrLS1ib3JkZXItYm90dG9tLWxlc3MgZ3JpZCBjb2wgY29sLS1zbS0xMiBmb250LWN6XCI+PGRpdiBjbGFzcz1cImNvbCBjb2wtLXNtLTEyXCI+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm1fX2NvbnRhaW5lci1zbGljayBqcy1zbGljay1jYXJvdXNlbF9fY29udGFpbmVyIGpzLWxpc3Qtc3dpdGNoZXNfX2l0ZW0gc2xpY2staW5pdGlhbGl6ZWQgc2xpY2stc2xpZGVyXCI+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm1fX3RvcC1sZWZ0LXRpdGxlXCI+PHNwYW4+JyArIHRoaXMucGlja1VwVGltZXMudmFsdWUgKyAnPC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtX190aW1lLXNsb3QtYnV0dG9uc1wiPjxidXR0b24gaWQ9XCJnb1RvUHJldmlvdXNUaW1lU2xvdFwiIGNsYXNzPVwic2xpY2stcHJldiBzbGljay1hcnJvdy1jelwiIGFyaWEtbGFiZWw9XCJQcmV2aW91c1wiIHR5cGU9XCJidXR0b25cIj5QcmV2aW91czwvYnV0dG9uPjxidXR0b24gaWQ9XCJnb1RvTmV4dFRpbWVTbG90XCIgY2xhc3M9XCJzbGljay1uZXh0IHNsaWNrLWFycm93LWN6XCIgYXJpYS1sYWJlbD1cIk5leHRcIiB0eXBlPVwiYnV0dG9uXCI+TmV4dDwvYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtLS10aW1lc2xvdHMtY3pcIj48ZGl2IGNsYXNzPVwic2xpY2stcG9wdXAtbGlzdCBkcmFnZ2FibGVcIj48ZGl2IGNsYXNzPVwic2xpY2stcG9wdXAtdHJhY2tcIiBzdHlsZT1cIm9wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCI+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PC9hcnRpY2xlPjxkaXYgY2xhc3M9XCJ0aW1lLXNsb3QtaW5mby10ZXh0XCI+PHNwYW4+JyArIHRoaXMuZm9vdGVyTWVzc2FnZS52YWx1ZSArICc8L3NwYW4+PC9kaXY+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgc2xpY2tDYXJvdXNlbENvbnRhaW5lci5hcHBlbmRUbyh0aGlzLm1haW5Db250ZW50Q29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLmJ0blNsaWNrUHJldmlvdXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldFNsaWNrUHJldmlvdXMpO1xuICAgICAgICBpZih0aGlzLmJ0blNsaWNrUHJldmlvdXMgIT0gbnVsbCApe1xuICAgICAgICAgICAgdGhpcy5idG5TbGlja1ByZXZpb3VzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZVNsb3REYXRhKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idG5TbGlja05leHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldFNsaWNrTmV4dCk7XG4gICAgICAgIGlmKHRoaXMuYnRuU2xpY2tOZXh0ICE9IG51bGwgKXtcbiAgICAgICAgICAgIHRoaXMuYnRuU2xpY2tOZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZVNsb3REYXRhKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNsaWNrVHJhY2sgPSB0aGlzLiR0aGlzLmZpbmQodGhpcy5nZXRTbGlja1RyYWNrKTtcblxuICAgICAgICB0aGlzLmRheXNDb3VudGVyID0gMDtcbiAgICAgICAgdGhpcy5idG5TbGlja1ByZXZpb3VzLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVRpbWVTbG90c0RhdGEoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlVGltZVNsb3REYXRhKGluY3JlbWVudCl7XG4gICAgICAgIHRoaXMuc2xpY2tUcmFjay5lbXB0eSgpO1xuXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy50aW1lU2xvdERhdGE7XG4gICAgICAgIGxldCBudW1iZXJPZkl0ZW1zID0gMztcbiAgICAgICAgbGV0IGl0ZW0gPSAwO1xuICAgICAgICBsZXQgbG9vcEl0ZXJhdGlvbnNRdWFudGl0eSA9IDA7XG5cbiAgICAgICAgaWYgKCQodGhpcykud2lkdGgoKSA8IDU4MCkge1xuICAgICAgICAgICAgbnVtYmVyT2ZJdGVtcyA9IDE7XG4gICAgICAgICAgICBpZih0aGlzLmxhc3RPcGVyYXRpb24gPT0gXCJkZWNyZW1lbnRcIil7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbUZvck1vYmlsZSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbSA9IHRoaXMuY3VycmVudEl0ZW1Gb3JNb2JpbGU7XG4gICAgICAgICAgICBsb29wSXRlcmF0aW9uc1F1YW50aXR5ID0gaXRlbSArIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmRheXNDb3VudGVyICUgNTtcbiAgICAgICAgICAgIGxvb3BJdGVyYXRpb25zUXVhbnRpdHkgPSAodGhpcy5kYXlzQ291bnRlciAlIDUpICsgbnVtYmVyT2ZJdGVtcztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYoaW5jcmVtZW50KXtcbiAgICAgICAgICAgIHRoaXMubGFzdE9wZXJhdGlvbiA9IFwiaW5jcmVtZW50XCI7XG4gICAgICAgICAgICBsZXQgbnVtYmVyT2ZJdGVtc0luYyA9IDA7XG4gICAgICAgICAgICBmb3IoaXRlbTsgaXRlbSA8IGxvb3BJdGVyYXRpb25zUXVhbnRpdHk7IGl0ZW0rKyl7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGVJbmMgPSBPYmplY3Qua2V5cyhkYXRhKVtpdGVtXTtcbiAgICAgICAgICAgICAgICBpZihkYXRlSW5jICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlT2JqID0gbmV3IERhdGUoZGF0ZUluYyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBnZXJtYW5Gb3JtYXREYXRlID0gZGF0ZU9iai50b0xvY2FsZURhdGVTdHJpbmcodGhpcy5sb2NhbGUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2xpY2tTbGlkZURheXNDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwic2xpY2stcG9wdXAtc2xpZGUgc2xpY2stcG9wdXAtY3VycmVudCBzbGljay1wb3B1cC1hY3RpdmUgY29sLS1tZC00IGNvbC0tc20tMTJcIiBzdHlsZT1cImZsb2F0OiBsZWZ0O1wiPjxkaXYgY2xhc3M9XCJzcGFjZUJldHdlZW5Db2xcIj48ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybS1wb3B1cF9fY29sdW1uIHNwYWNpbmctYm90dG9tIHNwYWNpbmctYm90dG9tLS1iaWdnZXN0XCIgc3R5bGU9XCJ3aWR0aDogMTAwJTsgZGlzcGxheTogaW5saW5lLWJsb2NrO292ZXJmbG93LXg6IGhpZGRlbjtvdmVyZmxvdy15OiBzY3JvbGw7aGVpZ2h0OiA0MDBweDtcIj48ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybS1wb3B1cF9fZGF0ZVwiPicgKyB0aGlzLmdldERheU5hbWUoZGF0ZUluYykgKyAnLCAnICsgZ2VybWFuRm9ybWF0RGF0ZSArICc8L2Rpdj48ZGl2IGNsYXNzPVwic2xvdHNfJyArIGRhdGVJbmMgKyAnXCI+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgIHNsaWNrU2xpZGVEYXlzQ29udGFpbmVyLmFwcGVuZFRvKHRoaXMuc2xpY2tUcmFjayk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5T2ZUaW1lU2xvdHMgPSBPYmplY3QudmFsdWVzKGRhdGEpW2l0ZW1dIGFzIEFycmF5PHN0cmluZz47XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB0aW1lX3Nsb3QgaW4gYXJyYXlPZlRpbWVTbG90cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmRFbCA9IHRoaXMuJHRoaXMuZmluZCgnLnNsb3RzXycgKyBkYXRlSW5jKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbGlja1NsaWRlSG91cnNDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybV9fc2xvdFwiPjxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtLXBvcHVwX19zbG90LWxhYmVsXCI+JyArIE9iamVjdC52YWx1ZXMoZGF0YSlbaXRlbV1bdGltZV9zbG90XSArICc8L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrU2xpZGVIb3Vyc0NvbnRhaW5lci5hcHBlbmRUbyhmaW5kRWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbUZvck1vYmlsZSsrO1xuICAgICAgICAgICAgICAgICAgICBudW1iZXJPZkl0ZW1zSW5jKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kYXlzQ291bnRlciArPSBudW1iZXJPZkl0ZW1zSW5jO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmxhc3RPcGVyYXRpb24gPSBcImRlY3JlbWVudFwiO1xuICAgICAgICAgICAgbGV0IG51bWJlck9mSXRlbXNEZWMgPSAwO1xuICAgICAgICAgICAgaWYoaXRlbSA9PSAxKXtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS0yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbUZvck1vYmlsZSA9IGl0ZW07XG5cbiAgICAgICAgICAgIGZvcihpdGVtOyBpdGVtIDwgbG9vcEl0ZXJhdGlvbnNRdWFudGl0eTsgaXRlbSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZURlYyA9IE9iamVjdC5rZXlzKGRhdGEpW2l0ZW1dO1xuICAgICAgICAgICAgICAgIGlmKGRhdGVEZWMgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGVPYmogPSBuZXcgRGF0ZShkYXRlRGVjKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdlcm1hbkZvcm1hdERhdGUgPSBkYXRlT2JqLnRvTG9jYWxlRGF0ZVN0cmluZyh0aGlzLmxvY2FsZS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNsaWNrU2xpZGVEYXlzQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cInNsaWNrLXBvcHVwLXNsaWRlIHNsaWNrLXBvcHVwLWN1cnJlbnQgc2xpY2stcG9wdXAtYWN0aXZlIGNvbC0tbWQtNCBjb2wtLXNtLTEyXCIgc3R5bGU9XCJmbG9hdDogbGVmdDtcIj48ZGl2IGNsYXNzPVwic3BhY2VCZXR3ZWVuQ29sXCI+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm0tcG9wdXBfX2NvbHVtbiBzcGFjaW5nLWJvdHRvbSBzcGFjaW5nLWJvdHRvbS0tYmlnZ2VzdFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IGRpc3BsYXk6IGlubGluZS1ibG9jaztvdmVyZmxvdy14OiBoaWRkZW47b3ZlcmZsb3cteTogc2Nyb2xsO2hlaWdodDogNDAwcHg7XCI+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm0tcG9wdXBfX2RhdGVcIj4nICsgdGhpcy5nZXREYXlOYW1lKGRhdGVEZWMpICsgJywgJyArIGdlcm1hbkZvcm1hdERhdGUgKyAnPC9kaXY+PGRpdiBjbGFzcz1cInNsb3RzXycgKyBkYXRlRGVjICsgJ1wiPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBzbGlja1NsaWRlRGF5c0NvbnRhaW5lci5hcHBlbmRUbyh0aGlzLnNsaWNrVHJhY2spO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnJheU9mVGltZVNsb3RzID0gT2JqZWN0LnZhbHVlcyhkYXRhKVtpdGVtXSBhcyBBcnJheTxzdHJpbmc+O1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdGltZV9zbG90IGluIGFycmF5T2ZUaW1lU2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5kRWwgPSB0aGlzLiR0aGlzLmZpbmQoJy5zbG90c18nICsgZGF0ZURlYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xpY2tTbGlkZUhvdXJzQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm1fX3Nsb3RcIj48ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybS1wb3B1cF9fc2xvdC1sYWJlbFwiPicgKyBPYmplY3QudmFsdWVzKGRhdGEpW2l0ZW1dW3RpbWVfc2xvdF0gKyAnPC9kaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlja1NsaWRlSG91cnNDb250YWluZXIuYXBwZW5kVG8oZmluZEVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG51bWJlck9mSXRlbXNEZWMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRheXNDb3VudGVyIC09IG51bWJlck9mSXRlbXNEZWM7XG4gICAgICAgIH1cblxuICAgICAgICBpZigkKHRoaXMpLndpZHRoKCkgPCA1ODApe1xuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50SXRlbUZvck1vYmlsZSA8IDEpe1xuICAgICAgICAgICAgICAgIHRoaXMuYnRuU2xpY2tQcmV2aW91cy5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNsaWNrUHJldmlvdXMucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudEl0ZW1Gb3JNb2JpbGUgPiA0KXtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNsaWNrTmV4dC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNsaWNrTmV4dC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgaWYodGhpcy5kYXlzQ291bnRlciA8IG51bWJlck9mSXRlbXMpe1xuICAgICAgICAgICAgICAgIHRoaXMuYnRuU2xpY2tQcmV2aW91cy5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNsaWNrUHJldmlvdXMucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuZGF5c0NvdW50ZXIgPiAobnVtYmVyT2ZJdGVtcyArIDEpKXtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNsaWNrTmV4dC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNsaWNrTmV4dC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5jaGVja1NpemUoKTtcblxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjaGVja1NpemUoKTogdm9pZCB7XG4gICAgICAgIGlmICgkKHRoaXMpLndpZHRoKCkgPCA1ODApIHtcblxuICAgICAgICAgICAgbGV0IHNlbCA9ICQoXCIuc2xpY2stcG9wdXAtc2xpZGVcIik7XG5cbiAgICAgICAgICAgIGlmKHNlbCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHNlbC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zbGljay1wb3B1cC1zbGlkZScpW2ldLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zbGljay1wb3B1cC1zbGlkZScpW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdlbmVyYXRlVGltZVNsb3RzRGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5idG5TbGlja1ByZXZpb3VzLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcblxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMudGltZVNsb3REYXRhO1xuICAgICAgICBsZXQgbWF4RGF5Q291bnRlciA9IHRoaXMuZGF5c0NvdW50ZXIgKyAzO1xuICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZGF5c0NvdW50ZXIgPCBtYXhEYXlDb3VudGVyKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRheXNDb3VudGVyKys7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGF0ZU9iaiA9IG5ldyBEYXRlKHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICBsZXQgZ2VybWFuRm9ybWF0RGF0ZSA9IGRhdGVPYmoudG9Mb2NhbGVEYXRlU3RyaW5nKHRoaXMubG9jYWxlLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGxldCBzbGlja1NsaWRlRGF5c0NvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJzbGljay1wb3B1cC1zbGlkZSBzbGljay1wb3B1cC1jdXJyZW50IHNsaWNrLXBvcHVwLWFjdGl2ZSBjb2wtLW1kLTQgY29sLS1zbS0xMlwiIHN0eWxlPVwiZmxvYXQ6IGxlZnQ7XCI+PGRpdiBjbGFzcz1cInNwYWNlQmV0d2VlbkNvbFwiPjxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtLXBvcHVwX19jb2x1bW4gc3BhY2luZy1ib3R0b20gc3BhY2luZy1ib3R0b20tLWJpZ2dlc3RcIiBzdHlsZT1cIndpZHRoOiAxMDAlOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7b3ZlcmZsb3cteDogaGlkZGVuO292ZXJmbG93LXk6IHNjcm9sbDtoZWlnaHQ6IDQwMHB4O1wiPjxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtLXBvcHVwX19kYXRlXCI+JyArIHRoaXMuZ2V0RGF5TmFtZShwcm9wZXJ0eSkgKyAnLCAnICsgZ2VybWFuRm9ybWF0RGF0ZSArICc8L2Rpdj48ZGl2IGNsYXNzPVwic2xvdHNfJyArIHByb3BlcnR5ICsgJ1wiPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIHNsaWNrU2xpZGVEYXlzQ29udGFpbmVyLmFwcGVuZFRvKHRoaXMuc2xpY2tUcmFjayk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRpbWVfc2xvdCBpbiBkYXRhW3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmluZEVsID0gdGhpcy4kdGhpcy5maW5kKCcuc2xvdHNfJyArIHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNsaWNrU2xpZGVIb3Vyc0NvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtX19zbG90XCI+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm0tcG9wdXBfX3Nsb3QtbGFiZWxcIj4nICsgZGF0YVtwcm9wZXJ0eV1bdGltZV9zbG90XSArICc8L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgc2xpY2tTbGlkZUhvdXJzQ29udGFpbmVyLmFwcGVuZFRvKGZpbmRFbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW1Gb3JNb2JpbGUgPSAxO1xuICAgICAgICB0aGlzLmRheXNDb3VudGVyID0gMjtcbiAgICAgICAgdGhpcy5jaGVja1NpemUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdW5pcXVlQnlEYXRlRGF5KGFycil7XG4gICAgICAgIHJldHVybiBhcnIucmVkdWNlKChhLCBkKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0ZSA9IGRbXCJkYXRlXCJdO1xuICAgICAgICAgICAgbGV0IGRheSA9IHRoaXMuZ2V0RGF5TmFtZShkYXRlKVxuICAgICAgICAgICAgaWYgKCFhLmluY2x1ZGVzKGRbXCJkYXRlXCJdKSkgeyBhLnB1c2goZGF0ZSk7IH1cbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldERheU5hbWUoZGF0ZVN0cilcbiAgICB7XG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRvZGF5LnNldEhvdXJzKDAsMCwwLDApO1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHIpO1xuICAgICAgICBkYXRlLnNldEhvdXJzKDAsMCwwLDApO1xuICAgICAgICBpZih0b2RheS50b0lTT1N0cmluZygpID09PSBkYXRlLnRvSVNPU3RyaW5nKCkpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9kYXlUcmFuc2xhdGlvbi52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcodGhpcy5sb2NhbGUudmFsdWUsIHsgd2Vla2RheTogJ2xvbmcnIH0pO1xuICAgIH1cblxuICAgIGdldCBzaG93Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0tLXNob3dgO1xuICAgIH1cblxuICAgIGdldCBvcGVuUG9wdXBCdXR0b24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAuJHt0aGlzLmpzTmFtZX1fX29wZW5gO1xuICAgIH1cblxuICAgIGdldCBzdWJtaXRCdXR0b25TZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYC4ke3RoaXMuanNOYW1lfV9fc3VibWl0YDtcbiAgICB9XG5cbiAgICBnZXQgY2xvc2VCdXR0b25TZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYC4ke3RoaXMubmFtZX1fX2Nsb3NlYDtcbiAgICB9XG5cbiAgICBnZXQgaXNDbG9zZU9uU3VibWl0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2Nsb3NlLW9uLXN1Ym1pdCcpO1xuICAgIH1cblxuICAgIGdldCBwaWNrZWRDTGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfS0tcGlja2VkYDtcbiAgICB9XG5cbiAgICBnZXQgZ2V0TWFpbkNvbnRlbnRDb250YWluZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAuJHt0aGlzLm5hbWV9X19jb250ZW50YDtcbiAgICB9XG5cbiAgICBnZXQgZ2V0U2xpY2tUcmFjaygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYC5zbGljay1wb3B1cC10cmFja2A7XG4gICAgfVxuXG4gICAgZ2V0IGdldExpbmtUb1RpbWVTbG90cygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYGxpbmstdG8tdGltZS1zbG90c2A7XG4gICAgfVxuXG4gICAgZ2V0IGdldExpbmtUb1RpbWVTbG90c01vYmlsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYGxpbmstdG8tdGltZS1zbG90cy1tb2JpbGVgO1xuICAgIH1cblxuICAgIGdldCBnZXRTbGlja1ByZXZpb3VzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgZ29Ub1ByZXZpb3VzVGltZVNsb3RgO1xuICAgIH1cblxuICAgIGdldCBnZXRTbGlja05leHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBnb1RvTmV4dFRpbWVTbG90YDtcbiAgICB9XG5cblxuICAgIGdldCBnZXRDb2RlQnVja2V0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcImlucHV0W25hbWU9aGVhZGVyLWNvZGVidWNrZXRdXCI7XG4gICAgfVxuXG5cblxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==