/*------------------------------------------------------------------
Import modules
------------------------------------------------------------------*/

import { relativeTarget, Event } from 'meteora';

/*------------------------------------------------------------------
Simple Selector
------------------------------------------------------------------*/

export default class SimpleSelector {
  constructor(select, options = {}) {
    // The Simple Selector events will be store here
    this.events = {};
    // The selected option values will go here
    this.selection = [];
    // The active state for the select
    this.active = false;
    // This will be used to trigger a change event on the real select element
    this.trigger = new Event('change');

    // The default select element
    this.default = {
      select: select,
      options: select.children,
    }

    // The default settings
    this.settings = {
      search: false,
      autoClose: true,
      class: 'selector',
      placeholder: this.default.select.getAttribute('placeholder') || 'Select',
    }

    // Assign the user options to the defaults
    for (let key in this.settings) {
      if (this.settings.hasOwnProperty(key) && options.hasOwnProperty(key)) this.settings[key] = options[key];
    }

    // The new select element
    this.select = document.createElement('div');
    // This will hold our options
    this.options = [];

    // These are our template elements
    this.template = {
      header: document.createElement('div'),
      placeholder: document.createElement('span'),
      list: document.createElement('div'),
      options: [],
      search: document.createElement('input'),
    }

    // Add a class to the new select
    this.select.className = this.settings.class;

    // Loop the template object and add some classes
    for (let name in this.template) {
      if (this.template.hasOwnProperty(name)) this.template[name].className = `${this.settings.class}__${name}`;
    }

    // Build the select html
    this.template.header.appendChild(this.template.placeholder);
    this.select.appendChild(this.template.header);
    this.select.appendChild(this.template.list);

    // If we have search enabled
    if (this.settings.search) {
      // The search input is a text input
      this.template.search.type = 'text',
      // Put the search input into the select list
      this.template.list.appendChild(this.template.search);
      // When we type in the search input, we need to filter the options
      this.template.search.addEventListener('keyup', () => this.filter(this.template.search.value));
    }

    // When the default select is changed, we want to update the Simple Selector
    this.default.select.addEventListener('change', () => this.update());

    // Make the header Tab Accessible
    this.template.header.setAttribute('tabindex', "0");

    // If we want it to auto close
    if (this.settings.autoClose) {
      // If we have clicked somewhere else on the page then close the select
      window.addEventListener('click', (e) => {
        if (!relativeTarget(e.target, this.select)) this.close();
      });
    }

    // Clicking the header should open / close the select list
    this.template.header.addEventListener('click', (e) => {
      e.preventDefault();
      (this.active) ? this.close() : this.open();
    });

    // Put the new selector in the template
    this.default.select.parentNode.insertBefore(this.select, this.default.select);

    // Initialise the selector
    this.reinit();
    this.update();
  }

  reinit() {
    // Find all the options in the real select element
    this.default.options = this.default.select.children;

    // Remove the current options from the list
    for (var i = 0; i < this.template.list.children.length; i++) {
      this.template.list.removeChild(this.template.list.children[i]);
    }

    // Reset the options
    this.options = [];
    this.template.options = [];

    // Loop all the option elements and add a new replacement to our select
    for (let i = 0; i < this.default.options.length; i++) {
      // Save it as an option
      const option = this.default.options[i];
      // Create our new option element
      const replacement = document.createElement('span');

      // Add the value to the replacement option
      replacement.setAttribute('data-value', option.value);
      // Get the content of the real option and chuck it into the replacement
      replacement.innerHTML = option.innerHTML;
      // Add a class to the replacement option
      replacement.className = `${this.settings.class}__option`;

      // Grab all the data attributes from the option and assign them to the new one
      for (let j = 0; j < option.attributes.length; j++) {
        // Save as an attribute
        const attribute = option.attributes[i];

        // If it is a data attribute
        if (attribute && attribute.nodeName.indexOf('data-') > -1) {
          // Add it to the new replacement option
          replacement.setAttribute(attribute.nodeName, attribute.nodeValue);
        }
      }

      // If the option is disabled, we need to reflect that on the new one
      if (option.disabled) {
        replacement.setAttribute('data-disabled', true);
      } else {
        replacement.removeAttribute('data-disabled');
      }

      // Add this new option to the template options array
      this.options.push({
        default: option,
        element: replacement,
        value: option.value,
      });
    }

    // For all the new options
    this.options.forEach((option, index) => {
      // Tab Accessibility
      option.element.setAttribute('tabindex', "0");

      // When we click the option we need to change the real select's value
      option.element.addEventListener('click', (e) => {
        e.preventDefault();

        // If this is a multi select toggle the option selected state
        if (this.default.select.type == 'select-multiple') {
          // If this option has no value
          if (option.default.value == "") {
            // Deselect all selected items
            this.options.filter((item) => item.default.getAttribute('selected')).forEach((item) => item.default.removeAttribute('selected'));
          } else {
            // Deselect the item with no value
            this.options.filter((item) => item.value == '').forEach((item) => item.default.removeAttribute('selected'));
          }

          // If the option is selected, deselect it
          if (option.default.selected) {
            option.default.removeAttribute('selected');
          }
          // Otherwise select it
          else {
            option.default.setAttribute('selected', 'selected');
          }
        }
        // Otherwise select just the one item
        else {
          
          this.default.select.selectedIndex = index;
        }

        // Trigger the change event on the default select
        this.default.select.dispatchEvent(this.trigger);

        // If we want it to autoClose and it is not a multi select, then close after selecting an option
        if (this.default.select.type == 'select-one' && this.settings.autoClose) this.close();
      });

      // Add the new option element to the template object and list element
      this.template.options.push(option.element);
      this.template.list.appendChild(option.element);
    });

    // Run the reinit callback
    this.callback('reinit', this);
  }

