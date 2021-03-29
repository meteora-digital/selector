import Template from '@meteora-digital/template';

import { nodeArray, relativeTarget, containsClass, objectAssign, Event } from 'meteora';

export default class Selector {
  constructor(select, options = {}) {
    // Grab the default select box info
    this.default = {
      select: select,
      options: nodeArray(select.querySelectorAll('option')),
    };

    // Gather the user's settings
    this.settings = objectAssign({
      placeholder: this.default.select.getAttribute('placeholder') || 'Select',
      class: 'selector',
      search: false,
      multiple: (this.default.select.getAttribute('multiple') != undefined) || false,
      autoClose: true,
    }, options);

    // Render the new select box
    this.faux = new Template({
      tagName: 'div',
      classList: this.settings.class,
      innerHTML: [
        {
          tagName: 'div',
          classList: `${this.settings.class}__header`,
          innerHTML: [
            {
              tagName: 'span',
              classList: `${this.settings.class}__placeholder`,
              innerHTML: this.settings.placeholder,
            }
          ]
        },
        {
          tagName: 'ul',
          classList: `${this.settings.class}__list unstyled`,
        }
      ]
    });

    // Create the new template before the existing select
    this.default.select.parentNode.insertBefore(this.faux.html, this.default.select);

    // Initialise
    this.select = this.faux.html;
    this.header = this.select.querySelector(`.${this.settings.class}__header`);
    this.placeholder = this.select.querySelector(`.${this.settings.class}__placeholder`);
    this.list = this.select.querySelector(`.${this.settings.class}__list`);
    this.options = [];
    this.val = [];
    this.changeEvent = Event('change');

    this.updateOptions();

    // Render the search input
    if (this.settings.search) {

      // Create the template
      let search = new Template({
        tagName: 'li', 
        classList: `${this.settings.class}__search`,
        innerHTML: [{
          tagName: 'input',
          classList: `${this.settings.class}__searchInput`,
          placeholder: 'Search',
        }],
      });

      // Initialise
      this.search = search.html;
      this.searchInput = this.search.querySelector(`.${this.settings.class}__searchInput`);

      this.list.insertBefore(this.search, this.list.childNodes[0]);
    };

    if (this.settings.multiple) {
      this.default.select.setAttribute('multiple', true);
      this.select.classList.add('multiple');
    }

    this.events();

    this.updateValue();
  }

  updateOptions() {
    let template = null;
    let selection = [];

    // Empty the list
    this.options.forEach((option) => option.parentNode.removeChild(option));
    this.options = [];

    // Get new options
    this.default.options = nodeArray(this.default.select.querySelectorAll('option'));

    // Gather our data from the <option>s
    this.default.options.forEach((option) => {
      template = new Template({
        tagName: 'li',
        classList: `${this.settings.class}__option`,
        innerHTML: option.innerHTML,
        dataset: {value: option.value},
      });

      // Grab all the data attributes from the option and assign them to the new one
      for (var i = 0; i < option.attributes.length; i++) {
        if (option.attributes[i].nodeName.indexOf('data-') >= 0) {
          template.html.setAttribute(option.attributes[i].nodeName, option.attributes[i].nodeValue);
        }
      }

      // If the default option is disabled, disable the faux option
      (option.disabled) ? template.html.setAttribute('data-disabled', true) : template.html.removeAttribute('data-disabled');

      // Append the new options to the page
      this.options.push(template.html);
    });

    // Create our event handlers and append the items to our list
    this.options.forEach((option, index) => {

      // Change the default select box and toggle some classes
      option.addEventListener('click', () => {
        // If the default option is enabled
        if (this.default.options[index].disabled === false) {
          // If we are using a multi-select
          if (this.settings.multiple) {
            if (option.getAttribute('data-value') === '') {
              // Clear all other options
              this.options.forEach((customOption, customOptionIndex) => {
                customOption.classList.remove(`${this.settings.class}__option--active`);
                this.default.options[customOptionIndex].selected = false;
              });

              // Select "all" option
              option.classList.add(`${this.settings.class}__option--active`);
            }else {
              // Clear the all option
              if (this.default.options[0].value === '') this.options[0].classList.remove(`${this.settings.class}__option--active`);

              // If our option has already been selected, deselect it
              if (containsClass(option, `${this.settings.class}__option--active`)) {
                option.classList.remove(`${this.settings.class}__option--active`);
                this.default.options[index].selected = false;
              }
              // Otherwise, select it
              else {
                option.classList.add(`${this.settings.class}__option--active`);

                // Select all appropriate options in the default select
                this.options.forEach((customOption, customOptionIndex) =>{
                  this.default.options[customOptionIndex].selected = (containsClass(customOption, `${this.settings.class}__option--active`));
                });
              }
            }
          }
          // Otherwise select the single option, then close the input
          else {
            selection = [];
            if (! option.classList.contains(`${this.settings.class}__option--active`)) {

              // Toggle the active state to the option we just clicked
              this.options.forEach((o) => o.classList.remove(`${this.settings.class}__option--active`));
              option.classList.add(`${this.settings.class}__option--active`);

              // Loop default options and select the one's who's value matches our duplicate
              this.default.options.forEach((defaultOption) => {
                defaultOption.selected = (defaultOption.value === option.getAttribute('data-value'));
              });
            }

            if (this.settings.autoClose) this.close();
          }

          // Our selected items all in a nice list
          selection = nodeArray(this.list.querySelectorAll(`.${this.settings.class}__option--active`));

          // Set the placeholder based on the selected items
          this.updatePlaceholder(selection);

          // Finally send a change function to the original select
          this.change();
        }

      });

      // Add these options to our list
      this.list.appendChild(option);
    });
  }

