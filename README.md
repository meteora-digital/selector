# Simple Selector

Simple Selector is an es6 class used to create easily styleable select input. Simple Selector will create an HTML template that takes the place of your standard <select> tag.

## Installation

with webpack

```bash
yarn add simple-selector
```

## Usage

```html
<select name="my-select" id="MySelect" class="js-select">
	<option value="1">View All</option>
	<option value="2">Option 1</option>
	<option value="3">Option 2</option>
</select>
```

```es6
import Selector from 'simple-selector';

const select = document.querySelectorAll('.js-select');

const SimpleSelector = new Selector(select, {
    search: true, 
    placeholder: 'Select your favourite.',
});

select.addEventListener('change', () => {
	console.log(SimpleSelector.value());
});

```

## Update the options dynamically

If the options in the default select have been updated dynamically, simply call

```es6
SimpleSelector.updateOptions();
```

## Options

| Option | Type | Description |
|--------|------|-------------|
| search | Boolean or String (default: 'Search') | True / False to enable / disable String will be true and change the placeholder text. |
| class | String (default: 'selector') | If you want more than one style of selector, you can change this class to suit your needs |
| placeholder | String (default: placeholder attribute or 'Select') | Will update the default text on the Simple Selector |
| multiple | Boolean (default: false) | Toogles the multiselect attribute |
| autoClose | Boolean (default: true) | When multiple is false, autoClose: true will close the Selector when an option is clicked |

## Browser Support
**Desktop:**
Firefox 16+ ✓
Chrome 15+ ✓
Safari 5.1+ ✓
IE 10+ ✓

**Mobile:**
Safari iOS 5.1+ ✓
Chrome Mobile 47+ ✓

**Note:**
(Might work on earlier versions of chrome, but I couldn't test it.)

## License
[MIT](https://choosealicense.com/licenses/mit/)

