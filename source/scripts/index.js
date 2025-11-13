export default class SimpleSelectorController {
  constructor(select, options = {}) {
    // The Simple Selector events will be store here
    this.events = {};
    // The selected option values will go here
    this.selection = [];
    // The active state for the select
    this.active = false;
    // Disable all inputs to keep form submissions clean
    this.disable = null;
    // If the select sits inside a form, find it
    this.form = (select.form) ? select.form : false;

    // The default select element
    this.default = {
      select: select,
      options: select.children,
    }

    // The select's ID
    this.id = 'SimpleSelector_' + this.default.select.id || document.querySelectorAll('select').indexOf(this.default.select);

    // The default settings
    this.settings = {
      search: false,
      autoClose: true,
      class: 'selector',
      originalNames: false,
      taglist: false,
      placeholder: this.default.select.getAttribute('placeholder') || 'Select',
    }

    // Assign the user options to the defaults
    for (let key in this.settings) {
      if (this.settings.hasOwnProperty(key) && options.hasOwnProperty(key)) this.settings[key] = options[key];
    }

    // The new select element
    this.select = document.createElement('div');
    // This will hold our groups
    this.optgroups = {};
    // This will hold our options
    this.options = [];

    // These are our template elements
    this.template = {
      header: document.createElement('div'),
      placeholder: document.createElement('span'),
      reveal: document.createElement('div'),
      list: document.createElement('div'),
      options: [],
      search: document.createElement('input'),
    }

    // Add a class to the new select
    this.select.className = this.settings.class;
    this.select.id = this.id;

    // Loop the template object and add some classes
    for (let name in this.template) {
      if (this.template.hasOwnProperty(name)) this.template[name].className = `${this.settings.class}__${name}`;
    }

    // Build the select html
    this.template.header.appendChild(this.template.placeholder);
    this.template.reveal.appendChild(this.template.list);
    this.select.appendChild(this.template.header);
    this.select.appendChild(this.template.reveal);

    // If we have search enabled
    if (this.settings.search) {
      // The search input is a text input
      this.template.search.type = 'text';
      // The search input placeholder text
      this.template.search.placeholder = 'Search';
      // Put the search input into the select list
      this.template.list.appendChild(this.template.search);
      // When we type in the search input, we need to filter the options
      this.template.search.addEventListener('input', () => this.filter(this.template.search.value));
    }

    // When the default select is changed, we want to update the Simple Selector
    this.default.select.addEventListener('change', () => this.update());

    // If there is a form
    if (this.form) {
      // When the form is reset, we want to update the Simple Selector
      this.form.addEventListener('reset', () => {
        setTimeout(() => {
          this.update();
        }, 100);
      });
    }

    // Make the header Tab Accessible
    this.template.header.setAttribute('tabindex', "0");

    // If we want it to auto close
    if (this.settings.autoClose) {
      // If we have clicked somewhere else on the page then close the select
      window.addEventListener('click', (e) => {
        let parent = e.target.parentNode;

        if (e.target !== this.select) {
          while (parent && parent !== this.select) {
            parent = parent.parentNode;
          }

          // If we didnt click on the selector, close it
          if (parent !== this.select) this.close();
        }
      });
    }

    // Clicking the header should open / close the select list
    this.template.header.addEventListener('click', (e) => {
      if (e.target.tagName == 'BUTTON') return;

      e.preventDefault();
      (this.active) ? this.close() : this.open();
    });

    // When the header is focused if we hit enter
    this.template.header.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        (this.active) ? this.close() : this.open();
      }
    });

    // Put the new selector in the template
    this.default.select.parentNode.insertBefore(this.select, this.default.select);

    // Initialise the selector
    this.reinit();
    this.update();

    // If the default select changes, we need to reinit the selector
    const Observer = new MutationObserver(() => {
      this.reinit();
      this.update();
    });

    // Observe the default select element for changes
    Observer.observe(this.default.select, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  }

  reinit() {
    try {
      // This will be used to trigger a change event on the real select element
      this.changeEvent = new Event('change', { bubbles: true });
    } catch (err) {
      let event = document.createEvent('CustomEvent');
      event.initCustomEvent('change', false, false, undefined);
      this.changeEvent = event;
    }

    // Find all the optgroups in the real select element
    this.default.optgroups = (this.default.select.querySelector('optgroup')) ? this.default.select.querySelectorAll('optgroup') : false;

    // If we have optgroups
    if (this.default.optgroups) {
      for (let i = 0; i < this.default.optgroups.length; i++) {
        const optgroup = this.default.optgroups[i];
        const label = optgroup.getAttribute('label');

        this.optgroups[i] = {
          label: label,
          options: optgroup.children || [],
        }
      }
    } else {
      this.optgroups[0] = {
        label: false,
        options: this.default.select.children || [],
      };
    }

    // Remove the current options from the list
    [...this.template.list.children].forEach((child) => {
      // If this is not the search input
      if (child !== this.template.search) {
        // Remove the child
        this.template.list.removeChild(child);
      }
    });

    // Reset the options
    this.options = [];
    this.template.options = [];

    // Loop the option groups
    for (let g = 0; g < Object.keys(this.optgroups).length; g++) {
      // Save the optgroup as a variable
      const optgroup = this.optgroups[g];

      // If the group has a label
      if (optgroup.label) {
        // Create a new div
        const group = document.createElement('span');
        // Add a class to the group
        group.className = `${this.settings.class}__group`;
        // Add the label to the group
        group.innerHTML = optgroup.label;
        // Add the group to the select list
        this.template.list.appendChild(group);
      }

      // Loop all the option elements and add a new input to our select
      for (let i = 0; i < optgroup.options.length; i++) {
        // Set up a new option object
        const optionObj = {};
        // Save it as an option
        const option = optgroup.options[i];
        // Create our new option element
        const input = document.createElement('input');
        // Create a new label
        const label = document.createElement('label');
        // Find the index of the option in the real select
        const index = [...this.default.select.options].indexOf(option);

        // Set the type based on the type of select
        input.type = (this.default.select.type == 'select-one') ? 'radio' : 'checkbox';
        // Add the value to the input option
        input.value = option.value;
        // The input name
        input.name = (this.settings.originalNames) ? this.default.select.name : this.id;
        // The input ID
        input.id = `${this.id}_${index}`;

        // Get the content of the real option and chuck it into the label
        label.innerHTML = option.innerHTML;
        // Add a class to the input option
        label.className = `${this.settings.class}__option`;
        // The label for attribute
        label.htmlFor = input.id;

        // Grab all the data attributes from the option and assign them to the new one
        for (let j = 0; j < option.attributes.length; j++) {
          // Save as an attribute
          const attribute = option.attributes[j];

          // If it is a data attribute
          if (attribute && attribute.nodeName.indexOf('data-') == 0) {
            // Add it to the new input option
            input.setAttribute(attribute.nodeName, attribute.nodeValue);
            label.setAttribute(attribute.nodeName, attribute.nodeValue);
          }
        }

        // Disable all inputs when the selector is closed
        input.disabled = true;

        // Add the data to the option object
        optionObj.default = option;
        optionObj.input = input;
        optionObj.label = label;
        // If the option is disabled, we need to reflect that on the new one
        optionObj.disabled = option.disabled;

        // Add this new option to the template options array
        this.options.push(optionObj);

        // Create a new group div to hold the input and label
        optionObj.field = document.createElement('div');

        // Set a class for the group element
        optionObj.field.className = `${this.settings.class}__item`;

        // When we click the option we need to change the real select's value
        optionObj.input.addEventListener('change', (e) => {
          e.preventDefault();

          // If this is a multi select toggle the option selected state
          if (this.default.select.type == 'select-multiple') {
            // If this option has no value
            if (optionObj.default.value == "") {
              // Deselect all selected items
              this.options.filter((item) => item.default.selected == true).forEach((item) => item.default.selected = false);
            } else {
              // Deselect the item with no value
              this.options.filter((item) => item.default.value == '').forEach((item) => item.default.selected = false);
            }

            // If the option is selected, deselect it
            if (optionObj.input.checked) {
              optionObj.default.selected = true;
            }
            // Otherwise select it
            else {
              optionObj.default.selected = false;
            }
          }
          // Otherwise select just the one item
          else {
            this.default.select.selectedIndex = index;
          }

          // Trigger the change event on the default select
          this.default.select.dispatchEvent(this.changeEvent);
          // Trigger the change event on the Simple Selector
          this.change();
        });

        // If we want it to autoClose and it is not a multi select, then close after selecting an option
        if (this.default.select.type == 'select-one' && this.settings.autoClose) {
          // If we press enter on an input
          optionObj.input.addEventListener('keypress', (e) => {
            e.preventDefault();
            // If we press enter or escape
            if (e.key == 'Enter' || e.key == 'Escape') {
              // Close the select
              this.close();
            }
          });

          // When we click the label we want to close the select
          optionObj.label.addEventListener('click', () => {
            this.close();
          });
        }

        // Add the new option element to the template object and list element
        this.template.options.push(optionObj.input);

        // Put the input / label into the group element
        optionObj.field.appendChild(optionObj.input);
        optionObj.field.appendChild(optionObj.label);

        // Put the new group into the list
        this.template.list.appendChild(optionObj.field);
      }
    };

    // Run the reinit callback
    this.callback('reinit', this);
  }

  update() {
    // Reset our selection
    this.selection = [];
    // Check if the select is disabled
    this.select.classList.toggle(`${this.settings.class}--disabled`, this.default.select.disabled);

    // Loop all the options and do something with the selected options
    for (let i = 0; i < this.options.length; i++) {
      // Save this as an option
      const option = this.options[i];

      // If the option is selected,
      if (option.default.selected) {
        // Activate the input
        option.input.checked = true;

        // If the deafult option has a real value
        if (option.default.value != "") {
          // Push this option value to the selection
          this.selection.push(option);
        }
      } else {
        // Deactivate the input
        option.input.checked = false;
      }

      // If the default option is disabled, disable the input
      option.disabled = option.default.disabled;
    }

    if (this.settings.taglist) {
      // Reset the placeholder
      this.template.placeholder.innerHTML = (this.selection.length) ? '' : this.settings.placeholder;
      this.template.placeholder.className = `${this.settings.class}__placeholder`;

      // Loop through all the selected options, and create a new label for each one
      this.selection.forEach((option) => {
        // Create a div to hold the tag
        const tag = document.createElement('div');
        // Create a span to hold the text
        const text = document.createElement('div');
        // Create a label to hold the close button
        const remove = document.createElement('button');

        // Add a class to the tag
        tag.className = `${this.settings.class}__tag`;
        // Add a class to the text
        text.className = `${this.settings.class}__tag-text`;
        // Add a class to the close button
        remove.className = `${this.settings.class}__tag-remove`;

        // Add the text to the tag
        text.innerHTML = option.label.innerHTML;
        // Add the close button to the tag
        remove.innerHTML = '×';

        // Append the text to the tag
        tag.appendChild(text);
        // Append the close button to the tag
        tag.appendChild(remove);

        remove.addEventListener('click', (e) => {
          e.preventDefault();
          // deselect the option from the default select
          option.default.selected = false;
          // trigger the change event on the default select
          this.default.select.dispatchEvent(this.changeEvent);
        });

        // Append the tag to the placeholder
        this.template.placeholder.appendChild(tag);
      });
    }

    else {
      // Remove all the data attributes from the placeholder
      [...this.template.placeholder.attributes].forEach((attribute) => {
        if (attribute.nodeName.indexOf('data-') == 0) {
          this.template.placeholder.removeAttribute(attribute.nodeName);
        }
      });

      // Set the placeholder text
      switch (this.selection.length) {
        case 0:
          // We have nothing selected so set the placeholder back to the default value
          this.template.placeholder.innerHTML = this.settings.placeholder;
          this.template.placeholder.className = `${this.settings.class}__placeholder`;
          break;
        case 1:
          // we have one option selected so set the to match the selected option's text
          this.template.placeholder.innerHTML = this.selection[0].label.innerHTML;
          this.template.placeholder.classList.add(`${this.settings.class}__placeholder--single`);
          this.template.placeholder.classList.remove(`${this.settings.class}__placeholder--multiple`);

          // Add all the data attributes from the selected option to the placeholder
          [...this.selection[0].default.attributes].forEach((attribute) => {
            if (attribute.nodeName.indexOf('data-') == 0) {
              this.template.placeholder.setAttribute(attribute.nodeName, attribute.nodeValue);
            }
          });

          break;
        default:
          // Otherwise we have multiple selected
          this.template.placeholder.innerHTML = 'Multiple Selected';
          this.template.placeholder.classList.remove(`${this.settings.class}__placeholder--single`);
          this.template.placeholder.classList.add(`${this.settings.class}__placeholder--multiple`);
          break;
      }
    }

    // Run the update callback
    this.callback('update', this);
  }

  change() {
    // Run the change callback
    this.callback('change', this.selection);
  }

  open() {
    // If the select is already open, do nothing
    if (this.active) return;

    // If the select is disabled, do nothing
    if (this.default.select.disabled) return;

    // Keep the select enabled
    clearTimeout(this.disable);

    // Scroll the list to the top
    this.template.list.scrollTop = 0;

    // Add the active state
    this.select.classList.add(`${this.settings.class}--active`);

    // Activate the select state
    this.active = true;

    // Enable all allowed inputs
    this.options.forEach((option) => {
      option.input.disabled = option.disabled;
      option.field.classList.toggle(`${this.settings.class}__item--disabled`, option.disabled);
    });

    // Find the enabled inputs
    const enabled = this.options.filter((option) => option.disabled == false);

    // If there are any enabled inputs focus on the first one
    if (enabled.length) enabled[0].input.focus();

    // Run the open callback
    this.callback('open', this);
  }

  close() {
    // If the select is already closed, do nothing
    if (!this.active) return;

    // Remove the active state
    this.select.classList.remove(`${this.settings.class}--active`);

    // Clear the search
    if (this.settings.search) {
      this.template.search.value = '';
      this.filter();
    };

    // Deactivate the select state
    this.active = false;

    // Disable all the inputs
    this.disable = setTimeout(() => {
      this.options.forEach((option) => option.input.disabled = true);
    }, 100);

    // Run the close callback
    this.callback('close', this);
  }

  // Filters the options by looking for a specific string
  filter(string = '') {
    // Loop through all the options
    this.options.forEach((option) => {
      // If the option's text content matches our search query, or if the search query is empty
      if (option.label.innerText.toLowerCase().indexOf(string.toLowerCase()) > -1 || string.length === 0) {
        // Remove the hidden class
        option.field.classList.remove(`${this.settings.class}__item--hidden`);
        option.input.disabled = false;
      }
      // Otherwise
      else {
        // Add a hidden class
        option.field.classList.add(`${this.settings.class}__item--hidden`);
        option.input.disabled = true;
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
