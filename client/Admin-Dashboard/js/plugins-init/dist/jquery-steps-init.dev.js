"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function ($) {
  "use strict";

  var _form$children$steps;

  var form = $("#step-form-horizontal");
  form.children('div').steps((_form$children$steps = {
    headerTag: "h4",
    bodyTag: "section",
    transitionEffect: "slideLeft",
    autoFocus: true
  }, _defineProperty(_form$children$steps, "transitionEffect", "slideLeft"), _defineProperty(_form$children$steps, "onStepChanging", function onStepChanging(event, currentIndex, newIndex) {
    form.validate().settings.ignore = ":disabled,:hidden";
    return form.valid();
  }), _form$children$steps));
})(jQuery);