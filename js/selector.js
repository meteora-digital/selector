import Template from '@meteora-digital/template';

const nodeArray = require('@meteora-digital/helpers/js/nodeArray');
const relativeTarget = require('@meteora-digital/helpers/js/relativeTarget');
const containsClass = require('@meteora-digital/helpers/js/containsClass');
const objectAssign = require('@meteora-digital/helpers/js/objectAssign');
const Event = require('@meteora-digital/helpers/js/Event');

// Class

export default class Selector {
	constructor(select, options = {}) {
		// Grab the default select box info
		this.default = {
			select: select,
			options: nodeArray(select.querySelectorAll('option')),
		};

		// Gather the user's settings
		this.settings = objectAssign({
			placeholder: 'Select',
			search: false,
			multiple: false,
			autoClose: true,
		}, options);

		this.initialPlaceholder = this.settings.placeholder;
		
		// Render the new select box
		this.faux = new Template({
			tagName: 'div',
			classList: 'selector',
			innerHTML: [
				{
					tagName: 'div',
					classList: 'selector__header',
					innerHTML: [
						{
							tagName: 'span',
							classList: 'selector__placeholder',
							innerHTML: this.settings.placeholder,
						}
					]
				},
				{
					tagName: 'ul',
					classList: 'selector__list',
				}
			]
		});

		// Create the new template before the existing select
		this.default.select.parentNode.insertBefore(this.faux.html, this.default.select);

		// Initialise
		this.select = this.faux.html;
		this.header = this.select.querySelector('.selector__header');
		this.placeholder = this.select.querySelector('.selector__placeholder');
		this.list = this.select.querySelector('.selector__list');
		this.options = [];
		this.val = [];
		this.changeEvent = Event('change');

		this.updateOptions();

		// Render the search input
		if (this.settings.search) {

			// Create the template
			let search = new Template({
				tagName: 'li', 
				classList: 'selector__search',
				innerHTML: [{
					tagName: 'input',
					classList: 'selector__searchInput',
					placeholder: 'Search',
				}],
			});

			// Initialise
			this.search = search.html;
			this.searchInput = this.search.querySelector('.selector__searchInput');

			this.list.insertBefore(this.search, this.list.childNodes[0]);
		};

		if (this.settings.multiple) {
			this.default.select.setAttribute('multiple', true);
			this.select.classList.add('multiple');
		}

		this.events();
	}

	updateOptions() {
		let template = null;
		let selection = [];

		// Empty the list
		this.options.forEach((option) => option.remove());
		this.options = [];

		// Gather our data from the <option>s
		this.default.options.forEach((option) => {
			template = new Template({
				tagName: 'li',
				classList: 'selector__option',
				innerHTML: option.innerHTML,
				dataset: {value: option.value},
			});

			// Append the new options to the page
			this.options.push(template.html);
		});

		// Create our event handlers and append the items to our list
		this.options.forEach((option, index) => {

			// Change the default select box and toggle some classes
			option.addEventListener('click', () => {

				// If we are using a multi-select
				if (this.settings.multiple) {
					// If our option has already been selected, deselect it
					if (containsClass(option, 'selector__option--active')) {
						option.classList.remove('selector__option--active');
						this.default.options[index].selected = false;
					}
					// Otherwise, select it
					else {
						option.classList.add('selector__option--active');

						// Select all appropriate options in the default select
						this.options.forEach((customOption, customOptionIndex) =>{
							this.default.options[customOptionIndex].selected = (containsClass(customOption, 'selector__option--active'));
						});
					}
				}
				// Otherwise select the single option, then close the input
				else {
					selection = [];
					if (! option.classList.contains('selector__option--active')) {

						// Toggle the active state to the option we just clicked
						this.options.forEach((o) => o.classList.remove('selector__option--active'));
						option.classList.add('selector__option--active');

						// Loop default options and select the one's who's value matches our duplicate
						this.default.options.forEach((defaultOption) => {
							defaultOption.selected = (defaultOption.value === option.getAttribute('data-value'));
						});
					}

					if (this.settings.autoClose) this.close();
				}

				// Our selected items all in a nice list
				selection = nodeArray(this.list.querySelectorAll('.selector__option--active'));

				// Set the placeholder based on the selected items
				if (selection.length >= 2) {
					this.placeholder.innerHTML = 'Multiple selected';
				} else if (selection.length === 1) {
					this.placeholder.innerHTML = selection[0].innerHTML;
				} else {
					this.placeholder.innerHTML = this.settings.placeholder;
				}

				// Finally send a change function to the original select
				this.change();
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
		})

		// When search is enabled add the filter event
		// Note, the filter event can be used from outside this class
		if (this.search) {
			this.searchInput.addEventListener('keyup', () => {
				this.filter(this.searchInput.value);
			});
		}
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
}

// <select name="JobType" id="JobType" class="js-select">
// 	<option value="0">View All</option>
// 	<option value="1">Full Time</option>
// 	<option value="1">Part Time</option>
// 	<option value="1">Fixed Term</option>
// 	<option value="1">Contract</option>
// 	<option value="1">Casual</option>
// </select>

// import Selector from './components/Selector';

// nodeArray(document.querSelectorAll('select.js-select')).forEach((select) => new Selector(select));