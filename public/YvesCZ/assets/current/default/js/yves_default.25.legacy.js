(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[25],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/image-animation/image-animation.ts":
/*!***************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/image-animation/image-animation.ts ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ImageAnimation; });
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



var ImageAnimation = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(ImageAnimation, _Component);

  var _super = _createSuper(ImageAnimation);

  function ImageAnimation() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "links", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "clonedImages", []);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "body", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "start", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "animationDuration", 1000);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "percent", 100);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "exponent", 2);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "cartLinks", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "cartLinkCoordinates", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "environment", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "url", void 0);

    return _this;
  }

  var _proto = ImageAnimation.prototype;

  _proto.readyCallback = function readyCallback() {
    var _this2 = this;

    this.environment = document.querySelector('#environment');
    this.url = location.href;

    if (this.environment.value === 'DE') {
      var checkRecordsAreRendered = setInterval(function () {
        _this2.links = Array.from(document.getElementsByClassName(_this2.linksClass));

        if (_this2.links.length > 0) {
          _this2.load();

          _this2.listenForUrlChanges();

          clearInterval(checkRecordsAreRendered);
        }
      }, 500);
    } else {
      this.loadDOM();
    }
  };

  _proto.listenForUrlChanges = function listenForUrlChanges() {
    var _this3 = this;

    setInterval(function () {
      if (_this3.url != location.href) {
        _this3.url = location.href;

        _this3.loadDOM();
      }
    }, 500);
  };

  _proto.loadDOM = function loadDOM() {
    this.links = Array.from(document.getElementsByClassName(this.linksClass));

    if (this.links.length > 0) {
      this.load();
    }
  };

  _proto.load = function load() {
    this.body = document.getElementsByTagName('body')[0];
    this.cartLinks = Array.from(document.getElementsByClassName('cart-link'));
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this4 = this;

    this.links.forEach(function (link) {
      if (link.getAttribute('animation') !== "1") {
        link.addEventListener('click', function (event) {
          return _this4.clickTrigger(event, link);
        });
        link.setAttribute('animation', '1');
      }
    });
    window.addEventListener('scroll', function () {
      _this4.cartCoordinates();
    });
  };

  _proto.clickTrigger = function clickTrigger(event, link) {
    this.startImageAnimation(this.imageClass(link));
  };

  _proto.startImageAnimation = function startImageAnimation(imageClass) {
    var _this5 = this;

    var image = document.getElementsByClassName(imageClass)[0];
    var imageCoordinates = image.getBoundingClientRect();
    var clonedImage = image.cloneNode(true);
    clonedImage.className = this.name + "__image";
    clonedImage.style.cssText = "\n            top: " + (imageCoordinates.top + pageYOffset) + "px;\n            left: " + (imageCoordinates.left + pageXOffset) + "px;\n            width: " + imageCoordinates.width + "px;\n        ";
    this.clonedImages.push({
      id: this.clonedImages.length ? this.clonedImages[this.clonedImages.length - 1].id + 1 : 1,
      element: clonedImage,
      animationStarted: performance.now(),
      coordinates: imageCoordinates
    });
    this.cartCoordinates();
    this.body.appendChild(clonedImage);
    requestAnimationFrame(function (time) {
      return _this5.animateImage(time);
    });
  };

  _proto.animateImage = function animateImage(time) {
    var _this6 = this;

    if (!this.clonedImages.length) {
      return;
    }

    this.moveImages(time);
    /* tslint:disable: no-shadowed-variable*/

    requestAnimationFrame(function (time) {
      return _this6.animateImage(time);
    });
    /* tslint:enable: no-shadowed-variable */
  };

  _proto.moveImages = function moveImages(time) {
    var _this7 = this;

    this.clonedImages.forEach(function (image) {
      var timeFraction = (time - image.animationStarted) / _this7.animationDuration;
      var progress = Math.pow(timeFraction, _this7.exponent);
      var percentageProgress = progress * _this7.percent;
      var topDistance = image.coordinates.top + pageYOffset - (_this7.cartLinkCoordinates.top + pageYOffset);
      var progressTopDistance = topDistance * percentageProgress / _this7.percent;
      var newTopDistance = image.coordinates.top + pageYOffset - progressTopDistance;
      var leftDistance = image.coordinates.left + pageXOffset - (_this7.cartLinkCoordinates.left + pageXOffset);
      var progressLeftDistance = leftDistance * percentageProgress / _this7.percent;
      var newLeftDistance = image.coordinates.left + pageXOffset - progressLeftDistance;
      var widthDistance = image.coordinates.width - _this7.cartLinkCoordinates.width;
      var progressWidthDistance = widthDistance * percentageProgress / _this7.percent;
      image.element.style.top = newTopDistance + "px";
      image.element.style.left = newLeftDistance + "px";
      image.element.style.width = image.coordinates.width - progressWidthDistance + "px";

      if (percentageProgress > _this7.percent) {
        var index = _this7.clonedImages.indexOf(image);

        _this7.clonedImages.splice(index, 1);

        image.element.parentNode.removeChild(image.element);
      }
    });
  };

  _proto.cartCoordinates = function cartCoordinates() {
    var _this8 = this;

    this.cartLinks.forEach(function (link) {
      if (link.offsetParent !== null) {
        _this8.cartLinkCoordinates = link.getBoundingClientRect();
      }
    });
  };

  _proto.imageClass = function imageClass(link) {
    var productId = link.dataset.productId.replaceAll('\n', '').trim();
    return this.jsName + "__image-" + productId;
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(ImageAnimation, [{
    key: "linksClass",
    get: function get() {
      return this.jsName + "__link";
    }
  }]);

  return ImageAnimation;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvaW1hZ2UtYW5pbWF0aW9uL2ltYWdlLWFuaW1hdGlvbi50cyJdLCJuYW1lcyI6WyJJbWFnZUFuaW1hdGlvbiIsInJlYWR5Q2FsbGJhY2siLCJlbnZpcm9ubWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInVybCIsImxvY2F0aW9uIiwiaHJlZiIsInZhbHVlIiwiY2hlY2tSZWNvcmRzQXJlUmVuZGVyZWQiLCJzZXRJbnRlcnZhbCIsImxpbmtzIiwiQXJyYXkiLCJmcm9tIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImxpbmtzQ2xhc3MiLCJsZW5ndGgiLCJsb2FkIiwibGlzdGVuRm9yVXJsQ2hhbmdlcyIsImNsZWFySW50ZXJ2YWwiLCJsb2FkRE9NIiwiYm9keSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2FydExpbmtzIiwibWFwRXZlbnRzIiwiZm9yRWFjaCIsImxpbmsiLCJnZXRBdHRyaWJ1dGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjbGlja1RyaWdnZXIiLCJzZXRBdHRyaWJ1dGUiLCJ3aW5kb3ciLCJjYXJ0Q29vcmRpbmF0ZXMiLCJzdGFydEltYWdlQW5pbWF0aW9uIiwiaW1hZ2VDbGFzcyIsImltYWdlIiwiaW1hZ2VDb29yZGluYXRlcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsb25lZEltYWdlIiwiY2xvbmVOb2RlIiwiY2xhc3NOYW1lIiwibmFtZSIsInN0eWxlIiwiY3NzVGV4dCIsInRvcCIsInBhZ2VZT2Zmc2V0IiwibGVmdCIsInBhZ2VYT2Zmc2V0Iiwid2lkdGgiLCJjbG9uZWRJbWFnZXMiLCJwdXNoIiwiaWQiLCJlbGVtZW50IiwiYW5pbWF0aW9uU3RhcnRlZCIsInBlcmZvcm1hbmNlIiwibm93IiwiY29vcmRpbmF0ZXMiLCJhcHBlbmRDaGlsZCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInRpbWUiLCJhbmltYXRlSW1hZ2UiLCJtb3ZlSW1hZ2VzIiwidGltZUZyYWN0aW9uIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJwcm9ncmVzcyIsIk1hdGgiLCJwb3ciLCJleHBvbmVudCIsInBlcmNlbnRhZ2VQcm9ncmVzcyIsInBlcmNlbnQiLCJ0b3BEaXN0YW5jZSIsImNhcnRMaW5rQ29vcmRpbmF0ZXMiLCJwcm9ncmVzc1RvcERpc3RhbmNlIiwibmV3VG9wRGlzdGFuY2UiLCJsZWZ0RGlzdGFuY2UiLCJwcm9ncmVzc0xlZnREaXN0YW5jZSIsIm5ld0xlZnREaXN0YW5jZSIsIndpZHRoRGlzdGFuY2UiLCJwcm9ncmVzc1dpZHRoRGlzdGFuY2UiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJvZmZzZXRQYXJlbnQiLCJwcm9kdWN0SWQiLCJkYXRhc2V0IiwicmVwbGFjZUFsbCIsInRyaW0iLCJqc05hbWUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQVNxQkEsYzs7Ozs7Ozs7Ozs7Ozs7Ozs2TEFFdUIsRTs7Ozs7O2tNQUdGLEk7O3dMQUNWLEc7O3lMQUNDLEM7Ozs7Ozs7Ozs7Ozs7OztTQU1uQkMsYSxHQUFWLHlCQUFnQztBQUFBOztBQUM1QixTQUFLQyxXQUFMLEdBQW1CQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBbkI7QUFDQSxTQUFLQyxHQUFMLEdBQVdDLFFBQVEsQ0FBQ0MsSUFBcEI7O0FBRUEsUUFBSSxLQUFLTCxXQUFMLENBQWlCTSxLQUFqQixLQUEyQixJQUEvQixFQUFxQztBQUNqQyxVQUFJQyx1QkFBdUIsR0FBR0MsV0FBVyxDQUFDLFlBQU07QUFDNUMsY0FBSSxDQUFDQyxLQUFMLEdBQWdDQyxLQUFLLENBQUNDLElBQU4sQ0FBV1YsUUFBUSxDQUFDVyxzQkFBVCxDQUFnQyxNQUFJLENBQUNDLFVBQXJDLENBQVgsQ0FBaEM7O0FB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MEI4QixxQkFBekQ7O0FBRUEsVUFBSVYsa0JBQWtCLEdBQUcsTUFBSSxDQUFDQyxPQUE5QixFQUF1QztBQUNuQyxZQUFNVSxLQUFLLEdBQUcsTUFBSSxDQUFDOUIsWUFBTCxDQUFrQitCLE9BQWxCLENBQTBCN0MsS0FBMUIsQ0FBZDs7QUFFQSxjQUFJLENBQUNjLFlBQUwsQ0FBa0JnQyxNQUFsQixDQUF5QkYsS0FBekIsRUFBZ0MsQ0FBaEM7O0FBQ0E1QyxhQUFLLENBQUNpQixPQUFOLENBQWM4QixVQUFkLENBQXlCQyxXQUF6QixDQUFxQ2hELEtBQUssQ0FBQ2lCLE9BQTNDO0FBQ0g7QUFDSixLQTFCRDtBQTJCSCxHOztTQUVTcEIsZSxHQUFWLDJCQUFrQztBQUFBOztBQUM5QixTQUFLVixTQUFMLENBQWVFLE9BQWYsQ0FBdUIsVUFBQ0MsSUFBRCxFQUF1QjtBQUMxQyxVQUFJQSxJQUFJLENBQUMyRCxZQUFMLEtBQXNCLElBQTFCLEVBQWdDO0FBQzVCLGNBQUksQ0FBQ2IsbUJBQUwsR0FBb0M5QyxJQUFJLENBQUNZLHFCQUFMLEVBQXBDO0FBQ0g7QUFDSixLQUpEO0FBS0gsRzs7U0FFU0gsVSxHQUFWLG9CQUFxQlQsSUFBckIsRUFBb0Q7QUFDaEQsUUFBSTRELFNBQVMsR0FBRzVELElBQUksQ0FBQzZELE9BQUwsQ0FBYUQsU0FBYixDQUF1QkUsVUFBdkIsQ0FBa0MsSUFBbEMsRUFBd0MsRUFBeEMsRUFBNENDLElBQTVDLEVBQWhCO0FBQ0EsV0FBVSxLQUFLQyxNQUFmLGdCQUFnQ0osU0FBaEM7QUFDSCxHOzs7O3dCQUVrQztBQUMvQixhQUFVLEtBQUtJLE1BQWY7QUFDSDs7OztFQXpKdUNDLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjI1LmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5pbnRlcmZhY2UgQ2xvbmVkSW1hZ2Uge1xuICAgIGlkOiBudW1iZXI7XG4gICAgZWxlbWVudDogSFRNTEltYWdlRWxlbWVudDtcbiAgICBjb29yZGluYXRlczogRE9NUmVjdDtcbiAgICBhbmltYXRpb25TdGFydGVkOiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlQW5pbWF0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgbGlua3M6IEhUTUxMaW5rRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBjbG9uZWRJbWFnZXM6IENsb25lZEltYWdlW10gPSBbXTtcbiAgICBwcm90ZWN0ZWQgYm9keTogSFRNTEJvZHlFbGVtZW50O1xuICAgIHByb3RlY3RlZCBzdGFydDogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBhbmltYXRpb25EdXJhdGlvbjogbnVtYmVyID0gMTAwMDtcbiAgICBwcm90ZWN0ZWQgcGVyY2VudDogbnVtYmVyID0gMTAwO1xuICAgIHByb3RlY3RlZCBleHBvbmVudDogbnVtYmVyID0gMjtcbiAgICBwcm90ZWN0ZWQgY2FydExpbmtzOiBIVE1MRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBjYXJ0TGlua0Nvb3JkaW5hdGVzOiBET01SZWN0O1xuICAgIHByaXZhdGUgZW52aXJvbm1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSB1cmw6IHN0cmluZztcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVudmlyb25tZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Vudmlyb25tZW50Jyk7XG4gICAgICAgIHRoaXMudXJsID0gbG9jYXRpb24uaHJlZjtcblxuICAgICAgICBpZiAodGhpcy5lbnZpcm9ubWVudC52YWx1ZSA9PT0gJ0RFJykge1xuICAgICAgICAgICAgbGV0IGNoZWNrUmVjb3Jkc0FyZVJlbmRlcmVkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGlua3MgPSA8SFRNTExpbmtFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMubGlua3NDbGFzcykpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMubGlua3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5Gb3JVcmxDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY2hlY2tSZWNvcmRzQXJlUmVuZGVyZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRET00oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBsaXN0ZW5Gb3JVcmxDaGFuZ2VzKCkge1xuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy51cmwgIT0gbG9jYXRpb24uaHJlZilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVybCA9IGxvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRE9NKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxvYWRET00oKSB7XG4gICAgICAgIHRoaXMubGlua3MgPSA8SFRNTExpbmtFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMubGlua3NDbGFzcykpO1xuICAgICAgICBpZiAodGhpcy5saW5rcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBsb2FkKCkge1xuICAgICAgICB0aGlzLmJvZHkgPSA8SFRNTEJvZHlFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgICAgIHRoaXMuY2FydExpbmtzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjYXJ0LWxpbmsnKSk7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5rcy5mb3JFYWNoKChsaW5rOiBIVE1MTGlua0VsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChsaW5rLmdldEF0dHJpYnV0ZSgnYW5pbWF0aW9uJykgIT09IFwiMVwiKSB7XG4gICAgICAgICAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMuY2xpY2tUcmlnZ2VyKGV2ZW50LCBsaW5rKSk7XG4gICAgICAgICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2FuaW1hdGlvbicsICcxJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhcnRDb29yZGluYXRlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2xpY2tUcmlnZ2VyKGV2ZW50OiBFdmVudCwgbGluazogSFRNTExpbmtFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhcnRJbWFnZUFuaW1hdGlvbih0aGlzLmltYWdlQ2xhc3MobGluaykpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzdGFydEltYWdlQW5pbWF0aW9uKGltYWdlQ2xhc3M6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBpbWFnZSA9IDxIVE1MSW1hZ2VFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoaW1hZ2VDbGFzcylbMF07XG4gICAgICAgIGNvbnN0IGltYWdlQ29vcmRpbmF0ZXMgPSA8RE9NUmVjdD5pbWFnZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgY2xvbmVkSW1hZ2UgPSA8SFRNTEltYWdlRWxlbWVudD5pbWFnZS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgICAgY2xvbmVkSW1hZ2UuY2xhc3NOYW1lID0gYCR7dGhpcy5uYW1lfV9faW1hZ2VgO1xuICAgICAgICBjbG9uZWRJbWFnZS5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgICAgICAgdG9wOiAke2ltYWdlQ29vcmRpbmF0ZXMudG9wICsgcGFnZVlPZmZzZXR9cHg7XG4gICAgICAgICAgICBsZWZ0OiAke2ltYWdlQ29vcmRpbmF0ZXMubGVmdCArIHBhZ2VYT2Zmc2V0fXB4O1xuICAgICAgICAgICAgd2lkdGg6ICR7aW1hZ2VDb29yZGluYXRlcy53aWR0aH1weDtcbiAgICAgICAgYDtcblxuICAgICAgICB0aGlzLmNsb25lZEltYWdlcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmNsb25lZEltYWdlcy5sZW5ndGggPyB0aGlzLmNsb25lZEltYWdlc1t0aGlzLmNsb25lZEltYWdlcy5sZW5ndGggLSAxXS5pZCArIDEgOiAxLFxuICAgICAgICAgICAgZWxlbWVudDogY2xvbmVkSW1hZ2UsXG4gICAgICAgICAgICBhbmltYXRpb25TdGFydGVkOiBwZXJmb3JtYW5jZS5ub3coKSxcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBpbWFnZUNvb3JkaW5hdGVzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FydENvb3JkaW5hdGVzKCk7XG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZChjbG9uZWRJbWFnZSk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZTogbnVtYmVyKSA9PiB0aGlzLmFuaW1hdGVJbWFnZSh0aW1lKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFuaW1hdGVJbWFnZSh0aW1lOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmNsb25lZEltYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW92ZUltYWdlcyh0aW1lKTtcblxuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogbm8tc2hhZG93ZWQtdmFyaWFibGUqL1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWU6IG51bWJlcikgPT4gdGhpcy5hbmltYXRlSW1hZ2UodGltZSkpO1xuICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOiBuby1zaGFkb3dlZC12YXJpYWJsZSAqL1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtb3ZlSW1hZ2VzKHRpbWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmNsb25lZEltYWdlcy5mb3JFYWNoKChpbWFnZTogQ2xvbmVkSW1hZ2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVGcmFjdGlvbiA9ICh0aW1lIC0gaW1hZ2UuYW5pbWF0aW9uU3RhcnRlZCkgLyB0aGlzLmFuaW1hdGlvbkR1cmF0aW9uO1xuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLnBvdyh0aW1lRnJhY3Rpb24sIHRoaXMuZXhwb25lbnQpO1xuICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZVByb2dyZXNzID0gcHJvZ3Jlc3MgKiB0aGlzLnBlcmNlbnQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHRvcERpc3RhbmNlID0gKGltYWdlLmNvb3JkaW5hdGVzLnRvcCArIHBhZ2VZT2Zmc2V0KSAtICh0aGlzLmNhcnRMaW5rQ29vcmRpbmF0ZXMudG9wICsgcGFnZVlPZmZzZXQpO1xuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NUb3BEaXN0YW5jZSA9ICh0b3BEaXN0YW5jZSAqIHBlcmNlbnRhZ2VQcm9ncmVzcykgLyB0aGlzLnBlcmNlbnQ7XG4gICAgICAgICAgICBjb25zdCBuZXdUb3BEaXN0YW5jZSA9IChpbWFnZS5jb29yZGluYXRlcy50b3AgKyBwYWdlWU9mZnNldCkgLSBwcm9ncmVzc1RvcERpc3RhbmNlO1xuXG4gICAgICAgICAgICBjb25zdCBsZWZ0RGlzdGFuY2UgPSAoaW1hZ2UuY29vcmRpbmF0ZXMubGVmdCArIHBhZ2VYT2Zmc2V0KSAtICh0aGlzLmNhcnRMaW5rQ29vcmRpbmF0ZXMubGVmdCArIHBhZ2VYT2Zmc2V0KTtcbiAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzTGVmdERpc3RhbmNlID0gKGxlZnREaXN0YW5jZSAqIHBlcmNlbnRhZ2VQcm9ncmVzcykgLyB0aGlzLnBlcmNlbnQ7XG4gICAgICAgICAgICBjb25zdCBuZXdMZWZ0RGlzdGFuY2UgPSAoaW1hZ2UuY29vcmRpbmF0ZXMubGVmdCArIHBhZ2VYT2Zmc2V0KSAtIHByb2dyZXNzTGVmdERpc3RhbmNlO1xuXG4gICAgICAgICAgICBjb25zdCB3aWR0aERpc3RhbmNlID0gaW1hZ2UuY29vcmRpbmF0ZXMud2lkdGggLSB0aGlzLmNhcnRMaW5rQ29vcmRpbmF0ZXMud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzc1dpZHRoRGlzdGFuY2UgPSAod2lkdGhEaXN0YW5jZSAqIHBlcmNlbnRhZ2VQcm9ncmVzcykgLyB0aGlzLnBlcmNlbnQ7XG5cbiAgICAgICAgICAgIGltYWdlLmVsZW1lbnQuc3R5bGUudG9wID0gYCR7bmV3VG9wRGlzdGFuY2V9cHhgO1xuICAgICAgICAgICAgaW1hZ2UuZWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7bmV3TGVmdERpc3RhbmNlfXB4YDtcbiAgICAgICAgICAgIGltYWdlLmVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHtpbWFnZS5jb29yZGluYXRlcy53aWR0aCAtIHByb2dyZXNzV2lkdGhEaXN0YW5jZX1weGA7XG5cbiAgICAgICAgICAgIGlmIChwZXJjZW50YWdlUHJvZ3Jlc3MgPiB0aGlzLnBlcmNlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY2xvbmVkSW1hZ2VzLmluZGV4T2YoaW1hZ2UpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9uZWRJbWFnZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBpbWFnZS5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW1hZ2UuZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjYXJ0Q29vcmRpbmF0ZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FydExpbmtzLmZvckVhY2goKGxpbms6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAobGluay5vZmZzZXRQYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRMaW5rQ29vcmRpbmF0ZXMgPSA8RE9NUmVjdD5saW5rLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW1hZ2VDbGFzcyhsaW5rOiBIVE1MTGlua0VsZW1lbnQpOiBzdHJpbmcge1xuICAgICAgICBsZXQgcHJvZHVjdElkID0gbGluay5kYXRhc2V0LnByb2R1Y3RJZC5yZXBsYWNlQWxsKCdcXG4nLCAnJykudHJpbSgpO1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5qc05hbWV9X19pbWFnZS0ke3Byb2R1Y3RJZH1gO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgbGlua3NDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5qc05hbWV9X19saW5rYDtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9