"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _template = _interopRequireDefault(require("@meteora-digital/template"));

var _helpers = require("@meteora-digital/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Selector = /*#__PURE__*/function () {
  function Selector(select) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Selector);

    // Grab the default select box info
    this["default"] = {
      select: select,
      options: (0, _helpers.nodeArray)(select.querySelectorAll('option'))
    }; // Gather the user's settings

    this.settings = (0, _helpers.objectAssign)({
      placeholder: this["default"].select.getAttribute('placeholder') || 'Select',
      "class": 'selector',
      search: false,
      multiple: this["default"].select.getAttribute('multiple') != undefined || false,
      autoClose: true
    }, options);
    this.initialPlaceholder = this.settings.placeholder; // Render the new select box

    this.faux = new _template["default"]({
      tagName: 'div',
      classList: this.settings["class"],
      innerHTML: [{
        tagName: 'div',
        classList: "".concat(this.settings["class"], "__header"),
        innerHTML: [{
          tagName: 'span',
          classList: "".concat(this.settings["class"], "__placeholder"),
          innerHTML: this.settings.placeholder
        }]
      }, {
        tagName: 'ul',
        classList: "".concat(this.settings["class"], "__list unstyled")
      }]
    }); // Create the new template before the existing select

    this["default"].select.parentNode.insertBefore(this.faux.html, this["default"].select); // Initialise

    this.select = this.faux.html;
    this.header = this.select.querySelector(".".concat(this.settings["class"], "__header"));
    this.placeholder = this.select.querySelector(".".concat(this.settings["class"], "__placeholder"));
    this.list = this.select.querySelector(".".concat(this.settings["class"], "__list"));
    this.options = [];
    this.val = [];
    this.changeEvent = (0, _helpers.Event)('change');
    this.updateOptions(); // Render the search input

    if (this.settings.search) {
      // Create the template
      var search = new _template["default"]({
        tagName: 'li',
        classList: "".concat(this.settings["class"], "__search"),
        innerHTML: [{
          tagName: 'input',
          classList: "".concat(this.settings["class"], "__searchInput"),
          placeholder: 'Search'
        }]
      }); // Initialise

      this.search = search.html;
      this.searchInput = this.search.querySelector(".".concat(this.settings["class"], "__searchInput"));
      this.list.insertBefore(this.search, this.list.childNodes[0]);
    }

    ;

    if (this.settings.multiple) {
      this["default"].select.setAttribute('multiple', true);
      this.select.classList.add('multiple');
    }

    this.events();
    this.updateValue();
  }

  _createClass(Selector, [{
    key: "updateOptions",
    value: function updateOptions() {
      var _this = this;

      var template = null;
      var selection = []; // Empty the list

      this.options.forEach(function (option) {
        return option.remove();
      });
      this.options = []; // Get new options

      this["default"].options = (0, _helpers.nodeArray)(this["default"].select.querySelectorAll('option')); // Gather our data from the <option>s

      this["default"].options.forEach(function (option) {
        template = new _template["default"]({
          tagName: 'li',
          classList: "".concat(_this.settings["class"], "__option"),
          innerHTML: option.innerHTML,
          dataset: {
            value: option.value
          }
        }); // Append the new options to the page

        _this.options.push(template.html);
      }); // Create our event handlers and append the items to our list

      this.options.forEach(function (option, index) {
        // Change the default select box and toggle some classes
        option.addEventListener('click', function () {
          // If we are using a multi-select
          if (_this.settings.multiple) {
            if (option.getAttribute('data-value') === '') {
              // Clear all other options
              _this.options.forEach(function (customOption, customOptionIndex) {
                customOption.classList.remove("".concat(_this.settings["class"], "__option--active"));
                _this["default"].options[customOptionIndex].selected = false;
              }); // Select "all" option


              option.classList.add("".concat(_this.settings["class"], "__option--active"));
            } else {
              // Clear the all option
              if (_this["default"].options[0].value === '') _this.options[0].classList.remove("".concat(_this.settings["class"], "__option--active")); // If our option has already been selected, deselect it

              if ((0, _helpers.containsClass)(option, "".concat(_this.settings["class"], "__option--active"))) {
                option.classList.remove("".concat(_this.settings["class"], "__option--active"));
                _this["default"].options[index].selected = false;
              } // Otherwise, select it
              else {
                  option.classList.add("".concat(_this.settings["class"], "__option--active")); // Select all appropriate options in the default select

                  _this.options.forEach(function (customOption, customOptionIndex) {
                    _this["default"].options[customOptionIndex].selected = (0, _helpers.containsClass)(customOption, "".concat(_this.settings["class"], "__option--active"));
                  });
                }
            }
          } // Otherwise select the single option, then close the input
          else {
              selection = [];

              if (!option.classList.contains("".concat(_this.settings["class"], "__option--active"))) {
                // Toggle the active state to the option we just clicked
                _this.options.forEach(function (o) {
                  return o.classList.remove("".concat(_this.settings["class"], "__option--active"));
                });

                option.classList.add("".concat(_this.settings["class"], "__option--active")); // Loop default options and select the one's who's value matches our duplicate

                _this["default"].options.forEach(function (defaultOption) {
                  defaultOption.selected = defaultOption.value === option.getAttribute('data-value');
                });
              }

              if (_this.settings.autoClose) _this.close();
            } // Our selected items all in a nice list


          selection = (0, _helpers.nodeArray)(_this.list.querySelectorAll(".".concat(_this.settings["class"], "__option--active"))); // Set the placeholder based on the selected items

          _this.updatePlaceholder(selection); // Finally send a change function to the original select


          _this.change();
        }); // Add these options to our list

        _this.list.appendChild(option);
      });
    }
  }, {
    key: "events",
    value: function events() {
      var _this2 = this;

      // Open or close the select depending on the user's clicked target
      window.addEventListener('click', function (e) {
        if (!(0, _helpers.relativeTarget)(e.target, _this2.select)) _this2.close();
      }); // If we click on the header, and the selector is already open, we assume the user is trying to close it

      this.header.addEventListener('click', function () {
        (0, _helpers.containsClass)(_this2.select, 'js-active') ? _this2.close() : _this2.open();
      }); // When search is enabled add the filter event
      // Note, the filter event can be used from outside this class

      if (this.search) {
        this.searchInput.addEventListener('keyup', function () {
          _this2.filter(_this2.searchInput.value);
        });
      }
    }
  }, {
    key: "open",
    value: function open() {
      // Add the active state
      this.select.classList.add('js-active');
    }
  }, {
    key: "close",
    value: function close() {
      // Remove the active state
      this.select.classList.remove('js-active'); // Clear the search

      if (this.search) {
        this.searchInput.value = '';
        this.filter();
      }

      ;
    }
  }, {
    key: "value",
    value: function value() {
      var _this3 = this;

      // function to return the single value, or an array of multiple values as needed
      this.val = [];
      this["default"].options.forEach(function (option) {
        if (option.selected) _this3.val.push(option.value);
      }); // if 2 of more -> array else if 1 -> value else if 0 -> ''

      return this.val.length >= 2 ? this.val : this.val.length === 1 ? this.val[0] : '';
    } // Filters the options by looking for a specific string

  }, {
    key: "filter",
    value: function filter() {
      var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.options.forEach(function (option) {
        option.style.display = option.textContent.toLowerCase().indexOf(string.toLowerCase()) > -1 || string.length === 0 ? 'block' : 'none';
      });
    } // Event to fire when dynamically changing the default select

  }, {
    key: "change",
    value: function change() {
      this["default"].select.dispatchEvent(this.changeEvent);
    } // Set the placeholder based on the selected items

  }, {
    key: "updatePlaceholder",
    value: function updatePlaceholder(selection) {
      if (selection.length >= 2) {
        this.placeholder.innerHTML = 'Multiple selected';
      } else if (selection.length === 1 && selection[0].getAttribute('data-value') != '') {
        this.placeholder.innerHTML = selection[0].innerHTML;
      } else {
        this.placeholder.innerHTML = this.settings.placeholder;
        if (this.settings.multiple && this["default"].options[0].value === '') this.options[0].classList.add("".concat(this.settings["class"], "__option--active"));
      }
    }
  }, {
    key: "updateValue",
    value: function updateValue() {
      var _this4 = this;

      var selection = [];
      this["default"].options.forEach(function (option, index) {
        if (option.selected && option.value !== "") selection.push(option);
        if (option.selected) _this4.options[index].classList.add("".concat(_this4.settings["class"], "__option--active"));
      }); // Set the placeholder based on the selected items

      this.updatePlaceholder(selection);
    }
  }, {
    key: "update",
    value: function update() {
      this.updateOptions();
      this.updateValue();
    }
  }]);

  return Selector;
}(); // <select name="JobType" id="JobType" class="js-select">
//	 <option value="0">View All</option>
//	 <option value="1">Full Time</option>
//	 <option value="1">Part Time</option>
//	 <option value="1">Fixed Term</option>
//	 <option value="1">Contract</option>
//	 <option value="1">Casual</option>
// </select>
// import Selector from './components/Selector';
// nodeArray(document.querSelectorAll('select.js-select')).forEach((select) => new Selector(select));


exports["default"] = Selector;