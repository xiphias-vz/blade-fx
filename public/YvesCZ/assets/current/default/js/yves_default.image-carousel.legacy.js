(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["image-carousel"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/image-carousel/image-carousel.ts":
/*!*************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/image-carousel/image-carousel.ts ***!
  \*************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ImageCarousel; });
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
/* harmony import */ var _simple_carousel_simple_carousel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../simple-carousel/simple-carousel */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/simple-carousel/simple-carousel.ts");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var ImageCarousel = /*#__PURE__*/function (_SimpleCarousel) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(ImageCarousel, _SimpleCarousel);

  var _super = _createSuper(ImageCarousel);

  function ImageCarousel() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _SimpleCarousel.call.apply(_SimpleCarousel, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "defaultImageUrl", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "currentSlideImage", void 0);

    return _this;
  }

  var _proto = ImageCarousel.prototype;

  _proto.readyCallback = function readyCallback() {
    this.getCurrentSlideImage();
    this.setDefaultImageUrl();

    _SimpleCarousel.prototype.readyCallback.call(this);
  }
  /**
   * Performs sliding of slider items.
   */
  ;

  _proto.slide = function slide() {
    _SimpleCarousel.prototype.slide.call(this);

    this.getCurrentSlideImage();
    this.setDefaultImageUrl();
  }
  /**
   * Sets the new slide image with a new URL.
   * @param url An image URL.
   */
  ;

  /**
   * Sets the slide image with a default URL.
   */
  _proto.restoreDefaultImageUrl = function restoreDefaultImageUrl() {
    this.currentSlideImage.src = this.defaultImageUrl;
  };

  _proto.getCurrentSlideImage = function getCurrentSlideImage() {
    var currentSlide = this.getElementsByClassName(this.jsName + "__slide")[this.viewCurrentIndex];
    this.currentSlideImage = currentSlide.getElementsByTagName('img')[0];
  };

  _proto.setDefaultImageUrl = function setDefaultImageUrl() {
    this.defaultImageUrl = this.currentSlideImage.dataset.src || this.currentSlideImage.src;
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(ImageCarousel, [{
    key: "slideImageUrl",
    set: function set(url) {
      this.currentSlideImage.src = url;
    }
  }]);

  return ImageCarousel;
}(_simple_carousel_simple_carousel__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/simple-carousel/simple-carousel.ts":
/*!***************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/simple-carousel/simple-carousel.ts ***!
  \***************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SimpleCarousel; });
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
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var SimpleCarousel = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(SimpleCarousel, _Component);

  var _super = _createSuper(SimpleCarousel);

  /**
   * Switches a slide to a previous one.
   */

  /**
   * Switches a slide to a next one.
   */

  /**
   * The current slider.
   */

  /**
   * The number of the slides.
   */

  /**
   * The slider width.
   */

  /**
   * Thr dot-switch elements below the slides.
   */

  /**
   * The number of views.
   */

  /**
   * The index of the active slide.
   */

  /**
   * Dot element selector.
   */

  /**
   * Dot element "is current" modifier.
   */
  function SimpleCarousel() {
    var _this;

    _this = _Component.call(this) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "triggerPrev", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "triggerNext", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "slider", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "slidesCount", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "slideWidth", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "dots", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "viewsCount", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "viewCurrentIndex", 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "dotSelector", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "dotCurrentModifier", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "fullSliderWidth", 100);

    _this.dotSelector = _this.jsName + "__dot";
    _this.dotCurrentModifier = _this.name + "__dot--current";
    return _this;
  }

  var _proto = SimpleCarousel.prototype;

  _proto.readyCallback = function readyCallback() {
    this.slidesCount = this.getElementsByClassName(this.jsName + "__slide").length;

    if (this.slidesCount <= 1) {
      return;
    }

    this.triggerPrev = this.getElementsByClassName(this.jsName + "__prev")[0];
    this.triggerNext = this.getElementsByClassName(this.jsName + "__next")[0];
    this.slider = this.getElementsByClassName(this.jsName + "__slider")[0];
    this.slideWidth = this.fullSliderWidth / this.slidesToShow;
    this.dots = Array.from(this.getElementsByClassName(this.dotSelector));
    this.viewsCount = this.getViewsCount();
    this.mapEvents();
  }
  /**
   * Gets the number of slides.
   */
  ;

  _proto.getViewsCount = function getViewsCount() {
    return Math.ceil((this.slidesCount - this.slidesToShow) / this.slidesToScroll) + 1;
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.triggerPrev.addEventListener('click', function (event) {
      return _this2.onPrevClick(event);
    });
    this.triggerNext.addEventListener('click', function (event) {
      return _this2.onNextClick(event);
    });
    this.dots.forEach(function (dot) {
      dot.addEventListener('click', function (event) {
        return _this2.onDotClick(event);
      });
    });
  };

  _proto.onPrevClick = function onPrevClick(event) {
    event.preventDefault();
    this.loadPrevViewIndex();
    this.slide();
    this.updateCurrentDot();
  };

  _proto.onNextClick = function onNextClick(event) {
    event.preventDefault();
    this.loadNextViewIndex();
    this.slide();
    this.updateCurrentDot();
  };

  _proto.onDotClick = function onDotClick(event) {
    event.preventDefault();
    this.loadViewIndexFromDot(event.target);
    this.slide();
    this.updateCurrentDot();
  }
  /**
   * Switches the current slide to the previous one.
   */
  ;

  _proto.loadPrevViewIndex = function loadPrevViewIndex() {
    this.viewCurrentIndex = this.viewCurrentIndex - 1;

    if (this.viewCurrentIndex < 0) {
      this.viewCurrentIndex = this.viewsCount - 1;
    }
  }
  /**
   * Switches the current slide to the next one.
   */
  ;

  _proto.loadNextViewIndex = function loadNextViewIndex() {
    this.viewCurrentIndex = this.viewCurrentIndex + 1;

    if (this.viewCurrentIndex >= this.viewsCount) {
      this.viewCurrentIndex = 0;
    }
  }
  /**
   * Switches to the slide based on the provided dot element.
   * @param dot HTMLElement corresponding to the new target slide that has to be loaded.
   */
  ;

  _proto.loadViewIndexFromDot = function loadViewIndexFromDot(dot) {
    this.viewCurrentIndex = this.dots.indexOf(dot);

    if (this.viewCurrentIndex === -1) {
      this.viewCurrentIndex = 0;
    }
  }
  /**
   * Performs sliding of slider items.
   */
  ;

  _proto.slide = function slide() {
    var slidesToSlide = this.slidesToScroll * this.viewCurrentIndex;

    if (this.slidesToScroll + slidesToSlide > this.slidesCount) {
      slidesToSlide = slidesToSlide - (this.slidesCount - slidesToSlide);
    }

    var offset = -(slidesToSlide * this.slideWidth);
    this.slider.style.transform = "translateX(" + offset + "%)";
  }
  /**
   * Toggles the active class and the modifier on the current dot.
   */
  ;

  _proto.updateCurrentDot = function updateCurrentDot() {
    if (this.dots.length === 0) {
      return;
    }

    this.querySelector("." + this.dotSelector + "." + this.dotCurrentModifier).classList.remove(this.dotCurrentModifier);
    this.dots[this.viewCurrentIndex].classList.add(this.dotCurrentModifier);
  }
  /**
   * Gets the number of slides to be shown.
   */
  ;

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(SimpleCarousel, [{
    key: "slidesToShow",
    get: function get() {
      return parseInt(this.getAttribute('slides-to-show') || '0');
    }
    /**
     * Gets the number of slides to be scrolled by an interaction.
     */

  }, {
    key: "slidesToScroll",
    get: function get() {
      return parseInt(this.getAttribute('slides-to-scroll') || '0');
    }
  }]);

  return SimpleCarousel;
}(_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvaW1hZ2UtY2Fyb3VzZWwvaW1hZ2UtY2Fyb3VzZWwudHMiLCJ3ZWJwYWNrOi8vLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zaG9wLXVpL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Nob3BVaS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3NpbXBsZS1jYXJvdXNlbC9zaW1wbGUtY2Fyb3VzZWwudHMiXSwibmFtZXMiOlsiSW1hZ2VDYXJvdXNlbCIsInJlYWR5Q2FsbGJhY2siLCJnZXRDdXJyZW50U2xpZGVJbWFnZSIsInNldERlZmF1bHRJbWFnZVVybCIsInNsaWRlIiwicmVzdG9yZURlZmF1bHRJbWFnZVVybCIsImN1cnJlbnRTbGlkZUltYWdlIiwic3JjIiwiZGVmYXVsdEltYWdlVXJsIiwiY3VycmVudFNsaWRlIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImpzTmFtZSIsInZpZXdDdXJyZW50SW5kZXgiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImRhdGFzZXQiLCJ1cmwiLCJTaW1wbGVDYXJvdXNlbCIsImRvdFNlbGVjdG9yIiwiZG90Q3VycmVudE1vZGlmaWVyIiwibmFtZSIsInNsaWRlc0NvdW50IiwibGVuZ3RoIiwidHJpZ2dlclByZXYiLCJ0cmlnZ2VyTmV4dCIsInNsaWRlciIsInNsaWRlV2lkdGgiLCJmdWxsU2xpZGVyV2lkdGgiLCJzbGlkZXNUb1Nob3ciLCJkb3RzIiwiQXJyYXkiLCJmcm9tIiwidmlld3NDb3VudCIsImdldFZpZXdzQ291bnQiLCJtYXBFdmVudHMiLCJNYXRoIiwiY2VpbCIsInNsaWRlc1RvU2Nyb2xsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25QcmV2Q2xpY2siLCJvbk5leHRDbGljayIsImZvckVhY2giLCJkb3QiLCJvbkRvdENsaWNrIiwicHJldmVudERlZmF1bHQiLCJsb2FkUHJldlZpZXdJbmRleCIsInVwZGF0ZUN1cnJlbnREb3QiLCJsb2FkTmV4dFZpZXdJbmRleCIsImxvYWRWaWV3SW5kZXhGcm9tRG90IiwidGFyZ2V0IiwiaW5kZXhPZiIsInNsaWRlc1RvU2xpZGUiLCJvZmZzZXQiLCJzdHlsZSIsInRyYW5zZm9ybSIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBRXFCQSxhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUlQQyxhLEdBQVYseUJBQWdDO0FBQzVCLFNBQUtDLG9CQUFMO0FBQ0EsU0FBS0Msa0JBQUw7O0FBQ0EsOEJBQU1GLGFBQU47QUFDSDtBQUVEOzs7OztTQUdBRyxLLEdBQUEsaUJBQWM7QUFDViw4QkFBTUEsS0FBTjs7QUFDQSxTQUFLRixvQkFBTDtBQUNBLFNBQUtDLGtCQUFMO0FBQ0g7QUFFRDs7Ozs7O0FBUUE7OztTQUdBRSxzQixHQUFBLGtDQUErQjtBQUMzQixTQUFLQyxpQkFBTCxDQUF1QkMsR0FBdkIsR0FBNkIsS0FBS0MsZUFBbEM7QUFDSCxHOztTQUVTTixvQixHQUFWLGdDQUF1QztBQUNuQyxRQUFNTyxZQUFZLEdBQWdCLEtBQUtDLHNCQUFMLENBQStCLEtBQUtDLE1BQXBDLGNBQXFELEtBQUtDLGdCQUExRCxDQUFsQztBQUVBLFNBQUtOLGlCQUFMLEdBQXlCRyxZQUFZLENBQUNJLG9CQUFiLENBQWtDLEtBQWxDLEVBQXlDLENBQXpDLENBQXpCO0FBQ0gsRzs7U0FFU1Ysa0IsR0FBViw4QkFBcUM7QUFDakMsU0FBS0ssZUFBTCxHQUF1QixLQUFLRixpQkFBTCxDQUF1QlEsT0FBdkIsQ0FBK0JQLEdBQS9CLElBQXNDLEtBQUtELGlCQUFMLENBQXVCQyxHQUFwRjtBQUNI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S0FBSzFCLFVBQXZCLENBQWY7QUFDQSxTQUFLRCxNQUFMLENBQVk2QixLQUFaLENBQWtCQyxTQUFsQixtQkFBNENGLE1BQTVDO0FBQ0g7QUFFRDs7Ozs7U0FHQU4sZ0IsR0FBQSw0QkFBeUI7QUFDckIsUUFBSSxLQUFLbEIsSUFBTCxDQUFVUCxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQ3hCO0FBQ0g7O0FBRUQsU0FBS2tDLGFBQUwsT0FBdUIsS0FBS3RDLFdBQTVCLFNBQTJDLEtBQUtDLGtCQUFoRCxFQUFzRXNDLFNBQXRFLENBQWdGQyxNQUFoRixDQUF1RixLQUFLdkMsa0JBQTVGO0FBRUEsU0FBS1UsSUFBTCxDQUFVLEtBQUtoQixnQkFBZixFQUFpQzRDLFNBQWpDLENBQTJDRSxHQUEzQyxDQUErQyxLQUFLeEMsa0JBQXBEO0FBQ0g7QUFFRDs7Ozs7Ozt3QkFHMkI7QUFDdkIsYUFBT3lDLFFBQVEsQ0FBQyxLQUFLQyxZQUFMLENBQWtCLGdCQUFsQixLQUF1QyxHQUF4QyxDQUFmO0FBQ0g7QUFFRDs7Ozs7O3dCQUc2QjtBQUN6QixhQUFPRCxRQUFRLENBQUMsS0FBS0MsWUFBTCxDQUFrQixrQkFBbEIsS0FBeUMsR0FBMUMsQ0FBZjtBQUNIOzs7O0VBekx1Q0MseUQiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuaW1hZ2UtY2Fyb3VzZWwubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNpbXBsZUNhcm91c2VsIGZyb20gJy4uL3NpbXBsZS1jYXJvdXNlbC9zaW1wbGUtY2Fyb3VzZWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZUNhcm91c2VsIGV4dGVuZHMgU2ltcGxlQ2Fyb3VzZWwge1xuICAgIHByb3RlY3RlZCBkZWZhdWx0SW1hZ2VVcmw6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgY3VycmVudFNsaWRlSW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRDdXJyZW50U2xpZGVJbWFnZSgpO1xuICAgICAgICB0aGlzLnNldERlZmF1bHRJbWFnZVVybCgpO1xuICAgICAgICBzdXBlci5yZWFkeUNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgc2xpZGluZyBvZiBzbGlkZXIgaXRlbXMuXG4gICAgICovXG4gICAgc2xpZGUoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNsaWRlKCk7XG4gICAgICAgIHRoaXMuZ2V0Q3VycmVudFNsaWRlSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5zZXREZWZhdWx0SW1hZ2VVcmwoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBuZXcgc2xpZGUgaW1hZ2Ugd2l0aCBhIG5ldyBVUkwuXG4gICAgICogQHBhcmFtIHVybCBBbiBpbWFnZSBVUkwuXG4gICAgICovXG4gICAgc2V0IHNsaWRlSW1hZ2VVcmwodXJsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2xpZGVJbWFnZS5zcmMgPSB1cmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc2xpZGUgaW1hZ2Ugd2l0aCBhIGRlZmF1bHQgVVJMLlxuICAgICAqL1xuICAgIHJlc3RvcmVEZWZhdWx0SW1hZ2VVcmwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudFNsaWRlSW1hZ2Uuc3JjID0gdGhpcy5kZWZhdWx0SW1hZ2VVcmw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldEN1cnJlbnRTbGlkZUltYWdlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjdXJyZW50U2xpZGUgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc2xpZGVgKVt0aGlzLnZpZXdDdXJyZW50SW5kZXhdO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFNsaWRlSW1hZ2UgPSBjdXJyZW50U2xpZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXREZWZhdWx0SW1hZ2VVcmwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVmYXVsdEltYWdlVXJsID0gdGhpcy5jdXJyZW50U2xpZGVJbWFnZS5kYXRhc2V0LnNyYyB8fCB0aGlzLmN1cnJlbnRTbGlkZUltYWdlLnNyYztcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGVDYXJvdXNlbCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogU3dpdGNoZXMgYSBzbGlkZSB0byBhIHByZXZpb3VzIG9uZS5cbiAgICAgKi9cbiAgICB0cmlnZ2VyUHJldjogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBTd2l0Y2hlcyBhIHNsaWRlIHRvIGEgbmV4dCBvbmUuXG4gICAgICovXG4gICAgdHJpZ2dlck5leHQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgc2xpZGVyLlxuICAgICAqL1xuICAgIHNsaWRlcjogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHRoZSBzbGlkZXMuXG4gICAgICovXG4gICAgc2xpZGVzQ291bnQ6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzbGlkZXIgd2lkdGguXG4gICAgICovXG4gICAgc2xpZGVXaWR0aDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhyIGRvdC1zd2l0Y2ggZWxlbWVudHMgYmVsb3cgdGhlIHNsaWRlcy5cbiAgICAgKi9cbiAgICBkb3RzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiB2aWV3cy5cbiAgICAgKi9cbiAgICB2aWV3c0NvdW50OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW5kZXggb2YgdGhlIGFjdGl2ZSBzbGlkZS5cbiAgICAgKi9cbiAgICB2aWV3Q3VycmVudEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogRG90IGVsZW1lbnQgc2VsZWN0b3IuXG4gICAgICovXG4gICAgcmVhZG9ubHkgZG90U2VsZWN0b3I6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIERvdCBlbGVtZW50IFwiaXMgY3VycmVudFwiIG1vZGlmaWVyLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGRvdEN1cnJlbnRNb2RpZmllcjogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBmdWxsU2xpZGVyV2lkdGg6IG51bWJlciA9IDEwMDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuZG90U2VsZWN0b3IgPSBgJHt0aGlzLmpzTmFtZX1fX2RvdGA7XG4gICAgICAgIHRoaXMuZG90Q3VycmVudE1vZGlmaWVyID0gYCR7dGhpcy5uYW1lfV9fZG90LS1jdXJyZW50YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zbGlkZXNDb3VudCA9IHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3NsaWRlYCkubGVuZ3RoO1xuXG4gICAgICAgIGlmICh0aGlzLnNsaWRlc0NvdW50IDw9IDEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlclByZXYgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcHJldmApWzBdO1xuICAgICAgICB0aGlzLnRyaWdnZXJOZXh0ID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX25leHRgKVswXTtcbiAgICAgICAgdGhpcy5zbGlkZXIgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc2xpZGVyYClbMF07XG4gICAgICAgIHRoaXMuc2xpZGVXaWR0aCA9IHRoaXMuZnVsbFNsaWRlcldpZHRoIC8gdGhpcy5zbGlkZXNUb1Nob3c7XG4gICAgICAgIHRoaXMuZG90cyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZG90U2VsZWN0b3IpKTtcbiAgICAgICAgdGhpcy52aWV3c0NvdW50ID0gdGhpcy5nZXRWaWV3c0NvdW50KCk7XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2Ygc2xpZGVzLlxuICAgICAqL1xuICAgIGdldFZpZXdzQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbCgodGhpcy5zbGlkZXNDb3VudCAtIHRoaXMuc2xpZGVzVG9TaG93KSAvIHRoaXMuc2xpZGVzVG9TY3JvbGwpICsgMTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJQcmV2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vblByZXZDbGljayhldmVudCkpO1xuICAgICAgICB0aGlzLnRyaWdnZXJOZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vbk5leHRDbGljayhldmVudCkpO1xuICAgICAgICB0aGlzLmRvdHMuZm9yRWFjaCgoZG90OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZG90LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vbkRvdENsaWNrKGV2ZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblByZXZDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5sb2FkUHJldlZpZXdJbmRleCgpO1xuICAgICAgICB0aGlzLnNsaWRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ3VycmVudERvdCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk5leHRDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5sb2FkTmV4dFZpZXdJbmRleCgpO1xuICAgICAgICB0aGlzLnNsaWRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ3VycmVudERvdCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRvdENsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmxvYWRWaWV3SW5kZXhGcm9tRG90KDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQpO1xuICAgICAgICB0aGlzLnNsaWRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ3VycmVudERvdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN3aXRjaGVzIHRoZSBjdXJyZW50IHNsaWRlIHRvIHRoZSBwcmV2aW91cyBvbmUuXG4gICAgICovXG4gICAgbG9hZFByZXZWaWV3SW5kZXgoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmlld0N1cnJlbnRJbmRleCA9IHRoaXMudmlld0N1cnJlbnRJbmRleCAtIDE7XG5cbiAgICAgICAgaWYgKHRoaXMudmlld0N1cnJlbnRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMudmlld0N1cnJlbnRJbmRleCA9IHRoaXMudmlld3NDb3VudCAtIDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTd2l0Y2hlcyB0aGUgY3VycmVudCBzbGlkZSB0byB0aGUgbmV4dCBvbmUuXG4gICAgICovXG4gICAgbG9hZE5leHRWaWV3SW5kZXgoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmlld0N1cnJlbnRJbmRleCA9IHRoaXMudmlld0N1cnJlbnRJbmRleCArIDE7XG5cbiAgICAgICAgaWYgKHRoaXMudmlld0N1cnJlbnRJbmRleCA+PSB0aGlzLnZpZXdzQ291bnQpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0N1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTd2l0Y2hlcyB0byB0aGUgc2xpZGUgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGRvdCBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBkb3QgSFRNTEVsZW1lbnQgY29ycmVzcG9uZGluZyB0byB0aGUgbmV3IHRhcmdldCBzbGlkZSB0aGF0IGhhcyB0byBiZSBsb2FkZWQuXG4gICAgICovXG4gICAgbG9hZFZpZXdJbmRleEZyb21Eb3QoZG90OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZpZXdDdXJyZW50SW5kZXggPSB0aGlzLmRvdHMuaW5kZXhPZihkb3QpO1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXdDdXJyZW50SW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdDdXJyZW50SW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgc2xpZGluZyBvZiBzbGlkZXIgaXRlbXMuXG4gICAgICovXG4gICAgc2xpZGUoKTogdm9pZCB7XG4gICAgICAgIGxldCBzbGlkZXNUb1NsaWRlID0gdGhpcy5zbGlkZXNUb1Njcm9sbCAqIHRoaXMudmlld0N1cnJlbnRJbmRleDtcblxuICAgICAgICBpZiAodGhpcy5zbGlkZXNUb1Njcm9sbCArIHNsaWRlc1RvU2xpZGUgPiB0aGlzLnNsaWRlc0NvdW50KSB7XG4gICAgICAgICAgICBzbGlkZXNUb1NsaWRlID0gc2xpZGVzVG9TbGlkZSAtICh0aGlzLnNsaWRlc0NvdW50IC0gc2xpZGVzVG9TbGlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvZmZzZXQgPSAtKHNsaWRlc1RvU2xpZGUgKiB0aGlzLnNsaWRlV2lkdGgpO1xuICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke29mZnNldH0lKWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB0aGUgYWN0aXZlIGNsYXNzIGFuZCB0aGUgbW9kaWZpZXIgb24gdGhlIGN1cnJlbnQgZG90LlxuICAgICAqL1xuICAgIHVwZGF0ZUN1cnJlbnREb3QoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRvdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoYC4ke3RoaXMuZG90U2VsZWN0b3J9LiR7dGhpcy5kb3RDdXJyZW50TW9kaWZpZXJ9YCkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmRvdEN1cnJlbnRNb2RpZmllcik7XG5cbiAgICAgICAgdGhpcy5kb3RzW3RoaXMudmlld0N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LmFkZCh0aGlzLmRvdEN1cnJlbnRNb2RpZmllcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIHNsaWRlcyB0byBiZSBzaG93bi5cbiAgICAgKi9cbiAgICBnZXQgc2xpZGVzVG9TaG93KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnc2xpZGVzLXRvLXNob3cnKSB8fCAnMCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBzbGlkZXMgdG8gYmUgc2Nyb2xsZWQgYnkgYW4gaW50ZXJhY3Rpb24uXG4gICAgICovXG4gICAgZ2V0IHNsaWRlc1RvU2Nyb2xsKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnc2xpZGVzLXRvLXNjcm9sbCcpIHx8ICcwJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==