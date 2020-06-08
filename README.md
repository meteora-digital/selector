# Simple Selector

Simple Selector is an es6 class used to create easily styleable select input. Simple Selector will create an HTML template that takes the place of your standard <select> tag.

## Installation

with webpack

```bash
yarn add simple-selector
```

## Usage

```es6
import Selector from 'simple-selector';

const SimpleSelector = new Selector(document.querySelectorAll('.js-select'), {
    search: true, 
    placeholder: 'Select your favourite.',
});
```

## Options

| Option | Type | Description |
|--------|------|-------------|
| search | Boolean or String (default: 'Search') | True / False to enable / disable - String will be true and change the placeholder text. |
| placeholder | String (default: 'Select') | Will update the default text on the Simple Selector |
| multiple | Boolean (default: false) | Toogles the multiselect attribute |
| autoClose | Boolean (default: true) | When multiple is false, autoClose: true will close the Selector when an option is clicked |

## License
[MIT](https://choosealicense.com/licenses/mit/)

