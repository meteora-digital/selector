"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SimpleSelector = /*#__PURE__*/function () {
  function SimpleSelector(select) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SimpleSelector);

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


    this.select = document.createElement('div'); // This will hold our options

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

      this.template.search.addEventListener('keyup', function () {
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

  _createClass(SimpleSelector, [{
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
      } // Find all the options in the real select element


      this["default"].options = this["default"].select.children; // Remove the current options from the list

      for (var i = 0; i < this.options.length; i++) {
        this.template.list.removeChild(this.options[i].field);
      } // Reset the options


      this.options = [];
      this.template.options = []; // Loop all the option elements and add a new input to our select

      for (var _i = 0; _i < this["default"].options.length; _i++) {
        // Save it as an option
        var option = this["default"].options[_i]; // Create our new option element

        var input = document.createElement('input'); // Create a new label

        var label = document.createElement('label'); // Set the type based on the type of select

        input.type = this["default"].select.type == 'select-one' ? 'radio' : 'checkbox'; // Add the value to the input option

        input.value = option.value; // The input name

        input.name = this.id; // The input ID

        input.id = "".concat(this.id, "_").concat(_i); // Get the content of the real option and chuck it into the label

        label.innerHTML = option.innerHTML; // Add a class to the input option

        label.className = "".concat(this.settings["class"], "__option"); // The label for attribute

        label.htmlFor = "".concat(this.id, "_").concat(_i); // Grab all the data attributes from the option and assign them to the new one

        for (var j = 0; j < option.attributes.length; j++) {
          // Save as an attribute
          var attribute = option.attributes[_i]; // If it is a data attribute

          if (attribute && attribute.nodeName.indexOf('data-') > -1) {
            // Add it to the new input option
            input.setAttribute(attribute.nodeName, attribute.nodeValue);
          }
        } // Disable all inputs when the selector is closed


        input.disabled = true; // Add this new option to the template options array

        this.options.push({
          "default": option,
          input: input,
          label: label,
          // If the option is disabled, we need to reflect that on the new one
          disabled: option.disabled
        });
      } // For all the new options


      this.options.forEach(function (option, index) {
        // Create a new group div to hold the input and label
        option.field = document.createElement('div'); // Set a class for the group element

        option.field.className = "".concat(_this2.settings["class"], "__item"); // When we click the option we need to change the real select's value

        option.input.addEventListener('change', function (e) {
          e.preventDefault(); // If this is a multi select toggle the option selected state

          if (_this2["default"].select.type == 'select-multiple') {
            // If this option has no value
            if (option["default"].value == "") {
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


            if (option.input.checked) {
              option["default"].selected = true;
            } // Otherwise select it
            else {
                option["default"].selected = false;
              }
          } // Otherwise select just the one item
          else {
              _this2["default"].select.selectedIndex = index;
            } // Trigger the change event on the default select


          _this2["default"].select.dispatchEvent(_this2.change);
        }); // If we want it to autoClose and it is not a multi select, then close after selecting an option

        if (_this2["default"].select.type == 'select-one' && _this2.settings.autoClose) {
          // If we press enter on an input
          option.input.addEventListener('keypress', function (e) {
            e.preventDefault();
            if (e.keyCode === 13 || e.keyCode === 32) _this2.close();
          }); // When we click the label we want something to happen

          option.label.addEventListener('click', function () {
            return _this2.close();
          });
        } // Add the new option element to the template object and list element


        _this2.template.options.push(option.input); // Put the input / label into the group element


        option.field.appendChild(option.input);
        option.field.appendChild(option.label); // Put the new group into the list

        _this2.template.list.appendChild(option.field);
      }); // Run the reinit callback

      this.callback('reinit', this);
    }
  }, {
    key: "update",
    value: function update() {
      // Reset our selection
      this.selection = []; // Loop all the options and do something with the selected options

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
        }
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
      // Keep the select enabled
      clearTimeout(this.disable); // Scroll the list to the top

      this.template.list.scrollTop = 0; // Add the active state

      this.select.classList.add("".concat(this.settings["class"], "--active")); // Activate the select state

      this.active = true; // Enable all allowed inputs

      this.options.forEach(function (option) {
        return option.input.disabled = option.disabled;
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
      var _this3 = this;

      // Remove the active state
      this.select.classList.remove("".concat(this.settings["class"], "--active")); // Clear the search

      if (this.search) {
        this.search.value = '';
        this.filter();
      }

      ; // Deactivate the select state

      this.active = false; // Disable all the inputs

      this.disable = setTimeout(function () {
        _this3.options.forEach(function (option) {
          return option.input.disabled = true;
        });
      }, 100); // Run the close callback

      this.callback('close', this);
    } // Filters the options by looking for a specific string

  }, {
    key: "filter",
    value: function filter() {
      var _this4 = this;

      var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // Loop through all the options
      this.options.forEach(function (option) {
        // If the option's text content matches our search query, or if the search query is empty
        if (option.input.textContent.toLowerCase().indexOf(string.toLowerCase()) > -1 || string.length === 0) {
          // Remove the hidden class
          option.input.classList.remove("".concat(_this4.settings["class"], "--hidden"));
        } // Otherwise
        else {
            // Add a hidden class
            option.input.classList.add("".concat(_this4.settings["class"], "--hidden"));
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

  return SimpleSelector;
}();

exports["default"] = SimpleSelector;