  events() {
    // Open or close the select depending on the user's clicked target
    window.addEventListener('click', (e) => {
      if (!relativeTarget(e.target, this.select)) this.close();
    });

    // If we click on the header, and the selector is already open, we assume the user is trying to close it
    this.header.addEventListener('click', () => {
      (containsClass(this.select, 'js-active')) ? this.close() : this.open();
    });

    // When search is enabled add the filter event
    // Note, the filter event can be used from outside this class
    if (this.search) this.searchInput.addEventListener('keyup', () => this.filter(this.searchInput.value));
  }

  open() {
    // Add the active state
    this.select.classList.add('js-active');
  }

  close() {
    // Remove the active state
    this.select.classList.remove('js-active');

    // Clear the search
    if (this.search) {
      this.searchInput.value = '';
      this.filter();
    };
  }

  value() {
    // function to return the single value, or an array of multiple values as needed
    this.val = [];
    
    this.default.options.forEach((option) => {
      if (option.selected) this.val.push(option.value);
    });

    // if 2 of more -> array else if 1 -> value else if 0 -> ''
    return (this.val.length >= 2) ? this.val : (this.val.length === 1) ? this.val[0] : '';
  }

  // Filters the options by looking for a specific string
  filter(string = '') {
    this.options.forEach((option) => {
      option.style.display = (option.textContent.toLowerCase().indexOf(string.toLowerCase()) > -1 || string.length === 0) ? 'block' : 'none';
    });
  }

  // Event to fire when dynamically changing the default select
  change() {
    this.default.select.dispatchEvent(this.changeEvent);
  }

  // Set the placeholder based on the selected items
  updatePlaceholder(selection) {
    if (selection.length >= 2) {
      // Add a class to show multiple options are selected
      this.placeholder.classList.add('multiple-selected');
      // Remove the class that shows one option is selected
      this.placeholder.classList.remove('single-selected');
      this.placeholder.innerHTML = 'Multiple selected';
    } else if (selection.length === 1 && selection[0].getAttribute('data-value') != '') {
      // Add a class to shows one option is selected
      this.placeholder.classList.add('single-selected');
      // Remove the class that shows multiple options are selected
      this.placeholder.classList.remove('multiple-selected');
      this.placeholder.innerHTML = selection[0].innerHTML;
    } else {
      // Remove the class that shows one option is selected
      this.placeholder.classList.remove('single-selected');
      // Remove the class that shows multiple options are selected
      this.placeholder.classList.remove('multiple-selected');
      this.placeholder.innerHTML = this.settings.placeholder;
      if (this.settings.multiple && this.default.options[0].value === '') this.options[0].classList.add(`${this.settings.class}__option--active`);
    }
  }

  updateValue() {
    let selection = [];
    this.default.options.forEach((option, index) => {
      if (option.selected && option.value !== "") selection.push(option);
      (option.selected) ? this.options[index].classList.add(`${this.settings.class}__option--active`) : this.options[index].classList.remove(`${this.settings.class}__option--active`);
    });

    // Set the placeholder based on the selected items
    this.updatePlaceholder(selection);
  }

  update() {
    this.updateOptions();
    this.updateValue();
  }
}

// <select name="JobType" id="JobType" class="js-select">
//   <option value="0">View All</option>
//   <option value="1">Full Time</option>
//   <option value="1">Part Time</option>
//   <option value="1">Fixed Term</option>
//   <option value="1">Contract</option>
//   <option value="1">Casual</option>
// </select>

// import Selector from './components/Selector';

// nodeArray(document.querSelectorAll('select.js-select')).forEach((select) => new Selector(select));