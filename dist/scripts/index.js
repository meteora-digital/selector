"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SimpleSelectorController = /*#__PURE__*/function () {
  function SimpleSelectorController(select) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SimpleSelectorController);

    // The Simple Selector events will be store here
    this.events = {}; // The selected option values will go here

    this.selection = []; // The active state for the select

    this.active = false; // Disable all inputs to keep form submissions clean

    this.disable = null; // The default select element

    this["default"] = {
      select: select,
      options: select.children
    }; // The select's ID

    this.id = 'SimpleSelector_' + this["default"].select.id || document.querySelectorAll('select').indexOf(this["default"].select); // The default settings

    this.settings = {
      search: false,
      autoClose: true,
      "class": 'selector',
      placeholder: this["default"].select.getAttribute('placeholder') || 'Select'
    }; // Assign the user options to the defaults

    for (var key in this.settings) {
      if (this.settings.hasOwnProperty(key) && options.hasOwnProperty(key)) this.settings[key] = options[key];
    } // The new select element


    this.select = document.createElement('div'); // This will hold our groups

    this.optgroups = {}; // This will hold our options

    this.options = []; // These are our template elements

    this.template = {
      header: document.createElement('div'),
      placeholder: document.createElement('span'),
      list: document.createElement('div'),
      options: [],
      search: document.createElement('input')
    }; // Add a class to the new select

    this.select.className = this.settings["class"]; // Loop the template object and add some classes

    for (var name in this.template) {
      if (this.template.hasOwnProperty(name)) this.template[name].className = "".concat(this.settings["class"], "__").concat(name);
    } // Build the select html


    this.template.header.appendChild(this.template.placeholder);
    this.select.appendChild(this.template.header);
    this.select.appendChild(this.template.list); // If we have search enabled

    if (this.settings.search) {
      // The search input is a text input
      this.template.search.type = 'text'; // The search input placeholder text

      this.template.search.placeholder = 'Search'; // Put the search input into the select list

      this.template.list.appendChild(this.template.search); // When we type in the search input, we need to filter the options

      this.template.search.addEventListener('input', function () {
        return _this.filter(_this.template.search.value);
      });
    } // When the default select is changed, we want to update the Simple Selector


    this["default"].select.addEventListener('change', function () {
      return _this.update();
    }); // Make the header Tab Accessible

    this.template.header.setAttribute('tabindex', "0"); // If we want it to auto close

    if (this.settings.autoClose) {
      // If we have clicked somewhere else on the page then close the select
      window.addEventListener('click', function (e) {
        var parent = e.target.parentNode;

        if (e.target !== _this.select) {
          while (parent && parent !== _this.select) {
            parent = parent.parentNode;
          } // If we didnt click on the selector, close it


          if (parent !== _this.select) _this.close();
        }
      });
    } // Clicking the header should open / close the select list


    this.template.header.addEventListener('click', function (e) {
      e.preventDefault();
      _this.active ? _this.close() : _this.open();
    }); // When the header is focused if we hit enter

    this.template.header.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        _this.active ? _this.close() : _this.open();
      }
    }); // Put the new selector in the template

    this["default"].select.parentNode.insertBefore(this.select, this["default"].select); // Initialise the selector

    this.reinit();
    this.update();
  }

  _createClass(SimpleSelectorController, [{
    key: "reinit",
    value: function reinit() {
      var _this2 = this;

      try {
        // This will be used to trigger a change event on the real select element
        this.change = new Event('change');
      } catch (err) {
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent('change', false, false, undefined);
        this.change = event;
      } // Find all the optgroups in the real select element


      this["default"].optgroups = this["default"].select.querySelector('optgroup') ? this["default"].select.querySelectorAll('optgroup') : false; // If we have optgroups

      if (this["default"].optgroups) {
        for (var i = 0; i < this["default"].optgroups.length; i++) {
          var optgroup = this["default"].optgroups[i];
          var label = optgroup.getAttribute('label');
          this.optgroups[i] = {
            label: label,
            options: optgroup.children || []
          };
        }
      } else {
        this.optgroups[0] = {
          label: false,
          options: this["default"].select.children || []
        };
      } // Remove the current options from the list


      _toConsumableArray(this.template.list.children).forEach(function (child) {
        // If this is not the search input
        if (child !== _this2.template.search) {
          // Remove the child
          _this2.template.list.removeChild(child);
        }
      }); // Reset the options


      this.options = [];
      this.template.options = []; // Loop the option groups

      for (var g = 0; g < Object.keys(this.optgroups).length; g++) {
        // Save the optgroup as a variable
        var _optgroup = this.optgroups[g]; // If the group has a label

        if (_optgroup.label) {
          // Create a new div
          var group = document.createElement('span'); // Add a class to the group

          group.className = "".concat(this.settings["class"], "__group"); // Add the label to the group

          group.innerHTML = _optgroup.label; // Add the group to the select list

          this.template.list.appendChild(group);
        } // Loop all the option elements and add a new input to our select


        var _loop = function _loop(_i) {
          // Set up a new option object
          var optionObj = {}; // Save it as an option

          var option = _optgroup.options[_i]; // Create our new option element

          var input = document.createElement('input'); // Create a new label

          var label = document.createElement('label'); // Find the index of the option in the real select

          var index = _toConsumableArray(_this2["default"].select.options).indexOf(option); // Set the type based on the type of select


          input.type = _this2["default"].select.type == 'select-one' ? 'radio' : 'checkbox'; // Add the value to the input option

          input.value = option.value; // The input name

          input.name = _this2.id; // The input ID

          input.id = "".concat(_this2.id, "_").concat(index); // Get the content of the real option and chuck it into the label

          label.innerHTML = option.innerHTML; // Add a class to the input option

          label.className = "".concat(_this2.settings["class"], "__option"); // The label for attribute

          label.htmlFor = input.id; // Grab all the data attributes from the option and assign them to the new one

          for (var j = 0; j < option.attributes.length; j++) {
            // Save as an attribute
            var attribute = option.attributes[_i]; // If it is a data attribute

            if (attribute && attribute.nodeName.indexOf('data-') > -1) {
              // Add it to the new input option
              input.setAttribute(attribute.nodeName, attribute.nodeValue);
            }
          } // Disable all inputs when the selector is closed


          input.disabled = true; // Add the data to the option object

          optionObj["default"] = option;
          optionObj.input = input;
          optionObj.label = label; // If the option is disabled, we need to reflect that on the new one

          optionObj.disabled = option.disabled; // Add this new option to the template options array

          _this2.options.push(optionObj); // Create a new group div to hold the input and label


          optionObj.field = document.createElement('div'); // Set a class for the group element

          optionObj.field.className = "".concat(_this2.settings["class"], "__item"); // When we click the option we need to change the real select's value

          optionObj.input.addEventListener('change', function (e) {
            e.preventDefault(); // If this is a multi select toggle the option selected state

            if (_this2["default"].select.type == 'select-multiple') {
              // If this option has no value
              if (optionObj["default"].value == "") {
                // Deselect all selected items
                _this2.options.filter(function (item) {
                  return item["default"].selected == true;
                }).forEach(function (item) {
                  return item["default"].selected = false;
                });
              } else {
                // Deselect the item with no value
                _this2.options.filter(function (item) {
                  return item["default"].value == '';
                }).forEach(function (item) {
                  return item["default"].selected = false;
                });
              } // If the option is selected, deselect it


              if (optionObj.input.checked) {
                optionObj["default"].selected = true;
              } // Otherwise select it
              else {
                  optionObj["default"].selected = false;
                }
            } // Otherwise select just the one item
            else {
                _this2["default"].select.selectedIndex = index;
              } // Trigger the change event on the default select


            _this2["default"].select.dispatchEvent(_this2.change);
          }); // If we want it to autoClose and it is not a multi select, then close after selecting an option

          if (_this2["default"].select.type == 'select-one' && _this2.settings.autoClose) {
            // If we press enter on an input
            optionObj.input.addEventListener('keypress', function (e) {
              e.preventDefault(); // If we press enter or escape

              if (e.key == 'Enter' || e.key == 'Escape') {
                // Close the select
                _this2.close();
              }
            }); // When we click the label we want to close the select

            optionObj.label.addEventListener('click', function () {
              return _this2.close();
            });
          } // Add the new option element to the template object and list element


          _this2.template.options.push(optionObj.input); // Put the input / label into the group element


          optionObj.field.appendChild(optionObj.input);
          optionObj.field.appendChild(optionObj.label); // Put the new group into the list

          _this2.template.list.appendChild(optionObj.field);
        };

        for (var _i = 0; _i < _optgroup.options.length; _i++) {
          _loop(_i);
        }
      }

      ; // Run the reinit callback

      this.callback('reinit', this);
    }
  }, {
    key: "update",
    value: function update() {
      // Reset our selection
      this.selection = []; // Check if the select is disabled

      this.select.classList.toggle("".concat(this.settings["class"], "--disabled"), this["default"].select.disabled); // Loop all the options and do something with the selected options

      for (var i = 0; i < this.options.length; i++) {
        // Save this as an option
        var option = this.options[i]; // If the option is selected,

        if (option["default"].selected) {
          // Activate the input
          option.input.checked = true; // If the deafult option has a real value

          if (option["default"].value != "") {
            // Push this option value to the selection
            this.selection.push(option);
          }
        } else {
          // Deactivate the input
          option.input.checked = false;
        } // If the default option is disabled, disable the input


        option.disabled = option["default"].disabled;
      } // Set the placeholder text


      switch (this.selection.length) {
        case 0:
          // We have nothing selected so set the placeholder back to the default value
          this.template.placeholder.innerHTML = this.settings.placeholder;
          this.template.placeholder.className = "".concat(this.settings["class"], "__placeholder");
          break;

        case 1:
          // we have one option selected so set the to match the selected option's text
          this.template.placeholder.innerHTML = this.selection[0].label.textContent;
          this.template.placeholder.classList.add("".concat(this.settings["class"], "__placeholder--single"));
          this.template.placeholder.classList.remove("".concat(this.settings["class"], "__placeholder--multiple"));
          break;

        default:
          // Otherwise we have multiple selected
          this.template.placeholder.innerHTML = 'Multiple Selected';
          this.template.placeholder.classList.remove("".concat(this.settings["class"], "__placeholder--single"));
          this.template.placeholder.classList.add("".concat(this.settings["class"], "__placeholder--multiple"));
          break;
      } // Run the update callback


      this.callback('update', this);
    }
  }, {
    key: "open",
    value: function open() {
      var _this3 = this;

      // If the select is already open, do nothing
      if (this.active) return; // If the select is disabled, do nothing

      if (this["default"].select.disabled) return; // Keep the select enabled

      clearTimeout(this.disable); // Scroll the list to the top

      this.template.list.scrollTop = 0; // Add the active state

      this.select.classList.add("".concat(this.settings["class"], "--active")); // Activate the select state

      this.active = true; // Enable all allowed inputs

      this.options.forEach(function (option) {
        option.input.disabled = option.disabled;
        option.field.classList.toggle("".concat(_this3.settings["class"], "__item--disabled"), option.disabled);
      }); // Find the enabled inputs

      var enabled = this.options.filter(function (option) {
        return option.disabled == false;
      }); // If there are any enabled inputs focus on the first one

      if (enabled.length) enabled[0].input.focus(); // Run the open callback

      this.callback('open', this);
    }
  }, {
    key: "close",
    value: function close() {
      var _this4 = this;

      // If the select is already closed, do nothing
      if (!this.active) return; // Remove the active state

      this.select.classList.remove("".concat(this.settings["class"], "--active")); // Clear the search

      if (this.settings.search) {
        this.template.search.value = '';
        this.filter();
      }

      ; // Deactivate the select state

      this.active = false; // Disable all the inputs

      this.disable = setTimeout(function () {
        _this4.options.forEach(function (option) {
          return option.input.disabled = true;
        });
      }, 100); // Run the close callback

      this.callback('close', this);
    } // Filters the options by looking for a specific string

  }, {
    key: "filter",
    value: function filter() {
      var _this5 = this;

      var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // Loop through all the options
      this.options.forEach(function (option) {
        // If the option's text content matches our search query, or if the search query is empty
        if (option.input.value.toLowerCase().indexOf(string.toLowerCase()) > -1 || string.length === 0) {
          // Remove the hidden class
          option.field.classList.remove("".concat(_this5.settings["class"], "__item--hidden"));
          option.input.disabled = false;
        } // Otherwise
        else {
            // Add a hidden class
            option.field.classList.add("".concat(_this5.settings["class"], "__item--hidden"));
            option.input.disabled = true;
          }
      }); // Run the filter callback

      this.callback('filter', this);
    }
  }, {
    key: "callback",
    value: function callback(type) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // run the callback functions
      if (this.events[type]) this.events[type].forEach(function (event) {
        return event(data);
      });
    }
  }, {
    key: "on",
    value: function on(event, func) {
      // If we loaded an event and it's not the on event and we also loaded a function
      if (event && event != 'on' && event != 'callback' && this[event] && func && typeof func == 'function') {
        if (this.events[event] == undefined) this.events[event] = []; // Push a new event to the event array

        this.events[event].push(func);
      }
    }
  }]);

  return SimpleSelectorController;
}();

exports["default"] = SimpleSelectorController;