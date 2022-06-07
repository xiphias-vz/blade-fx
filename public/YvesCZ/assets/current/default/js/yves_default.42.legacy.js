(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[42],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/scroll-parallax/scroll-parallax.ts":
/*!***************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/scroll-parallax/scroll-parallax.ts ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScrollParallax; });
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







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }


var DIRECTIONS = {
  TOP: 'top',
  DOWN: 'down'
};
var THROTTLE_DURATION = 300;

var ScrollParallax = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(ScrollParallax, _Component);

  var _super = _createSuper(ScrollParallax);

  function ScrollParallax() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "target", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "wrapper", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "windowHeight", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "windowWidth", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "wrapperHeight", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "distanceToWrapper", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "initialized", false);

    return _this;
  }

  var _proto = ScrollParallax.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.wrapper = document.getElementsByClassName(this.wrapperClassName)[0];
    this.target = this.wrapper.getElementsByClassName(this.targetClassName)[0];
    this.defineDimensions();
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    window.addEventListener('resize', function () {
      return setTimeout(function () {
        return _this2.defineDimensions();
      }, THROTTLE_DURATION);
    });
    window.addEventListener('scroll', this.checkBreakpointsToScroll.bind(this));
  };

  _proto.defineDimensions = function defineDimensions() {
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
    this.wrapperHeight = this.wrapper.offsetHeight;
    this.distanceToWrapper = this.getDistanceToWrapper();
  };

  _proto.checkBreakpointsToScroll = function checkBreakpointsToScroll() {
    if (!isNaN(this.minBreakPoint) && !isNaN(this.maxBreakPoint)) {
      if (this.minBreakPoint < this.windowWidth && this.maxBreakPoint > this.windowWidth) {
        this.moveTarget();
        return;
      }

      this.cleanOffset();
    }
  };

  _proto.cleanOffset = function cleanOffset() {
    if (this.initialized) {
      this.initialized = false;
      this.target.removeAttribute('style');
    }
  };

  _proto.moveTarget = function moveTarget() {
    var scrollHeight = window.scrollY + this.windowHeight;
    var targetOffset = '';

    if (scrollHeight > this.distanceToWrapper) {
      if (this.motionDirection === DIRECTIONS.TOP) {
        targetOffset = "-" + this.getTargetOffset(scrollHeight);
      }

      if (this.motionDirection === DIRECTIONS.DOWN) {
        targetOffset = this.getTargetOffset(scrollHeight);
      }

      if (targetOffset !== '') {
        this.target.style.transform = "translateY(" + targetOffset + ")";
        this.initialized = true;
      }
    }
  };

  _proto.getTargetOffset = function getTargetOffset(scrollHeight) {
    return (scrollHeight - this.distanceToWrapper) / this.motionRatio + "px";
  };

  _proto.getDistanceToWrapper = function getDistanceToWrapper() {
    var wrapper = this.wrapper;
    var yPosition = 0;

    while (wrapper) {
      yPosition += wrapper.offsetTop - wrapper.scrollTop + wrapper.clientTop;
      wrapper = wrapper.offsetParent;
    }

    return yPosition;
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(ScrollParallax, [{
    key: "wrapperClassName",
    get: function get() {
      return this.getAttribute('wrapper-class-name');
    }
  }, {
    key: "targetClassName",
    get: function get() {
      return this.getAttribute('target-class-name');
    }
  }, {
    key: "motionRatio",
    get: function get() {
      return +this.getAttribute('motion-ratio');
    }
  }, {
    key: "motionDirection",
    get: function get() {
      return this.getAttribute('motion-direction');
    }
  }, {
    key: "minBreakPoint",
    get: function get() {
      return +this.getAttribute('breakpoint-min');
    }
  }, {
    key: "maxBreakPoint",
    get: function get() {
      return +this.getAttribute('breakpoint-max');
    }
  }]);

  return ScrollParallax;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvc2Nyb2xsLXBhcmFsbGF4L3Njcm9sbC1wYXJhbGxheC50cyJdLCJuYW1lcyI6WyJESVJFQ1RJT05TIiwiVE9QIiwiRE9XTiIsIlRIUk9UVExFX0RVUkFUSU9OIiwiU2Nyb2xsUGFyYWxsYXgiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsIndyYXBwZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ3cmFwcGVyQ2xhc3NOYW1lIiwidGFyZ2V0IiwidGFyZ2V0Q2xhc3NOYW1lIiwiZGVmaW5lRGltZW5zaW9ucyIsIm1hcEV2ZW50cyIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRUaW1lb3V0IiwiY2hlY2tCcmVha3BvaW50c1RvU2Nyb2xsIiwiYmluZCIsIndpbmRvd0hlaWdodCIsImlubmVySGVpZ2h0Iiwid2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwid3JhcHBlckhlaWdodCIsIm9mZnNldEhlaWdodCIsImRpc3RhbmNlVG9XcmFwcGVyIiwiZ2V0RGlzdGFuY2VUb1dyYXBwZXIiLCJpc05hTiIsIm1pbkJyZWFrUG9pbnQiLCJtYXhCcmVha1BvaW50IiwibW92ZVRhcmdldCIsImNsZWFuT2Zmc2V0IiwiaW5pdGlhbGl6ZWQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzY3JvbGxIZWlnaHQiLCJzY3JvbGxZIiwidGFyZ2V0T2Zmc2V0IiwibW90aW9uRGlyZWN0aW9uIiwiZ2V0VGFyZ2V0T2Zmc2V0Iiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJtb3Rpb25SYXRpbyIsInlQb3NpdGlvbiIsIm9mZnNldFRvcCIsInNjcm9sbFRvcCIsImNsaWVudFRvcCIsIm9mZnNldFBhcmVudCIsImdldEF0dHJpYnV0ZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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aUJBQXJCLElBQTBDLEtBQUtnQixXQUF6RDtBQUNILEc7O1NBRVNmLG9CLEdBQVYsZ0NBQXlDO0FBQ3JDLFFBQUlwQixPQUFvQixHQUFHLEtBQUtBLE9BQWhDO0FBQ0EsUUFBSW9DLFNBQVMsR0FBRyxDQUFoQjs7QUFFQSxXQUFPcEMsT0FBUCxFQUFnQjtBQUNab0MsZUFBUyxJQUFLcEMsT0FBTyxDQUFDcUMsU0FBUixHQUFvQnJDLE9BQU8sQ0FBQ3NDLFNBQTVCLEdBQXdDdEMsT0FBTyxDQUFDdUMsU0FBOUQ7QUFDQXZDLGFBQU8sR0FBZ0JBLE9BQU8sQ0FBQ3dDLFlBQS9CO0FBQ0g7O0FBRUQsV0FBT0osU0FBUDtBQUNILEc7Ozs7d0JBRXdDO0FBQ3JDLGFBQU8sS0FBS0ssWUFBTCxDQUFrQixvQkFBbEIsQ0FBUDtBQUNIOzs7d0JBRXVDO0FBQ3BDLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixtQkFBbEIsQ0FBUDtBQUNIOzs7d0JBRW1DO0FBQ2hDLGFBQU8sQ0FBQyxLQUFLQSxZQUFMLENBQWtCLGNBQWxCLENBQVI7QUFDSDs7O3dCQUV1QztBQUNwQyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0Isa0JBQWxCLENBQVA7QUFDSDs7O3dCQUVxQztBQUNsQyxhQUFPLENBQUMsS0FBS0EsWUFBTCxDQUFrQixnQkFBbEIsQ0FBUjtBQUNIOzs7d0JBRXFDO0FBQ2xDLGFBQU8sQ0FBQyxLQUFLQSxZQUFMLENBQWtCLGdCQUFsQixDQUFSO0FBQ0g7Ozs7RUF4R3VDQywrRCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC40Mi5sZWdhY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuY29uc3QgRElSRUNUSU9OUyA9IHtcbiAgICBUT1A6ICd0b3AnLFxuICAgIERPV046ICdkb3duJ1xufTtcbmNvbnN0IFRIUk9UVExFX0RVUkFUSU9OID0gMzAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxQYXJhbGxheCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHRhcmdldDogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHdyYXBwZXI6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCB3aW5kb3dIZWlnaHQ6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgd2luZG93V2lkdGg6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgd3JhcHBlckhlaWdodDogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBkaXN0YW5jZVRvV3JhcHBlcjogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMud3JhcHBlciA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMud3JhcHBlckNsYXNzTmFtZSlbMF07XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gPEhUTUxFbGVtZW50PnRoaXMud3JhcHBlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudGFyZ2V0Q2xhc3NOYW1lKVswXTtcbiAgICAgICAgdGhpcy5kZWZpbmVEaW1lbnNpb25zKCk7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kZWZpbmVEaW1lbnNpb25zKCksIFRIUk9UVExFX0RVUkFUSU9OKSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmNoZWNrQnJlYWtwb2ludHNUb1Njcm9sbC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZGVmaW5lRGltZW5zaW9ucygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIHRoaXMud2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy53cmFwcGVySGVpZ2h0ID0gdGhpcy53cmFwcGVyLm9mZnNldEhlaWdodDtcbiAgICAgICAgdGhpcy5kaXN0YW5jZVRvV3JhcHBlciA9IHRoaXMuZ2V0RGlzdGFuY2VUb1dyYXBwZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2hlY2tCcmVha3BvaW50c1RvU2Nyb2xsKCk6IHZvaWQge1xuICAgICAgICBpZiAoIWlzTmFOKHRoaXMubWluQnJlYWtQb2ludCkgJiYgIWlzTmFOKHRoaXMubWF4QnJlYWtQb2ludCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1pbkJyZWFrUG9pbnQgPCB0aGlzLndpbmRvd1dpZHRoICYmIHRoaXMubWF4QnJlYWtQb2ludCA+IHRoaXMud2luZG93V2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUYXJnZXQoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2xlYW5PZmZzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbGVhbk9mZnNldCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBtb3ZlVGFyZ2V0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzY3JvbGxIZWlnaHQ6IG51bWJlciA9IHdpbmRvdy5zY3JvbGxZICsgdGhpcy53aW5kb3dIZWlnaHQ7XG4gICAgICAgIGxldCB0YXJnZXRPZmZzZXQgPSAnJztcblxuICAgICAgICBpZiAoc2Nyb2xsSGVpZ2h0ID4gdGhpcy5kaXN0YW5jZVRvV3JhcHBlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMubW90aW9uRGlyZWN0aW9uID09PSBESVJFQ1RJT05TLlRPUCkge1xuICAgICAgICAgICAgICAgIHRhcmdldE9mZnNldCA9IGAtJHt0aGlzLmdldFRhcmdldE9mZnNldChzY3JvbGxIZWlnaHQpfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5tb3Rpb25EaXJlY3Rpb24gPT09IERJUkVDVElPTlMuRE9XTikge1xuICAgICAgICAgICAgICAgIHRhcmdldE9mZnNldCA9IHRoaXMuZ2V0VGFyZ2V0T2Zmc2V0KHNjcm9sbEhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGFyZ2V0T2Zmc2V0ICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7dGFyZ2V0T2Zmc2V0fSlgO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFRhcmdldE9mZnNldChzY3JvbGxIZWlnaHQ6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHsoc2Nyb2xsSGVpZ2h0IC0gdGhpcy5kaXN0YW5jZVRvV3JhcHBlcikgLyB0aGlzLm1vdGlvblJhdGlvfXB4YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0RGlzdGFuY2VUb1dyYXBwZXIoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHdyYXBwZXI6IEhUTUxFbGVtZW50ID0gdGhpcy53cmFwcGVyO1xuICAgICAgICBsZXQgeVBvc2l0aW9uID0gMDtcblxuICAgICAgICB3aGlsZSAod3JhcHBlcikge1xuICAgICAgICAgICAgeVBvc2l0aW9uICs9ICh3cmFwcGVyLm9mZnNldFRvcCAtIHdyYXBwZXIuc2Nyb2xsVG9wICsgd3JhcHBlci5jbGllbnRUb3ApO1xuICAgICAgICAgICAgd3JhcHBlciA9IDxIVE1MRWxlbWVudD53cmFwcGVyLm9mZnNldFBhcmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB5UG9zaXRpb247XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB3cmFwcGVyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnd3JhcHBlci1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0YXJnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQtY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgbW90aW9uUmF0aW8oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICt0aGlzLmdldEF0dHJpYnV0ZSgnbW90aW9uLXJhdGlvJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBtb3Rpb25EaXJlY3Rpb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdtb3Rpb24tZGlyZWN0aW9uJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBtaW5CcmVha1BvaW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiArdGhpcy5nZXRBdHRyaWJ1dGUoJ2JyZWFrcG9pbnQtbWluJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBtYXhCcmVha1BvaW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiArdGhpcy5nZXRBdHRyaWJ1dGUoJ2JyZWFrcG9pbnQtbWF4Jyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==