  update() {
    // Reset our selection
    this.selection = [];

    // Loop all the options and do something with the selected options
    for (let i = 0; i < this.options.length; i++) {
      // Save this as an option
      const option = this.options[i];

      // If the option is selected,
      if (option.default.selected) {
        // Add an active class
        option.element.classList.add(`${this.settings.class}__option--active`);
        // Push this option value to the selection
        this.selection.push({
          text: option.default.text,
          value: option.default.value,
        });
      } else {
        // Otherwise remove the active class
        option.element.classList.remove(`${this.settings.class}__option--active`);
      }
    }

    // Set the placeholder text
    switch (this.selection.length) {
      case 0:
        // We have nothing selected so set the placeholder back to the default value
        this.template.placeholder.innerHTML = this.settings.placeholder;
        this.template.placeholder.className = `${this.settings.class}__placeholder`;
        break;
      case 1:
        // we have one option selected so set the to match the selected option's text
        this.template.placeholder.innerHTML = this.selection[0].text;
        this.template.placeholder.classList.add(`${this.settings.class}__placeholder--single`);
        this.template.placeholder.classList.remove(`${this.settings.class}__placeholder--multiple`);
        break;
      default:
        // Otherwise we have multiple selected
        this.template.placeholder.innerHTML = 'Multiple Selected';
        this.template.placeholder.classList.remove(`${this.settings.class}__placeholder--single`);
        this.template.placeholder.classList.add(`${this.settings.class}__placeholder--multiple`);
        break;
    }

    // Run the update callback
    this.callback('update', this);
  }

  open() {
    // Add the active state
    this.select.classList.add(`${this.settings.class}--active`);

    // Activate the select state
    this.active = true;

    // Run the open callback
    this.callback('open', this);
  }

  close() {
    // Remove the active state
    this.select.classList.remove(`${this.settings.class}--active`);

    // Clear the search
    if (this.search) {
      this.searchInput.value = '';
      this.filter();
    };

    // Deactivate the select state
    this.active = false;

    // Run the close callback
    this.callback('close', this);
  }

  // Filters the options by looking for a specific string
  filter(string = '') {
    // Loop through all the options
    this.options.forEach((option) => {
      // If the option's text content matches our search query, or if the search query is empty
      if (option.textContent.toLowerCase().indexOf(string.toLowerCase()) > -1 || string.length === 0) {
        // Remove the hidden class
        option.element.classList.remove(`${this.settings.class}--hidden`);
      }
      // Otherwise
      else {
        // Add a hidden class
        option.element.classList.add(`${this.settings.class}--hidden`);
      }
    });

    // Run the filter callback
    this.callback('filter', this);
  }

  callback(type, data = false) {
    // run the callback functions
    if (this.events[type]) this.events[type].forEach((event) => event(data));
  }

  on(event, func) {
    // If we loaded an event and it's not the on event and we also loaded a function
    if (event && event != 'on' && event != 'callback' && this[event] && func && typeof func == 'function') {
      if (this.events[event] == undefined) this.events[event] = [];
      // Push a new event to the event array
      this.events[event].push(func);
    }
  }
}