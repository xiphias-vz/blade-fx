(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[26],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/lazy-image-ff/lazy-image-ff.ts":
/*!***********************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/lazy-image-ff/lazy-image-ff.ts ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LazyImageFf; });
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



var LazyImageFf = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(LazyImageFf, _Component);

  var _super = _createSuper(LazyImageFf);

  function LazyImageFf() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "image", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "imageSource", void 0);

    return _this;
  }

  var _proto = LazyImageFf.prototype;

  _proto.readyCallback = function readyCallback() {
    this.image = this.getElementsByClassName(this.imageClass)[0];
    this.imageSource = this.image.src;
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    this.removeInvisibleClass();
    this.setCorrectHeightClassForImage(this.imageSource);
  };

  _proto.removeInvisibleClass = function removeInvisibleClass() {
    this.image.classList.remove('is-invisible');
  };

  _proto.setCorrectHeightClassForImage = function setCorrectHeightClassForImage(url) {
    this.getWidthAndHeightOfImageFromSrcUrl(url);
  };

  _proto.getWidthAndHeightOfImageFromSrcUrl = function getWidthAndHeightOfImageFromSrcUrl(url) {
    var img = new Image();
    var self = this;
    img.addEventListener("load", function () {
      if (this.width !== this.height) {
        self.removeDefaultHeightAttribute(this.height, this.width);
      }
    });
    img.src = url;
  };

  _proto.removeDefaultHeightAttribute = function removeDefaultHeightAttribute(height, width) {
    if (width > height) {
      this.image.parentElement.classList.remove('lazy-image');
    }

    this.image.classList.remove('js-lazy-image__content');
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(LazyImageFf, [{
    key: "imageClass",
    get: function get() {
      return this.jsName + "__content";
    }
  }]);

  return LazyImageFf;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvbGF6eS1pbWFnZS1mZi9sYXp5LWltYWdlLWZmLnRzIl0sIm5hbWVzIjpbIkxhenlJbWFnZUZmIiwicmVhZHlDYWxsYmFjayIsImltYWdlIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImltYWdlQ2xhc3MiLCJpbWFnZVNvdXJjZSIsInNyYyIsIm1hcEV2ZW50cyIsInJlbW92ZUludmlzaWJsZUNsYXNzIiwic2V0Q29ycmVjdEhlaWdodENsYXNzRm9ySW1hZ2UiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJ1cmwiLCJnZXRXaWR0aEFuZEhlaWdodE9mSW1hZ2VGcm9tU3JjVXJsIiwiaW1nIiwiSW1hZ2UiLCJzZWxmIiwiYWRkRXZlbnRMaXN0ZW5lciIsIndpZHRoIiwiaGVpZ2h0IiwicmVtb3ZlRGVmYXVsdEhlaWdodEF0dHJpYnV0ZSIsInBhcmVudEVsZW1lbnQiLCJqc05hbWUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FJUEMsYSxHQUFWLHlCQUFnQztBQUM1QixTQUFLQyxLQUFMLEdBQTBCLEtBQUtDLHNCQUFMLENBQTRCLEtBQUtDLFVBQWpDLEVBQTZDLENBQTdDLENBQTFCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixLQUFLSCxLQUFMLENBQVdJLEdBQTlCO0FBQ0EsU0FBS0MsU0FBTDtBQUNILEc7O1NBRVNBLFMsR0FBVixxQkFBNEI7QUFDeEIsU0FBS0Msb0JBQUw7QUFDQSxTQUFLQyw2QkFBTCxDQUFtQyxLQUFLSixXQUF4QztBQUVILEc7O1NBRVNHLG9CLEdBQVYsZ0NBQXVDO0FBQ25DLFNBQUtOLEtBQUwsQ0FBV1EsU0FBWCxDQUFxQkMsTUFBckIsQ0FBNEIsY0FBNUI7QUFDSCxHOztTQUVTRiw2QixHQUFWLHVDQUF3Q0csR0FBeEMsRUFDQTtBQUNJLFNBQUtDLGtDQUFMLENBQXdDRCxHQUF4QztBQUNILEc7O1NBRVNDLGtDLEdBQVYsNENBQTZDRCxHQUE3QyxFQUNBO0FBQ0ksUUFBSUUsR0FBRyxHQUFHLElBQUlDLEtBQUosRUFBVjtBQUNBLFFBQUlDLElBQUksR0FBRyxJQUFYO0FBQ0FGLE9BQUcsQ0FBQ0csZ0JBQUosQ0FBcUIsTUFBckIsRUFBNkIsWUFBVztBQUNwQyxVQUFJLEtBQUtDLEtBQUwsS0FBZSxLQUFLQyxNQUF4QixFQUErQjtBQUMxQkgsWUFBSSxDQUFDSSw0QkFBTCxDQUFrQyxLQUFLRCxNQUF2QyxFQUErQyxLQUFLRCxLQUFwRDtBQUNKO0FBQ0osS0FKRDtBQUtBSixPQUFHLENBQUNSLEdBQUosR0FBVU0sR0FBVjtBQUNILEc7O1NBRVNRLDRCLEdBQVYsc0NBQXVDRCxNQUF2QyxFQUF1REQsS0FBdkQsRUFBMkU7QUFDdkUsUUFBR0EsS0FBSyxHQUFHQyxNQUFYLEVBQ0E7QUFDSSxXQUFLakIsS0FBTCxDQUFXbUIsYUFBWCxDQUF5QlgsU0FBekIsQ0FBbUNDLE1BQW5DLENBQTBDLFlBQTFDO0FBQ0g7O0FBQ0QsU0FBS1QsS0FBTCxDQUFXUSxTQUFYLENBQXFCQyxNQUFyQixDQUE0Qix3QkFBNUI7QUFDSCxHOzs7O3dCQUVrQztBQUMvQixhQUFVLEtBQUtXLE1BQWY7QUFDSDs7OztFQS9Db0NDLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjI2LmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXp5SW1hZ2VGZiBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIGltYWdlOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgaW1hZ2VTb3VyY2U6IHN0cmluZztcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmltYWdlID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmltYWdlQ2xhc3MpWzBdO1xuICAgICAgICB0aGlzLmltYWdlU291cmNlID0gdGhpcy5pbWFnZS5zcmM7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW1vdmVJbnZpc2libGVDbGFzcygpO1xuICAgICAgICB0aGlzLnNldENvcnJlY3RIZWlnaHRDbGFzc0ZvckltYWdlKHRoaXMuaW1hZ2VTb3VyY2UpO1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZUludmlzaWJsZUNsYXNzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmltYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWludmlzaWJsZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRDb3JyZWN0SGVpZ2h0Q2xhc3NGb3JJbWFnZSh1cmw6IHN0cmluZyk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZ2V0V2lkdGhBbmRIZWlnaHRPZkltYWdlRnJvbVNyY1VybCh1cmwpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRXaWR0aEFuZEhlaWdodE9mSW1hZ2VGcm9tU3JjVXJsKHVybDogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIGlmICh0aGlzLndpZHRoICE9PSB0aGlzLmhlaWdodCl7XG4gICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlRGVmYXVsdEhlaWdodEF0dHJpYnV0ZSh0aGlzLmhlaWdodCwgdGhpcy53aWR0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpbWcuc3JjID0gdXJsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZW1vdmVEZWZhdWx0SGVpZ2h0QXR0cmlidXRlKGhlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyKTogdm9pZHtcbiAgICAgICAgaWYod2lkdGggPiBoZWlnaHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdsYXp5LWltYWdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbWFnZS5jbGFzc0xpc3QucmVtb3ZlKCdqcy1sYXp5LWltYWdlX19jb250ZW50Jyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBpbWFnZUNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmpzTmFtZX1fX2NvbnRlbnRgO1xuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==