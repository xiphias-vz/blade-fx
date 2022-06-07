(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[30],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/nav-overlay/nav-overlay.ts":
/*!*******************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/nav-overlay/nav-overlay.ts ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NavOverlay; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class NavOverlay extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "classToggle", this.name + "--active");

    _defineProperty(this, "navigation", void 0);

    _defineProperty(this, "triggers", void 0);

    _defineProperty(this, "triggerClose", void 0);

    _defineProperty(this, "blocks", void 0);

    _defineProperty(this, "savedIndex", 0);
  }

  readyCallback() {}

  init() {
    this.navigation = document.getElementsByClassName(this.navClass)[0];
    this.triggers = Array.from(document.getElementsByClassName(this.triggerOpenClassName));
    this.triggerClose = this.getElementsByClassName(this.jsName + "__shadow")[0];
    this.blocks = Array.from(this.getElementsByClassName(this.jsName + "__drop-down-block"));
    this.hideBlocks();
    this.mapEvents();
  }

  hideBlocks() {
    this.blocks.forEach(block => block.classList.add('is-hidden'));
  }

  mapEvents() {
    this.triggers.forEach((trigger, index) => {
      trigger.addEventListener('mouseenter', this.triggersHandler.bind(this, index));
    });
    this.triggerClose.addEventListener('mouseenter', this.triggerCloseHandler.bind(this));
  }

  resetTriggersActiveClass() {
    this.triggers.forEach(trigger => trigger.classList.remove(this.activeTriggerClass));
  }

  triggersHandler(index, event) {
    var eventTarget = event.target;
    event.stopPropagation();

    if (!this.classList.contains(this.classToggle)) {
      this.classList.add(this.classToggle);
      this.blocks[index].classList.remove('is-hidden');
      eventTarget.classList.add(this.activeTriggerClass);
    } else if (this.savedIndex !== index) {
      this.hideBlocks();
      this.resetTriggersActiveClass();
      this.blocks[index].classList.remove('is-hidden');
      eventTarget.classList.add(this.activeTriggerClass);
    }

    this.toggleActiveNavClass(true);
    this.savedIndex = index;
  }

  triggerCloseHandler() {
    this.classList.remove(this.classToggle);
    this.hideBlocks();
    this.resetTriggersActiveClass();
    this.toggleActiveNavClass(false);
  }

  toggleActiveNavClass(isActive) {
    this.navigation.classList.toggle(this.navActiveClass, isActive);
  }

  get triggerOpenClassName() {
    return this.getAttribute('trigger-open-class-name');
  }

  get activeTriggerClass() {
    return this.getAttribute('active-link');
  }

  get navClass() {
    return this.getAttribute('nav-class');
  }

  get navActiveClass() {
    return this.getAttribute('nav-active-class');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvbmF2LW92ZXJsYXkvbmF2LW92ZXJsYXkudHMiXSwibmFtZXMiOlsiTmF2T3ZlcmxheSIsIkNvbXBvbmVudCIsIm5hbWUiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsIm5hdmlnYXRpb24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJuYXZDbGFzcyIsInRyaWdnZXJzIiwiQXJyYXkiLCJmcm9tIiwidHJpZ2dlck9wZW5DbGFzc05hbWUiLCJ0cmlnZ2VyQ2xvc2UiLCJqc05hbWUiLCJibG9ja3MiLCJoaWRlQmxvY2tzIiwibWFwRXZlbnRzIiwiZm9yRWFjaCIsImJsb2NrIiwiY2xhc3NMaXN0IiwiYWRkIiwidHJpZ2dlciIsImluZGV4IiwiYWRkRXZlbnRMaXN0ZW5lciIsInRyaWdnZXJzSGFuZGxlciIsImJpbmQiLCJ0cmlnZ2VyQ2xvc2VIYW5kbGVyIiwicmVzZXRUcmlnZ2Vyc0FjdGl2ZUNsYXNzIiwicmVtb3ZlIiwiYWN0aXZlVHJpZ2dlckNsYXNzIiwiZXZlbnQiLCJldmVudFRhcmdldCIsInRhcmdldCIsInN0b3BQcm9wYWdhdGlvbiIsImNvbnRhaW5zIiwiY2xhc3NUb2dnbGUiLCJzYXZlZEluZGV4IiwidG9nZ2xlQWN0aXZlTmF2Q2xhc3MiLCJpc0FjdGl2ZSIsInRvZ2dsZSIsIm5hdkFjdGl2ZUNsYXNzIiwiZ2V0QXR0cmlidXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVlLE1BQU1BLFVBQU4sU0FBeUJDLCtEQUF6QixDQUFtQztBQUFBO0FBQUE7O0FBQUEseUNBQ1gsS0FBS0MsSUFETTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSx3Q0FNZixDQU5lO0FBQUE7O0FBUXBDQyxlQUFWLEdBQWdDLENBQUU7O0FBRXhCQyxNQUFWLEdBQXVCO0FBQ25CLFNBQUtDLFVBQUws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SDs7QUFFRCxNQUFjWixrQkFBZCxHQUEyQztBQUN2QyxXQUFPLEtBQUtZLFlBQUwsQ0FBa0IsYUFBbEIsQ0FBUDtBQUNIOztBQUVELE1BQWNsQyxRQUFkLEdBQWlDO0FBQzdCLFdBQU8sS0FBS2tDLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBUDtBQUNIOztBQUVELE1BQWNELGNBQWQsR0FBdUM7QUFDbkMsV0FBTyxLQUFLQyxZQUFMLENBQWtCLGtCQUFsQixDQUFQO0FBQ0g7O0FBN0U2QyxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjMwLmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZPdmVybGF5IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgY2xhc3NUb2dnbGU6IHN0cmluZyA9IGAke3RoaXMubmFtZX0tLWFjdGl2ZWA7XG4gICAgcHJvdGVjdGVkIG5hdmlnYXRpb246IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCB0cmlnZ2VyczogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlckNsb3NlOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgYmxvY2tzOiBIVE1MRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBzYXZlZEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubmF2aWdhdGlvbiA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMubmF2Q2xhc3MpWzBdO1xuICAgICAgICB0aGlzLnRyaWdnZXJzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudHJpZ2dlck9wZW5DbGFzc05hbWUpKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyQ2xvc2UgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc2hhZG93YClbMF07XG4gICAgICAgIHRoaXMuYmxvY2tzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbSh0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19kcm9wLWRvd24tYmxvY2tgKSk7XG5cbiAgICAgICAgdGhpcy5oaWRlQmxvY2tzKCk7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGhpZGVCbG9ja3MoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYmxvY2tzLmZvckVhY2goYmxvY2sgPT4gYmxvY2suY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJykpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlciwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMudHJpZ2dlcnNIYW5kbGVyLmJpbmQodGhpcywgaW5kZXgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudHJpZ2dlckNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLnRyaWdnZXJDbG9zZUhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlc2V0VHJpZ2dlcnNBY3RpdmVDbGFzcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2Vycy5mb3JFYWNoKHRyaWdnZXIgPT4gdHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuYWN0aXZlVHJpZ2dlckNsYXNzKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRyaWdnZXJzSGFuZGxlcihpbmRleDogbnVtYmVyLCBldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXZlbnRUYXJnZXQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKCF0aGlzLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzVG9nZ2xlKSkge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NUb2dnbGUpO1xuICAgICAgICAgICAgdGhpcy5ibG9ja3NbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgZXZlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLmFjdGl2ZVRyaWdnZXJDbGFzcyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zYXZlZEluZGV4ICE9PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlQmxvY2tzKCk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0VHJpZ2dlcnNBY3RpdmVDbGFzcygpO1xuICAgICAgICAgICAgdGhpcy5ibG9ja3NbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgZXZlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLmFjdGl2ZVRyaWdnZXJDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b2dnbGVBY3RpdmVOYXZDbGFzcyh0cnVlKTtcbiAgICAgICAgdGhpcy5zYXZlZEluZGV4ID0gaW5kZXg7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRyaWdnZXJDbG9zZUhhbmRsZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzVG9nZ2xlKTtcbiAgICAgICAgdGhpcy5oaWRlQmxvY2tzKCk7XG4gICAgICAgIHRoaXMucmVzZXRUcmlnZ2Vyc0FjdGl2ZUNsYXNzKCk7XG4gICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlTmF2Q2xhc3MoZmFsc2UpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0b2dnbGVBY3RpdmVOYXZDbGFzcyhpc0FjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLm5hdmlnYXRpb24uY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLm5hdkFjdGl2ZUNsYXNzLCBpc0FjdGl2ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0cmlnZ2VyT3BlbkNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RyaWdnZXItb3Blbi1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhY3RpdmVUcmlnZ2VyQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdhY3RpdmUtbGluaycpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgbmF2Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCduYXYtY2xhc3MnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IG5hdkFjdGl2ZUNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbmF2LWFjdGl2ZS1jbGFzcycpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=