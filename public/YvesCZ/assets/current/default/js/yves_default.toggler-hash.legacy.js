(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["toggler-hash"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-hash/toggler-hash.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-hash/toggler-hash.ts ***!
  \*********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TogglerHash; });
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



var TogglerHash = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(TogglerHash, _Component);

  var _super = _createSuper(TogglerHash);

  /**
   * Elements targeted by the toggle action.
   */
  function TogglerHash() {
    var _this;

    _this = _Component.call(this) || this;
    /* tslint:disable: deprecation */

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "targets", void 0);

    _this.targets = Array.from(_this.targetClassName ? document.getElementsByClassName(_this.targetClassName) : document.querySelectorAll(_this.targetSelector));
    /* tslint:enable: deprecation */

    return _this;
  }

  var _proto = TogglerHash.prototype;

  _proto.readyCallback = function readyCallback() {
    this.checkHash();
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    window.addEventListener('hashchange', function (event) {
      return _this2.onHashChange(event);
    });
  };

  _proto.onHashChange = function onHashChange(event) {
    this.checkHash();
  }
  /**
   * Checks the hash and triggers the flexible toggle action.
   */
  ;

  _proto.checkHash = function checkHash() {
    if (this.triggerHash === this.hash) {
      this.toggle(this.addClassWhenHashInUrl);
      return;
    }

    this.toggle(!this.addClassWhenHashInUrl);
  }
  /**
   * Toggles the class names in the target elements.
   * @param addClass A boolean value for a more flexible toggling action.
   */
  ;

  _proto.toggle = function toggle(addClass) {
    var _this3 = this;

    this.targets.forEach(function (target) {
      return target.classList.toggle(_this3.classToToggle, addClass);
    });
  }
  /**
   * Gets the current page url.
   */
  ;

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(TogglerHash, [{
    key: "hash",
    get: function get() {
      return window.location.hash;
    }
    /**
     * Gets the trigger hash.
     */

  }, {
    key: "triggerHash",
    get: function get() {
      return this.getAttribute('trigger-hash');
    }
    /**
     * Gets a querySelector of the target element.
     *
     * @deprecated Use targetClassName() instead.
     */

  }, {
    key: "targetSelector",
    get: function get() {
      return this.getAttribute('target-selector');
    }
  }, {
    key: "targetClassName",
    get: function get() {
      return this.getAttribute('target-class-name');
    }
    /**
     * Gets a class name for the toggle action.
     */

  }, {
    key: "classToToggle",
    get: function get() {
      return this.getAttribute('class-to-toggle');
    }
    /**
     * Gets if the element should add the class when in blur.
     */

  }, {
    key: "addClassWhenHashInUrl",
    get: function get() {
      return this.hasAttribute('add-class-when-hash-in-url');
    }
  }]);

  return TogglerHash;
}(_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvdG9nZ2xlci1oYXNoL3RvZ2dsZXItaGFzaC50cyJdLCJuYW1lcyI6WyJUb2dnbGVySGFzaCIsInRhcmdldHMiLCJBcnJheSIsImZyb20iLCJ0YXJnZXRDbGFzc05hbWUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFyZ2V0U2VsZWN0b3IiLCJyZWFkeUNhbGxiYWNrIiwiY2hlY2tIYXNoIiwibWFwRXZlbnRzIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25IYXNoQ2hhbmdlIiwidHJpZ2dlckhhc2giLCJoYXNoIiwidG9nZ2xlIiwiYWRkQ2xhc3NXaGVuSGFzaEluVXJsIiwiYWRkQ2xhc3MiLCJmb3JFYWNoIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiY2xhc3NUb1RvZ2dsZSIsImxvY2F0aW9uIiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFFcUJBLFc7Ozs7O0FBQ2pCOzs7QUFLQSx5QkFBYztBQUFBOztBQUNWO0FBQ0E7O0FBRlU7O0FBR1YsVUFBS0MsT0FBTCxHQUNJQyxLQUFLLENBQUNDLElBQU4sQ0FDSSxNQUFLQyxlQUFMLEdBQ01DLFFBQVEsQ0FBQ0Msc0JBQVQsQ0FBZ0MsTUFBS0YsZUFBckMsQ0FETixHQUVNQyxRQUFRLENBQUNFLGdCQUFULENBQTBCLE1BQUtDLGNBQS9CLENBSFYsQ0FESjtBQU9BOztBQVZVO0FBV2I7Ozs7U0FFU0MsYSxHQUFWLHlCQUFnQztBQUM1QixTQUFLQyxTQUFMO0FBQ0EsU0FBS0MsU0FBTDtBQUNILEc7O1NBRVNBLFMsR0FBVixxQkFBNEI7QUFBQTs7QUFDeEJDLFVBQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsWUFBeEIsRUFBc0MsVUFBQ0MsS0FBRDtBQUFBLGFBQWtCLE1BQUksQ0FBQ0MsWUFBTCxDQUFrQkQsS0FBbEIsQ0FBbEI7QUFBQSxLQUF0QztBQUNILEc7O1NBRVNDLFksR0FBVixzQkFBdUJELEtBQXZCLEVBQTJDO0FBQ3ZDLFNBQUtKLFNBQUw7QUFDSDtBQUVEOzs7OztTQUdBQSxTLEdBQUEscUJBQWtCO0FBQ2QsUUFBSSxLQUFLTSxXQUFMLEtBQXFCLEtBQUtDLElBQTlCLEVBQW9DO0FBQ2hDLFdBQUtDLE1BQUwsQ0FBWSxLQUFLQyxxQkFBakI7QUFFQTtBQUNIOztBQUVELFNBQUtELE1BQUwsQ0FBWSxDQUFDLEtBQUtDLHFCQUFsQjtBQUNIO0FBRUQ7Ozs7OztTQUlBRCxNLEdBQUEsZ0JBQU9FLFFBQVAsRUFBZ0M7QUFBQTs7QUFDNUIsU0FBS25CLE9BQUwsQ0FBYW9CLE9BQWIsQ0FBcUIsVUFBQ0MsTUFBRDtBQUFBLGFBQXlCQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJMLE1BQWpCLENBQXdCLE1BQUksQ0FBQ00sYUFBN0IsRUFBNENKLFFBQTVDLENBQXpCO0FBQUEsS0FBckI7QUFDSDtBQUVEOzs7Ozs7O3dCQUdtQjtBQUNmLGFBQU9SLE1BQU0sQ0FBQ2EsUUFBUCxDQUFnQlIsSUFBdkI7QUFDSDtBQUVEOzs7Ozs7d0JBRzBCO0FBQ3RCLGFBQU8sS0FBS1MsWUFBTCxDQUFrQixjQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7d0JBSzZCO0FBQ3pCLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixpQkFBbEIsQ0FBUDtBQUNIOzs7d0JBQ3VDO0FBQ3BDLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixtQkFBbEIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozt3QkFHNEI7QUFDeEIsYUFBTyxLQUFLQSxZQUFMLENBQWtCLGlCQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7O3dCQUdxQztBQUNqQyxhQUFPLEtBQUtDLFlBQUwsQ0FBa0IsNEJBQWxCLENBQVA7QUFDSDs7OztFQTNGb0NDLHlEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LnRvZ2dsZXItaGFzaC5sZWdhY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGVySGFzaCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogRWxlbWVudHMgdGFyZ2V0ZWQgYnkgdGhlIHRvZ2dsZSBhY3Rpb24uXG4gICAgICovXG4gICAgcmVhZG9ubHkgdGFyZ2V0czogSFRNTEVsZW1lbnRbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICAgICAgdGhpcy50YXJnZXRzID0gPEhUTUxFbGVtZW50W10+KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldENsYXNzTmFtZVxuICAgICAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50YXJnZXRDbGFzc05hbWUpXG4gICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnRhcmdldFNlbGVjdG9yKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGVja0hhc2goKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIChldmVudDogRXZlbnQpID0+IHRoaXMub25IYXNoQ2hhbmdlKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uSGFzaENoYW5nZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGVja0hhc2goKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdGhlIGhhc2ggYW5kIHRyaWdnZXJzIHRoZSBmbGV4aWJsZSB0b2dnbGUgYWN0aW9uLlxuICAgICAqL1xuICAgIGNoZWNrSGFzaCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlckhhc2ggPT09IHRoaXMuaGFzaCkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGUodGhpcy5hZGRDbGFzc1doZW5IYXNoSW5VcmwpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvZ2dsZSghdGhpcy5hZGRDbGFzc1doZW5IYXNoSW5VcmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIGNsYXNzIG5hbWVzIGluIHRoZSB0YXJnZXQgZWxlbWVudHMuXG4gICAgICogQHBhcmFtIGFkZENsYXNzIEEgYm9vbGVhbiB2YWx1ZSBmb3IgYSBtb3JlIGZsZXhpYmxlIHRvZ2dsaW5nIGFjdGlvbi5cbiAgICAgKi9cbiAgICB0b2dnbGUoYWRkQ2xhc3M6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YXJnZXRzLmZvckVhY2goKHRhcmdldDogSFRNTEVsZW1lbnQpID0+IHRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3NUb1RvZ2dsZSwgYWRkQ2xhc3MpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UgdXJsLlxuICAgICAqL1xuICAgIGdldCBoYXNoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB0cmlnZ2VyIGhhc2guXG4gICAgICovXG4gICAgZ2V0IHRyaWdnZXJIYXNoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1oYXNoJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3Igb2YgdGhlIHRhcmdldCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIHRhcmdldENsYXNzTmFtZSgpIGluc3RlYWQuXG4gICAgICovXG4gICAgZ2V0IHRhcmdldFNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0LXNlbGVjdG9yJyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBnZXQgdGFyZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0LWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgY2xhc3MgbmFtZSBmb3IgdGhlIHRvZ2dsZSBhY3Rpb24uXG4gICAgICovXG4gICAgZ2V0IGNsYXNzVG9Ub2dnbGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjbGFzcy10by10b2dnbGUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGlmIHRoZSBlbGVtZW50IHNob3VsZCBhZGQgdGhlIGNsYXNzIHdoZW4gaW4gYmx1ci5cbiAgICAgKi9cbiAgICBnZXQgYWRkQ2xhc3NXaGVuSGFzaEluVXJsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2FkZC1jbGFzcy13aGVuLWhhc2gtaW4tdXJsJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==