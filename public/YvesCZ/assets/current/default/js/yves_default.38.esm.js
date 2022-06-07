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
    var slickCarouselContainer = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()('<div class="grid"><article class="checkout-block checkout-block--shipment checkout-block--border-bottom-less grid col col--sm-12"><div class="col col--sm-12"><div class="popup-ui-shipment-form__container-slick js-slick-carousel__container js-list-switches__item slick-initialized slick-slider"><div class="popup-ui-shipment-form__top-left-title"><span>' + this.pickUpTimes.value + '</span></div><div class="popup-ui-shipment-form__time-slot-buttons"><button id="goToPreviousTimeSlot" class="slick-prev slick-arrow" aria-label="Previous" type="button">Previous</button><button id="goToNextTimeSlot" class="slick-next slick-arrow" aria-label="Next" type="button">Next</button></div><div class="popup-ui-shipment-form--timeslots"><div class="slick-popup-list draggable"><div class="slick-popup-track" style="opacity: 1; transform: translate3d(0px, 0px, 0px);"></div></div></div></div></div></article><div class="time-slot-info-text"><span>' + this.footerMessage.value + '</span></div></div>');
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

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcG9wdXAtdWktc2hpcG1lbnQtZm9ybS9wb3B1cC11aS1zaGlwbWVudC1mb3JtLnRzIl0sIm5hbWVzIjpbIlBvcHVwVWlTaGlwbWVudEZvcm0iLCJDb21wb25lbnQiLCIkIiwicmVhZHlDYWxsYmFjayIsImxpbmtUb1RpbWVTbG90cyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRMaW5rVG9UaW1lU2xvdHMiLCJsaW5rVG9UaW1lU2xvdHNNb2JpbGUiLCJnZXRMaW5rVG9UaW1lU2xvdHNNb2JpbGUiLCJjbG9zZU1vZGFsQnRuIiwiJHRoaXMiLCJmaW5kIiwiY2xvc2VCdXR0b25TZWxlY3RvciIsIm1haW5Db250ZW50Q29udGFpbmVyIiwiZ2V0TWFpbkNvbnRlbnRDb250YWluZXIiLCJjdXJyZW50SXRlbUZvck1vYmlsZSIsInBpY2tVcFRpbWVzIiwicXVlcnlTZWxlY3RvciIsImZvb3Rlck1lc3NhZ2UiLCJ0b2RheVRyYW5zbGF0aW9uIiwibG9jYWxlIiwibWFwRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZENsYXNzIiwibmFtZSIsInNlbmRSZXF1ZXN0IiwiY2xpY2siLCJvbiIsInRvZ2dsZUNsYXNzIiwic2hvd0NsYXNzIiwiZW1wdHkiLCJ0cmlnZ2VyUG9wdXAiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidXJsIiwiZmV0Y2giLCJtZXRob2QiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwicGFyc2VkUmVzcG9uc2UiLCJ1bmRlZmluZWQiLCJjcmVhdGVUaW1lU2xvdHNDb250YWluZXIiLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsImRhdGEiLCJ0aW1lU2xvdERhdGEiLCJzbGlja0Nhcm91c2VsQ29udGFpbmVyIiwidmFsdWUiLCJhcHBlbmRUbyIsImJ0blNsaWNrUHJldmlvdXMiLCJnZXRTbGlja1ByZXZpb3VzIiwidXBkYXRlVGltZVNsb3REYXRhIiwiYnRuU2xpY2tOZXh0IiwiZ2V0U2xpY2tOZXh0Iiwic2xpY2tUcmFjayIsImdldFNsaWNrVHJhY2siLCJkYXlzQ291bnRlciIsInNldEF0dHJpYnV0ZSIsImdlbmVyYXRlVGltZVNsb3RzRGF0YSIsImluY3JlbWVudCIsIm51bWJlck9mSXRlbXMiLCJpdGVtIiwibG9vcEl0ZXJhdGlvbnNRdWFudGl0eSIsIndpZHRoIiwibGFzdE9wZXJhdGlvbiIsIm51bWJlck9mSXRlbXNJbmMiLCJkYXRlSW5jIiwiT2JqZWN0Iiwia2V5cyIsImRhdGVPYmoiLCJEYXRlIiwiZ2VybWFuRm9ybWF0RGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsInNsaWNrU2xpZGVEYXlzQ29udGFpbmVyIiwiZ2V0RGF5TmFtZSIsImFycmF5T2ZUaW1lU2xvdHMiLCJ2YWx1ZXMiLCJ0aW1lX3Nsb3QiLCJmaW5kRWwiLCJzbGlja1NsaWRlSG91cnNDb250YWluZXIiLCJudW1iZXJPZkl0ZW1zRGVjIiwiZGF0ZURlYyIsInJlbW92ZUF0dHJpYnV0ZSIsImNoZWNrU2l6ZSIsInNlbCIsImkiLCJsZW5ndGgiLCJzdHlsZSIsImRpc3BsYXkiLCJtYXhEYXlDb3VudGVyIiwicHJvcGVydHkiLCJ1bmlxdWVCeURhdGVEYXkiLCJhcnIiLCJyZWR1Y2UiLCJhIiwiZCIsImRhdGUiLCJkYXkiLCJpbmNsdWRlcyIsInB1c2giLCJkYXRlU3RyIiwidG9kYXkiLCJzZXRIb3VycyIsInRvSVNPU3RyaW5nIiwid2Vla2RheSIsIm9wZW5Qb3B1cEJ1dHRvbiIsImpzTmFtZSIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiaXNDbG9zZU9uU3VibWl0IiwiaGFzQXR0cmlidXRlIiwicGlja2VkQ0xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFZSxNQUFNQSxtQkFBTixTQUFrQ0MsK0RBQWxDLENBQTRDO0FBQUE7QUFBQTs7QUFBQSxtQ0FDbENDLHlEQUFDLENB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YUFBTyxLQUFLdEYsZ0JBQUwsQ0FBc0I4QixLQUE3QjtBQUNIOztBQUNELFdBQU9pRCxJQUFJLENBQUN4QixrQkFBTCxDQUF3QixLQUFLdEQsTUFBTCxDQUFZNkIsS0FBcEMsRUFBMkM7QUFBRXlELGFBQU8sRUFBRTtBQUFYLEtBQTNDLENBQVA7QUFDSDs7QUFFRCxNQUFJN0UsU0FBSixHQUF3QjtBQUNwQixXQUFVLEtBQUtMLElBQWY7QUFDSDs7QUFFRCxNQUFJbUYsZUFBSixHQUE4QjtBQUMxQixpQkFBVyxLQUFLQyxNQUFoQjtBQUNIOztBQUVELE1BQUlDLG9CQUFKLEdBQW1DO0FBQy9CLGlCQUFXLEtBQUtELE1BQWhCO0FBQ0g7O0FBRUQsTUFBSWhHLG1CQUFKLEdBQWtDO0FBQzlCLGlCQUFXLEtBQUtZLElBQWhCO0FBQ0g7O0FBRUQsTUFBSXNGLGVBQUosR0FBK0I7QUFDM0IsV0FBTyxLQUFLQyxZQUFMLENBQWtCLGlCQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBSUMsV0FBSixHQUEwQjtBQUN0QixXQUFVLEtBQUt4RixJQUFmO0FBQ0g7O0FBRUQsTUFBSVYsdUJBQUosR0FBc0M7QUFDbEMsaUJBQVcsS0FBS1UsSUFBaEI7QUFDSDs7QUFFRCxNQUFJaUMsYUFBSixHQUE0QjtBQUN4QjtBQUNIOztBQUVELE1BQUluRCxrQkFBSixHQUFpQztBQUM3QjtBQUNIOztBQUVELE1BQUlFLHdCQUFKLEdBQXVDO0FBQ25DO0FBQ0g7O0FBRUQsTUFBSTRDLGdCQUFKLEdBQStCO0FBQzNCO0FBQ0g7O0FBRUQsTUFBSUcsWUFBSixHQUEyQjtBQUN2QjtBQUNIOztBQXJWc0QsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4zOC5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeS9kaXN0L2pxdWVyeSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwVWlTaGlwbWVudEZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCAkdGhpczogJCA9ICQodGhpcyk7XG4gICAgcHJvdGVjdGVkIGxpbmtUb1RpbWVTbG90cztcbiAgICBwcm90ZWN0ZWQgbGlua1RvVGltZVNsb3RzTW9iaWxlO1xuICAgIHByb3RlY3RlZCBjbG9zZU1vZGFsQnRuO1xuICAgIHByb3RlY3RlZCBtYWluQ29udGVudENvbnRhaW5lcjtcbiAgICBwcm90ZWN0ZWQgc2xpY2tUcmFjaztcbiAgICBwcm90ZWN0ZWQgdGltZVNsb3REYXRhO1xuICAgIHByb3RlY3RlZCBidG5TbGlja1ByZXZpb3VzO1xuICAgIHByb3RlY3RlZCBidG5TbGlja05leHQ7XG4gICAgcHJvdGVjdGVkIGRheXNDb3VudGVyO1xuICAgIHByb3RlY3RlZCBjdXJyZW50SXRlbUZvck1vYmlsZTtcbiAgICBwcm90ZWN0ZWQgbGFzdE9wZXJhdGlvbjtcbiAgICBwaWNrVXBUaW1lczogSFRNTElucHV0RWxlbWVudDtcbiAgICBmb290ZXJNZXNzYWdlOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGxvY2FsZTogSFRNTElucHV0RWxlbWVudDtcbiAgICB0b2RheVRyYW5zbGF0aW9uOiBIVE1MSW5wdXRFbGVtZW50O1xuXG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5rVG9UaW1lU2xvdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldExpbmtUb1RpbWVTbG90cyk7XG4gICAgICAgIHRoaXMubGlua1RvVGltZVNsb3RzTW9iaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRMaW5rVG9UaW1lU2xvdHNNb2JpbGUpO1xuICAgICAgICB0aGlzLmNsb3NlTW9kYWxCdG4gPSB0aGlzLiR0aGlzLmZpbmQodGhpcy5jbG9zZUJ1dHRvblNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5tYWluQ29udGVudENvbnRhaW5lciA9IHRoaXMuJHRoaXMuZmluZCh0aGlzLmdldE1haW5Db250ZW50Q29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5jdXJyZW50SXRlbUZvck1vYmlsZSA9IDA7XG4gICAgICAgIHRoaXMucGlja1VwVGltZXMgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGlja3VwX3RpbWVzJyk7XG4gICAgICAgIHRoaXMuZm9vdGVyTWVzc2FnZSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb290ZXJfbWVzc2FnZScpO1xuICAgICAgICB0aGlzLnRvZGF5VHJhbnNsYXRpb24gPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kYXlfdHJhbnNsYXRpb24nKTtcbiAgICAgICAgdGhpcy5sb2NhbGUgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9jYWxlJyk7XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuXG4gICAgICAgIGlmKHRoaXMubGlua1RvVGltZVNsb3RzICE9IG51bGwgKXtcbiAgICAgICAgICAgIHRoaXMubGlua1RvVGltZVNsb3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHRoaXMuYWRkQ2xhc3MoYCR7dGhpcy5uYW1lfS0tc2hvd2ApO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VuZFJlcXVlc3QoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5saW5rVG9UaW1lU2xvdHNNb2JpbGUgIT0gbnVsbCApe1xuICAgICAgICAgICAgdGhpcy5saW5rVG9UaW1lU2xvdHNNb2JpbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgJChcIi5qcy1wYWdlLWxheW91dC1tYWluX19zaWRlLWRyYXdlci10cmlnZ2VyXCIpLmNsaWNrKClcbiAgICAgICAgICAgICAgICB0aGlzLiR0aGlzLmFkZENsYXNzKGAke3RoaXMubmFtZX0tLXNob3dgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRSZXF1ZXN0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbEJ0bi5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiR0aGlzLnRvZ2dsZUNsYXNzKHRoaXMuc2hvd0NsYXNzKTtcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRlbnRDb250YWluZXIuZW1wdHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgdHJpZ2dlclBvcHVwKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kdGhpcy50b2dnbGVDbGFzcyh0aGlzLnNob3dDbGFzcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIHNlbmRSZXF1ZXN0KCk6IFByb21pc2U8dm9pZD4ge1xuXG4gICAgICAgIGNvbnN0IHVybCA9IFwiL2NoZWNrb3V0L3RpbWUtc2xvdHMtZGF0YVwiO1xuXG4gICAgICAgIGZldGNoKHVybCwge21ldGhvZDogJ1BPU1QnfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKHBhcnNlZFJlc3BvbnNlID0+IHtcblxuICAgICAgICAgICAgICAgIGlmKHBhcnNlZFJlc3BvbnNlICE9IHVuZGVmaW5lZCAmJiBwYXJzZWRSZXNwb25zZSAhPSBbXSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVGltZVNsb3RzQ29udGFpbmVyKHBhcnNlZFJlc3BvbnNlKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlVGltZVNsb3RzQ29udGFpbmVyKGRhdGEpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lU2xvdERhdGEgPSBkYXRhO1xuXG4gICAgICAgIGxldCBzbGlja0Nhcm91c2VsQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cImdyaWRcIj48YXJ0aWNsZSBjbGFzcz1cImNoZWNrb3V0LWJsb2NrIGNoZWNrb3V0LWJsb2NrLS1zaGlwbWVudCBjaGVja291dC1ibG9jay0tYm9yZGVyLWJvdHRvbS1sZXNzIGdyaWQgY29sIGNvbC0tc20tMTJcIj48ZGl2IGNsYXNzPVwiY29sIGNvbC0tc20tMTJcIj48ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybV9fY29udGFpbmVyLXNsaWNrIGpzLXNsaWNrLWNhcm91c2VsX19jb250YWluZXIganMtbGlzdC1zd2l0Y2hlc19faXRlbSBzbGljay1pbml0aWFsaXplZCBzbGljay1zbGlkZXJcIj48ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybV9fdG9wLWxlZnQtdGl0bGVcIj48c3Bhbj4nICsgdGhpcy5waWNrVXBUaW1lcy52YWx1ZSArICc8L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm1fX3RpbWUtc2xvdC1idXR0b25zXCI+PGJ1dHRvbiBpZD1cImdvVG9QcmV2aW91c1RpbWVTbG90XCIgY2xhc3M9XCJzbGljay1wcmV2IHNsaWNrLWFycm93XCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzXCIgdHlwZT1cImJ1dHRvblwiPlByZXZpb3VzPC9idXR0b24+PGJ1dHRvbiBpZD1cImdvVG9OZXh0VGltZVNsb3RcIiBjbGFzcz1cInNsaWNrLW5leHQgc2xpY2stYXJyb3dcIiBhcmlhLWxhYmVsPVwiTmV4dFwiIHR5cGU9XCJidXR0b25cIj5OZXh0PC9idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm0tLXRpbWVzbG90c1wiPjxkaXYgY2xhc3M9XCJzbGljay1wb3B1cC1saXN0IGRyYWdnYWJsZVwiPjxkaXYgY2xhc3M9XCJzbGljay1wb3B1cC10cmFja1wiIHN0eWxlPVwib3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcIj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2FydGljbGU+PGRpdiBjbGFzcz1cInRpbWUtc2xvdC1pbmZvLXRleHRcIj48c3Bhbj4nICsgdGhpcy5mb290ZXJNZXNzYWdlLnZhbHVlICsgJzwvc3Bhbj48L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgc2xpY2tDYXJvdXNlbENvbnRhaW5lci5hcHBlbmRUbyh0aGlzLm1haW5Db250ZW50Q29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLmJ0blNsaWNrUHJldmlvdXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldFNsaWNrUHJldmlvdXMpO1xuICAgICAgICBpZih0aGlzLmJ0blNsaWNrUHJldmlvdXMgIT0gbnVsbCApe1xuICAgICAgICAgICAgdGhpcy5idG5TbGlja1ByZXZpb3VzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZVNsb3REYXRhKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idG5TbGlja05leHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldFNsaWNrTmV4dCk7XG4gICAgICAgIGlmKHRoaXMuYnRuU2xpY2tOZXh0ICE9IG51bGwgKXtcbiAgICAgICAgICAgIHRoaXMuYnRuU2xpY2tOZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZVNsb3REYXRhKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNsaWNrVHJhY2sgPSB0aGlzLiR0aGlzLmZpbmQodGhpcy5nZXRTbGlja1RyYWNrKTtcblxuICAgICAgICB0aGlzLmRheXNDb3VudGVyID0gMDtcbiAgICAgICAgdGhpcy5idG5TbGlja1ByZXZpb3VzLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVRpbWVTbG90c0RhdGEoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlVGltZVNsb3REYXRhKGluY3JlbWVudCl7XG4gICAgICAgIHRoaXMuc2xpY2tUcmFjay5lbXB0eSgpO1xuXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy50aW1lU2xvdERhdGE7XG4gICAgICAgIGxldCBudW1iZXJPZkl0ZW1zID0gMztcbiAgICAgICAgbGV0IGl0ZW0gPSAwO1xuICAgICAgICBsZXQgbG9vcEl0ZXJhdGlvbnNRdWFudGl0eSA9IDA7XG5cbiAgICAgICAgaWYgKCQodGhpcykud2lkdGgoKSA8IDU4MCkge1xuICAgICAgICAgICAgbnVtYmVyT2ZJdGVtcyA9IDE7XG4gICAgICAgICAgICBpZih0aGlzLmxhc3RPcGVyYXRpb24gPT0gXCJkZWNyZW1lbnRcIil7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbUZvck1vYmlsZSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbSA9IHRoaXMuY3VycmVudEl0ZW1Gb3JNb2JpbGU7XG4gICAgICAgICAgICBsb29wSXRlcmF0aW9uc1F1YW50aXR5ID0gaXRlbSArIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmRheXNDb3VudGVyICUgNTtcbiAgICAgICAgICAgIGxvb3BJdGVyYXRpb25zUXVhbnRpdHkgPSAodGhpcy5kYXlzQ291bnRlciAlIDUpICsgbnVtYmVyT2ZJdGVtcztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYoaW5jcmVtZW50KXtcbiAgICAgICAgICAgIHRoaXMubGFzdE9wZXJhdGlvbiA9IFwiaW5jcmVtZW50XCI7XG4gICAgICAgICAgICBsZXQgbnVtYmVyT2ZJdGVtc0luYyA9IDA7XG4gICAgICAgICAgICBmb3IoaXRlbTsgaXRlbSA8IGxvb3BJdGVyYXRpb25zUXVhbnRpdHk7IGl0ZW0rKyl7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGVJbmMgPSBPYmplY3Qua2V5cyhkYXRhKVtpdGVtXTtcbiAgICAgICAgICAgICAgICBpZihkYXRlSW5jICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlT2JqID0gbmV3IERhdGUoZGF0ZUluYyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBnZXJtYW5Gb3JtYXREYXRlID0gZGF0ZU9iai50b0xvY2FsZURhdGVTdHJpbmcodGhpcy5sb2NhbGUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2xpY2tTbGlkZURheXNDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwic2xpY2stcG9wdXAtc2xpZGUgc2xpY2stcG9wdXAtY3VycmVudCBzbGljay1wb3B1cC1hY3RpdmUgY29sLS1tZC00IGNvbC0tc20tMTJcIiBzdHlsZT1cImZsb2F0OiBsZWZ0O1wiPjxkaXYgY2xhc3M9XCJzcGFjZUJldHdlZW5Db2xcIj48ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybS1wb3B1cF9fY29sdW1uIHNwYWNpbmctYm90dG9tIHNwYWNpbmctYm90dG9tLS1iaWdnZXN0XCIgc3R5bGU9XCJ3aWR0aDogMTAwJTsgZGlzcGxheTogaW5saW5lLWJsb2NrO292ZXJmbG93LXg6IGhpZGRlbjtvdmVyZmxvdy15OiBzY3JvbGw7aGVpZ2h0OiA0MDBweDtcIj48ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybS1wb3B1cF9fZGF0ZVwiPicgKyB0aGlzLmdldERheU5hbWUoZGF0ZUluYykgKyAnLCAnICsgZ2VybWFuRm9ybWF0RGF0ZSArICc8L2Rpdj48ZGl2IGNsYXNzPVwic2xvdHNfJyArIGRhdGVJbmMgKyAnXCI+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgIHNsaWNrU2xpZGVEYXlzQ29udGFpbmVyLmFwcGVuZFRvKHRoaXMuc2xpY2tUcmFjayk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5T2ZUaW1lU2xvdHMgPSBPYmplY3QudmFsdWVzKGRhdGEpW2l0ZW1dIGFzIEFycmF5PHN0cmluZz47XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB0aW1lX3Nsb3QgaW4gYXJyYXlPZlRpbWVTbG90cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmRFbCA9IHRoaXMuJHRoaXMuZmluZCgnLnNsb3RzXycgKyBkYXRlSW5jKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbGlja1NsaWRlSG91cnNDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybV9fc2xvdFwiPjxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtLXBvcHVwX19zbG90LWxhYmVsXCI+JyArIE9iamVjdC52YWx1ZXMoZGF0YSlbaXRlbV1bdGltZV9zbG90XSArICc8L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrU2xpZGVIb3Vyc0NvbnRhaW5lci5hcHBlbmRUbyhmaW5kRWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbUZvck1vYmlsZSsrO1xuICAgICAgICAgICAgICAgICAgICBudW1iZXJPZkl0ZW1zSW5jKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kYXlzQ291bnRlciArPSBudW1iZXJPZkl0ZW1zSW5jO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmxhc3RPcGVyYXRpb24gPSBcImRlY3JlbWVudFwiO1xuICAgICAgICAgICAgbGV0IG51bWJlck9mSXRlbXNEZWMgPSAwO1xuICAgICAgICAgICAgaWYoaXRlbSA9PSAxKXtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbS0yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbUZvck1vYmlsZSA9IGl0ZW07XG5cbiAgICAgICAgICAgIGZvcihpdGVtOyBpdGVtIDwgbG9vcEl0ZXJhdGlvbnNRdWFudGl0eTsgaXRlbSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZURlYyA9IE9iamVjdC5rZXlzKGRhdGEpW2l0ZW1dO1xuICAgICAgICAgICAgICAgIGlmKGRhdGVEZWMgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGVPYmogPSBuZXcgRGF0ZShkYXRlRGVjKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdlcm1hbkZvcm1hdERhdGUgPSBkYXRlT2JqLnRvTG9jYWxlRGF0ZVN0cmluZyh0aGlzLmxvY2FsZS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNsaWNrU2xpZGVEYXlzQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cInNsaWNrLXBvcHVwLXNsaWRlIHNsaWNrLXBvcHVwLWN1cnJlbnQgc2xpY2stcG9wdXAtYWN0aXZlIGNvbC0tbWQtNCBjb2wtLXNtLTEyXCIgc3R5bGU9XCJmbG9hdDogbGVmdDtcIj48ZGl2IGNsYXNzPVwic3BhY2VCZXR3ZWVuQ29sXCI+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm0tcG9wdXBfX2NvbHVtbiBzcGFjaW5nLWJvdHRvbSBzcGFjaW5nLWJvdHRvbS0tYmlnZ2VzdFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IGRpc3BsYXk6IGlubGluZS1ibG9jaztvdmVyZmxvdy14OiBoaWRkZW47b3ZlcmZsb3cteTogc2Nyb2xsO2hlaWdodDogNDAwcHg7XCI+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm0tcG9wdXBfX2RhdGVcIj4nICsgdGhpcy5nZXREYXlOYW1lKGRhdGVEZWMpICsgJywgJyArIGdlcm1hbkZvcm1hdERhdGUgKyAnPC9kaXY+PGRpdiBjbGFzcz1cInNsb3RzXycgKyBkYXRlRGVjICsgJ1wiPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBzbGlja1NsaWRlRGF5c0NvbnRhaW5lci5hcHBlbmRUbyh0aGlzLnNsaWNrVHJhY2spO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnJheU9mVGltZVNsb3RzID0gT2JqZWN0LnZhbHVlcyhkYXRhKVtpdGVtXSBhcyBBcnJheTxzdHJpbmc+O1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdGltZV9zbG90IGluIGFycmF5T2ZUaW1lU2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5kRWwgPSB0aGlzLiR0aGlzLmZpbmQoJy5zbG90c18nICsgZGF0ZURlYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xpY2tTbGlkZUhvdXJzQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm1fX3Nsb3RcIj48ZGl2IGNsYXNzPVwicG9wdXAtdWktc2hpcG1lbnQtZm9ybS1wb3B1cF9fc2xvdC1sYWJlbFwiPicgKyBPYmplY3QudmFsdWVzKGRhdGEpW2l0ZW1dW3RpbWVfc2xvdF0gKyAnPC9kaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlja1NsaWRlSG91cnNDb250YWluZXIuYXBwZW5kVG8oZmluZEVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG51bWJlck9mSXRlbXNEZWMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRheXNDb3VudGVyIC09IG51bWJlck9mSXRlbXNEZWM7XG4gICAgICAgIH1cblxuICAgICAgICBpZigkKHRoaXMpLndpZHRoKCkgPCA1ODApe1xuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50SXRlbUZvck1vYmlsZSA8IDEpe1xuICAgICAgICAgICAgICAgIHRoaXMuYnRuU2xpY2tQcmV2aW91cy5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNsaWNrUHJldmlvdXMucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudEl0ZW1Gb3JNb2JpbGUgPiA0KXtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNsaWNrTmV4dC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNsaWNrTmV4dC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgaWYodGhpcy5kYXlzQ291bnRlciA8IG51bWJlck9mSXRlbXMpe1xuICAgICAgICAgICAgICAgIHRoaXMuYnRuU2xpY2tQcmV2aW91cy5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNsaWNrUHJldmlvdXMucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuZGF5c0NvdW50ZXIgPiAobnVtYmVyT2ZJdGVtcyArIDEpKXtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNsaWNrTmV4dC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNsaWNrTmV4dC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5jaGVja1NpemUoKTtcblxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjaGVja1NpemUoKTogdm9pZCB7XG4gICAgICAgIGlmICgkKHRoaXMpLndpZHRoKCkgPCA1ODApIHtcblxuICAgICAgICAgICAgbGV0IHNlbCA9ICQoXCIuc2xpY2stcG9wdXAtc2xpZGVcIik7XG5cbiAgICAgICAgICAgIGlmKHNlbCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHNlbC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zbGljay1wb3B1cC1zbGlkZScpW2ldLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zbGljay1wb3B1cC1zbGlkZScpW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdlbmVyYXRlVGltZVNsb3RzRGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5idG5TbGlja1ByZXZpb3VzLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcblxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMudGltZVNsb3REYXRhO1xuICAgICAgICBsZXQgbWF4RGF5Q291bnRlciA9IHRoaXMuZGF5c0NvdW50ZXIgKyAzO1xuICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZGF5c0NvdW50ZXIgPCBtYXhEYXlDb3VudGVyKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRheXNDb3VudGVyKys7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGF0ZU9iaiA9IG5ldyBEYXRlKHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICBsZXQgZ2VybWFuRm9ybWF0RGF0ZSA9IGRhdGVPYmoudG9Mb2NhbGVEYXRlU3RyaW5nKHRoaXMubG9jYWxlLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGxldCBzbGlja1NsaWRlRGF5c0NvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJzbGljay1wb3B1cC1zbGlkZSBzbGljay1wb3B1cC1jdXJyZW50IHNsaWNrLXBvcHVwLWFjdGl2ZSBjb2wtLW1kLTQgY29sLS1zbS0xMlwiIHN0eWxlPVwiZmxvYXQ6IGxlZnQ7XCI+PGRpdiBjbGFzcz1cInNwYWNlQmV0d2VlbkNvbFwiPjxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtLXBvcHVwX19jb2x1bW4gc3BhY2luZy1ib3R0b20gc3BhY2luZy1ib3R0b20tLWJpZ2dlc3RcIiBzdHlsZT1cIndpZHRoOiAxMDAlOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7b3ZlcmZsb3cteDogaGlkZGVuO292ZXJmbG93LXk6IHNjcm9sbDtoZWlnaHQ6IDQwMHB4O1wiPjxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtLXBvcHVwX19kYXRlXCI+JyArIHRoaXMuZ2V0RGF5TmFtZShwcm9wZXJ0eSkgKyAnLCAnICsgZ2VybWFuRm9ybWF0RGF0ZSArICc8L2Rpdj48ZGl2IGNsYXNzPVwic2xvdHNfJyArIHByb3BlcnR5ICsgJ1wiPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIHNsaWNrU2xpZGVEYXlzQ29udGFpbmVyLmFwcGVuZFRvKHRoaXMuc2xpY2tUcmFjayk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRpbWVfc2xvdCBpbiBkYXRhW3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmluZEVsID0gdGhpcy4kdGhpcy5maW5kKCcuc2xvdHNfJyArIHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNsaWNrU2xpZGVIb3Vyc0NvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJwb3B1cC11aS1zaGlwbWVudC1mb3JtX19zbG90XCI+PGRpdiBjbGFzcz1cInBvcHVwLXVpLXNoaXBtZW50LWZvcm0tcG9wdXBfX3Nsb3QtbGFiZWxcIj4nICsgZGF0YVtwcm9wZXJ0eV1bdGltZV9zbG90XSArICc8L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgc2xpY2tTbGlkZUhvdXJzQ29udGFpbmVyLmFwcGVuZFRvKGZpbmRFbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudEl0ZW1Gb3JNb2JpbGUgPSAxO1xuICAgICAgICB0aGlzLmRheXNDb3VudGVyID0gMjtcbiAgICAgICAgdGhpcy5jaGVja1NpemUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdW5pcXVlQnlEYXRlRGF5KGFycil7XG4gICAgICAgIHJldHVybiBhcnIucmVkdWNlKChhLCBkKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0ZSA9IGRbXCJkYXRlXCJdO1xuICAgICAgICAgICAgbGV0IGRheSA9IHRoaXMuZ2V0RGF5TmFtZShkYXRlKVxuICAgICAgICAgICAgaWYgKCFhLmluY2x1ZGVzKGRbXCJkYXRlXCJdKSkgeyBhLnB1c2goZGF0ZSk7IH1cbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldERheU5hbWUoZGF0ZVN0cilcbiAgICB7XG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRvZGF5LnNldEhvdXJzKDAsMCwwLDApO1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHIpO1xuICAgICAgICBkYXRlLnNldEhvdXJzKDAsMCwwLDApO1xuICAgICAgICBpZih0b2RheS50b0lTT1N0cmluZygpID09PSBkYXRlLnRvSVNPU3RyaW5nKCkpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9kYXlUcmFuc2xhdGlvbi52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcodGhpcy5sb2NhbGUudmFsdWUsIHsgd2Vla2RheTogJ2xvbmcnIH0pO1xuICAgIH1cblxuICAgIGdldCBzaG93Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0tLXNob3dgO1xuICAgIH1cblxuICAgIGdldCBvcGVuUG9wdXBCdXR0b24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAuJHt0aGlzLmpzTmFtZX1fX29wZW5gO1xuICAgIH1cblxuICAgIGdldCBzdWJtaXRCdXR0b25TZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYC4ke3RoaXMuanNOYW1lfV9fc3VibWl0YDtcbiAgICB9XG5cbiAgICBnZXQgY2xvc2VCdXR0b25TZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYC4ke3RoaXMubmFtZX1fX2Nsb3NlYDtcbiAgICB9XG5cbiAgICBnZXQgaXNDbG9zZU9uU3VibWl0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2Nsb3NlLW9uLXN1Ym1pdCcpO1xuICAgIH1cblxuICAgIGdldCBwaWNrZWRDTGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfS0tcGlja2VkYDtcbiAgICB9XG5cbiAgICBnZXQgZ2V0TWFpbkNvbnRlbnRDb250YWluZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAuJHt0aGlzLm5hbWV9X19jb250ZW50YDtcbiAgICB9XG5cbiAgICBnZXQgZ2V0U2xpY2tUcmFjaygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYC5zbGljay1wb3B1cC10cmFja2A7XG4gICAgfVxuXG4gICAgZ2V0IGdldExpbmtUb1RpbWVTbG90cygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYGxpbmstdG8tdGltZS1zbG90c2A7XG4gICAgfVxuXG4gICAgZ2V0IGdldExpbmtUb1RpbWVTbG90c01vYmlsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYGxpbmstdG8tdGltZS1zbG90cy1tb2JpbGVgO1xuICAgIH1cblxuICAgIGdldCBnZXRTbGlja1ByZXZpb3VzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgZ29Ub1ByZXZpb3VzVGltZVNsb3RgO1xuICAgIH1cblxuICAgIGdldCBnZXRTbGlja05leHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBnb1RvTmV4dFRpbWVTbG90YDtcbiAgICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=