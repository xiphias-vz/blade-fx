(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["simple-carousel"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvc2ltcGxlLWNhcm91c2VsL3NpbXBsZS1jYXJvdXNlbC50cyJdLCJuYW1lcyI6WyJTaW1wbGVDYXJvdXNlbCIsImRvdFNlbGVjdG9yIiwianNOYW1lIiwiZG90Q3VycmVudE1vZGlmaWVyIiwibmFtZSIsInJlYWR5Q2FsbGJhY2siLCJzbGlkZXNDb3VudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJsZW5ndGgiLCJ0cmlnZ2VyUHJldiIsInRyaWdnZXJOZXh0Iiwic2xpZGVyIiwic2xpZGVXaWR0aCIsImZ1bGxTbGlkZXJXaWR0aCIsInNsaWRlc1RvU2hvdyIsImRvdHMiLCJBcnJheSIsImZyb20iLCJ2aWV3c0NvdW50IiwiZ2V0Vmlld3NDb3VudCIsIm1hcEV2ZW50cyIsIk1hdGgiLCJjZWlsIiwic2xpZGVzVG9TY3JvbGwiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvblByZXZDbGljayIsIm9uTmV4dENsaWNrIiwiZm9yRWFjaCIsImRvdCIsIm9uRG90Q2xpY2siLCJwcmV2ZW50RGVmYXVsdCIsImxvYWRQcmV2Vmlld0luZGV4Iiwic2xpZGUiLCJ1cGRhdGVDdXJyZW50RG90IiwibG9hZE5leHRWaWV3SW5kZXgiLCJsb2FkVmlld0luZGV4RnJvbURvdCIsInRhcmdldCIsInZpZXdDdXJyZW50SW5kZXgiLCJpbmRleE9mIiwic2xpZGVzVG9TbGlkZSIsIm9mZnNldCIsInN0eWxlIiwidHJhbnNmb3JtIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFFcUJB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QXpCLEVBQTRCO0FBQ3hCO0FBQ0g7O0FBRUQsU0FBS29DLGFBQUwsT0FBdUIsS0FBSzNDLFdBQTVCLFNBQTJDLEtBQUtFLGtCQUFoRCxFQUFzRTBDLFNBQXRFLENBQWdGQyxNQUFoRixDQUF1RixLQUFLM0Msa0JBQTVGO0FBRUEsU0FBS1ksSUFBTCxDQUFVLEtBQUt1QixnQkFBZixFQUFpQ08sU0FBakMsQ0FBMkNFLEdBQTNDLENBQStDLEtBQUs1QyxrQkFBcEQ7QUFDSDtBQUVEOzs7Ozs7O3dCQUcyQjtBQUN2QixhQUFPNkMsUUFBUSxDQUFDLEtBQUtDLFlBQUwsQ0FBa0IsZ0JBQWxCLEtBQXVDLEdBQXhDLENBQWY7QUFDSDtBQUVEOzs7Ozs7d0JBRzZCO0FBQ3pCLGFBQU9ELFFBQVEsQ0FBQyxLQUFLQyxZQUFMLENBQWtCLGtCQUFsQixLQUF5QyxHQUExQyxDQUFmO0FBQ0g7Ozs7RUF6THVDQyx5RCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5zaW1wbGUtY2Fyb3VzZWwubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltcGxlQ2Fyb3VzZWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIFN3aXRjaGVzIGEgc2xpZGUgdG8gYSBwcmV2aW91cyBvbmUuXG4gICAgICovXG4gICAgdHJpZ2dlclByZXY6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogU3dpdGNoZXMgYSBzbGlkZSB0byBhIG5leHQgb25lLlxuICAgICAqL1xuICAgIHRyaWdnZXJOZXh0OiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IHNsaWRlci5cbiAgICAgKi9cbiAgICBzbGlkZXI6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiB0aGUgc2xpZGVzLlxuICAgICAqL1xuICAgIHNsaWRlc0NvdW50OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2xpZGVyIHdpZHRoLlxuICAgICAqL1xuICAgIHNsaWRlV2lkdGg6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRociBkb3Qtc3dpdGNoIGVsZW1lbnRzIGJlbG93IHRoZSBzbGlkZXMuXG4gICAgICovXG4gICAgZG90czogSFRNTEVsZW1lbnRbXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2Ygdmlld3MuXG4gICAgICovXG4gICAgdmlld3NDb3VudDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGluZGV4IG9mIHRoZSBhY3RpdmUgc2xpZGUuXG4gICAgICovXG4gICAgdmlld0N1cnJlbnRJbmRleDogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIERvdCBlbGVtZW50IHNlbGVjdG9yLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGRvdFNlbGVjdG9yOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBEb3QgZWxlbWVudCBcImlzIGN1cnJlbnRcIiBtb2RpZmllci5cbiAgICAgKi9cbiAgICByZWFkb25seSBkb3RDdXJyZW50TW9kaWZpZXI6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgZnVsbFNsaWRlcldpZHRoOiBudW1iZXIgPSAxMDA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmRvdFNlbGVjdG9yID0gYCR7dGhpcy5qc05hbWV9X19kb3RgO1xuICAgICAgICB0aGlzLmRvdEN1cnJlbnRNb2RpZmllciA9IGAke3RoaXMubmFtZX1fX2RvdC0tY3VycmVudGA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2xpZGVzQ291bnQgPSB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zbGlkZWApLmxlbmd0aDtcblxuICAgICAgICBpZiAodGhpcy5zbGlkZXNDb3VudCA8PSAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXJQcmV2ID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3ByZXZgKVswXTtcbiAgICAgICAgdGhpcy50cmlnZ2VyTmV4dCA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19uZXh0YClbMF07XG4gICAgICAgIHRoaXMuc2xpZGVyID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3NsaWRlcmApWzBdO1xuICAgICAgICB0aGlzLnNsaWRlV2lkdGggPSB0aGlzLmZ1bGxTbGlkZXJXaWR0aCAvIHRoaXMuc2xpZGVzVG9TaG93O1xuICAgICAgICB0aGlzLmRvdHMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmRvdFNlbGVjdG9yKSk7XG4gICAgICAgIHRoaXMudmlld3NDb3VudCA9IHRoaXMuZ2V0Vmlld3NDb3VudCgpO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIHNsaWRlcy5cbiAgICAgKi9cbiAgICBnZXRWaWV3c0NvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoKHRoaXMuc2xpZGVzQ291bnQgLSB0aGlzLnNsaWRlc1RvU2hvdykgLyB0aGlzLnNsaWRlc1RvU2Nyb2xsKSArIDE7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyUHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMub25QcmV2Q2xpY2soZXZlbnQpKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMub25OZXh0Q2xpY2soZXZlbnQpKTtcbiAgICAgICAgdGhpcy5kb3RzLmZvckVhY2goKGRvdDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGRvdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMub25Eb3RDbGljayhldmVudCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25QcmV2Q2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMubG9hZFByZXZWaWV3SW5kZXgoKTtcbiAgICAgICAgdGhpcy5zbGlkZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnREb3QoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25OZXh0Q2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMubG9hZE5leHRWaWV3SW5kZXgoKTtcbiAgICAgICAgdGhpcy5zbGlkZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnREb3QoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Eb3RDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5sb2FkVmlld0luZGV4RnJvbURvdCg8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgdGhpcy5zbGlkZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnREb3QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTd2l0Y2hlcyB0aGUgY3VycmVudCBzbGlkZSB0byB0aGUgcHJldmlvdXMgb25lLlxuICAgICAqL1xuICAgIGxvYWRQcmV2Vmlld0luZGV4KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZpZXdDdXJyZW50SW5kZXggPSB0aGlzLnZpZXdDdXJyZW50SW5kZXggLSAxO1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXdDdXJyZW50SW5kZXggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdDdXJyZW50SW5kZXggPSB0aGlzLnZpZXdzQ291bnQgLSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3dpdGNoZXMgdGhlIGN1cnJlbnQgc2xpZGUgdG8gdGhlIG5leHQgb25lLlxuICAgICAqL1xuICAgIGxvYWROZXh0Vmlld0luZGV4KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZpZXdDdXJyZW50SW5kZXggPSB0aGlzLnZpZXdDdXJyZW50SW5kZXggKyAxO1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXdDdXJyZW50SW5kZXggPj0gdGhpcy52aWV3c0NvdW50KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdDdXJyZW50SW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3dpdGNoZXMgdG8gdGhlIHNsaWRlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBkb3QgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gZG90IEhUTUxFbGVtZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIG5ldyB0YXJnZXQgc2xpZGUgdGhhdCBoYXMgdG8gYmUgbG9hZGVkLlxuICAgICAqL1xuICAgIGxvYWRWaWV3SW5kZXhGcm9tRG90KGRvdDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52aWV3Q3VycmVudEluZGV4ID0gdGhpcy5kb3RzLmluZGV4T2YoZG90KTtcblxuICAgICAgICBpZiAodGhpcy52aWV3Q3VycmVudEluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy52aWV3Q3VycmVudEluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHNsaWRpbmcgb2Ygc2xpZGVyIGl0ZW1zLlxuICAgICAqL1xuICAgIHNsaWRlKCk6IHZvaWQge1xuICAgICAgICBsZXQgc2xpZGVzVG9TbGlkZSA9IHRoaXMuc2xpZGVzVG9TY3JvbGwgKiB0aGlzLnZpZXdDdXJyZW50SW5kZXg7XG5cbiAgICAgICAgaWYgKHRoaXMuc2xpZGVzVG9TY3JvbGwgKyBzbGlkZXNUb1NsaWRlID4gdGhpcy5zbGlkZXNDb3VudCkge1xuICAgICAgICAgICAgc2xpZGVzVG9TbGlkZSA9IHNsaWRlc1RvU2xpZGUgLSAodGhpcy5zbGlkZXNDb3VudCAtIHNsaWRlc1RvU2xpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gLShzbGlkZXNUb1NsaWRlICogdGhpcy5zbGlkZVdpZHRoKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtvZmZzZXR9JSlgO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIGFjdGl2ZSBjbGFzcyBhbmQgdGhlIG1vZGlmaWVyIG9uIHRoZSBjdXJyZW50IGRvdC5cbiAgICAgKi9cbiAgICB1cGRhdGVDdXJyZW50RG90KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kb3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5xdWVyeVNlbGVjdG9yKGAuJHt0aGlzLmRvdFNlbGVjdG9yfS4ke3RoaXMuZG90Q3VycmVudE1vZGlmaWVyfWApLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kb3RDdXJyZW50TW9kaWZpZXIpO1xuXG4gICAgICAgIHRoaXMuZG90c1t0aGlzLnZpZXdDdXJyZW50SW5kZXhdLmNsYXNzTGlzdC5hZGQodGhpcy5kb3RDdXJyZW50TW9kaWZpZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBzbGlkZXMgdG8gYmUgc2hvd24uXG4gICAgICovXG4gICAgZ2V0IHNsaWRlc1RvU2hvdygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3NsaWRlcy10by1zaG93JykgfHwgJzAnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2Ygc2xpZGVzIHRvIGJlIHNjcm9sbGVkIGJ5IGFuIGludGVyYWN0aW9uLlxuICAgICAqL1xuICAgIGdldCBzbGlkZXNUb1Njcm9sbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3NsaWRlcy10by1zY3JvbGwnKSB8fCAnMCcpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=