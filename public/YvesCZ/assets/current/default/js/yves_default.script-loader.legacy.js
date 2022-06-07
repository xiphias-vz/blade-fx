(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["script-loader"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/script-loader/script-loader.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/script-loader/script-loader.ts ***!
  \***********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScriptLoader; });
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
/* harmony import */ var _app_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../app/logger */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/app/logger.ts");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var EVENT_SCRIPT_LOAD = 'scriptload';
var defaultIgnoredAttributes = ['class', 'data-qa'];
/**
 * @event scriptload An event which is triggered when a script is loaded.
 */

var ScriptLoader = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(ScriptLoader, _Component);

  var _super = _createSuper(ScriptLoader);

  function ScriptLoader() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "head", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "script", void 0);

    return _this;
  }

  var _proto = ScriptLoader.prototype;

  _proto.readyCallback = function readyCallback() {
    this.script = document.querySelector("script[src=\"" + this.src + "\"]");

    if (!!this.script) {
      this.mapEvents();
      Object(_app_logger__WEBPACK_IMPORTED_MODULE_7__["debug"])(this.name + ": \"" + this.src + "\" is already in the DOM");
      return;
    }

    this.head = document.getElementsByTagName('head')[0];
    this.script = document.createElement('script');
    this.mapEvents();
    this.setScriptAttributes();
    this.appendScriptTag();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.script.addEventListener('load', function (event) {
      return _this2.onScriptLoad(event);
    }, {
      once: true
    });
  };

  _proto.onScriptLoad = function onScriptLoad(event) {
    this.dispatchCustomEvent(EVENT_SCRIPT_LOAD);
  };

  _proto.setScriptAttributes = function setScriptAttributes() {
    var _this3 = this;

    Array.prototype.forEach.call(this.attributes, function (attribute) {
      if (!_this3.isAttributeIgnored(attribute.name)) {
        _this3.script.setAttribute(attribute.name, attribute.value);
      }
    });
  };

  _proto.appendScriptTag = function appendScriptTag() {
    this.head.appendChild(this.script);
    Object(_app_logger__WEBPACK_IMPORTED_MODULE_7__["debug"])(this.name + ": \"" + this.src + "\" added to the DOM");
  };

  _proto.isAttributeIgnored = function isAttributeIgnored(attributeName) {
    return this.ignoredAttributes.indexOf(attributeName) !== -1;
  }
  /**
   * Gets the array of ignored attributes that are not copied from the current component
   * to the script tag when created.
   */
  ;

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(ScriptLoader, [{
    key: "ignoredAttributes",
    get: function get() {
      return [].concat(defaultIgnoredAttributes);
    }
    /**
     * Gets if the script already exists in DOM.
     */

  }, {
    key: "isScriptAlreadyInDOM",
    get: function get() {
      return !!document.querySelector("script[src=\"" + this.src + "\"]");
    }
    /**
     * Gets the url endpoint used to load the script.
     */

  }, {
    key: "src",
    get: function get() {
      return this.getAttribute('src');
    }
  }]);

  return ScriptLoader;
}(_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvc2NyaXB0LWxvYWRlci9zY3JpcHQtbG9hZGVyLnRzIl0sIm5hbWVzIjpbIkVWRU5UX1NDUklQVF9MT0FEIiwiZGVmYXVsdElnbm9yZWRBdHRyaWJ1dGVzIiwiU2NyaXB0TG9hZGVyIiwicmVhZHlDYWxsYmFjayIsInNjcmlwdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNyYyIsIm1hcEV2ZW50cyIsImRlYnVnIiwibmFtZSIsImhlYWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRTY3JpcHRBdHRyaWJ1dGVzIiwiYXBwZW5kU2NyaXB0VGFnIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25TY3JpcHRMb2FkIiwib25jZSIsImRpc3BhdGNoQ3VzdG9tRXZlbnQiLCJBcnJheSIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZSIsImlzQXR0cmlidXRlSWdub3JlZCIsInNldEF0dHJpYnV0ZSIsInZhbHVlIiwiYXBwZW5kQ2hpbGQiLCJhdHRyaWJ1dGVOYW1lIiwiaWdub3JlZEF0dHJpYnV0ZXMiLCJpbmRleE9mIiwiZ2V0QXR0cmlidXRlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBLElBQU1BLGlCQUFpQixHQUFHLFlBQTFCO0FBQ0EsSUFBTUMsd0JBQXdCLEdBQUcsQ0FBQyxPQUFELEVBQVUsU0FBVixDQUFqQztBQUVBOzs7O0lBR3FCQyxZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQVdQQyxhLEdBQVYseUJBQWdDO0FBQzVCLFNBQUtDLE1BQUwsR0FBaUNDLFFBQVEsQ0FBQ0MsYUFBVCxtQkFBc0MsS0FBS0MsR0FBM0MsU0FBakM7O0FBRUEsUUFBSSxDQUFDLENBQUMsS0FBS0gsTUFBWCxFQUFtQjtBQUNmLFdBQUtJLFNBQUw7QUFDQUMsK0RBQUssQ0FBSSxLQUFLQyxJQUFULFlBQW1CLEtBQUtILEdBQXhCLDhCQUFMO0FBRUE7QUFDSDs7QUFFRCxTQUFLSSxJQUFMLEdBQTZCTixRQUFRLENBQUNPLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLENBQTdCO0FBQ0EsU0FBS1IsTUFBTCxHQUFpQ0MsUUFBUSxDQUFDUSxhQUFULENBQXVCLFFBQXZCLENBQWpDO0FBRUEsU0FBS0wsU0FBTDtBQUNBLFNBQUtNLG1CQUFMO0FBQ0EsU0FBS0MsZUFBTDtBQUNILEc7O1NBRVNQLFMsR0FBVixxQkFBNEI7QUFBQTs7QUFDeEIsU0FBS0osTUFBTCxDQUFZWSxnQkFBWixDQUE2QixNQUE3QixFQUFxQyxVQUFDQyxLQUFEO0FBQUEsYUFBa0IsTUFBSSxDQUFDQyxZQUFMLENBQWtCRCxLQUFsQixDQUFsQjtBQUFBLEtBQXJDLEVBQWlGO0FBQUVFLFVBQUksRUFBRTtBQUFSLEtBQWpGO0FBQ0gsRzs7U0FFU0QsWSxHQUFWLHNCQUF1QkQsS0FBdkIsRUFBMkM7QUFDdkMsU0FBS0csbUJBQUwsQ0FBeUJwQixpQkFBekI7QUFDSCxHOztTQUVTYyxtQixHQUFWLCtCQUFzQztBQUFBOztBQUNsQ08sU0FBSyxDQUFDQyxTQUFOLENBQWdCQyxPQUFoQixDQUF3QkMsSUFBeEIsQ0FBNkIsS0FBS0MsVUFBbEMsRUFBOEMsVUFBQ0MsU0FBRCxFQUFxQjtBQUMvRCxVQUFJLENBQUMsTUFBSSxDQUFDQyxrQkFBTCxDQUF3QkQsU0FBUyxDQUFDaEIsSUFBbEMsQ0FBTCxFQUE4QztBQUMxQyxjQUFJLENBQUNOLE1BQUwsQ0FBWXdCLFlBQVosQ0FBeUJGLFNBQVMsQ0FBQ2hCLElBQW5DLEVBQXlDZ0IsU0FBUyxDQUFDRyxLQUFuRDtBQUNIO0FBQ0osS0FKRDtBQUtILEc7O1NBRVNkLGUsR0FBViwyQkFBa0M7QUFDOUIsU0FBS0osSUFBTCxDQUFVbUIsV0FBVixDQUFzQixLQUFLMUIsTUFBM0I7QUFDQUssNkRBQUssQ0FBSSxLQUFLQyxJQUFULFlBQW1CLEtBQUtILEdBQXhCLHlCQUFMO0FBQ0gsRzs7U0FFU29CLGtCLEdBQVYsNEJBQTZCSSxhQUE3QixFQUE2RDtBQUN6RCxXQUFPLEtBQUtDLGlCQUFMLENBQXVCQyxPQUF2QixDQUErQkYsYUFBL0IsTUFBa0QsQ0FBQyxDQUExRDtBQUNIO0FBRUQ7Ozs7Ozs7O3dCQUlrQztBQUM5Qix1QkFBVzlCLHdCQUFYO0FBQ0g7QUFFRDs7Ozs7O3dCQUdvQztBQUNoQyxhQUFPLENBQUMsQ0FBQ0ksUUFBUSxDQUFDQyxhQUFULG1CQUFzQyxLQUFLQyxHQUEzQyxTQUFUO0FBQ0g7QUFFRDs7Ozs7O3dCQUdrQjtBQUNkLGFBQU8sS0FBSzJCLFlBQUwsQ0FBa0IsS0FBbEIsQ0FBUDtBQUNIOzs7O0VBMUVxQ0MseUQiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuc2NyaXB0LWxvYWRlci5sZWdhY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVidWcgfSBmcm9tICcuLi8uLi8uLi9hcHAvbG9nZ2VyJztcblxuY29uc3QgRVZFTlRfU0NSSVBUX0xPQUQgPSAnc2NyaXB0bG9hZCc7XG5jb25zdCBkZWZhdWx0SWdub3JlZEF0dHJpYnV0ZXMgPSBbJ2NsYXNzJywgJ2RhdGEtcWEnXTtcblxuLyoqXG4gKiBAZXZlbnQgc2NyaXB0bG9hZCBBbiBldmVudCB3aGljaCBpcyB0cmlnZ2VyZWQgd2hlbiBhIHNjcmlwdCBpcyBsb2FkZWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcmlwdExvYWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogVGhlIDxoZWFkPiB0YWcgb24gdGhlIHBhZ2UuXG4gICAgICovXG4gICAgaGVhZDogSFRNTEhlYWRFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogVGhlIDxzY3JpcHQ+IHRhZyBvIHRoZSBwYWdlLlxuICAgICAqL1xuICAgIHNjcmlwdDogSFRNTFNjcmlwdEVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY3JpcHQgPSA8SFRNTFNjcmlwdEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2NyaXB0W3NyYz1cIiR7dGhpcy5zcmN9XCJdYCk7XG5cbiAgICAgICAgaWYgKCEhdGhpcy5zY3JpcHQpIHtcbiAgICAgICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgICAgICAgICBkZWJ1ZyhgJHt0aGlzLm5hbWV9OiBcIiR7dGhpcy5zcmN9XCIgaXMgYWxyZWFkeSBpbiB0aGUgRE9NYCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGVhZCA9IDxIVE1MSGVhZEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgICAgdGhpcy5zY3JpcHQgPSA8SFRNTFNjcmlwdEVsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICAgICAgdGhpcy5zZXRTY3JpcHRBdHRyaWJ1dGVzKCk7XG4gICAgICAgIHRoaXMuYXBwZW5kU2NyaXB0VGFnKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldmVudDogRXZlbnQpID0+IHRoaXMub25TY3JpcHRMb2FkKGV2ZW50KSwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNjcmlwdExvYWQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9TQ1JJUFRfTE9BRCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFNjcmlwdEF0dHJpYnV0ZXMoKTogdm9pZCB7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodGhpcy5hdHRyaWJ1dGVzLCAoYXR0cmlidXRlOiBBdHRyKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNBdHRyaWJ1dGVJZ25vcmVkKGF0dHJpYnV0ZS5uYW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NyaXB0LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFwcGVuZFNjcmlwdFRhZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oZWFkLmFwcGVuZENoaWxkKHRoaXMuc2NyaXB0KTtcbiAgICAgICAgZGVidWcoYCR7dGhpcy5uYW1lfTogXCIke3RoaXMuc3JjfVwiIGFkZGVkIHRvIHRoZSBET01gKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaXNBdHRyaWJ1dGVJZ25vcmVkKGF0dHJpYnV0ZU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pZ25vcmVkQXR0cmlidXRlcy5pbmRleE9mKGF0dHJpYnV0ZU5hbWUpICE9PSAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBhcnJheSBvZiBpZ25vcmVkIGF0dHJpYnV0ZXMgdGhhdCBhcmUgbm90IGNvcGllZCBmcm9tIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuICAgICAqIHRvIHRoZSBzY3JpcHQgdGFnIHdoZW4gY3JlYXRlZC5cbiAgICAgKi9cbiAgICBnZXQgaWdub3JlZEF0dHJpYnV0ZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gWy4uLmRlZmF1bHRJZ25vcmVkQXR0cmlidXRlc107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpZiB0aGUgc2NyaXB0IGFscmVhZHkgZXhpc3RzIGluIERPTS5cbiAgICAgKi9cbiAgICBnZXQgaXNTY3JpcHRBbHJlYWR5SW5ET00oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNjcmlwdFtzcmM9XCIke3RoaXMuc3JjfVwiXWApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHVybCBlbmRwb2ludCB1c2VkIHRvIGxvYWQgdGhlIHNjcmlwdC5cbiAgICAgKi9cbiAgICBnZXQgc3JjKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==