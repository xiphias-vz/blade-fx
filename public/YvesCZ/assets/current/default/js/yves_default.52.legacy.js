(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[52],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-checkbox/toggler-checkbox.ts":
/*!*****************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-checkbox/toggler-checkbox.ts ***!
  \*****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TogglerCheckbox; });
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


/**
 * @event toggle An event which is triggered when the trigger element is changed.
 */

var TogglerCheckbox = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(TogglerCheckbox, _Component);

  var _super = _createSuper(TogglerCheckbox);

  /**
   * Element triggering the toggle action.
   */

  /**
   * Elements targeted by the toggle action.
   */
  function TogglerCheckbox() {
    var _this;

    _this = _Component.call(this) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "trigger", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "targets", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "event", void 0);

    _this.trigger = _this.getElementsByClassName(_this.jsName + "__trigger")[0];
    /* tslint:disable: deprecation */

    _this.targets = Array.from(_this.targetClassName ? document.getElementsByClassName(_this.targetClassName) : document.querySelectorAll(_this.targetSelector));
    /* tslint:enable: deprecation */

    return _this;
  }

  var _proto = TogglerCheckbox.prototype;

  _proto.readyCallback = function readyCallback() {
    this.toggle();
    this.fireToggleEvent();
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.trigger.addEventListener('change', function (event) {
      return _this2.onTriggerClick(event);
    });
  };

  _proto.onTriggerClick = function onTriggerClick(event) {
    event.preventDefault();
    this.toggle();
    this.fireToggleEvent();
  }
  /**
   * Toggles the class names in the target elements.
   * @param addClass A boolean value which checks if the trigger is checked.
   */
  ;

  _proto.toggle = function toggle(addClass) {
    var _this3 = this;

    if (addClass === void 0) {
      addClass = this.addClass;
    }

    this.targets.forEach(function (element) {
      return element.classList.toggle(_this3.classToToggle, addClass);
    });
  }
  /**
   *  Creates an instance of the custom toggle event and triggers it.
   */
  ;

  _proto.fireToggleEvent = function fireToggleEvent() {
    this.event = new CustomEvent('toggle');
    this.dispatchEvent(this.event);
  }
  /**
   * Gets if the trigger element is checked.
   */
  ;

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(TogglerCheckbox, [{
    key: "addClass",
    get: function get() {
      return this.addClassWhenChecked ? this.trigger.checked : !this.trigger.checked;
    }
    /**
     * Gets a querySelector of the target element.
     *
     * @deprecated Use targetClassName() instead.
     */

  }, {
    key: "targetSelector",
    get: function get() {
      return this.trigger.getAttribute('target-selector');
    }
  }, {
    key: "targetClassName",
    get: function get() {
      return this.trigger.getAttribute('target-class-name');
    }
    /**
     * Gets a class name for the toggle action.
     */

  }, {
    key: "classToToggle",
    get: function get() {
      return this.trigger.getAttribute('class-to-toggle');
    }
    /**
     * Gets if the element should add the class when checked.
     */

  }, {
    key: "addClassWhenChecked",
    get: function get() {
      return this.trigger.hasAttribute('add-class-when-checked');
    }
  }]);

  return TogglerCheckbox;
}(_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvdG9nZ2xlci1jaGVja2JveC90b2dnbGVyLWNoZWNrYm94LnRzIl0sIm5hbWVzIjpbIlRvZ2dsZXJDaGVja2JveCIsInRyaWdnZXIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwidGFyZ2V0cyIsIkFycmF5IiwiZnJvbSIsInRhcmdldENsYXNzTmFtZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInRhcmdldFNlbGVjdG9yIiwicmVhZHlDYWxsYmFjayIsInRvZ2dsZSIsImZpcmVUb2dnbGVFdmVudCIsIm1hcEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9uVHJpZ2dlckNsaWNrIiwicHJldmVudERlZmF1bHQiLCJhZGRDbGFzcyIsImZvckVhY2giLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwiY2xhc3NUb1RvZ2dsZSIsIkN1c3RvbUV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImFkZENsYXNzV2hlbkNoZWNrZWQiLCJjaGVja2VkIiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBOzs7O0lBR3FCQSxlOzs7OztBQUNqQjs7OztBQUtBOzs7QUFNQSw2QkFBYztBQUFBOztBQUNWOztBQURVOztBQUFBOztBQUFBOztBQUVWLFVBQUtDLE9BQUwsR0FBaUMsTUFBS0Msc0JBQUwsQ0FBK0IsTUFBS0MsTUFBcEMsZ0JBQXVELENBQXZELENBQWpDO0FBQ0E7O0FBQ0EsVUFBS0MsT0FBTCxHQUNJQyxLQUFLLENBQUNDLElBQU4sQ0FDSSxNQUFLQyxlQUFMLEdBQ01DLFFBQVEsQ0FBQ04sc0JBQVQsQ0FBZ0MsTUFBS0ssZUFBckMsQ0FETixHQUVNQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLE1BQUtDLGNBQS9CLENBSFYsQ0FESjtBQU9BOztBQVhVO0FBWWI7Ozs7U0FFU0MsYSxHQUFWLHlCQUFnQztBQUM1QixTQUFLQyxNQUFMO0FBQ0EsU0FBS0MsZUFBTDtBQUNBLFNBQUtDLFNBQUw7QUFDSCxHOztTQUVTQSxTLEdBQVYscUJBQTRCO0FBQUE7O0FBQ3hCLFNBQUtiLE9BQUwsQ0FBYWMsZ0JBQWIsQ0FBOEIsUUFBOUIsRUFBd0MsVUFBQ0MsS0FBRDtBQUFBLGFBQWtCLE1BQUksQ0FBQ0MsY0FBTCxDQUFvQkQsS0FBcEIsQ0FBbEI7QUFBQSxLQUF4QztBQUNILEc7O1NBRVNDLGMsR0FBVix3QkFBeUJELEtBQXpCLEVBQTZDO0FBQ3pDQSxTQUFLLENBQUNFLGNBQU47QUFDQSxTQUFLTixNQUFMO0FBQ0EsU0FBS0MsZUFBTDtBQUNIO0FBRUQ7Ozs7OztTQUlBRCxNLEdBQUEsZ0JBQU9PLFFBQVAsRUFBZ0Q7QUFBQTs7QUFBQSxRQUF6Q0EsUUFBeUM7QUFBekNBLGNBQXlDLEdBQXJCLEtBQUtBLFFBQWdCO0FBQUE7O0FBQzVDLFNBQUtmLE9BQUwsQ0FBYWdCLE9BQWIsQ0FBcUIsVUFBQ0MsT0FBRDtBQUFBLGFBQTBCQSxPQUFPLENBQUNDLFNBQVIsQ0FBa0JWLE1BQWxCLENBQXlCLE1BQUksQ0FBQ1csYUFBOUIsRUFBNkNKLFFBQTdDLENBQTFCO0FBQUEsS0FBckI7QUFDSDtBQUVEOzs7OztTQUdBTixlLEdBQUEsMkJBQXdCO0FBQ3BCLFNBQUtHLEtBQUwsR0FBYSxJQUFJUSxXQUFKLENBQWdCLFFBQWhCLENBQWI7QUFDQSxTQUFLQyxhQUFMLENBQW1CLEtBQUtULEtBQXhCO0FBQ0g7QUFFRDs7Ozs7Ozt3QkFHd0I7QUFDcEIsYUFBTyxLQUFLVSxtQkFBTCxHQUEyQixLQUFLekIsT0FBTCxDQUFhMEIsT0FBeEMsR0FBa0QsQ0FBQyxLQUFLMUIsT0FBTCxDQUFhMEIsT0FBdkU7QUFDSDtBQUVEOzs7Ozs7Ozt3QkFLNkI7QUFDekIsYUFBTyxLQUFLMUIsT0FBTCxDQUFhMkIsWUFBYixDQUEwQixpQkFBMUIsQ0FBUDtBQUNIOzs7d0JBQ3VDO0FBQ3BDLGFBQU8sS0FBSzNCLE9BQUwsQ0FBYTJCLFlBQWIsQ0FBMEIsbUJBQTFCLENBQVA7QUFDSDtBQUVEOzs7Ozs7d0JBRzRCO0FBQ3hCLGFBQU8sS0FBSzNCLE9BQUwsQ0FBYTJCLFlBQWIsQ0FBMEIsaUJBQTFCLENBQVA7QUFDSDtBQUVEOzs7Ozs7d0JBR21DO0FBQy9CLGFBQU8sS0FBSzNCLE9BQUwsQ0FBYTRCLFlBQWIsQ0FBMEIsd0JBQTFCLENBQVA7QUFDSDs7OztFQXpGd0NDLHlEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjUyLmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbXBvbmVudCc7XG5cbi8qKlxuICogQGV2ZW50IHRvZ2dsZSBBbiBldmVudCB3aGljaCBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgdHJpZ2dlciBlbGVtZW50IGlzIGNoYW5nZWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZXJDaGVja2JveCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogRWxlbWVudCB0cmlnZ2VyaW5nIHRoZSB0b2dnbGUgYWN0aW9uLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHRyaWdnZXI6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBFbGVtZW50cyB0YXJnZXRlZCBieSB0aGUgdG9nZ2xlIGFjdGlvbi5cbiAgICAgKi9cbiAgICByZWFkb25seSB0YXJnZXRzOiBIVE1MRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBldmVudDogQ3VzdG9tRXZlbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fdHJpZ2dlcmApWzBdO1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICAgICAgdGhpcy50YXJnZXRzID0gPEhUTUxFbGVtZW50W10+KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldENsYXNzTmFtZVxuICAgICAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50YXJnZXRDbGFzc05hbWUpXG4gICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnRhcmdldFNlbGVjdG9yKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgdGhpcy5maXJlVG9nZ2xlRXZlbnQoKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vblRyaWdnZXJDbGljayhldmVudCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRyaWdnZXJDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgdGhpcy5maXJlVG9nZ2xlRXZlbnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBjbGFzcyBuYW1lcyBpbiB0aGUgdGFyZ2V0IGVsZW1lbnRzLlxuICAgICAqIEBwYXJhbSBhZGRDbGFzcyBBIGJvb2xlYW4gdmFsdWUgd2hpY2ggY2hlY2tzIGlmIHRoZSB0cmlnZ2VyIGlzIGNoZWNrZWQuXG4gICAgICovXG4gICAgdG9nZ2xlKGFkZENsYXNzOiBib29sZWFuID0gdGhpcy5hZGRDbGFzcyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhcmdldHMuZm9yRWFjaCgoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmNsYXNzVG9Ub2dnbGUsIGFkZENsYXNzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGN1c3RvbSB0b2dnbGUgZXZlbnQgYW5kIHRyaWdnZXJzIGl0LlxuICAgICAqL1xuICAgIGZpcmVUb2dnbGVFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudCA9IG5ldyBDdXN0b21FdmVudCgndG9nZ2xlJyk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLmV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGlmIHRoZSB0cmlnZ2VyIGVsZW1lbnQgaXMgY2hlY2tlZC5cbiAgICAgKi9cbiAgICBnZXQgYWRkQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZENsYXNzV2hlbkNoZWNrZWQgPyB0aGlzLnRyaWdnZXIuY2hlY2tlZCA6ICF0aGlzLnRyaWdnZXIuY2hlY2tlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBvZiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgdGFyZ2V0Q2xhc3NOYW1lKCkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBnZXQgdGFyZ2V0U2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlci5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1zZWxlY3RvcicpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IHRhcmdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2VyLmdldEF0dHJpYnV0ZSgndGFyZ2V0LWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgY2xhc3MgbmFtZSBmb3IgdGhlIHRvZ2dsZSBhY3Rpb24uXG4gICAgICovXG4gICAgZ2V0IGNsYXNzVG9Ub2dnbGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlci5nZXRBdHRyaWJ1dGUoJ2NsYXNzLXRvLXRvZ2dsZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaWYgdGhlIGVsZW1lbnQgc2hvdWxkIGFkZCB0aGUgY2xhc3Mgd2hlbiBjaGVja2VkLlxuICAgICAqL1xuICAgIGdldCBhZGRDbGFzc1doZW5DaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2VyLmhhc0F0dHJpYnV0ZSgnYWRkLWNsYXNzLXdoZW4tY2hlY2tlZCcpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=